import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const POPULARITY_THRESHOLD = 5;
const source = JSON.parse(readFileSync(new URL("../quotes.json", import.meta.url), "utf8"));
assert.ok(Array.isArray(source), "quotes.json must contain an array");

const uniqueQuotes = new Map();
for (const entry of source) {
  assert.equal(typeof entry.quote, "string", "Each entry must contain a quote string");
  const text = entry.quote.replace(/\[repeated line(?: throughout the series)?\]\s*/gi, "").trim();
  const match = text.match(/^([A-Za-z][A-Za-z .'-]{0,39}):\s*([^\r\n]+)$/);
  if (!match) continue;
  const [, character, body] = match;
  if (body.length > 160 || !body.trim() || /\b[A-Z][a-z]+:/.test(body)) continue;
  const identity = `${character.split(" ")[0]}:${body}`;
  uniqueQuotes.set(identity, {
    id: createHash("sha256").update(identity).digest("hex").slice(0, 12),
    character,
    text: body,
    popularity: Number.isFinite(entry.popularity) ? entry.popularity : 0,
  });
}
const quotes = [...uniqueQuotes.values()];
assert.ok(quotes.length > 1, "At least two complete short quotes are required");

function run(input) {
  const rawCharacter = input?.trmnl?.plugin_settings?.custom_fields_values?.character;
  const requestedCharacter = typeof rawCharacter === "string" ? rawCharacter.trim().toLowerCase() : "all";
  const character = ["chandler", "joey", "monica", "phoebe", "rachel", "ross"].includes(requestedCharacter)
    ? requestedCharacter : "all";
  const matchingQuotes = QUOTES.filter((quote) => character === "all" || quote.character.split(" ")[0].toLowerCase() === character);
  const eligibleQuotes = matchingQuotes.length ? matchingQuotes : QUOTES;
  const previousId = input?.trmnl?.state?.last_quote_id;
  const previousQuote = QUOTES.find((quote) => quote.id === previousId);
  const popularQuotes = previousQuote && previousQuote.popularity < POPULARITY_THRESHOLD
    ? eligibleQuotes.filter((quote) => quote.popularity > POPULARITY_THRESHOLD)
    : eligibleQuotes;
  const selectionPool = popularQuotes.length ? popularQuotes : eligibleQuotes;
  const alternatives = selectionPool.filter((quote) => quote.id !== previousId);
  const candidates = alternatives.length ? alternatives : selectionPool;
  const quote = candidates[Math.floor(Math.random() * candidates.length)];
  return {
    quote,
    quote_count: eligibleQuotes.length,
    trmnl_state: { last_quote_id: quote.id },
  };
}

const script = `const POPULARITY_THRESHOLD = ${POPULARITY_THRESHOLD};\nconst QUOTES = ${JSON.stringify(quotes, null, 2)};\n\n${run.toString()}\n`;
const testMath = { random: () => 0, floor: Math.floor };
const execute = runInNewContext(`${script}\nrun`, { Math: testMath });
for (const quote of quotes) {
  const result = execute({ trmnl: { state: { last_quote_id: quote.id } } });
  assert.notEqual(result.quote.id, quote.id);
  assert.equal(result.trmnl_state.last_quote_id, result.quote.id);
  assert.ok(result.quote.text.length <= 160);
  assert.ok(Buffer.byteLength(JSON.stringify(result)) < 8192);
}
const lowPopularityQuotes = quotes.filter((quote) => quote.popularity < POPULARITY_THRESHOLD);
const hasHighPopularityQuote = quotes.some((quote) => quote.popularity > POPULARITY_THRESHOLD);
assert.ok(lowPopularityQuotes.length > 0 && hasHighPopularityQuote, "Popularity threshold fixtures are required");
for (const previousQuote of lowPopularityQuotes) {
  const highPopularityInCharacter = quotes.some((quote) => quote.popularity > POPULARITY_THRESHOLD
    && quote.character.split(" ")[0].toLowerCase() === previousQuote.character.split(" ")[0].toLowerCase());
  const result = execute({ trmnl: {
    plugin_settings: { custom_fields_values: { character: previousQuote.character.split(" ")[0].toLowerCase() } },
    state: { last_quote_id: previousQuote.id },
  } });
  if (highPopularityInCharacter) assert.ok(result.quote.popularity > POPULARITY_THRESHOLD);
  assert.notEqual(result.quote.id, previousQuote.id);
}
for (const input of [undefined, null, {}, { trmnl: {} }, { trmnl: { state: {} } }]) {
  assert.ok(execute(input).quote.text);
}
for (const character of ["chandler", "joey", "monica", "phoebe", "rachel", "ross"]) {
  const matchingQuotes = quotes.filter((quote) => quote.character.split(" ")[0].toLowerCase() === character);
  assert.ok(matchingQuotes.length > 1, `Expected multiple quotes for ${character}`);
  for (const previousQuote of matchingQuotes) {
    const result = execute({ trmnl: {
      plugin_settings: { custom_fields_values: { character: ` ${character.toUpperCase()} ` } },
      state: { last_quote_id: previousQuote.id },
    } });
    assert.equal(result.quote.character.split(" ")[0].toLowerCase(), character);
    assert.equal(result.quote_count, matchingQuotes.length);
    assert.notEqual(result.quote.id, previousQuote.id);
  }
}
for (const character of ["all", "", "unknown", null, 42]) {
  const result = execute({ trmnl: { plugin_settings: { custom_fields_values: { character } } } });
  assert.equal(result.quote_count, quotes.length);
}
const singleLowPopularityQuote = { ...quotes[0], popularity: 10 };
const singleQuoteExecute = runInNewContext(`const POPULARITY_THRESHOLD = ${POPULARITY_THRESHOLD};\nconst QUOTES = ${JSON.stringify([singleLowPopularityQuote])};\n${run.toString()}\nrun`, { Math: testMath });
assert.equal(singleQuoteExecute({ trmnl: { state: { last_quote_id: singleLowPopularityQuote.id } } }).quote.id, singleLowPopularityQuote.id);

const target = new URL("../src/transform.js", import.meta.url);
if (process.argv.includes("--check")) {
  assert.equal(readFileSync(target, "utf8"), script, "Run node bin/build-quotes.mjs to rebuild the bundle");
} else {
  writeFileSync(target, script);
}
console.log(`Verified ${quotes.length} short entries from ${source.length} entries; character filters and repeat avoidance passed.`);
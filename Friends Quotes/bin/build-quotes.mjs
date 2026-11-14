import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

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
  const alternatives = eligibleQuotes.filter((quote) => quote.id !== previousId);
  const candidates = alternatives.length ? alternatives : eligibleQuotes;
  const quote = candidates[Math.floor(Math.random() * candidates.length)];
  return {
    quote,
    quote_count: eligibleQuotes.length,
    trmnl_state: { last_quote_id: quote.id },
  };
}

const script = `const QUOTES = ${JSON.stringify(quotes, null, 2)};\n\n${run.toString()}\n`;
const execute = runInNewContext(`${script}\nrun`, {});
for (const quote of quotes) {
  const result = execute({ trmnl: { state: { last_quote_id: quote.id } } });
  assert.notEqual(result.quote.id, quote.id);
  assert.equal(result.trmnl_state.last_quote_id, result.quote.id);
  assert.ok(result.quote.text.length <= 160);
  assert.ok(Buffer.byteLength(JSON.stringify(result)) < 8192);
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
const singleQuoteExecute = runInNewContext(`const QUOTES = ${JSON.stringify([quotes[0]])};\n${run.toString()}\nrun`, {});
assert.equal(singleQuoteExecute({ trmnl: { state: { last_quote_id: quotes[0].id } } }).quote.id, quotes[0].id);

const target = new URL("../src/transform.js", import.meta.url);
if (process.argv.includes("--check")) {
  assert.equal(readFileSync(target, "utf8"), script, "Run node bin/build-quotes.mjs to rebuild the bundle");
} else {
  writeFileSync(target, script);
}
console.log(`Verified ${quotes.length} short entries from ${source.length} entries; character filters and repeat avoidance passed.`);
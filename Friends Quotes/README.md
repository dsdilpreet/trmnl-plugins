# Friends Quotes

A complete short quote, selected randomly on each serverless run, with full,
half-horizontal, half-vertical, and quadrant layouts.

## Data and Serverless

[quotes.json](quotes.json) is the source of truth. TRMNL Serverless runs code;
it does not automatically publish adjacent local files as an HTTP endpoint.
This plugin bundles its eligible quotes into [src/transform.js](src/transform.js),
so no external JSON host, API key, or network request is needed for quote data.

The build keeps complete single-speaker entries of at most 160 characters,
removes the repeated-line annotation, separates attribution, and deduplicates
matching quotes. It does not shorten dialogue or extract lines from longer scenes.
The original collection remains unchanged. Popularity is not used as a weight.

The Static strategy supplies an empty object to the Node serverless `run(input)`.
The function returns `quote` (`id`, `character`, `text`), `quote_count`, and
`trmnl_state.last_quote_id`. Saved State prevents an immediate repeat. New
installs or cleared state start fresh; ordinary device wakes may reuse a cached
screen and do not necessarily execute serverless again.

## Build and Preview

Run these commands from this directory with Node 20+ and the `trmnl_preview` gem:

```sh
node bin/build-quotes.mjs
node bin/build-quotes.mjs --check
ruby bin/preview.rb
```

Open the generated `_build/preview.html` to inspect all 16 OG/X combinations
(four layouts, two devices, landscape and portrait). Each preview uses the same
quote from an actual execution of the bundle and pins framework assets to 3.4.6.
Use `ruby bin/preview.rb longest`, `shortest`, or `empty` for edge cases.
The generated `_build/quotes.json` contains the eligible visual-test fixtures.

`trmnlp build` / `trmnlp serve` also work, but version 0.7.1 does not execute
serverless locally. They use the sample quote in [.trmnlp.yml](.trmnlp.yml),
and the CLI's default exported HTML lacks the device profile classes.
Use the Ruby preview command for device-accurate comparisons.

## Deploy

```sh
node bin/build-quotes.mjs
trmnlp push
```

This uploads the files in `src`, including the generated transform, to the
existing Friends Quotes plugin. After import, confirm **Static**, **Node** on
the Serverless tab, framework **3.4.6**, and the desired refresh interval
(configured here as 60 minutes). Force Refresh and inspect the merge variables
before checking all four layouts in TRMNL's device preview. Confirm Saved State
updates across two runs. Local preview cannot certify the hosted runtime.

Do not edit the generated transform directly. Rebuild after changing the source
JSON or [bin/build-quotes.mjs](bin/build-quotes.mjs), then push again.

## Layout

The templates use only framework classes, device-responsive typography,
Rich Text, Content Limiter, Pixel Perfect, and `data-clamp` on attribution and
the title bar. The limiter is a fallback; the eligible collection is deliberately
short enough to preserve complete quotes on the tested OG/X layouts. There are
no hard-coded screen dimensions, custom styles, or client-side quote selection.
Other devices inherit the framework's device profiles but still need their own
visual check, especially very small displays or non-default text scaling.

References: [Serverless](https://help.trmnl.com/en/articles/14130649-serverless),
[Saved State](https://help.trmnl.com/en/articles/16777795-saved-state), and
[Framework 3.4](https://trmnl.com/framework/docs/3.4).
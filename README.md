# InChessting

A chess trainer that runs entirely on your device, powered by Stockfish 19: paste a game for a full review (graded moves, key moments, top-10 move plots, best lines), spar against a human-like engine or the openings your real opponents play, and drill your own mistakes.

**Install on Android:** open the site in Chrome, then tap Install (or the menu, then "Add to Home screen"). It works offline after the first visit.

Your games and drills are stored only in your browser on that device. Use "Copy all my data" / "Paste data from another device" (Review tab, under the paste box) to move them.

## Licence
Copyright (C) 2026 Will McCutcheon.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License version 3 (see LICENSE). It is distributed WITHOUT ANY WARRANTY.

## Third-party components
- **Stockfish.js 19.0.1** (`sf19.js` + `sf19.wasm`, the lite single-threaded WebAssembly build; `sf19-asm.js`, the asm.js fallback), GPL-3.0, (c) Chess.com, LLC and the Stockfish developers; network by Chris Bao. Taken unmodified (renamed) from the npm package https://www.npmjs.com/package/stockfish/v/19.0.1 . Source: https://github.com/nmrugg/stockfish.js and https://github.com/official-stockfish/Stockfish
- **Stockfish.js 10.0.2** (`stockfish.js`, the asm.js build, used for the classical evaluation terms in the Engine view), GPL-3.0. Authors: see `licenses/stockfish-AUTHORS`. Taken unmodified from the npm package https://www.npmjs.com/package/stockfish/v/10.0.2 . Project and source: https://github.com/nmrugg/stockfish.js (engine source: https://github.com/official-stockfish/Stockfish, release sf_10)
- **chess.js 0.10.3** (`chess.js`), BSD-2-Clause, Copyright (c) Jeff Hlywa. Licence: `licenses/chess.js-LICENSE`. Source: https://github.com/jhlywa/chess.js

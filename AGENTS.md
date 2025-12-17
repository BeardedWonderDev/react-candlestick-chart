# AGENTS (react-candlestick-chart)

## Global Rules and Required Reading

- `~/.codex/AGENTS.md` is the authoritative standard; read and follow it before applying any repo-local rules.
- This repository is a TypeScript + React library with a separate demo app (not a Next.js App Router project), so no stack-specific rules from `~/.codex/rules/` are required unless you introduce that stack.

## Repository Structure (What Lives Where)

- `src/`: library source (TypeScript/React + D3 + `<canvas>` rendering).
- `dist/`: build output from `tsc` (`npm run build`); do not hand-edit generated files.
- `demo/`: Create React App demo used to showcase and manually validate the library; has its own `package.json`, `src/`, and `public/`.
- `readme.md`: public API documentation (props and usage); keep in sync with any exported behavior changes.

## Architectural Boundaries and Responsibilities

- `src/index.tsx`: the public entrypoint and default export (`CandlestickChart`). Treat prop names and defaults here as the package contract.
- `src/components/`: rendering and interaction layers.
  - `CandlestickChartController`: wires contexts, normalizes input data, and builds D3 scale functions.
  - `Layout`: owns SVG layout + axes and generates DOM IDs derived from the `id` prop.
  - `CandlesCanvas`: draws candles/positions to a scaled `<canvas>` for performance.
  - `CandlesSelectorLinesAndLabels` / `RSChart` / `SelectedCandleDataViewer`: overlays, range selection, and readouts.
- `src/context/`: application state via Context + reducer. Extend state by adding/adjusting action types in `src/types/` and flowing changes through dispatch.
- `src/types/`: canonical definitions for internal state, actions, and prop/value shapes (keep changes centralized here).
- `src/utils/`: helpers (data normalization, geometry, cursor/touch coordinate extraction). Keep “pure” calculations separate from DOM-dependent helpers.

## Local Coding Rules for This Repo

- Keep element IDs namespaced by the required `id` prop (pattern: `${id}-<suffix>`) to support multiple charts on one page.
- If you add a user-facing option, thread it end-to-end: `src/index.tsx` prop → relevant context/config → component usage, and document it in `readme.md`.
- Prefer extending existing contexts/types over introducing parallel state containers; this codebase expects chart state to flow through `src/context/`.
- When adding event listeners (mouse/touch/resize), always attach/detach inside `useEffect` cleanups; avoid module-level mutable state.

## Validation Workflow (What “Done” Means Here)

- Library must build cleanly: run `npm run build` at the repo root.
- Use `demo/` to validate interactive behavior (zoom/pan/selection/range selector) when changes affect UI/UX.
- Avoid committing demo-only dependency hacks (e.g. temporary `file:` dependencies) unless explicitly requested; keep `demo/` as a consumer-style integration check.

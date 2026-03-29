# Build & Dev Tooling (Vite + Analog)

This project uses **Vite** with `@analogjs/platform`. Always use the correct commands:

- **Dev**: `yarn dev` (starts Vite dev server)
- **Build**: `yarn build`
- **Preview**: `yarn preview` (serves built SSR output)
- **Test**: `yarn test` (Vitest)

**Do NOT use** `ng serve` or `ng build` directly — use the yarn scripts instead.

**Environment Check**: When starting the dev server, verify that environment variables (e.g., `VITE_API_BASE`) in `.env` match the expected setup.

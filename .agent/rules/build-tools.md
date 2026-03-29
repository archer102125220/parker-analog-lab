# Build & Dev Tooling (Vite + Analog)

This project uses **Vite** with the `@analogjs/platform` plugin. Always use the correct commands:

- **Dev**: `yarn dev` (starts Vite dev server)
- **Build**: `yarn build`
- **Preview**: `yarn preview` (serves built SSR output)
- **Test**: `yarn test` (Vitest)

**Do NOT use** Angular CLI commands like `ng serve` or `ng build` directly — use the yarn scripts instead.

**Environment Check**: When starting the development server, verify that any environment variables (e.g., `VITE_API_BASE`) in `.env` match the expected values for your dev setup.

# File Organization (Analog.js)

## Directory Structure

```
parker-analog-lab/
├── src/
│   ├── app/
│   │   ├── pages/          # Analog file-based routing pages (.page.ts)
│   │   ├── app.ts          # Root component
│   │   └── app.config.ts   # App configuration
│   ├── server/             # Server-side API routes (.server.ts)
│   ├── styles.css          # Global styles
│   └── main.ts             # Client entry point
├── public/                 # Static assets
└── src/main.server.ts      # Server entry point
```

## Style Organization

- **Global styles**: `src/styles.css`
- **Component styles**: inline in `styleUrls` / `styles` within `.ts` files, or separate `.scss`/`.css` files co-located with components
- **Shared CSS**: Use shared component, not `_shared` directories
- NEVER share CSS class names between pages
- For shared DOM structures: create a component with `pageClassName` input

## Page Files

- Each page is a `.page.ts` file inside `src/app/pages/`
- Each page MUST have a **unique root CSS class**

## Key Rules

- **Each element MUST have its own unique class**
  - ❌ Bad: `.footer-links a { ... }` (targeting tag)
  - ✅ Good: `.footer-link { ... }` (unique class)
  - ✅ Exception: Dynamic content areas (e.g., `.content p { ... }`)
  - ✅ Exception: Third-party content (e.g., `:global a { ... }`)

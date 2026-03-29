# File Organization Rules (Analog.js)

## Directory Structure

```
parker-analog-lab/
├── src/
│   ├── app/
│   │   ├── pages/          # File-based routing pages (.page.ts)
│   │   ├── app.ts          # Root component
│   │   └── app.config.ts   # App configuration
│   ├── server/             # Server-side API routes (.server.ts)
│   ├── styles.css          # Global styles
│   └── main.ts             # Client entry point
└── public/                 # Static assets
```

## Style File Locations

| Type | Location |
|------|----------|
| Global styles | `src/styles.css` |
| Component styles | Co-located `.scss` / `.css` file or inline in component |
| Shared CSS | Create a shared component, not `_shared` directories |

## Forbidden Practices

- ❌ **NEVER share CSS class names between pages**
- ❌ **NEVER share a single CSS file between multiple page components**

## Required Practices

- ✅ For shared DOM structures: create a **component** with an `@Input() pageClassName` prop
- ✅ Each page MUST have a **unique root CSS class**

## Each Element Must Have a Unique Class

- ❌ Bad: `.footer-links a { ... }` (targeting tag)
- ✅ Good: `.footer-link { ... }` (unique class)
- ✅ Exception: Dynamic content areas (e.g., `.content p { ... }`)
- ✅ Exception: Third-party content

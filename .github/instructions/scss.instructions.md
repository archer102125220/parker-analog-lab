---
applyTo: "**/*.{scss,css}"
---

# CSS/SCSS Naming Rules (Modified BEM)

## Naming Convention

- **Block**: `.countdown` (Single word)
- **Element**: `.countdown-title` (hyphen `-` separates Block-Element)
- **Sub-Element**: `.countdown-title-icon` (hyphen `-` separates Element-SubElement)
- **Multi-word Segment**: `.image_upload` (underscore `_` separates words **WITHIN** a single segment)
- **State**: `[css-is-active='true']` (HTML attr with `css-` prefix)
- **CSS variables**: `--editor_height` (underscore `_`)

## Critical Disambiguation

- **Hierarchy (Hyphen `-`)**: Use when adding a new structural level or generic container.
  - ✅ `.controls-group` (`group` is a sub-element of `controls`)
  - ✅ `.card-body` (`body` is a sub-element of `card`)
- **Multi-word Segment (Underscore `_`)**: Use when the name describes a SINGLE specific concept.
  - ✅ `.scroll_area` (A "scroll area" is one specific thing)
  - ✅ `.image_upload` (Upload component for images)
- **Rule of Thumb**: If it's a generic container noun (group, wrapper, container), use hyphen `-`. If it's a specific noun phrase, use underscore `_`.

## Other Rules

- NEVER use `__` (double underscore) or `--` (double hyphen)
- Use HTML attributes for states/variants: `[css-color='red']`, `[css-is-disabled='true']`
- Each element MUST have only ONE className

## Page Root Class

- Page: `[name]_page` (e.g., `.hooks_test_page`)
- Component: `[name]` (e.g., `.image_upload`)
- Each page MUST have unique root class

## CSS Property Order

1. Positioning (position, top, z-index)
2. Display & Box Model (display, flex, width, margin, padding)
3. Typography (font, color)
4. Visual (background, box-shadow)
5. Animation (transition)
6. Misc (cursor)

## File Organization

- NEVER create `_shared` directories
- NEVER share CSS class names between pages
- For shared DOM: create Angular component
- **Each element MUST have its own unique class**
  - ❌ Bad: `.footer-links a { ... }` (targeting tag)
  - ✅ Good: `.footer-link { ... }` (unique class)
  - ✅ Exception: Dynamic content areas (e.g., `.content p { ... }`)

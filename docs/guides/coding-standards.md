# Parker Analog Lab - Coding Standards

> This file defines the coding standards that MUST be followed when working on this project.
> These rules are mandatory and should be enforced by AI agents and human developers alike.

[English](./coding-standards.md) | [繁體中文](./coding-standards.zh-tw.md)

---

## 1. TypeScript Standards

### 1.1 Type Safety (MANDATORY)

- **NEVER use `any` type** - Use precise type definitions, generics, or `unknown` instead
- **Use `as unknown as TargetType`** for type assertions when necessary (double assertion)
- **NEVER use `as any`** - Always use `as unknown as TargetType` for safer assertions
- **Add explanatory comments** when using type assertions to explain why it's necessary

```typescript
// ❌ FORBIDDEN
function processData(data: any) { }
const element = document.getElementById('id') as any;

// ✅ REQUIRED
function processData<T extends { value: unknown }>(data: T) { }
const element = document.getElementById('id') as unknown as CustomElement;
```

### 1.2 Runtime Data Validation (Strict)

To ensure robustness, always use strict type checks based on the variable's initialization state.

| Type | Do NOT Use | MUST Use |
|------|------------|----------|
| **String** | `if (str)` | `if (str !== '')` |
| **Number** | `if (num)` | `typeof num === 'number'`, `num !== 0`, `Number.isFinite(num)` |
| **Object** | `if (obj)` | `typeof obj === 'object' && obj !== null`<br>`if (obj instanceof MyClass)` |
| **Array** | `if (arr)` | `Array.isArray(arr) && arr.length > 0` |
| **Equality** | `==`, `!=` | `===`, `!==` |

---

## 2. CSS/SCSS Standards

### 2.1 BEM Naming Convention (MANDATORY)

The project uses a **Modified BEM** naming convention:

| Element Type | Format | Example |
|--------------|--------|---------|
| Block | single name | `.countdown` |
| Element | hyphen `-` | `.countdown-title` |
| Sub-Element | hyphen `-` | `.countdown-title-icon` |
| Multi-word names | underscore `_` | `.image_upload`, `.content_box` |
| State/Modifier | HTML attribute | `[css-is-active='true']` |

#### Key Rules:
- **Each element MUST have its own unique class**
- **Use `-` (hyphen)** to connect Block and Element: `.block-element`
- **Use `_` (underscore)** for multi-word names within a single segment: `.image_upload`
- **NEVER use `__` (double underscore) or `--` (double hyphen)**
- **HTML attributes for states MUST start with `css-`**: `css-is-active`
- **CSS variables MUST use `_` (underscore)**: `--editor_height`

### 2.2 Angular Specifics

- Use `[attr.css-is-active]="isActive ? 'true' : null"` for binding state attributes in templates.

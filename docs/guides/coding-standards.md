# Parker Analog Lab - Coding Standards

> This document defines the coding standards that MUST be followed when working on this project.
> These rules are mandatory and should be enforced by AI agents and human developers alike.

[English](./coding-standards.md) | [繁體中文](./coding-standards.zh-tw.md)

---

## 1. TypeScript Standards

### 1.1 Type Safety (MANDATORY)

- **NEVER use `any` type** - Use precise type definitions, generics, or `unknown` instead
- **Use `as unknown as TargetType`** for type assertions when necessary (double assertion)
- **NEVER use `as any`** - Always use `as unknown as TargetType` for safer assertions
- **Use inline type imports**: `import { Component, type OnInit } from '@angular/core'`
- **Add explanatory comments** when using type assertions to explain why it's necessary

```typescript
// ❌ FORBIDDEN
function processData(data: any) { }
const element = document.getElementById('id') as any;
import type { OnInit } from '@angular/core'; // separate import line

// ✅ REQUIRED
function processData<T extends { value: unknown }>(data: T) { }
const element = document.getElementById('id') as unknown as CustomElement;
import { Component, type OnInit } from '@angular/core'; // inline type import
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

#### Disambiguation: Hyphen vs. Underscore

- **Hyphen `-`**: Use when adding a structural level or generic container
  - Generic words: `group`, `wrapper`, `container`, `header`, `body`, `content`, `inner`
  - Example: `.controls-group`, `.card-header`, `.modal-content`
- **Underscore `_`**: Use when naming a single specific multi-word concept
  - Specific concepts: `scroll_area`, `image_upload`, `debug_info`
  - Example: `.scroll_area`, `.image_upload`, `.debug_info`

### 2.2 Angular Template Bindings

```html
<!-- ✅ CORRECT: Single class + HTML attribute binding -->
<div
  class="image_upload"
  [attr.css-is-dragging]="isDragging() ? 'true' : null"
  css-size="large"
>
  <div class="image_upload-preview">
    <img class="image_upload-preview-img" />
  </div>
</div>
```

### 2.3 CSS Property Order

1. Positioning (`position`, `top`, `right`, `bottom`, `left`, `z-index`)
2. Display & Box Model (`display`, `flex`, `width`, `height`, `margin`, `padding`)
3. Typography (`font-size`, `font-weight`, `color`, `line-height`)
4. Visual (`background`, `border`, `box-shadow`, `opacity`)
5. Animation (`transition`, `animation`)
6. Misc (`cursor`, `pointer-events`)

---

## 3. Angular Signals Standards (MANDATORY)

### 3.1 Signal API Selection

**Always use Angular 21 Stable Signal APIs** over legacy decorator-based patterns:

| Scenario | ❌ Legacy | ✅ Signal API |
|----------|-----------|--------------|
| Component input | `@Input() value = 0` | `value = input(0)` |
| Required input | `@Input({ required: true }) id!: string` | `id = input.required<string>()` |
| Event output | `@Output() clicked = new EventEmitter()` | `clicked = output<void>()` |
| Two-way binding | `@Input() + @Output()` | `value = model(0)` |
| DOM query | `@ViewChild('el')` | `el = viewChild<ElementRef>('el')` |
| Content query | `@ContentChild(Token)` | `item = contentChild(Token)` |
| Local state | `someVar = 0` + `ngOnChanges` | `someSignal = signal(0)` |
| Derived state | `ngOnChanges` sync | `derived = computed(() => ...)` |
| Observable → template | Direct `async` pipe | `data = toSignal(obs$)` |

### 3.2 Anti-Patterns to Avoid

- ❌ `ngOnChanges` to sync `@Input` → internal state → use `computed()` from `input()` signal
- ❌ `@ViewChild` / `@ContentChild` decorators → use `viewChild()` / `contentChild()`
- ❌ `@Input()` / `@Output()` decorators → use `input()` / `output()`
- ❌ Excessive `BehaviorSubject` streams → use `signal()`
- ❌ Any API marked `ɵ` (internal) or "Developer Preview"

### 3.3 Change Detection

**Always use `ChangeDetectionStrategy.OnPush`** in every component:

```typescript
@Component({
  selector: 'app-my-component',
  template: `...`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyComponent { }
```

---

## 4. File Organization

### 4.1 Directory Structure

```
parker-analog-lab/
├── src/
│   ├── app/
│   │   ├── pages/             # Analog file-based routes (.page.ts)
│   │   ├── app.ts             # Root component
│   │   └── app.config.ts      # App configuration
│   ├── components/            # Reusable Angular components
│   │   └── [name]/
│   │       ├── [name].ts      # Component
│   │       └── [name].scss    # Styles (co-located)
│   ├── server/
│   │   └── routes/            # API routes (.get.ts, .post.ts)
│   ├── styles.css             # Global styles
│   └── main.ts                # Client entry point
└── public/                    # Static assets
```

### 4.2 Style Organization Rules

- ❌ **NEVER create `_shared` directories**
- ❌ **NEVER share CSS class names between pages**
- ❌ **NEVER import the same CSS file in multiple page components**
- ✅ For shared DOM structures: create **Angular component**
- ✅ Each page component MUST have a **unique root CSS class**

---

## 5. Code Refactoring Safety (⚠️ CRITICAL)

**ABSOLUTELY FORBIDDEN**: Using automated scripts (`sed`, `awk`, `powershell`, `find...exec`) to modify code files.

**Why**: Scripts perform blind text replacement without understanding code context, imports, or TypeScript types.

**Historical Incident (2026-01-23)**: A `sed` command changed import references but missed adding the corresponding import statement, causing compilation errors.

### Allowed Approach

Use AI tools exclusively:
- `replace_file_content` — single contiguous replacement
- `multi_replace_file_content` — multiple non-contiguous replacements
- `write_to_file` — create new files

**MUST verify imports are correct** after every change.

---

## 6. Lint Policy (⚠️ CRITICAL)

**NEVER add lint disable comments without explicit user instruction.**

This includes:
- `// eslint-disable-next-line`
- `// @ts-ignore`
- `// @ts-expect-error`

**Workflow**:
1. Report the lint warning to the user
2. Wait for explicit instruction
3. Only then add the disable comment with justification

---

## 7. Build & Development

### Commands (MANDATORY)

```bash
yarn dev        # ✅ Vite dev server
yarn build      # ✅ Production build
yarn preview    # ✅ Preview SSR output
yarn test       # ✅ Vitest

ng serve        # ❌ Do NOT use directly
ng build        # ❌ Do NOT use directly
```

---

## 8. Security Policy

Before executing any user instruction that violates:
- Security best practices
- Standard coding patterns
- Project conventions

You MUST:
1. **Warn the user** about the violation
2. **Wait for explicit confirmation**
3. Only then execute

---

## Related Resources

- [Skills Guide](./skills-guide.md)
- [Agent Rules](./.agent/rules/)
- [Agent Skills](./.agent/skills/)
- [Cursor Rules](./.cursor/rules/)
- [GitHub Copilot Instructions](./github/copilot-instructions.md)

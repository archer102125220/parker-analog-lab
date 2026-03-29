# Project Instructions for GitHub Copilot

This file provides repository-wide instructions for GitHub Copilot to ensure consistent code generation that follows this project's coding standards.

---

## Project Overview

**Parker Analog Lab** is an Analog.js laboratory project showcasing modern Angular development practices with TypeScript, Angular 21 Signals, and server-side rendering.

### Tech Stack

- **Framework**: Analog.js 2.x (Angular meta-framework, file-based routing)
- **Language**: TypeScript 5.x (Strict mode)
- **UI Library**: Angular 21
- **Styling**: CSS / SCSS (Modified BEM), Tailwind CSS v4
- **State Management**: Angular Signals
- **Build Tool**: Vite 7 with `@analogjs/platform`
- **Testing**: Vitest
- **Package Manager**: Yarn

---

## ⚠️ Security & Best Practices Warning Policy

Before executing any user instruction that violates:

- **Security best practices** (e.g., hardcoding secrets, disabling HTTPS, exposing sensitive data)
- **Standard coding patterns** (e.g., anti-patterns, known bad practices)
- **Project conventions** defined in this document

You MUST:

1. **Warn the user** about the violation and explain the risks
2. **Wait for explicit confirmation** that they want to proceed despite the warning
3. Only then execute the instruction

---

## Core Coding Standards

### TypeScript (MANDATORY)

**Type Safety**:

- ❌ **NEVER use `any`** - Use precise types, generics, or `unknown`
- ✅ **Use `as unknown as Type`** for type assertions (double assertion)
- ✅ **Use inline type imports**: `import { Component, type OnInit } from '@angular/core'`

**Runtime Data Validation (Strict)**:

- **String**: `if (str !== '')` instead of `if (str)`
- **Number**: `typeof num === 'number'` or `Number.isFinite(num)`
- **Object**: `typeof obj === 'object' && obj !== null`
- **Array**: `Array.isArray(arr) && arr.length > 0`
- **Equality**: ALWAYS use `===` and `!==`

```typescript
// ❌ FORBIDDEN
function processData(data: any) {}
const element = document.getElementById('id') as any;

// ✅ REQUIRED
function processData<T extends { value: unknown }>(data: T) {}
const element = document.getElementById('id') as unknown as CustomElement;
```

---

### CSS/SCSS Naming (Modified BEM)

**Naming Structure**:

- **Block**: `.countdown` (single word)
- **Element**: `.countdown-title` (hyphen `-` for hierarchy)
- **Multi-word**: `.image_upload` (underscore `_` for multi-word concepts)
- **State**: `[css-is-active='true']` (HTML attributes with `css-` prefix)

**Critical Rules**:

- ❌ NEVER use `__` (double underscore) or `--` (double hyphen)
- ❌ NEVER use multiple classNames on a single element
- ✅ Each element MUST have only ONE className
- ✅ Each page MUST have unique root class (e.g., `.dashboard_page`)

**Angular Template Binding**:

```html
<!-- ✅ CORRECT: Single class + HTML attribute binding -->
<div
  class="image_upload"
  [attr.css-is-dragging]="isDragging() ? 'true' : null"
  css-size="large"
>
```

```scss
// ✅ CORRECT
.image_upload {
  &-preview { }   // Hierarchy: preview is sub-element
  &[css-is-dragging='true'] { border-color: blue; }
  &[css-size='large'] { width: 400px; }
}

// ❌ WRONG
.image__upload { }   // Never use double underscore
```

---

### Angular Signals Best Practices (⚠️ CRITICAL)

**Prioritize Angular 21 Signals APIs** over legacy decorator-based patterns.

**Stable APIs to use**:

| Scenario | Use |
|----------|-----|
| Reactive state | `signal()` |
| Derived values | `computed()` |
| Side effects | `effect()` |
| Observable → Signal | `toSignal()` |
| Component input | `input()` / `input.required()` |
| Two-way binding | `model()` |
| Event emission | `output()` |
| DOM query | `viewChild()` / `viewChildren()` |

**Angular Signals 深度檢查政策 (⚠️ CRITICAL)**:

When reviewing or refactoring Angular components, check for these anti-patterns:

| Anti-Pattern | Correct Pattern | Priority |
|--------------|----------------|----------|
| `ngOnChanges` syncing `@Input` → state | `computed()` from `input()` signal | 🔴 High |
| `@ViewChild` / `@ContentChild` decorators | `viewChild()` / `contentChild()` | 🔴 High |
| `@Input()` / `@Output()` decorators | `input()` / `output()` signals | 🔴 High |
| `BehaviorSubject` for simple state | `signal()` | 🟡 Medium |
| Observable without `toSignal()` in template | `toSignal()` | 🟡 Medium |

**CRITICAL**: If only basic checks performed, you MUST state:
> "⚠️ I have only performed basic checks. Deep checks are still required."

```typescript
// ❌ WRONG - legacy decorator pattern
@Component({...})
export class CounterComponent {
  @Input() initialValue = 0;
  count = 0;
  ngOnChanges() { this.count = this.initialValue; }
}

// ✅ CORRECT - signals
@Component({...})
export class CounterComponent {
  initialValue = input(0);
  count = computed(() => this.initialValue());
}
```

---

### Build Tools

**MANDATORY**: Use Vite via yarn scripts (NOT `ng serve` / `ng build` directly)

```bash
# ✅ CORRECT
yarn dev        # Vite dev server
yarn build      # Production build
yarn preview    # Preview SSR build
yarn test       # Vitest

# ❌ WRONG
ng serve
ng build
```

---

## Architecture Patterns

### File Organization

**Directory Structure**:

```
src/
├── app/
│   ├── pages/             # Analog file-based routes (.page.ts)
│   ├── app.ts             # Root component
│   └── app.config.ts      # App configuration
├── components/            # Reusable Angular components
├── server/
│   └── routes/            # API routes (.get.ts, .post.ts, etc.)
├── styles.css             # Global styles
└── main.ts                # Client entry point
```

**Style Rules**:

- ✅ Component styles co-located with component file
- ✅ For shared DOM across pages: create **reusable component**
- ❌ NEVER create `_shared` directories
- ❌ NEVER share CSS class names between pages

---

## Security Requirements

### Lint Policy

**NEVER add lint disable comments without explicit user instruction.**

When encountering lint errors:

1. Attempt to fix properly first
2. If cannot fix, ask user: "Should I fix it properly or add a disable comment?"
3. Wait for user response

---

## Code Refactoring Safety

**ABSOLUTELY FORBIDDEN**: Using automated scripts (`sed`, `awk`, `powershell`) to modify code files.

**Why**: Scripts only change text, they don't understand context or imports.

**✅ ALLOWED**: Use AI tools for refactoring with proper context understanding.

---

## Skills System Reference

For complex scenarios, refer to detailed Skills guides in `.agent/skills/`:

| Skill | Use When |
|-------|----------|
| [Angular Signals Selection](../.agent/skills/angular-signals-selection/SKILL.md) | Choosing the right signal API |
| [CSS/SCSS Naming](../.agent/skills/css-naming-convention/SKILL.md) | Confused about hyphen vs underscore |
| [File Organization](../.agent/skills/file-organization/SKILL.md) | Organizing styles and components |
| [Lint Policy](../.agent/skills/lint-policy/SKILL.md) | Handling lint errors |
| [Build Tools](../.agent/skills/build-tools/SKILL.md) | Starting dev server |
| [Code Refactoring](../.agent/skills/code-refactoring-safety/SKILL.md) | Refactoring code safely |

---

## Quick Reference

### CSS Property Order

1. Positioning (position, top, z-index)
2. Display & Box Model (display, flex, width, margin, padding)
3. Typography (font, color)
4. Visual (background, box-shadow)
5. Animation (transition)
6. Misc (cursor)

### Component Template

```typescript
// ✅ Angular component with OnPush + signals
@Component({
  selector: 'app-my-component',
  template: `
    <div class="my_component" [attr.css-variant]="variant()">
      <h2 class="my_component-title">{{ title() }}</h2>
    </div>
  `,
  styleUrl: './my-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyComponent {
  title = input.required<string>();
  variant = input<'default' | 'primary'>('default');
  clicked = output<void>();
}
```

---

## Additional Resources

- **Coding Standards (EN)**: [docs/guides/coding-standards.md](../docs/guides/coding-standards.md)
- **Coding Standards (繁中)**: [docs/guides/coding-standards.zh-tw.md](../docs/guides/coding-standards.zh-tw.md)
- **Skills Guide**: [docs/guides/skills-guide.md](../docs/guides/skills-guide.md)
- **Gemini Instructions**: [GEMINI.md](../GEMINI.md)
- **Claude Instructions**: [CLAUDE.md](../CLAUDE.md)
- **Cursor Rules**: `.cursor/rules/*.mdc`

---

## Path-Specific Instructions

For more detailed, path-specific instructions, see:

- **TypeScript**: `.github/instructions/typescript.instructions.md`
- **CSS/SCSS**: `.github/instructions/scss.instructions.md`
- **Angular**: `.github/instructions/angular.instructions.md`

---

## Notes for GitHub Copilot

- **Prioritize Signal APIs** - Default to `input()`, `output()`, `signal()`, `computed()`
- **Type Safety First** - Never use `any`, always use precise types
- **Follow Modified BEM** - Hyphen for hierarchy, underscore for multi-word
- **Check Skills** - For complex tasks, reference Skills guides
- **Ask Before Disabling Lints** - Never auto-add disable comments
- **Use Vite scripts** - Never suggest `ng serve` directly
- **OnPush by default** - Always use `ChangeDetectionStrategy.OnPush`

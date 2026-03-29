# Project Instructions for Gemini (Analog.js)

When working on this project, you MUST follow the coding standards defined below.

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

## Quick Rules

### TypeScript
- NEVER use `any` - use generics, `unknown`, or precise types
- Use `as unknown as Type` for assertions, NEVER `as any`
- Use **inline type imports**: `import { Component, type OnInit } from '@angular/core'`

### Runtime Data Validation (Strict)
- **String**: Use `if (str !== '')` instead of `if (str)`
- **Number**: Use `typeof num === 'number'` or `Number.isFinite(num)` instead of `if (num)`
- **Object**: Use `typeof obj === 'object' && obj !== null` instead of `if (obj)`
- **Class**: Use `if (obj instanceof MyClass)` for specific instances
- **Array**: Use `Array.isArray(arr) && arr.length > 0` instead of `if (arr)`
- **Equality**: ALWAYS use `===` and `!==`

### CSS/SCSS Naming (Modified BEM)
- **Block**: `.countdown` (Single word)
- **Element**: `.countdown-title` (hyphen `-` separates Block-Element)
- **Sub-Element**: `.countdown-title-icon` (hyphen `-` separates Element-SubElement)
- **Multi-word Segment**: `.image_upload` (underscore `_` separates words **WITHIN** a single segment)
- **State**: `[css-is-active='true']` (HTML attr with `css-` prefix)
- **CSS variables**: `--editor_height` (underscore `_`)

#### HTML Attributes (Angular Style)
- **State**: `[css-is-active='true']` (Starts with `css-`)
- **Binding**: `[attr.css-is-active]="isActive() ? 'true' : null"` (Angular signal binding)

### Page Root Class
- Page: `[name]_page` (e.g., `.hooks_test_page`)
- Component: `[name]` (e.g., `.image_upload`)
- Each page MUST have unique root class

### CSS Property Order
1. Positioning (position, top, z-index)
2. Display & Box Model (display, flex, width, margin, padding)
3. Typography (font, color)
4. Visual (background, box-shadow)
5. Animation (transition)
6. Misc (cursor)

### File Organization
- **Global styles**: `src/styles.css`
- **Component styles**: Co-located `.scss` file
- NEVER create `_shared` directories
- NEVER share CSS class names between pages
- For shared DOM: create component with `pageClassName` input signal

### Angular Signals Policy (⚠️ CRITICAL)
- **Prioritize Angular Signals APIs**, avoid legacy decorator-based patterns
- ✅ **Angular 21 Stable Signals**: `signal()`, `computed()`, `effect()`, `input()`, `input.required()`, `output()`, `model()`, `model.required()`, `viewChild()`, `viewChildren()`, `contentChild()`, `contentChildren()`, `toSignal()`, `toObservable()`
- ✅ **Signal Selection Guidelines**:
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
- ❌ **Avoid**:
  - `@Input()` / `@Output()` decorators → use `input()` / `output()`
  - `@ViewChild()` / `@ContentChild()` → use `viewChild()` / `contentChild()`
  - `ngOnChanges` for prop sync → use `computed()` from `input()` signal
  - Excessive `BehaviorSubject` streams → use `signal()`
  - Any API marked `ɵ` (internal) or "Developer Preview"

### Angular Signals 深度檢查政策 (⚠️ CRITICAL)

When reviewing or refactoring Angular components, you MUST check for these anti-patterns:

| Anti-Pattern | Correct Pattern | Priority |
|--------------|----------------|----------|
| `ngOnChanges` syncing `@Input` → state | `computed()` from `input()` signal | 🔴 High |
| `@ViewChild` / `@ContentChild` decorators | `viewChild()` / `contentChild()` | 🔴 High |
| `@Input()` / `@Output()` decorators | `input()` / `output()` signals | 🔴 High |
| `BehaviorSubject` for simple state | `signal()` | 🟡 Medium |
| `Observable` without `toSignal()` in template | `toSignal()` | 🟡 Medium |

**Related Skills**:
- `.agent/skills/angular-signals-selection/SKILL.md` - Signal selection decision tree
- `.agent/skills/css-naming-convention/SKILL.md` - CSS naming guide

### Build & Dev Tooling (Vite + Analog) (⚠️ CRITICAL)
- **Dev**: `yarn dev` (Vite dev server)
- **Build**: `yarn build`
- **Preview**: `yarn preview`
- **Test**: `yarn test` (Vitest)
- **Do NOT use** `ng serve` or `ng build` directly

### Lint Disable Comments (⚠️ CRITICAL)
- **NEVER** add `eslint-disable`, `@ts-ignore`, `@ts-expect-error`, or similar comments without **explicit user instruction**
- When encountering lint warnings/errors:
  1. Report the warning to the user
  2. Wait for user's explicit instruction to add a disable comment
  3. Only then add the disable comment with proper justification

---

## No Scripts for Code Refactoring (⚠️ CRITICAL)

**ABSOLUTELY FORBIDDEN: Using automated scripts (sed, awk, powershell, batch scripts) to modify code files.**

### Why
- Scripts only change text, they don't understand context or imports
- 2026-01-23 incident: `sed` changed content but forgot imports → compilation errors

### ✅ Allowed
- Use AI tools: `replace_file_content`, `multi_replace_file_content`
- MUST verify imports are correct after every change

### ❌ Forbidden
- `sed`, `awk`, `perl`, `powershell -Command`, `find ... -exec`
- Any batch text processing

### Exception
If absolutely necessary:
1. Get explicit human approval FIRST
2. Show complete script for review
3. Explain why manual tools can't do it

### 📚 Related Skill
For detailed guidelines and examples, see:
- [Code Refactoring Safety Skill](.agent/skills/code-refactoring-safety/SKILL.md)

### Remember
**Scripts are blind. AI should be intelligent.**

---

## Full Documentation
- English: [docs/guides/coding-standards.md](docs/guides/coding-standards.md)
- 繁體中文: [docs/guides/coding-standards.zh-tw.md](docs/guides/coding-standards.zh-tw.md)

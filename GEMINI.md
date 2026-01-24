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

#### HTML Attributes
- **State**: `[css-is-active='true']` (Starts with `css-`)
- **Binding**: `[attr.css-is-active]="isActive ? 'true' : null"` (Angular style binding)

### Page Root Class
- Page: `[name]_page` (e.g., `.hooks_test_page`)
- Component: `[name]` (e.g., `.image_upload`)
- Each page MUST have unique root class

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

### Remember
**Scripts are blind. AI should be intelligent.**

---

## Full Documentation
- English: [docs/guides/coding-standards.md](docs/guides/coding-standards.md)
- 繁體中文: [docs/guides/coding-standards.zh-tw.md](docs/guides/coding-standards.zh-tw.md)

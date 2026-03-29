# Skills Guide - Parker Analog Lab

This document explains the Skills system used to guide AI agents for complex, scenario-specific tasks.

[English](./skills-guide.md) | [繁體中文](./skills-guide.zh-tw.md)

---

## What is a Skill?

A **Skill** is a detailed, step-by-step guide stored in `.agent/skills/[skill-name]/SKILL.md`. Skills provide:
- Decision trees for complex choices
- Correct examples with code samples
- Common mistakes to avoid
- Checklists for verification

AI agents (Gemini, Claude, Cursor, Copilot) are expected to **read and follow** the relevant SKILL.md before performing the corresponding task.

---

## Available Skills

### 1. Angular Signals Selection

**Path**: `.agent/skills/angular-signals-selection/SKILL.md`

**Use when**:
- Choosing between `signal()`, `computed()`, `effect()`, etc.
- Migrating from legacy `@Input()` / `@Output()` / `@ViewChild()` decorators
- Deciding when to use `toSignal()` for Observable conversion
- Building components that need reactive state

**Quick reference**:
| Scenario | Signal API |
|----------|-----------|
| Component input | `input()` / `input.required()` |
| Event emission | `output()` |
| Two-way binding | `model()` |
| Local state | `signal()` |
| Derived value | `computed()` |
| DOM reference | `viewChild()` |
| Observable → reactive | `toSignal()` |

---

### 2. CSS/SCSS Naming Convention

**Path**: `.agent/skills/css-naming-convention/SKILL.md`

**Use when**:
- Creating new CSS/SCSS class names
- Confused about hyphen (`-`) vs. underscore (`_`)
- Naming states, variants, or modifier attributes
- Creating page root classes or component root classes

**Quick reference**:
- **Hyphen `-`**: Structural hierarchy, generic containers (`group`, `header`, `content`)
- **Underscore `_`**: Multi-word specific concepts (`scroll_area`, `image_upload`)
- **HTML attributes**: States and variants (`css-is-active`, `css-color`, `css-size`)

---

### 3. Code Refactoring Safety

**Path**: `.agent/skills/code-refactoring-safety/SKILL.md`

**Use when**:
- Planning to refactor multiple files
- Tempted to use shell scripts for batch changes
- Performing find-and-replace operations
- Migrating API patterns across the codebase

**Key rule**: **NEVER use scripts**. Use `replace_file_content` and `multi_replace_file_content` only.

---

### 4. File Organization

**Path**: `.agent/skills/file-organization/SKILL.md`

**Use when**:
- Deciding where to place a new component or page
- Structuring styles for a new feature
- Choosing between inline styles, co-located CSS, or a new component
- Creating shared UI patterns across multiple pages

---

### 5. Lint Policy

**Path**: `.agent/skills/lint-policy/SKILL.md`

**Use when**:
- Encountering ESLint or TypeScript errors
- Deciding whether to fix or suppress a lint warning
- Needing to add `eslint-disable` or `@ts-expect-error` comments

**Key rule**: Always attempt to **fix the issue** before asking to suppress it.

---

### 6. Build Tools

**Path**: `.agent/skills/build-tools/SKILL.md`

**Use when**:
- Starting the development server
- Troubleshooting build errors
- Setting up environment variables
- Checking Vite configuration

---

## How to Use Skills

### For AI Agents

1. Identify the relevant skill from the task description
2. Read the entire `SKILL.md` file before proceeding
3. Follow the decision tree and checklists
4. Reference related rules if needed

### For Developers

Skills are organized as follows:
```
.agent/skills/
├── angular-signals-selection/
│   └── SKILL.md
├── build-tools/
│   └── SKILL.md
├── code-refactoring-safety/
│   └── SKILL.md
├── css-naming-convention/
│   └── SKILL.md
├── file-organization/
│   └── SKILL.md
└── lint-policy/
    └── SKILL.md
```

---

## Related Rules

Rules provide concise, always-on guidelines. Skills provide deep, scenario-specific guides.

| Rule File | Topic |
|-----------|-------|
| `.agent/rules/angular-signals.md` | Signal API selection summary |
| `.agent/rules/build-tools.md` | Vite commands summary |
| `.agent/rules/css-naming.md` | Modified BEM summary |
| `.agent/rules/css-property-order.md` | CSS property order |
| `.agent/rules/file-organization.md` | File structure summary |
| `.agent/rules/lint-policy.md` | Lint handling summary |
| `.agent/rules/no-scripts.md` | Refactoring safety summary |
| `.agent/rules/runtime-data-validation.md` | Strict data validation |
| `.agent/rules/typescript.md` | TypeScript type safety |

---

## Related Documentation

- [Coding Standards (EN)](./coding-standards.md)
- [Coding Standards (繁中)](./coding-standards.zh-tw.md)
- [GEMINI.md](../../GEMINI.md) - Gemini AI instructions
- [CLAUDE.md](../../CLAUDE.md) - Claude AI instructions
- [.github/copilot-instructions.md](../../.github/copilot-instructions.md) - Copilot instructions

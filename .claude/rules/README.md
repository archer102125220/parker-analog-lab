# Claude Rules (Analog.js)

This directory contains rules for Claude AI to ensure consistent code generation following project standards.

## Purpose

These rules are designed to work with:
- **Claude Desktop** - Via `.claude/rules/` directory
- **VS Code Claude Extension** - Automatically detects rules in this directory
- **Claude Code** - Agentic coding assistant

## Synchronization with Cursor Rules

The rules in this directory are synchronized with `.cursor/rules/*.mdc` to ensure consistency across different AI assistants.

### Current Status

✅ **Synchronized**: Rules are kept in sync with Cursor rules  
📍 **Source of Truth**: `.cursor/rules/*.mdc`  
🔄 **Sync Method**: Manual synchronization (content without YAML frontmatter)

## Available Rules

1. `angular-signals.md` - Angular Signals best practices (replaces react-hooks)
2. `build-tools.md` - Build tools configuration (Vite + Analog)
3. `css-naming.md` - CSS/SCSS naming convention (Modified BEM)
4. `css-property-order.md` - CSS property ordering
5. `file-organization.md` - File organization and style reuse
6. `lint-policy.md` - Lint error handling
7. `no-scripts.md` - Code refactoring safety
8. `runtime-data-validation.md` - Runtime data validation
9. `typescript.md` - TypeScript standards

## Rule Format

### Cursor Format (.mdc)
```markdown
---
description: Brief description
globs: ["file patterns"]
alwaysApply: true/false
---

# Rule Content (Markdown)
```

### Claude Format (.md)
```markdown
# Rule Content (Markdown)

Same content as Cursor, without frontmatter
```

## How to Use

### For Claude Desktop / Claude Code

Rules in this directory are automatically loaded by Claude when working on this project.

### For VS Code

The VS Code Claude extension automatically detects and uses rules from `.claude/rules/`.

## Related Documentation

- **Skills System**: `.agent/skills/*/SKILL.md` - Detailed task-specific guides
- **Coding Standards**: `docs/guides/coding-standards.md` - Complete coding standards
- **Cursor Rules**: `.cursor/rules/*.mdc` - Source of truth for rules
- **GitHub Copilot**: `.github/copilot-instructions.md` - Copilot instructions

## Notes

- **Keep in Sync**: Always update both `.cursor/rules/` and `.claude/rules/` when making changes
- **Source of Truth**: `.cursor/rules/*.mdc` is the primary source
- **Format Difference**: Only difference is the YAML frontmatter
- **Content Identical**: Rule content should be identical across both directories

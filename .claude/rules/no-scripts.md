# No Scripts for Code Refactoring (CRITICAL)

## Rule

**ABSOLUTELY FORBIDDEN**: Using automated scripts (sed, awk, perl, powershell, batch scripts) to modify code files.

## Why

Scripts only perform blind text replacement without understanding:
- **Context**: Code structure and semantics
- **Imports**: Cannot verify or update imports
- **Types**: Cannot validate TypeScript types

### Incident (2026-01-23)

A `sed` command changed `React.FormEvent` → `FormEvent` but forgot to add the import statement, causing compilation errors.

## ✅ Allowed Tools

Use ONLY these AI tools for modifying code:
1. `replace_file_content` — single contiguous replacement
2. `multi_replace_file_content` — multiple non-contiguous replacements
3. `write_to_file` — create new files

**MUST verify imports are correct** after every change.

## ❌ Forbidden Approaches

- `sed`, `awk`, `perl`
- `powershell -Command`
- `find ... -exec`
- Any batch text processing

## Exception Process

If script usage is **absolutely necessary**:
1. **Get explicit human approval FIRST**
2. Show the complete script for review
3. Explain why AI tools cannot do it

## Remember

**Scripts are blind. AI should be intelligent.**

---
name: Code Refactoring Safety
description: Enforces safe code refactoring practices by prohibiting automated scripts and requiring AI-powered tools for all code modifications
---

# Code Refactoring Safety Skill

## 🚨 CRITICAL RULE: NO SCRIPTS FOR CODE REFACTORING

**ABSOLUTELY FORBIDDEN**: Using automated scripts (sed, awk, perl, powershell, batch scripts, find...exec) to modify code files.

### Why Scripts Are Prohibited

Scripts only perform blind text replacement without understanding:
- **Context**: They don't understand code structure or semantics
- **Imports**: They can't verify or update import statements
- **Types**: They can't validate TypeScript types
- **Dependencies**: They can't track cross-file dependencies

### Historical Incident (2026-01-23)

A `sed` command changed `React.FormEvent` → `FormEvent` but forgot to add the import statement, causing compilation errors. This demonstrates why scripts are dangerous for code refactoring.

---

## ✅ ALLOWED: AI-Powered Tools

### For Code Modifications

Use ONLY these AI tools for modifying code:

1. **`replace_file_content`** - Single contiguous block replacement
   - Validates syntax
   - Understands context
   - Can update imports

2. **`multi_replace_file_content`** - Multiple non-contiguous replacements
   - Handles multiple changes in one file
   - Maintains code integrity

3. **`write_to_file`** - Create new files
   - For new components/modules
   - With proper structure

### For Code Analysis

Use these tools to understand code before modifying:

1. **`grep_search`** - Search for patterns
2. **`view_file`** - Read file contents

---

## 🔄 Correct Workflow for Batch Refactoring

### ❌ WRONG: Using Scripts

```bash
# NEVER DO THIS
find . -name "*.ts" -exec sed -i 's/OldClass/NewClass/g' {} \;
```

### ✅ CORRECT: Using AI Tools

```typescript
// Step 1: Find all files
grep_search({
  SearchPath: "/path/to/src",
  Query: "OldClass",
  MatchPerLine: true
})

// Step 2: Review each file
view_file({ AbsolutePath: "/path/to/component.ts" })

// Step 3: Make informed changes
replace_file_content({
  TargetFile: "/path/to/component.ts",
  TargetContent: "import { OldClass } from './old';",
  ReplacementContent: "import { NewClass } from './new';",
  // ... other parameters
})
```

---

## 📋 Checklist Before Any Batch Refactoring

- [ ] I am NOT using sed, awk, perl, or any text processing scripts
- [ ] I am NOT using find...exec to modify files
- [ ] I AM using `grep_search` to find patterns
- [ ] I AM using `view_file` to understand context
- [ ] I AM using `replace_file_content` or `multi_replace_file_content` for changes
- [ ] I WILL verify imports are correct after each change

---

## 🛡️ Exception Handling

If you think a script is necessary:
1. **Stop immediately**
2. **Get explicit human approval FIRST**
3. **Show the complete script for review**
4. **Explain why AI tools cannot do it**
5. **Wait for confirmation before proceeding**

---

## 🎓 Remember

**Scripts are blind. AI should be intelligent.**

Every code modification should be:
- **Context-aware**: Understanding the code structure
- **Type-safe**: Validating TypeScript types
- **Import-aware**: Updating imports as needed

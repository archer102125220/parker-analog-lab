---
name: Lint Policy & Error Handling
description: Guidelines for handling lint errors and when to use disable comments - for Angular/Analog project
---

# Lint Policy & Error Handling

## 🎯 When to Use This Skill

Use this skill when:
- Encountering ESLint warnings or errors
- Encountering TypeScript errors
- Deciding whether to fix or suppress lint errors
- Adding lint disable comments
- **Confused about whether to fix or suppress**
- Receiving lint feedback from IDE

## 📋 Decision Tree

### Step 1: Can the issue be fixed properly?

- **YES** → Fix it (preferred)
- **NO** → Continue to Step 2

---

### Step 2: Ask user for permission

**NEVER add disable comments without explicit user instruction.**

**Template**:
```
AI: "I encountered a lint warning: [description]
     
     Options:
     1. Fix it properly (recommended)
     2. Add a disable comment with justification
     
     Which approach should I take?"
```

**Wait for user response before proceeding.**

---

### Step 3: Fix properly (Preferred)

Apply the appropriate fix based on the lint rule.

---

## ✅ Correct Examples

### Example 1: Fix Properly

```typescript
// ❌ Lint warning: prefer-const
let value = 10;

// ✅ Fixed
const value = 10;
```

```typescript
// ❌ Lint warning: @typescript-eslint/no-explicit-any
function process(data: any) { return data; }

// ✅ Fixed
function process<T extends object>(data: T) { return data; }
```

```typescript
// ❌ Lint warning: Unsafe use of any
function process(data: any) {
  return data.value;
}

// ✅ Fixed - Use proper types
interface Data {
  value: string;
}

function process(data: Data) {
  return data.value;
}
```

---

### Example 2: Disable with User Permission

**Only after user explicitly approves:**

```typescript
// ✅ CORRECT - After user approval
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const legacyData: any = externalLibrary.getData();
// Reason: External library returns untyped data, will be fixed in v2
```

```typescript
// ✅ CORRECT - With justification
// @ts-expect-error - Type mismatch in third-party library
const result = legacyLib.process(data);
// TODO: Remove when library updates
```

---

## ❌ Common Mistakes

### Mistake 1: Auto-adding Disable Comments

```typescript
// ❌ WRONG - Added without asking user
// eslint-disable-next-line
const data: any = getData();

// ✅ CORRECT - Ask user first
AI: "Should I add a disable comment for the 'any' type warning?"
// (Wait for user approval)
```

### Mistake 2: Generic Disable

```typescript
// ❌ WRONG - Generic disable (disables ALL rules)
// eslint-disable-next-line
const value = data.value;

// ✅ CORRECT - Specific rule
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const value = data!.value;
```

---

## 📋 Common Lint Errors & Fixes (Angular)

### TypeScript Errors

| Error | Fix |
|-------|-----|
| `any` type | Use specific types or `unknown` |
| Unused variable | Remove or prefix with `_` |
| Missing await | Add `await` keyword |
| Non-null assertion | Add null check or use optional chaining |

### Angular-specific

| Error | Fix |
|-------|-----|
| `@Input` not signal | Migrate to `input()` signal API |
| Strict template | Fix template expression types |

---

## 📝 Checklist

### Before Adding Disable Comment

- [ ] Attempted to fix lint error properly first
- [ ] Verified fix is not straightforward
- [ ] Asked user for permission
- [ ] Added specific rule (not generic `eslint-disable-next-line`)
- [ ] Added justification comment explaining why

---

## 💡 Pro Tips

### Tip 1: Fix First, Suppress Last

Priority order:
1. ✅ Fix the code properly
2. ✅ Refactor to avoid the issue
3. ⚠️ Ask user for permission to suppress
4. ❌ Never auto-suppress

### Tip 2: Prefer `@ts-expect-error` over `@ts-ignore`

```typescript
// ❌ BAD - Silently ignores error even if fixed
// @ts-ignore

// ✅ GOOD - Fails if error is fixed (reminds to remove)
// @ts-expect-error - Type mismatch in third-party library
```

---

## 🔗 Related Rules

- `.agent/rules/lint-policy.md`
- `GEMINI.md` - Lint Disable Comments section
- `CLAUDE.md` - Lint Policy section

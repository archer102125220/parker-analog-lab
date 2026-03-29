# Review Angular Component

Perform a comprehensive review of Angular components following project standards.

## Usage

Use this command when you need to:
- Review an Angular component for best practices
- Check for signal API usage
- Audit CSS naming conventions
- Verify TypeScript type safety

## Review Checklist

### Round 1: Basic Check

**TypeScript**:
- [ ] No `any` types used
- [ ] Inline type imports (`import { Component, type OnInit }`)
- [ ] `as unknown as Type` for assertions (not `as any`)

**Angular Signals**:
- [ ] `@Input()` decorator replaced with `input()` / `input.required()`
- [ ] `@Output()` decorator replaced with `output()`
- [ ] `@ViewChild()` replaced with `viewChild()`
- [ ] `@ContentChild()` replaced with `contentChild()`

**Performance**:
- [ ] `ChangeDetectionStrategy.OnPush` used
- [ ] No unnecessary subscriptions without `toSignal()`

### Round 2: Deep Check (MANDATORY)

Check for these anti-patterns:

| Anti-Pattern | Correct Pattern | Priority |
|--------------|----------------|----------|
| `ngOnChanges` syncing `@Input` → state | `computed()` from `input()` signal | 🔴 High |
| `@ViewChild` decorator | `viewChild()` signal query | 🔴 High |
| `@Input()` / `@Output()` decorators | `input()` / `output()` | 🔴 High |
| `BehaviorSubject` for simple state | `signal()` | 🟡 Medium |
| Observable used directly in template | `toSignal()` | 🟡 Medium |

**CRITICAL**: If only Round 1 performed, you MUST state:
> "⚠️ I have only performed basic checks. Deep checks are still required."

### CSS/SCSS Check

- [ ] Modified BEM naming used (not classic BEM with `__`)
- [ ] No multiple classes on same element
- [ ] State/variants use HTML attributes (`css-is-active`, `css-size`)
- [ ] Page has unique root class (`[name]_page`)
- [ ] Each element has its own unique class

## Report Template

```markdown
# Component Review Report

**File**: [path/to/component.ts]
**Date**: [YYYY-MM-DD]

## Summary

- Issues found: [N]
- 🔴 High priority: [N]
- 🟡 Medium priority: [N]

## Detailed Findings

### 1. [Issue Title] (🔴 High / 🟡 Medium)

**Line**: [N]
**Anti-pattern**: [description]
**Recommendation**: [fix description]

**Before**:
\`\`\`typescript
// problematic code
\`\`\`

**After**:
\`\`\`typescript
// corrected code
\`\`\`

## Recommendations

1. [Specific action item]
2. [Specific action item]
```

## Related Skills

- [Angular Signals Selection](.agent/skills/angular-signals-selection/SKILL.md)
- [CSS/SCSS Naming Convention](.agent/skills/css-naming-convention/SKILL.md)
- [Lint Policy](.agent/skills/lint-policy/SKILL.md)

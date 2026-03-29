# Angular Signals Best Practices (⚠️ CRITICAL)

This project uses Angular 21+ with signals. **Prioritize signals-based APIs** over legacy RxJS-heavy patterns.

## ✅ Stable Signal APIs

| Category | APIs |
|----------|-------|
| State | `signal()`, `computed()` |
| Effects | `effect()`, `toSignal()`, `toObservable()` |
| Input | `input()`, `input.required()` |
| Output | `output()` |
| Model | `model()`, `model.required()` |
| Queries | `viewChild()`, `viewChildren()`, `contentChild()`, `contentChildren()` |
| Change Detection | `ChangeDetectionStrategy.OnPush` |

## ✅ Signal Selection Guidelines

| Scenario | Use |
|----------|-----|
| Reactive state | `signal()` |
| Derived/computed values | `computed()` |
| Side effects based on signals | `effect()` |
| Converting Observable to signal | `toSignal()` |
| Two-way binding | `model()` |
| Component input | `input()` or `input.required()` |
| DOM query | `viewChild()` / `viewChildren()` |

## ❌ Anti-Patterns to Avoid

- DON'T use `ngOnChanges` to sync `@Input()` to internal state → use `computed()` or read `input()` signal directly
- DON'T use `@ViewChild` / `@ContentChild` decorators → use `viewChild()` / `contentChild()` signal queries
- DON'T use `@Input()` / `@Output()` decorators → use `input()` / `output()` signal APIs
- DON'T create excessive `BehaviorSubject` streams when a `signal()` suffices

## ❌ Avoid: Experimental Features

- Anything marked as `ɵ` (internal Angular API)
- Any feature marked "Developer Preview" unless explicitly accepted by user

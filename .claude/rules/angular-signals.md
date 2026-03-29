# Angular Signals Best Practices (⚠️ CRITICAL)

Use Angular 21+ signals-based APIs. **Prefer signals over legacy decorator-based patterns.**

## ✅ Stable Signal APIs

| Category | APIs |
|----------|-------|
| State | `signal()`, `computed()` |
| Effects | `effect()`, `toSignal()`, `toObservable()` |
| Input | `input()`, `input.required()` |
| Output | `output()` |
| Model | `model()`, `model.required()` |
| Queries | `viewChild()`, `viewChildren()`, `contentChild()`, `contentChildren()` |

## ✅ Signal Selection Guidelines

| Scenario | Use |
|----------|-----|
| Reactive state | `signal()` |
| Derived/computed values | `computed()` |
| Side effects | `effect()` |
| Observable → reactive | `toSignal()` |
| Two-way binding | `model()` |
| Component input | `input()` / `input.required()` |
| DOM query | `viewChild()` / `viewChildren()` |

## ❌ Anti-Patterns to Avoid

- DON'T use `ngOnChanges` for prop → state sync → use `computed()` from `input()` signal
- DON'T use `@ViewChild` / `@ContentChild` → use `viewChild()` / `contentChild()`
- DON'T use `@Input()` / `@Output()` decorators → use `input()` / `output()`
- DON'T create `BehaviorSubject` streams when a `signal()` suffices

## ❌ Avoid Experimental Features

- Anything prefixed with `ɵ` (internal Angular API)
- Any feature marked "Developer Preview" unless explicitly accepted by user

## Examples

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

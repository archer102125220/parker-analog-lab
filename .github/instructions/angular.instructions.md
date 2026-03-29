---
applyTo: "**/*.ts"
---

# Angular Signals Policy (⚠️ CRITICAL)

**Prioritize Angular 21 Signals APIs**, avoid legacy decorator-based patterns.

## ✅ Stable Signal APIs

| Category | APIs |
|----------|-------|
| State | `signal()`, `computed()` |
| Effects | `effect()`, `toSignal()`, `toObservable()` |
| Input | `input()`, `input.required()` |
| Output | `output()` |
| Model | `model()`, `model.required()` |
| Queries | `viewChild()`, `viewChildren()`, `contentChild()`, `contentChildren()` |

## Signal Selection Guidelines

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

## ❌ Anti-Patterns to Avoid

- DON'T use `ngOnChanges` for prop sync → use `computed()` from `input()` signal
- DON'T use `@ViewChild` / `@ContentChild` → use `viewChild()` / `contentChild()`
- DON'T use `@Input()` / `@Output()` decorators → use `input()` / `output()`
- DON'T create `BehaviorSubject` streams when a `signal()` suffices

## ❌ Avoid Experimental Features

- Anything prefixed with `ɵ` (internal Angular API)
- Any feature marked "Developer Preview"

## Examples

```typescript
// ❌ WRONG - legacy
@Component({...})
export class MyComponent {
  @Input() value = 0;
  @Output() changed = new EventEmitter<number>();
  @ViewChild('el') el!: ElementRef;
  ngOnChanges() { /* sync logic */ }
}

// ✅ CORRECT - signals
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  ...
})
export class MyComponent {
  value = input(0);
  derived = computed(() => this.value() * 2);
  changed = output<number>();
  el = viewChild<ElementRef>('el');
}
```

## Component Requirements

- **Always use** `ChangeDetectionStrategy.OnPush`
- **Always use** `input()` / `output()` instead of decorators
- **Never use** `@Input()`, `@Output()`, `@ViewChild()`, `@ContentChild()`

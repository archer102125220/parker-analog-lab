---
name: Angular Signals Selection Guide
description: Decision tree and best practices for choosing the right Angular Signals APIs in Angular 21+
---

# Angular Signals Selection Guide

## 🎯 When to Use This Skill

Use this skill when:
- Choosing between `signal()` vs `BehaviorSubject`
- Deciding when to use `computed()` vs `effect()`
- Migrating from `@Input()` / `@Output()` to signal-based APIs
- Implementing form handling or reactive state
- **Confused about which Angular reactive primitive to use**
- Refactoring components with too many `@Input()` decorators
- Experiencing performance issues due to unnecessary change detection

## 📋 Signal Selection Decision Tree

### State Management

#### Question 1: Do you need reactive state that triggers change detection?

**Yes, simple piece of state** → `signal()`
```typescript
// ✅ CORRECT - Simple signal
count = signal(0);

// Update
this.count.set(1);
this.count.update(c => c + 1);
```

**Yes, derived from other signals** → `computed()`
```typescript
// ✅ CORRECT - Derived state
doubleCount = computed(() => this.count() * 2);
```

**No, just a constant** → Regular property
```typescript
// ✅ CORRECT - No reactivity needed
readonly title = 'My App';
```

---

#### Question 2: Is the state derived from props (inputs)?

**Yes** → `computed()` from `input()` signal
```typescript
// ❌ WRONG - Using ngOnChanges to sync @Input
@Input() value = 0;
internalValue = 0;
ngOnChanges() { this.internalValue = this.value; }

// ✅ CORRECT - Use input() + computed()
value = input(0);
internalValue = computed(() => this.value());
```

**No** → `signal()`

---

### Effect Management

#### Question 1: Does the effect depend on signals and has side effects?

**Yes** → `effect()`
```typescript
// ✅ CORRECT - React to signal changes
logEffect = effect(() => {
  console.log('Count changed:', this.count());
});
```

**Note**: Effects run automatically; don't call them manually.

#### Question 2: Do you need to convert an Observable to a signal?

**Yes** → `toSignal()`
```typescript
// ✅ CORRECT - Convert Observable to signal
data = toSignal(this.http.get<Data>('/api/data'), { initialValue: null });
```

---

### Component Communication

#### Question 1: Receiving data from parent?

**Required input** → `input.required()`
```typescript
// ✅ CORRECT
name = input.required<string>();
```

**Optional input with default** → `input(defaultValue)`
```typescript
// ✅ CORRECT
size = input<'small' | 'large'>('small');
```

#### Question 2: Emitting events to parent?

→ `output()`
```typescript
// ✅ CORRECT
clicked = output<MouseEvent>();

handleClick(event: MouseEvent) {
  this.clicked.emit(event);
}
```

#### Question 3: Two-way binding?

→ `model()`
```typescript
// ✅ CORRECT
value = model(0);

// Parent can use [(value)]="someValue"
```

---

### DOM Queries

| Query | Use |
|-------|-----|
| Single child | `viewChild()` |
| Multiple children | `viewChildren()` |
| Single content projection | `contentChild()` |
| Multiple projected | `contentChildren()` |

```typescript
// ✅ CORRECT - Signal-based queries
container = viewChild<ElementRef>('container');
items = viewChildren(ItemComponent);
```

---

## ✅ Correct Examples

### Example 1: Refactoring @Input / ngOnChanges → signals

**Before** (legacy):
```typescript
@Component({...})
export class SliderComponent {
  @Input() min = 0;
  @Input() max = 100;
  @Input() value = 50;
  
  internalValue = 50;
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.internalValue = this.value;
    }
  }
}
```

**After** (signals):
```typescript
@Component({...})
export class SliderComponent {
  min = input(0);
  max = input(100);
  value = input(50);
  
  internalValue = computed(() => this.value());
}
```

**Benefits**:
- ✅ No more `ngOnChanges`
- ✅ Derived state is computed automatically
- ✅ No manual sync needed

---

### Example 2: @ViewChild → viewChild()

**Before** (legacy):
```typescript
@ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

ngAfterViewInit() {
  const ctx = this.canvas.nativeElement.getContext('2d');
}
```

**After** (signals):
```typescript
canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

ngAfterViewInit() {
  const ctx = this.canvas().nativeElement.getContext('2d');
}
```

---

### Example 3: BehaviorSubject → signal()

**Before**:
```typescript
private _count = new BehaviorSubject(0);
count$ = this._count.asObservable();

increment() {
  this._count.next(this._count.value + 1);
}
```

**After**:
```typescript
count = signal(0);

increment() {
  this.count.update(c => c + 1);
}
```

---

## ❌ Common Mistakes

### Mistake 1: ngOnChanges for Derived State

```typescript
// ❌ WRONG
ngOnChanges() {
  this.filteredItems = this.items.filter(i => i.active);
}

// ✅ CORRECT
items = input<Item[]>([]);
filteredItems = computed(() => this.items().filter(i => i.active));
```

### Mistake 2: Using @Input / @Output Decorators

```typescript
// ❌ WRONG (legacy)
@Input() label = '';
@Output() clicked = new EventEmitter<void>();

// ✅ CORRECT (signals)
label = input('');
clicked = output<void>();
```

### Mistake 3: Calling effect() in Templates

Effects are for side effects during signal changes, not for template logic. Use `computed()` for template-bound derived values.

---

## 📝 Checklist

### Before Choosing a Reactive Primitive

- [ ] Determined if state needs reactivity (`signal`) or is derived (`computed`)
- [ ] Identified if value comes from parent → use `input()` signal
- [ ] Checked if emitting events → use `output()`
- [ ] Verified if DOM query needed → use `viewChild()` / `viewChildren()`
- [ ] Considered if Observable conversion needed → `toSignal()`

### When Refactoring

- [ ] Replaced `@Input()` with `input()` / `input.required()`
- [ ] Replaced `@Output()` with `output()`
- [ ] Replaced `@ViewChild()` with `viewChild()`
- [ ] Removed unnecessary `ngOnChanges` by using `computed()`
- [ ] Converted `BehaviorSubject` to `signal()` where appropriate

---

## 🔗 Related Rules

- `.agent/rules/angular-signals.md`
- `.cursor/rules/angular-signals.mdc`
- `GEMINI.md` - Angular Signals section
- `CLAUDE.md` - Angular Signals section

# Refactor Angular Component

Safely refactor Angular components following project safety protocols.

## Usage

Use this command when you need to:
- Migrate legacy `@Input()` / `@Output()` to signal APIs
- Refactor `@ViewChild` to `viewChild()`
- Convert `BehaviorSubject` to `signal()`
- Update CSS naming to Modified BEM

## ⚠️ CRITICAL: No Scripts Rule

**ABSOLUTELY FORBIDDEN**: Using automated scripts (sed, awk, find...exec) to modify code files.

**ONLY allowed tools**: `replace_file_content`, `multi_replace_file_content`, `write_to_file`

## Refactoring Checklist

Before starting any refactoring:
- [ ] Read and understand the current implementation
- [ ] Identify all affected files
- [ ] Plan the changes
- [ ] Make changes using AI tools only (no scripts)
- [ ] Verify imports are correct after each change

## Common Refactoring Patterns

### @Input() → input()

```typescript
// ❌ Before (legacy)
@Input() label = '';
@Input({ required: true }) id!: string;

// ✅ After (signals)
label = input('');
id = input.required<string>();
```

### @Output() → output()

```typescript
// ❌ Before (legacy)
@Output() clicked = new EventEmitter<void>();

// ✅ After (signals)
clicked = output<void>();
```

### @ViewChild() → viewChild()

```typescript
// ❌ Before (legacy)
@ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

// ✅ After (signals)
canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
```

### ngOnChanges → computed()

```typescript
// ❌ Before
@Input() value = 0;
internalValue = 0;
ngOnChanges() { this.internalValue = this.value; }

// ✅ After
value = input(0);
internalValue = computed(() => this.value());
```

### BehaviorSubject → signal()

```typescript
// ❌ Before
private _count = new BehaviorSubject(0);
count$ = this._count.asObservable();
increment() { this._count.next(this._count.value + 1); }

// ✅ After
count = signal(0);
increment() { this.count.update(c => c + 1); }
```

## Related Rules

- [No Scripts Rule](.agent/rules/no-scripts.md)
- [Angular Signals](.agent/rules/angular-signals.md)

## Related Skills

- [Angular Signals Selection](.agent/skills/angular-signals-selection/SKILL.md)
- [Code Refactoring Safety](.agent/skills/code-refactoring-safety/SKILL.md)

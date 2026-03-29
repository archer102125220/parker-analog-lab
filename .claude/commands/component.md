# Generate Angular Component

Generate a new Angular component for the Analog.js project following project standards.

## Usage

Use this command when you need to:
- Create new UI components
- Generate page components
- Build reusable Angular components

## Template

Please generate a component:

**Component Name**: [ComponentName]

**Location**:
- [ ] `src/components/[name]/` (reusable component)
- [ ] `src/app/pages/[name].page.ts` (page component)

**Features**:
- [ ] Signals-based inputs (`input()`, `input.required()`)
- [ ] Signals-based outputs (`output()`)
- [ ] SCSS styles (Modified BEM)
- [ ] OnPush change detection
- [ ] TypeScript types (no `any`)

**Props** (if applicable):
```typescript
// input signals instead of @Input()
name = input.required<string>();
size = input<'small' | 'large'>('small');
```

## Component Templates

### Basic Angular Component

```typescript
// src/components/my-card/my-card.ts
import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

@Component({
  selector: 'app-my-card',
  template: `
    <div class="my_card" [attr.css-variant]="variant()">
      <h3 class="my_card-title">{{ title() }}</h3>
      <div class="my_card-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrl: './my-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyCardComponent {
  title = input.required<string>();
  variant = input<'default' | 'success' | 'warning'>('default');
  clicked = output<void>();
}
```

### Analog Page Component

```typescript
// src/app/pages/my-feature.page.ts
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-my-feature-page',
  template: `
    <div class="my_feature_page">
      <h1 class="my_feature_page-title">My Feature</h1>
      <div class="my_feature_page-content">
        <!-- content -->
      </div>
    </div>
  `,
  styleUrl: './my-feature.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MyFeaturePageComponent {}
```

### SCSS (Modified BEM)

```scss
.my_card {
  // Positioning
  position: relative;

  // Display & Box Model
  display: flex;
  flex-direction: column;
  padding: 16px;

  // Visual
  background: #fff;
  border-radius: 8px;

  &-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  &-content {
    color: #666;
  }

  // States
  &[css-variant='success'] {
    border-left: 4px solid #4caf50;
  }

  &[css-variant='warning'] {
    border-left: 4px solid #f57c00;
  }
}
```

## Decision Tree

**What signals should I use?**
- Receiving data from parent? → `input()` / `input.required()`
- Emitting events? → `output()`
- Two-way binding? → `model()`
- Local reactive state? → `signal()`
- Derived value? → `computed()`
- DOM reference? → `viewChild()`

**Where should it live?**
- Reusable across pages? → `src/components/`
- Page-specific route? → `src/app/pages/`

## Related Skills

- [Angular Signals Selection](.agent/skills/angular-signals-selection/SKILL.md)
- [CSS/SCSS Naming Convention](.agent/skills/css-naming-convention/SKILL.md)
- [File Organization](.agent/skills/file-organization/SKILL.md)

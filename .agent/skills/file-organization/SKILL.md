---
name: File Organization & Style Reuse (Analog)
description: Guidelines for organizing files and reusing styles in Analog.js projects
---

# File Organization & Style Reuse (Analog.js)

## 🎯 When to Use This Skill

Use this skill when:
- Deciding where to place CSS/SCSS files
- Organizing page components vs reusable components
- Choosing between shared component and shared styles
- **Creating shared styles across pages**
- Refactoring duplicate styles
- Setting up new components or pages

## 📋 Directory Structure

### Recommended Structure

```
parker-analog-lab/
├── src/
│   ├── app/
│   │   ├── pages/               # Analog file-based routes
│   │   │   ├── index.page.ts    # → /
│   │   │   ├── about.page.ts    # → /about
│   │   │   └── blog/
│   │   │       └── [id].page.ts # → /blog/:id
│   │   ├── app.ts               # Root component
│   │   └── app.config.ts        # App configuration
│   ├── components/              # Reusable Angular components
│   │   ├── button/
│   │   │   ├── button.ts
│   │   │   └── button.scss
│   │   └── card/
│   │       ├── card.ts
│   │       └── card.scss
│   ├── server/                  # Server-side API routes
│   │   └── routes/
│   │       └── api/
│   ├── styles.css               # Global styles
│   └── main.ts
└── public/                      # Static assets
```

### ❌ Forbidden Patterns

```
src/
└── _shared/        # ❌ NEVER create _shared directories
    └── styles.css  # ❌ FORBIDDEN
```

**Why forbidden**: Makes it hard to track which pages use which styles.

---

## 📋 Style Reuse Decision Tree

### Question 1: Where will this style be reused?

#### Single Page Only → CSS Custom Properties or Page-Local Class

Define in the same component file:

```scss
// page component styles
.hooks_test_page {
  --button-bg: blue;
  
  &-primary_button {
    background: var(--button-bg);
  }
  
  &-secondary_button {
    background: transparent;
    border: 1px solid var(--button-bg);
  }
}
```

**When to use**:
- ✅ Styles only used within one page
- ✅ Simple style reuse (2-3 variations)
- ✅ No logic needed

---

#### Multiple Pages → Component

**Question 2: Does it need logic or props?**

**YES → Component (Recommended)**

```typescript
// src/components/card/card.ts
@Component({
  selector: 'app-card',
  template: `
    <div class="card" [attr.css-variant]="variant()">
      <h3 class="card-title">{{ title() }}</h3>
      <div class="card-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  title = input.required<string>();
  variant = input<'default' | 'success' | 'warning'>('default');
}
```

```scss
// src/components/card/card.scss
.card {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  &[css-variant='success'] {
    border-left: 4px solid #4caf50;
  }
  
  &[css-variant='warning'] {
    border-left: 4px solid #f57c00;
  }
  
  &-title { font-size: 18px; font-weight: 600; }
  &-content { color: #666; }
}
```

**When to use**:
- ✅ Needs inputs or logic
- ✅ Used across multiple pages
- ✅ Complex variations (3+ variants)

---

## ✅ Correct Examples

### Example 1: Single-Page Reuse

```scss
// ✅ CORRECT - Styles in one component file
// app/pages/dashboard.page.ts (styles inline or via styleUrl)

.dashboard_page {
  &-stats_card {
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #1976d2;
  }
  
  &-activity_card {
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #4caf50;
  }
}
```

---

### Example 2: Multi-Page Reuse (Component)

```typescript
// ✅ CORRECT - Reusable Angular component
// src/components/card/card.ts

@Component({
  selector: 'app-card',
  // ...
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  title = input.required<string>();
  variant = input<'default' | 'success' | 'warning' | 'error'>('default');
}
```

Usage on multiple pages:
```html
<!-- ✅ Multiple pages can use it -->
<app-card title="Statistics" variant="success">
  {{ content }}
</app-card>
```

---

## ❌ Common Mistakes

### Mistake 1: Creating `_shared` Directories

```
// ❌ WRONG
src/
└── _shared/
    └── card-styles.scss

// ✅ CORRECT
src/components/card/card.scss  // Component styles stay with component
```

### Mistake 2: Not Using Unique Page Root Classes

```scss
// ❌ WRONG - Generic class names
.container { }    // Can't identify which page
.header { }       // Too generic

// ✅ CORRECT - Unique page root class
.dashboard_page {
  &-container { }  // .dashboard_page-container
  &-header { }     // .dashboard_page-header
}
```

### Mistake 3: Sharing CSS Class Names Between Pages

```typescript
// ❌ WRONG - Both pages use `.card` class directly
// page1.ts → uses class "card"
// page2.ts → uses class "card" (conflict!)

// ✅ CORRECT - Each page has unique root
// page1.ts → uses class "dashboard_page-card"
// page2.ts → uses class "analytics_page-card"
```

---

## 📝 Checklist

### Before Creating Styles

- [ ] Determined reuse scope (single page vs multiple pages)
- [ ] Chosen appropriate strategy (page-local vs component)
- [ ] Ensured each page has unique root class
- [ ] Verified no `_shared` directories

### When Refactoring

- [ ] Identified duplicate styles across pages
- [ ] Decided if component is better
- [ ] Created component with proper `input()` signals
- [ ] Updated all usages
- [ ] Verified unique class names

---

## 🔗 Related Rules

- `.agent/rules/file-organization.md`
- `.agent/rules/css-naming.md`
- `GEMINI.md` - File Organization section
- `CLAUDE.md` - File Organization section

---
name: CSS/SCSS Naming Convention
description: Modified BEM naming system with hyphen/underscore rules and HTML attribute states for Angular/Analog components
---

# CSS/SCSS Naming Convention

## 🎯 When to Use This Skill

Use this skill when:
- Creating new components or pages
- Reviewing CSS/SCSS code
- Refactoring existing styles
- **Confused about hyphen vs underscore** (most common scenario)
- Deciding between class names and HTML attributes

## 📋 Decision Tree: Hyphen vs Underscore

### The Core Question

**Is this a generic container word OR a specific concept?**

### Hyphen `-` (Hierarchy/Structure)

Use when adding a **structural level** or **generic container**:

**Generic container words**:
- `group`, `wrapper`, `container`, `inner`, `outer`
- `header`, `body`, `footer`, `content`
- `section`, `area`, `zone`, `region`

**Examples**:
```scss
.controls-group      // "group" is generic
.card-header         // "header" is generic
.modal-content       // "content" is generic
.sidebar-inner       // "inner" is generic
```

### Underscore `_` (Multi-word Concept)

Use when the name describes a **single specific concept** that needs two words:

**Specific concepts**:
- `scroll_area` (a scrollable area - one specific thing)
- `image_upload` (image upload component - one specific thing)
- `debug_info` (debugging information - one specific thing)

**Examples**:
```scss
.scroll_area         // One specific concept
.image_upload        // One specific concept
.debug_info          // One specific concept
.content_box         // One specific concept
```

### Quick Decision Test

1. **Is this word generic?** (group, wrapper, header, etc.)
   - YES → Use hyphen `-`
   - NO → Continue to step 2

2. **Does this describe ONE specific thing that needs two words?**
   - YES → Use underscore `_`
   - NO → Rethink the name

## ✅ Correct Examples

### Example 1: Angular Component Structure

```scss
// ✅ CORRECT
.image_upload {                    // Multi-word concept (underscore)
  &-preview {                      // Sub-element (hyphen)
    &-img { }                      // Sub-sub-element (hyphen)
  }
  &-dropzone { }                   // Sub-element (hyphen)

  // States using HTML attributes
  &[css-is-dragging='true'] {
    border-color: blue;
  }
  &[css-size='large'] {
    width: 400px;
  }
}
```

**Angular Template Usage**:
```html
<!-- ✅ CORRECT: Single class + HTML attributes -->
<div
  class="image_upload"
  [attr.css-is-dragging]="isDragging() ? 'true' : null"
  css-size="large"
>
  <div class="image_upload-preview">
    <img class="image_upload-preview-img" />
  </div>
  <div class="image_upload-dropzone"></div>
</div>
```

### Example 2: Page Structure

```scss
// ✅ CORRECT
.hooks_test_page {                 // Page root (underscore for multi-word)
  &-description { }                // Sub-element (hyphen)
  &-section {                      // Sub-element (hyphen)
    &-title { }                    // Sub-sub-element (hyphen)
    &-content { }                  // Sub-sub-element (hyphen)
  }
}
```

## ❌ Common Mistakes

### Mistake 1: Using Double Underscore (BEM Classic)

```scss
// ❌ WRONG - Classic BEM (not used in this project)
.image__upload { }
.image-upload__preview { }

// ✅ CORRECT - Modified BEM
.image_upload { }
.image_upload-preview { }
```

### Mistake 2: Multiple Classes on Element

```html
<!-- ❌ WRONG -->
<div [ngClass]="[' box', isRed ? 'red' : '']">

<!-- ✅ CORRECT -->
<div class="box" [attr.css-color]="isRed ? 'red' : null">
```

### Mistake 3: Confusing Hierarchy with Multi-word

```scss
// ❌ WRONG - Treating "scroll area" as hierarchy
.scroll-area { }  // Should be scroll_area

// ❌ WRONG - Treating "group" as multi-word
.controls_group { } // Should be controls-group

// ✅ CORRECT
.scroll_area { }   // Multi-word concept
.controls-group { } // Generic container
```

## 📝 Checklist

### Before Creating New Styles

- [ ] Determined if root name is hierarchy (hyphen) or multi-word (underscore)
- [ ] Checked that each element has unique class name
- [ ] Planned HTML attributes for states/variants (not multiple classes)
- [ ] Verified no double underscore `__` or double hyphen `--`
- [ ] Ensured page has unique root class (`[name]_page`)
- [ ] Confirmed class names reflect DOM hierarchy

## 🔗 Related Rules

- `.agent/rules/css-naming.md`
- `.cursor/rules/css-naming.mdc`
- `GEMINI.md` - CSS/SCSS Naming (Modified BEM) section
- `CLAUDE.md` - CSS/SCSS Naming section

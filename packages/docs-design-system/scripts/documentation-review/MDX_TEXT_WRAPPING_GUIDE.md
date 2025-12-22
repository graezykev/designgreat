# MDX Text Wrapping Guide

## Problem

Docusaurus automatically wraps text content within JSX elements in `<p>` tags, causing unwanted
paragraph margins and UI issues. This happens because MDX treats plain text inside JSX as Markdown
content.

## Solution

Wrap all text content in JSX curly braces: `{'text'}`. This explicitly tells MDX to treat the
content as a JavaScript expression, preventing Markdown processing and unwanted `<p>` tags.

## Rules for Demo Sections

### ✅ Correct Patterns

```jsx
// Button text
<button className="dg-btn dg-btn-primary">{'Default'}</button>
<button className="dg-btn dg-btn-primary dg-btn-primary--hover">{'Hover'}</button>

// Link text
<a href="#" className="dg-link">{'Click here'}</a>

// Span/Label text
<span className="dg-badge">{'New'}</span>
<label className="dg-form-label">{'Username'}</label>

// Paragraph text
<p className="dg-text-body">{'This is body text using the default text color.'}</p>

// Div content
<div className="dg-nav-pill">{'Default'}</div>
<div className="dg-tab">{'Home'}</div>

// Special characters
<span className="dg-select-arrow">{'▼'}</span>
<button type="button" className="dg-tag-remove" aria-label="Remove tag">{'×'}</button>

// Multiple text nodes
<span className="dg-tag">
  {'Tag'}{' '}
  <button type="button" className="dg-tag-remove" aria-label="Remove tag">{'×'}</button>
</span>

// Complex content
<div className="dg-alert dg-alert-info">
  <strong>{'Info:'}</strong> {'This is an informational message.'}
</div>
```

### ❌ Incorrect Patterns

```jsx
// Plain text (will be wrapped in <p> tags)
<button className="dg-btn dg-btn-primary">Default</button>
<a href="#" className="dg-link">Click here</a>
<span className="dg-badge">New</span>
<p className="dg-text-body">This is body text...</p>
<div className="dg-nav-pill">Default</div>

// Special characters without wrapping
<span className="dg-select-arrow">▼</span>
<button type="button">{'×'}</button>  // Missing aria-label is also wrong, but text wrapping is the issue here
```

## Rules for Code Sections

Code sections should match demo sections exactly:

### ✅ Correct Code Section Format

````jsx
```jsx
<button className="dg-btn dg-btn-primary">{'Default'}</button>
<button className="dg-btn dg-btn-primary dg-btn-primary--hover">{'Hover'}</button>
<button className="dg-btn dg-btn-primary dg-btn-primary--active">{'Active'}</button>
<button className="dg-btn dg-btn-primary dg-btn-primary--focus">{'Focused'}</button>
<button className="dg-btn dg-btn-primary dg-btn-primary--disabled" disabled>{'Disabled'}</button>
````

````

### ❌ Incorrect Code Section Format

```html
<!-- HTML syntax (wrong) -->
<button class="dg-btn dg-btn-primary">Default</button>

<!-- Missing text wrapping (wrong) -->
<button className="dg-btn dg-btn-primary">Default</button>
````

## Key Points

1. **All text content** in JSX elements must be wrapped: `{'text'}`
2. **Code sections** must use JSX syntax (`className` not `class`, `tabIndex` not `tabindex`)
3. **Code sections** must match demo sections exactly (same text wrapping pattern)
4. **Whitespace** between elements: use `{' '}` for single spaces
5. **Special characters** (arrows, symbols) must also be wrapped: `{'▼'}`, `{'×'}`

## When to Apply

- ✅ **Demo sections** (`<TabItem value="demo">`) - Always wrap text
- ✅ **Code sections** (`<TabItem value="code">`) - Match demo format exactly
- ❌ **Markdown content** outside JSX - No wrapping needed
- ❌ **Code blocks** (```jsx) - Already in code, but should show wrapped format

## Examples from Real Files

### Buttons

```jsx
// Demo
<button className="dg-btn dg-btn-success">{'Default'}</button>
<button className="dg-btn dg-btn-success dg-btn-success--hover">{'Hover'}</button>

// Code (must match)
<button className="dg-btn dg-btn-success">{'Default'}</button>
<button className="dg-btn dg-btn-success dg-btn-success--hover">{'Hover'}</button>
```

### Navigation

```jsx
// Demo
<div className="dg-nav-pill">{'Default'}</div>
<div className="dg-nav-pill dg-nav-pill-hover">{'Hover'}</div>

// Code (must match)
<div className="dg-nav-pill">{'Default'}</div>
<div className="dg-nav-pill dg-nav-pill-hover">{'Hover'}</div>
```

### Alerts

```jsx
// Demo
<div className="dg-alert dg-alert-info">
  <strong>{'Info:'}</strong> {'This is an informational message.'}
</div>

// Code (must match)
<div className="dg-alert dg-alert-info">
  <strong>{'Info:'}</strong> {'This is an informational message.'}
</div>
```

## Checklist for New Documentation

When creating new demo sections:

- [ ] All button text wrapped: `{'Text'}`
- [ ] All link text wrapped: `{'Text'}`
- [ ] All label/span text wrapped: `{'Text'}`
- [ ] All paragraph text wrapped: `{'Text'}`
- [ ] All div content wrapped: `{'Text'}`
- [ ] Special characters wrapped: `{'▼'}`, `{'×'}`
- [ ] Code section matches demo exactly
- [ ] Code section uses JSX syntax (`className`, `tabIndex`)
- [ ] Code section uses `{'text'}` pattern

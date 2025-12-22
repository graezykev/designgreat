# Additional Design Structures

This document contains design structures for components matching the patterns:

- `.dg-xxx-nav-` (something-nav-something)
- `.dg-nav-xxx` (nav-something)
- `.dg-xxx-card-` (something-card-something)
- `.dg-card-xxx` (card-something)

---

## App Bar Navigation Design Structure

```
.dg-app-bar-nav-*
│
└── .dg-app-bar-nav                    /* App bar navigation container */
    ├── display                        → flex
    ├── gap                           → --dg-spacing-gap-md
    └── color                         → --dg-color-text-subtle
```

**Usage Example:**

```html
<nav class="dg-app-bar-nav">
  <a href="#" class="dg-nav-primary">Home</a>
  <a href="#" class="dg-nav-primary">About</a>
</nav>
```

---

## Text Card Design Structure

```
.dg-text-card-*
│
├── Container
│   └── .dg-text-card                  /* Text card container */
│       ├── background-color           → --dg-color-background-default
│       ├── border                     → --dg-border-width-thin solid --dg-color-border-default
│       ├── border-radius              → --dg-size-border-radius-lg
│       └── padding                    → --dg-spacing-inset-lg
│
├── Elements
│   ├── .dg-text-card-title            /* Card title */
│   │   ├── color                      → --dg-color-text-bold
│   │   ├── font-size                  → --dg-size-font-lg
│   │   ├── font-weight                → --dg-font-weight-semi-bold
│   │   └── margin                    → 0 0 --dg-spacing-space-sm 0
│   │
│   ├── .dg-text-card-body             /* Card body text */
│   │   ├── color                      → --dg-color-text-default
│   │   ├── line-height                → --dg-line-height-normal
│   │   └── margin                    → 0 0 --dg-spacing-space-md 0
│   │
│   └── .dg-text-card-meta             /* Card metadata */
│       ├── color                      → --dg-color-text-subtler
│       ├── font-size                  → --dg-size-font-caption
│       └── margin                    → 0
│
└── Usage Examples
    └── <div class="dg-text-card">
          <div class="dg-text-card-title">Card Title</div>
          <div class="dg-text-card-body">Card body text content</div>
          <div class="dg-text-card-meta">Metadata</div>
        </div>
```

---

## Card Style Variants Design Structure

```
.dg-card-*
│
├── Style Modifiers
│   ├── .dg-card-subtle                /* Card with subtle border */
│   │   └── border                     → --dg-border-subtle
│   │
│   └── .dg-card-outlined              /* Card with outlined border */
│       └── border                     → --dg-border-width-medium solid --dg-color-border-bold
│
├── Semantic Accent Variants
│   ├── .dg-card-accent-info           /* Info accent card */
│   │   ├── border-left                → --dg-border-width-thick solid --dg-color-border-information
│   │   ├── box-shadow                 → --dg-shadow-elevation-sm
│   │   └── .dg-shadow-color-card-title,
│   │       .dg-border-card-title      → color: --dg-color-semantic-info-bold
│   │
│   ├── .dg-card-accent-success        /* Success accent card */
│   │   ├── border-left                → --dg-border-width-thick solid --dg-color-border-success-bold
│   │   ├── box-shadow                 → --dg-shadow-elevation-sm
│   │   └── .dg-shadow-color-card-title,
│   │       .dg-border-card-title      → color: --dg-color-semantic-success-bold
│   │
│   └── .dg-card-accent-error          /* Error accent card */
│       ├── border-left                → --dg-border-width-thick solid --dg-color-border-error-bold
│       ├── box-shadow                 → --dg-shadow-elevation-sm
│       └── .dg-shadow-color-card-title,
│           .dg-border-card-title      → color: --dg-color-semantic-error-bold
│
└── Usage Examples
    ├── <div class="dg-text-card dg-card-subtle">Subtle Card</div>
    ├── <div class="dg-text-card dg-card-outlined">Outlined Card</div>
    ├── <div class="dg-text-card dg-card-accent-info">
    │     <div class="dg-shadow-color-card-title">Info Card</div>
    │   </div>
    ├── <div class="dg-text-card dg-card-accent-success">
    │     <div class="dg-shadow-color-card-title">Success Card</div>
    │   </div>
    └── <div class="dg-text-card dg-card-accent-error">
          <div class="dg-shadow-color-card-title">Error Card</div>
        </div>
```

---

## Card Transition Variants Design Structure

```
.dg-card-transition-*
│
├── .dg-card-transition-standard        /* Card with standard transition */
│   ├── background-color               → --dg-color-background-bold
│   ├── padding                         → --dg-spacing-inset-md
│   ├── border-radius                   → --dg-size-border-radius-lg
│   ├── border                          → --dg-border-default
│   ├── cursor                          → pointer
│   ├── font-size                       → --dg-size-font-caption
│   └── transition                      → background-color, border-color
│                                         --dg-duration-normal --dg-cubic-bezier-ease-in-out
│   └── :hover                          → bg: --dg-color-background-bolder
│                                         border-color: --dg-color-alpha-neutral-4
│
└── .dg-card-transition-slow            /* Card with slow transition */
    ├── background-color                 → --dg-color-background-default
    ├── padding                          → --dg-spacing-inset-md
    ├── border-radius                    → --dg-size-border-radius-lg
    ├── box-shadow                       → --dg-shadow-elevation-sm
    ├── cursor                           → pointer
    ├── font-size                        → --dg-size-font-caption
    └── transition                       → box-shadow
                                          --dg-duration-slow --dg-cubic-bezier-ease-in-out
    └── :hover                           → box-shadow: --dg-shadow-elevation-lg
```

**Usage Examples:**

```html
<div class="dg-card-transition-standard">Standard Transition Card</div>
<div class="dg-card-transition-slow">Slow Transition Card</div>
```

---

## Card Hover Variants Design Structure

```
.dg-card-hover-*
│
├── .dg-card-hover                      /* Card with hover effect */
│   ├── background-color                → --dg-color-background-default
│   ├── border                          → --dg-border-width-thin solid --dg-color-alpha-neutral-3
│   ├── border-radius                   → --dg-size-border-radius-card
│   ├── padding                         → --dg-spacing-inset-lg
│   ├── box-shadow                      → --dg-shadow-elevation-sm
│   ├── cursor                          → pointer
│   └── transition                      → box-shadow
│                                         --dg-duration-normal --dg-cubic-bezier-ease-in-out
│   └── :hover                          → box-shadow: --dg-shadow-elevation-md
│
├── .dg-card-standard                   /* Card with standard hover (used with base card) */
│   └── :hover                          → bg: --dg-color-alpha-neutral-2
│                                         border-color: --dg-color-primary-default
│
└── .dg-card-slow                       /* Card with slow hover (used with base card) */
    └── :hover                          → box-shadow: --dg-shadow-elevation-xl
```

**Usage Examples:**

```html
<div class="dg-card-hover">Hover Card</div>
<div class="dg-text-card dg-card-standard">Standard Hover Card</div>
<div class="dg-text-card dg-card-slow">Slow Hover Card</div>
```

---

## Shadow Card Elevated Design Structure

```
.dg-shadow-card-*
│
└── .dg-shadow-card-elevated            /* Elevated shadow card */
    ├── background-color                 → --dg-color-background-default
    ├── padding                          → --dg-spacing-inset-lg
    ├── border-radius                   → --dg-size-border-radius-card
    └── box-shadow                       → 0 1px 3px --dg-color-alpha-neutral-3,
                                            0 4px 16px --dg-color-alpha-neutral-4
```

**Usage Example:**

```html
<div class="dg-shadow-card-elevated">Elevated Card</div>
```

---

## Demo-Specific Card Structures

These card structures are used specifically in documentation demos to showcase design tokens. They
follow consistent naming patterns but are not part of the main component library.

### Shadow Color Demo Cards

```
.dg-shadow-color-card-*
│
├── Container
│   └── .dg-shadow-color-card            /* Shadow color demo card */
│
└── Elements
    ├── .dg-shadow-color-card-title      /* Card title (reused in border demos) */
    └── .dg-shadow-color-card-meta        /* Card metadata (reused in border demos) */
```

### Border Demo Cards

```
.dg-border-card-*
│
├── Container
│   ├── .dg-border-card                  /* Border demo card */
│   └── .dg-border-card-compact          /* Compact border demo card */
│
└── Elements
    ├── .dg-border-card-title            /* Card title */
    └── .dg-border-card-meta             /* Card metadata */
```

### Radius Demo Cards

```
.dg-radius-card-*
│
├── Container
│   └── .dg-radius-card                  /* Radius demo card */
│
└── Elements
    ├── .dg-radius-card-title             /* Card title */
    └── .dg-radius-card-desc              /* Card description */
```

### Gradient Demo Cards

```
.dg-gradient-card-*
│
├── Container
│   ├── .dg-gradient-card-grid            /* Gradient card grid container */
│   └── .dg-gradient-card                 /* Gradient demo card */
│       ├── position                      → relative
│       ├── background                    → --dg-gradient-brand-primary
│       ├── border-radius                → --dg-size-border-radius-lg
│       ├── padding                       → --dg-spacing-inset-lg
│       ├── overflow                      → hidden
│       └── ::before                      → gradient overlay (on hover)
│
└── Elements
    ├── .dg-gradient-card-icon             /* Card icon */
    ├── .dg-gradient-card-title            /* Card title */
    └── .dg-gradient-card-desc             /* Card description */
```

### Elevation Demo Cards

```
.dg-elevation-card-*
│
├── Container
│   └── .dg-elevation-card                /* Elevation demo card */
│
└── Elements
    ├── .dg-elevation-card-title           /* Card title */
    └── .dg-elevation-card-desc            /* Card description */
```

### Motion Demo Cards

```
.dg-motion-card-*
│
├── Container
│   └── .dg-motion-card                   /* Motion demo card */
│
└── Elements
    ├── .dg-motion-card-title              /* Card title */
    └── .dg-motion-card-hint               /* Card hint text */
```

### Showcase Demo Cards

```
.dg-showcase-card-*
│
├── Container
│   ├── .dg-showcase-card                 /* Showcase demo card */
│   └── .dg-showcase-card-compact         /* Compact showcase demo card */
│
└── Elements
    └── .dg-showcase-card-body              /* Card body */
```

### Focus Demo Cards

```
.dg-focus-card-*
│
└── .dg-focus-card                        /* Focus demo card */
    ├── default                            → border, padding, etc.
    └── :focus / .dg-focus-card-focused   → focus styles
```

### Typography Demo Cards

```
.dg-typography-card-*
│
└── .dg-typography-card                   /* Typography demo card */
```

### Inset Showcase Demo Cards

```
.dg-inset-showcase-card-*
│
└── .dg-inset-showcase-card               /* Inset showcase demo card */
```

---

## Summary

### Navigation Structures (`.dg-nav-xxx` and `.dg-xxx-nav-`)

1. ✅ `.dg-nav` - Navigation container (documented in DESIGN_STRUCTURES.md)
2. ✅ `.dg-nav-primary`, `.dg-nav-secondary`, `.dg-nav-tertiary` - Navigation links (documented in
   DESIGN_STRUCTURES.md)
3. ✅ `.dg-nav-pills` - Nav pills container (documented in DESIGN_STRUCTURES.md)
4. ✅ `.dg-nav-pill` - Individual nav pill (documented in DESIGN_STRUCTURES.md)
5. ⚠️ `.dg-app-bar-nav` - App bar navigation (documented above)

### Card Structures (`.dg-card-xxx` and `.dg-xxx-card-`)

1. ✅ `.dg-interactive-card` - Interactive card component (documented in DESIGN_STRUCTURES.md)
2. ⚠️ `.dg-text-card` - Text card container (documented above)
3. ⚠️ `.dg-card-subtle`, `.dg-card-outlined` - Style variants (documented above)
4. ⚠️ `.dg-card-accent-info`, `.dg-card-accent-success`, `.dg-card-accent-error` - Semantic accent
   cards (documented above)
5. ⚠️ `.dg-card-transition-standard`, `.dg-card-transition-slow` - Transition variants (documented
   above)
6. ⚠️ `.dg-card-hover`, `.dg-card-standard`, `.dg-card-slow` - Hover variants (documented above)
7. ⚠️ `.dg-shadow-card-elevated` - Elevated shadow card (documented above)
8. ⚠️ Demo-specific card structures (documented above)

**Note**: Demo-specific card structures (`.dg-shadow-color-card-*`, `.dg-border-card-*`,
`.dg-radius-card-*`, etc.) are used only in documentation demos and are not part of the main
component library. They follow consistent naming patterns for documentation purposes.

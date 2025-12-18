# Design Structures

## Button Design Structure

```
.dg-btn-*
│
├── Base
│   └── .dg-btn                           /* Layout, padding, radius, typography, transitions */
│       ├── display                       → inline-flex
│       ├── align-items                   → center
│       ├── justify-content               → center
│       ├── gap                           → --dg-spacing-space-xs
│       ├── padding                       → --dg-spacing-inset-sm --dg-spacing-inset-lg
│       ├── border-radius                 → --dg-size-border-radius-button
│       ├── font-size                     → --dg-size-font-sm
│       ├── font-weight                   → --dg-font-weight-semi-bold
│       ├── line-height                   → --dg-line-height-normal
│       ├── cursor                        → pointer
│       ├── text-decoration               → none
│       └── transition                    → background-color, border-color, color, box-shadow, transform, filter
│                                           --dg-duration-fast --dg-cubic-bezier-ease-out
│
├── Base State Rules (lower priority, overridden by variant-specific rules)
│   ├── :hover / .dg-btn--hover           → bg: --dg-color-background-bolder
│   ├── :focus / .dg-btn--focus           → outline: none
│   │                                       box-shadow: --dg-shadow-focus
│   ├── .dg-btn--focus:hover              → bg: --dg-color-background-bolder
│   │                                       box-shadow: --dg-shadow-focus
│   ├── :active / .dg-btn--active         → bg: --dg-color-alpha-neutral-2
│   ├── :focus:active / .dg-btn--focus:active → bg: --dg-color-alpha-neutral-2
│   │                                           box-shadow: --dg-shadow-focus
│   └── .dg-btn--active:focus             → bg: --dg-color-alpha-neutral-2
│                                           box-shadow: --dg-shadow-focus
│
├── Radius Modifiers
│   ├── .dg-btn--radius-xl                → border-radius: --dg-size-border-radius-xl
│   └── .dg-btn--radius-full              → border-radius: --dg-size-border-radius-full
│
├── Size Modifiers
│   ├── .dg-btn--small                    → padding: --dg-spacing-space-xs --dg-spacing-inset-sm
│   │                                     → font-size: --dg-size-font-caption
│   ├── .dg-btn--large                    → padding: --dg-spacing-inset-md --dg-spacing-inset-xl
│   │                                     → font-size: --dg-size-font-body
│   └── .dg-btn--full-width               → width: 100%
│
├── Color Variants
│   │
│   ├── .dg-btn-primary                   /* Brand primary - solid fill */
│   │   ├── default                       → bg: --dg-color-background-button-default
│   │   │                                   color: --dg-color-text-inverse
│   │   │                                   border: none
│   │   ├── :hover / .dg-btn-primary--hover → bg: --dg-color-background-button-interaction-hover
│   │   ├── :focus / .dg-btn-primary--focus → bg: --dg-color-background-button-interaction-focus
│   │   │                                     box-shadow: --dg-shadow-focus
│   │   ├── :focus:hover                  → bg: --dg-color-background-button-interaction-hover
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   ├── .dg-btn-primary--hover:focus   → bg: --dg-color-background-button-interaction-hover
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   ├── :active / .dg-btn-primary--active → bg: --dg-color-background-button-interaction-active
│   │   ├── :focus:active                 → bg: --dg-color-background-button-interaction-active
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   ├── .dg-btn-primary--hover:active → bg: --dg-color-background-button-interaction-active
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   ├── .dg-btn-primary--focus:active → bg: --dg-color-background-button-interaction-active
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   ├── .dg-btn-primary--active:focus → bg: --dg-color-background-button-interaction-active
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   └── :disabled / .dg-btn-primary--disabled → bg: --dg-color-background-button-state-disabled
│   │                                                 opacity: 0.6
│   │                                                 cursor: not-allowed
│   │
│   ├── .dg-btn-secondary                 /* Secondary brand color - uses shortcut tokens */
│   │   ├── default                       → bg: --dg-color-background-button-secondary-default
│   │   │                                   color: --dg-color-text-button-secondary-default
│   │   │                                   border: none
│   │   ├── :hover / .dg-btn-secondary--hover → bg: --dg-color-background-button-secondary-interaction-hover
│   │   ├── :focus / .dg-btn-secondary--focus → bg: --dg-color-background-button-secondary-interaction-focus
│   │   │                                       box-shadow: --dg-shadow-focus
│   │   ├── :focus:hover                  → bg: --dg-color-background-button-secondary-interaction-hover
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   ├── .dg-btn-secondary--hover:focus → bg: --dg-color-background-button-secondary-interaction-hover
│   │   │                                     box-shadow: --dg-shadow-focus
│   │   ├── :active / .dg-btn-secondary--active → bg: --dg-color-background-button-secondary-interaction-active
│   │   ├── :focus:active                 → bg: --dg-color-background-button-secondary-interaction-active
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   ├── .dg-btn-secondary--hover:active → bg: --dg-color-background-button-secondary-interaction-active
│   │   │                                     box-shadow: --dg-shadow-focus
│   │   ├── .dg-btn-secondary--focus:active → bg: --dg-color-background-button-secondary-interaction-active
│   │   │                                     box-shadow: --dg-shadow-focus
│   │   ├── .dg-btn-secondary--active:focus → bg: --dg-color-background-button-secondary-interaction-active
│   │   │                                     box-shadow: --dg-shadow-focus
│   │   └── :disabled / .dg-btn-secondary--disabled → bg: --dg-color-background-button-secondary-state-disabled
│   │                                                   opacity: 0.6
│   │                                                   cursor: not-allowed
│   │
│   ├── .dg-btn-subtle                    /* Neutral/subtle - uses shortcut tokens */
│   │   ├── default                       → bg: --dg-color-background-button-subtle-default
│   │   │                                   color: --dg-color-text-default
│   │   │                                   border: none
│   │   ├── :hover / .dg-btn-subtle--hover → bg: --dg-color-background-button-subtle-interaction-hover
│   │   ├── :focus / .dg-btn-subtle--focus → bg: --dg-color-background-button-subtle-interaction-focus
│   │   │                                     box-shadow: --dg-shadow-focus
│   │   ├── :focus:hover                  → bg: --dg-color-background-button-subtle-interaction-hover
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   ├── .dg-btn-subtle--hover:focus    → bg: --dg-color-background-button-subtle-interaction-hover
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   ├── :active / .dg-btn-subtle--active → bg: --dg-color-background-button-subtle-interaction-active
│   │   ├── :focus:active                 → bg: --dg-color-background-button-subtle-interaction-active
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   ├── .dg-btn-subtle--hover:active   → bg: --dg-color-background-button-subtle-interaction-active
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   ├── .dg-btn-subtle--focus:active   → bg: --dg-color-background-button-subtle-interaction-active
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   ├── .dg-btn-subtle--active:focus   → bg: --dg-color-background-button-subtle-interaction-active
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   └── :disabled / .dg-btn-subtle--disabled → bg: --dg-color-background-button-subtle-state-disabled
│   │                                               color: --dg-color-text-subtlest
│   │                                               cursor: not-allowed
│   │
│   ├── .dg-btn-neutral                   /* Gray background with border - uses background tokens */
│   │   ├── default                       → bg: --dg-color-background-bold
│   │   │                                   color: --dg-color-text-default
│   │   │                                   border: --dg-border-width-thin solid --dg-color-alpha-neutral-3
│   │   ├── :hover / .dg-btn-neutral--hover → bg: --dg-color-background-bolder
│   │   │                                    border-color: --dg-color-alpha-neutral-4
│   │   ├── :focus / .dg-btn-neutral--focus → box-shadow: --dg-shadow-focus
│   │   ├── :active / .dg-btn-neutral--active → bg: --dg-color-background-boldest
│   │   ├── :focus:active                 → bg: --dg-color-background-boldest
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   ├── .dg-btn-neutral--active:focus  → bg: --dg-color-background-boldest
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   └── :disabled / .dg-btn-neutral--disabled → opacity: 0.6
│   │                                                 cursor: not-allowed
│   │
│   ├── .dg-btn-outline                   /* Transparent bg + primary border - uses shortcut tokens */
│   │   ├── default                       → bg: --dg-color-background-button-outline-default
│   │   │                                   color: --dg-color-text-button-outline-default
│   │   │                                   border: --dg-border-width-thin solid --dg-color-border-button-outline-default
│   │   ├── :hover / .dg-btn-outline--hover → bg: --dg-color-background-button-outline-interaction-hover
│   │   │                                     border-color: --dg-color-border-button-outline-interaction-hover
│   │   ├── :focus / .dg-btn-outline--focus → box-shadow: --dg-shadow-focus
│   │   ├── :active / .dg-btn-outline--active → bg: --dg-color-background-button-outline-interaction-active
│   │   ├── :focus:active                 → bg: --dg-color-background-button-outline-interaction-active
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   ├── .dg-btn-outline--active:focus  → bg: --dg-color-background-button-outline-interaction-active
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   └── :disabled / .dg-btn-outline--disabled → border-color: --dg-color-border-button-outline-state-disabled
│   │                                                color: --dg-color-text-button-outline-state-disabled
│   │                                                opacity: 0.6
│   │
│   └── .dg-btn-ghost                     /* Transparent bg, no border - uses shortcut tokens */
│       ├── default                       → bg: --dg-color-background-button-ghost-default
│       │                                   color: --dg-color-text-button-ghost-default
│       │                                   border: none
│       ├── :hover / .dg-btn-ghost--hover  → bg: --dg-color-background-button-ghost-interaction-hover
│       │                                    color: --dg-color-text-button-ghost-interaction-hover
│       ├── :focus / .dg-btn-ghost--focus → box-shadow: --dg-shadow-focus
│       ├── :active / .dg-btn-ghost--active → bg: --dg-color-background-button-ghost-interaction-active
│       ├── :focus:active                 → bg: --dg-color-background-button-ghost-interaction-active
│       │                                   box-shadow: --dg-shadow-focus
│       ├── .dg-btn-ghost--active:focus    → bg: --dg-color-background-button-ghost-interaction-active
│       │                                   box-shadow: --dg-shadow-focus
│       └── :disabled / .dg-btn-ghost--disabled → color: --dg-color-text-button-ghost-state-disabled
│                                                 opacity: 0.6
│                                                 cursor: not-allowed
│
├── Semantic Variants
│   │
│   ├── .dg-btn-success                   /* Success/green solid */
│   │   ├── default                       → bg: --dg-color-semantic-success-default
│   │   │                                   color: --dg-color-text-inverse
│   │   │                                   border: none
│   │   ├── :hover / .dg-btn-success--hover → bg: --dg-color-semantic-success-bold
│   │   ├── :focus / .dg-btn-success--focus → box-shadow: --dg-shadow-focus
│   │   ├── :active / .dg-btn-success--active → bg: --dg-color-semantic-success-bolder
│   │   ├── :focus:active                 → bg: --dg-color-semantic-success-bolder
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   ├── .dg-btn-success--active:focus → bg: --dg-color-semantic-success-bolder
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   └── :disabled / .dg-btn-success--disabled → opacity: 0.6
│   │                                                 cursor: not-allowed
│   │
│   ├── .dg-btn-danger                    /* Error/red solid */
│   │   ├── default                       → bg: --dg-color-semantic-error-default
│   │   │                                   color: --dg-color-text-inverse
│   │   │                                   border: none
│   │   ├── :hover / .dg-btn-danger--hover → bg: --dg-color-semantic-error-bold
│   │   ├── :focus / .dg-btn-danger--focus → box-shadow: --dg-shadow-focus
│   │   ├── :active / .dg-btn-danger--active → bg: --dg-color-semantic-error-bolder
│   │   ├── :focus:active                 → bg: --dg-color-semantic-error-bolder
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   ├── .dg-btn-danger--active:focus  → bg: --dg-color-semantic-error-bolder
│   │   │                                   box-shadow: --dg-shadow-focus
│   │   └── :disabled / .dg-btn-danger--disabled → opacity: 0.6
│   │                                                 cursor: not-allowed
│   │
│   └── .dg-btn-danger-outline            /* Error/red outline */
│       ├── default                       → bg: transparent
│       │                                   color: --dg-color-semantic-error-default
│       │                                   border: --dg-border-width-medium solid --dg-color-semantic-error-default
│       ├── :hover / .dg-btn-danger-outline--hover → bg: --dg-color-semantic-error-lowest
│       ├── :focus / .dg-btn-danger-outline--focus → box-shadow: --dg-shadow-focus
│       ├── :active                       → bg: --dg-color-semantic-error-low
│       ├── :focus:active                 → bg: --dg-color-semantic-error-low
│       │                                   box-shadow: --dg-shadow-focus
│       ├── .dg-btn-danger-outline--active:focus → bg: --dg-color-semantic-error-low
│       │                                           box-shadow: --dg-shadow-focus
│       └── :disabled / .dg-btn-danger-outline--disabled → opacity: 0.6
│                                                           cursor: not-allowed
│
├── Gradient Variants
│   │
│   ├── .dg-btn-gradient-primary          → bg: --dg-gradient-brand-primary
│   │                                       color: --dg-color-text-inverse
│   │                                       border: none
│   │   └── :hover / .dg-btn-gradient-primary--hover → filter: brightness(1.1)
│   │                                                 transform: translateY(-1px)
│   │                                                 box-shadow: --dg-shadow-elevation-sm
│   │
│   ├── .dg-btn-gradient-accent           → bg: --dg-gradient-accent
│   │                                       color: --dg-color-text-inverse
│   │                                       border: none
│   │   └── :hover / .dg-btn-gradient-accent--hover → filter: brightness(1.1)
│   │                                                 transform: translateY(-1px)
│   │                                                 box-shadow: --dg-shadow-elevation-sm
│   │
│   ├── .dg-btn-gradient-hero             → bg: --dg-gradient-hero
│   │                                       color: --dg-color-text-bold
│   │                                       border: none
│   │   └── :hover / .dg-btn-gradient-hero--hover → filter: brightness(1.05)
│   │                                               transform: translateY(-1px)
│   │
│   └── .dg-btn-gradient-outline          /* Outline → gradient on hover */
│       ├── default                       → bg: transparent
│       │                                   color: --dg-color-primary-default
│       │                                   border: --dg-border-width-medium solid --dg-color-primary-default
│       └── :hover / .dg-btn-gradient-outline--hover → bg: --dg-gradient-hero
│                                                       border-color: --dg-color-accent-blue-default
│                                                       color: --dg-color-text-bold
│
├── Special Variants
│   │
│   ├── .dg-btn-raised                    → bg: --dg-color-primary-default
│   │                                       color: --dg-color-text-inverse
│   │                                       padding: --dg-spacing-inset-sm --dg-spacing-inset-lg
│   │                                       border-radius: --dg-size-border-radius-button
│   │                                       border: none
│   │                                       font-weight: --dg-font-weight-semi-bold
│   │                                       cursor: pointer
│   │                                       box-shadow: 0 2px 4px --dg-color-alpha-neutral-4
│   │                                       transition: --dg-transition-all
│   │   └── :hover                        → box-shadow: 0 4px 8px --dg-color-alpha-neutral-4
│   │
│   └── .dg-btn-fab                       /* Floating action button - circular */
│       ├── bg                            → --dg-color-primary-default
│       ├── color                         → --dg-color-text-inverse
│       ├── width                         → --dg-spacing-stack-md
│       ├── height                        → --dg-spacing-stack-md
│       ├── border-radius                 → --dg-size-border-radius-full
│       ├── border                        → none
│       ├── font-weight                   → --dg-font-weight-semi-bold
│       ├── cursor                        → pointer
│       ├── display                       → flex
│       ├── align-items                   → center
│       ├── justify-content               → center
│       ├── font-size                     → --dg-size-font-lg
│       └── box-shadow                    → 0 4px 8px --dg-color-alpha-neutral-4,
│                                           0 8px 16px --dg-color-alpha-neutral-5
│
├── Loading States
│   │
│   ├── .dg-btn--loading                  /* Spinner replaces text (grid overlay) */
│   │   ├── display                       → inline-grid
│   │   ├── place-items                   → center
│   │   ├── pointer-events                → none
│   │   ├── cursor                        → wait
│   │   ├── :focus                        → outline: none
│   │   │                                   box-shadow: none
│   │   ├── > *                           → grid-area: 1 / 1 (Stack all children)
│   │   └── span:not(.dg-spinner)         → visibility: hidden
│   │
│   └── .dg-btn--loading-overlay         /* Overlay keeps text visible */
│       ├── position                      → relative
│       ├── pointer-events                → none
│       ├── cursor                        → wait
│       └── .dg-btn--loading-mask
│           ├── position                  → absolute
│           ├── inset                     → 0
│           ├── bg                        → --dg-color-background-loading-overlay
│           ├── border-radius             → inherit
│           └── display                   → flex (centered)
│
├── Spinner Component
│   │
│   ├── .dg-spinner                       /* Used inside loading buttons */
│   │   ├── width                         → --dg-spacing-space-md
│   │   ├── height                        → --dg-spacing-space-md
│   │   ├── border                        → --dg-border-width-medium solid --dg-color-alpha-neutral-3
│   │   ├── border-top-color              → --dg-color-text-inverse
│   │   ├── border-radius                 → --dg-size-border-radius-full
│   │   └── animation                     → dg-spin --dg-duration-slowest linear infinite
│   │
│   └── .dg-spinner-primary               /* Larger primary spinner */
│       ├── border-top-color              → --dg-color-primary-default
│       ├── width                         → --dg-spacing-space-xl
│       ├── height                        → --dg-spacing-space-xl
│       └── border-width                  → --dg-border-width-thick
│
├── State Classes (for demos)
│   ├── .dg-btn--pressed                  → box-shadow: --dg-shadow-inset-sm
│   └── .dg-btn--disabled                 → opacity: 0.5
│                                           cursor: not-allowed
│                                           pointer-events: none
│
├── Transition Modifier
│   └── .dg-btn--transition-fast           → transition: background-color --dg-duration-fast,
│                                                 transform --dg-duration-fast
│       └── :hover                        → transform: translateY(-1px)
│
└── Usage Examples
    ├── Base Button
    │   ├── <button class="dg-btn">Base Button</button>
    │   ├── <button class="dg-btn dg-btn--hover">Base Hover</button>
    │   ├── <button class="dg-btn dg-btn--focus">Base Focus</button>
    │   └── <button class="dg-btn dg-btn--active">Base Active</button>
    │
    ├── Color Variants - Primary
    │   ├── <button class="dg-btn dg-btn-primary">Primary</button>
    │   ├── <button class="dg-btn dg-btn-primary dg-btn-primary--hover">Primary Hover</button>
    │   ├── <button class="dg-btn dg-btn-primary dg-btn-primary--active">Primary Active</button>
    │   ├── <button class="dg-btn dg-btn-primary dg-btn-primary--focus">Primary Focus</button>
    │   └── <button class="dg-btn dg-btn-primary dg-btn-primary--disabled" disabled>Primary Disabled</button>
    │
    ├── Color Variants - Secondary
    │   ├── <button class="dg-btn dg-btn-secondary">Secondary</button>
    │   ├── <button class="dg-btn dg-btn-secondary dg-btn-secondary--hover">Secondary Hover</button>
    │   ├── <button class="dg-btn dg-btn-secondary dg-btn-secondary--active">Secondary Active</button>
    │   ├── <button class="dg-btn dg-btn-secondary dg-btn-secondary--focus">Secondary Focus</button>
    │   └── <button class="dg-btn dg-btn-secondary dg-btn-secondary--disabled" disabled>Secondary Disabled</button>
    │
    ├── Color Variants - Subtle
    │   ├── <button class="dg-btn dg-btn-subtle">Subtle</button>
    │   ├── <button class="dg-btn dg-btn-subtle dg-btn-subtle--hover">Subtle Hover</button>
    │   ├── <button class="dg-btn dg-btn-subtle dg-btn-subtle--active">Subtle Active</button>
    │   ├── <button class="dg-btn dg-btn-subtle dg-btn-subtle--focus">Subtle Focus</button>
    │   └── <button class="dg-btn dg-btn-subtle dg-btn-subtle--disabled" disabled>Subtle Disabled</button>
    │
    ├── Color Variants - Neutral
    │   ├── <button class="dg-btn dg-btn-neutral">Neutral</button>
    │   ├── <button class="dg-btn dg-btn-neutral dg-btn-neutral--hover">Neutral Hover</button>
    │   ├── <button class="dg-btn dg-btn-neutral dg-btn-neutral--active">Neutral Active</button>
    │   ├── <button class="dg-btn dg-btn-neutral dg-btn-neutral--focus">Neutral Focus</button>
    │   └── <button class="dg-btn dg-btn-neutral dg-btn-neutral--disabled" disabled>Neutral Disabled</button>
    │
    ├── Color Variants - Outline
    │   ├── <button class="dg-btn dg-btn-outline">Outline</button>
    │   ├── <button class="dg-btn dg-btn-outline dg-btn-outline--hover">Outline Hover</button>
    │   ├── <button class="dg-btn dg-btn-outline dg-btn-outline--active">Outline Active</button>
    │   ├── <button class="dg-btn dg-btn-outline dg-btn-outline--focus">Outline Focus</button>
    │   └── <button class="dg-btn dg-btn-outline dg-btn-outline--disabled" disabled>Outline Disabled</button>
    │
    ├── Color Variants - Ghost
    │   ├── <button class="dg-btn dg-btn-ghost">Ghost</button>
    │   ├── <button class="dg-btn dg-btn-ghost dg-btn-ghost--hover">Ghost Hover</button>
    │   ├── <button class="dg-btn dg-btn-ghost dg-btn-ghost--active">Ghost Active</button>
    │   ├── <button class="dg-btn dg-btn-ghost dg-btn-ghost--focus">Ghost Focus</button>
    │   └── <button class="dg-btn dg-btn-ghost dg-btn-ghost--disabled" disabled>Ghost Disabled</button>
    │
    ├── Semantic Variants
    │   ├── <button class="dg-btn dg-btn-success">Success</button>
    │   ├── <button class="dg-btn dg-btn-success dg-btn-success--hover">Success Hover</button>
    │   ├── <button class="dg-btn dg-btn-success dg-btn-success--active">Success Active</button>
    │   ├── <button class="dg-btn dg-btn-success dg-btn-success--focus">Success Focus</button>
    │   ├── <button class="dg-btn dg-btn-danger">Danger</button>
    │   ├── <button class="dg-btn dg-btn-danger dg-btn-danger--hover">Danger Hover</button>
    │   ├── <button class="dg-btn dg-btn-danger dg-btn-danger--active">Danger Active</button>
    │   ├── <button class="dg-btn dg-btn-danger dg-btn-danger--focus">Danger Focus</button>
    │   ├── <button class="dg-btn dg-btn-danger-outline">Danger Outline</button>
    │   ├── <button class="dg-btn dg-btn-danger-outline dg-btn-danger-outline--hover">Danger Outline Hover</button>
    │   ├── <button class="dg-btn dg-btn-danger-outline dg-btn-danger-outline--active">Danger Outline Active</button>
    │   └── <button class="dg-btn dg-btn-danger-outline dg-btn-danger-outline--focus">Danger Outline Focus</button>
    │
    ├── Gradient Variants
    │   ├── <button class="dg-btn dg-btn-gradient-primary">Gradient Primary</button>
    │   ├── <button class="dg-btn dg-btn-gradient-accent">Gradient Accent</button>
    │   ├── <button class="dg-btn dg-btn-gradient-hero">Gradient Hero</button>
    │   └── <button class="dg-btn dg-btn-gradient-outline">Gradient Outline</button>
    │
    ├── Special Variants
    │   ├── <button class="dg-btn dg-btn-raised">Raised</button>
    │   └── <button class="dg-btn dg-btn-fab">+</button>
    │
    ├── Size Modifiers
    │   ├── <button class="dg-btn dg-btn-primary dg-btn--small">Small</button>
    │   ├── <button class="dg-btn dg-btn-primary">Default</button>
    │   ├── <button class="dg-btn dg-btn-primary dg-btn--large">Large</button>
    │   └── <button class="dg-btn dg-btn-primary dg-btn--full-width">Full Width</button>
    │
    ├── Radius Modifiers
    │   ├── <button class="dg-btn dg-btn-primary">Default Radius</button>
    │   ├── <button class="dg-btn dg-btn-primary dg-btn--radius-xl">XL Radius</button>
    │   └── <button class="dg-btn dg-btn-primary dg-btn--radius-full">Pill</button>
    │
    ├── Loading States
    │   ├── <button class="dg-btn dg-btn-primary dg-btn--loading">
    │   │     <span>Loading</span>
    │   │     <span class="dg-spinner"></span>
    │   │   </button>
    │   ├── <button class="dg-btn dg-btn-primary dg-btn--loading-overlay">
    │   │     <span>Submit</span>
    │   │     <span class="dg-btn--loading-mask">
    │   │       <span class="dg-spinner"></span>
    │   │     </span>
    │   │   </button>
    │   └── <button class="dg-btn dg-btn-primary dg-btn--loading-overlay">
    │         <span>Submit</span>
    │         <span class="dg-btn--loading-mask">
    │           <span class="dg-spinner dg-spinner-primary"></span>
    │         </span>
    │       </button>
    │
    ├── State Classes (for demos)
    │   ├── <button class="dg-btn dg-btn-primary dg-btn--pressed">Pressed</button>
    │   └── <button class="dg-btn dg-btn-primary dg-btn--disabled" disabled>Disabled</button>
    │
    ├── Transition Modifier
    │   └── <button class="dg-btn dg-btn-primary dg-btn--transition-fast">Fast Transition</button>
    │
    └── Combined Examples
        ├── <button class="dg-btn dg-btn-primary dg-btn--large dg-btn--radius-full">Large Pill</button>
        ├── <button class="dg-btn dg-btn-secondary dg-btn--small dg-btn--loading">
        │     <span>Loading</span>
        │     <span class="dg-spinner"></span>
        │   </button>
        ├── <button class="dg-btn dg-btn-outline dg-btn--large dg-btn--transition-fast">Large Outline Fast</button>
        ├── <button class="dg-btn dg-btn-neutral dg-btn--full-width">Full Width Neutral</button>
        ├── <button class="dg-btn dg-btn-success dg-btn--large dg-btn--radius-full">Large Success Pill</button>
        └── <button class="dg-btn dg-btn-primary dg-btn--large dg-btn--loading-overlay dg-btn--full-width">
              <span>Submit Form</span>
              <span class="dg-btn--loading-mask">
                <span class="dg-spinner dg-spinner-primary"></span>
              </span>
            </button>
```

## Spinner Design Structure

```
.dg-spinner-*
│
├── Base
│   └── .dg-spinner                       /* White spinner for dark backgrounds */
│       ├── width                         → --dg-spacing-space-md
│       ├── height                        → --dg-spacing-space-md
│       ├── border                        → --dg-border-width-medium solid --dg-color-alpha-neutral-3
│       ├── border-top-color              → --dg-color-text-inverse
│       ├── border-radius                 → --dg-size-border-radius-full
│       └── animation                     → dg-spin --dg-duration-slowest linear infinite
│
├── Variant Modifiers
│   └── .dg-spinner-primary               /* Primary color for light backgrounds */
│       ├── border-top-color              → --dg-color-primary-default
│       ├── width                         → --dg-spacing-space-xl
│       ├── height                        → --dg-spacing-space-xl
│       └── border-width                  → --dg-border-width-thick
│
└── Usage Examples
    ├── <span class="dg-spinner"></span>
    └── <span class="dg-spinner dg-spinner-primary"></span>
```

## Link Design Structure

```
.dg-link-*
│
├── Base
│   └── .dg-link                          /* Color, underline, transition */
│       ├── color                         → --dg-color-text-link-default
│       ├── text-decoration               → underline
│       └── transition                    → color 150ms ease-in-out
│
├── State Modifiers (Priority: Active > Focus > Hover > Visited > Default)
│   │
│   ├── :visited / .dg-link--visited     /* Visited link color - lowest priority */
│   │   └── color                        → --dg-color-text-link-interaction-visited
│   │
│   ├── :hover / .dg-link--hover         /* Hover color + thicker underline - overrides visited */
│   │   ├── color                        → --dg-color-text-link-interaction-hover
│   │   ├── text-decoration-thickness    → --dg-border-width-medium
│   │   └── :hover:active                → color: --dg-color-text-link-interaction-active
│   │
│   ├── :focus / .dg-link--focus         /* Focus color + outline ring - overrides visited and hover */
│   │   ├── color                        → --dg-color-text-link-interaction-focus
│   │   ├── outline                      → --dg-border-width-medium solid --dg-color-text-link-interaction-focus
│   │   ├── outline-offset               → --dg-spacing-space-2xs
│   │   ├── border-radius                → --dg-size-border-radius-sm
│   │   ├── :focus:hover                 → color: --dg-color-text-link-interaction-hover
│   │   │                                 text-decoration-thickness: --dg-border-width-medium
│   │   │                                 (outline remains)
│   │   └── :focus:active                → color: --dg-color-text-link-interaction-active
│   │                                     outline: --dg-border-width-medium solid --dg-color-text-link-interaction-active
│   │                                     (outline remains)
│   │
│   └── :active / .dg-link--active       /* Active/pressed color - highest priority */
│       ├── color                        → --dg-color-text-link-interaction-active
│       ├── :hover:active                → color: --dg-color-text-link-interaction-active
│       ├── :focus:active                → color: --dg-color-text-link-interaction-active
│       │                                 outline: --dg-border-width-medium solid --dg-color-text-link-interaction-active
│       └── :visited:active              → color: --dg-color-text-link-interaction-active
│
├── State Combinations (Handled Explicitly)
│   ├── :visited:hover                   → hover color (hover overrides visited)
│   ├── :visited:focus                   → focus color (focus overrides visited)
│   ├── :visited:hover:focus             → hover color + focus outline (hover color, focus indicator)
│   ├── :visited:hover:focus:active      → active color + active outline (active wins)
│   ├── .dg-link--hover:visited          → hover color (hover modifier overrides visited)
│   ├── .dg-link--focus:visited          → focus color (focus modifier overrides visited)
│   ├── .dg-link--focus:hover            → hover color + focus outline
│   ├── .dg-link--focus:hover:active     → active color + active outline
│   └── .dg-link--active:visited         → active color (active overrides visited)
│
└── Layout Helper
    └── .dg-link-state-showcase          /* Flex container for demo display */
        ├── display                      → flex
        ├── gap                          → --dg-spacing-gap-lg
        ├── flex-wrap                    → wrap
        ├── align-items                  → center
        ├── padding                      → --dg-spacing-inset-md
        ├── background-color             → --dg-color-background-default
        ├── border-radius                → --dg-size-border-radius-lg
        └── border                       → --dg-border-default
```

## Tag Design Structure

```
.dg-tag-*
│
├── Base
│   └── .dg-tag                           /* Reuses button shortcut tokens */
│       ├── display                       → inline-flex
│       ├── align-items                   → center
│       ├── gap                           → --dg-spacing-space-xs
│       ├── padding                       → --dg-spacing-space-xs --dg-spacing-space-sm
│       ├── border-radius                 → --dg-size-border-radius-sm
│       ├── font-size                     → --dg-size-font-caption
│       ├── background                    → --dg-color-background-button-default
│       └── color                         → --dg-color-text-inverse
│
├── Child Elements
│   └── .dg-tag-remove                    /* Remove button (×) - uses <button> element */
│       ├── display                       → inline-flex
│       ├── align-items                   → center
│       ├── justify-content               → center
│       ├── width                         → --dg-spacing-space-md
│       ├── height                        → --dg-spacing-space-md
│       ├── padding                       → 0
│       ├── margin                        → 0
│       ├── border                        → none
│       ├── border-radius                 → --dg-size-border-radius-sm
│       ├── background                    → transparent
│       ├── cursor                        → pointer
│       ├── color                         → inherit
│       ├── font-size                     → --dg-size-font-caption
│       ├── font-family                   → inherit
│       ├── line-height                   → 1
│       ├── transition                    → background-color --dg-duration-fast --dg-cubic-bezier-ease-in-out
│       ├── appearance                    → none (button reset)
│       └── HTML                          → <button type="button" aria-label="Remove tag">×</button>
│
├── Interaction States (for .dg-tag-remove)
│   │
│   ├── :hover / .dg-tag-remove--hover   → bg: --dg-color-background-button-interaction-hover
│   │
│   ├── :focus / .dg-tag-remove--focus   → bg: --dg-color-background-button-interaction-focus
│   │                                       outline: none
│   │                                       box-shadow: --dg-shadow-focus
│   │
│   ├── :focus:hover                     → bg: --dg-color-background-button-interaction-hover
│   │                                       box-shadow: --dg-shadow-focus
│   │
│   ├── .dg-tag-remove--hover:focus      → bg: --dg-color-background-button-interaction-hover
│   │                                       box-shadow: --dg-shadow-focus
│   │
│   ├── :active / .dg-tag-remove--active → bg: --dg-color-background-button-interaction-active
│   │                                       outline: none
│   │                                       box-shadow: --dg-shadow-focus
│   │
│   ├── :focus:active                    → bg: --dg-color-background-button-interaction-active
│   │                                       box-shadow: --dg-shadow-focus
│   │
│   ├── .dg-tag-remove--hover:active     → bg: --dg-color-background-button-interaction-active
│   │                                       box-shadow: --dg-shadow-focus
│   │
│   ├── .dg-tag-remove--focus:active     → bg: --dg-color-background-button-interaction-active
│   │                                       box-shadow: --dg-shadow-focus
│   │
│   ├── .dg-tag-remove--active:focus     → bg: --dg-color-background-button-interaction-active
│   │                                       box-shadow: --dg-shadow-focus
│   │
│   └── :disabled / .dg-tag-remove--disabled → bg: --dg-color-background-button-state-disabled
│                                             opacity: 0.6
│                                             cursor: not-allowed
│
└── Usage Examples
    ├── <span class="dg-tag">Tag</span>
    ├── <span class="dg-tag">Tag <button type="button" class="dg-tag-remove" aria-label="Remove tag">×</button></span>
    ├── <span class="dg-tag">Tag <button type="button" class="dg-tag-remove dg-tag-remove--hover" aria-label="Remove tag">×</button></span>
    ├── <span class="dg-tag">Tag <button type="button" class="dg-tag-remove dg-tag-remove--active" aria-label="Remove tag">×</button></span>
    ├── <span class="dg-tag">Tag <button type="button" class="dg-tag-remove dg-tag-remove--focus" aria-label="Remove tag">×</button></span>
    └── <span class="dg-tag">Tag <button type="button" class="dg-tag-remove dg-tag-remove--disabled" aria-label="Remove tag" disabled>×</button></span>
```

## State Priority Summary

### Button State Priority (All Variants)

1. **Active** (highest) - overrides all other states
2. **Focus** - indicator always visible, but hover and active override focus styles
3. **Hover** - overrides visited and focus (but not active)
4. **Default** - base state

### Link State Priority

1. **Active** (highest) - overrides all other states
2. **Focus** - indicator always visible, but hover and active override focus styles
3. **Hover** - overrides visited and focus (but not active)
4. **Visited** - lowest priority
5. **Default** - base state

### Tag Remove State Priority

1. **Active** (highest) - overrides all other states
2. **Focus** - indicator always visible, but hover and active override focus styles
3. **Hover** - overrides focus (but not active)
4. **Default** - base state

## BEM Naming Convention

All modifiers use `--` (double dash) following BEM methodology:

- ✅ `.dg-btn--hover`, `.dg-btn--focus`, `.dg-btn--active`
- ✅ `.dg-btn-primary--hover`, `.dg-btn-primary--focus`
- ✅ `.dg-link--hover`, `.dg-link--focus`, `.dg-link--active`
- ✅ `.dg-tag-remove--hover`, `.dg-tag-remove--focus`, `.dg-tag-remove--active`

## WCAG Compliance

### Focus Indicators

- Buttons: `box-shadow: var(--dg-shadow-focus)` (no outline)
- Links: `outline: var(--dg-border-width-medium) solid var(--dg-color-text-link-interaction-focus)`
  with `outline-offset`
- Tag remove: `box-shadow: var(--dg-shadow-focus)` (no outline)

### Semantic HTML

- All interactive elements use `<button>` or `<a>` elements
- Tag remove buttons use `<button type="button" aria-label="Remove tag">`
- Proper `disabled` attribute usage

### Keyboard Navigation

- All components are keyboard accessible (Tab, Enter, Space)
- Focus management works correctly
- No keyboard traps

## Navigation Design Structure

```
.dg-nav-*
│
├── Container
│   └── .dg-nav                          /* Navigation container */
│       ├── display                      → flex
│       └── gap                          → --dg-spacing-gap-lg
│
├── Link Variants
│   │
│   ├── .dg-nav-primary                  /* Primary navigation link */
│   │   ├── default                      → color: --dg-color-text-nav-default
│   │   │                                   font-weight: --dg-font-weight-semi-bold
│   │   │                                   text-decoration: none
│   │   │                                   transition: color --dg-duration-fast
│   │   ├── :hover / .dg-nav-primary--hover → color: --dg-color-text-nav-interaction-hover
│   │   ├── :focus / .dg-nav-primary--focus → color: --dg-color-text-nav-interaction-focus
│   │   │                                     outline: --dg-border-width-medium solid --dg-color-primary-default
│   │   │                                     outline-offset: --dg-spacing-space-2xs
│   │   │                                     border-radius: --dg-size-border-radius-sm
│   │   ├── :active / .dg-nav-primary--active → color: --dg-color-text-nav-interaction-active
│   │   └── .dg-nav-primary--selected     → color: --dg-color-text-nav-state-selected
│   │                                       font-weight: --dg-font-weight-semi-bold
│   │
│   ├── .dg-nav-secondary                /* Secondary navigation link */
│   │   ├── default                      → color: --dg-color-text-nav-secondary-default
│   │   │                                   font-weight: --dg-font-weight-medium
│   │   │                                   text-decoration: none
│   │   │                                   transition: color --dg-duration-fast
│   │   ├── :hover / .dg-nav-secondary--hover → color: --dg-color-text-nav-secondary-interaction-hover
│   │   ├── :focus / .dg-nav-secondary--focus → color: --dg-color-text-nav-secondary-interaction-focus
│   │   │                                       outline: --dg-border-width-medium solid --dg-color-primary-default
│   │   │                                       outline-offset: --dg-spacing-space-2xs
│   │   │                                       border-radius: --dg-size-border-radius-sm
│   │   ├── :active / .dg-nav-secondary--active → color: --dg-color-text-nav-secondary-interaction-active
│   │   └── .dg-nav-secondary--selected   → color: --dg-color-text-nav-secondary-state-selected
│   │                                       font-weight: --dg-font-weight-semi-bold
│   │
│   └── .dg-nav-tertiary                 /* Tertiary navigation link */
│       ├── default                      → color: --dg-color-text-nav-tertiary-default
│       │                                   font-weight: --dg-font-weight-regular
│       │                                   text-decoration: none
│       │                                   transition: color --dg-duration-fast
│       ├── :hover / .dg-nav-tertiary--hover → color: --dg-color-text-nav-tertiary-interaction-hover
│       ├── :focus / .dg-nav-tertiary--focus → color: --dg-color-text-nav-tertiary-interaction-focus
│       │                                       outline: --dg-border-width-medium solid --dg-color-primary-default
│       │                                       outline-offset: --dg-spacing-space-2xs
│       │                                       border-radius: --dg-size-border-radius-sm
│       ├── :active / .dg-nav-tertiary--active → color: --dg-color-text-nav-tertiary-interaction-active
│       └── .dg-nav-tertiary--selected    → color: --dg-color-text-nav-tertiary-state-selected
│                                           font-weight: --dg-font-weight-medium
│
├── Breadcrumb Container
│   └── .dg-breadcrumb                    /* Breadcrumb navigation container */
│       ├── display                       → flex
│       ├── gap                           → --dg-spacing-gap-xs
│       └── align-items                   → center
│
├── Breadcrumb Elements
│   └── .dg-breadcrumb-separator          /* Breadcrumb separator (e.g., "/") */
│       └── color                         → --dg-color-text-subtler
│
└── Usage Examples
    ├── <!-- Primary Navigation -->
    │   <div class="dg-nav">
    │     <a href="#" class="dg-nav-primary">Home</a>
    │     <a href="#" class="dg-nav-primary dg-nav-primary--hover">Products</a>
    │     <a href="#" class="dg-nav-primary dg-nav-primary--selected">About</a>
    │   </div>
    │
    ├── <!-- Secondary Navigation -->
    │   <div class="dg-nav">
    │     <a href="#" class="dg-nav-secondary">Overview</a>
    │     <a href="#" class="dg-nav-secondary dg-nav-secondary--hover">Features</a>
    │     <a href="#" class="dg-nav-secondary dg-nav-secondary--selected">Pricing</a>
    │   </div>
    │
    └── <!-- Breadcrumb Navigation -->
        <div class="dg-breadcrumb">
          <a href="#" class="dg-nav-tertiary">Home</a>
          <span class="dg-breadcrumb-separator">/</span>
          <a href="#" class="dg-nav-tertiary dg-nav-tertiary--hover">Products</a>
          <span class="dg-breadcrumb-separator">/</span>
          <span>Item</span>
        </div>
```

**State Priority**: Active > Focus > Hover > Selected > Default

**Accessibility**: All navigation links include focus states with visible outlines for keyboard
navigation, following WCAG guidelines.

## Nav Pill Design Structure

```
.dg-nav-pill-*
│
├── Container
│   └── .dg-nav-pills                     /* Pill container with subtle background */
│       ├── display                       → flex
│       ├── background                    → --dg-color-alpha-neutral-1
│       ├── border-radius                 → --dg-size-border-radius-lg
│       ├── padding                       → --dg-spacing-space-xs
│       └── gap                           → --dg-spacing-space-xs
│
├── Base
│   └── .dg-nav-pill                      /* Individual nav pill */
│       ├── padding                       → --dg-spacing-inset-xs --dg-spacing-inset-md
│       ├── border-radius                 → --dg-size-border-radius-md
│       ├── background                    → transparent
│       ├── color                         → --dg-color-text-subtle
│       ├── cursor                        → pointer
│       └── transition                    → --dg-transition-colors
│
├── Interaction Modifiers (combine with base)
│   ├── :hover / .dg-nav-pill-hover       → bg: --dg-color-background-nav-default-interaction-hover
│   │                                       color: --dg-color-primary-default
│   └── :active / .dg-nav-pill-active     → bg: --dg-color-background-nav-default-interaction-active
│                                           color: --dg-color-primary-default
│
├── State Modifiers (combine with base)
│   ├── .dg-nav-pill-selected             /* Currently active pill */
│   │   ├── background                    → --dg-color-background-nav-default-state-activated
│   │   ├── color                         → --dg-color-primary-bold
│   │   ├── font-weight                   → --dg-font-weight-semi-bold
│   │   └── :hover                        → bg: --dg-color-primary-subtle
│   │
│   └── .dg-nav-pill-disabled             /* Disabled state */
│       ├── color                         → --dg-color-text-subtlest
│       ├── opacity                       → 0.6
│       └── cursor                        → not-allowed
│
└── Usage Examples
    └── <div class="dg-nav-pills">
          <div class="dg-nav-pill">Default</div>
          <div class="dg-nav-pill dg-nav-pill-hover">Hover</div>
          <div class="dg-nav-pill dg-nav-pill-active">Active</div>
          <div class="dg-nav-pill dg-nav-pill-selected">Selected</div>
          <div class="dg-nav-pill dg-nav-pill-disabled">Disabled</div>
        </div>
```

## Badge Design Structure

```
.dg-badge-*
│
├── Base (requires .dg-badge)
│   └── .dg-badge                         /* Badge base styles */
│       ├── display                       → inline-block
│       ├── padding                       → --dg-spacing-space-xs --dg-spacing-space-md
│       ├── border-radius                 → --dg-size-border-radius-badge
│       ├── font-size                     → --dg-size-font-caption
│       ├── font-weight                   → --dg-font-weight-medium
│       ├── cursor                        → pointer
│       └── transition                    → transform, box-shadow, filter
│                                           --dg-duration-normal --dg-cubic-bezier-ease-out
│
├── Interactive Variant
│   └── .dg-badge-interactive             /* Clickable badge */
│       ├── default                       → bg: --dg-color-alpha-neutral-3
│       │                                   color: --dg-color-text-default
│       ├── :hover / .dg-badge-interactive-hover
│       │   └── bg                        → --dg-color-background-badge-interaction-hover
│       └── :active / .dg-badge-interactive-active
│           └── bg                        → --dg-color-background-badge-interaction-active
│
├── Semantic Variants (non-interactive)
│   ├── .dg-badge-info                    → bg: --dg-color-background-information-default
│   │                                       color: --dg-color-text-information-default
│   ├── .dg-badge-info-bold               → bg: --dg-color-background-information-bold
│   │                                       color: --dg-color-text-inverse
│   ├── .dg-badge-success                 → bg: --dg-color-background-success-default
│   │                                       color: --dg-color-text-success-default
│   ├── .dg-badge-success-bold            → bg: --dg-color-background-success-bold
│   │                                       color: --dg-color-text-inverse
│   ├── .dg-badge-warning                 → bg: --dg-color-background-warning-default
│   │                                       color: --dg-color-text-warning-default
│   ├── .dg-badge-warning-bold            → bg: --dg-color-background-warning-bold
│   │                                       color: --dg-color-text-inverse
│   ├── .dg-badge-error                   → bg: --dg-color-background-error-default
│   │                                       color: --dg-color-text-error-default
│   ├── .dg-badge-error-bold              → bg: --dg-color-background-error-bold
│   │                                       color: --dg-color-text-inverse
│   └── .dg-badge-new                     → bg: --dg-color-background-discover-bold
│                                           color: --dg-color-text-inverse
│                                           font-weight: --dg-font-weight-semi-bold
│
├── Gradient Variants
│   ├── .dg-badge-gradient-primary        → bg: --dg-gradient-brand-primary
│   │                                       color: --dg-color-text-inverse
│   │                                       font-weight: --dg-font-weight-semi-bold
│   ├── .dg-badge-gradient-accent         → bg: --dg-gradient-accent
│   │                                       color: --dg-color-text-inverse
│   │                                       font-weight: --dg-font-weight-semi-bold
│   ├── .dg-badge-gradient-success        → linear-gradient (success → teal)
│   │                                       color: --dg-color-text-inverse
│   │                                       font-weight: --dg-font-weight-semi-bold
│   ├── .dg-badge-gradient-hot             → linear-gradient (orange → red)
│   │                                       color: --dg-color-text-inverse
│   │                                       font-weight: --dg-font-weight-semi-bold
│   └── .dg-badge-gradient-hero            → bg: --dg-gradient-hero
│                                           color: --dg-color-text-bold
│                                           font-weight: --dg-font-weight-semi-bold
│
├── Shape Modifiers
│   ├── .dg-badge-rounded                 → border-radius: --dg-size-border-radius-default
│   └── .dg-badge-pill                    → border-radius: --dg-size-border-radius-full
│
├── Style Modifiers
│   └── .dg-badge-bold                    → font-weight: --dg-font-weight-semi-bold
│
└── Usage Examples
    ├── <span class="dg-badge dg-badge-interactive">Interactive</span>
    ├── <span class="dg-badge dg-badge-interactive dg-badge-interactive-hover">Hover</span>
    ├── <span class="dg-badge dg-badge-info">Info</span>
    ├── <span class="dg-badge dg-badge-success">Success</span>
    ├── <span class="dg-badge dg-badge-error-bold">Error</span>
    ├── <span class="dg-badge dg-badge-gradient-primary">Gradient</span>
    └── <span class="dg-badge dg-badge-new dg-badge-pill">New</span>
```

## Input Design Structure

```
.dg-input-*
│
├── Base
│   └── .dg-input                         /* Text input field */
│       ├── width                         → 100%
│       ├── padding                       → --dg-spacing-inset-sm
│       ├── border                        → --dg-border-width-thin solid --dg-color-alpha-neutral-3
│       ├── border-radius                 → --dg-size-border-radius-md
│       ├── background                    → --dg-color-background-default
│       ├── color                         → --dg-color-text-default
│       └── font-size                     → --dg-size-font-body
│
├── Interaction Modifiers (combine with base)
│   ├── :hover / .dg-input-hover          → border-color: --dg-color-border-input-interaction-hover
│   └── :focus / .dg-input-focus          → border-color: --dg-color-border-input-interaction-focus
│                                           box-shadow: --dg-shadow-focus
│                                           outline: none
│
├── Validation State Modifiers (combine with base)
│   ├── .dg-input-success                 /* Valid input */
│   │   ├── border                        → --dg-border-width-medium solid --dg-color-border-input-state-valid
│   │   └── box-shadow                    → 0 0 0 --dg-spacing-space-2xs --dg-color-semantic-success-lowest
│   │
│   ├── .dg-input-error                   /* Invalid input */
│   │   ├── border                        → --dg-border-width-medium solid --dg-color-border-input-state-invalid
│   │   └── box-shadow                    → 0 0 0 --dg-spacing-space-2xs --dg-color-semantic-error-lowest
│   │
│   └── .dg-input-warning                 /* Warning state */
│       ├── border                        → --dg-border-width-medium solid --dg-color-border-input-state-warning
│       └── box-shadow                    → 0 0 0 --dg-spacing-space-2xs --dg-color-semantic-warning-lowest
│
├── Disabled State (combine with base)
│   └── :disabled / .dg-input-disabled
│       ├── background                    → --dg-color-background-bold
│       ├── color                         → --dg-color-text-subtlest
│       ├── cursor                        → not-allowed
│       └── opacity                       → 0.6
│
├── Variant Modifiers
│   └── .dg-input-inset                   /* Inset shadow style */
│       ├── padding                       → --dg-spacing-inset-sm
│       ├── border                        → --dg-border-width-thin solid --dg-color-alpha-neutral-3
│       ├── border-radius                 → --dg-size-border-radius-md
│       ├── background                    → --dg-color-background-default
│       └── box-shadow                    → inset 0 1px 2px --dg-color-alpha-neutral-2
│
├── Helper Elements
│   ├── .dg-helper-text                   /* Helper/error message below input */
│   │   ├── font-size                     → --dg-size-font-caption
│   │   ├── color                         → --dg-color-text-subtle
│   │   └── margin                        → 0
│   ├── .dg-helper-text-success           → color: --dg-color-text-success-bold
│   └── .dg-helper-text-error             → color: --dg-color-text-error-default
│
└── Usage Examples
    ├── <!-- Default States -->
    │   <input type="text" class="dg-input" placeholder="Placeholder text..." />
    │   <input type="text" class="dg-input dg-input-hover" placeholder="Hover state..." />
    │   <input type="text" class="dg-input dg-input-focus" value="Focused input" />
    │   <input type="text" class="dg-input" disabled value="Disabled input" />
    │
    ├── <!-- Validation States -->
    │   <input type="text" class="dg-input dg-input-success" value="Valid input" />
    │   <input type="text" class="dg-input dg-input-error" value="Invalid input" />
    │   <input type="text" class="dg-input dg-input-warning" value="Check this" />
    │
    └── <!-- With Helper Text -->
        <div>
          <input type="text" class="dg-input dg-input-error" value="Invalid" />
          <span class="dg-helper-text">Please enter a valid email address</span>
        </div>
```

## Checkbox Design Structure

```
.dg-checkbox-*
│
├── Base
│   └── .dg-checkbox                      /* Container: 24×24, border, radius-sm, background */
│       ├── width/height                  → --dg-spacing-space-lg (24px)
│       ├── border                        → --dg-border-width-medium solid --dg-color-border-default
│       ├── border-radius                 → --dg-size-border-radius-sm
│       ├── background                    → --dg-color-background-default
│       ├── display                       → flex, centered
│       ├── align-items                   → center
│       ├── justify-content               → center
│       └── cursor                        → pointer
│
├── Interaction Modifiers (combine with base)
│   ├── :hover / .dg-checkbox-hover       → border-color: --dg-color-border-checkbox-interaction-hover
│   └── :focus / .dg-checkbox-focus       → border-color: --dg-color-border-checkbox-interaction-focus
│                                           box-shadow: --dg-shadow-focus
│                                           outline: none
│
├── State Modifiers (combine with base)
│   ├── .dg-checkbox-checked              /* Checked: primary bg + border + checkmark */
│   │   ├── background                    → --dg-color-background-checkbox-state-checked
│   │   ├── border-color                  → --dg-color-border-checkbox-state-checked
│   │   ├── color                         → --dg-color-text-inverse
│   │   ├── font-size                     → --dg-size-font-sm
│   │   └── (checkmark as text content "✓")
│   │
│   └── .dg-checkbox-disabled             /* Disabled: muted appearance */
│       ├── border-color                  → --dg-color-border-checkbox-state-disabled
│       ├── background                    → --dg-color-background-bold
│       ├── opacity                       → 0.6
│       └── cursor                        → not-allowed
│
└── Usage Examples
    ├── <div class="dg-checkbox"></div>                       /* Off */
    ├── <div class="dg-checkbox dg-checkbox-hover"></div>     /* Hover */
    ├── <div class="dg-checkbox dg-checkbox-focus"></div>     /* Focus */
    ├── <div class="dg-checkbox dg-checkbox-checked">✓</div>  /* Checked */
    └── <div class="dg-checkbox dg-checkbox-disabled"></div>  /* Disabled */
```

## Toggle Design Structure

```
.dg-toggle-*
│
├── Base
│   └── .dg-toggle                        /* Track: 48×24, pill shape, relative for handle */
│       ├── width                         → --dg-spacing-space-2xl (48px)
│       ├── height                        → --dg-spacing-space-lg (24px)
│       ├── border-radius                 → --dg-size-border-radius-full (pill)
│       ├── background                    → --dg-color-alpha-neutral-4
│       ├── position                      → relative
│       ├── cursor                        → pointer
│       └── transition                    → background-color --dg-duration-fast --dg-cubic-bezier-ease-in-out
│
├── Child Elements
│   └── .dg-toggle-handle                 /* Circular handle that slides */
│       ├── width/height                  → --dg-spacing-px20 (20px)
│       ├── border-radius                 → --dg-size-border-radius-full
│       ├── background                    → --dg-color-background-default
│       ├── position                      → absolute
│       ├── top                           → --dg-spacing-space-2xs (2px)
│       ├── left                          → --dg-spacing-space-2xs (2px)
│       ├── box-shadow                    → --dg-shadow-elevation-sm
│       └── transition                    → transform --dg-duration-fast --dg-cubic-bezier-ease-in-out
│
├── Interaction Modifiers (combine with base)
│   ├── :hover / .dg-toggle-hover         → background: --dg-color-alpha-neutral-5
│   └── :focus / .dg-toggle-focus          → outline: none
│                                           box-shadow: --dg-shadow-focus
│
├── State Modifiers (combine with base)
│   ├── .dg-toggle-checked                /* On: primary track + handle slides right */
│   │   ├── background                    → --dg-color-background-checkbox-state-checked
│   │   └── .dg-toggle-handle             → transform: translateX(--dg-spacing-space-lg)
│   │
│   └── .dg-toggle-disabled               /* Disabled: muted appearance */
│       ├── background                    → --dg-color-background-bold
│       ├── opacity                       → 0.6
│       └── cursor                        → not-allowed
│
└── Usage Examples
    ├── <div class="dg-toggle"><div class="dg-toggle-handle"></div></div>                     /* Off */
    ├── <div class="dg-toggle dg-toggle-hover"><div class="dg-toggle-handle"></div></div>     /* Hover */
    ├── <div class="dg-toggle dg-toggle-focus"><div class="dg-toggle-handle"></div></div>     /* Focus */
    ├── <div class="dg-toggle dg-toggle-checked"><div class="dg-toggle-handle"></div></div>   /* On */
    └── <div class="dg-toggle dg-toggle-disabled"><div class="dg-toggle-handle"></div></div>  /* Disabled */
```

## Radio Design Structure

```
.dg-radio-*
│
├── Base
│   └── .dg-radio                         /* Container: 24×24, circular, border */
│       ├── width/height                  → --dg-spacing-space-lg (24px)
│       ├── border                        → --dg-border-width-medium solid --dg-color-border-default
│       ├── border-radius                 → --dg-size-border-radius-full (circle)
│       ├── background                    → --dg-color-background-default
│       ├── display                       → flex, centered
│       ├── align-items                   → center
│       ├── justify-content               → center
│       ├── cursor                        → pointer
│       └── transition                    → border-color --dg-duration-fast --dg-cubic-bezier-ease-in-out
│
├── Child Elements
│   └── .dg-radio-dot                     /* Inner dot for selected state */
│       ├── width/height                  → --dg-spacing-space-sm (8px)
│       ├── border-radius                 → --dg-size-border-radius-full
│       └── background                    → --dg-color-background-radio-checkmark
│
├── Interaction Modifiers (combine with base)
│   ├── :hover / .dg-radio-hover          → border-color: --dg-color-border-radio-interaction-hover
│   └── :focus / .dg-radio-focus          → border-color: --dg-color-border-radio-interaction-focus
│                                           box-shadow: --dg-shadow-focus
│                                           outline: none
│
├── State Modifiers (combine with base)
│   ├── .dg-radio-checked                 /* Selected: primary border + shows dot */
│   │   └── border-color                  → --dg-color-border-radio-state-checked
│   │
│   └── .dg-radio-disabled                /* Disabled: muted appearance */
│       ├── border-color                  → --dg-color-border-subtle
│       ├── background                    → --dg-color-background-bold
│       ├── opacity                       → 0.6
│       └── cursor                        → not-allowed
│
└── Usage Examples
    ├── <div class="dg-radio"></div>                                              /* Off */
    ├── <div class="dg-radio dg-radio-hover"></div>                               /* Hover */
    ├── <div class="dg-radio dg-radio-focus"></div>                               /* Focus */
    ├── <div class="dg-radio dg-radio-checked"><div class="dg-radio-dot"></div></div>  /* Selected */
    └── <div class="dg-radio dg-radio-disabled"></div>                            /* Disabled */
```

## Select Design Structure

```
.dg-select-*
│
├── Base
│   └── .dg-select                        /* Select trigger button */
│       ├── display                       → inline-flex
│       ├── align-items                   → center
│       ├── justify-content               → space-between
│       ├── gap                           → --dg-spacing-space-sm
│       ├── padding                       → --dg-spacing-inset-sm --dg-spacing-inset-md
│       ├── background                    → --dg-color-background-default
│       ├── border                        → --dg-border-width-thin solid --dg-color-border-default
│       ├── border-radius                 → --dg-size-border-radius-md
│       ├── cursor                        → pointer
│       ├── min-width                     → 180px
│       └── transition                    → --dg-transition-colors
│
├── Child Elements
│   └── .dg-select-arrow                  /* Dropdown arrow indicator */
│       ├── color                         → --dg-color-text-subtle
│       └── transition                    → transform --dg-duration-fast --dg-cubic-bezier-ease-in-out
│
├── Interaction Modifiers (combine with base)
│   ├── :hover / .dg-select-hover         → background: --dg-color-background-select-interaction-hover
│   └── :active / .dg-select-active       → background: --dg-color-background-select-interaction-active
│
├── State Modifiers (combine with base)
│   ├── .dg-select-opened                 /* Dropdown is open */
│   │   ├── background                    → --dg-color-background-select-state-opened
│   │   ├── border-color                  → --dg-color-primary-default
│   │   └── .dg-select-arrow              → transform: rotate(180deg)
│   │
│   └── .dg-select-disabled               /* Disabled state */
│       ├── background                    → --dg-color-background-bold
│       ├── color                         → --dg-color-text-subtlest
│       ├── cursor                        → not-allowed
│       └── opacity                       → 0.6
│
└── Usage Examples
    ├── <div class="dg-select"><span>Select option...</span><span class="dg-select-arrow">▼</span></div>
    ├── <div class="dg-select dg-select-hover"><span>Hover</span><span class="dg-select-arrow">▼</span></div>
    ├── <div class="dg-select dg-select-active"><span>Active</span><span class="dg-select-arrow">▼</span></div>
    ├── <div class="dg-select dg-select-opened"><span>Opened</span><span class="dg-select-arrow">▼</span></div>
    └── <div class="dg-select dg-select-disabled"><span>Disabled</span><span class="dg-select-arrow">▼</span></div>
```

## Dropdown Design Structure

```
.dg-dropdown-*
│
├── Base
│   └── .dg-dropdown                      /* Dropdown container/menu */
│       ├── background                    → --dg-color-background-default
│       ├── border                        → --dg-border-width-thin solid --dg-color-alpha-neutral-3
│       ├── border-radius                 → --dg-size-border-radius-lg
│       ├── box-shadow                    → --dg-shadow-elevation-md
│       └── overflow                      → hidden
│
├── Child Elements
│   │
│   ├── .dg-dropdown-header               /* Section header */
│   │   ├── padding                       → --dg-spacing-space-sm --dg-spacing-inset-sm
│   │   ├── font-size                     → --dg-size-font-caption
│   │   ├── color                         → --dg-color-text-subtle
│   │   └── font-weight                   → --dg-font-weight-medium
│   │
│   ├── .dg-dropdown-item                 /* Menu option */
│   │   ├── padding                       → --dg-spacing-inset-xs --dg-spacing-inset-sm
│   │   ├── cursor                        → pointer
│   │   └── transition                    → background-color --dg-duration-fast --dg-cubic-bezier-ease-in-out
│   │
│   └── .dg-dropdown-divider              /* Separator line */
│       ├── border-top                    → --dg-border-width-thin solid --dg-color-alpha-neutral-2
│       └── margin                        → --dg-spacing-space-xs 0
│
├── Interaction Modifiers (for .dg-dropdown-item)
│   ├── :hover / .dg-dropdown-item-hover  → background: --dg-color-background-option-interaction-hover
│   └── :active / .dg-dropdown-item-active → background: --dg-color-background-option-interaction-active
│
├── Variant Modifiers (for .dg-dropdown-item)
│   ├── .dg-dropdown-item-danger          /* Destructive action */
│   │   └── color                         → --dg-color-semantic-error-default
│   │
│   └── .dg-dropdown-item-disabled        /* Disabled option */
│       ├── color                         → --dg-color-text-subtlest
│       ├── cursor                        → not-allowed
│       ├── pointer-events                → none
│       └── opacity                       → 0.6
│
└── Usage Examples
    ├── <div class="dg-dropdown">
    │     <div class="dg-dropdown-header">Account</div>
    │     <div class="dg-dropdown-item">Default</div>
    │     <div class="dg-dropdown-item dg-dropdown-item-hover">Hover</div>
    │     <div class="dg-dropdown-item dg-dropdown-item-active">Active</div>
    │     <div class="dg-dropdown-item dg-dropdown-item-disabled">Disabled</div>
    │     <div class="dg-dropdown-divider"></div>
    │     <div class="dg-dropdown-header">Actions</div>
    │     <div class="dg-dropdown-item">Export Data</div>
    │     <div class="dg-dropdown-item dg-dropdown-item-danger">Delete Account</div>
    │   </div>
    │
    └── <!-- Combined with Select trigger -->
        <div class="dg-select dg-select-opened">
          <span>Choose...</span><span class="dg-select-arrow">▼</span>
        </div>
        <div class="dg-dropdown">
          <div class="dg-dropdown-item">Option 1</div>
          <div class="dg-dropdown-item">Option 2</div>
          <div class="dg-dropdown-item">Option 3</div>
        </div>
```

## Tab Design Structure

```
.dg-tab-*
│
├── Container
│   └── .dg-tabs                          /* Tab bar with bottom border */
│       ├── display                       → flex
│       └── border-bottom                 → --dg-border-width-medium solid --dg-color-alpha-neutral-3
│
├── Base
│   └── .dg-tab                           /* Individual tab */
│       ├── padding                       → --dg-spacing-inset-sm --dg-spacing-inset-md
│       ├── color                         → --dg-color-text-subtle
│       ├── cursor                        → pointer
│       ├── border-bottom                 → --dg-border-width-medium solid transparent
│       ├── margin-bottom                 → calc(-1 * --dg-border-width-medium) (overlap container border)
│       └── transition                    → color, background-color
│                                           --dg-duration-fast --dg-cubic-bezier-ease-in-out
│
├── Interaction Modifiers (combine with base)
│   ├── :hover / .dg-tab-hover            → color: --dg-color-primary-default
│   │                                       bg: --dg-color-background-nav-default-interaction-hover
│   └── :active / .dg-tab-active          → bg: --dg-color-background-nav-default-interaction-active
│                                           color: --dg-color-primary-default
│
├── State Modifiers (combine with base)
│   ├── .dg-tab-selected                  /* Currently active tab */
│   │   ├── color                         → --dg-color-primary-bold
│   │   ├── font-weight                   → --dg-font-weight-semi-bold
│   │   ├── border-bottom-color           → --dg-color-primary-bold
│   │   ├── background                    → --dg-color-background-nav-default-state-activated
│   │   └── :hover                        → bg: --dg-color-primary-subtle
│   │
│   └── .dg-tab-disabled                  /* Disabled state */
│       ├── color                         → --dg-color-text-subtlest
│       ├── opacity                       → 0.6
│       └── cursor                        → not-allowed
│
└── Usage Examples
    └── <div class="dg-tabs">
          <div class="dg-tab">Default</div>
          <div class="dg-tab dg-tab-hover">Hover</div>
          <div class="dg-tab dg-tab-active">Active</div>
          <div class="dg-tab dg-tab-selected">Selected</div>
          <div class="dg-tab dg-tab-disabled">Disabled</div>
        </div>
```

## List Design Structure

```
.dg-list-item-*
│
├── Container
│   └── .dg-list                          /* List container */
│       ├── background                    → --dg-color-background-default
│       ├── border                        → --dg-border-width-thin solid --dg-color-alpha-neutral-3
│       ├── border-radius                 → --dg-size-border-radius-lg
│       └── overflow                      → hidden
│
├── Base
│   └── .dg-list-item                     /* Individual list item */
│       ├── padding                       → --dg-spacing-inset-sm --dg-spacing-inset-md
│       ├── cursor                        → pointer
│       ├── border-bottom                 → --dg-border-width-thin solid --dg-color-alpha-neutral-2
│       ├── transition                    → background-color --dg-duration-fast --dg-cubic-bezier-ease-in-out
│       └── :last-child                   → border-bottom: none
│
├── Interaction Modifiers (combine with base)
│   ├── :hover / .dg-list-item-hover      → bg: --dg-color-background-nav-default-interaction-hover
│   │                                       color: --dg-color-primary-default
│   └── :active / .dg-list-item-active    → bg: --dg-color-background-nav-default-interaction-active
│                                           color: --dg-color-primary-default
│
├── State Modifiers (combine with base)
│   ├── .dg-list-item-selected            /* Currently selected item */
│   │   ├── background                    → --dg-color-background-nav-default-state-activated
│   │   ├── color                         → --dg-color-primary-bold
│   │   ├── span { font-weight }          → --dg-font-weight-medium
│   │   └── :hover                        → bg: --dg-color-primary-subtle
│   │
│   └── .dg-list-item-disabled            /* Disabled state */
│       ├── color                         → --dg-color-text-subtlest
│       ├── cursor                        → not-allowed
│       └── opacity                       → 0.6
│
└── Usage Examples
    └── <div class="dg-list">
          <div class="dg-list-item">Default Item</div>
          <div class="dg-list-item dg-list-item-hover">Hovered Item</div>
          <div class="dg-list-item dg-list-item-active">Active Item</div>
          <div class="dg-list-item dg-list-item-selected"><span>✓</span> Selected Item</div>
          <div class="dg-list-item dg-list-item-disabled">Disabled Item</div>
        </div>
```

## Alert Design Structure

```
.dg-alert-*
│
├── Base
│   └── .dg-alert                         /* Padding, radius, left border accent */
│       ├── padding                       → --dg-spacing-inset-md
│       ├── border-radius                 → --dg-size-border-radius-md
│       └── border-left                   → --dg-border-width-thick solid
│
└── Semantic Variants
    ├── .dg-alert-info                    /* Blue - informational messages */
    │   ├── background                    → --dg-color-background-information-default
    │   ├── border-color                  → --dg-color-background-information-bold
    │   └── color                         → --dg-color-text-information-default
    ├── .dg-alert-success                 /* Green - success/confirmation */
    │   ├── background                    → --dg-color-background-success-default
    │   ├── border-color                  → --dg-color-background-success-bold
    │   └── color                         → --dg-color-text-success-default
    ├── .dg-alert-warning                 /* Orange - warnings/cautions */
    │   ├── background                    → --dg-color-background-warning-default
    │   ├── border-color                  → --dg-color-background-warning-bold
    │   └── color                         → --dg-color-text-warning-default
    ├── .dg-alert-error                   /* Red - errors/failures */
    │   ├── background                    → --dg-color-background-error-default
    │   ├── border-color                  → --dg-color-background-error-bold
    │   └── color                         → --dg-color-text-error-default
    └── .dg-alert-new                     /* Purple - new features/updates */
        ├── background                    → --dg-color-background-discover-default
        ├── border-color                  → --dg-color-background-discover-bold
        └── color                         → --dg-color-text-discover-default
```

## Tooltip Design Structure

```
.dg-tooltip-*
│
├── Base
│   └── .dg-tooltip                       /* Dark bg, white text, padding, radius, shadow, position */
│       ├── background-color              → --dg-color-background-boldest
│       ├── color                         → --dg-color-text-inverse
│       ├── padding                       → --dg-spacing-space-sm --dg-spacing-space-md
│       ├── border-radius                 → --dg-size-border-radius-md
│       ├── font-size                     → --dg-size-font-caption
│       ├── box-shadow                    → --dg-shadow-elevation-md
│       ├── position                      → relative
│       └── display                       → inline-block
│
├── Arrow Modifier
│   └── .dg-tooltip-arrow                 /* Enables CSS triangle arrow via ::after */
│       └── ::after                       → content: ''
│                                           position: absolute
│                                           border: --dg-spacing-space-xs solid transparent
│
└── Position Variants (arrow direction)
    ├── .dg-tooltip-top                   /* Arrow points down ▼ (tooltip above target) */
    │   └── ::after                       → top: 100%
    │                                       left: 50%
    │                                       transform: translateX(-50%)
    │                                       border-top-color: --dg-color-background-boldest
    ├── .dg-tooltip-bottom                /* Arrow points up ▲ (tooltip below target) */
    │   └── ::after                       → bottom: 100%
    │                                       left: 50%
    │                                       transform: translateX(-50%)
    │                                       border-bottom-color: --dg-color-background-boldest
    ├── .dg-tooltip-left                  /* Arrow points right ► (tooltip left of target) */
    │   └── ::after                       → left: 100%
    │                                       top: 50%
    │                                       transform: translateY(-50%)
    │                                       border-left-color: --dg-color-background-boldest
    └── .dg-tooltip-right                 /* Arrow points left ◄ (tooltip right of target) */
        └── ::after                       → right: 100%
                                          top: 50%
                                          transform: translateY(-50%)
                                          border-right-color: --dg-color-background-boldest
```

## Interactive Card Structure

```
.dg-interactive-card-*
│
├── Base
│   └── .dg-interactive-card               /* Clickable card container */
│       ├── background                    → --dg-color-background-default
│       ├── border                        → --dg-border-width-thin solid --dg-color-alpha-neutral-3
│       ├── border-radius                 → --dg-size-border-radius-lg
│       ├── padding                       → --dg-spacing-inset-md
│       ├── cursor                        → pointer
│       └── transition                    → --dg-transition-all
│
├── Child Elements
│   ├── .dg-interactive-card-title         /* Card title */
│   │   ├── font-weight                   → --dg-font-weight-semi-bold
│   │   ├── font-size                     → --dg-size-font-caption
│   │   └── margin                        → 0 0 --dg-spacing-space-2xs 0
│   │
│   └── .dg-interactive-card-desc          /* Card description */
│       ├── font-size                     → --dg-size-font-sub
│       ├── color                         → --dg-color-text-subtle
│       └── margin                        → 0
│
├── Interaction Modifiers (combine with base)
│   ├── :hover / .dg-interactive-card-hover → bg: --dg-color-background-card-interaction-hover
│   │                                          box-shadow: --dg-shadow-elevation-md
│   └── :active / .dg-interactive-card-active → bg: --dg-color-background-card-interaction-active
│                                               box-shadow: --dg-shadow-elevation-sm
│
├── State Modifiers (combine with base)
│   └── .dg-interactive-card-selected     /* Selected card */
│       ├── background                    → --dg-color-background-card-state-selected
│       ├── color                         → --dg-color-text-inverse
│       ├── .dg-interactive-card-title     → color: --dg-color-text-inverse
│       ├── .dg-interactive-card-desc     → color: --dg-color-text-inverse
│       │                                   opacity: 0.85
│       └── :hover                        → bg: --dg-color-primary-subtle
│                                           box-shadow: --dg-shadow-elevation-md
│
└── Usage Examples
    ├── <div class="dg-interactive-card">
    │     <div class="dg-interactive-card-title">Card Title</div>
    │     <div class="dg-interactive-card-desc">Card description text</div>
    │   </div>
    ├── <div class="dg-interactive-card dg-interactive-card-hover">
    │     <div class="dg-interactive-card-title">Hovered Card</div>
    │     <div class="dg-interactive-card-desc">Hover state</div>
    │   </div>
    ├── <div class="dg-interactive-card dg-interactive-card-active">
    │     <div class="dg-interactive-card-title">Active Card</div>
    │     <div class="dg-interactive-card-desc">Active state</div>
    │   </div>
    └── <div class="dg-interactive-card dg-interactive-card-selected">
          <div class="dg-interactive-card-title">Selected Card</div>
          <div class="dg-interactive-card-desc">Selected state</div>
        </div>
```

---
'@designgreat/lib-design-token': minor
---

Add navigation hierarchy interaction and state tokens

**New Tokens Added:**

**Interaction Tokens (color/shortcut/interaction.js):**

- `color.text.nav.interaction.{hover, focus, active}` - Primary navigation interaction states
- `color.text.nav.secondary.interaction.{hover, focus, active}` - Secondary navigation interaction
  states
- `color.text.nav.tertiary.interaction.{hover, focus, active}` - Tertiary navigation interaction
  states

**State Tokens (color/shortcut/state.js):**

- `color.text.nav.state.selected` - Primary navigation selected state
- `color.text.nav.secondary.state.selected` - Secondary navigation selected state
- `color.text.nav.tertiary.state.selected` - Tertiary navigation selected state

**Purpose:**

- Enables proper styling for navigation link hierarchy (primary, secondary, tertiary)
- Supports hover, focus, active, and selected states for all navigation variants
- Provides semantic tokens for navigation components instead of reusing generic link tokens
- Ensures consistent interaction patterns across navigation components

**Note:** Token structure avoids nesting under `DEFAULT` key to ensure proper CSS variable
generation by Style Dictionary.

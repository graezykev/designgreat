# CopyableCode Component

A React component that makes code values (tokens, CSS variables, etc.) copyable with a single click.

## Features

- ✅ **One-click copy** - Click any token or CSS variable to copy it to clipboard
- 🎨 **Visual feedback** - Hover effects and success indicators
- 🌗 **Theme-aware** - Adapts to light/dark themes
- ⚡ **Smooth animations** - Polished transitions and effects
- ♿ **Accessible** - Works with keyboard navigation

## Usage

### In MDX Files

First, import the component at the top of your MDX file (after frontmatter):

```mdx
---
sidebar_position: 1
---

import CopyableCode from '@site/src/components/CopyableCode'

# Your Page Title

| Token                                              | CSS Variable                                            |
| -------------------------------------------------- | ------------------------------------------------------- |
| <CopyableCode>color.primary.default</CopyableCode> | <CopyableCode>--dg-color-primary-default</CopyableCode> |
```

### Props

| Prop       | Type      | Default  | Description                           |
| ---------- | --------- | -------- | ------------------------------------- |
| `children` | `string`  | required | The text value to display and copy    |
| `inline`   | `boolean` | `false`  | Whether to render inline (future use) |

## Behavior

1. **Hover** - Background changes to primary color with subtle lift
2. **Click** - Copies value to clipboard
3. **Success** - Shows green checkmark (✓) for 2 seconds
4. **Active** - Returns to normal after success indicator fades

## Styling

The component uses CSS modules and theme-aware CSS variables:

- Hover: `var(--dg-color-primary-subtler)`
- Success: `var(--dg-color-semantic-success-lowest)`
- Text (success): `var(--dg-color-semantic-success-bold)`

## Browser Support

Uses the modern `navigator.clipboard.writeText()` API, supported in:

- Chrome 66+
- Firefox 63+
- Safari 13.1+
- Edge 79+

## Example in Tables

Perfect for documentation tables showing design tokens:

```mdx
|               | Token                                              | CSS Variable                                            | Value     |
| ------------- | -------------------------------------------------- | ------------------------------------------------------- | --------- |
| <ColorDemo /> | <CopyableCode>color.primary.default</CopyableCode> | <CopyableCode>--dg-color-primary-default</CopyableCode> | `#0055CC` |
```

Users can quickly copy tokens or CSS variables for use in their code!

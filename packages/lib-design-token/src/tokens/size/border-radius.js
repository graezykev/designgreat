export default {
  size: {
    'border-radius': {
      // Core scale
      none: {
        value: 0,
        type: 'dimension',
        comment: 'No rounding'
      },
      sm: {
        value: '{spacing.px2}',
        type: 'dimension',
        comment: '2px - Subtle rounding'
      },
      DEFAULT: {
        value: '{spacing.px4}',
        type: 'dimension',
        comment: '4px - Default rounding'
      },
      md: {
        value: '{spacing.px6}',
        type: 'dimension',
        comment: '6px - Medium rounding'
      },
      lg: {
        value: '{spacing.px8}',
        type: 'dimension',
        comment: '8px - Large rounding'
      },
      xl: {
        value: '{spacing.px12}',
        type: 'dimension',
        comment: '12px - Extra large rounding'
      },
      '2xl': {
        value: '{spacing.px16}',
        type: 'dimension',
        comment: '16px - 2x large rounding'
      },
      '3xl': {
        value: '{spacing.px24}',
        type: 'dimension',
        comment: '24px - 3x large rounding'
      },
      full: {
        value: 9999,
        type: 'dimension',
        comment: 'Fully rounded (pill shape)'
      },
      
      // Semantic mappings
      button: {
        value: '{size.border-radius.md}',
        type: 'dimension',
        comment: 'Buttons'
      },
      input: {
        value: '{size.border-radius.md}',
        type: 'dimension',
        comment: 'Input fields'
      },
      card: {
        value: '{size.border-radius.lg}',
        type: 'dimension',
        comment: 'Cards and containers'
      },
      modal: {
        value: '{size.border-radius.xl}',
        type: 'dimension',
        comment: 'Modals and dialogs'
      },
      badge: {
        value: '{size.border-radius.full}',
        type: 'dimension',
        comment: 'Badges and pills'
      },
      avatar: {
        value: '{size.border-radius.full}',
        type: 'dimension',
        comment: 'Circular avatars'
      },
      tooltip: {
        value: '{size.border-radius.DEFAULT}',
        type: 'dimension',
        comment: 'Tooltips'
      }
    }
  }
}

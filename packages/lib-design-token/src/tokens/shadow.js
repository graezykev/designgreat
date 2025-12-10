export default {
  shadow: {
    // Elevation-based shadow system
    // Each level represents increasing visual elevation
    elevation: {
      none: {
        type: 'shadow',
        value: [{
          color: 'transparent',
          offsetX: 0,
          offsetY: 0,
          blur: 0,
          spread: 0
        }]
      },
      sm: {
        type: 'shadow',
        value: [{
          color: '{color.shadow.DEFAULT}',
          offsetX: 0,
          offsetY: '{spacing.px1}',
          blur: '{spacing.px2}',
          spread: 0
        }],
        comment: 'Subtle lift - buttons, cards at rest'
      },
      md: {
        type: 'shadow',
        value: [{
          color: '{color.shadow.DEFAULT}',
          offsetX: 0,
          offsetY: '{spacing.px4}',
          blur: '{spacing.px6}',
          spread: '{spacing.px1}'
        }],
        comment: 'Medium elevation - raised cards, dropdowns'
      },
      lg: {
        type: 'shadow',
        value: [{
          color: '{color.shadow.DEFAULT}',
          offsetX: 0,
          offsetY: '{spacing.px10}',
          blur: '{spacing.px16}',
          spread: '{spacing.px2}'
        }],
        comment: 'High elevation - modals, popovers'
      },
      xl: {
        type: 'shadow',
        value: [{
          color: '{color.shadow.DEFAULT}',
          offsetX: 0,
          offsetY: '{spacing.px20}',
          blur: '{spacing.px24}',
          spread: '{spacing.px4}'
        }],
        comment: 'Maximum elevation - floating panels, toasts'
      }
    },

    // Focus ring shadow (for accessibility)
    focus: {
      type: 'shadow',
      value: [{
        color: '{color.primary.DEFAULT}',
        offsetX: 0,
        offsetY: 0,
        blur: 0,
        spread: '{spacing.px2}'
      }],
      comment: 'Focus ring for interactive elements'
    },

    // Inner shadow for inset effects
    inset: {
      sm: {
        type: 'shadow',
        value: [{
          color: '{color.shadow.DEFAULT}',
          offsetX: 0,
          offsetY: '{spacing.px1}',
          blur: '{spacing.px2}',
          spread: 0,
          type: 'inset'
        }],
        comment: 'Subtle inset - pressed states, inputs'
      },
      md: {
        type: 'shadow',
        value: [{
          color: '{color.shadow.DEFAULT}',
          offsetX: 0,
          offsetY: '{spacing.px2}',
          blur: '{spacing.px4}',
          spread: 0,
          type: 'inset'
        }],
        comment: 'Medium inset - recessed areas'
      }
    }
  }
}

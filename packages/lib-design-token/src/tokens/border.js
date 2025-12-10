export default {
  border: {
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Border widths
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    width: {
      none: {
        type: 'dimension',
        value: 0
      },
      thin: {
        type: 'dimension',
        value: '{spacing.px1}', // 1px
        comment: 'Default border width'
      },
      DEFAULT: {
        type: 'dimension',
        value: '{border.width.thin}'
      },
      medium: {
        type: 'dimension',
        value: '{spacing.px2}', // 2px
        comment: 'Emphasized borders'
      },
      thick: {
        type: 'dimension',
        value: '{spacing.px4}', // 4px
        comment: 'Heavy emphasis, focus rings'
      }
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // General purpose borders
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    default: {
      type: 'border',
      value: {
        width: '{border.width.thin}',
        style: 'solid',
        color: '{color.border.DEFAULT}'
      },
      comment: 'Standard border for cards, containers'
    },
    subtle: {
      type: 'border',
      value: {
        width: '{border.width.thin}',
        style: 'solid',
        color: '{color.border.subtle}'
      },
      comment: 'Subtle border for light separation'
    },
    bold: {
      type: 'border',
      value: {
        width: '{border.width.thin}',
        style: 'solid',
        color: '{color.border.bold}'
      },
      comment: 'Bold border for emphasis'
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Input borders
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    input: {
      DEFAULT: {
        type: 'border',
        value: {
          width: '{border.width.thin}',
          style: 'solid',
          color: '{color.border.input.DEFAULT}'
        }
      },
      focus: {
        type: 'border',
        value: {
          width: '{border.width.thin}',
          style: 'solid',
          color: '{color.border.input.interaction.focus}'
        }
      },
      error: {
        type: 'border',
        value: {
          width: '{border.width.thin}',
          style: 'solid',
          color: '{color.border.error.bold}'
        }
      },
      success: {
        type: 'border',
        value: {
          width: '{border.width.thin}',
          style: 'solid',
          color: '{color.border.success.bold}'
        }
      }
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Dividers
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    divider: {
      DEFAULT: {
        type: 'border',
        value: {
          width: '{border.width.thin}',
          style: 'solid',
          color: '{color.border.subtle}'
        },
        comment: 'Standard divider line'
      },
      bold: {
        type: 'border',
        value: {
          width: '{border.width.medium}',
          style: 'solid',
          color: '{color.border.DEFAULT}'
        },
        comment: 'Emphasized divider'
      }
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Focus ring (for accessibility)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    focus: {
      type: 'border',
      value: {
        width: '{border.width.medium}',
        style: 'solid',
        color: '{color.primary.DEFAULT}'
      },
      comment: 'Focus ring for keyboard navigation'
    }
  }
}

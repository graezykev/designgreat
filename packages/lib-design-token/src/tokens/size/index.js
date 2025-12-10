// Spacing scale based on modular scale principles
// https://www.modularscale.com/?16&px&1.125
export default {
  spacing: {
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Foundation: Pixel values (in rem, assuming 16px base)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    base: {
      type: 'dimension',
      value: 1
    },
    px0: {
      type: 'dimension',
      value: 0 // 0px
    },
    px1: {
      type: 'dimension',
      value: 1 / 16 // 1px
    },
    px2: {
      type: 'dimension',
      value: 2 / 16 // 2px
    },
    px4: {
      type: 'dimension',
      value: 4 / 16 // 4px
    },
    px6: {
      type: 'dimension',
      value: 6 / 16 // 6px
    },
    px8: {
      type: 'dimension',
      value: 8 / 16 // 8px
    },
    px10: {
      type: 'dimension',
      value: 10 / 16 // 10px
    },
    px12: {
      type: 'dimension',
      value: 12 / 16 // 12px
    },
    px14: {
      type: 'dimension',
      value: 14 / 16 // 14px
    },
    px16: {
      type: 'dimension',
      value: 16 / 16 // 16px
    },
    px20: {
      type: 'dimension',
      value: 20 / 16 // 20px
    },
    px24: {
      type: 'dimension',
      value: 24 / 16 // 24px
    },
    px28: {
      type: 'dimension',
      value: 28 / 16 // 28px
    },
    px32: {
      type: 'dimension',
      value: 32 / 16 // 32px
    },
    px40: {
      type: 'dimension',
      value: 40 / 16 // 40px
    },
    px48: {
      type: 'dimension',
      value: 48 / 16 // 48px
    },
    px64: {
      type: 'dimension',
      value: 64 / 16 // 64px
    },
    px80: {
      type: 'dimension',
      value: 80 / 16 // 80px
    },
    px96: {
      type: 'dimension',
      value: 96 / 16 // 96px
    },
    px128: {
      type: 'dimension',
      value: 128 / 16 // 128px
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Numbered scale (1-20) - maps to pixel values
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    1: {
      type: 'dimension',
      value: '{spacing.px0}'
    },
    2: {
      type: 'dimension',
      value: '{spacing.px1}'
    },
    3: {
      type: 'dimension',
      value: '{spacing.px2}'
    },
    4: {
      type: 'dimension',
      value: '{spacing.px4}'
    },
    5: {
      type: 'dimension',
      value: '{spacing.px6}'
    },
    6: {
      type: 'dimension',
      value: '{spacing.px8}'
    },
    7: {
      type: 'dimension',
      value: '{spacing.px10}'
    },
    8: {
      type: 'dimension',
      value: '{spacing.px12}'
    },
    9: {
      type: 'dimension',
      value: '{spacing.px14}'
    },
    10: {
      type: 'dimension',
      value: '{spacing.px16}'
    },
    11: {
      type: 'dimension',
      value: '{spacing.px20}'
    },
    12: {
      type: 'dimension',
      value: '{spacing.px24}'
    },
    13: {
      type: 'dimension',
      value: '{spacing.px28}'
    },
    14: {
      type: 'dimension',
      value: '{spacing.px32}'
    },
    15: {
      type: 'dimension',
      value: '{spacing.px40}'
    },
    16: {
      type: 'dimension',
      value: '{spacing.px48}'
    },
    17: {
      type: 'dimension',
      value: '{spacing.px64}'
    },
    18: {
      type: 'dimension',
      value: '{spacing.px80}'
    },
    19: {
      type: 'dimension',
      value: '{spacing.px96}'
    },
    20: {
      type: 'dimension',
      value: '{spacing.px128}'
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Semantic Scales
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    // General-purpose spacing scale
    space: {
      none: {
        type: 'dimension',
        value: '{spacing.px0}'
      },
      '2xs': {
        type: 'dimension',
        value: '{spacing.px2}' // 2px - hairline
      },
      xs: {
        type: 'dimension',
        value: '{spacing.px4}' // 4px - tight
      },
      sm: {
        type: 'dimension',
        value: '{spacing.px8}' // 8px - compact
      },
      md: {
        type: 'dimension',
        value: '{spacing.px16}' // 16px - default
      },
      DEFAULT: {
        type: 'dimension',
        value: '{spacing.space.md}'
      },
      lg: {
        type: 'dimension',
        value: '{spacing.px24}' // 24px - relaxed
      },
      xl: {
        type: 'dimension',
        value: '{spacing.px32}' // 32px - loose
      },
      '2xl': {
        type: 'dimension',
        value: '{spacing.px48}' // 48px - spacious
      },
      '3xl': {
        type: 'dimension',
        value: '{spacing.px64}' // 64px - roomy
      }
    },

    // For flex/grid gaps
    gap: {
      none: {
        type: 'dimension',
        value: '{spacing.px0}'
      },
      xs: {
        type: 'dimension',
        value: '{spacing.px4}' // 4px
      },
      sm: {
        type: 'dimension',
        value: '{spacing.px8}' // 8px
      },
      md: {
        type: 'dimension',
        value: '{spacing.px12}' // 12px
      },
      DEFAULT: {
        type: 'dimension',
        value: '{spacing.gap.md}'
      },
      lg: {
        type: 'dimension',
        value: '{spacing.px16}' // 16px
      },
      xl: {
        type: 'dimension',
        value: '{spacing.px24}' // 24px
      }
    },

    // For padding inside containers
    inset: {
      none: {
        type: 'dimension',
        value: '{spacing.px0}'
      },
      xs: {
        type: 'dimension',
        value: '{spacing.px8}' // 8px
      },
      sm: {
        type: 'dimension',
        value: '{spacing.px12}' // 12px
      },
      md: {
        type: 'dimension',
        value: '{spacing.px16}' // 16px
      },
      DEFAULT: {
        type: 'dimension',
        value: '{spacing.inset.md}'
      },
      lg: {
        type: 'dimension',
        value: '{spacing.px24}' // 24px
      },
      xl: {
        type: 'dimension',
        value: '{spacing.px32}' // 32px
      }
    },

    // Vertical spacing between sections
    stack: {
      none: {
        type: 'dimension',
        value: '{spacing.px0}'
      },
      xs: {
        type: 'dimension',
        value: '{spacing.px16}' // 16px
      },
      sm: {
        type: 'dimension',
        value: '{spacing.px24}' // 24px
      },
      md: {
        type: 'dimension',
        value: '{spacing.px40}' // 40px
      },
      DEFAULT: {
        type: 'dimension',
        value: '{spacing.stack.md}'
      },
      lg: {
        type: 'dimension',
        value: '{spacing.px64}' // 64px
      },
      xl: {
        type: 'dimension',
        value: '{spacing.px96}' // 96px
      }
    }
  }
}

export default {
  gradient: {
    // Primary brand gradient
    'brand-primary': {
      type: 'linear-gradient',
      value: {
        angle: 135,
        colors: [
          { color: '{color.primary.DEFAULT}', percentage: 0 },
          { color: '{color.primary.bold}', percentage: 100 }
        ]
      },
      comment: 'Primary brand gradient for CTAs and highlights'
    },

    // Subtle surface gradient for backgrounds
    'surface-subtle': {
      type: 'linear-gradient',
      value: {
        angle: 180,
        colors: [
          { color: '{color.background.DEFAULT}', percentage: 0 },
          { color: '{color.background.bold}', percentage: 100 }
        ]
      },
      comment: 'Subtle background gradient for depth'
    },

    // Hero section gradient
    hero: {
      type: 'linear-gradient',
      value: {
        angle: 135,
        colors: [
          { color: '{color.accent.blue.low}', percentage: 0 },
          { color: '{color.accent.purple.low}', percentage: 100 }
        ]
      },
      comment: 'Hero section and feature highlights'
    },

    // Accent gradient for special elements
    accent: {
      type: 'linear-gradient',
      value: {
        angle: 90,
        colors: [
          { color: '{color.accent.blue.DEFAULT}', percentage: 0 },
          { color: '{color.accent.teal.DEFAULT}', percentage: 100 }
        ]
      },
      comment: 'Accent gradient for badges and highlights'
    },

    // Overlay gradient for images/content
    'overlay-dark': {
      type: 'linear-gradient',
      value: {
        angle: 180,
        colors: [
          { color: 'transparent', percentage: 0 },
          { color: '{color.alpha.neutral.4}', percentage: 100 }
        ]
      },
      comment: 'Dark overlay for text on images'
    }
  }
}

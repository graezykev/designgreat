export default {
  'letter-spacing': {
    // Tighter spacing (negative values) - for large headings
    tighter: {
      value: -0.05,
      type: 'letterSpacing',
      comment: '-0.05em - compressed display text'
    },
    tight: {
      value: -0.025,
      type: 'letterSpacing',
      comment: '-0.025em - headings'
    },

    // Normal spacing
    normal: {
      value: 0,
      type: 'letterSpacing',
      comment: '0 - body text default'
    },
    DEFAULT: {
      value: '{letter-spacing.normal}',
      type: 'letterSpacing'
    },

    // Wider spacing (positive values) - for small caps, labels
    wide: {
      value: 0.025,
      type: 'letterSpacing',
      comment: '0.025em - subtle expansion'
    },
    wider: {
      value: 0.05,
      type: 'letterSpacing',
      comment: '0.05em - all caps text'
    },
    widest: {
      value: 0.1,
      type: 'letterSpacing',
      comment: '0.1em - very spaced labels'
    }
  }
}

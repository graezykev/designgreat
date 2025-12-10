export default {
  'line-height': {
    // Unitless line-height values (recommended)
    // These multiply with font-size to compute actual line-height

    none: {
      value: 1,
      type: 'lineHeight',
      comment: 'No extra line spacing'
    },
    tight: {
      value: 1.25,
      type: 'lineHeight',
      comment: 'Tight spacing for headings'
    },
    snug: {
      value: 1.375,
      type: 'lineHeight',
      comment: 'Slightly tighter than normal'
    },
    normal: {
      value: 1.5,
      type: 'lineHeight',
      comment: 'Default for body text'
    },
    DEFAULT: {
      value: '{line-height.normal}',
      type: 'lineHeight'
    },
    relaxed: {
      value: 1.625,
      type: 'lineHeight',
      comment: 'Slightly more spacing'
    },
    loose: {
      value: 2,
      type: 'lineHeight',
      comment: 'Double-spaced'
    },

    // Semantic line-heights matching font sizes
    title: {
      value: '{line-height.none}',
      type: 'lineHeight'
    },
    h1: {
      value: '{line-height.tight}',
      type: 'lineHeight'
    },
    h2: {
      value: '{line-height.tight}',
      type: 'lineHeight'
    },
    h3: {
      value: '{line-height.snug}',
      type: 'lineHeight'
    },
    h4: {
      value: '{line-height.snug}',
      type: 'lineHeight'
    },
    h5: {
      value: '{line-height.normal}',
      type: 'lineHeight'
    },
    h6: {
      value: '{line-height.normal}',
      type: 'lineHeight'
    },
    body: {
      value: '{line-height.normal}',
      type: 'lineHeight'
    },
    caption: {
      value: '{line-height.normal}',
      type: 'lineHeight'
    },
    overline: {
      value: '{line-height.normal}',
      type: 'lineHeight'
    },
    sub: {
      value: '{line-height.normal}',
      type: 'lineHeight'
    }
  }
}

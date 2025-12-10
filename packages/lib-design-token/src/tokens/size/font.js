export default {
  size: {
    font: {
      // Base font size (16px)
      base: {
        value: '{spacing.px16}',
        type: 'fontSize',
        comment: '16px - browser default'
      },
      DEFAULT: {
        value: '{size.font.base}',
        type: 'fontSize'
      },

      // T-shirt scale for font sizes
      xs: {
        value: '{spacing.px12}', // 12px
        type: 'fontSize'
      },
      sm: {
        value: '{spacing.px14}', // 14px
        type: 'fontSize'
      },
      md: {
        value: '{spacing.px16}', // 16px
        type: 'fontSize'
      },
      lg: {
        value: '{spacing.px20}', // 20px
        type: 'fontSize'
      },
      xl: {
        value: '{spacing.px24}', // 24px
        type: 'fontSize'
      },
      '2xl': {
        value: '{spacing.px32}', // 32px
        type: 'fontSize'
      },
      '3xl': {
        value: '{spacing.px40}', // 40px
        type: 'fontSize'
      },
      '4xl': {
        value: '{spacing.px48}', // 48px
        type: 'fontSize'
      }
    }
  }
}

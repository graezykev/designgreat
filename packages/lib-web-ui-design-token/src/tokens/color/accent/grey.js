const gradientConfig = {
  totalShades: 12,
  defaultShade: 11,
  darkestLightness: 0.05,
  lightestLightness: 1
}

export default {
  color: {
    accent: {
      grey: {
        1: { value: '{color.base.grey}', type: 'color', gradientConfig },
        2: { value: '{color.base.grey}', type: 'color', gradientConfig },
        3: { value: '{color.base.grey}', type: 'color', gradientConfig },
        4: { value: '{color.base.grey}', type: 'color', gradientConfig },
        5: { value: '{color.base.grey}', type: 'color', gradientConfig },
        6: { value: '{color.base.grey}', type: 'color', gradientConfig },
        7: { value: '{color.base.grey}', type: 'color', gradientConfig },
        8: { value: '{color.base.grey}', type: 'color', gradientConfig },
        9: { value: '{color.base.grey}', type: 'color', gradientConfig },
        10: { value: '{color.base.grey}', type: 'color', gradientConfig },
        11: { value: '{color.base.grey}', type: 'color' },
        12: { value: '{color.base.grey}', type: 'color', gradientConfig },
        bold: { value: '{color.base.grey}', type: 'color', isAlias: true },
        DEFAULT: { value: '{color.base.grey}', type: 'color', isAlias: true },
        subtle: { value: '{color.base.grey}', type: 'color', isAlias: true },
        subtler: { value: '{color.base.grey}', type: 'color', isAlias: true },
        subtlest: { value: '{color.base.grey}', type: 'color', isAlias: true },
        low: { value: '{color.base.grey}', type: 'color', isAlias: true },
        lower: { value: '{color.base.grey}', type: 'color', isAlias: true },
        lowest: { value: '{color.base.grey}', type: 'color', isAlias: true },
        dull: { value: '{color.base.grey}', type: 'color', isAlias: true },
        duller: { value: '{color.base.grey}', type: 'color', isAlias: true },
        dullest: { value: '{color.base.grey}', type: 'color', isAlias: true },
        silent: { value: '{color.base.grey}', type: 'color', isAlias: true }
      }
    }
  }
}

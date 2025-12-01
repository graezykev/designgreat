import tokens from '../base/saturated.js'

const gradientConfig = {
  totalShades: 10,
  defaultShade: 7,
  darkestLightness: 0.05,
  lightestLightness: 0.95
}
const colors = tokens.color.base

const accent = Object.keys(colors).reduce((accent, name) => ({
  ...accent,
  [name]: {
    1: { value: `{color.base.${name}}`, type: 'color', gradientConfig },
    2: { value: `{color.base.${name}}`, type: 'color', gradientConfig },
    3: { value: `{color.base.${name}}`, type: 'color', gradientConfig },
    4: { value: `{color.base.${name}}`, type: 'color', gradientConfig },
    5: { value: `{color.base.${name}}`, type: 'color', gradientConfig },
    6: { value: `{color.base.${name}}`, type: 'color', gradientConfig },
    7: { value: `{color.base.${name}}`, type: 'color' },
    8: { value: `{color.base.${name}}`, type: 'color', gradientConfig },
    9: { value: `{color.base.${name}}`, type: 'color', gradientConfig },
    10: { value: `{color.base.${name}}`, type: 'color', gradientConfig },
    boldest: { value: `{color.base.${name}}`, type: 'color', isAlias: true },
    bolder: { value: `{color.base.${name}}`, type: 'color', isAlias: true },
    bold: { value: `{color.base.${name}}`, type: 'color', isAlias: true },
    DEFAULT: { value: `{color.base.${name}}`, type: 'color', isAlias: true },
    subtle: { value: `{color.base.${name}}`, type: 'color', isAlias: true },
    subtler: { value: `{color.base.${name}}`, type: 'color', isAlias: true },
    subtlest: { value: `{color.base.${name}}`, type: 'color', isAlias: true },
    low: { value: `{color.base.${name}}`, type: 'color', isAlias: true },
    lower: { value: `{color.base.${name}}`, type: 'color', isAlias: true },
    lowest: { value: `{color.base.${name}}`, type: 'color', isAlias: true }
  }
}), {})

// console.log(accent)

export default {
  color: {
    accent
  }
}

export default {
  color: {
    tertiary: {
      'DEFAULT': {
        value: '{color.accent.magenta.7}',
        type: 'color'
      },
      'bold': { // a darker one for the [hover] state
        value: '{color.accent.magenta.bold}',
        type: 'color'
      },
      'subtle': { // a lighter one for the [active] (pressing) state
        value: '{color.accent.magenta.subtle}',
        type: 'color'
      },
      'subtler': { // a more lighter one for the [active] (pressing) state
        value: '{color.accent.magenta.subtler}',
        type: 'color'
      },
      'blur': { // a more lighter and more transparent one for the [disabled] state
        value: '{color.accent.magenta.subtlest}',
        attributes: { alpha: 0.7 },
        type: 'color'
      }
    }
  }
}

export default {
  color: {
    secondary: {
      'DEFAULT': {
        value: '{color.accent.teal.7}',
        type: 'color'
      },
      'bold': { // a darker one for the [hover] state
        value: '{color.accent.teal.bold}',
        type: 'color'
      },
      'subtle': { // a lighter one for the [active] (pressing) state
        value: '{color.accent.teal.subtle}',
        type: 'color'
      },
      'subtler': { // a more lighter one for the [active] (pressing) state
        value: '{color.accent.teal.subtler}',
        type: 'color'
      },
      'blur': { // a more lighter and more transparent one for the [disabled] state
        value: '{color.accent.teal.subtlest}',
        attributes: { alpha: 0.7 },
        type: 'color'
      }
    }
  }
}

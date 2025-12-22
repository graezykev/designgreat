export default {
  color: {
    primary: {
      'DEFAULT': {
        value: '{color.accent.blue.DEFAULT}',
        type: 'color'
      },
      'bold': { // a darker one for the [hover] state
        value: '{color.accent.blue.bold}',
        type: 'color'
      },
      'bolder': { // an even darker one for the [active] (pressing) state
        value: '{color.accent.blue.bolder}',
        type: 'color'
      },
      'subtle': { // a lighter one for subtle states
        value: '{color.accent.blue.subtle}',
        type: 'color'
      },
      'subtler': { // an even lighter one for subtle states
        value: '{color.accent.blue.subtler}',
        type: 'color'
      },
      'blur': { // a more lighter and more transparent one for the [disabled] state
        value: '{color.accent.blue.subtlest}',
        attributes: { alpha: 0.7 },
        type: 'color'
      },

      visited: {
        DEFAULT: {
          value: '{color.primary.DEFAULT}',
          type: 'color'
        }
      },
      hover: {
        DEFAULT: {
          value: '{color.primary.bold}',
          type: 'color'
        }
      },
      focus: {
        DEFAULT: {
          value: '{color.primary.DEFAULT}',
          type: 'color'
        },
        shadow: {
          value: '{color.primary.blur}',
          type: 'color'
        }
      },
      active: {
        DEFAULT: {
          value: '{color.primary.bolder}',
          type: 'color'
        }
      },
      disabled: {
        DEFAULT: {
          value: '{color.primary.blur}',
          type: 'color'
        }
      },
      activated: {
        DEFAULT: {
          value: '{color.primary.DEFAULT}',
          type: 'color'
        },
        bg: {
          value: '{color.primary.blur}',
          type: 'color'
        }
      },
      opened: {
        DEFAULT: {
          value: '{color.primary.DEFAULT}',
          type: 'color'
        },
        bg: {
          value: '{color.primary.blur}',
          type: 'color'
        }
      },
      checked: {
        DEFAULT: {
          value: '{color.primary.DEFAULT}',
          type: 'color'
        }
      }
    }
  }
}

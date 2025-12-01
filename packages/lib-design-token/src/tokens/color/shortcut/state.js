export default {
  color: {
    text: {
      nav: {
        'secondary': {
          state: {
            activated: {
              value: '{color.primary.activated.DEFAULT}',
              type: 'color'
            }
          }
        },
        'tertiary': {
          state: {
            activated: {
              value: '{color.primary.activated.DEFAULT}',
              type: 'color'
            }
          }
        }
      }
    },
    background: {
      nav: {
        DEFAULT: {
          state: {
            activated: {
              value: '{color.primary.activated.bg}',
              type: 'color'
            }
          }
        }
      }
    }
  }
}

export default {
  color: {
    text: {
      nav: {
        state: {
          selected: {
            value: '{color.primary.active.DEFAULT}',
            type: 'color'
          }
        },
        'secondary': {
          state: {
            activated: {
              value: '{color.primary.activated.DEFAULT}',
              type: 'color'
            },
            selected: {
              value: '{color.primary.active.DEFAULT}',
              type: 'color'
            }
          }
        },
        'tertiary': {
          state: {
            activated: {
              value: '{color.primary.activated.DEFAULT}',
              type: 'color'
            },
            selected: {
              value: '{color.primary.active.DEFAULT}',
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
      },
      card: {
        state: {
          selected: {
            value: '{color.primary.activated.bg}',
            type: 'color'
          }
        }
      }
    }
  }
}

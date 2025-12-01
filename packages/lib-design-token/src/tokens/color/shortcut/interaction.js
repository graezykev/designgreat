export default {
  color: {
    "text": {
      "link": {
        "interaction": {
          "visited": {
            value: '{color.primary.visited.DEFAULT}',
            type: 'color'
          },
          "hover": {
            value: '{color.primary.hover.DEFAULT}',
            type: 'color'
          },
          "focus": {
            value: '{color.primary.focus.DEFAULT}',
            type: 'color'
          },
          "focus-visible": {
            value: '{color.primary.focus.DEFAULT}',
            type: 'color'
          },
          "active": {
            value: '{color.primary.active.DEFAULT}',
            type: 'color'
          }
        }
      },
      nav: {
        tertiary: {
          interaction: {
            hover: {
              value: '{color.text.subtle}',
              type: 'color'
            }
          }
        }
      }
    },
    "background": {
      "interaction": {
        "selected": {
          value: '{color.primary.blur}',
          type: 'color'
        }
      },
      nav: {
        DEFAULT: {
          interaction: {
            hover: {
              value: '{color.background.bold}',
              type: 'color'
            }
          }
        }
      }
    }
  }
}

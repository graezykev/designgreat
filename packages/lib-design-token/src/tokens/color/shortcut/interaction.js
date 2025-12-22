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
        interaction: {
          hover: {
            value: '{color.primary.hover.DEFAULT}',
            type: 'color'
          },
          focus: {
            value: '{color.primary.focus.DEFAULT}',
            type: 'color'
          },
          active: {
            value: '{color.primary.active.DEFAULT}',
            type: 'color'
          }
        },
        secondary: {
          interaction: {
            hover: {
              value: '{color.primary.hover.DEFAULT}',
              type: 'color'
            },
            focus: {
              value: '{color.primary.focus.DEFAULT}',
              type: 'color'
            },
            active: {
              value: '{color.primary.active.DEFAULT}',
              type: 'color'
            }
          }
        },
        tertiary: {
          interaction: {
            hover: {
              value: '{color.text.subtle}',
              type: 'color'
            },
            focus: {
              value: '{color.text.DEFAULT}',
              type: 'color'
            },
            active: {
              value: '{color.primary.focus.DEFAULT}',
              type: 'color'
            }
          }
        }
      }
    },
    "background": {
      nav: {
        DEFAULT: {
          interaction: {
            hover: {
              value: '{color.background.bold}',
              type: 'color'
            },
            active: {
              value: '{color.alpha.neutral.3}',
              type: 'color'
            }
          }
        }
      },
      card: {
        interaction: {
          hover: {
            value: '{color.alpha.neutral.1}',
            type: 'color'
          },
          active: {
            value: '{color.alpha.neutral.2}',
            type: 'color'
          }
        }
      },
      badge: {
        interaction: {
          hover: {
            value: '{color.alpha.neutral.4}',
            type: 'color'
          },
          active: {
            value: '{color.alpha.neutral.5}',
            type: 'color'
          }
        }
      },
      loading: {
        overlay: {
          value: '{color.alpha.neutral.4}',
          type: 'color'
        }
      }
    }
  }
}

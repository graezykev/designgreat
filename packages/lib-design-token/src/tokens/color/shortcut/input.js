export default {
  color: {
    shadow: {
      input: {},
      checkbox: {},
      radio: {},
      select: {},
      button: {}
    },
    outline: {
      input: {},
      checkbox: {},
      radio: {},
      select: {},
      button: {}
    },
    border: {
      input: {
        DEFAULT: {
          value: "{color.border.DEFAULT}",
          type: 'color'
        }
      },
      checkbox: {
        DEFAULT: {
          value: "{color.border.DEFAULT}",
          type: 'color'
        }
      },
      radio: {
        DEFAULT: {
          value: "{color.border.DEFAULT}",
          type: 'color'
        }
      },
      select: {
        DEFAULT: {
          value: "{color.border.DEFAULT}",
          type: 'color'
        }
      },
      option: {},
      button: { // same to background
        "DEFAULT": {
          value: '{color.background.button.DEFAULT}',
          type: 'color'
        },
        subtle: {
          DEFAULT: {
            value: "{color.background.button.subtle.DEFAULT}",
            type: 'color'
          }
        },
        wireframe: {
          DEFAULT: {
            value: "{color.primary.DEFAULT}",
            type: 'color'
          }
        }
      }
    },
    background: {
      input: {},
      checkbox: {
        checkmark: {
          value: '{color.accent.neutral.silent}',
          type: 'color'
        }
      },
      radio: {
        checkmark: {
          value: '{color.primary.DEFAULT}',
          type: 'color'
        }
      },
      select: {
        arrow: {
          value: '{color.accent.neutral.silent}',
          type: 'color'
        }
      },
      option: {},
      button: {
        "DEFAULT": {
          value: '{color.primary.DEFAULT}',
          type: 'color'
        },
        subtle: {
          DEFAULT: {
            value: "{color.alpha.neutral.4}",
            type: 'color'
          }
        }
      }
    },
    text: {
      button: {
        DEFAULT: {
          value: "{color.accent.neutral.silent}", // `white` in light theme and black in dark theme
          type: 'color'
        },
        subtle: {
          DEFAULT: {
            value: "{color.accent.neutral.DEFAULT}",
            type: 'color'
          }
        },
        wireframe: {
          DEFAULT: {
            value: "{color.border.button.wireframe.DEFAULT}",
            type: 'color'
          }
        }
      },
      select: {
        DEFAULT: {
          value: "{color.accent.neutral.DEFAULT}",
          type: 'color'
        }
      },
      option: {
        DEFAULT: {
          value: "{color.accent.neutral.DEFAULT}",
          type: 'color'
        }
      },
      input: {
        "DEFAULT": {
          value: "{color.accent.neutral.DEFAULT}",
          type: 'color'
        },
        caret: {
          value: "{color.text.input.DEFAULT}",
          type: 'color'
        }
      },
      label: {
        DEFAULT: {
          value: "{color.text.input.DEFAULT}", // same to input text
          type: 'color'
        },
        left: {
          value: "{color.text.label.DEFAULT}",
          type: 'color'
        },
        above: {
          value: "{color.text.label.DEFAULT}",
          type: 'color'
        },
        'inside-border': {
          value: "{color.text.label.DEFAULT}",
          type: 'color'
        },
        'checkbox-radio': {
          value: "{color.text.label.DEFAULT}",
          type: 'color'
        },
        below: {
          value: "{color.accent.neutral.subtle}",
          type: 'color'
        },
        'inside-input': { // same to placeholder
          value: "{color.text.placeholder.DEFAULT}",
          type: 'color'
        }
      },
      placeholder: {
        DEFAULT: {
          value: "{color.accent.neutral.subtler}",
          type: 'color'
        }
      }
    }
  }
}

export default {
  color: {
    text: {
      input: {
        state: {
          invalid: {
            value: "{color.semantic.error.DEFAULT}",
            type: 'color'
          }
        }
      },
      label: {
        state: {
          invalid: {
            value: "{color.semantic.error.DEFAULT}",
            type: 'color'
          }
        }
      },
      button: {
        state: {
          disabled: {
            value: '{color.accent.neutral.silent}',
            attributes: { alpha: 0.5 },
            type: 'color'
          }
        },
        subtle: {
          state: {
            disabled: {
              value: '{color.alpha.neutral.5}',
              type: 'color'
            }
          }
        },
        secondary: {
          state: {
            disabled: {
              value: "{color.text.subtlest}",
              type: 'color'
            }
          }
        },
        outline: {
          state: {
            disabled: {
              value: "{color.primary.blur}",
              type: 'color'
            }
          }
        },
        ghost: {
          state: {
            disabled: {
              value: "{color.text.subtlest}",
              type: 'color'
            }
          }
        },
        wireframe: {
          state: {
            disabled: {
              value: "{color.border.button.wireframe.state.disabled}",
              type: 'color'
            }
          }
        }
      },
      select: {
        state: {
          opened: {
            value: "{color.primary.opened.DEFAULT}",
            type: 'color'
          }
        }
      },
      'placeholder': {
        state: {
          invalid: {
            value: "{color.semantic.error.DEFAULT}",
            type: 'color'
          }
        }
      },
      'tip-error': {
        value: "{color.semantic.error.DEFAULT}",
        type: 'color'
      }
    },
    border: {
      button: {
        state: {
          disabled: {
            value: '{color.background.button.state.disabled}',
            type: 'color'
          }
        },
        subtle: {
          state: {
            disabled: {
              value: "{color.background.button.subtle.state.disabled}",
              type: 'color'
            }
          }
        },
        secondary: {
          state: {
            disabled: {
              value: "{color.background.button.secondary.state.disabled}",
              type: 'color'
            }
          }
        },
        outline: {
          state: {
            disabled: {
              value: "{color.primary.blur}",
              type: 'color'
            }
          }
        },
        ghost: {
          state: {
            disabled: {
              value: "transparent",
              type: 'color'
            }
          }
        },
        wireframe: {
          state: {
            disabled: {
              value: "{color.primary.blur}",
              type: 'color'
            }
          }
        }
      },
      input: {
        state: {
          valid: {
            value: "{color.semantic.success.DEFAULT}",
            type: 'color'
          },
          invalid: {
            value: "{color.semantic.error.DEFAULT}",
            type: 'color'
          },
          warning: {
            value: "{color.semantic.warning.DEFAULT}",
            type: 'color'
          },
          disabled: {
            value: "{color.border.subtle}",
            type: 'color'
          }
        }
      },
      checkbox: {
        state: {
          checked: {
            value: '{color.primary.checked.DEFAULT}',
            type: 'color'
          },
          disabled: {
            value: "{color.border.subtle}",
            type: 'color'
          }
        }
      },
      radio: {
        state: {
          checked: {
            value: '{color.primary.checked.DEFAULT}',
            type: 'color'
          },
          disabled: {
            value: "{color.border.subtle}",
            type: 'color'
          }
        }
      },
      select: {
        state: {
          disabled: {
            value: "{color.border.subtle}",
            type: 'color'
          }
        }
      }
    },
    background: {
      button: {
        state: {
          disabled: {
            value: '{color.primary.disabled.DEFAULT}',
            type: 'color'
          }
        },
        subtle: {
          state: {
            disabled: {
              value: "{color.alpha.neutral.2}",
              type: 'color'
            }
          }
        },
        secondary: {
          state: {
            disabled: {
              value: "{color.secondary.blur}",
              type: 'color'
            }
          }
        },
        outline: {
          state: {
            disabled: {
              value: "transparent",
              type: 'color'
            }
          }
        },
        ghost: {
          state: {
            disabled: {
              value: "transparent",
              type: 'color'
            }
          }
        }
      },
      checkbox: {
        state: {
          checked: {
            value: '{color.primary.checked.DEFAULT}',
            type: 'color'
          }
        }
      },
      select: {
        state: {
          opened: {
            value: "{color.primary.opened.bg}",
            type: 'color'
          }
        }
      },
      radio: {}
    }
  }
}

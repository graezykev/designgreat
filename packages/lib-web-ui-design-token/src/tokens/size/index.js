// combine & fine tune from:
// https://www.modularscale.com/?16&px&1.125
// https://www.modularscale.com/?16&px&2
// https://www.modularscale.com/?95&px&2
export default {
  spacing: {
    'base': {
      type: 'dimension',
      value: 1
    },
    'px0': {
      type: 'dimension',
      value: 0 / 16 // 0px
    },
    'px1': {
      type: 'dimension',
      value: 1 / 16 // 1px
    },
    'px2': {
      type: 'dimension',
      value: 2 / 16 // 2px
    },
    'px4': {
      type: 'dimension',
      value: 4 / 16 // 4px
    },
    'px8': {
      type: 'dimension',
      value: 8 / 16 // 8px
    },
    'px10': {
      type: 'dimension',
      value: 10 / 16 // 10px
    },
    'px12': {
      type: 'dimension',
      value: 12 / 16 // 12px
    },
    'px14': {
      type: 'dimension',
      value: 14 / 16 // 14px
    },
    'px16': {
      type: 'dimension',
      value: 16 / 16 // 16px
    },
    DEFAULT: {
      type: 'dimension',
      value: '{spacing.px16}'
    },
    'px18': {
      type: 'dimension',
      value: 18 / 16 // 18px
    },
    'px20': {
      type: 'dimension',
      value: 20 / 16 // 20px
    },
    'px24': {
      type: 'dimension',
      value: 24 / 16 // 24px
    },
    'px28': {
      type: 'dimension',
      value: 28 / 16 // 28px
    },
    'px32': {
      type: 'dimension',
      value: 32 / 16 // 32px
    },
    'px40': {
      type: 'dimension',
      value: 40 / 16 // 40px
    },
    'px48': {
      type: 'dimension',
      value: 48 / 16 // 48px
    },
    'px64': {
      type: 'dimension',
      value: 64 / 16 // 64px
    },
    'px80': {
      type: 'dimension',
      value: 80 / 16 // 80px
    },
    'px95': {
      type: 'dimension',
      value: 95 / 16 // 95px
    },
    'px128': {
      type: 'dimension',
      value: 128 / 16 // 128px
    },
    'px256': {
      type: 'dimension',
      value: 256 / 16 // 256px
    },
    'px380': {
      type: 'dimension',
      value: 380 / 16 // 380px ≈ legacy small devices 375px
    },
    'px512': {
      type: 'dimension',
      value: 512 / 16 // 512px
    },
    'px760': {
      type: 'dimension',
      value: 760 / 760 // 760px ≈ medium PC screen 768px
    },
    'px1024': {
      type: 'dimension',
      value: 1024 / 16 // 1024px ≈ large PC screen 1024px
    },
    'px2048': {
      type: 'dimension',
      value: 2048 / 16 // 2048px
    },

    '1': {
      type: 'dimension',
      value: '{spacing.px0}'
    },
    '2': {
      type: 'dimension',
      value: '{spacing.px1}'
    },
    '3': {
      type: 'dimension',
      value: '{spacing.px2}'
    },
    '4': {
      type: 'dimension',
      value: '{spacing.px4}'
    },
    '5': {
      type: 'dimension',
      value: '{spacing.px8}'
    },
    '6': {
      type: 'dimension',
      value: '{spacing.px10}'
    },
    '7': {
      type: 'dimension',
      value: '{spacing.px12}'
    },
    '8': {
      type: 'dimension',
      value: '{spacing.px14}'
    },
    '9': {
      type: 'dimension',
      value: '{spacing.px16}'
    },
    '10': {
      type: 'dimension',
      value: '{spacing.px18}'
    },
    '11': {
      type: 'dimension',
      value: '{spacing.px20}'
    },
    '12': {
      type: 'dimension',
      value: '{spacing.px24}'
    },
    '13': {
      type: 'dimension',
      value: '{spacing.px28}'
    },
    '14': {
      type: 'dimension',
      value: '{spacing.px32}'
    },
    '15': {
      type: 'dimension',
      value: '{spacing.px40}'
    },
    '16': {
      type: 'dimension',
      value: '{spacing.px48}'
    },
    '17': {
      type: 'dimension',
      value: '{spacing.px64}'
    },
    '18': {
      type: 'dimension',
      value: '{spacing.px80}'
    },
    '19': {
      type: 'dimension',
      value: '{spacing.px95}'
    },
    '20': {
      type: 'dimension',
      value: '{spacing.px128}'
    },
    '21': {
      type: 'dimension',
      value: '{spacing.px256}'
    },
    '22': {
      type: 'dimension',
      value: '{spacing.px380}'
    },
    '23': {
      type: 'dimension',
      value: '{spacing.px512}'
    },
    '24': {
      type: 'dimension',
      value: '{spacing.px760}'
    },
    '25': {
      type: 'dimension',
      value: '{spacing.px1024}'
    },
    '26': {
      type: 'dimension',
      value: '{spacing.px2048}'
    },

    atomic: {
      xs: {
        type: 'dimension',
        value: '{spacing.7}'
      },
      s: {
        type: 'dimension',
        value: '{spacing.8}'
      },
      m: {
        type: 'dimension',
        value: '{spacing.9}'
      },
      DEFAULT: {
        type: 'dimension',
        value: '{spacing.DEFAULT}'
      },
      l: {
        type: 'dimension',
        value: '{spacing.11}'
      },
      xl: {
        type: 'dimension',
        value: '{spacing.12}'
      },
      xxl: {
        type: 'dimension',
        value: '{spacing.13}'
      },
      xxxl: {
        type: 'dimension',
        value: '{spacing.14}'
      },
      xxxxl: {
        type: 'dimension',
        value: '{spacing.15}'
      },
      micro: {
        none: {
          type: 'dimension',
          value: '{spacing.1}'
        },
        DEFAULT: {
          type: 'dimension',
          value: '{spacing.2}'
        },
        thick: {
          type: 'dimension',
          value: '{spacing.3}'
        },
        heavy: {
          type: 'dimension',
          value: '{spacing.4}'
        },
        massive: {
          type: 'dimension',
          value: '{spacing.5}'
        }
      }
    },
    composite: {
      xs: {
        type: 'dimension',
        value: '{spacing.12}'
      },
      s: {
        type: 'dimension',
        value: '{spacing.14}'
      },
      m: {
        type: 'dimension',
        value: '{spacing.15}'
      },
      DEFAULT: {
        type: 'dimension',
        value: '{spacing.composite.m}'
      },
      l: {
        type: 'dimension',
        value: '{spacing.16}'
      },
      xl: {
        type: 'dimension',
        value: '{spacing.17}'
      }
    },
    widget: {
      none: {
        type: 'demension',
        value: 0
      },
      s: {
        type: 'demension',
        value: '{spacing.4}'
      },
      m: {
        type: 'demension',
        value: '{spacing.5}'
      },
      l: {
        type: 'demension',
        value: '{spacing.7}'
      }
    },
    group: {
      none: {
        type: 'demension',
        value: 0
      },
      s: {
        type: 'demension',
        value: '{spacing.9}'
      },
      m: {
        type: 'demension',
        value: '{spacing.11}'
      },
      l: {
        type: 'demension',
        value: '{spacing.12}'
      }
    },
    layout: {
      none: {
        type: 'demension',
        value: 0
      },
      s: {
        type: 'demension',
        value: '{spacing.11}'
      },
      m: {
        type: 'demension',
        value: '{spacing.15}'
      },
      l: {
        type: 'demension',
        value: '{spacing.18}'
      }
    }
  }
}

export default {
  'text-decoration': {
    color: {
      DEFAULT: {
        value: 'currentcolor',
        type: 'textDecorationColor'
      },
      red: {
        value: 'red',
        type: 'color'
      }
    },
    thickness: {
      DEFAULT: {
        value: 'auto',
        type: 'textDecorationThickness'
      },
      'from-font': {
        value: 'from-font', // defined from font or fall back to auto
        type: 'textDecorationThickness'
      },
      '1px': {
        value: 1 / 16,
        type: 'dimension'
      },
      '100-percent': {
        value: '100%', // relative to font-size
        type: 'textDecorationThickness'
      }
    },
    style: {
      solid: {
        value: 'solid',
        type: 'textDecorationStyle'
      },
      double: {
        value: 'double',
        type: 'textDecorationStyle'
      },
      dotted: {
        value: 'dotted',
        type: 'textDecorationStyle'
      },
      dashed: {
        value: 'dashed',
        type: 'textDecorationStyle'
      },
      wavy: {
        value: 'wavy',
        type: 'textDecorationStyle'
      }
    },
    line: {
      none: {
        value: 'none',
        type: 'textDecorationLine'
      },
      underline: {
        value: 'underline',
        type: 'textDecorationLine'
      },
      overline: {
        value: 'overline',
        type: 'textDecorationLine'
      },
      'line-through': {
        value: 'line-through',
        type: 'textDecorationLine'
      },
      multiple: {
        value: 'line-through underline overline',
        type: 'textDecorationLine'
      }
    }
  }
}

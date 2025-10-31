export default {
  'vertical-align': {
    '100-percent': {
      value: '100%', // align the [baseline] of the element to **above** the [baseline] of its parent, relative to `line-height`
      type: 'verticalAlign'
    },
    '10px': {
      value: 10 / 16, // align the [baseline] of the element to **above** the [baseline] of its parent
      type: 'dimension'
    },
    DEFAULT: {
      value: 'baseline',
      type: 'verticalAlign'
    },
    sub: {
      value: 'sub',
      type: 'verticalAlign'
    },
    super: {
      value: 'super',
      type: 'verticalAlign'
    },
    'text-top': {
      value: 'text-top',
      type: 'verticalAlign'
    },
    'text-bottom': {
      value: 'text-bottom',
      type: 'verticalAlign'
    },
    'top': {
      value: 'top',
      type: 'verticalAlign'
    },
    'bottom': {
      value: 'bottom',
      type: 'verticalAlign'
    }
  }
}

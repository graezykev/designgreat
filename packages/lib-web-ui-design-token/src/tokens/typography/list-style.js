export default {
  'list-style': {
    type: {
      DEFAULT: {
        value: 'none',
        type: 'listStyleType'
      }
    },
    position: {
      DEFAULT: {
        value: '{list-style.position.outside}',
        type: 'listStylePosition'
      },
      inside: {},
      outside: {
        value: 'outside',
        type: 'listStylePosition'
      }
    },
    image: {
      DEFAULT: {
        value: 'none',
        type: 'listStyleImage'
      }
    }
  }
}

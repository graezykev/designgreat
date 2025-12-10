export default {
  duration: {
    // Core duration scale
    instant: {
      type: 'time',
      value: 0,
      comment: 'No animation'
    },
    fast: {
      type: 'time',
      value: 100,
      comment: 'Micro-interactions, hover states'
    },
    normal: {
      type: 'time',
      value: 200,
      comment: 'Standard transitions'
    },
    DEFAULT: {
      type: 'time',
      value: '{duration.normal}'
    },
    slow: {
      type: 'time',
      value: 300,
      comment: 'Emphasis transitions, page changes'
    },
    slower: {
      type: 'time',
      value: 500,
      comment: 'Complex animations, modals'
    },

    // Semantic durations for specific use cases
    transition: {
      hover: {
        type: 'time',
        value: '{duration.fast}'
      },
      focus: {
        type: 'time',
        value: '{duration.fast}'
      },
      expand: {
        type: 'time',
        value: '{duration.normal}'
      },
      collapse: {
        type: 'time',
        value: '{duration.normal}'
      },
      fade: {
        type: 'time',
        value: '{duration.normal}'
      },
      slide: {
        type: 'time',
        value: '{duration.slow}'
      },
      modal: {
        type: 'time',
        value: '{duration.slower}'
      }
    }
  }
}

export default {
  transition: {
    // Common transition presets
    all: {
      type: 'transition',
      value: {
        property: 'all',
        duration: '{duration.normal}',
        timingFunction: '{cubic-bezier.ease-out}',
        delay: 0
      },
      comment: 'General purpose transition'
    },
    colors: {
      type: 'transition',
      value: {
        property: 'color, background-color, border-color',
        duration: '{duration.fast}',
        timingFunction: '{cubic-bezier.ease}',
        delay: 0
      },
      comment: 'Color-only transitions for hover states'
    },
    opacity: {
      type: 'transition',
      value: {
        property: 'opacity',
        duration: '{duration.normal}',
        timingFunction: '{cubic-bezier.ease-in-out}',
        delay: 0
      },
      comment: 'Fade in/out effects'
    },
    transform: {
      type: 'transition',
      value: {
        property: 'transform',
        duration: '{duration.normal}',
        timingFunction: '{cubic-bezier.ease-out}',
        delay: 0
      },
      comment: 'Scale, rotate, translate animations'
    },
    shadow: {
      type: 'transition',
      value: {
        property: 'box-shadow',
        duration: '{duration.normal}',
        timingFunction: '{cubic-bezier.ease}',
        delay: 0
      },
      comment: 'Elevation changes on hover'
    },
    slow: {
      type: 'transition',
      value: {
        property: 'all',
        duration: '{duration.slow}',
        timingFunction: '{cubic-bezier.ease-in-out}',
        delay: 0
      },
      comment: 'Modals, page transitions, emphasis effects'
    },
    slower: {
      type: 'transition',
      value: {
        property: 'all',
        duration: '{duration.slower}',
        timingFunction: '{cubic-bezier.ease-in-out}',
        delay: 0
      },
      comment: 'Complex animations, modal backdrops, dramatic reveals'
    },
    none: {
      type: 'transition',
      value: {
        property: 'none',
        duration: 0,
        timingFunction: '{cubic-bezier.linear}',
        delay: 0
      },
      comment: 'Disable transitions'
    }
  }
}

export default {
  transition: {
    'fade-in-out': {
      type: 'transition',
      value: {
        property: 'all',
        duration: '{duration.transition.duration.fade-in-out}',
        timingFunction: '{cubic-bezier.ease-in-out}',
        delay: '{duration.transition.delay.fade-in-out}'
      }
    }
  }
}

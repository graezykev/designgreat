export default {
  'cubic-bezier': {
    linear: {
      value: [0, 0, 1, 1],
      type: 'cubicBezier'
    },
    ease: {
      value: [.25, .1, .25, 1],
      type: 'cubicBezier'
    },
    'ease-in': {
      value: [.42, 0, 1, 1],
      type: 'cubicBezier'
    },
    'ease-out': {
      value: [0, 0, .58, 1],
      type: 'cubicBezier'
    },
    'ease-in-out': {
      value: [.42, 0, .58, 1],
      type: 'cubicBezier'
    },
    'custom-curve': { // define & preview your own here https://cubic-bezier.com/#.17,.67,.83,.67
      value: [.69, -0.76, .52, 1.49],
      type: 'cubicBezier'
    }
  }
}

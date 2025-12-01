export default {
  'word-spacing': {
    normal: {
      value: 0 / 16, // or 'normal'. defined by the current font
      type: 'dimension'
    },
    wide: {
      value: 16 / 16, // **extra** spacing in addition to the intrinsic inter-word spacing defined by the font
      type: 'dimension'
    },
    tight: {
      value: `${- 8 / 16}rem`,
      type: 'dimension'
    }
  }
}

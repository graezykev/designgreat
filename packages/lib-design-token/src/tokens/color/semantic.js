import tokens from './accent/saturated.js'
import tokens2 from './primary.js'

export default {
  color: {
    semantic: {
      'new': {
        ...tokens.color.accent.purple
      },
      'info': {
        ...tokens.color.accent.blue,
        blur: {
          value: '{color.primary.blur}',
          type: 'color'
        }
      },
      'success': {
        ...tokens.color.accent.green
      },
      'warning': {
        ...tokens.color.accent.orange
      },
      'error': {
        ...tokens.color.accent.red
      }
    }
  }
}

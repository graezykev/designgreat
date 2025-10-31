import tokens from './accent/saturated.js'
import tokens2 from './primary.js'

export default {
  color: {
    semantic: {
      'new': {
        ...tokens.color.accent.purple
      },
      'info': {
        ...tokens2.color.primary
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

export default {
  border: {
    input: {
      DEFAULT: {
        type: 'border',
        value: {
          width: '{size.border.input}',
          style: 'solid',
          color: '{color.border.input.DEFAULT}'
        }
      },
      focus: {
        type: 'border',
        value: {
          width: '{size.border.input}',
          style: 'solid',
          color: '{color.border.input.interaction.focus}'
        }
      }
    }
  }
}
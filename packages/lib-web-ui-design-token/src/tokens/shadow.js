export default {
  shadow: {
    box: {
      highlight: {
        type: 'shadow',
        value: [{
          color: '{color.shadow.DEFAULT}',
          offsetX: '{size.shadow.box.highlight.offset-x}',
          offsetY: '{size.shadow.box.highlight.offset-y}',
          blur: '{size.shadow.box.highlight.blur}',
          spread: '{size.shadow.box.highlight.spread}'
        },
        { // 2nd shadow for test
          color: '{color.base.blue}',
          offsetX: '{size.shadow.box.highlight.offset-x}',
          offsetY: '{size.shadow.box.highlight.offset-y}',
          blur: '{size.shadow.box.highlight.blur}',
          spread: '{size.shadow.box.highlight.spread}',
          type: 'inset'
        }]
      }
    },
    text: {
      dizzy: {
        type: 'textShadow',
        value: [{
          offsetX: '{size.shadow.text.dizzy.offset-x}',
          offsetY: '{size.shadow.text.dizzy.offset-y}',
          blur: '{size.shadow.text.dizzy.blur}'
        }, {
          color: '{color.base.blue}',
          offsetX: '{size.shadow.text.dizzy.offset-x}',
          offsetY: '{size.shadow.text.dizzy.offset-y}',
          blur: '{size.shadow.text.dizzy.blur}'
        }]
      }
    }
  }
}

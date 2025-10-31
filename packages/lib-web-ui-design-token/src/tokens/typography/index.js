const paragraphFont = {
  // Only these can be transformed to CSS `font:`
  // font-style font-variant font-weight font-stretch font-size line-height font-family
  fontFamily: '{font-family.primary}',
  fontSize: '{size.font.body}',
  fontWeight: '{font-weight.regular}',
  fontStyle: '{font-style.normal}',
  lineHeight: '{number.line-height.body}'
}

export default {
  typography: {
    paragraph: {
      value: {
        ...paragraphFont
      },
      type: 'typography'
    },
    link: {
      value: {
        ...paragraphFont,
        color: '{color.text.link.DEFAULT}'
      },
      type: 'composition'
    },
    'link-hover': {
      value: {
        ...paragraphFont,
        color: '{color.text.link.DEFAULT}',
        textDecoration: '{text-decoration.line.underline}'
      },
      type: 'composition'
    },
    list: {
      value: {
        listStyleType: '{list-style.type.DEFAULT}',
        listStylePosition: '{list-style.position.DEFAULT}',
        listStyleImage: '{list-style.image.DEFAULT}'
      },
      type: 'composition'
    }
  }
}

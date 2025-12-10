const paragraphFont = {
  // Composite typography token for paragraph text
  // Maps to CSS `font:` shorthand properties
  fontFamily: '{font-family.primary}',
  fontSize: '{size.font.body}',
  fontWeight: '{font-weight.regular}',
  fontStyle: '{font-style.normal}',
  lineHeight: '{line-height.body}'
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
        textDecoration: 'underline'
      },
      type: 'composition'
    }
  }
}

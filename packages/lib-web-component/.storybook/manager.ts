import { addons } from '@storybook/manager-api'
import { create } from '@storybook/theming'

// Logo from public folder (copied from lib-design-token)
const logoUrl = './logo.svg'

const theme = create({
  base: 'light',

  // Brand - icon + title (Storybook may show both or just image)
  brandTitle: 'Web Component',
  brandUrl: '/designgreat/lib-web-component/',
  brandImage: logoUrl,
  brandTarget: '_self',

  // UI colors
  colorPrimary: '#0055cc',
  colorSecondary: '#0055cc',

  // App background
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e8e8e9',
  appBorderRadius: 8,

  // Text colors
  textColor: '#1d1d1f',
  textInverseColor: '#ffffff',

  // Toolbar
  barTextColor: '#1d1d1f',
  barSelectedColor: '#0055cc',
  barHoverColor: '#0055cc',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#e8e8e9',
  inputTextColor: '#1d1d1f',
  inputBorderRadius: 8
})

addons.setConfig({
  theme
})

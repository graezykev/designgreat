import baseConfig from '@designgreat/eslint-config/base'
import createNodeConfig from '@designgreat/eslint-config/node'
import createReactConfig from '@designgreat/eslint-config/react'

const reactGlobs = [
  'packages/lib-web-ui-design-token/**/*.{js,jsx,ts,tsx}',
  'packages/lib-web-ui/**/*.{js,jsx,ts,tsx}',
  'packages/lib-web-ui-website/**/*.{js,jsx,ts,tsx}',
  'packages/app-web-*/**/*.{js,jsx,ts,tsx}'
]

const nodeGlobs = [
  'scripts/**/*.{js,ts}',
  'infrastructure/**/*.{js,ts}',
  'packages/app-service-*/**/*.{js,ts}',
  'packages/app-service-serverless-a/**/*.{js,ts}',
  '*.config.{js,ts,mjs,cjs}',
  'packages/**/eslint.config.{js,ts}'
]

const config = [
  ...baseConfig,
  ...createReactConfig(reactGlobs),
  ...createNodeConfig(nodeGlobs),
  {
    name: 'designgreat/tests',
    files: ['**/*.test.*', '**/*.spec.*', '**/*.stories.*'],
    rules: {
      'no-console': 'off'
    }
  }
]

export default config

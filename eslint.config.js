import createBaseConfig from '@designgreat/eslint-config/base'
import createMarkdownConfig from '@designgreat/eslint-config/markdown'
import createNodeConfig from '@designgreat/eslint-config/node'
import createReactConfig from '@designgreat/eslint-config/react'

import { devDependencyGlobs, nodeWorkspaceGlobs, reactWorkspaceGlobs } from './workspace-globs.js'

const baseConfig = createBaseConfig({ devDependencyGlobs })
const reactConfig = createReactConfig(reactWorkspaceGlobs)
const nodeConfig = createNodeConfig(nodeWorkspaceGlobs)
const markdownConfig = createMarkdownConfig()

const config = [
  ...baseConfig,
  ...reactConfig,
  ...nodeConfig,
  ...markdownConfig,
  {
    name: 'designgreat/tests',
    files: ['**/*.test.*', '**/*.spec.*', '**/*.stories.*'],
    rules: {
      'no-console': 'off'
    }
  }
]

export default config

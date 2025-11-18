import createBaseConfig from '@designgreat/eslint-config/base'
import createMarkdownConfig from '@designgreat/eslint-config/markdown'
import createNodeConfig from '@designgreat/eslint-config/node'
import createReactConfig from '@designgreat/eslint-config/react'
import { fileURLToPath } from 'node:url'

import { devDependencyGlobs, nodeWorkspaceGlobs, reactWorkspaceGlobs } from './workspace-globs.js'

const repoRoot = fileURLToPath(new URL('.', import.meta.url))
const tsconfigNodeProject = fileURLToPath(new URL('./tsconfig.node.json', import.meta.url))

const baseConfig = createBaseConfig({ devDependencyGlobs })
const reactConfig = createReactConfig(reactWorkspaceGlobs)
const nodeConfig = createNodeConfig(nodeWorkspaceGlobs, {
  parserProject: tsconfigNodeProject,
  tsconfigRootDir: repoRoot
})
const markdownConfig = createMarkdownConfig()

const config = [
  ...baseConfig,
  ...reactConfig,
  ...nodeConfig,
  ...markdownConfig,
  {
    name: 'designgreat/design-token-generated-ignore',
    ignores: [
      'packages/lib-web-ui-design-token/src/generated/**',
      'packages/lib-web-ui-design-token/src/tokens/**',
      'packages/lib-web-ui-design-token/assets/**',
      'packages/lib-web-ui-design-token/dist/jsts/**'
    ]
  },
  {
    name: 'designgreat/docs-design-system-ignore',
    ignores: [
      'packages/docs-design-system/.docusaurus/**',
      'packages/docs-design-system/build/**',
      'packages/docs-design-system/docs/tutorial-basics/markdown-features.mdx'
    ]
  },
  {
    name: 'designgreat/tests',
    files: ['**/*.test.*', '**/*.spec.*', '**/*.stories.*'],
    rules: {
      'no-console': 'off'
    }
  },
  {
    name: 'designgreat/storybook-config',
    files: ['packages/**/.storybook/**/*'],
    languageOptions: {
      parserOptions: {
        project: [fileURLToPath(new URL('./packages/lib-web-ui/tsconfig.json', import.meta.url))],
        tsconfigRootDir: repoRoot
      }
    }
  },
  {
    name: 'designgreat/storybook-static-ignore',
    ignores: ['**/storybook-static/**']
  },
  {
    name: 'designgreat/docs-eslint-guide-ignore',
    // This doc contains many code examples that are intentionally incomplete/illustrative
    ignores: ['docs/eslint-configuration-guide.md']
  }
]

export default config

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
      'packages/lib-design-token/src/generated/**',
      'packages/lib-design-token/src/tokens/**',
      'packages/lib-design-token/assets/**',
      'packages/lib-design-token/dist/jsts/**'
    ]
  },
  {
    name: 'designgreat/docs-design-system-ignore',
    ignores: [
      'packages/docs-design-system/.docusaurus/**',
      'packages/docs-design-system/build/**',
      'packages/docs-design-system/docs-contributing/**/*.mdx',
      'packages/docs-design-system/docs-design-token/guides/**/*.mdx',
      'packages/docs-design-system/docs-design-token/colors/**/*.mdx',
      'packages/docs-design-system/docs-web-component/**/*.mdx'
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
  },
  {
    name: 'designgreat/progress-logs-ignore',
    // Progress logs are historical documentation that don't need linting
    ignores: ['docs/progress-logs/**/*.md']
  },
  {
    name: 'designgreat/audit-scripts-ignore',
    // Audit scripts are utility tools that don't need strict linting
    ignores: ['packages/docs-design-system/audit-color-docs.ts']
  }
]

export default config

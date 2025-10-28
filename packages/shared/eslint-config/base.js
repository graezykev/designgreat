import { FlatCompat } from '@eslint/eslintrc'
import markdown from '@eslint/markdown'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import eslintComments from 'eslint-plugin-eslint-comments'
import importPlugin from 'eslint-plugin-import'
import promisePlugin from 'eslint-plugin-promise'
import unicorn from 'eslint-plugin-unicorn'
import globals from 'globals'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname
})

const INCOMPATIBLE_RULES = [
  '@typescript-eslint/no-restricted-imports',
  '@typescript-eslint/restrict-plus-operands'
]

const sanitizeRuleOverrides = (configs) =>
  configs.map((config) => {
    if (!config.rules) {
      return config
    }

    let mutated = false
    const updatedRules = { ...config.rules }

    for (const ruleName of INCOMPATIBLE_RULES) {
      if (ruleName in updatedRules) {
        updatedRules[ruleName] = 'off'
        mutated = true
      }
    }

    if (mutated) {
      config = {
        ...config,
        rules: updatedRules
      }
    }

    return config
  })

const xoConfigs = compat.extends('xo')
const xoSpaceConfigs = compat.extends('xo-space')
const xoTypescriptConfigs = sanitizeRuleOverrides(compat.extends('xo-typescript'))

const typedFiles = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts']
const scriptFiles = ['**/*.js', '**/*.cjs', '**/*.mjs']
export const defaultDevDependencyGlobs = [
  '**/__tests__/**',
  '**/?(*.)+(test|spec).[jt]s?(x)',
  '**/*.config.[jt]s?(x)',
  '**/*.setup.[jt]s?(x)',
  '**/*.stories.*'
]

export const createBaseConfig = ({ devDependencyGlobs = [] } = {}) => {
  const mergedDevGlobs = Array.from(new Set([...defaultDevDependencyGlobs, ...devDependencyGlobs]))

  return [
    {
      name: 'designgreat/ignores',
      ignores: [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/coverage/**',
        '**/.turbo/**',
        '**/.next/**',
        '**/.out/**',
        '**/.vite/**',
        '**/out/**',
        '**/tmp/**',
        '**/.tmp/**',
        '**/temp/**',
        'pnpm-lock.yaml'
      ]
    },
    ...xoConfigs,
    ...xoSpaceConfigs,
    ...xoTypescriptConfigs,
    prettier,
    {
      name: 'designgreat/base',
      files: [...typedFiles, ...scriptFiles, '**/*.jsx'],
      languageOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          }
        },
        globals: {
          ...globals.browser,
          ...globals.es2022,
          ...globals.node
        }
      },
      plugins: {
        '@typescript-eslint': tseslint,
        import: importPlugin,
        promise: promisePlugin,
        unicorn,
        'eslint-comments': eslintComments
      },
      settings: {
        'import/extensions': ['.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx', '.json']
      },
      rules: {
        semi: 'off',
        '@typescript-eslint/semi': ['error', 'never'],
        indent: ['error', 2, { SwitchCase: 1 }],
        'no-tabs': 'error',
        'space-before-function-paren': [
          'error',
          {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always'
          }
        ],
        quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
        'object-curly-spacing': ['error', 'always'],
        'comma-dangle': ['error', 'never'],
        'eol-last': ['error', 'always'],
        'no-trailing-spaces': 'error',
        'one-var': 'off',
        'capitalized-comments': 'off',
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/prefer-module': 'off',
        'unicorn/no-null': 'off',
        'unicorn/prefer-ternary': 'off',
        'import/no-unresolved': 'off',
        'import/order': [
          'error',
          {
            alphabetize: { order: 'asc', caseInsensitive: true },
            groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
            'newlines-between': 'always'
          }
        ],
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: mergedDevGlobs
          }
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
        ],
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/consistent-type-imports': [
          'error',
          {
            prefer: 'type-imports',
            disallowTypeAnnotations: false
          }
        ],
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/prefer-ts-expect-error': 'error',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/no-restricted-imports': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
        'eslint-comments/no-unlimited-disable': 'error'
      }
    },
    ...markdown.configs.recommended,
    {
      name: 'designgreat/markdown-processor',
      files: ['**/*.md'],
      processor: markdown.processors.markdown,
      rules: {
        'eol-last': 'off',
        'no-trailing-spaces': 'off'
      }
    },
    {
      name: 'designgreat/markdown-codeblocks',
      files: ['**/*.md/*.js', '**/*.md/*.cjs', '**/*.md/*.mjs', '**/*.md/*.ts', '**/*.md/*.tsx'],
      languageOptions: {
        parserOptions: {
          project: false
        }
      },
      rules: {
        'eol-last': 'off',
        'no-trailing-spaces': 'off',
        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/consistent-return': 'off',
        '@typescript-eslint/consistent-type-exports': 'off',
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-array-delete': 'off',
        '@typescript-eslint/no-base-to-string': 'off',
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/no-duplicate-type-constituents': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-for-in-array': 'off',
        '@typescript-eslint/no-implied-eval': 'off',
        '@typescript-eslint/no-meaningless-void-operator': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-mixed-enums': 'off',
        '@typescript-eslint/no-redundant-type-constituents': 'off',
        '@typescript-eslint/no-throw-literal': 'off',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
        '@typescript-eslint/no-unnecessary-condition': 'off',
        '@typescript-eslint/no-unnecessary-qualifier': 'off',
        '@typescript-eslint/no-unnecessary-template-expression': 'off',
        '@typescript-eslint/no-unnecessary-type-arguments': 'off',
        '@typescript-eslint/no-unnecessary-type-assertion': 'off',
        '@typescript-eslint/no-unnecessary-type-parameters': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-enum-comparison': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-unary-minus': 'off',
        '@typescript-eslint/no-useless-template-literals': 'off',
        '@typescript-eslint/non-nullable-type-assertion-style': 'off',
        '@typescript-eslint/only-throw-error': 'off',
        '@typescript-eslint/prefer-destructuring': 'off',
        '@typescript-eslint/prefer-find': 'off',
        '@typescript-eslint/prefer-includes': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/prefer-optional-chain': 'off',
        '@typescript-eslint/prefer-promise-reject-errors': 'off',
        '@typescript-eslint/prefer-readonly': 'off',
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
        '@typescript-eslint/prefer-reduce-type-parameter': 'off',
        '@typescript-eslint/prefer-regexp-exec': 'off',
        '@typescript-eslint/prefer-return-this-type': 'off',
        '@typescript-eslint/prefer-string-starts-ends-with': 'off',
        '@typescript-eslint/promise-function-async': 'off',
        '@typescript-eslint/require-array-sort-compare': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/return-await': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/switch-exhaustiveness-check': 'off',
        '@typescript-eslint/unbound-method': 'off',
        '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off'
      }
    }
  ]
}

export const baseConfig = createBaseConfig()

export default createBaseConfig

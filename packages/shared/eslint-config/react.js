import xoReactRaw from 'eslint-config-xo-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'

const xoReactConfigs = (() => {
  const raw = xoReactRaw?.default ?? xoReactRaw
  return Array.isArray(raw) ? raw : [raw]
})()

const createReactConfig = (globs = ['**/*.jsx', '**/*.tsx']) => [
  ...xoReactConfigs.map((config) => ({
    ...config,
    files: globs
  })),
  {
    name: 'designgreat/react',
    files: globs,
    plugins: {
      'jsx-a11y': jsxA11y
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/no-unescaped-entities': 'off',
      'react/jsx-no-useless-fragment': 'warn',
      'react/self-closing-comp': ['error', { component: true, html: true }],
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/no-autofocus': 'warn',
      'jsx-a11y/alt-text': 'warn'
    }
  }
]

export default createReactConfig

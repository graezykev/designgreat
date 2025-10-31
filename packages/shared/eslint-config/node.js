import nodePlugin from 'eslint-plugin-n'
import globals from 'globals'

/**
 * @typedef {object} NodeConfigOptions
 * @property {string | string[] | undefined} [parserProject]
 * @property {import('eslint').Linter.ParserOptions['tsconfigRootDir']} [tsconfigRootDir]
 */

/**
 * @param {string[]} [globs]
 * @param {NodeConfigOptions} [options]
 */
const createNodeConfig = (
  globs = ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.ts'],
  options = {}
) => {
  const { parserProject, tsconfigRootDir } = options

  const parserOptions = {}

  if (typeof parserProject !== 'undefined') {
    parserOptions.project = Array.isArray(parserProject) ? parserProject : [parserProject]

    if (tsconfigRootDir) {
      parserOptions.tsconfigRootDir = tsconfigRootDir
    }
  }

  return [
    {
      name: 'designgreat/node',
      files: globs,
      plugins: {
        n: nodePlugin
      },
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: {
          ...globals.node,
          ...globals.es2022
        },
        parserOptions
      },
      rules: {
        'n/hashbang': 'error',
        'n/no-deprecated-api': 'warn',
        'n/no-missing-import': 'off',
        'n/no-process-exit': 'off',
        'n/no-unsupported-features/es-syntax': 'off',
        'n/prefer-global/buffer': ['error', 'always'],
        'n/prefer-global/process': ['error', 'always'],
        'n/shebang': 'error'
      }
    }
  ]
}

export default createNodeConfig

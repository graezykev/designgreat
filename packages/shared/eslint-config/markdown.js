import markdown from '@eslint/markdown'

/**
 * ESLint configuration for Markdown and MDX files.
 *
 * This configuration enables linting of code blocks within .md and .mdx files:
 * - Uses the markdown processor to extract and lint code blocks
 * - Disables type-aware TypeScript rules (since code blocks don't have full context)
 * - Allows code examples to be more lenient with unused variables
 * - Supports JavaScript, TypeScript, JSX, and TSX code blocks
 *
 * Note: For MDX files, only code blocks (triple backticks) are linted.
 * The mixed JSX/Markdown content in MDX files is NOT linted - the MDX compiler
 * (built into Docusaurus) handles syntax checking for that.
 *
 * @example
 * ```js
 * // This code block in a .md or .mdx file will be linted
 * const example = 'hello world'
 * ```
 */

const typeAwareRulesToDisable = [
  '@typescript-eslint/await-thenable',
  '@typescript-eslint/consistent-return',
  '@typescript-eslint/consistent-type-exports',
  '@typescript-eslint/dot-notation',
  '@typescript-eslint/naming-convention',
  '@typescript-eslint/no-array-delete',
  '@typescript-eslint/no-base-to-string',
  '@typescript-eslint/no-confusing-void-expression',
  '@typescript-eslint/no-duplicate-type-constituents',
  '@typescript-eslint/no-floating-promises',
  '@typescript-eslint/no-for-in-array',
  '@typescript-eslint/no-implied-eval',
  '@typescript-eslint/no-meaningless-void-operator',
  '@typescript-eslint/no-misused-promises',
  '@typescript-eslint/no-mixed-enums',
  '@typescript-eslint/no-redundant-type-constituents',
  '@typescript-eslint/no-throw-literal',
  '@typescript-eslint/no-unnecessary-boolean-literal-compare',
  '@typescript-eslint/no-unnecessary-condition',
  '@typescript-eslint/no-unnecessary-qualifier',
  '@typescript-eslint/no-unnecessary-template-expression',
  '@typescript-eslint/no-unnecessary-type-arguments',
  '@typescript-eslint/no-unnecessary-type-assertion',
  '@typescript-eslint/no-unnecessary-type-parameters',
  '@typescript-eslint/no-unsafe-argument',
  '@typescript-eslint/no-unsafe-assignment',
  '@typescript-eslint/no-unsafe-call',
  '@typescript-eslint/no-unsafe-enum-comparison',
  '@typescript-eslint/no-unsafe-member-access',
  '@typescript-eslint/no-unsafe-return',
  '@typescript-eslint/no-unsafe-unary-minus',
  '@typescript-eslint/no-useless-template-literals',
  '@typescript-eslint/non-nullable-type-assertion-style',
  '@typescript-eslint/only-throw-error',
  '@typescript-eslint/prefer-destructuring',
  '@typescript-eslint/prefer-find',
  '@typescript-eslint/prefer-includes',
  '@typescript-eslint/prefer-nullish-coalescing',
  '@typescript-eslint/prefer-optional-chain',
  '@typescript-eslint/prefer-promise-reject-errors',
  '@typescript-eslint/prefer-readonly',
  '@typescript-eslint/prefer-readonly-parameter-types',
  '@typescript-eslint/prefer-reduce-type-parameter',
  '@typescript-eslint/prefer-regexp-exec',
  '@typescript-eslint/prefer-return-this-type',
  '@typescript-eslint/prefer-string-starts-ends-with',
  '@typescript-eslint/promise-function-async',
  '@typescript-eslint/require-array-sort-compare',
  '@typescript-eslint/require-await',
  '@typescript-eslint/restrict-plus-operands',
  '@typescript-eslint/restrict-template-expressions',
  '@typescript-eslint/return-await',
  '@typescript-eslint/strict-boolean-expressions',
  '@typescript-eslint/switch-exhaustiveness-check',
  '@typescript-eslint/unbound-method',
  '@typescript-eslint/use-unknown-in-catch-callback-variable'
]

const createMarkdownConfig = () => [
  ...markdown.configs.recommended,
  {
    name: 'designgreat/markdown-processor',
    files: ['**/*.md'],
    processor: markdown.processors.markdown,
    rules: {
      'eol-last': 'off',
      'no-trailing-spaces': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },
  {
    name: 'designgreat/mdx-processor',
    files: ['**/*.mdx'],
    processor: markdown.processors.markdown,
    rules: {
      'eol-last': 'off',
      'no-trailing-spaces': 'off',
      '@typescript-eslint/no-unused-vars': 'off'
    }
  },
  {
    name: 'designgreat/markdown-codeblocks',
    files: ['**/*.md/*.js', '**/*.md/*.cjs', '**/*.md/*.mjs', '**/*.md/*.ts', '**/*.md/*.tsx', '**/*.md/*.jsx'],
    languageOptions: {
      parserOptions: {
        project: false
      }
    },
    rules: {
      ...Object.fromEntries(typeAwareRulesToDisable.map((rule) => [rule, 'off'])),
      '@typescript-eslint/no-unused-vars': 'off',
      'import/no-extraneous-dependencies': 'off', // Allow examples to import any package
      'no-alert': 'off', // Allow alert() in documentation examples
      'no-console': 'off', // Allow console in documentation examples
      'no-labels': 'off', // Allow labeled statements in examples
      'no-undef': 'off', // Allow undefined variables in isolated examples
      'no-unused-labels': 'off' // Allow unused labels in examples
    }
  },
  {
    name: 'designgreat/mdx-codeblocks',
    files: ['**/*.mdx/*.js', '**/*.mdx/*.cjs', '**/*.mdx/*.mjs', '**/*.mdx/*.ts', '**/*.mdx/*.tsx', '**/*.mdx/*.jsx'],
    languageOptions: {
      parserOptions: {
        project: false
      }
    },
    rules: {
      ...Object.fromEntries(typeAwareRulesToDisable.map((rule) => [rule, 'off'])),
      '@typescript-eslint/no-unused-vars': 'off',
      'no-alert': 'off', // Allow alert() in documentation examples
      'no-console': 'off', // Allow console in documentation examples
      'no-undef': 'off' // Allow undefined variables in isolated examples
    }
  }
]

export default createMarkdownConfig

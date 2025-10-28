/** @type {import('prettier').Config} */
const config = {
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  printWidth: 100,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  useTabs: false,
  plugins: [],
  overrides: [
    {
      files: ['*.md'],
      options: {
        proseWrap: 'always'
      }
    }
  ]
}

export default config

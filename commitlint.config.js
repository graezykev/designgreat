const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'always', ['sentence-case', 'start-case', 'lower-case', 'upper-case']],
    'scope-case': [2, 'always', 'lower-case']
  }
}

export default config

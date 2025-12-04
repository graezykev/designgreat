export const reactWorkspaceGlobs = [
  'packages/lib-design-token/**/*.{js,jsx,ts,tsx}',
  'packages/lib-web-component/**/*.{js,jsx,ts,tsx}',
  'packages/docs-design-system/src/**/*.{js,jsx,ts,tsx}',
  'packages/docs-design-system/*.{ts,tsx}',
  'packages/app-web-*/**/*.{js,jsx,ts,tsx}'
]

export const nodeWorkspaceGlobs = [
  'scripts/**/*.{js,ts}',
  'infrastructure/**/*.{js,ts}',
  'packages/app-service-*/**/*.{js,ts}',
  'packages/app-service-serverless-a/**/*.{js,ts}',
  'packages/!(docs-design-system)/scripts/**/*.{js,ts,mjs,cjs}',
  'packages/shared/*/scripts/**/*.{js,ts,mjs,cjs}',
  '*.config.{js,ts,mjs,cjs}',
  'packages/**/eslint.config.{js,ts}'
]

export const devDependencyGlobs = [
  '**/__tests__/**',
  '**/?(*.)+(test|spec).[jt]s?(x)',
  '**/*.config.[jt]s?(x)',
  '**/*.setup.[jt]s?(x)',
  '**/*.stories.*',
  '**/.storybook/**',
  'scripts/**',
  'packages/**/scripts/**',
  'packages/shared/eslint-config/**'
]

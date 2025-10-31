export const reactWorkspaceGlobs = [
  'packages/lib-web-ui-design-token/**/*.{js,jsx,ts,tsx}',
  'packages/lib-web-ui/**/*.{js,jsx,ts,tsx}',
  'packages/lib-web-ui-website/**/*.{js,jsx,ts,tsx}',
  'packages/app-web-*/**/*.{js,jsx,ts,tsx}'
]

export const nodeWorkspaceGlobs = [
  'scripts/**/*.{js,ts}',
  'infrastructure/**/*.{js,ts}',
  'packages/app-service-*/**/*.{js,ts}',
  'packages/app-service-serverless-a/**/*.{js,ts}',
  'packages/**/scripts/**/*.{js,ts,mjs,cjs}',
  '*.config.{js,ts,mjs,cjs}',
  'packages/**/eslint.config.{js,ts}'
]

export const devDependencyGlobs = [
  '**/__tests__/**',
  '**/?(*.)+(test|spec).[jt]s?(x)',
  '**/*.config.[jt]s?(x)',
  '**/*.setup.[jt]s?(x)',
  '**/*.stories.*',
  'scripts/**',
  'packages/shared/eslint-config/**'
]

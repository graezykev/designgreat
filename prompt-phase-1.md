You are tasked with setting up Phase 1 of the DesignGreat monorepo project. I need you to create all
necessary configuration files and directory structures. Please provide the exact contents for each
file, along with explanations and any necessary commands.

PROJECT CONTEXT:

Monorepo using PNPM workspaces + Turborepo

- Node.js version: 22
- Primary language: TypeScript V5
- Package manager: PNPM V9
- Linting: ESLint V9 with XO configurations (with no semicolons), use ES modules syntax for all
  configuration files, all js, ts, jsx, tsx, cjs, mjs, esm files in this monorepo should be able to
  be linted.
- Code formatting: Prettier (compatible with XO with no semicolons), use prettier.config.js to
  configure Prettier for this project, use ES modules syntax for all configuration files
- Git hooks: Husky V9 for pre-commit (lint-staged), commit-msg (commitlint) and pre-push
- Version management: Changesets
- NPM scope: @designgreat

- DIRECTORY STRUCTURE TO CREATE:

```
/
├── .github/
│ └── workflows/
├── packages/
│ ├── lib-design-token/
│ ├── lib-web-component/
│ ├── lib-web-component-website/
│ ├── app-web-pc-core/
│ ├── app-web-pc-client/
│ ├── app-web-mobile-core/
│ ├── app-service-a/
│ ├── app-service-b/
│ ├── app-service-c/
│ ├── app-service-serverless-a/
│ └── shared/
│ └── eslint-config/
├── infrastructure/
│ ├── terraform/
│ └── kubernetes/
├── docs/
└── scripts/
```

Please provide the exact contents and creation steps for the following files:

- .gitignore
- .nvmrc
- pnpm-workspace.yaml
- Root package.json
- .npmrc
- turbo.json
- tsconfig.base.json
- tsconfig.json (root)
- tsconfig.node.json
- tsconfig.react.json
- tsconfig.library.json
- packages/shared/eslint-config/package.json
- packages/shared/eslint-config/base.js
- packages/shared/eslint-config/react.js
- packages/shared/eslint-config/node.js
- Root eslint.config.js
- xo.config.ts
- .eslintignore
- prettier.config.js
- .prettierignore
- .editorconfig
- .husky/pre-commit
- .husky/commit-msg
- commitlint.config.js
- .changeset/config.json
- .changeset/README.md

For each package in the packages/ directory, create a minimal package.json file.

Also, provide the contents for:

- Root README.md
- docs/ARCHITECTURE.md
- docs/CONTRIBUTING.md
- scripts/setup.sh
- scripts/clean.sh

For each file:

Start with the exact file path Provide the complete file contents (no placeholders or "...") Explain
key configurations or important parts of the file Include any relevant commands for creating or
setting up the file Do not forget we use XO for linting so all generated js, ts, jsx, tsx, cjs, mjs,
esm files should be compliant with XO with no semicolons

After providing all files, please include:

A list of all necessary PNPM commands to install devDependencies at the workspace root Step-by-step
instructions for setting up the project from scratch A checklist for validating the setup Common
troubleshooting tips

Please create all these files now, providing complete, production-ready contents for each.

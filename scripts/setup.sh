#!/usr/bin/env bash
set -euo pipefail

if [ -f .nvmrc ] && command -v nvm >/dev/null 2>&1; then
  nvm use
fi

echo "Installing workspace dependencies with PNPM"
pnpm install

echo "Activating Husky git hooks"
pnpm exec husky
chmod +x .husky/pre-commit .husky/commit-msg .husky/pre-push

echo "Running initial quality checks"
pnpm lint
pnpm format:check || true
pnpm typecheck || true

echo "Setup complete"

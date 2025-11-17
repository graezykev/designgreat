#!/usr/bin/env bash
set -euo pipefail

dirs=(
  "node_modules"
  ".turbo"
  "dist"
  "build"
  "coverage",
  "storybook-static",
  ".docusaurus"
)

files=(
  "pnpm-debug.log"
)

for dir in "${dirs[@]}"; do
  if [ -e "$dir" ]; then
    echo "Removing $dir"
    rm -rf "$dir"
  fi
done

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Removing $file"
    rm -f "$file"
  fi
done

# Recursively remove the same directories inside packages/*
for dir in "${dirs[@]}"; do
  find packages -type d -name "$dir" -prune -exec rm -rf {} +
done

# Remove matching files inside packages/*
for file in "${files[@]}"; do
  find packages -type f -name "$file" -delete
done

# Remove TypeScript incremental build metadata across the workspace
find . -type f -name "*.tsbuildinfo" -delete

echo "Workspace cleaned"

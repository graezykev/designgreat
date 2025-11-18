/**
 * Syncs ESLint peer dependencies from @designgreat/eslint-config
 * to the root package.json devDependencies.
 *
 * This ensures the monorepo has all required ESLint dependencies
 * installed to satisfy the shared config's peer dependencies.
 *
 * Usage:
 *   pnpm sync:eslint-deps           # Sync dependencies
 *   pnpm sync:eslint-deps --dry-run # Preview changes only
 */

import * as fs from 'node:fs'
import * as path from 'node:path'

type PackageJson = {
  name?: string
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

type Change = {
  name: string
  old: string | undefined
  new: string
}

const workspaceRoot = process.cwd()
const rootPackagePath = path.join(workspaceRoot, 'package.json')
const eslintConfigPackagePath = path.join(workspaceRoot, 'packages', 'shared', 'eslint-config', 'package.json')

function readJson(filePath: string): PackageJson {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(content) as PackageJson
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      console.error(`❌ Error: File not found: ${filePath}`)
    } else if (error instanceof SyntaxError) {
      console.error(`❌ Error: Invalid JSON in ${filePath}`)
    } else {
      console.error(`❌ Error reading ${filePath}:`, error)
    }

    process.exit(1)
  }
}

function writeJson(filePath: string, data: PackageJson): void {
  try {
    fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf-8')
  } catch (error) {
    console.error(`❌ Error writing ${filePath}:`, error)
    process.exit(1)
  }
}

function collectChanges(
  rootDevDeps: Record<string, string>,
  eslintPeerDeps: Record<string, string>
): Change[] {
  const changes: Change[] = []

  for (const [name, newVersion] of Object.entries(eslintPeerDeps)) {
    const oldVersion = rootDevDeps[name]
    if (oldVersion !== newVersion) {
      changes.push({ name, old: oldVersion, new: newVersion })
    }
  }

  return changes
}

function displayChanges(changes: Change[]): void {
  console.log('📦 Changes to be made:\n')

  for (const { name, old, new: newVersion } of changes) {
    if (old) {
      console.log(`  🔄 ${name}: ${old} → ${newVersion}`)
    } else {
      console.log(`  ➕ ${name}: ${newVersion}`)
    }
  }

  console.log()
}

function applyChanges(
  rootPackageJson: PackageJson,
  eslintPeerDeps: Record<string, string>
): void {
  rootPackageJson.devDependencies ??= {}

  for (const [name, version] of Object.entries(eslintPeerDeps)) {
    rootPackageJson.devDependencies[name] = version
  }
}

function verifySync(
  rootPackageJson: PackageJson,
  eslintPeerDeps: Record<string, string>
): boolean {
  const rootDevDeps = rootPackageJson.devDependencies ?? {}
  const mismatches: Array<{ name: string; expected: string; actual: string | undefined }> = []

  for (const [name, expectedVersion] of Object.entries(eslintPeerDeps)) {
    const actualVersion = rootDevDeps[name]
    if (actualVersion !== expectedVersion) {
      mismatches.push({ name, expected: expectedVersion, actual: actualVersion })
    }
  }

  if (mismatches.length > 0) {
    console.error('⚠️  Verification failed! Mismatches found:\n')
    for (const { name, expected, actual } of mismatches) {
      console.error(`  ${name}: expected ${expected}, got ${actual ?? 'undefined'}`)
    }

    return false
  }

  return true
}

function main() {
  const isDryRun = process.argv.includes('--dry-run')

  console.log('🔍 Checking ESLint dependency synchronization...\n')

  // Read package files
  const rootPackageJson = readJson(rootPackagePath)
  const eslintConfigPackageJson = readJson(eslintConfigPackagePath)

  if (!eslintConfigPackageJson.peerDependencies) {
    console.error('❌ Error: No peerDependencies found in @designgreat/eslint-config')
    process.exit(1)
  }

  // Collect changes
  const rootDevDeps = rootPackageJson.devDependencies ?? {}
  const eslintPeerDeps = eslintConfigPackageJson.peerDependencies
  const changes = collectChanges(rootDevDeps, eslintPeerDeps)

  // Check if already in sync
  if (changes.length === 0) {
    console.log('✅ All ESLint dependencies already in sync!')
    process.exit(0)
  }

  // Display changes
  displayChanges(changes)

  // Dry run - exit without modifying
  if (isDryRun) {
    console.log('🔍 Dry run mode - no changes written')
    console.log('\n💡 To apply these changes, run:')
    console.log('   pnpm sync:eslint-deps\n')
    process.exit(0)
  }

  // Apply changes
  applyChanges(rootPackageJson, eslintPeerDeps)
  writeJson(rootPackagePath, rootPackageJson)

  // Verify the sync
  const rereadRootPackageJson = readJson(rootPackagePath)
  if (!verifySync(rereadRootPackageJson, eslintPeerDeps)) {
    console.error('\n❌ Sync verification failed!')
    process.exit(1)
  }

  console.log('✨ Successfully synced ESLint peer dependencies to root devDependencies!')
  console.log('\n💡 Next steps:')
  console.log('   1. Run: pnpm install')
  console.log('   2. Verify: pnpm lint')
  console.log('   3. Commit the changes\n')
}

main()

/**
 * Script to check and sync React version consistency across the monorepo
 *
 * Usage:
 *   pnpm exec tsx scripts/check-react-versions.ts           # Check only
 *   pnpm exec tsx scripts/check-react-versions.ts --sync    # Check and sync
 */

import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as yaml from 'yaml'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

type PackageJson = {
  name?: string
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

type VersionInfo = {
  packageName: string
  depName: 'react' | 'react-dom'
  type: 'dependencies' | 'devDependencies' | 'peerDependencies'
  version: string
}

type CatalogVersions = {
  react?: string
  'react-dom'?: string
}

function findPackageJsonFiles(dir: string): string[] {
  const results: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    // Skip node_modules, dist, and hidden directories
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name.startsWith('.')) {
      continue
    }

    if (entry.isDirectory()) {
      results.push(...findPackageJsonFiles(fullPath))
    } else if (entry.name === 'package.json') {
      results.push(fullPath)
    }
  }

  return results
}

function readCatalogVersions(): CatalogVersions {
  const workspaceFile = path.join(rootDir, 'pnpm-workspace.yaml')
  const content = fs.readFileSync(workspaceFile, 'utf-8')
  const workspace = yaml.parse(content)

  return {
    react: workspace?.catalog?.react,
    'react-dom': workspace?.catalog?.['react-dom']
  }
}

function extractReactVersions(packageJsonPath: string): VersionInfo[] {
  const content = fs.readFileSync(packageJsonPath, 'utf-8')
  const pkg: PackageJson = JSON.parse(content)
  const versions: VersionInfo[] = []

  const packageName = pkg.name ?? path.basename(path.dirname(packageJsonPath))

  const depTypes: Array<'dependencies' | 'devDependencies' | 'peerDependencies'> = [
    'dependencies',
    'devDependencies',
    'peerDependencies'
  ]

  for (const depType of depTypes) {
    const deps = pkg[depType]
    if (deps) {
      if (deps.react) {
        versions.push({ packageName, depName: 'react', type: depType, version: deps.react })
      }

      if (deps['react-dom']) {
        versions.push({ packageName, depName: 'react-dom', type: depType, version: deps['react-dom'] })
      }
    }
  }

  return versions
}

function syncPeerDependencies(packageJsonPath: string, catalogVersions: CatalogVersions): boolean {
  const content = fs.readFileSync(packageJsonPath, 'utf-8')
  const pkg: PackageJson = JSON.parse(content)

  let changed = false

  if (pkg.peerDependencies) {
    if (pkg.peerDependencies.react && catalogVersions.react &&
        pkg.peerDependencies.react !== 'catalog:' &&
        pkg.peerDependencies.react !== catalogVersions.react) {
      console.log(`  🔧 Updating react: ${pkg.peerDependencies.react} → ${catalogVersions.react}`)
      pkg.peerDependencies.react = catalogVersions.react
      changed = true
    }

    if (pkg.peerDependencies['react-dom'] && catalogVersions['react-dom'] &&
        pkg.peerDependencies['react-dom'] !== 'catalog:' &&
        pkg.peerDependencies['react-dom'] !== catalogVersions['react-dom']) {
      console.log(`  🔧 Updating react-dom: ${pkg.peerDependencies['react-dom']} → ${catalogVersions['react-dom']}`)
      pkg.peerDependencies['react-dom'] = catalogVersions['react-dom']
      changed = true
    }
  }

  if (changed) {
    // Write back with pretty formatting
    fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8')
  }

  return changed
}

function checkPeerDepMismatches(
  allVersions: Map<string, VersionInfo[]>,
  catalogVersions: CatalogVersions
): Array<{ file: string; dep: string; current: string; expected: string }> {
  const peerDepMismatches: Array<{ file: string; dep: string; current: string; expected: string }> = []

  for (const [file, versions] of allVersions) {
    for (const info of versions) {
      if (info.type === 'peerDependencies' && info.version !== 'catalog:') {
        const expectedVersion = info.depName === 'react' ? catalogVersions.react : catalogVersions['react-dom']
        if (expectedVersion && info.version !== expectedVersion) {
          peerDepMismatches.push({
            file,
            dep: info.depName,
            current: info.version,
            expected: expectedVersion
          })
        }
      }
    }
  }

  return peerDepMismatches
}

function checkMultipleVersions(allVersions: Map<string, VersionInfo[]>): {
  reactVersions: Set<string>
  reactDomVersions: Set<string>
  hasMultipleVersions: boolean
} {
  const reactVersions = new Set<string>()
  const reactDomVersions = new Set<string>()

  for (const versions of allVersions.values()) {
    for (const info of versions) {
      if (info.type !== 'peerDependencies' && info.version !== 'catalog:') {
        if (info.depName === 'react-dom') {
          reactDomVersions.add(info.version)
        } else {
          reactVersions.add(info.version)
        }
      }
    }
  }

  const nonCatalogReact = Array.from(reactVersions).filter(v => v !== 'catalog:')
  const nonCatalogReactDom = Array.from(reactDomVersions).filter(v => v !== 'catalog:')
  const hasMultipleVersions = nonCatalogReact.length > 1 || nonCatalogReactDom.length > 1

  return { reactVersions, reactDomVersions, hasMultipleVersions }
}

function displayVersions(allVersions: Map<string, VersionInfo[]>): void {
  console.log('📦 React versions found:\n')

  for (const [file, versions] of allVersions) {
    const relativePath = path.relative(rootDir, file)
    console.log(`  ${relativePath}`)

    for (const info of versions) {
      const icon = info.type === 'peerDependencies' ? '👥' : info.type === 'dependencies' ? '📦' : '🔧'
      console.log(`    ${icon} ${info.type.padEnd(20)} ${info.depName.padEnd(10)}: ${info.version}`)
    }

    console.log()
  }
}

function handlePeerDepSync(
  peerDepMismatches: Array<{ file: string; dep: string; current: string; expected: string }>,
  filesWithPeerDeps: string[],
  catalogVersions: CatalogVersions,
  shouldSync: boolean
): void {
  console.log('⚠️  peerDependencies mismatches found:\n')

  for (const mismatch of peerDepMismatches) {
    const relativePath = path.relative(rootDir, mismatch.file)
    console.log(`  ${relativePath}`)
    console.log(`    ${mismatch.dep}: ${mismatch.current} (expected: ${mismatch.expected})`)
  }

  console.log()

  if (shouldSync) {
    console.log('🔧 Syncing peerDependencies to match catalog...\n')

    let syncedCount = 0
    for (const file of filesWithPeerDeps) {
      const relativePath = path.relative(rootDir, file)
      const changed = syncPeerDependencies(file, catalogVersions)
      if (changed) {
        console.log(`✅ Synced: ${relativePath}`)
        syncedCount++
      }
    }

    if (syncedCount > 0) {
      console.log(`\n✨ Synced ${syncedCount} file(s) successfully!`)
      console.log('\n💡 Next steps:')
      console.log('   1. Run: pnpm install')
      console.log('   2. Run: pnpm test')
      console.log('   3. Commit the changes\n')
    } else {
      console.log('\n✅ All peerDependencies already in sync!')
    }

    process.exit(0)
  } else {
    console.log('💡 To automatically sync peerDependencies, run:')
    console.log('   pnpm check:react-versions --sync\n')
    process.exit(1)
  }
}

function main() {
  const shouldSync = process.argv.includes('--sync') || process.argv.includes('--fix')

  console.log('🔍 Checking React version consistency across monorepo...\n')

  // Read catalog versions
  const catalogVersions = readCatalogVersions()

  if (!catalogVersions.react || !catalogVersions['react-dom']) {
    console.log('⚠️  WARNING: Could not read catalog from pnpm-workspace.yaml')
    process.exit(1)
  }

  console.log('📖 Catalog versions (source of truth):')
  console.log(`  react:     ${catalogVersions.react}`)
  console.log(`  react-dom: ${catalogVersions['react-dom']}\n`)

  const packageJsonFiles = findPackageJsonFiles(rootDir)
  const allVersions = new Map<string, VersionInfo[]>()
  const filesWithPeerDeps: string[] = []

  // Group by package
  for (const file of packageJsonFiles) {
    const versions = extractReactVersions(file)
    if (versions.length > 0) {
      allVersions.set(file, versions)

      // Track files with peerDependencies
      if (versions.some(v => v.type === 'peerDependencies')) {
        filesWithPeerDeps.push(file)
      }
    }
  }

  // Display all versions
  displayVersions(allVersions)

  // Check for inconsistencies
  const peerDepMismatches = checkPeerDepMismatches(allVersions, catalogVersions)
  const { reactVersions, reactDomVersions, hasMultipleVersions } = checkMultipleVersions(allVersions)

  let hasInconsistencies = false

  // Report findings
  console.log('\n📊 Summary:\n')

  if (peerDepMismatches.length > 0) {
    hasInconsistencies = true
    handlePeerDepSync(peerDepMismatches, filesWithPeerDeps, catalogVersions, shouldSync)
  }

  // Check versions excluding catalog references
  if (hasMultipleVersions) {
    const nonCatalogReact = Array.from(reactVersions).filter(v => v !== 'catalog:')
    const nonCatalogReactDom = Array.from(reactDomVersions).filter(v => v !== 'catalog:')

    console.log('⚠️  WARNING: Multiple React versions detected (excluding catalog)!')
    console.log(`   React versions: ${nonCatalogReact.join(', ')}`)
    console.log(`   React-DOM versions: ${nonCatalogReactDom.join(', ')}`)
    hasInconsistencies = true
  }

  if (!hasInconsistencies) {
    console.log('✅ All React versions are consistent with catalog!')
    console.log('\n💡 To update React across the monorepo:')
    console.log('   1. Edit pnpm-workspace.yaml catalog')
    console.log('   2. Run: pnpm check:react-versions --sync')
    console.log('   3. Run: pnpm install\n')
  }

  process.exit(hasInconsistencies ? 1 : 0)
}

main()


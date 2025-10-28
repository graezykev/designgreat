import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

type PackageJson = {
  [key: string]: unknown
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

const workspaceRoot = process.cwd()
const rootPackagePath = join(workspaceRoot, 'package.json')
const sharedPackagePath = join(workspaceRoot, 'packages', 'shared', 'eslint-config', 'package.json')

const readJson = (filePath: string) => JSON.parse(readFileSync(filePath, 'utf8')) as PackageJson
const writeJson = (filePath: string, data: PackageJson) => {
  writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

const rootPackageJson = readJson(rootPackagePath)
const sharedPackageJson = readJson(sharedPackagePath)

if (!sharedPackageJson.peerDependencies) {
  console.error('No peerDependencies found in packages/shared/eslint-config/package.json')
  process.exit(1)
}

rootPackageJson.devDependencies ??= {}

for (const [name, version] of Object.entries(sharedPackageJson.peerDependencies)) {
  rootPackageJson.devDependencies[name] = version
}

writeJson(rootPackagePath, rootPackageJson)
console.log('Synced ESLint peer dependencies into root devDependencies')

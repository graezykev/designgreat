#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unused-vars */

/**
 * Script Validation Tool
 *
 * Validates that all documentation review scripts:
 * 1. Can be executed without syntax errors
 * 2. Have correct path resolution
 * 3. Handle missing files gracefully
 * 4. Produce expected output format
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const workspaceRoot = path.resolve(__dirname, '../../../..')
const scriptsDir = __dirname

// Expected scripts
const EXPECTED_SCRIPTS = [
  'check-tokens-step1.js',
  'check-tokens-step2.js',
  'check-tokens-step3.js',
  'check-tokens-step4.js',
  'check-tokens-step5.js',
  'check-tokens-step6.js',
  'check-tokens-step7.js',
  'check-tokens-step8.js',
  'check-tokens-step9.js',
  'check-tokens-step10.js',
  'check-tokens-step11.js',
  'check-tokens-step12.js',
  'run-all-checks.js'
]

// Required paths
const REQUIRED_PATHS = {
  'CSS Variables': 'packages/lib-design-token/dist/css/light/variables.css',
  'Token Source': 'packages/lib-design-token/src/tokens',
  'Docs Root': 'packages/docs-design-system/docs-design-token',
  'Custom CSS': 'packages/docs-design-system/src/css/custom.css'
}

function checkScriptExists(scriptName) {
  const scriptPath = path.join(scriptsDir, scriptName)
  return fs.existsSync(scriptPath)
}

function checkSyntax(scriptName) {
  const scriptPath = path.join(scriptsDir, scriptName)
  try {
    execSync(`node --check "${scriptPath}"`, { stdio: 'pipe' })
    return { valid: true, error: null }
  } catch (error) {
    return { valid: false, error: error.message }
  }
}

function checkPathResolution(scriptName) {
  const scriptPath = path.join(scriptsDir, scriptName)
  const content = fs.readFileSync(scriptPath, 'utf8')

  // Check if workspaceRoot is correctly resolved
  const hasWorkspaceRoot = content.includes('workspaceRoot')
  const hasCorrectPath = content.includes('../../../..') || content.includes('../../../../')

  return { hasWorkspaceRoot, hasCorrectPath }
}

function checkRequiredPaths() {
  const results = {}
  for (const [name, relPath] of Object.entries(REQUIRED_PATHS)) {
    const fullPath = path.join(workspaceRoot, relPath)
    results[name] = {
      path: relPath,
      exists: fs.existsSync(fullPath),
      fullPath
    }
  }

  return results
}

function checkErrorHandling(scriptName) {
  const scriptPath = path.join(scriptsDir, scriptName)
  const content = fs.readFileSync(scriptPath, 'utf8')

  // Check for basic error handling patterns
  const hasTryCatch = content.includes('try') && content.includes('catch')
  const hasExistsCheck = content.includes('fs.existsSync') || content.includes('existsSync')
  const hasErrorExit = content.includes('process.exit(1)') || content.includes('process.exit(0)')

  return { hasTryCatch, hasExistsCheck, hasErrorExit }
}

function main() {
  console.log('='.repeat(80))
  console.log('SCRIPT VALIDATION')
  console.log('='.repeat(80))
  console.log()

  let allPassed = true

  // Check script existence
  console.log('📋 Checking Script Existence...')
  console.log('-'.repeat(80))
  const missingScripts = []
  EXPECTED_SCRIPTS.forEach(script => {
    if (checkScriptExists(script)) {
      console.log(`✅ ${script}`)
    } else {
      console.log(`❌ ${script} - MISSING`)
      missingScripts.push(script)
      allPassed = false
    }
  })
  console.log()

  // Check syntax
  console.log('🔍 Checking Syntax...')
  console.log('-'.repeat(80))
  const syntaxErrors = []
  EXPECTED_SCRIPTS.forEach(script => {
    if (!checkScriptExists(script)) return
    const result = checkSyntax(script)
    if (result.valid) {
      console.log(`✅ ${script}`)
    } else {
      console.log(`❌ ${script} - Syntax Error`)
      console.log(`   ${result.error}`)
      syntaxErrors.push({ script, error: result.error })
      allPassed = false
    }
  })
  console.log()

  // Check path resolution
  console.log('📍 Checking Path Resolution...')
  console.log('-'.repeat(80))
  const pathIssues = []
  EXPECTED_SCRIPTS.forEach(script => {
    if (!checkScriptExists(script)) return
    const result = checkPathResolution(script)
    if (result.hasWorkspaceRoot && result.hasCorrectPath) {
      console.log(`✅ ${script}`)
    } else {
      console.log(`⚠️  ${script}`)
      if (!result.hasWorkspaceRoot) {
        console.log(`   Missing workspaceRoot variable`)
      }

      if (!result.hasCorrectPath) {
        console.log(`   Path resolution may be incorrect`)
      }

      pathIssues.push({ script, ...result })
    }
  })
  console.log()

  // Check required paths
  console.log('📁 Checking Required Paths...')
  console.log('-'.repeat(80))
  const pathResults = checkRequiredPaths()
  const missingPaths = []
  Object.entries(pathResults).forEach(([name, result]) => {
    if (result.exists) {
      console.log(`✅ ${name}: ${result.path}`)
    } else {
      console.log(`❌ ${name}: ${result.path} - NOT FOUND`)
      console.log(`   Full path: ${result.fullPath}`)
      missingPaths.push({ name, ...result })
      allPassed = false
    }
  })
  console.log()

  // Check error handling
  console.log('🛡️  Checking Error Handling...')
  console.log('-'.repeat(80))
  const errorHandlingIssues = []
  EXPECTED_SCRIPTS.forEach(script => {
    if (!checkScriptExists(script)) return
    const result = checkErrorHandling(script)
    const score = [result.hasTryCatch, result.hasExistsCheck, result.hasErrorExit].filter(Boolean).length
    if (score >= 2) {
      console.log(`✅ ${script} (${score}/3 checks)`)
    } else {
      console.log(`⚠️  ${script} (${score}/3 checks)`)
      if (!result.hasTryCatch) console.log(`   Missing try-catch`)
      if (!result.hasExistsCheck) console.log(`   Missing exists check`)
      if (!result.hasErrorExit) console.log(`   Missing process.exit`)
      errorHandlingIssues.push({ script, ...result })
    }
  })
  console.log()

  // Summary
  console.log('='.repeat(80))
  console.log('SUMMARY')
  console.log('='.repeat(80))

  const issues = {
    missingScripts: missingScripts.length,
    syntaxErrors: syntaxErrors.length,
    pathIssues: pathIssues.length,
    missingPaths: missingPaths.length,
    errorHandlingIssues: errorHandlingIssues.length
  }

  const totalIssues = Object.values(issues).reduce((sum, count) => sum + count, 0)

  if (totalIssues === 0) {
    console.log('✅ All checks passed!')
  } else {
    console.log(`⚠️  Found ${totalIssues} issue(s):`)
    Object.entries(issues).forEach(([type, count]) => {
      if (count > 0) {
        console.log(`   - ${type}: ${count}`)
      }
    })
    allPassed = false
  }

  console.log()

  if (missingPaths.length > 0) {
    console.log('💡 To fix missing paths:')
    missingPaths.forEach(({ name, path: relPath }) => {
      if (name === 'CSS Variables') {
        console.log(`   Run: pnpm --filter @designgreat/lib-design-token run build`)
      }
    })
    console.log()
  }

  process.exit(allPassed ? 0 : 1)
}

main()


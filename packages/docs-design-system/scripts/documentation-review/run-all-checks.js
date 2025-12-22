#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-unsafe-argument */

/**
 * Run All Documentation Review Checks
 *
 * Executes all 12 steps of the documentation review process.
 * Generates reports without making any changes.
 *
 * ⚠️ NOTE: This script runs all checks at once, but the RECOMMENDED workflow
 * is iterative step-by-step (complete Step 1 fully before Step 2).
 *
 * Use this script only for:
 * - Initial baseline assessment
 * - Quick overview of all issues
 *
 * For actual review process, use individual step scripts one at a time:
 * - Step 1: Check → Report → Fix → Review → Verify → Consent
 * - Step 2: (only after Step 1 is complete)
 * - etc.
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const workspaceRoot = path.resolve(__dirname, '../../../..')
const reportsDir = path.resolve(workspaceRoot, 'docs/progress-logs')
const scriptsDir = __dirname

// Steps configuration
const STEPS = [
  { num: 1, name: 'Token Existence', script: 'check-tokens-step1.js' },
  { num: 2, name: 'Color Demo Correctness', script: 'check-tokens-step2.js' },
  { num: 3, name: 'Token Usage in Demos', script: 'check-tokens-step3.js' },
  { num: 4, name: 'Inline Styles', script: 'check-tokens-step4.js' },
  { num: 5, name: 'Relevant Token Usage', script: 'check-tokens-step5.js' },
  { num: 6, name: 'Demo Keyword in Classes', script: 'check-tokens-step6.js' },
  { num: 7, name: 'Literal Values', script: 'check-tokens-step7.js' },
  { num: 8, name: 'Undefined CSS Variables', script: 'check-tokens-step8.js' },
  { num: 9, name: 'PX Scale Variables', script: 'check-tokens-step9.js' },
  { num: 10, name: 'Infima Overrides', script: 'check-tokens-step10.js' },
  { num: 11, name: 'Interactive State Patterns', script: 'check-tokens-step11.js' },
  { num: 12, name: 'Code Section Consistency', script: 'check-tokens-step12.js' }
]

function runStep(step) {
  console.log(`\n${'='.repeat(80)}`)
  console.log(`STEP ${step.num}: ${step.name}`)
  console.log('='.repeat(80))

  const scriptPath = path.join(scriptsDir, step.script)

  try {
    const output = execSync(`node "${scriptPath}"`, {
      cwd: workspaceRoot,
      encoding: 'utf8',
      stdio: 'pipe'
    })

    console.log(output)

    // Check exit code (0 = pass, 1 = issues found)
    const passed = !output.includes('❌') && !output.includes('ISSUES FOUND')

    return {
      step: step.num,
      name: step.name,
      passed,
      output
    }
  } catch (error) {
    // Script exited with code 1 (issues found) - this is expected
    const output = error.stdout || error.message
    console.log(output)

    return {
      step: step.num,
      name: step.name,
      passed: false,
      output: output.toString()
    }
  }
}

function generateSummary(results) {
  const passed = results.filter(r => r.passed).length
  const failed = results.filter(r => !r.passed).length
  const total = results.length

  const summary = {
    timestamp: new Date().toISOString(),
    total,
    passed,
    failed,
    results: results.map(r => ({
      step: r.step,
      name: r.name,
      passed: r.passed
    }))
  }

  return summary
}

function main() {
  const args = process.argv.slice(2)
  const reportOnly = args.includes('--report-only') || args.includes('-r')

  console.log('='.repeat(80))
  console.log('DOCUMENTATION REVIEW - ALL CHECKS')
  console.log('='.repeat(80))
  console.log(`Started: ${new Date().toISOString()}`)
  console.log(`Mode: ${reportOnly ? 'Report Only (no fixes)' : 'Full Check'}`)
  console.log()

  const results = []

  // Run all steps
  for (const step of STEPS) {
    const result = runStep(step)
    results.push(result)
  }

  // Generate summary
  const summary = generateSummary(results)

  // Print summary
  console.log('\n' + '='.repeat(80))
  console.log('SUMMARY')
  console.log('='.repeat(80))
  console.log(`Total Steps: ${summary.total}`)
  console.log(`✅ Passed: ${summary.passed}`)
  console.log(`❌ Failed: ${summary.failed}`)
  console.log()

  console.log('Results by Step:')
  summary.results.forEach(r => {
    const icon = r.passed ? '✅' : '❌'
    console.log(`  ${icon} Step ${r.step}: ${r.name}`)
  })

  // Save summary to file
  const summaryPath = path.join(reportsDir, `DOCUMENTATION_REVIEW_SUMMARY_${Date.now()}.json`)
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2))
  console.log(`\nSummary saved to: ${path.relative(workspaceRoot, summaryPath)}`)

  // Exit with appropriate code
  process.exit(summary.failed > 0 ? 1 : 0)
}

main()


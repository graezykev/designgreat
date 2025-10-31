import { assertTokenIntegrity } from './validation.js'

try {
  assertTokenIntegrity()
  console.log('✅ Design tokens passed validation checks')
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  console.error('❌ Design token validation failed')
  console.error(message)
  process.exitCode = 1
}

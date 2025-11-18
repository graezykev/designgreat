import '@testing-library/jest-dom'

// Configure React Testing Library environment to support act()
// This suppresses warnings about state updates not being wrapped in act()
// when the test environment is already properly handling async updates with waitFor()
;(global as any).IS_REACT_ACT_ENVIRONMENT = true

// Suppress specific React act() warnings that are false positives
// Our tests properly handle async updates with waitFor()
const originalError = console.error

beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const message = typeof args[0] === 'string' ? args[0] : ''

    if (message.includes('The current testing environment is not configured to support act')) {
      return
    }

    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

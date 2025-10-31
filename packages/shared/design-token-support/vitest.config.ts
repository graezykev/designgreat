import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '@designgreat/lib-web-ui-design-token': resolve(
        __dirname,
        '../../lib-web-ui-design-token/src/index.ts'
      )
    }
  },
  test: {
    environment: 'node'
  }
})

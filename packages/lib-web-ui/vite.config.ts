import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'

import postcssConfig from './postcss.config.ts'

const resolvePath = (...segments: string[]): string =>
  path.resolve(__dirname, ...segments)

export default defineConfig({
  plugins: [react()],
  publicDir: resolvePath('public'),
  css: {
    postcss: postcssConfig
  },
  build: {
    target: 'es2019',
    sourcemap: true,
    cssCodeSplit: false,
    emptyOutDir: false,
    lib: {
      entry: resolvePath('src/index.ts'),
      name: 'DesigngreatUI'
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        '@designgreat/lib-web-ui-design-token',
        'clsx'
      ],
      output: [
        {
          format: 'es',
          dir: resolvePath('dist'),
          entryFileNames: '[name].mjs',
          chunkFileNames: '[name]-[hash].mjs',
          assetFileNames: '[name][extname]',
          preserveModules: true,
          exports: 'named'
        },
        {
          format: 'cjs',
          dir: resolvePath('dist'),
          entryFileNames: '[name].cjs',
          chunkFileNames: '[name]-[hash].cjs',
          assetFileNames: '[name][extname]',
          preserveModules: true,
          exports: 'named',
          interop: 'auto'
        }
      ]
    }
  },
  resolve: {
    alias: {
      '@designgreat/lib-web-ui': resolvePath('src')
    }
  }
})

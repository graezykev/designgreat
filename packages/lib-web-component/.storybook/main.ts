import type { StorybookConfig } from '@storybook/react-vite'
import path from 'node:path'

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  stories: ['../src/**/*.stories.@(tsx|mdx)', '../src/**/*.mdx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  docs: {
    autodocs: 'tag'
  },
  core: {
    disableTelemetry: true // Added to prevent interactive telemetry prompts
  },
  async viteFinal(config) {
    const base = process.env.STORYBOOK_BASE_PATH ?? '/'

    const optimizeDeps = {
      ...(config.optimizeDeps ?? {}),
      esbuildOptions: {
        ...(config.optimizeDeps?.esbuildOptions ?? {}),
        target: 'es2020'
      }
    }

    const build = {
      ...(config.build ?? {}),
      target: 'es2020'
    }

    return {
      ...config,
      base,
      publicDir: path.resolve(__dirname, '../public'),
      resolve: {
        ...(config.resolve ?? {}),
        alias: {
          ...(config.resolve?.alias ?? {}),
          '@designgreat/lib-web-component': path.resolve(__dirname, '../src')
        }
      },
      optimizeDeps,
      build
    }
  }
}

export default config

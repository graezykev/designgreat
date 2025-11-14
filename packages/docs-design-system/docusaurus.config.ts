import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import path from 'node:path'
import { themes as prismThemes } from 'prism-react-renderer'

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const organizationName = 'graezykev'
const projectName = 'designgreat'
const baseUrl = `/${projectName}/`

const config: Config = {
  title: 'Designgreat Docs',
  tagline: 'Documentation hub for the Designgreat Design System',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: `https://${organizationName}.github.io`,
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName, // Usually your GitHub org/user name.
  projectName, // Usually your repo name.

  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en']
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            `https://github.com/${organizationName}/${projectName}/tree/main/packages/docs-design-system/`
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css'
        }
      } satisfies Preset.Options
    ]
  ],

  plugins: [
    () => ({
      name: 'custom-webpack-config',
      configureWebpack() {
        return {
          module: {
            rules: [
              {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                  filename: 'assets/fonts/[name][ext]'
                }
              }
            ]
          },
          resolve: {
            alias: {
              '/assets/fonts': path.resolve(__dirname, 'static/assets/fonts')
            }
          }
        }
      }
    })
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      respectPrefersColorScheme: true
    },
    navbar: {
      title: 'Designgreat Docs',
      logo: {
        alt: 'Designgreat Logo',
        src: 'img/logo.svg'
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs'
        },
        {
          href: `https://github.com/${organizationName}/${projectName}`,
          label: 'GitHub',
          position: 'right'
        }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro'
            },
            {
              label: 'Tutorials',
              to: '/docs/category/tutorial---basics'
            }
          ]
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: `https://github.com/${organizationName}/${projectName}`
            }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Designgreat. Built with Docusaurus.`
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula
    }
  } satisfies Preset.ThemeConfig,

  stylesheets: [
    `${baseUrl}font/font-face.css`
  ]
}

export default config

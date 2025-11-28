import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import path from 'node:path'
import { themes as prismThemes } from 'prism-react-renderer'

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const organizationName = 'graezykev'
const projectName = 'designgreat'
const baseUrl = `/${projectName}/`

const config: Config = {
  title: 'Design Great Docs',
  tagline: 'Documentation hub for the Design System (@designgreat)',
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

  // Client modules run in the browser before React hydrates
  clientModules: [
    require.resolve('./src/theme/preinit.ts')
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs-design-token',
          routeBasePath: 'design-token',
          sidebarPath: './sidebars-design-token.ts',
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
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'contributing',
        path: 'docs-contributing',
        routeBasePath: 'contributing',
        sidebarPath: './sidebars-contributing.ts',
        editUrl:
          `https://github.com/${organizationName}/${projectName}/tree/main/packages/docs-design-system/`
      }
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'components',
        path: 'docs-web-component',
        routeBasePath: 'web-component',
        sidebarPath: './sidebars-web-component.ts',
        editUrl:
          `https://github.com/${organizationName}/${projectName}/tree/main/packages/docs-design-system/`
      }
    ],
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

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsDir: 'docs-design-token'
      }
    ]
  ],

  markdown: {
    mermaid: true
  },

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      respectPrefersColorScheme: true
    },
    navbar: {
      title: 'Design Great',
      logo: {
        alt: 'Designgreat Logo',
        src: 'img/logo.svg'
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'designTokenSidebar',
          position: 'left',
          label: 'Design Token'
        },
        {
          type: 'doc',
          docId: 'guides/overview',
          docsPluginId: 'components',
          position: 'left',
          label: 'Web Component'
        },
        {
          type: 'doc',
          docId: 'index',
          docsPluginId: 'contributing',
          position: 'left',
          label: 'Contributing'
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
          title: 'Design Token',
          items: [
            {
              label: 'Design Token',
              to: '/design-token/guides/overview'
            }
          ]
        },
        {
          title: 'Web Component',
          items: [
            {
              label: 'Button',
              to: '/web-component/button'
            },
            {
              label: 'Dialog',
              to: '/web-component/dialog'
            },
            {
              label: 'TextInput',
              to: '/web-component/text-input'
            }
          ]
        },
        {
          title: 'Contributing',
          items: [
            {
              label: 'Getting Started',
              to: '/contributing'
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
      copyright: `Copyright © ${new Date().getFullYear()} Design Great. Built with Docusaurus.`
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

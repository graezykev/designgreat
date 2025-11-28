---
'@designgreat/docs-design-system': patch
---

### Documentation Improvements

**CSS Import Path Consistency**

- Updated all CSS imports to use explicit path `@designgreat/lib-web-ui/dist/lib-web-ui.css` for
  universal bundler compatibility (Webpack, Vite, Next.js, Remix, Astro, esbuild)
- Affected files: `installation.mdx`, `framework-guides.mdx`, `font-setup.mdx`

**Files Updated:**

- `docs-web-component/guides/installation.mdx` - Updated Basic Setup, "What Gets Imported" tip, and
  Troubleshooting sections
- `docs-web-component/guides/framework-guides.mdx` - Updated Next.js (App/Pages Router), Vite,
  Create React App, and Astro examples
- `docs-web-component/guides/font-setup.mdx` - Updated Quick Start and Google Fonts alternative
  sections

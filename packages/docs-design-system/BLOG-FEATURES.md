# Blog Setup Guide

Quick guide to enable and configure the blog feature in this Docusaurus site.

## Enable Blog

Edit `docusaurus.config.ts` and replace `blog: false` with:

```typescript
blog: {
  showReadingTime: true,
  feedOptions: {
    type: ['rss', 'atom'],
    xslt: true
  },
  editUrl: `https://github.com/${organizationName}/${projectName}/tree/main/packages/docs-design-system/`,
  blogTitle: 'Design System Blog',
  blogDescription: 'Updates, guides, and best practices for the Design System',
  blogSidebarTitle: 'All posts',
  blogSidebarCount: 'ALL'
}
```

## Add Navigation Links

### Navbar

In `themeConfig.navbar.items`, add:

```typescript
{
  to: '/blog',
  label: 'Blog',
  position: 'left'
}
```

### Footer (Optional)

In `themeConfig.footer.links`, add to the Docs section:

```typescript
{
  label: 'Blog',
  to: '/blog'
}
```

## Blog Content

Blog posts live in the `blog/` directory:

- **Posts:** `YYYY-MM-DD-post-title.md` or `.mdx`
- **Authors:** Define in `blog/authors.yml`
- **Tags:** Define in `blog/tags.yml`

### Example Post

```markdown
---
slug: my-post
title: My First Post
authors: [yourname]
tags: [design-system, components]
---

Post introduction text...

<!-- truncate -->

Full post content after the fold...
```

## Configuration Options

Common blog options in `docusaurus.config.ts`:

| Option             | Description                 | Default             |
| ------------------ | --------------------------- | ------------------- |
| `showReadingTime`  | Show estimated reading time | `true`              |
| `postsPerPage`     | Posts per page              | `10`                |
| `blogSidebarCount` | Sidebar post count          | `5`                 |
| `blogSidebarTitle` | Sidebar title               | 'Recent'            |
| `routeBasePath`    | Blog URL base path          | `'blog'`            |
| `include`          | Files to include            | `['**/*.{md,mdx}']` |

## URLs After Enabling

- **Blog home:** `/blog`
- **Individual post:** `/blog/post-slug`
- **Tags:** `/blog/tags`
- **Archive:** `/blog/archive`
- **RSS feed:** `/blog/rss.xml`
- **Atom feed:** `/blog/atom.xml`

## Additional Resources

- [Docusaurus Blog Docs](https://docusaurus.io/docs/blog)
- [Blog Plugin API](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog)

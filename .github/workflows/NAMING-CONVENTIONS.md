# GitHub Actions Workflow Naming Conventions

Quick reference guide for naming workflows, jobs, and steps in the designgreat monorepo.

---

## 🎯 Core Principles

1. **Be Explicit** - Names clearly describe what they do
2. **Be Consistent** - Follow patterns across all workflows
3. **Be Discoverable** - Use searchable, predictable names

---

## 📁 Workflow File Naming

### Current Patterns in Use

**Deployments:**

```
deploy-[what]-[where].yml
```

- ✅ `deploy-docs-storybook-gh-pages.yml`

**Releases:**

```
[action]-[target].yml
```

- ✅ `version-publish-packages.yml`

**Validation:**

```
check-[what].yml
```

- ✅ `check-changeset.yml`

**Automation:**

```
[auto-]action-[subject].yml
```

- ✅ `auto-deprecate-deleted-packages.yml`
- ✅ `deprecate-package.yml`

### Style Rules

- **Format:** lowercase-with-hyphens.yml
- **Be specific:** Avoid generic names like `deploy.yml` or `build.yml`
- **Include context:** Specify what and where (e.g., `-gh-pages`, `-vercel`)

---

## 🏷️ Display Names

The `name:` field should be human-readable:

```yaml
File: deploy-docs-storybook-gh-pages.yml
Name: Deploy Docusaurus & Storybook to GitHub Pages

File: check-changeset.yml
Name: Check for Changeset

File: auto-deprecate-deleted-packages.yml
Name: Auto-Deprecate Deleted Packages
```

**Rules:**

- Use Title Case
- Mirror the file name structure
- Keep under 60 characters

---

## 🔧 Job Naming

```yaml
jobs:
  build_and_deploy: # snake_case
  detect-changes: # or kebab-case
  version: # simple when clear
```

**Rules:**

- Descriptive and concise
- Consistent style within each workflow
- Prefix for multiple similar jobs (`build_docs`, `build_storybook`)

---

## 📝 Step Naming

Start with an action verb, use sentence case:

```yaml
✅ - name: Checkout repository
✅ - name: Setup Node.js
✅ - name: Build Docusaurus site
✅ - name: Deploy to GitHub Pages
✅ - name: Verify package exists on NPM

❌ - name: Build
❌ - name: Deploy
❌ - name: Check
```

### Common Action Verbs

| Verb            | Use Case              |
| --------------- | --------------------- |
| Checkout        | Get repository code   |
| Setup           | Configure environment |
| Install         | Add dependencies      |
| Build           | Create artifacts      |
| Deploy          | Push to platform      |
| Verify/Check    | Validate conditions   |
| Detect          | Discover changes      |
| Upload/Download | Handle artifacts      |

---

## 📚 Documentation File Naming

**Workflow-specific documentation:**

```
[workflow-scope]-[TYPE].md
```

- ✅ `docs-storybook-gh-pages-VISUAL-GUIDE.md`
- ✅ `docs-storybook-gh-pages-MIGRATION-SUMMARY.md`

**General documentation:**

```
[TOPIC].md or [TOPIC]-[SUBTOPIC].md
```

- ✅ `README.md`
- ✅ `NAMING-CONVENTIONS.md`
- ✅ `PACKAGE-DEPRECATION.md`

---

## 🎯 Quick Reference

| Element           | Pattern                                  | Example                                         |
| ----------------- | ---------------------------------------- | ----------------------------------------------- |
| **Workflow File** | `[action]-[subject]-[context].yml`       | `deploy-docs-storybook-gh-pages.yml`            |
| **Display Name**  | `[Action] [Subject] [Context]`           | `Deploy Docusaurus & Storybook to GitHub Pages` |
| **Job Name**      | `descriptive_name` or `descriptive-name` | `build_and_deploy`                              |
| **Step Name**     | `[Verb] [object] [context]`              | `Deploy to GitHub Pages`                        |

---

## ✅ Self-Check Questions

When naming a workflow:

1. **Can someone understand what this does from the name alone?**
2. **Is it searchable and discoverable?**
3. **Does it follow the patterns above?**
4. **Is it consistent with other workflows?**

If you answer "no" to any, make it more explicit.

---

## 🔄 Renaming Checklist

When renaming an existing workflow:

- [ ] Rename the workflow file
- [ ] Update the `name:` field in YAML
- [ ] Update references in other workflows (`workflow_run` triggers)
- [ ] Update README.md and related docs
- [ ] Rename related documentation files
- [ ] Test the workflow runs correctly

---

## 📋 TODO: Comprehensive Conventions

As the monorepo grows, we should expand this guide with:

- [ ] **Environment-specific patterns** (staging, production)
  - Example: `deploy-[what]-[where]-[env].yml`
- [ ] **Platform-specific builds** (iOS, Android, Docker)
  - Example: `build-[what]-[platform].yml`
- [ ] **Scheduled workflows** (maintenance, cleanup)
  - Example: `scheduled-[action]-[subject].yml`
- [ ] **Integration workflows** (Slack, Discord notifications)
  - Example: `integrate-[service]-[action].yml`
- [ ] **Detailed step naming guidelines** by workflow category
- [ ] **Branch-specific deployment patterns**
- [ ] **Testing and validation workflow patterns**
- [ ] **Security and compliance check patterns**

### When to Expand

Update this document when:

- Adding workflows that don't fit current patterns
- Team members are unsure about naming
- Patterns emerge from multiple similar workflows
- Inconsistencies appear in naming

---

## 📞 Questions?

If unsure about naming:

1. Review patterns in this doc
2. Look at similar existing workflows
3. Ask in team discussion
4. Document your reasoning in PR

---

**Version:** 1.0 (Concise)  
**Last Updated:** November 17, 2025  
**Status:** ✅ Active - Will expand as needed  
**Maintainer:** Development Team

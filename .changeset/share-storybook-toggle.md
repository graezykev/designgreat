---
'@designgreat/lib-web-ui': patch
---

**Share Storybook demo/code toggle across components**

- 1. Extract the CodeDemoToggle UI, syntax highlighter, and copy helpers into a shared storybook
     module and fix the semicolon highlighting bug.
- 2. Update Button, TextInput, and Dialog stories to render through the shared toggle while keeping
     their curated code snippets in sync with docs.
- 3. Improve the code view UX by enforcing a scrollable panel so long examples remain readable in
     Storybook.
- 4. Replace the Storybook workflow guide with comprehensive guidance on setup, shared toggle usage,
     authoring, testing, and troubleshooting.

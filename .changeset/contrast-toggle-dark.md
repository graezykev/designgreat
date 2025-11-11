---
'@designgreat/lib-web-ui': patch
---

**Restore the CodeDemo toggle contrast in dark mode while keeping Storybook chrome consistent**

- 1. Replace the gradient overlay around the demo/code buttons with token-based fills so
     accessibility tooling can sample the actual background color.
- 2. Reuse theme tokens for the border and shadow chrome so the toggle group renders the same visual
     weight without gradients.

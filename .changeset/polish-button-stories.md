---
'@designgreat/lib-web-ui': patch
---

**Improve Button stories and Storybook chrome for theme demos**

- 1. Add Code block.
- 2. Clamp Storybook html/body/root containers to 100% height with hidden overflow so themed
     previews render without scroll bleed.
- 3. Add dark/light-aware styling for the demo/code toggle buttons and backdrop so the controls
     mirror the selected theme.
- 4. Silence lint warnings around `react/no-danger` and index keys in the story to keep the
     Storybook suite clean.

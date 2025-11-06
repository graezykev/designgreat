"@designgreat/lib-web-ui": minor **Phase 2: Token-driven Tailwind adoption**

- 1. Map design tokens directly to Tailwind classes (`bg-color-background-button-default`,
     `px-spacing-11`, etc.) so components stay alias-free.
- 2. Teach Vite, Storybook, and the package build to generate utilities on demand while keeping
     README/STORYBOOK guides in sync.
- 3. Update Button, Dialog, and TextInput to exercise the new utilities and document the Storybook
     workflow for component development.
- 4. Outline Phase 3 follow-ups (trimming unused token CSS, dark-mode review, and additional
     accessibility stories) for future iterations.

---
'@designgreat/docs-design-system': minor
---

Comprehensive documentation updates from 12-step review process

**Overview:** This changeset includes comprehensive documentation improvements identified and fixed
during the 12-step documentation review process.

**Major Updates:**

**Token Documentation:**

- Update token references to use consistent naming (e.g., `color.primary.DEFAULT` instead of
  `color.primary.default`)
- Fix token reference values in tables (e.g., active state now correctly references
  `{color.primary.bolder}` instead of `{color.primary.subtle}`)
- Update use case descriptions for clarity (e.g., "Subtle emphasis states" instead of
  "Active/pressed states")
- Add missing token documentation across multiple pages

**Table Structure:**

- Reorganize token tables for better clarity
- Add missing columns and values
- Fix reference column values
- Improve table formatting and consistency

**Code Examples:**

- Update code examples to use correct token references
- Fix CSS variable names in examples
- Ensure code examples match actual implementation
- Add missing code examples where needed

**Files Modified (24 files):**

- `colors/accent-colors.mdx`: Token reference updates
- `colors/alpha-colors.mdx`: Minor formatting updates
- `colors/base-colors.mdx`: Documentation improvements
- `colors/core-concepts-theme-awareness.mdx`: Added examples
- `colors/primary-brand-colors.mdx`: Token reference fixes, table reorganization
- `colors/secondary-tertiary-quartus.mdx`: Content updates
- `colors/semantic-colors.mdx`: Major updates (178 insertions)
- `colors/shortcuts/background.mdx`: Code section updates
- `colors/shortcuts/border.mdx`: Major updates (187 insertions)
- `colors/shortcuts/interactive-state.mdx`: Major updates (830 insertions)
- `colors/shortcuts/shadow.mdx`: Updates (137 insertions)
- `colors/shortcuts/text.mdx`: Major updates (537 insertions)
- `effects/border-radius.mdx`: Updates
- `effects/elevation.mdx`: Updates
- `effects/gradients.mdx`: Added content
- `guides/api/reference.mdx`: Updates
- `motion/duration.mdx`: Added content
- `motion/easing.mdx`: Added content
- `motion/transitions.mdx`: Added content
- `spacing/pixel-values.mdx`: Updates
- `spacing/semantic-scales.mdx`: Updates (110 insertions)
- `typography/font-sizes.mdx`: Updates
- `typography/font-weights.mdx`: Updates
- `typography/text-spacing.mdx`: Updates (88 insertions)

**Statistics:**

- 24 files changed
- 2,317 insertions
- 322 deletions

**Purpose:**

- Ensures documentation accuracy and consistency
- Improves developer experience with correct examples
- Maintains alignment between documentation and implementation
- Addresses issues found in comprehensive 12-step review

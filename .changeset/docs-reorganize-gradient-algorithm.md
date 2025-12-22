---
'@designgreat/docs-design-system': patch
---

Reorganize gradient generation algorithm documentation and update input border examples

**Changes:**

- Moved "Gradient Generation Algorithm" section from Accent Colors page to Core Concepts &
  Theme-Awareness page
- Placed algorithm explanation immediately after "Fixed Gradient Levels" section for better logical
  flow
- Fixed broken link path in Accent Colors page (changed from `../` to `./` for same-directory
  reference)
- Updated input border examples in text.mdx and custom.css to use new `--dg-border-input-default`
  token
- Added cross-reference in Accent Colors page pointing to the algorithm section in Core Concepts
- Updated Related section in Accent Colors to mention gradient generation algorithm

**Rationale:** The gradient generation algorithm is a core concept that explains how the color
system works, making it more appropriate for the foundational Core Concepts & Theme-Awareness
documentation rather than the reference-style Accent Colors page. The input border examples were
updated to reflect the new token value in lib-design-token.

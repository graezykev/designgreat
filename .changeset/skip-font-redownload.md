---
'@designgreat/lib-web-ui-design-token': patch
---

## Font Download Optimization

- **What changed?**
  - 1. Prebuild script now skips downloading Roboto assets when the font file already exists.
- **Why does it matter?**
  - 1. Prevents unnecessary network calls and speeds up repeated token builds.
- **What's next?**
  - 1. Monitor build logs to ensure cached fonts remain valid across theme updates.

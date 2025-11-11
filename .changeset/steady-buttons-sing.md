---
'@designgreat/lib-web-ui': patch
---

**Align lib-web-ui exports with built artifacts and document component props for metadata tooling**

- point package `main`/`module`/`types`/`exports` to the actual files emitted in
  `dist/packages/lib-web-ui/src` so consumers resolve the correct build outputs
- introduce `ButtonOwnProps`, `DialogOwnProps`, and `TextInputOwnProps` (with doc comments) to
  cleanly separate component-specific props from native HTML attributes and unlock automated docs
  generation

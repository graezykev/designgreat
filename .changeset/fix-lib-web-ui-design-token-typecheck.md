---
'@designgreat/lib-web-ui-design-token': patch
---

Fix typecheck to generate tokens before type checking

Updated the `typecheck` script to run `build:tokens` before TypeScript type checking. This ensures
that generated theme files exist before type checking runs, preventing module resolution errors.

Also updated workspace TypeScript configuration and Turbo pipeline to ensure all dependency packages
are fully built before dependent packages run type checking, eliminating race conditions in the
build process.

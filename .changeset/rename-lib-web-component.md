---
'@designgreat/lib-web-component': patch
---

Renamed package from `@designgreat/lib-web-ui` to `@designgreat/lib-web-component`.

**Why:** Better naming that accurately reflects the package's purpose as a web component library.

**Migration:** Update your imports and dependencies:

```diff
- import { Button } from '@designgreat/lib-web-ui';
+ import { Button } from '@designgreat/lib-web-component';
```

```diff
- "@designgreat/lib-web-ui": "^0.6.2"
+ "@designgreat/lib-web-component": "^0.6.2"
```

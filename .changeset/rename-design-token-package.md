---
'@designgreat/lib-design-token': patch
---

Renamed package from `@designgreat/lib-web-ui-design-token` to `@designgreat/lib-design-token`.

**Why:** The package is no longer web-specific. It now supports:

- Web applications (CSS variables, SCSS)
- React Native (JavaScript token objects)
- Future: Native iOS/Android development

**Migration:** Update your imports:

```diff
- import { themes } from '@designgreat/lib-web-ui-design-token'
+ import { themes } from '@designgreat/lib-design-token'

- import '@designgreat/lib-web-ui-design-token/css'
+ import '@designgreat/lib-design-token/css'

- import '@designgreat/lib-web-ui-design-token/font'
+ import '@designgreat/lib-design-token/font'
```

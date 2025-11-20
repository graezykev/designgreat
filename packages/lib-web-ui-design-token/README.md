# @designgreat/lib-web-ui-design-token

Designgreat's source of truth for UI design tokens. This package owns the token authoring source,
the Style Dictionary build pipeline (light/dark themes, CSS/JS outputs), and the TypeScript runtime
that downstream packages consume.

> **For usage and consumption guides**, see
> [Design Tokens usage guide](https://graezykev.github.io/designgreat/docs/design-tokens/overview).

## Architecture

This package serves as the single source of truth for all design decisions in the DesignGreat
system:

- **Token Authoring** – Design decisions expressed as JavaScript objects with metadata
- **Build Pipeline** – Style Dictionary transforms tokens into consumable formats
- **Multi-Output** – Generates CSS, SCSS, JS/TS, and JSON artifacts
- **Type Safety** – Full TypeScript definitions for all design tokens
- **Theme Support** – Built-in light/dark theme variants

## Token Authoring Structure

Tokens live under `src/tokens/` and are organized by domain (not by theme):

```
src/tokens/
├── color/
│   ├── accent/          # Accent color palettes (grey, neutral, saturated)
│   ├── alpha/           # Semi-transparent colors
│   ├── base/            # Base color scales
│   ├── brand.js         # Brand colors
│   ├── primary.js       # Primary colors
│   ├── secondary.js     # Secondary colors
│   ├── tertiary.js      # Tertiary colors
│   ├── quartus.js       # Quaternary colors
│   ├── semantic.js      # Semantic colors (success, error, warning)
│   └── shortcut/        # Common color shortcuts (background, text, border)
├── typography/
│   ├── font-face.js     # Font definitions and configurations
│   ├── font-family.js   # Font family stacks
│   ├── font-size.js     # Font size scale
│   ├── font-weight.js   # Font weight values
│   ├── line-height.js   # Line height ratios
│   ├── letter-spacing.js
│   └── ...              # Other typography tokens
├── size/
│   ├── border-radius.js # Corner radius scale
│   ├── font.js          # Font-related sizes
│   ├── shadow.js        # Shadow size definitions
│   └── size.js          # General size scale
├── shadow/              # Box & text shadow definitions
├── transition/          # Motion tokens (durations, easings)
├── gradient.js          # Gradient definitions
├── cubic-bezier.js      # Easing functions
├── duration.js          # Animation durations
└── border.js            # Border styles

Note: Font assets and font-face definitions are generated once and shared across all themes.
```

### Token Format

Tokens are defined as JavaScript objects with Style Dictionary placeholders:

```javascript
// src/tokens/color/primary.js
export default {
  color: {
    primary: {
      DEFAULT: { value: '#3B82F6' },
      hover: { value: '{color.primary.DEFAULT}', attributes: { alpha: 0.8 } }
    }
  }
}
```

References between tokens use Style Dictionary placeholders (e.g. `{color.accent.blue.DEFAULT}`).
Authoring files can include build-time metadata such as gradient configs or alpha overrides.

## Build Outputs

Running `pnpm run build:tokens` generates the following artifacts:

### Font Outputs (Theme-Independent)

- `dist/font/font-face.css` – Font-face definitions with relative paths
- `dist/font/*.woff2` – All font files (Roboto + custom fonts, 108 files)

**Note:** The entire `dist/font/` directory is self-contained with relative paths
(`./filename.woff2`), making it portable and easy to integrate with any bundler or static site
generator.

### CSS Outputs (Theme-Specific)

- `dist/css/light/variables.css` – Light theme CSS variables
- `dist/css/light/variables.scss` – Light theme SCSS variables
- `dist/css/dark/variables.css` – Dark theme CSS variables
- `dist/css/dark/variables.scss` – Dark theme SCSS variables

### JavaScript/TypeScript Outputs (Theme-Specific)

- `dist/jsts/light/variables.js` – Light theme tokens (ESM)
- `dist/jsts/light/variables.d.ts` – Light theme TypeScript definitions
- `dist/jsts/dark/variables.js` – Dark theme tokens (ESM)
- `dist/jsts/dark/variables.d.ts` – Dark theme TypeScript definitions

### Generated Runtime

- `src/generated/themes.ts` – Flattened light/dark objects that power the TypeScript runtime
- `dist/index.js` – Compiled runtime with helpers (getThemeTokens, createTheme, etc.)
- `dist/index.d.ts` – TypeScript definitions for the runtime

### Token Sources

- `dist/tokens/` – Copy of token source files for inspection/distribution

## Scripts

| Script                  | Description                                                                                                                                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm run build`        | Clean previously generated artifacts, rebuild tokens (fonts download → Style Dictionary multi-platform build → TypeScript generation), compile the runtime, and copy the raw token sources into `dist/tokens`. |
| `pnpm run build:tokens` | Run only the token toolchain (best-effort Roboto font fetch, Style Dictionary build, `src/generated/themes.ts` emission).                                                                                      |
| `pnpm run watch`        | Convenience alias for `pnpm run build:tokens`. Useful while iterating on token files.                                                                                                                          |
| `pnpm run validate`     | Execute integrity checks for the generated themes (ensures required sections exist).                                                                                                                           |
| `pnpm run test`         | Run the Vitest suite for the runtime helpers and validation utilities.                                                                                                                                         |
| `pnpm run lint`         | Lint the TypeScript runtime and build scripts.                                                                                                                                                                 |
| `pnpm run typecheck`    | Type-check the runtime source without emitting files.                                                                                                                                                          |

## Development Workflow

### Adding or Modifying Tokens

1. Update or add files in `src/tokens/**`
2. Run `pnpm run build:tokens` to regenerate outputs
3. Verify changes in `dist/` and `src/generated/themes.ts`
4. Run quality gates: `pnpm run lint && pnpm run test && pnpm run typecheck && pnpm run validate`
5. Commit both source changes and generated artifacts

### Full Build

```bash
pnpm --filter @designgreat/lib-web-ui-design-token run build
```

This runs the complete pipeline:

1. Clean (`rm -rf dist src/generated`)
2. Build tokens (download fonts → Style Dictionary → generate themes.ts)
3. Compile TypeScript runtime
4. Copy token sources to dist

### Integration Testing

After token changes, rebuild downstream packages:

```bash
pnpm --filter @designgreat/design-token-support build
pnpm --filter @designgreat/lib-web-ui build
```

## Style Dictionary Configuration

### Pipeline Overview

The build pipeline consists of three sequential scripts:

1. **`prebuild-download-fonts.js`** – Downloads Roboto font files from Google Fonts CDN
2. **`build-style-dictionary.js`** – Runs Style Dictionary for each theme (light, dark)
3. **`post-build-export.js`** – Generates `src/generated/themes.ts` with combined token payloads

### Configuration Details

- **Config entry point:** `scripts/style-dictionary/config.js` extends Style Dictionary v5 with
  custom transforms:
  - Color gradients and alpha blending
  - Typography shorthands
  - Asset URL transforms
  - Line height calculations
  - CSS shorthand properties (shadow, border, transition, gradient)

- **Module loading:** `scripts/style-dictionary/load-style-dictionary.js` resolves the local Style
  Dictionary dependency before executing the custom config

- **Theme generation:** The build targets `light` and `dark` themes sequentially to keep output
  ordering deterministic and to surface naming collisions via Style Dictionary warnings

- **Font optimization:** Font-face definitions and font files are generated in a single `dist/font/`
  directory with relative paths, making them theme-independent and easy to consume

### Custom Transforms

Key custom transforms registered in `config.js`:

- `line-height` – Converts font sizes to relative line heights
- `colorShadesMapping:{theme}` – Applies theme-specific color transformations
- `text-shadow/css/shorthand` – Converts shadow objects to CSS shorthand
- `linear-gradient/shorthand`, `radial-gradient/shorthand`, `conic-gradient/shorthand` – Gradient
  shorthands
- `css/flatten-composition-properties` – Flattens nested composition tokens

### When to Regenerate

Run `pnpm run build` whenever:

- Files under `src/tokens/**` change
- Font configurations are updated
- Style Dictionary config is modified
- Custom transforms are added or changed

## Validation & Testing

### Test Suite

```bash
pnpm run test
```

Runs Vitest to verify:

- Runtime helpers (getThemeTokens, createTheme, listThemeNames)
- Token integrity validation utilities
- Theme cloning and merging logic

### Integrity Validation

```bash
pnpm run validate
```

Executes `src/run-validation.ts` which:

- Ensures all required token sections exist in each theme
- Validates token structure matches expected schema
- Checks for missing or malformed tokens

### Type Checking

```bash
pnpm run typecheck
```

Static analysis for the TypeScript runtime without emitting files.

### Related Package Testing

Test downstream integration:

```bash
pnpm --filter @designgreat/design-token-support test
pnpm --filter @designgreat/design-token-support build
```

Ensures CSS variable helpers continue to flatten themes correctly.

## Troubleshooting

### Roboto Download Warnings

**Symptom:** Warnings during build about failed font downloads

**Solution:** Safe to ignore when running offline. Rerun the build once network access is available
to populate `dist/assets/fonts`. The build will succeed but fonts won't be embedded.

### Stale Generated Types

**Symptom:** TypeScript errors about missing token properties

**Solution:** Run `pnpm run build:tokens` to regenerate `src/generated/themes.ts` after editing
files in `src/tokens/`.

### Missing CSS Variables in Downstream Apps

**Symptom:** CSS variables are undefined at runtime

**Solution:** Ensure `pnpm run build` has completed successfully so `dist/index.js` and the
theme-specific CSS bundles exist before publishing or linking the package. Check that downstream
apps import the correct CSS files.

### Style Dictionary Build Errors

**Symptom:** Build fails with Style Dictionary errors

**Solution:**

- Check token files for syntax errors
- Verify all token references use valid paths
- Ensure custom transforms don't conflict
- Run `pnpm run clean && pnpm run build` to start fresh

### Font Assets Not Copied

**Symptom:** Fonts are missing in `dist/font/`

**Solution:** The `post-build-export.js` script copies fonts from `assets/fonts/` to `dist/font/`.
Ensure the source `assets/fonts/` directory exists and contains the downloaded font files. If empty,
the `prebuild-download-fonts.js` script should populate it during build.

## Package Exports

For consuming applications, the package provides clean exports:

```json
{
  "exports": {
    ".": "./dist/index.js",
    "./font": "./dist/font/font-face.css",
    "./font/*": "./dist/font/*",
    "./css/light": "./dist/css/light/variables.css",
    "./css/dark": "./dist/css/dark/variables.css"
  }
}
```

**Font consumption:**

```typescript
// In your app or component library
import '@designgreat/lib-web-ui-design-token/font'
```

Bundlers (Vite, Webpack, etc.) will automatically resolve the relative font paths from the CSS.

See [Design Tokens usage guide](https://graezykev.github.io/designgreat/docs/design-tokens/overview)
for usage examples and integration guides.

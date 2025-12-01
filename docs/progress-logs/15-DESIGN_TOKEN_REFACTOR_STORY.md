# The Design Token Architecture Refactor: A Full Work Day of Frustration and Learning

_A story about refactoring a monorepo's design token system, and all the things that went wrong
along the way._

---

## Prologue: The Simple Request

It was supposed to be a simple refactoring task. The kind of thing you knock out before lunch and
feel good about. Maybe grab a coffee afterward, feeling productive.

The developer had a monorepo with a design system. Two main packages: `lib-design-token` (the design
tokens - colors, spacing, typography, all the visual DNA of the system) and `lib-web-ui` (the UI
components - buttons, inputs, dialogs, the actual stuff users see and interact with). There was also
a third package lurking in the shadows called `design-token-support` that provided helper utilities,
but we'll get to that nightmare later. Oh, we'll definitely get to that.

The ask was straightforward:

> "I want to decouple lib-design-token and lib-web-ui. The design token package should be
> standalone - users should be able to use it by itself. When someone uses lib-web-ui, they're also
> using the tokens, but they could also decide to use just the tokens without the components."

Made sense. Clean architecture. Single responsibility. The kind of refactoring that makes codebases
better. Good stuff.

The specific changes needed:

- Replace `--token-xxx` CSS variables with `--dg-xxx` (shorter, branded, cleaner)
- Replace `$token-xxx` SCSS variables with `$dg-xxx` (consistency with CSS)
- Change the dark theme selector from `:root` to `.dg-theme-dark` (class-based theming is more
  flexible)
- Update the JavaScript/TypeScript exports to use a `dg` namespace (consistency across all formats)
- Make `lib-web-ui` consume CSS directly from the design token package instead of generating its own
  (the whole point - decoupling)

Should take maybe an hour or two, right? Update some configs, change some strings, update some
imports. Standard refactoring stuff.

It took almost a full work day. Eight hours. A whole shift. From morning optimism to evening
exhaustion.

This is that story.

---

## Act I: The Planning Phase (Where Things Looked Promising)

### The Grand Plan

I started by presenting a comprehensive refactoring plan. Multiple decision points, options for
each, pros and cons laid out neatly in markdown tables. Very professional. Very thorough. Very...
overconfident in hindsight.

The plan covered:

- CSS variable prefix options (A: `--designgreat-`, B: `--dg-`, C: keep `--token-`)
- Dark theme selector options (A: `:root.dark`, B: `[data-theme="dark"]`, C: `.dg-theme-dark`)
- JSTS namespace options (A: nested object, B: flat with prefix, C: keep current)
- Migration strategy options (A: gradual with backward compatibility, B: clean break)
- Documentation strategy options (A: minimal updates, B: comprehensive rewrite)

The developer made their choices quickly and decisively:

- **CSS Variable Prefix**: Option B - `--dg-xxx` (short for "designgreat")
- **Dark Theme Selector**: Option C - `.dg-theme-dark` (class-based, more flexible for SSR and
  multi-theme scenarios)
- **JSTS Namespace**: Option A - Namespace object structure (`light.dg.color.background.default`)
- **Migration Guides**: Not needed - "no outside users are using it right now"
- **Backward Compatibility**: Breaking change is fine
- **Testing Strategy**: Comprehensive - build, visual, browser, accessibility

I even asked clarifying questions! I was being so thorough! I wanted to make sure I understood the
requirements completely before diving in. The developer explained their vision clearly:

> "The reason I want to refactor is that I want to decouple lib-design-token and lib-web-ui.
> lib-design-token comes as a dependency for lib-web-ui, but lib-design-token can also be used
> independently."

Perfect. Crystal clear. The design token package should be the foundation that can stand alone. The
component library builds on top of it but doesn't own it. Users can choose: tokens only, or tokens
plus components. Flexibility. Good architecture.

I understood the goal. I had a plan. I was ready.

What I didn't have was a complete picture of what I was about to walk into. What I didn't do was map
out every single file that would need to change. What I didn't ask was the one question that would
have saved hours of work later.

### The Hidden Monster: design-token-support

In my initial analysis, I noticed there was a third package called
`@designgreat/design-token-support`. It lived in `packages/shared/design-token-support`. It provided
helper functions like `getThemeClassName()`, `createThemeConfig()`, and `createCssVariableMap()`.
Both `lib-web-ui` and `docs-design-system` depended on it.

My plan mentioned it briefly, almost as an afterthought: "Update all related docs, dependants,
eslint/ts configurations, etc."

That's it. One line. One vague line about a package that had its tentacles wrapped around half the
codebase.

What I should have done: Map out every single file that references this package. Count them. Make a
list. Print it out. Tape it to my monitor. Understand the true scope of what I was about to
undertake.

What I actually did: Assume it wouldn't be that bad. How many files could possibly reference one
utility package?

Spoiler: It was a lot. And it was that bad.

---

## Act II: The Implementation Begins (And Immediately Hits Problems)

### First Blood: The CSS Prefix

With the plan approved, I dove into the code. First stop: the Style Dictionary configuration in
`lib-design-token`. This is where the magic happens - where JSON token definitions get transformed
into CSS, SCSS, JavaScript, and TypeScript outputs.

I updated the configuration. Changed the prefix from `token` to `dg`. Created a custom format for
themed CSS output that would use `:root` for light theme and `.dg-theme-dark` for dark theme.
Updated the post-build script to wrap the JavaScript/TypeScript tokens in the `dg` namespace. Added
a new `combined.css` export that would include both themes in one file. Updated `package.json`
exports to expose all the new entry points.

Feeling good. Making progress. The code changes looked clean. Time to build.

```
Building lib-design-token...
```

Build succeeded! Great! Let me just check the output to make sure everything looks right...

```css
:root {
  dg-border-input-default: 0.0625rem solid #1d1d1f7d;
  dg-color-background-default: #ffffff;
  dg-color-text-primary: #1d1d1f;
}
```

Wait.

Wait wait wait.

Where's the `--` prefix? CSS custom properties need `--` at the start. That's... that's the whole
syntax. `--variable-name`. Not `variable-name`. This isn't valid CSS. Browsers won't recognize these
as custom properties. They'll be ignored completely.

**Error #1: CSS Variables Missing the `--` Prefix**

I had created a custom format for Style Dictionary but forgot to include the double-dash prefix. The
format was outputting `dg-xxx` instead of `--dg-xxx`.

The fix was simple - add `--` before the variable name in the format template. But the error itself
was concerning. This was CSS Custom Properties 101. The most basic thing. If I missed something this
fundamental, what else had I missed?

The first crack in my confidence appeared. I pushed forward anyway.

### The Deleted File That Wasn't Deleted

After fixing the CSS prefix, I moved on to `lib-web-ui`. The plan was simple: remove the old theme
generation mechanism, import tokens directly from the design token package.

The component library had been generating its own theme CSS file using a script called
`generate-theme-css.ts`. This script would read from `design-token-support`, process the tokens, and
output a `designgreat-theme.css` file. But now that the design token package was producing its own
CSS, we didn't need this anymore.

I deleted `designgreat-theme.css` (the old generated file). I deleted `generate-theme-css.ts` (the
script that generated it). I removed the `generate:theme` script from `package.json`. I updated the
main CSS entry point to import from the design token package instead.

Clean. Surgical. Let's build.

```
[vite] Internal server error: Unable to resolve `@import "./designgreat-theme.css"`
from /packages/lib-web-ui/src/styles/tailwind.css
```

**Error #2: Import of Deleted File**

I had deleted the CSS file but forgot to remove the `@import` statement in `tailwind.css` that was
trying to load it. The file was gone but the reference to it wasn't. Classic mistake. Delete the
thing, forget to delete the thing that points to the thing.

I opened `tailwind.css`, found the offending import, deleted it. Build again.

Two errors in. Still morning. Still optimistic. These were small mistakes, easily fixed. The real
work was still ahead.

### The design-token-support Hydra

Now came the real challenge. I needed to remove the dependency on
`@designgreat/design-token-support` from `lib-web-ui`. This package had been providing theme
utilities - functions to get theme class names, create theme configurations, work with CSS variables
programmatically.

I started by searching for imports. How hard could it be?

Found one in `.storybook/preview.tsx`. This is where Storybook sets up the preview environment,
applies themes, configures decorators. It was importing `getThemeClassName` from
design-token-support. Fixed it by hardcoding the class name.

Found another in `src/storybook/CodeDemoToggle.tsx`. This component lets users toggle between light
and dark themes in the Storybook demos. Also importing from design-token-support. Fixed it.

Found one in `tailwind.config.ts`. The Tailwind configuration was using design-token-support to
access token values and configure the dark mode selector. Fixed it.

Okay, that's three. Let me search again to make sure I got them all.

Found more in `vite.config.ts`. The Vite build configuration had design-token-support listed as an
external dependency. Removed it.

Found it in `jest.config.ts`. The Jest configuration had a module name mapper for
design-token-support. Removed it.

Found it in the test file for `CodeDemoToggle.tsx`. There was a `jest.mock` call mocking the
design-token-support module. Removed it.

Okay, surely that's all of them in lib-web-ui. Let me check docs-design-system.

Found references in `src/theme/constants.ts`. This file was re-exporting utilities from
design-token-support for use throughout the documentation site. Fixed it.

Found references in `src/theme/Root.tsx`. The root React component was using design-token-support to
manage theme state. Fixed it.

Found references in `src/theme/preinit.ts`. This is a client module that runs before React hydration
to prevent theme flash. It was using design-token-support to determine the initial theme class.
Fixed it.

Okay. Surely that's everything. Let me check the TypeScript configuration.

Found it in `tsconfig.base.json` as a path alias. The monorepo's base TypeScript config had a path
mapping for `@designgreat/design-token-support`. Removed it.

Let me check if there are any other configuration files...

Found it in GitHub workflow files. Multiple workflow files were building design-token-support as a
dependency before building other packages. I'll deal with those later.

Let me check the documentation...

Found it in documentation. Lots of documentation. Tutorial pages. API reference pages.
Troubleshooting guides. Contributing guides.

Every time I thought I was done, I found more references. Cut off one head, two more appear. It was
like fighting a hydra. The package had spread its tendrils throughout the entire codebase, and I was
trying to remove them one by one without a complete map of where they all were.

My approach at this point was to replace each import with hardcoded values:

```typescript
// Before
import { getThemeClassName } from '@designgreat/design-token-support'
const darkClass = getThemeClassName('dark')

// After
const DARK_THEME_CLASS = 'dg-theme-dark'
```

This seemed fine at the time. Quick. Simple. Get the build working, worry about elegance later.

It would come back to haunt me. Oh, it would definitely come back to haunt me.

---

## Act III: The Storybook Nightmare

### The Build That Wouldn't End

After updating all the imports I could find (or so I thought), I tried to build `lib-web-ui`. This
package includes a Storybook build as part of its build process - it generates a static Storybook
site that gets deployed for documentation and visual testing.

```
Building lib-web-ui...
```

The terminal showed some output. Vite was bundling. TypeScript was compiling. Then the Storybook
build started...

And then nothing. No error. No success message. No progress indicator. Just... silence. The cursor
blinked. The terminal waited.

I waited too. One minute. Two minutes. Five minutes. The CPU wasn't spinning. Memory wasn't
climbing. It wasn't processing anything. It was just... sitting there.

The developer was watching too. They finally asked:

> "I just don't know why it 'crashed' and I don't want to manually exit the command."

I investigated. Looked at the process. Looked at the terminal output more carefully. The build was
stuck on Storybook. But why?

Then I found it. Storybook was waiting for user input about telemetry - whether to send anonymous
usage data to help improve Storybook. In an interactive terminal, you'd see a prompt asking yes or
no. In a non-interactive build environment, or when stdout isn't a TTY, it just... waits. Forever.
Waiting for input that will never come.

**Error #3: Storybook Telemetry Hanging the Build**

My first fix was quick and dirty. Just make it work:

```bash
STORYBOOK_DISABLE_TELEMETRY=1 pnpm run storybook:build
```

Environment variable. Disables the telemetry prompt. Build continues. Problem solved, right?

The developer was not impressed:

> "What exactly is STORYBOOK_DISABLE_TELEMETRY=1 for? This is so ugly."

Fair point. Environment variables scattered throughout build scripts is not elegant. It's not
discoverable. It's not documented. Someone coming to this codebase later would have no idea why that
variable is there or what happens if they remove it.

I found the proper solution: adding `disableTelemetry: true` to the Storybook configuration in
`main.ts`. This is the official, documented way to disable telemetry. It's in the config file where
someone would expect to find Storybook settings. It's permanent. It's clean.

But here's where I made things worse. Much worse.

### The Configuration Catastrophe

I went to update `.storybook/main.ts`. The file that configures everything about how Storybook
runs - what stories to include, what addons to use, how to build, framework settings, everything.

Instead of carefully reading the existing configuration and adding one small property, I... well, I
basically overwrote the whole thing.

The original file had:

- Vite configuration with specific settings for the project
- Path aliases so imports would resolve correctly
- ES2020 build targets for modern JavaScript output
- Public directory settings for static assets
- Addon configurations for accessibility, interactions, links
- Story glob patterns to find all the story files
- Framework settings for React
- TypeScript configuration

My "updated" file had:

- The telemetry setting
- ...that's it

**Error #4: Storybook Configuration Wiped**

I had written a new file instead of editing the existing one. I didn't read before I wrote. I
just... replaced it.

The developer ran the build. Storybook started but nothing worked right. Path aliases broken -
imports failing. Addons missing - no accessibility panel, no interactions panel. Stories not found -
wrong glob patterns. The whole thing was a mess.

I had to sheepishly restore the original configuration from git and carefully add just the one line
I needed:

```typescript
core: {
  disableTelemetry: true
}
```

One line. That's all it needed. One property in one object. But my carelessness had cost us time and
trust. The developer now had to wonder: what else might I accidentally break?

### The Invisible Components

After fixing the configuration (for real this time), the build completed. Success! Finally! Let's
see the Storybook!

The developer opened it in the browser. Components were rendering. Stories were loading. But
something was wrong.

> "I saw the storybook but the font family and background color are not defined."

The components were there, but they looked wrong. No custom fonts - just default system fonts. No
themed colors - just browser defaults. The buttons were there but they weren't styled. The inputs
existed but they looked like basic HTML inputs. Just... default browser styles everywhere.

**Error #5: Missing Design Token CSS Import**

When I removed the `design-token-support` import from `preview.tsx`, I had also removed the CSS that
was being loaded through it. The design-token-support package had been importing the design token
CSS as a side effect. When I removed that import, the CSS stopped being loaded. The CSS variables
weren't being defined. The components that relied on those variables had nothing to fall back on.

I needed to add explicit imports for the design token CSS:

```typescript
import '@designgreat/lib-design-token/css'
import '@designgreat/lib-design-token/font'
```

The first import loads the CSS custom properties - all the `--dg-color-*`, `--dg-spacing-*`
variables. The second import loads the font face declarations so the custom fonts are available.

But wait, there was more. There's always more.

### The Empty String Explosion

After adding the CSS imports, the developer opened Storybook again. This time, the styles were
loading! The fonts were right! The colors were themed!

But there was a JavaScript error in the console:

```
Uncaught SyntaxError: Failed to execute 'add' on 'DOMTokenList': The token provided must not be empty.
```

**Error #6: Adding Empty String to classList**

Remember how I said the light theme uses `:root` and doesn't need a class? The light theme is the
default. When you load the page, you get light theme automatically because the `:root` selector
applies to the document root. You only need to add a class when switching to dark theme.

So in my theme constants, I had:

```typescript
const LIGHT_THEME_CLASS = '' // Empty string - no class needed
const DARK_THEME_CLASS = 'dg-theme-dark'
```

And then in the theme switching logic:

```typescript
function applyTheme(theme) {
  const themeClassName = theme === 'dark' ? DARK_THEME_CLASS : LIGHT_THEME_CLASS
  element.classList.add(themeClassName) // Boom! Can't add empty string
}
```

The `classList.add()` method throws an error if you try to add an empty string. It's not a no-op.
It's not silently ignored. It throws. And it throws with that confusing error message about
"DOMTokenList" that doesn't immediately tell you "hey, you tried to add an empty string."

I had to add checks everywhere this pattern appeared:

```typescript
if (themeClassName) {
  element.classList.add(themeClassName)
}
```

And this wasn't just in one file. It was in:

- `preview.tsx` (Storybook preview configuration)
- `preinit.ts` (Docusaurus theme pre-initialization)
- `Root.tsx` (Docusaurus root component)

Each file needed the same fix. Each file I had touched and changed without fully understanding what
I was doing. Each file where I had introduced the same bug in a slightly different way.

Three files. Same bug. Three times I had to fix it. Three times I had to feel embarrassed about not
thinking through the edge case.

---

## Act IV: The Documentation Disaster

### "Have You Really Reviewed Every Doc?"

At this point, the builds were working. Storybook was showing themed components with the right fonts
and colors. The design token package was producing the right outputs. The component library was
consuming them correctly. Victory was in sight.

I declared the implementation complete:

> "Implementation complete! Here's a summary of changes..."

I listed all the files I had modified. All the configurations I had updated. All the imports I had
changed. It was a long list. I felt accomplished.

The developer, wisely skeptical by now (they had watched me make mistake after mistake), asked me to
review the documentation. Make sure everything was updated to reflect the new architecture. Make
sure the code examples were correct. Make sure the explanations matched reality.

I updated a few files. Changed some code examples that showed the old import patterns. Updated some
explanations that mentioned design-token-support. Felt pretty good about it.

Then the developer checked my work:

> "I still found design-token-support in docs/tutorial/theme-switching, have you really reviewed and
> refined every doc/script/config in this mono repo?"

Ouch.

**Error #7: Incomplete Documentation Review**

I had updated some docs but not others. I had searched for some patterns but not all patterns. I had
checked some directories but not all directories. I had assumed I was thorough when I wasn't even
close.

I did a proper grep this time. A real, comprehensive search:

```bash
grep -r "design-token-support" packages/docs-design-system --include="*.mdx"
```

The results were humbling. File after file after file:

- `css-integration.mdx` - tutorial on integrating the CSS
- `theme-switching.mdx` - tutorial on implementing theme switching
- `tailwind-integration.mdx` - tutorial on using with Tailwind
- `installation.mdx` - getting started guide
- `api/typescript.mdx` - TypeScript API reference
- `api/runtime-apis.mdx` - runtime API reference
- `theming.mdx` - theming guide for components
- `troubleshooting.mdx` - troubleshooting guide
- `development-workflow.mdx` - contributor guide
- `testing-validation.mdx` - testing guide
- `troubleshooting.mdx` (in a different directory) - another troubleshooting guide
- And several more...

Each file had code examples showing the old import patterns. Each file had explanations that were
now wrong. Each file had references to a package that was being deprecated. Each file needed careful
review and updates.

This wasn't a quick find-and-replace job. The code examples needed to be rewritten to show the new
patterns. The explanations needed to accurately describe the new architecture. Links to the
deprecated package needed to be removed or redirected. Some sections needed to be completely
rewritten because the underlying concepts had changed.

I spent a long time going through each file. Reading each section. Updating each example. Checking
each link. It was tedious. It was necessary. It was something I should have planned for from the
beginning.

### The Font Documentation Maze

The developer had specific requirements for the font documentation. The current docs explained why
fonts weren't bundled with the component library, showed the import chain, described the
architecture. Good information, but in the wrong place.

> "Refine 'Font Setup': The 'Why Fonts Are Not Bundled' and 'Import Chain Overview' sections should
> be merged into the contributing docs. The user-facing 'Font Setup' should only simply mention
> fonts are not included in the component lib, maybe give a link."

Seemed straightforward. Move some content from user docs to contributor docs. Simplify the
user-facing guide. Add links between them.

First attempt: I moved some content but kept too much architecture in the user docs. The user docs
were still explaining internal implementation details that users didn't need to know.

> "Review it again."

Second attempt: I simplified further. Removed the architecture explanations. But I forgot to add
links to the contributing docs where that information now lived. Users who wanted to understand the
architecture had no way to find it.

> "Where are the links to the architecture details?"

Third attempt: Better. Links were there. But I had left some technical details that really belonged
in contributing docs, not user docs. The line between "what users need to know" and "what
contributors need to know" wasn't clear in my head.

> "This should be in contributing, not here."

Fourth attempt: Finally acceptable. User docs were simple and practical. Contributing docs had the
architecture details. Links connected them. Clear separation of concerns.

Four iterations on documentation. For one section. About fonts. Each iteration required reading
feedback, understanding what was wrong, making changes, and waiting for another review. Time
consuming. Frustrating. But necessary to get it right.

### The README That Grew and Shrank

At some point during the documentation updates, I added a "Quick Start" section to the design token
package README. Installation command, basic imports, simple example. The kind of thing you see in
every npm package README.

The developer's response:

> "I don't think we need a 'Quick Start' in README, as we have integration guides and development
> guides. If it has been covered in the Integration guides or development guides, just get rid of it
> from README."

They were right. The README should be minimal - point to the real docs, don't duplicate them.
Duplication means two places to update when things change. Duplication means potential
inconsistencies. The README should say "here's what this package is, here's where to find the docs"
and that's it.

I removed the Quick Start section.

But this raised a question I should have asked at the beginning: What should go in the README versus
the documentation site? What's the right level of detail for each? I had assumed more is better. The
developer wanted less is more. Different philosophies, and I should have clarified before writing.

---

## Act V: The Test Script Saga

### Building a Safety Net (That Had Holes)

To prevent future issues and verify the refactoring was complete, I created a comprehensive test
script. A bash script that would automatically check everything - file existence, content patterns,
configuration correctness, code quality.

The script would check:

1. **File existence**: Do all the expected output files exist? CSS files, SCSS files, JavaScript
   files, TypeScript declaration files.

2. **CSS variable naming**: Are the variables using the new `--dg-` prefix? Are the selectors
   correct (`:root` for light, `.dg-theme-dark` for dark)?

3. **TypeScript export structure**: Are the tokens wrapped in the `dg` namespace? Are both light and
   dark themes exported?

4. **Package configuration**: Are the exports in `package.json` correct? Are the dependencies right?

5. **Code quality**: Are there any remaining references to the old patterns? Any hardcoded values
   that should be using utilities?

6. **Documentation**: Are there any remaining references to design-token-support in the docs?

I was proud of this script. It was thorough. It had colored output - green checkmarks for passed
tests, red X's for failures. It counted passed and failed tests. It printed a summary at the end.
Very professional. Very comprehensive.

The developer ran it:

```
🧪 Design Token Refactoring - Comprehensive Test Suite
======================================================

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Phase 1: File Existence
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Light theme CSS exists
```

And then... nothing. One test. Script exited. No more output. No error message. Just done.

> "Why do I only see 1 test result?"

**Error #8: `set -e` Kills Arithmetic**

The script had `set -e` at the top, which means "exit immediately if any command returns a non-zero
exit status." Good practice, right? Exit early if something fails. Don't continue running tests if
the environment is broken. Fail fast.

But here's a bash quirk that I didn't know about: arithmetic expressions like `((TESTS_PASSED++))`
return exit code 1 when the result is 0.

When the first test passed, the counter went from 0 to 1. The arithmetic expression
`((TESTS_PASSED++))` evaluated to 0 (the value before incrementing). In bash, an arithmetic
expression that evaluates to 0 returns exit code 1. And `set -e` saw that exit code 1 and killed the
script.

The script was working correctly for exactly one test, then dying because of a quirk in how bash
handles arithmetic.

I had to add `|| true` to every counter increment:

```bash
((TESTS_PASSED++)) || true
```

The `|| true` means "or if that fails, run `true` which always succeeds." It prevents the arithmetic
expression's exit code from killing the script.

Not elegant. Kind of ugly actually. But necessary. Bash scripting has a lot of these gotchas.

### The Wrong File Extension

After fixing the arithmetic issue, more tests ran. Progress! But more tests also failed.

```
✗ TypeScript themes file missing
```

**Error #9: Checking for `.ts` Instead of `.js`**

The script was checking for `dist/generated/themes.ts`. Looking for a TypeScript file in the
distribution directory.

But TypeScript source files don't end up in `dist`. TypeScript gets compiled to JavaScript. The
`dist` directory contains compiled JavaScript files. The actual file was `dist/generated/themes.js`.

A basic misunderstanding of how TypeScript compilation works. Source files are `.ts`. Compiled
output files are `.js` (and `.d.ts` for type declarations). I was checking for the wrong extension.

Embarrassing. Fixed it.

### The Missing Build Step

The developer ran the script from a fresh state - a clean checkout, no built artifacts - and got
failures everywhere. Files didn't exist. Outputs weren't generated. Every file existence check
failed.

> "No need to run build first?"

**Error #10: Script Assumed Pre-Built Packages**

The test script assumed packages were already built. It checked for files in `dist` directories
without first ensuring those directories existed. If someone ran the script on a fresh clone, or
after running `pnpm clean`, everything would fail.

The developer would have to remember to build before testing. That's error-prone. That's a bad
developer experience. That's the kind of thing that leads to "works on my machine" problems.

I added a "Phase 0" that builds all packages before running tests:

```bash
section "Phase 0: Building Packages"

echo "Building lib-design-token..."
cd packages/lib-design-token
pnpm run build
cd ../..

echo "Building lib-web-ui..."
cd packages/lib-web-ui
pnpm run build
cd ../..

echo "Building docs-design-system..."
cd packages/docs-design-system
pnpm run build
cd ../..
```

Now the script was self-contained. Run it from anywhere, in any state, and it would build fresh and
test. Idempotent. Reliable. The way it should have been from the start.

### The Missing Quality Checks

After all the fixes, the script was running. Tests were passing. Things looked good. Then the
developer asked:

> "Have we ensured all lint, test, validate and typecheck scripts in the packages still work?"

I hadn't included those in the test script. The script checked for file existence and content
patterns, but it didn't actually run the packages' own quality checks. It didn't run the linter to
check for code style issues. It didn't run the type checker to verify TypeScript was happy. It
didn't run the unit tests to verify functionality. It didn't run the validation scripts to check
token integrity.

I added a "Phase 7" for quality checks:

```bash
section "Phase 7: Quality Checks"

echo "Running lib-design-token quality checks..."
cd packages/lib-design-token
pnpm run lint
pnpm run typecheck
pnpm run validate
pnpm run test
cd ../..

echo "Running lib-web-ui quality checks..."
cd packages/lib-web-ui
pnpm run lint
pnpm run typecheck
pnpm run test
cd ../..

echo "Running docs-design-system quality checks..."
cd packages/docs-design-system
pnpm run lint
pnpm run typecheck
pnpm run build
cd ../..
```

And of course, when I ran it, the lint failed. Because my earlier changes had introduced import
order issues and unused imports that I hadn't noticed. The linter was stricter than I expected. It
wanted imports in a specific order - external packages first, then internal packages, then relative
imports. I had them mixed up.

More fixes. More back and forth. More iterations.

---

## Act VI: The Deprecation That Should Have Been a Deletion

### The Question That Changed Everything

Hours into this refactor. After updating dozens of files to remove or replace `design-token-support`
references. After fixing build errors. After updating documentation. After debugging test scripts.
After all of that.

The developer asked a simple question:

> "Since @designgreat/design-token-support is deprecated, why don't we delete it?"

I stopped.

Delete it?

I had been so focused on "deprecating" the package. Updating references. Adding deprecation notes to
the README. Keeping it around "just in case." Making sure it still built even though nothing should
be using it. Being careful. Being cautious. Being... wrong.

> "There's no need for the deprecation notes because no outside users are using it right now."

Of course. No external users. No npm downloads from people outside the organization. No backward
compatibility concerns. No reason to keep a deprecated package around. No reason to maintain it. No
reason to build it. No reason for it to exist.

**Error #11: Wrong Deprecation Strategy**

I had spent hours - literally hours - carefully updating imports, removing dependencies one by one,
updating documentation to say "deprecated" instead of just removing references, keeping the package
around in a half-alive state.

All of that could have been avoided with one question at the beginning: "Do you want to deprecate
this package or delete it entirely?"

I deleted the entire `packages/shared/design-token-support` directory. One command:

```bash
rm -rf packages/shared/design-token-support
```

Done. Gone. No more hydra. No more tentacles. No more references to update. The package simply
didn't exist anymore.

All those hours spent carefully updating imports, removing dependencies one by one, updating
documentation to say "deprecated" instead of just removing references... wasted. If I had asked at
the beginning, we could have saved so much time.

### The Zombie Test File

After deleting the package, I ran the monorepo-wide typecheck to make sure everything still
compiled. It failed.

```
error TS2339: Property 'color' does not exist on type '{ readonly dg: { ... }'
```

Wait, how? I deleted the package. The package is gone. How can it still have type errors? How can a
deleted package cause compilation failures?

**Error #12: Shared TSConfig Picking Up Deleted Package's Tests**

It turned out the `design-token-support` package had a test file. That test file was being included
in the monorepo-wide typecheck through a shared tsconfig that used a glob pattern like
`packages/**/*.ts`. The test file was accessing tokens via the old structure (`config.tokens.color`)
instead of the new namespace structure (`config.tokens.dg.color`).

Even though I had decided to delete the package, I had to fix the test file first so the typecheck
would pass so I could then delete the package properly.

The irony: I had to update code in a package I was about to delete, to fix a type error in code that
would never run, so that the type checker would be happy, so that I could delete the code that I had
just fixed.

I updated the test file. Typecheck passed. Then I deleted the package for real. The whole directory.
Gone.

---

## Act VII: The Hardcoding Problem

### The Shortcut That Wasn't

Throughout this entire refactor, whenever I removed a `design-token-support` import, I replaced it
with hardcoded values. It was the quick solution. The easy solution. The "get it working now, clean
it up later" solution.

```typescript
// This pattern appeared everywhere
const DARK_THEME_CLASS = 'dg-theme-dark'
const LIGHT_THEME_CLASS = ''
```

It was in:

- `.storybook/preview.tsx` - Storybook preview configuration
- `src/storybook/CodeDemoToggle.tsx` - theme toggle component
- `tailwind.config.ts` - Tailwind CSS configuration
- `src/theme/constants.ts` - Docusaurus theme constants
- Multiple documentation examples showing how to implement theme switching

At the time, it seemed like the simplest solution. Remove the import, hardcode the value, move on to
the next file. Don't overthink it. Get the build working.

But the developer spotted the problem:

> "As we deprecate @designgreat/design-token-support, the usage of getThemeClassName() to generate
> theme classes has been changed to hardcoding of dg-theme-dark, etc., but the hardcoding or literal
> usage is still not elegant. I think we still need a helper function like the previous
> getThemeClassName() from lib-design-token instead of hardcoding. What do you think?"

**Error #13: Hardcoding Instead of Abstraction**

They were absolutely right. If the naming convention ever changed - say, from `dg-theme-dark` to
`designgreat-dark` or `dg-dark` or anything else - we'd have to update dozens of files. Every file
that had the hardcoded string. Every documentation example. Every test. Every configuration.

The whole point of having a helper function is to have a single source of truth. Change it in one
place, it changes everywhere. That's basic software engineering. DRY - Don't Repeat Yourself. I knew
this. I teach this. And yet I had created a mess of hardcoded strings scattered across the codebase.

I should have created the helper utilities from the start, not as an afterthought.

### Building What Should Have Existed From The Start

I created `theme-utils.ts` in the design token package:

```typescript
export const THEME_CLASS_PREFIX = 'dg-theme'
export const LIGHT_THEME_SELECTOR = ':root'

export const THEME_CLASSES = {
  light: '', // Light uses :root, no class needed
  dark: 'dg-theme-dark'
} as const

export const THEME_SELECTORS = {
  light: LIGHT_THEME_SELECTOR,
  dark: `.${THEME_CLASSES.dark}`
} as const

export type ThemeName = keyof typeof THEME_CLASSES

export function getThemeClassName(theme: ThemeName): string {
  return THEME_CLASSES[theme]
}

export function getThemeSelector(theme: ThemeName): string {
  return THEME_SELECTORS[theme]
}

export function getOppositeTheme(theme: ThemeName): ThemeName {
  return theme === 'dark' ? 'light' : 'dark'
}

export function applyTheme(element: HTMLElement, theme: ThemeName): void {
  const classNames = Object.values(THEME_CLASSES).filter(Boolean)
  element.classList.remove(...classNames)
  const themeClass = getThemeClassName(theme)
  if (themeClass) {
    element.classList.add(themeClass)
  }
}

export function isThemeApplied(element: HTMLElement, theme: ThemeName): boolean {
  const themeClass = getThemeClassName(theme)
  if (themeClass) {
    return element.classList.contains(themeClass)
  }
  // Light theme: no dark class present
  return !Object.values(THEME_CLASSES).some((cls) => cls && element.classList.contains(cls))
}
```

Constants for the class names. Type definitions for type safety. Helper functions for common
operations. Everything in one place. Single source of truth.

Then I had to go back and update all the files I had just updated with hardcoded values. Every
`const DARK_THEME_CLASS = 'dg-theme-dark'` became an import from the design token package. Every
manual classList manipulation became a call to `applyTheme()`. Every theme check became a call to
`isThemeApplied()`.

More time. More changes. More review cycles. More opportunities for mistakes.

### Documentation Updates (Again)

After adding the theme utilities, all the documentation examples needed updating again. For the
third or fourth time. I was losing count.

Every place that showed:

```typescript
const DARK_THEME_CLASS = 'dg-theme-dark'
document.body.className = DARK_THEME_CLASS
```

Now needed to show:

```typescript
import { applyTheme } from '@designgreat/lib-design-token'
applyTheme(document.body, 'dark')
```

The developer asked me to update:

- `theme-switching.mdx` - the main theme switching tutorial
- `css-integration.mdx` - CSS integration guide
- `tailwind-integration.mdx` - Tailwind integration guide
- `theming.mdx` - component theming guide
- `troubleshooting.mdx` - troubleshooting guide
- `runtime-apis.mdx` - runtime API reference
- `typescript.mdx` - TypeScript API reference
- `installation.mdx` - installation guide

I updated them all. Again. Each file. Each example. Each explanation.

The test script needed updating too, to verify the new utilities were exported and documented
correctly. More checks. More assertions. More ways to catch if something broke.

---

## Act VIII: The Final Stretch

### The Lint Errors That Wouldn't Quit

After adding the theme utilities and updating all the imports, I ran lint. It failed. Of course it
failed.

```
error  `@designgreat/lib-design-token` import should occur before type import of `@storybook/react`
error  'THEME_CLASSES' is defined but never used
```

**Error #14: Import Order and Unused Imports**

Two issues. First, I had imported `THEME_CLASSES` but then decided to use `getThemeClassName`
instead. The import was still there, unused, taking up space, confusing readers. Dead code.

Second, my import order was wrong. The linter had rules about import ordering - external packages
first, then internal packages, then relative imports. I had them mixed up. The
`@designgreat/lib-design-token` import was after the `@storybook/react` type import when it should
have been before.

Small things. Nitpicky things. But the linter enforces consistency, and consistency matters in a
codebase that multiple people work on.

I fixed the imports. Ran lint again. Passed.

Ran typecheck. Failed. Of course.

### The Namespace Nobody Updated

The monorepo-wide typecheck found more issues:

```
error TS2339: Property 'color' does not exist on type '{ readonly dg: { ... }'
```

**Error #15: Test Files Using Old Token Structure**

The test file `tokens.test.ts` in the design token package was still accessing tokens the old way:

```typescript
// Old way - before the namespace change
expect(designTokens.themes.light.color.accent.blue.DEFAULT).toBe('#0055cc')

// New way - with dg namespace
expect(designTokens.themes.light.dg.color.accent.blue.DEFAULT).toBe('#0055cc')
```

I had changed the token structure to include the `dg` namespace, but I hadn't updated all the code
that accessed those tokens. The test file was still using the old paths. The validation logic was
still checking the old structure.

And `validation.ts` was checking for the wrong structure too:

```typescript
// Old way
const requiredSections = ['color', 'spacing', 'typography']
for (const key of requiredSections) {
  if (!(key in theme)) {
    // checking theme.color, theme.spacing, etc.
    // error
  }
}

// New way
for (const key of requiredSections) {
  if (!(key in theme.dg)) {
    // checking theme.dg.color, theme.dg.spacing, etc.
    // error
  }
}
```

Each fix led to another issue. It felt like whack-a-mole. Hit one error, another pops up. Fix one
file, break another. The namespace change had rippled through more code than I expected.

### The GitHub Workflows

Just when I thought we were done, the developer asked about GitHub workflows:

> "What about the GitHub workflows?"

I checked. Sure enough, several workflow files referenced `design-token-support`:

- `deploy-lib-web-ui-storybook.yml` - deploys Storybook to GitHub Pages
- `deploy-docs-storybook-gh-pages.yml` - deploys documentation Storybook
- `deploy-docs-design-system.yml` - deploys the documentation site
- `version-publish-packages.yml` - handles versioning and npm publishing

Each workflow had a build step that built design-token-support before building other packages:

```yaml
- name: Build dependencies
  run: |
    pnpm --filter @designgreat/design-token-support run build
    pnpm --filter @designgreat/lib-design-token run build
    pnpm --filter @designgreat/lib-web-ui run build
```

The package didn't exist anymore. The build step would fail. CI would break. Deployments would fail.

I removed the `design-token-support` build step from each workflow. Four files. Four changes. Four
potential points of failure that I had almost missed.

And the workflow documentation in `.github/workflows/README.md` listed `design-token-support` as a
published package. Removed that too. Documentation has to match reality.

### The Architecture Documentation

While I was at it, I checked the main architecture documentation in `docs/ARCHITECTURE.md`. Sure
enough, it mentioned design-token-support as one of the packages in the monorepo. Described its
purpose. Explained how it fit into the overall system.

All of that was now wrong. The package was gone. The architecture had changed. The documentation was
lying to anyone who read it.

I updated it. Removed the references. Updated the diagrams. Made sure the documentation reflected
the actual state of the codebase.

### The Final Test Run

After all the fixes - the lint errors, the type errors, the workflow updates, the documentation
updates - I ran the test script one more time:

```
🧪 Design Token Refactoring - Comprehensive Test Suite
======================================================

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Phase 0: Building Packages
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Building lib-design-token... ✓
Building lib-web-ui... ✓
Building docs-design-system... ✓

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Phase 1: File Existence
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Light theme CSS exists
✓ Dark theme CSS exists
✓ Combined CSS exists
✓ Light theme SCSS exists
✓ Dark theme SCSS exists
...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Test Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Tests Run: 72
Passed: 72
Failed: 0
Warnings: 0
Pass Rate: 100%

✓ All tests passed!
```

72 tests. All passing. Finally. After a full work day. After countless errors. After multiple rounds
of documentation updates. After deleting a package that should have been deleted from the start.
After creating utilities that should have existed from the beginning.

Finally done.

---

## Epilogue: Lessons Learned

After almost a full work day of back and forth, the refactor was finally complete. The architecture
was cleaner. The packages were decoupled. The documentation was updated. The tests were passing. The
workflows were fixed.

But it should have taken maybe two hours, three at most.

### What Went Wrong: A Comprehensive List

1. **Incomplete initial analysis**: I didn't fully map out all the dependencies on
   `design-token-support` before starting. I found references piecemeal throughout the process, each
   discovery requiring another round of changes. A comprehensive grep at the beginning would have
   shown me the true scope.

2. **Wrong deprecation strategy**: I should have asked upfront whether to deprecate or delete the
   package. The developer had no external users - deletion was the right choice. Hours wasted on
   "deprecation" that should have been a simple `rm -rf`.

3. **Hardcoding instead of abstraction**: Replacing `getThemeClassName()` with hardcoded
   `'dg-theme-dark'` strings was a mistake. I should have created the helper utilities in the design
   token package from the start, maintaining a single source of truth. DRY exists for a reason.

4. **Insufficient testing during development**: I made changes and declared them complete without
   running builds or tests. This led to discovering errors late in the process, when fixing them
   required revisiting code I thought was done. Test early, test often.

5. **Incomplete documentation review**: I updated some docs but missed others. A systematic search
   at the beginning - grep everything, make a list, check them off - would have been more efficient
   than my haphazard approach.

6. **Not understanding the build system**: The Storybook telemetry issue, the font bundling issues,
   the CSS import chain - I didn't fully understand how these systems worked before making changes.
   I should have read and understood the existing configuration before modifying it.

7. **Overwriting files accidentally**: I wiped the Storybook configuration by carelessly writing a
   new file instead of modifying the existing one. Always read before writing. Always. No
   exceptions.

8. **Test script design flaws**: The test script had multiple bugs:
   - `set -e` conflicting with arithmetic expressions
   - Checking for `.ts` files instead of compiled `.js` files
   - Missing build step (assuming pre-built packages)
   - Missing quality checks (lint, typecheck, test)

   Each bug required another iteration. The script should have been designed more carefully from the
   start, with edge cases considered.

9. **Empty string classList error**: I didn't consider that the light theme's empty class name would
   cause `classList.add('')` to throw. Edge cases matter. The happy path isn't the only path.

10. **Import order issues**: I added imports without considering the linter's ordering rules. Small
    thing, but it added up. Know your linter rules.

11. **Namespace updates incomplete**: After changing to the `dg` namespace, I didn't update all the
    code that accessed tokens. Test files and validation logic still used the old paths. When you
    change a data structure, you have to change all the code that uses it.

12. **Workflow files forgotten**: GitHub Actions workflows also referenced the deprecated package.
    They weren't in my mental model of "things that might reference this package." CI/CD is part of
    the codebase too.

### What Should Have Happened

1. **Complete dependency analysis first**: Before writing any code, grep the entire codebase for
   every reference to the packages being changed. Make a list. Count the files. Print it out.
   Understand the true scope of the work.

2. **Ask clarifying questions upfront**:
   - "Delete or deprecate?"
   - "Helper functions or hardcoded values?"
   - "What should go in README vs documentation site?"
   - "What's the testing strategy?"
   - "Are there any CI/CD considerations?"

3. **Create abstractions before removing old ones**: Build the new helper utilities first, then
   migrate to them. Don't leave a gap where hardcoded values fill in. The new thing should exist
   before the old thing is removed.

4. **Test incrementally**: Build and test after each significant change, not at the end. Catch
   errors early when context is fresh. Don't accumulate technical debt.

5. **Systematic documentation review**: Search for all references, make a list, update them all at
   once. Don't assume you've found everything. Grep is your friend.

6. **Understand before changing**: Read and understand the existing build configuration before
   modifying it. Know what you're touching. Know why it's there. Know what will break if you change
   it.

7. **Design test scripts carefully**: Consider edge cases. Run the script during development, not
   just at the end. Make it self-contained and idempotent. Think about what happens on a fresh
   clone.

8. **Check workflows and CI**: Remember that GitHub Actions, CI/CD pipelines, and deployment scripts
   might also reference the packages being changed. They're part of the codebase too.

---

## The Numbers

- **Time spent**: Almost a full work day (~8 hours)
- **Files modified**: 50+
- **Packages affected**: 3 (lib-design-token, lib-web-ui, docs-design-system)
- **Packages deleted**: 1 (design-token-support)
- **Build errors encountered**: 15+
- **Times documentation was updated**: 4+ passes
- **Test script bugs fixed**: 4
- **Developer frustration moments**: Too many to count
- **Times the developer had to correct my work**: At least 10
- **Questions I should have asked upfront**: At least 5
- **Hours that could have been saved with better planning**: At least 4

---

## Final Thoughts

This refactor was a lesson in humility. What seemed like a simple task - changing some prefixes and
moving some imports - turned into a full work day odyssey through build systems, documentation, test
scripts, package dependencies, GitHub workflows, and my own assumptions.

The developer was patient, but I could sense their frustration growing with each new error, each
incomplete review, each "oops, I missed that" moment. They had to repeatedly check my work, point
out things I'd missed, and guide me toward better solutions. They had to ask the obvious questions I
should have asked myself.

The end result is good: a cleaner architecture with `lib-design-token` as a standalone package,
proper helper utilities for theme management, comprehensive documentation, and a thorough test
script. The codebase is better for this refactor.

But the journey there was far more painful than it needed to be. Far more time-consuming. Far more
frustrating for everyone involved.

Next time:

- Plan better. Really plan. Make lists. Count files. Understand scope.
- Ask more questions. The obvious ones. The ones that seem too simple to ask.
- Map all dependencies before starting. Every single one.
- Test earlier and more often. After every significant change.
- Don't assume - verify. Don't trust your memory - check.
- And when someone says "deprecate," ask if they mean "delete."

The best refactors are the ones where you spend more time planning than coding. This was not one of
those refactors. But maybe the next one will be.

---

_Written as a reminder that even "simple" refactors can spiral into complexity when not approached
with sufficient care and planning. And as an apology to the developer who had to endure this journey
with me. Thank you for your patience._

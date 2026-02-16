# Frontend Architecture

Stack:

- Vue 3
- GraphQL (vue-apollo-client)
- Tailwind v4
- vlite3 (UI system)

This file defines how the project MUST use these libraries.

---

# 1. GraphQL Layer — vue-apollo-client

Purpose:

- Typed queries/mutations
- Auto code generation
- Token handling (cookies)
- SSR support
- Offline mutation queue
- Smart refetch

Rules:

- All operations live in `.graphql` files.
- NEVER write raw Apollo queries in components.
- ALWAYS use generated composables from `src/graphql/generated.ts`.

Patterns:

Query (SSR):
await useMeQuery()

Query (Client):
useMeQuery()

❌ Reactive variables auto-refetch, DO NOT use `ref` or `computed` for query variables.

Mutation:
const { mutate } = useLoginMutation()
await mutate(payload)

Offline support is enabled in this project.
If the network is unavailable, mutations are queued and replayed when connection returns.

Multi-query:
useMultiQuery(queries, ['useQueryA', 'useQueryB'])

Token utilities:

- setToken()
- getToken()
- removeToken()
- useKeepCookieAlive()

Automatically refreshed when activity is detected

Token is auto-attached to requests.

---

# 2. UI Layer — vlite3

Purpose:

- Tailwind-based components
- Semantic theming
- Dark mode
- Schema-driven forms
- Global upload registry

Import pattern:
import { Button, Input, Form } from 'vlite3'

---

# Theming System (Semantic Only)

Never hardcode colors. Use semantic classes. vlite3 uses a semantic theming system inspired by **shadcn/ui** and compatible with **Tailwind CSS v4**. All colors are defined as CSS variables, making it easy to customize the look and feel of your application including Dark Mode support.

## Core Classes

- bg-background, bg-white → app background
- text-foreground → main text
- text-muted → secondary text
- bg-card → surfaces
- border → default borders with defined color.
- rounded → global radius

### Semantic Colors

Override these variables in `:root` or within a `.dark` class (when using class-based dark mode) to adjust your theme.

| Variable                         | Utility Class                 | Description                             | Recommended Usage                               |
| -------------------------------- | ----------------------------- | --------------------------------------- | ----------------------------------------------- |
| `--color-background`             | `bg-background`               | Default page background (white)         | Main application background                     |
| `--color-foreground`             | `text-foreground`             | Default text color (gray-900)           | Primary content text                            |
| `--color-card`                   | `bg-card`                     | Card background (gray-100)              | Cards, containers, surfaces, panels, dialogs    |
| `--color-primary`                | `bg-primary`                  | Primary brand color (blue)              | Main actions, buttons, active states            |
| `--color-primary-foreground`     | `text-primary-foreground`     | Text on primary background (white)      | Text/icons displayed on primary elements        |
| `--color-secondary`              | `bg-secondary`                | Secondary background (gray-200)         | Secondary actions, muted sections               |
| `--color-secondary-foreground`   | `text-secondary-foreground`   | Text on secondary background (gray-900) | Content displayed on secondary elements         |
| `--color-muted`                  | `bg-muted`                    | Muted background (gray-150)             | Subtle surfaces, table headers, disabled states |
| `--color-muted`                  | `text-muted`                  | Muted text (gray-600)                   | Secondary text, inactive links, descriptions    |
| `--color-accent`                 | `bg-accent`                   | Accent background (gray-150)            | Hover states, selection highlights              |
| `--color-accent-foreground`      | `text-accent-foreground`      | Text on accent background (gray-900)    | Content displayed on accent elements            |
| `--color-destructive`            | `bg-destructive`              | Destructive color (red)                 | Errors, warnings, destructive actions           |
| `--color-destructive-foreground` | `text-destructive-foreground` | Text on destructive background (white)  | Content displayed on destructive elements       |
| `--color-border`                 | `border`                      | Default border color (gray-250)         | Inputs, cards, dividers                         |
| `--radius`                       | `rounded`                     | Global border radius                    | Shared radius across components                 |

---

### Extended Color Variants

For more complex components, vlite3 provides extended variants for main semantic colors (`primary`, `danger`, `warning`, `info`, `success`). These are useful for building nuanced UIs with subtle backgrounds, hover states, and accessible text.

| Base Color  | Variant Variables                                                                                       | Usage Description                                                                                                                                                                                           |
| :---------- | :------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Primary** | `--color-primary-light`<br>`--color-primary-dark`<br>`--color-primary-fg`<br>`--color-primary-fg-light` | **Light**: Subtle background (e.g., 10% opacity).<br>**Dark**: Hover state for the main color.<br>**Fg**: Text color on top of the _main_ color.<br>**Fg-Light**: Text color on top of the _light_ variant. |
| **Danger**  | `--color-danger-light`<br>`--color-danger-dark`<br>`--color-danger-fg`<br>`--color-danger-fg-light`     | **Light**: Error backgrounds (alerts).<br>**Dark**: Hover state for destructive buttons.<br>**Fg**: Text on destructive buttons.<br>**Fg-Light**: Text on error alerts.                                     |
| **Warning** | `--color-warning-light`<br>`--color-warning-dark`<br>`--color-warning-fg`<br>`--color-warning-fg-light` | **Light**: Warning backgrounds.<br>**Dark**: Active/Determined warning states.<br>**Fg**: Text on warning badges.<br>**Fg-Light**: Text on warning backgrounds.                                             |
| **Success** | `--color-success-light`<br>`--color-success-dark`<br>`--color-success-fg`<br>`--color-success-fg-light` | **Light**: Success backgrounds (toasts).<br>**Dark**: Hover/Active success actions.<br>**Fg**: Text on success buttons.<br>**Fg-Light**: Text on success backgrounds.                                       |
| **Info**    | `--color-info-light`<br>`--color-info-dark`<br>`--color-info-fg`<br>`--color-info-fg-light`             | **Light**: Info backgrounds.<br>**Dark**: Hover/Active info actions.<br>**Fg**: Text on info buttons.<br>**Fg-Light**: Text on info backgrounds.                                                            |

---

## 8. Typography Scale System

The typography system is organized into two complementary scales:

- Compact scale (prefixed with `--text--fs-*`)
- Progressive scale (prefixed with `--text-fs-*`)

Use the progressive scale only when you need finer visual control beyond the standard Tailwind size tokens.
For most layout and content needs, prefer the default Tailwind text sizes to maintain consistency.

### Compact Text Scale

```css
--text--fs-1: 0.95em;
--text--fs-2: 0.8em;
--text--fs-3: 0.75em;
--text--fs-4: 0.7em;
--text--fs-5: 0.65em;
--text--fs-6: 0.6em;
--text--fs-7: 0.55em;
--text--fs-8: 0.5em;
```

### Progressive Text Scale

```css
--text-fs-0.5: 1.05em;
--text-fs-1: 1.1em;
--text-fs-1.5: 1.14em;
--text-fs-2: 1.18em;
--text-fs-2.5: 1.22em;
--text-fs-3: 1.26em;
--text-fs-3.5: 1.3em;
--text-fs-4: 1.34em;
--text-fs-4.5: 1.38em;
--text-fs-5: 1.42em;
--text-fs-5.5: 1.46em;
--text-fs-6: 1.5em;
--text-fs-6.5: 1.54em;
--text-fs-7: 1.58em;
--text-fs-7.5: 1.62em;
--text-fs-8: 1.68em;
--text-fs-8.5: 1.72em;
--text-fs-9: 1.8em;
--text-fs-9.5: 2em;
--text-fs-10: 2.5em;
```

### Tailwind Size Tokens

```css
--text-xs: 0.75rem --text-sm: 0.875rem --text-base: 1rem --text-lg: 1.125rem --text-xl: 1.25rem
  --text-2xl: 1.5rem --text-3xl: 1.875rem --text-4xl: 2.25rem --text-5xl: 3rem --text-6xl: 4rem;
```

---

### Usage Examples

```html
<p class="text-fs-2">Body text</p>

<span class="-text-fs-4 text-muted"> Caption text </span>

<h1 class="text-xl font-semibold">Page Title</h1>
```

---

# Data Flow

.graphql → auto composables → Vue component → vlite3 UI

Upload:
Form → upload service → URL → mutation

Auth:
Login → setToken() → cookie → auto attached to GraphQL

---

# Hard Rules

- No manual Apollo setup inside components.
- No hardcoded colors.
- All uploads via vlite3 registry.
- All GraphQL via generated hooks only.
- Use `border` instead of `border-border` (the default border color (gray-250) is already applied).
- Use `rounded` instead of `rounded-rounded`.
- Use `bg-muted` instead of `bg-secondary/20`.
- Use `gap-x-*` instead of applying `ml-*` or `mr-*` directly on sibling items.
- Use `gap-y-*` instead of applying `mt

## Complete reference for AI agents and developers:

- [llms.txt](/vue-graphql-ts-boilerplate//docs/llms.txt).
- [llms-theming.txt](/vue-graphql-ts-boilerplate//docs/llms-theming.txt).
- [llm-forms.txt](/vue-graphql-ts-boilerplate//docs/llm-forms.txt).
- [llm-utility.txt](/vue-graphql-ts-boilerplate//docs/llm-utility.txt).
- [llms-full.txt](/vue-graphql-ts-boilerplate//docs/llms-full.txt).
- [llms-advance.txt](/vue-graphql-ts-boilerplate//docs/llms-advance.txt).

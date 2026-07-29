# ThemeProvider

**Import:** `import { ThemeProvider, useThemeStyles } from 'vlite3'`

A data-driven theme wrapper. Pass root, Surface, and brand colors plus font
and layout values — the provider computes every CSS variable, every
nested card override, and exposes the resolved styles to descendants via the
`useThemeStyles()` composable.

The component is **generic** — it knows nothing about shops, dashboards, or
auth flows. Any app-specific wrapper (e.g. `ShopWebsiteProvider`) just maps
its own domain object onto `ThemeProviderProps`.

### Props

| Prop            | Type                              | Default                    | Description                                                                       |
| :-------------- | :-------------------------------- | :------------------------- | :-------------------------------------------------------------------------------- |
| `bgColor`       | `string`                          | —                          | Root background. Used to derive the full root `--color-*` palette.                |
| `surfaceColor`  | `string`                          | —                          | Optional seed for a complete descendant `.bg-card` color scope.                   |
| `primaryColor`  | `string`                          | —                          | Brand color. Generates `--color-primary*` variants.                               |
| `footerBgColor` | `string`                          | —                          | Optional footer background. Surfaced as `--color-footer`.                        |
| `baseFontSize`  | `number`                          | `16`                       | Base font size in `px`. Drives the `--text-*` scale.                             |
| `scaleSpacingWithBaseFontSize` | `boolean`          | `false`                    | Opt in to scaling Tailwind's `--spacing` unit with `baseFontSize`.                |
| `headingScale`  | `number`                          | `1.25`                     | Heading ratio. Scales the progressive `--text-fs-*` family.                       |
| `borderRadius`  | `number`                          | `8`                        | Base radius in `px`. Drives the `--radius*` family.                               |
| `maxWidth`      | `number \| string \| null`        | `1440`                     | Max content width. `'full' \| 'none' \| 0` becomes `none`. Any other string passes through. |
| `rootClass`     | `string`                          | `'vlite-theme-provider'`   | Root class applied to the wrapper.                                               |

### Slots

| Slot      | Description       |
| :-------- | :---------------- |
| `default` | Themed content.   |

### Generated CSS Variables

The provider sets a flat record of CSS custom properties on its root element
that drive the entire vlite3 design system:

- **Colors** — `--color-background`, `--color-body`, `--color-foreground`,
  `--color-border`, `--color-input`, `--color-card`, `--color-card-light`,
  `--color-muted`, `--color-accent`, `--color-secondary`, `--color-scrollbar`,
  `--color-primary*`, semantic palette (`--color-danger*`, `--color-warning*`,
  `--color-info*`, `--color-success*`), and `--color-chart-1..6`.
- **Gray scale** — `--color-gray-50 .. 950` generated via
  `color-mix(in oklab, …)`.
- **Typography** — `font-size`, `--font-size-base`, Tailwind text tokens
  (`--text-xs` … `--text-6xl`), compact scale (`--text--fs-*`), progressive
  scale (`--text-fs-*`), and font weights (`--font-weight-*`).
- **Radii** — `--radius`, `--radius-sm`, `--radius-md`, `--radius-lg`,
  `--radius-xl`, `--radius-2xl`, `--radius-3xl`.
- **Layout** — `--shop-max-width`, `--spacing`.
- **Component** — `--tooltip-*`, `--date-picker-*`, `--iconPicker-border`,
  `--shadow-*`.

### Composable

```ts
import { useThemeStyles } from 'vlite3'

const styles = useThemeStyles() // ComputedRef<ThemeStyles> | undefined
```

Inside any descendant of `ThemeProvider`, `styles.value` is a reactive record
of every CSS variable the provider produced. Use it to read the resolved
theme (e.g. to compute a contrasting foreground) or to forward the styles
into a child component that takes a `:styles` prop (like `SidePanel`).

### Usage

```vue
<script setup lang="ts">
import { ThemeProvider, Button } from 'vlite3'

const storeTheme = {
  bg: '#f5f5f4',
  surface: '#ffffff',
  primary: '#6366f1',
  baseFontSize: 16,
  headingScale: 1.25,
  borderRadius: 8,
  maxWidth: 1280,
}
</script>

<template>
  <ThemeProvider
    :bg-color="storeTheme.bg"
    :surface-color="storeTheme.surface"
    :primary-color="storeTheme.primary"
    :base-font-size="storeTheme.baseFontSize"
    :scale-spacing-with-base-font-size="true"
    :heading-scale="storeTheme.headingScale"
    :border-radius="storeTheme.borderRadius"
    :max-width="storeTheme.maxWidth">
    <Button variant="primary">Save</Button>
  </ThemeProvider>
</template>
```

### Notes

- The wrapper applies a `dark` class when `bgColor` has luminance < 50%, so
  consumers can opt into dark variants of custom styles via
  `.vlite-theme-provider.dark .something { … }`.
- When `surfaceColor` is provided, `.bg-card` receives a complete color scope
  with its own foreground, grays, borders, inputs, muted/secondary tokens,
  semantic colors, charts, shadows, and the inherited primary brand palette.
  Its luminance is evaluated independently from `bgColor`.
- `.bg-card-light` is an intentionally shallower companion Surface. Nested
  `.bg-card` levels continue moving away from their parent to preserve visible
  separation. When `surfaceColor` is omitted, the legacy root-derived card
  behavior is preserved.
- `primaryColor` is the brand/action palette (`--color-primary*`). It does not
  replace the neutral interaction token `--color-accent`.
- `headingScale` remains supported. Omitting it uses the existing `1.25`
  default. Spacing remains exactly `0.25rem` unless the spacing opt-in is true;
  with the opt-in it is `0.25rem * (baseFontSize / 16)`.
- Every generated root and card selector is tied to one provider instance, so
  multiple providers can coexist without leaking palettes or spacing values.
- The provider is SSR-safe: theme tokens are pure computed values with no
  `window` / `document` access at render time. Root CSS variables are written
  as **inline styles** on the provider element so the first SSR HTML byte is
  already themed (no blank overlay / client-only flash). A nested `<style>`
  block still applies `!important` root tokens plus descendant `.bg-card`
  scopes. Those style selectors use **unquoted** `[data-vlite-theme-provider=…]`
  forms so Vue SSR text escaping cannot turn quotes into literal `&quot;`
  inside `<style>` rawtext (which does not decode HTML entities — quoted
  selectors would only start matching after hydration). Color transitions are
  deferred until after mount so hydration does not animate token application.

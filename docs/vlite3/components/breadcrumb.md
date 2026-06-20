# Breadcrumb

**Import:** `import { Breadcrumb, BreadcrumbItem } from 'vlite3'`

The `Breadcrumb` component displays a navigational hierarchy for the current page. It supports data-driven usage via the `items` prop, or manual slot-driven composition using `<BreadcrumbItem>` directly.

---

## Breadcrumb (Wrapper)

### Props

| Prop        | Type                 | Default     | Description                                                                                  |
| :---------- | :------------------- | :---------- | :------------------------------------------------------------------------------------------- |
| `items`     | `BreadcrumbItemSchema[]` | —       | Array of breadcrumb items rendered automatically. When omitted, use the default slot.        |
| `variant`   | `BreadcrumbVariant`  | `default`   | Visual style of the breadcrumb. See variants below.                                          |
| `separator` | `BreadcrumbSeparator`| `chevron`   | Character used between items. See separator options below.                                   |
| `size`      | `BreadcrumbSize`     | `md`        | Font size of the breadcrumb trail.                                                           |
| `maxItems`  | `number`             | —           | Max visible items before collapsing. Shows first item, ellipsis, and tail items. Click `…` to expand. |
| `class`     | `string`             | —           | Additional CSS classes applied to the `<nav>` wrapper.                                       |

### Emits

| Event        | Payload                                         | Description                                                                                                                 |
| :----------- | :---------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `item-click` | `{ item: BreadcrumbItemSchema, index: number }` | Fires on every clickable item click (non-disabled, non-current). Routing via `to`/`href` still happens normally in parallel. `index` is the position in the original `items` array. |

### Types
```ts
type BreadcrumbVariant = 'default' | 'contained' | 'pills' | 'arrow'

type BreadcrumbSeparator = 'slash' | 'chevron' | 'dot' | 'arrow'

type BreadcrumbSize = 'sm' | 'md' | 'lg'

interface BreadcrumbItemSchema {
  label: string
  to?: string       // Vue Router route path
  href?: string     // Native anchor href
  icon?: string     // Iconify icon ID rendered before the label
  disabled?: boolean
  active?: boolean
}
```

### Variants

| Value       | Description                                                                  |
| :---------- | :--------------------------------------------------------------------------- |
| `default`   | Plain text links with no background, minimal visual weight.                  |
| `contained` | Wraps the entire breadcrumb in a pill-shaped bordered container.             |
| `pills`     | Each individual item gets a rounded pill background; active item uses primary color. |
| `arrow`     | Items are shaped as chevron arrows using clip-path, flowing seamlessly left-to-right. |

### Separators

| Value     | Character | Description       |
| :-------- | :-------- | :---------------- |
| `chevron` | `›`       | Default separator |
| `slash`   | `/`       | URL-style         |
| `dot`     | `·`       | Subtle divider    |
| `arrow`   | `→`       | Directional arrow |

> **Note:** When `variant="arrow"` is used, separators are hidden automatically via CSS.

### Slots

| Name      | Description                                                                                   |
| :-------- | :-------------------------------------------------------------------------------------------- |
| `default` | Used for manual slot-driven composition. Rendered when `items` prop is not provided. Place `<BreadcrumbItem>` components and separator `<li>` elements here. |

### Collapse Behavior

When `maxItems` is set and the `items` array exceeds that count, the breadcrumb automatically collapses. It shows the **first item**, an **ellipsis button (`…`)**, and the **last `maxItems - 1` items**. Clicking the ellipsis expands the full list. This state is internal and resets on component remount.

---

## BreadcrumbItem

The `BreadcrumbItem` is the individual item component used either internally by `Breadcrumb` when `items` is provided, or directly in the default slot for manual composition.

### Props

| Prop        | Type                 | Default   | Description                                                                 |
| :---------- | :------------------- | :-------- | :-------------------------------------------------------------------------- |
| `label`     | `string`             | —         | Display text of the item. Used as slot fallback.                            |
| `to`        | `string`             | —         | Vue Router route path. Renders a `<router-link>` when set.                  |
| `href`      | `string`             | —         | Native anchor href. Renders an `<a>` tag when set (and `to` is not set).   |
| `icon`      | `string`             | —         | Iconify icon ID rendered before the label.                                  |
| `disabled`  | `boolean`            | `false`   | Grays out the item and disables interaction. Renders as `<span>`.           |
| `isCurrent` | `boolean`            | `false`   | Marks item as the active/current page. Renders bold, no link, aria-current. |
| `size`      | `BreadcrumbSize`     | `md`      | Controls icon size relative to text. Inherited from parent `Breadcrumb`.    |
| `variant`   | `string`             | `default` | Inherited from parent `Breadcrumb` for style context.                       |

### Slot

| Name      | Description                                               |
| :-------- | :-------------------------------------------------------- |
| `default` | Custom content inside the item, overrides the `label` prop. |

### Tag Resolution

The rendered HTML element is automatically resolved:

| Condition                 | Rendered Tag      |
| :------------------------ | :---------------- |
| `disabled` or `isCurrent` | `<span>`          |
| `to` is set               | `<router-link>`   |
| `href` is set             | `<a>`             |
| None of the above         | `<span>`          |

---

## useBreadcrumb Composable

**Import:** `import { useBreadcrumb } from 'vlite3'`

Automatically generates reactive breadcrumb items from the current Vue Router route path. Useful for integrating Breadcrumb into layouts without manual configuration.
```ts
function useBreadcrumb(options?: UseBreadcrumbOptions): { items: ComputedRef<BreadcrumbItemSchema[]> }

interface UseBreadcrumbOptions {
  homeIcon?: string   // Default: 'lucide:home'
  homeLabel?: string  // Default: 'Home'
  homePath?: string   // Default: '/'
  labelMap?: Record<string, string> // Override labels per path, e.g. { '/settings': 'Preferences' }
}
```

Path segments are humanized automatically: `avatar-uploader` → `Avatar Uploader`.

---

## Examples

### Basic (data-driven)
```vue
<script setup>
import { Breadcrumb } from 'vlite3'

const items = [
  { label: 'Home', to: '/', icon: 'lucide:home' },
  { label: 'Components', to: '/components' },
  { label: 'Breadcrumb' },
]
</script>

<template>
  <Breadcrumb :items="items" />
</template>
```

### Event-based click (state navigation)

Just add `@item-click` — no flags, no extra config. Fires for every clickable item.
Items with `to`/`href` still route normally; the event fires in parallel.
```vue
<script setup>
import { Breadcrumb } from 'vlite3'
import type { BreadcrumbItemSchema } from 'vlite3'

const steps: BreadcrumbItemSchema[] = [
  { label: 'Account', icon: 'lucide:user' },
  { label: 'Profile', icon: 'lucide:pencil' },
  { label: 'Review',  icon: 'lucide:check-circle' },
]

function onStep({ item, index }: { item: BreadcrumbItemSchema; index: number }) {
  // use index to drive any state — wizard step, tab, panel, etc.
}
</script>

<template>
  <Breadcrumb :items="steps" variant="pills" @item-click="onStep" />
</template>
```

### Variants
```vue
<Breadcrumb :items="items" variant="default" />
<Breadcrumb :items="items" variant="contained" />
<Breadcrumb :items="items" variant="pills" />
<Breadcrumb :items="items" variant="arrow" />
```

### Separators
```vue
<Breadcrumb :items="items" separator="chevron" />
<Breadcrumb :items="items" separator="slash" />
<Breadcrumb :items="items" separator="dot" />
<Breadcrumb :items="items" separator="arrow" />
```

### Sizes
```vue
<Breadcrumb :items="items" size="sm" />
<Breadcrumb :items="items" size="md" />
<Breadcrumb :items="items" size="lg" />
```

### With Icons
```vue
<script setup>
const items = [
  { label: 'Home', to: '/', icon: 'lucide:home' },
  { label: 'Settings', icon: 'lucide:settings' },
  { label: 'Security', icon: 'lucide:shield' },
]
</script>

<template>
  <Breadcrumb :items="items" />
</template>
```

### Collapsed (maxItems)
```vue
<script setup>
const longItems = [
  { label: 'Home', to: '/' },
  { label: 'Documents' },
  { label: 'Projects' },
  { label: 'Web Development' },
  { label: 'Vue Components' },
  { label: 'Breadcrumb' },
]
</script>

<template>
  <!-- Shows: Home > ... > Vue Components > Breadcrumb -->
  <Breadcrumb :items="longItems" :max-items="3" />
</template>
```

### Disabled Item
```vue
<script setup>
const items = [
  { label: 'Home', to: '/', icon: 'lucide:home' },
  { label: 'Archived', disabled: true },
  { label: 'Current Page' },
]
</script>

<template>
  <Breadcrumb :items="items" />
</template>
```

### Combined Variant + Separator + Size
```vue
<Breadcrumb :items="items" variant="contained" separator="slash" size="md" />
<Breadcrumb :items="items" variant="pills" separator="dot" size="lg" />
<Breadcrumb :items="items" variant="arrow" size="sm" />
```

### Slot-Driven (Manual Composition)

Use `<BreadcrumbItem>` directly when you need custom rendering inside items.
```vue
<template>
  <Breadcrumb>
    <BreadcrumbItem label="Home" to="/" icon="lucide:home" />
    <li class="breadcrumb-separator" aria-hidden="true"><span>›</span></li>
    <BreadcrumbItem label="Library" />
    <li class="breadcrumb-separator" aria-hidden="true"><span>›</span></li>
    <BreadcrumbItem label="Current Page" :is-current="true" />
  </Breadcrumb>
</template>
```

### Auto-generated from Route (useBreadcrumb)
```vue
<script setup>
import { Breadcrumb, useBreadcrumb } from 'vlite3'

const { items } = useBreadcrumb({
  homeIcon: 'lucide:home',
  labelMap: {
    '/settings': 'Preferences',
    '/settings/account': 'Account Settings',
  },
})
</script>

<template>
  <Breadcrumb :items="items" separator="slash" size="sm" />
</template>
```

### Inside Navbar (breadcrumb prop)

The `Navbar` component has built-in breadcrumb support via props. Pass `breadcrumb` to enable it, and access the generated items in the `#header` slot scope.
```vue
<Navbar
  breadcrumb
  breadcrumb-variant="default"
  breadcrumb-separator="slash"
  breadcrumb-size="sm"
  breadcrumb-home-icon="lucide:home"
  breadcrumb-position="header">
  <template #header="{ breadcrumbItems }">
    <Breadcrumb :items="breadcrumbItems" separator="slash" size="sm" />
  </template>
</Navbar>
```

| Navbar Prop             | Type                  | Default        | Description                                           |
| :---------------------- | :-------------------- | :------------- | :---------------------------------------------------- |
| `breadcrumb`            | `boolean`             | `false`        | Enables auto-breadcrumb generation from current route |
| `breadcrumbVariant`     | `BreadcrumbVariant`   | `default`      | Visual variant passed to `<Breadcrumb>`               |
| `breadcrumbSeparator`   | `BreadcrumbSeparator` | `chevron`      | Separator passed to `<Breadcrumb>`                    |
| `breadcrumbSize`        | `BreadcrumbSize`      | `sm`           | Size passed to `<Breadcrumb>`                         |
| `breadcrumbHomeIcon`    | `string`              | `lucide:home`  | Icon for the Home item                                |
| `breadcrumbPosition`    | `'header' \| 'main'`  | `header`       | Where to render the breadcrumb inside the layout      |
| `breadcrumbLabels`      | `Record<string, string>` | —           | Override labels per path segment                      |
| `breadcrumbClass`       | `string`              | —              | Custom class for the breadcrumb wrapper               |

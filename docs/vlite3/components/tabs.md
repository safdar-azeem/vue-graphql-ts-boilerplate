# Tabes

**Import:** `import { Tabes } from 'vlite3'`

A segmented control for switching modes or views. Supports standard selectable tabs and optional **dropdown menu tabs** that reuse the existing `Dropdown` component.

### Props

| Prop         | Type               | Default   | Description                                              |
| :----------- | :----------------- | :-------- | :------------------------------------------------------- |
| `modelValue` | `string \| number` | —         | Binding (`v-model`)                                      |
| `options`    | `TabesOption[]`    | required  | Array of tabs (standard and/or menu)                     |
| `size`       | `TabesSize`        | `md`      | Dimensions                                               |
| `variant`    | `TabesVariant`     | `surface` | Visual style                                             |
| `block`      | `boolean`          | `false`   | Full width                                               |
| `textClass`  | `string`           | —         | Custom class for text                                    |
| `wrap`       | `boolean`          | `false`   | Wrap tabs to multiple rows on small screens instead of scrolling |
| `direction`  | `'ltr' \| 'rtl' \| 'auto'` | `auto` | Direction for the tab row, scroll affordances, and menus. `auto` follows the nearest ancestor `dir`, then `html[dir]` |
| `sortable`   | `boolean`          | `false`   | Opt-in drag-to-reorder. The new order is persisted to `localStorage` and restored on reload |
| `storageKey` | `string`           | —         | `localStorage` slot for the saved order (prefixed `builto-tabes-order-`). Auto-derived from the tab set when omitted. Only used with `sortable` |

### Types
```ts
import type { IDropdownOption } from 'vlite3'
import type { TooltTipPlacement } from 'v-tooltip-lite/types'

export interface TabesDropdownConfig {
  position?: TooltTipPlacement
  offset?: [number, number]
  direction?: 'ltr' | 'rtl'
  searchable?: boolean
  closeOnSelect?: boolean
  maxHeight?: string
  minWidth?: string
  width?: string
  menuId?: string
  teleport?: boolean
}

export interface TabesOption {
  label: string
  labelI18n?: string
  value: string | number
  icon?: string
  disabled?: boolean
  to?: string | { path: string; [key: string]: any }
  href?: string
  /** When set, this tab becomes a dropdown menu trigger */
  menu?: IDropdownOption[]
  /** Optional Dropdown configuration for this menu tab */
  dropdown?: TabesDropdownConfig
}

export type TabesSize = 'xs' | 'sm' | 'md' | 'lg'

export type TabesVariant =
  | 'surface'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'outline'
  | 'line'
  | 'checkbox'

export type TabesMenuSelectPayload = {
  value: any
  option?: IDropdownOption
  tab: TabesOption
}

export type TabesReorderPayload = {
  /** Tabs in their new order. */
  options: TabesOption[]
  /** New order as a list of option values (the shape persisted to storage). */
  order: (string | number)[]
}
```

### Events

| Event               | Payload                 | Description |
| :------------------ | :---------------------- | :---------- |
| `update:modelValue` | `string \| number`      | Emitted on tab or menu-item selection (`v-model`) |
| `change`            | `string \| number`      | Emitted when selection changes (standard tab or menu item) |
| `menu-select`       | `TabesMenuSelectPayload`| Emitted when a dropdown menu option is selected |
| `menu-open`         | `TabesOption`           | Emitted when a menu tab dropdown opens |
| `menu-close`        | `TabesOption`           | Emitted when a menu tab dropdown closes |
| `reorder`           | `TabesReorderPayload`   | Emitted after the user drags tabs into a new order (`sortable`) |
| `update:options`    | `TabesOption[]`         | Emitted with the reordered tabs, enabling `v-model:options` |

### Variants

| Value       | Description |
| :---------- | :---------- |
| `surface`   | Default segmented control on a muted surface with a sliding marker |
| `primary`   | Primary-colored active marker on a muted surface |
| `secondary` | Secondary-colored active marker |
| `danger`    | Danger-tinted track and active state |
| `success`   | Success-tinted track and active state |
| `outline`   | Transparent track with a border |
| `line`      | Underline tabs — transparent track, bottom border, active underline marker |
| `checkbox`  | Filter-style chips — transparent group; inactive items are plain muted text; the active item is a primary pill (`bg-primary` / `text-primary-fg`) |

#### Checkbox (filter chips)

Use `variant="checkbox"` for compact option selectors where tabs should look like individually selectable filter controls rather than a traditional tab bar. Selection remains **single-choice** via `v-model` — this is not a multi-select checkbox group.

- The tab group background stays fully transparent (no shared fill, border, or underline).
- Inactive items: fully transparent, muted/gray text, no border.
- Active item: rounded pill using `bg-primary` + `text-primary-fg` (no border), matching the design-token active-state pattern.
- Hover, focus-visible ring, disabled, icons, menu tabs, sizes, RTL, scroll, wrap, block, and sortable all continue to work.
- Visual principles borrow from chip/filter UIs (rounded-full active pill, plain inactive labels) but rendering and interaction stay owned by `Tabes` — it does **not** wrap `Chip` or `StatusChip`.

```vue
<Tabes
  v-model="selectedView"
  :options="[
    { label: 'List', value: 'list', icon: 'lucide:list' },
    { label: 'Board', value: 'board', icon: 'lucide:layout-grid' },
    { label: 'Calendar', value: 'calendar', icon: 'lucide:calendar' },
  ]"
  variant="checkbox" />
```

### Usage
```vue
<Tabes
  v-model="currentTab"
  :options="[
    { label: 'Home', value: 'home' },
    { label: 'Profile', value: 'profile' },
  ]"
  variant="line"
  block />
```

#### Menu tabs (More ▾)

A tab with a `menu` array renders as a dropdown trigger inside the same tab group. Opening the menu does **not** change `v-model`. Selecting a menu item updates `v-model` to that item's value and marks the parent menu tab as active.

Menu items use the existing `IDropdownOption` contract (`label`, `value`, `icon`, `disabled`, `to`, `href`, nested `children`, etc.).

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Tabes, type TabesOption } from 'vlite3'

const current = ref('work')

const options: TabesOption[] = [
  { label: 'Work', value: 'work', icon: 'lucide:briefcase' },
  { label: 'Team', value: 'team', icon: 'lucide:users' },
  { label: 'Sites', value: 'sites', icon: 'lucide:map-pin' },
  { label: 'Documents', value: 'documents', icon: 'lucide:file-text' },
  { label: 'Insights', value: 'insights', icon: 'lucide:chart-line' },
  {
    label: 'More',
    value: 'more',
    menu: [
      { label: 'Calendar', value: 'calendar', icon: 'lucide:calendar' },
      { label: 'Workload', value: 'workload', icon: 'lucide:gauge' },
      { label: 'Plan', value: 'plan', icon: 'lucide:clipboard-list' },
      { label: 'Materials', value: 'materials', icon: 'lucide:package' },
      { label: 'Project Dashboard', value: 'project-dashboard', icon: 'lucide:layout-dashboard' },
      { label: 'Settings', value: 'settings', icon: 'lucide:settings' },
    ],
  },
]
</script>

<template>
  <Tabes
    v-model="current"
    :options="options"
    @menu-select="({ value }) => console.log('menu', value)"
    @change="(v) => console.log('change', v)" />
</template>
```

#### Active menu-child behaviour

When `v-model` equals a menu child's `value` (including nested `children`), the parent menu tab shows the active / selected styles and the animated marker tracks the parent trigger — not a phantom child tab.

#### Disabled states

```ts
{
  label: 'More',
  value: 'more',
  disabled: true, // disables the menu trigger
  menu: [
    { label: 'Calendar', value: 'calendar' },
    { label: 'Archived', value: 'archived', disabled: true }, // disables one item
  ],
}
```

#### Icons and translated labels

Standard tabs and menu triggers support `icon` and `labelI18n`. Menu items inherit the same fields from `IDropdownOption` (`icon`, `labelI18n`, etc.).

#### Dropdown placement and config

Per-tab Dropdown options via `dropdown`:

```ts
{
  label: 'More',
  value: 'more',
  menu: [/* IDropdownOption[] */],
  dropdown: {
    position: 'bottom-end',
    offset: [0, 8],
    searchable: false,
    minWidth: '180px',
    direction: 'rtl',
  },
}
```

Menus teleport to `body` by default so they are not clipped by the tab scroll container.

#### RTL

By default (`direction="auto"`) the tab row follows the nearest ancestor `dir`,
then `html[dir]` — matching `Dropdown` — so tabs mirror automatically on RTL
pages or inside RTL islands. Set `direction="rtl"` / `"ltr"` to force a value, or
override a single menu via `dropdown.direction`.

Under the resolved direction:

- The tab row receives `dir="rtl"` and lays tabs out right-to-left.
- The active marker is positioned from local, physical geometry (inline `left`/
  `top` + translate), so it is **not** flipped by the global `i18n.css`
  `left-0 → right-0` rule and stays aligned with the active tab.
- Scroll fades and chevron buttons sit on the inline-start / inline-end edges,
  and the chevrons flip to point toward the scroll travel direction.
- Menu dropdowns (teleported to `body`) receive the resolved direction, so their
  placement and text follow RTL even though they render outside the tab row.

```vue
<!-- Auto: mirrors because an ancestor is RTL -->
<div dir="rtl">
  <Tabes v-model="tab" :options="options" />
</div>

<!-- Forced RTL regardless of context -->
<Tabes v-model="tab" :options="options" direction="rtl" />
```

#### Reordering (drag & drop)

Set `sortable` to let users drag tabs into a new order. It is **off by default** —
enable it only where reordering makes sense. Dragging does not change `v-model`
(that still tracks the active tab); a plain click still selects, a drag reorders.

The new order is **persisted to `localStorage`** and restored on the next load,
mirroring how saved view preferences work elsewhere. Persistence is keyed by
`storageKey` (recommended so multiple tab bars don't collide); when omitted, a
stable key is derived from the tab value set. Keys are stored under
`builto-tabes-order-<key>`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Tabes, type TabesOption, type TabesReorderPayload } from 'vlite3'

const tab = ref('write')
const tabs: TabesOption[] = [
  { label: 'Write', value: 'write', icon: 'lucide:pen-line' },
  { label: 'Preview', value: 'preview', icon: 'lucide:eye' },
  { label: 'Settings', value: 'settings', icon: 'lucide:settings' },
]

const onReorder = (payload: TabesReorderPayload) => {
  console.log('new order', payload.order)
}
</script>

<template>
  <Tabes
    v-model="tab"
    :options="tabs"
    sortable
    storage-key="editor-tabs"
    @reorder="onReorder" />
</template>
```

To keep the parent's array in sync with the on-screen order, bind it two-way:

```vue
<Tabes v-model="tab" v-model:options="tabs" sortable storage-key="editor-tabs" />
```

Notes:

- Menu tabs (`More ▾`) reorder like any other tab; opening the menu still works.
- Disabled tabs can be pushed around but can't be picked up.
- Reordering integrates with scrolling and RTL — the marker and scroll
  affordances re-measure after a drop.
- Uses `vue-draggable-plus` (SortableJS) under the hood.

#### Responsive wrap on small screens
```vue
<Tabes
  v-model="currentTab"
  :options="tabs"
  wrap />
```

> **Note:** By default, when `Tabes` exceed their container's width, they will enable smooth horizontal scrolling and display navigation buttons. Use `wrap` to wrap them to multiple rows instead. When `wrap` is enabled, the animated sliding marker is hidden. Menu tabs continue to work with both scrolling and wrapping.

### Transformed / scaled parents

The active marker is measured in the tablist’s **local CSS coordinate space**.
Visual `getBoundingClientRect()` deltas are normalized by the container’s
current transform scale, and width/height use layout (`offset*`) sizes.
This keeps the marker aligned inside ancestors that apply
`transform: scale(...)` (including VLite3 `ScaleGenerator`) without
double-scaling the overlay.

Performance notes (see `docs/guides/performance.md`):

- Tab item refs use a plain `Map` so DOM nodes are never deep-proxied.
- Resize and scroll layout work is coalesced to `requestAnimationFrame`.
- Marker style writes are skipped when geometry is unchanged.
- Standard (non-menu) tab items use `v-memo` to skip VDOM diffs when
  unchanged. Menu tabs are excluded so Dropdown open-state updates stay live.
- The scroll strip and marker use `will-change: transform` + `contain`.

### Backward compatibility

Existing flat `TabesOption` arrays (without `menu`) continue to work unchanged: same `v-model`, `change` event, variants, sizes, `block`, `wrap`, scrolling, and marker behaviour.

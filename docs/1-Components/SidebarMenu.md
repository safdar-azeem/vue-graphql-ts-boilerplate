# SidebarMenu

**Import:** `import { SidebarMenu } from 'vlite3'`
**Types:** `import type { SidebarMenuItemSchema } from 'vlite3'`

`SidebarMenu` is a recursive, fully accessible navigation menu that renders a tree of items. It supports nested children (unlimited depth), popovers, compact icon-only mode, horizontal layout, responsive breakpoints, badges, disabled states, custom actions, and deep integration with the `Navbar` component's `renderNestedTabs` feature.

---

## Props

| Prop                  | Type                                       | Default                | Description                                                                                                                                                                          |
| :-------------------- | :----------------------------------------- | :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`               | `SidebarMenuItemSchema[]`                  | `[]`                   | The full menu data structure. Supports unlimited nesting via the `children` field.                                                                                                   |
| `allowMultiple`       | `boolean`                                  | `true`                 | When `true`, multiple submenu groups can be open simultaneously. When `false`, opening one group collapses all others.                                                               |
| `defaultExpanded`     | `string[]`                                 | `[]`                   | Array of item IDs (or label strings if no `id` is set) that are expanded by default on mount.                                                                                        |
| `indentSize`          | `number`                                   | `12`                   | Pixel amount of left indentation added per nesting level.                                                                                                                            |
| `variant`             | `'default' \| 'ghost'`                     | `'default'`            | Visual theme. `default` shows a vertical line connector between parent and children. `ghost` renders without the connector.                                                          |
| `compact`             | `boolean`                                  | `false`                | Collapses the menu to icon-only mode. Labels are hidden; icons are centered. Popover mode is forced for all items with children.                                                     |
| `showCompactLabels`   | `boolean`                                  | `false`                | When `compact` is `true`, renders small labels beneath each icon.                                                                                                                    |
| `renderMode`          | `'tree' \| 'popover'`                      | `'tree'`               | Global submenu rendering strategy. `tree` expands children inline. `popover` renders children in a floating `Dropdown`. Overridable per item via `SidebarMenuItemSchema.renderMode`. |
| `orientation`         | `'vertical' \| 'horizontal'`               | `'vertical'`           | Layout direction. `horizontal` places top-level items in a row and forces `popover` mode for items with children.                                                                    |
| `mobileBreakpoint`    | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'none'`  | `'none'`               | When set (not `'none'`), the menu switches from `orientation` to `'vertical'` on screens smaller than the specified breakpoint.                                                      |
| `showTooltip`         | `boolean`                                  | `true`                 | Enables a tooltip showing the item label in `compact` or `horizontal` modes.                                                                                                         |
| `iconSize`            | `string`                                   | `'16px'`               | CSS size string applied to icon width/height in normal mode.                                                                                                                         |
| `compactIconSize`     | `string`                                   | `'20px'`               | CSS size string for icons when `compact` is `true`.                                                                                                                                  |
| `labelClass`          | `string`                                   | `'text-sm'`            | Tailwind class(es) applied to item labels in normal mode.                                                                                                                            |
| `compactLabelClass`   | `string`                                   | `'text-[11.5px] mt-1'` | Tailwind class(es) applied to labels when `compact` and `showCompactLabels` are both `true`.                                                                                         |
| `itemPadding`         | `string`                                   | `'py-2 px-2'`          | Tailwind padding classes applied to each item in normal mode.                                                                                                                        |
| `compactItemPadding`  | `string`                                   | `'py-2 px-1'`          | Tailwind padding classes applied to each item in compact mode.                                                                                                                       |
| `nestedMenuWidth`     | `string`                                   | `'220px'`              | CSS width of the floating popover menu for children.                                                                                                                                 |
| `nestedMenuMaxHeight` | `string`                                   | `'300px'`              | CSS max-height of the floating popover menu. Content scrolls beyond this height.                                                                                                     |
| `itemClass`           | `string`                                   | `''`                   | Additional CSS class(es) appended to every menu item element.                                                                                                                        |
| `menuOffset`          | `[number, number]`                         | `[0, 10]`              | `[x, y]` pixel offset for the popover menu position relative to its trigger.                                                                                                         |

---

## Type Definition

```ts
interface SidebarMenuItemSchema {
  id?: string
  // Unique identifier for expand/active tracking. Falls back to `to` then `label`.

  label: string
  // Display text shown in the menu.

  labelI18n?: string
  // i18n translation key. Overrides `label` if provided.

  icon?: string
  // Icon identifier string (e.g. 'lucide:home'). Rendered via <Icon>.

  to?: string | { path: string; [key: string]: any }
  // Vue Router navigation target. Renders as <router-link>.

  href?: string
  // External URL. Renders as <a target="_blank" rel="noopener noreferrer">.

  children?: SidebarMenuItemSchema[]
  // Nested submenu items (unlimited depth).

  badge?: string | number
  // Badge content shown to the right of the label (e.g. 'New', 3).

  badgeClass?: string
  // Tailwind classes applied to the badge element.
  // Default: 'bg-muted text-muted-foreground'

  disabled?: boolean
  // Disables the item. Applies opacity-50 and pointer-events-none.

  renderMode?: 'tree' | 'popover'
  // Per-item override of the global renderMode prop.

  action?: (item: SidebarMenuItemSchema) => void
  // Custom click handler called in addition to routing/navigation.
  // If the item has no `to` or `href`, this is the sole click behavior.

  class?: string
  // Additional CSS class(es) applied to this specific item's container.
}
```

---

## Internal Architecture

### Context (provide/inject)

`SidebarMenu` provides `sidebar-menu-ctx` to all `SidebarMenuItem` descendants:

```ts
interface SidebarMenuContext {
  activeItem: string | null
  expandedItems: string[]
  toggleExpand: (id: string) => void
  setActive: (id: string | null) => void
  indentSize: number
  variant: 'default' | 'ghost'
  renderMode: 'tree' | 'popover'
  renderNestedTabs: boolean      // From injected Navbar context
  compact: boolean
  showCompactLabels: boolean
  iconSize: string
  compactIconSize: string
  labelClass: string
  compactLabelClass: string
  itemPadding: string
  compactItemPadding: string
  nestedMenuWidth: string
  nestedMenuMaxHeight: string
  currentOrientation: 'vertical' | 'horizontal'
  showTooltip: boolean
}
```

### Route Synchronization

`SidebarMenu` watches `useRoute().path` and calls `syncWithRoute()` on every path change:

1. Recursively traverses the `items` tree.
2. Sets `activeItem` to the matching item's ID.
3. Pushes all ancestor IDs into `expandedItems` so parent groups auto-expand to reveal the active child.

Matching logic: exact path match OR prefix match (non-root, boundary-aware).

### `renderNestedTabs` Integration

When the parent `Navbar` has `renderNestedTabs="true"`:

- Clicking a top-level item calls `navbarCtx.setNestedTabs()` with its children mapped to `NavbarTabItem[]`.
- The `Navbar` renders these as a `NavbarTabs` bar at the top of `#main`.
- The inline chevron expand behavior is suppressed for depth-0 items.

### Render Mode Decision (per item, priority order)

1. If `isHorizontal` (depth 0) AND has children → **popover**
2. If `compact` AND has children → **popover**
3. If `renderNestedTabs` AND depth 0 → **tree** (chevron suppressed)
4. Item's own `renderMode` field (if set)
5. Global `renderMode` prop

### Smooth Expand/Collapse Animation

Tree-mode child groups use Vue `<Transition>` with JS hooks (`before-enter`, `enter`, `after-enter`, `before-leave`, `leave`) for smooth `height` + `opacity` animation — works for any content size.

---

## Usage

### Basic Vertical Menu

```vue
<script setup>
import { SidebarMenu } from 'vlite3'
import type { SidebarMenuItemSchema } from 'vlite3'

const items: SidebarMenuItemSchema[] = [
  { label: 'Dashboard', icon: 'lucide:layout-dashboard', to: '/dashboard' },
  {
    label: 'Projects',
    icon: 'lucide:folder',
    children: [
      { label: 'Active', to: '/projects/active' },
      { label: 'Archived', to: '/projects/archived' },
    ],
  },
  { label: 'Settings', icon: 'lucide:settings', to: '/settings' },
]
</script>

<template>
  <SidebarMenu :items="items" />
</template>
```

### With Badges, Disabled Items, and Custom Actions

```vue
<SidebarMenu
  :items="[
    {
      label: 'Inbox',
      icon: 'lucide:inbox',
      to: '/inbox',
      badge: 12,
      badgeClass: 'bg-primary/10 text-primary',
    },
    {
      label: 'Reports',
      icon: 'lucide:bar-chart',
      to: '/reports',
      badge: 'New',
      badgeClass: 'bg-green-100 text-green-700',
    },
    {
      label: 'Admin Panel',
      icon: 'lucide:shield',
      to: '/admin',
      disabled: true,
    },
    {
      label: 'Help & Support',
      icon: 'lucide:life-buoy',
      action: (item) => openHelpDrawer(),
    },
  ]" />
```

### Popover Mode for Nested Items

```vue
<SidebarMenu
  :items="[
    {
      label: 'Analytics',
      icon: 'lucide:bar-chart-3',
      renderMode: 'popover',
      children: [
        { label: 'Overview', to: '/analytics/overview' },
        { label: 'Performance', to: '/analytics/performance' },
        { label: 'Real-time', to: '/analytics/realtime' },
      ],
    },
  ]" />
```

### Compact (Icon-Only) Mode

```vue
<!-- Icons only — no labels -->
<SidebarMenu :items="items" :compact="true" compact-icon-size="22px" />

<!-- Icons + small labels below -->
<SidebarMenu
  :items="items"
  :compact="true"
  :show-compact-labels="true"
  compact-icon-size="20px"
  compact-label-class="text-[10px] mt-1" />
```

### Horizontal Navigation (Responsive)

```vue
<!-- Horizontal on md+ screens, collapses to vertical on smaller screens -->
<SidebarMenu
  :items="items"
  orientation="horizontal"
  mobile-breakpoint="md"
  icon-size="16px"
  :show-tooltip="false" />
```

### Default Expanded Groups

```vue
<!-- Open by label string -->
<SidebarMenu :items="items" :default-expanded="['Projects', 'Settings']" />

<!-- Open by item ID (preferred) -->
<SidebarMenu
  :items="[
    { id: 'proj', label: 'Projects', children: [...] },
    { id: 'cfg',  label: 'Config',   children: [...] },
  ]"
  :default-expanded="['proj']" />
```

### Prevent Multiple Open Groups

```vue
<SidebarMenu :items="items" :allow-multiple="false" />
```

### Mixed Render Modes

```vue
<SidebarMenu
  :items="[
    {
      label: 'Products',
      icon: 'lucide:package',
      renderMode: 'popover',
      children: [
        { label: 'All Products', to: '/products' },
        { label: 'Categories', to: '/products/categories' },
      ],
    },
    {
      label: 'Settings',
      icon: 'lucide:settings',
      children: [
        { label: 'Account', to: '/settings/account' },
        { label: 'Billing', to: '/settings/billing' },
      ],
    },
  ]"
  render-mode="tree" />
```

### Custom Sizing and Padding

```vue
<SidebarMenu
  :items="items"
  icon-size="20px"
  compact-icon-size="26px"
  label-class="text-base font-medium"
  compact-label-class="text-[11px] mt-1.5"
  item-padding="py-2.5 px-3"
  compact-item-padding="py-3 px-1.5"
  :indent-size="16" />
```

### Inside Navbar (Full App Shell)

```vue
<Navbar variant="sidebar">
  <template #header="{ toggle }">
    <div class="h-16 border-b flex items-center px-6">
      <button class="md:hidden" @click="toggle">
        <Icon icon="lucide:menu" />
      </button>
      <span class="font-bold">MyApp</span>
    </div>
  </template>

  <template #default>
    <!-- SidebarMenu automatically receives compact and renderNestedTabs
         context from Navbar via provide/inject -->
    <SidebarMenu
      :items="menuItems"
      :default-expanded="['Dashboard']"
      icon-size="18px" />
  </template>

  <template #main>
    <RouterView />
  </template>
</Navbar>
```

### External Links

```vue
<SidebarMenu
  :items="[
    { label: 'GitHub', icon: 'lucide:github', href: 'https://github.com/my-org/my-repo' },
    { label: 'Status Page', icon: 'lucide:activity', href: 'https://status.example.com' },
  ]" />
```

### i18n Labels

```vue
<SidebarMenu
  :items="[
    {
      label: 'Dashboard',
      labelI18n: 'nav.dashboard',
      icon: 'lucide:layout-dashboard',
      to: '/dashboard',
    },
    {
      label: 'Settings',
      labelI18n: 'nav.settings',
      icon: 'lucide:settings',
      to: '/settings',
    },
  ]" />
```

---

## SidebarMenuItem (Internal)

**Import:** `import { SidebarMenuItem } from 'vlite3'`

The recursive building block used internally. Reads all configuration from `sidebar-menu-ctx` injected by `SidebarMenu`. Direct use outside a `SidebarMenu` wrapper will throw a runtime error.

### SidebarMenuItem Props

| Prop         | Type                    | Default   | Description                                                                                             |
| :----------- | :---------------------- | :-------- | :------------------------------------------------------------------------------------------------------ |
| `item`       | `SidebarMenuItemSchema` | required  | The menu item data object to render.                                                                    |
| `depth`      | `number`                | `0`       | Current nesting depth, used for indent calculation. Incremented automatically for each recursive child. |
| `menuOffset` | `[number, number]`      | `[0, 10]` | Popover offset, forwarded from `SidebarMenu`.                                                           |
| `itemClass`  | `string`                | `''`      | Additional class(es) appended to the item element.                                                      |

---

## Accessibility

- Root `<nav>` has `role="tree"` and `aria-label="Sidebar Menu"`.
- `<router-link>` / `<a>` items carry `aria-current="page"` when active.
- Expandable items carry `aria-expanded` reflecting open/closed state.
- Popover triggers carry `aria-haspopup="true"` and `aria-expanded`.
- Disabled items receive `tabindex="-1"` via `pointer-events-none`.
- Chevron expand buttons are independently focusable with `tabindex="0"` and respond to `Enter`/`Space`.
- `focus-visible:ring-1 focus-visible:ring-primary/50` on all interactive elements.

---

## Notes & Best Practices

- **Prefer `id` over relying on `label` for `defaultExpanded`** — labels can change; IDs are stable.
- In `horizontal` mode, items with children always use `popover` regardless of `renderMode`.
- `compact` mode is best combined with a parent container having a fixed narrow width (e.g. `w-20`). `Navbar` does this automatically.
- The `action` callback fires on every click (before routing). Use it for side effects — not as a replacement for `to`/`href` navigation.
- `mobileBreakpoint` is independent of the parent `Navbar`'s `mobileBreakpoint`. They should typically match to avoid layout inconsistencies.
- When `renderMode="popover"` is used globally, deep nesting beyond 2 levels can be confusing. Consider flattening data or using `tree` mode for deeply nested structures.

# Navbar

**Import:** `import { Navbar, NavbarGroup, NavbarItem, NavbarTabs } from 'vlite3'`

The `Navbar` component is a versatile top-level navigation primitive. 
If you are looking to build a full application layout with sidebars and routing areas, you should use the new [`AppShell`](./app-shell.md) component instead. The `Navbar` is designed exclusively for horizontal header layouts (e.g. landing pages, standalone dashboards, simple navigation wrappers).

---

## Props

| Prop                 | Type                                               | Default       | Description                                                                                                                                                                                                |
| :------------------- | :------------------------------------------------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`            | `'header' \| 'sidebar'`                            | `'header'`    | Renders the nav either as a horizontal top bar or a vertically constrained block mapping. (Typically you use `header` for Navbar).                                                                                             |
| `position`           | `'fixed' \| 'sticky' \| 'relative' \| 'absolute'`  | `'sticky'`    | CSS positioning strategy applied to the nav element.                                                    |
| `centerPosition`     | `'center' \| 'left' \| 'right'`                    | `'center'`    | Controls the alignment of the `#center` slot content.                                                                                                                                |
| `glass`              | `boolean`                                          | `false`       | Enables a frosted glass `backdrop-blur` effect on scroll.                                                                                                                                                  |
| `border`             | `boolean`                                          | `true`        | Shows a bottom-border separator on the header. Disabled automatically when `floating` is true.                                                                                             |
| `floating`           | `boolean`                                          | `false`       | Applies a floating card style with margin, rounded corners, shadow, and a subtle border.                                                                                                                   |
| `class`              | `string`                                           | `''`          | Custom CSS class(es) appended to the root nav wrapper element.                                                                                                                                             |
| `height`             | `string`                                           | `'h-16'`      | Tailwind height class applied to the header container.                                                                                                                               |
| `compact`            | `boolean`                                          | `false`       | Enables compact mode. Passed via provide/inject to child `NavbarItem` components.                                            |
| `mobileBreakpoint`   | `'sm' \| 'md' \| 'lg' \| 'xl'`                     | `'md'`        | The Tailwind breakpoint at which the navbar switches from mobile (hamburger menu) to desktop layout slots.                                                                                                            |
| `contentClass`       | `string`                                           | `''`          | Additional CSS classes applied to the center container in the header.                                                                                  |
| `menuClass`          | `string`                                           | `''`          | Additional CSS classes applied to the mobile dropdown menu container (when `mobileMenuVariant="dropdown"`).                                                                                                |
| `rightClass`         | `string`                                           | `''`          | Additional CSS classes applied to the right-actions area.                                                                                                  |
| `mobileTriggerClass` | `string`                                           | `''`          | Additional CSS classes applied to the default hamburger toggle button.                                                                                                                                     |
| `mobileMenuVariant`  | `'sidepanel' \| 'dropdown'`                        | `'sidepanel'` | Controls how the mobile menu is displayed. `sidepanel` opens an animated drawer from the left; `dropdown` renders a full-width panel below the navbar.                                                     |

---

## Slots

| Slot              | Description                                                                                                                            | Scoped Props                                                                                     |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `#logo`           | Branding/logo area, rendered on the far left.                                          | —                                                                                                |
| `#left`           | Left nav links, placed right after the logo. Hidden on mobile.                                                 | —                                                                                                |
| `#center`         | Center content navigation. Alignment controlled by `centerPosition`.                              | —                                                                                                |
| `#right`          | Right action items (Buttons, User Avatars, Theme Toggles).                                                               | —                                                                                                |
| `#mobile-trigger` | Replaces the default hamburger `<button>`. Must handle open/close logic manually using scoped props.                                   | `{ isOpen: boolean, toggle: () => void }`                                                        |
| `#mobile-menu`    | Replaces the default mobile menu content (both `sidepanel` and `dropdown` variants). Renders the full content area of the mobile menu. By default, it mirrors `#left`, `#center`, and `#right`. | —                                                                                                |


---

## Usage

### Standard Top Header

```vue
<Navbar variant="header" position="sticky" glass>
  <template #logo>
    <div class="font-bold text-xl flex items-center gap-2">
      <Icon icon="lucide:box" /> MyBrand
    </div>
  </template>

  <template #left>
    <NavbarGroup>
      <NavbarItem label="Features" to="/features" />
      <NavbarItem label="Pricing" to="/pricing" />
      <NavbarItem label="Customers" to="/customers" />
    </NavbarGroup>
  </template>

  <!-- Centered search bar -->
  <template #center>
    <Input placeholder="Search..." icon="lucide:search" class="w-64" />
  </template>

  <template #right>
    <Button variant="ghost" size="sm">Log in</Button>
    <Button size="sm">Get Started</Button>
  </template>
</Navbar>
```

### Mobile Menu: Dropdown Variant

```vue
<Navbar mobile-menu-variant="dropdown" mobile-breakpoint="lg">
  <template #logo>
    <span class="font-bold">Brand</span>
  </template>

  <template #left>
    <NavbarGroup>
      <NavbarItem label="Products" to="/products" />
      <NavbarItem label="Solutions" to="/solutions" />
    </NavbarGroup>
  </template>

  <template #right>
    <Button size="sm">Sign In</Button>
  </template>

  <template #mobile-menu>
    <!-- Explicit mobile override -->
    <div class="flex flex-col p-2 space-y-1">
      <NavbarItem label="Products" to="/products" />
      <NavbarItem label="Solutions" to="/solutions" />
      <div class="h-px bg-border my-2" />
      <NavbarItem label="Sign In" to="/login" />
    </div>
  </template>
</Navbar>
```

### Custom Mobile Trigger

```vue
<Navbar variant="header">
  <template #logo>Brand</template>

  <template #mobile-trigger="{ isOpen, toggle }">
    <button class="p-2 rounded-md bg-primary text-white" @click="toggle">
      <Icon :icon="isOpen ? 'lucide:x' : 'lucide:menu'" />
    </button>
  </template>

  <template #left>
    <NavbarItem label="Home" to="/" />
  </template>
</Navbar>
```

---

## NavbarGroup

**Import:** `import { NavbarGroup } from 'vlite3'`

A simple layout wrapper that groups `NavbarItem` components either horizontally or vertically.

### NavbarGroup Props

| Prop          | Type                         | Default        | Description                                                                                                             |
| :------------ | :--------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Flex direction of the group. `horizontal` uses `flex-row items-center space-x-1`; `vertical` uses `flex-col space-y-1`. |
| `class`       | `string`                     | `''`           | Additional CSS classes on the wrapper div.                                                                              |

### NavbarGroup Usage

```vue
<!-- Horizontal group (default) for header nav links -->
<NavbarGroup>
  <NavbarItem label="Home" to="/" />
  <NavbarItem label="About" to="/about" />
  <NavbarItem label="Contact" to="/contact" />
</NavbarGroup>

<!-- Vertical group for stacked links (e.g. mobile menu) -->
<NavbarGroup orientation="vertical">
  <NavbarItem label="Home" to="/" />
  <NavbarItem label="About" to="/about" />
</NavbarGroup>
```

---

## NavbarItem

**Import:** `import { NavbarItem } from 'vlite3'`

A single navigation link or button within the navbar. Automatically detects the active route via Vue Router and supports icons, badges, disabled state, external links, and compact mode.

### NavbarItem Props

| Prop          | Type                                            | Default        | Description                                                                                                                           |
| :------------ | :---------------------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `to`          | `string`                                        | `—`            | Vue Router link target path. Renders as a `<router-link>`. Active state auto-detected from current route.                             |
| `href`        | `string`                                        | `—`            | External URL. Renders as an `<a>` tag with `target="_blank"` and `rel="noopener noreferrer"` when the URL starts with `http` or `//`. |
| `label`       | `string`                                        | `—`            | Link text. Also used as the tooltip content in compact mode. Can alternatively be provided via the default slot.                      |
| `icon`        | `string`                                        | `—`            | Leading icon identifier (e.g. `'lucide:home'`). Rendered via the `<Icon>` component.                                                  |
| `iconRight`   | `string`                                        | `—`            | Trailing icon identifier. Hidden in compact mode.                                                                                     |
| `active`      | `boolean`                                       | `false`        | Forces the active visual state regardless of the current route.                                                                       |
| `disabled`    | `boolean`                                       | `false`        | Disables all pointer events and applies `opacity-50`. Prevents click events.                                                          |
| `class`       | `string`                                        | `''`           | Additional CSS classes on the root component element.                                                                                 |
| `orientation` | `'horizontal' \| 'vertical'`                    | `'horizontal'` | Layout orientation (inferred from parent context; can be forced).                                                                     |
| `variant`     | `'default' \| 'pill' \| 'underline' \| 'ghost'` | `'ghost'`      | Visual style of the item.                                                                                                             |

### NavbarItem Variants

| Variant           | Active State                                           | Inactive State                                                            |
| :---------------- | :----------------------------------------------------- | :------------------------------------------------------------------------ |
| `ghost` (default) | `bg-primary-light text-primary-fg-light font-semibold` | `text-muted-foreground hover:bg-accent hover:text-foreground`             |
| `pill`            | `bg-primary text-primary-fg shadow-sm`                 | `text-muted-foreground hover:bg-accent hover:text-foreground`             |
| `underline`       | `text-primary border-b-2 border-primary rounded-none`  | `text-muted-foreground border-b-2 border-transparent hover:border-border` |
| `default`         | `text-foreground font-semibold`                        | `text-muted-foreground hover:text-foreground`                             |

### NavbarItem Slots

| Slot      | Description                                                                                                   |
| :-------- | :------------------------------------------------------------------------------------------------------------ |
| `default` | Replaces the label text.                                                                                      |
| `badge`   | Renders additional content (e.g. a count badge) aligned to the far right of the item. Hidden in compact mode. |

### NavbarItem Emits

| Event   | Payload      | Description                                                     |
| :------ | :----------- | :-------------------------------------------------------------- |
| `click` | `MouseEvent` | Emitted when the item is clicked (not emitted when `disabled`). |

### NavbarItem Usage

```vue
<!-- Basic router link -->
<NavbarItem label="Dashboard" to="/dashboard" />

<!-- With leading and trailing icons -->
<NavbarItem label="Settings" to="/settings" icon="lucide:settings" icon-right="lucide:chevron-right" />

<!-- External link -->
<NavbarItem label="Documentation" href="https://docs.example.com" icon="lucide:external-link" />

<!-- Forced active state -->
<NavbarItem label="Reports" to="/reports" :active="true" />

<!-- Disabled -->
<NavbarItem label="Billing" to="/billing" :disabled="true" />

<!-- Pill variant -->
<NavbarItem label="New" to="/new" variant="pill" />

<!-- Underline variant (suited for tab-style headers) -->
<NavbarItem label="Overview" to="/overview" variant="underline" />

<!-- With badge slot -->
<NavbarItem label="Notifications" to="/notifications" icon="lucide:bell">
  <template #badge>
    <span class="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">12</span>
  </template>
</NavbarItem>

<!-- Custom label content via default slot -->
<NavbarItem to="/profile" icon="lucide:user">
  <span class="font-semibold text-primary">John Doe</span>
</NavbarItem>
```

---

## NavbarTabs

**Import:** `import { NavbarTabs } from 'vlite3'`
**Types:** `import type { NavbarTabItem, NavbarTabsVariant, NavbarTabsSize } from 'vlite3'`

A horizontal, router-linked tab bar with automatic overflow detection, scroll fade indicators, and keyboard accessibility.

### NavbarTabs Props

| Prop            | Type                | Default   | Description                                                               |
| :-------------- | :------------------ | :-------- | :------------------------------------------------------------------------ |
| `items`         | `NavbarTabItem[]`   | required  | Array of tab definitions. Each must have a `label` and a `to` route path. |
| `variant`       | `NavbarTabsVariant` | `'solid'` | Visual style of the tabs.                                                 |
| `size`          | `NavbarTabsSize`    | `'md'`    | Size of the tab items, controlling padding and font size.                 |
| `activeClass`   | `string`            | `''`      | Overrides the default active tab CSS classes entirely.                    |
| `inactiveClass` | `string`            | `''`      | Overrides the default inactive tab CSS classes entirely.                  |
| `class`         | `string`            | `''`      | Custom class applied to the root wrapper element.                         |

### NavbarTabs Types

```ts
export interface NavbarTabItem {
  label: string
  labelI18n?: string
  to: string
  icon?: string
  iconRight?: string
  disabled?: boolean
  exact?: boolean
}

export type NavbarTabsVariant = 'line' | 'pill' | 'solid' | 'ghost'
export type NavbarTabsSize = 'sm' | 'md' | 'lg'
```

### NavbarTabs Variants

| Variant | Container Style                  | Active Style                                    | Inactive Style                                                            |
| :------ | :------------------------------- | :---------------------------------------------- | :------------------------------------------------------------------------ |
| `line`  | `border-b border-border`         | `text-primary border-b-2 border-primary -mb-px` | `text-muted-foreground border-b-2 border-transparent hover:border-border` |
| `pill`  | `p-1 bg-secondary/80 rounded-lg` | `bg-background text-foreground shadow-sm`       | `text-muted-foreground hover:bg-accent/60`                                |
| `solid` | `flex gap-0`                     | `bg-primary-light text-primary-dark`            | `text-muted-foreground hover:bg-accent`                                   |
| `ghost` | `flex gap-1`                     | `bg-accent text-accent-foreground`              | `text-muted-foreground hover:bg-accent/60`                                |

### NavbarTabs Sizes

| Size | Padding         | Font Size   |
| :--- | :-------------- | :---------- |
| `sm` | `px-2.5 py-1.5` | `text-xs`   |
| `md` | `px-3.5 py-2`   | `text-sm`   |
| `lg` | `px-5 py-2.5`   | `text-base` |

### NavbarTabs Features

- Uses `<RouterLink>` with proper `aria-selected` and `role="tab"` attributes.
- Horizontal overflow with a hidden scrollbar (scroll still works via touch/trackpad).
- Fade gradient overlay + chevron buttons appear automatically when tabs overflow the container.
- The active tab is scrolled into view on every route change via `scrollIntoView`.
- **Smart active matching**: boundary-aware prefix check — `/button` does NOT match `/buttongroup`. Exact matching forced when `item.exact = true` or `item.to = '/'`.

### NavbarTabs Usage

```vue
<!-- Line tabs (default) -->
<NavbarTabs
  :items="[
    { label: 'Overview', to: '/project/overview' },
    { label: 'Issues', to: '/project/issues' },
    { label: 'Settings', to: '/project/settings' },
  ]"
  variant="line"
  size="md" />

<!-- With icons -->
<NavbarTabs
  :items="[
    { label: 'General', to: '/settings/general', icon: 'lucide:settings' },
    { label: 'Profile', to: '/settings/profile', icon: 'lucide:user' },
    { label: 'Security', to: '/settings/security', icon: 'lucide:shield' },
  ]"
  variant="line" />

<!-- Pill style -->
<NavbarTabs
  :items="[
    { label: 'All', to: '/items/all' },
    { label: 'Active', to: '/items/active' },
    { label: 'Archived', to: '/items/archived' },
  ]"
  variant="pill"
  size="sm" />

<!-- Disabled tab -->
<NavbarTabs
  :items="[
    { label: 'Available', to: '/tab/a' },
    { label: 'Coming Soon', to: '/tab/b', disabled: true },
  ]"
  variant="solid" />

<!-- Exact route matching -->
<NavbarTabs
  :items="[
    { label: 'Root', to: '/', exact: true },
    { label: 'Docs', to: '/docs' },
  ]"
  variant="ghost" />

<!-- Custom active/inactive class overrides -->
<NavbarTabs
  :items="tabs"
  variant="line"
  active-class="text-purple-600 border-b-2 border-purple-600 -mb-px"
  inactive-class="text-gray-400 border-b-2 border-transparent hover:text-gray-600" />
```

---

## Type Reference

```ts
export type NavbarVariant = 'header' | 'sidebar'
export type NavbarPosition = 'fixed' | 'sticky' | 'relative' | 'absolute'
export type NavbarCenterPosition = 'center' | 'left' | 'right'

export interface NavbarProps {
  variant?: NavbarVariant
  position?: NavbarPosition
  centerPosition?: NavbarCenterPosition
  glass?: boolean
  border?: boolean
  floating?: boolean
  class?: string
  height?: string
  compact?: boolean
  mobileBreakpoint?: 'sm' | 'md' | 'lg' | 'xl'
  logoClass?: string
  contentClass?: string
  menuClass?: string
  rightClass?: string
  mobileTriggerClass?: string
  mobileMenuVariant?: 'sidepanel' | 'dropdown'
}
```

---

## RTL

Under `html[dir=rtl]`:

- Sidebar borders and fixed positioning use logical `start` / `border-e` utilities
- Mobile drawer docks to **inline-start** (SidePanel `position="left"` = start)
- `NavbarTabs` overflow arrows, fades, and scroll direction follow start/end (same helpers as Tabes)
- Compact-mode tooltips open toward the content (`left` in RTL, `right` in LTR)

## Notes & Best Practices

- Use `Navbar` solely for headers or simple side panels without integrated app layouts. To architect layouts with connected routes, sidebars, and nested tabs dynamically routing the page, you must use [`AppShell`](./app-shell.md).
- When using `mobileMenuVariant="dropdown"`, the parent must be a positioned container for correct stacking (or attach CSS directly to the parent layout).
- The mobile `SidePanel` and `dropdown` menus cleanly mirror `#left`, `#center`, and `#right` content. Using `#mobile-menu` overrides them entirely.

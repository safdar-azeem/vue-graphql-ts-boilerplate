# Navbar

**Import:** `import { Navbar, NavbarGroup, NavbarItem, NavbarTabs } from 'vlite3'`

The `Navbar` component is a versatile navigation primitive that supports two modes:

- **Header** (`variant="header"`) — A horizontal top navigation bar.
- **Sidebar** (`variant="sidebar"`) — A vertical side navigation panel.

When the `#header` and `#main` slots are both provided, it automatically enters **Layout Mode**, acting as a full-page application shell with an integrated sidebar and main content area.

---

## Props

| Prop                 | Type                                               | Default       | Description                                                                                                                                                                                                |
| :------------------- | :------------------------------------------------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`            | `'header' \| 'sidebar'`                            | `'header'`    | Layout mode of the navbar. `header` renders a horizontal top bar; `sidebar` renders a vertical side panel.                                                                                                 |
| `position`           | `'fixed' \| 'sticky' \| 'relative' \| 'absolute'`  | `'sticky'`    | CSS positioning strategy applied to the nav element. In Layout Mode, `fixed` and `absolute` are normalized to `relative` for proper flex child behavior.                                                   |
| `centerPosition`     | `'center' \| 'left' \| 'right'`                    | `'center'`    | Controls the alignment of the `#center` slot content (Header variant only).                                                                                                                                |
| `glass`              | `boolean`                                          | `false`       | Enables a frosted glass `backdrop-blur` effect on scroll.                                                                                                                                                  |
| `border`             | `boolean`                                          | `true`        | Shows a `border-b` (header) or `border-r` (sidebar) separator. Disabled automatically when `floating` is true.                                                                                             |
| `floating`           | `boolean`                                          | `false`       | Applies a floating card style with margin, rounded corners, shadow, and a subtle border.                                                                                                                   |
| `class`              | `string`                                           | `''`          | Custom CSS class(es) appended to the root nav wrapper element.                                                                                                                                             |
| `height`             | `string`                                           | `'h-16'`      | Tailwind height class applied to the header container (Header variant only).                                                                                                                               |
| `width`              | `string`                                           | `'w-64'`      | Tailwind width class for the sidebar (Sidebar variant only, applied via layout).                                                                                                                           |
| `compact`            | `boolean`                                          | `false`       | Enables compact/collapsed mode. In sidebar, this collapses the nav to icons only. Passed via provide/inject to child `NavbarItem` and `SidebarMenu` components.                                            |
| `renderNestedTabs`   | `boolean`                                          | `false`       | When `true` (Layout Mode only), clicking a top-level sidebar item with children extracts those children and renders them as a `NavbarTabs` bar at the top of the `#main` slot instead of expanding inline. |
| `logo`               | `string`                                           | `—`           | URL for a logo image. If provided, renders an `<img>` tag inside the `#logo` slot fallback.                                                                                                                |
| `logoAlt`            | `string`                                           | `—`           | Alt text for the logo image (used with the `logo` prop).                                                                                                                                                   |
| `mobileBreakpoint`   | `'sm' \| 'md' \| 'lg' \| 'xl'`                     | `'md'`        | The Tailwind breakpoint at which the navbar switches from mobile (hamburger) to desktop layout.                                                                                                            |
| `logoClass`          | `string`                                           | `''`          | Additional CSS classes applied to the logo container wrapper div.                                                                                                                                          |
| `contentClass`       | `string`                                           | `''`          | Additional CSS classes applied to the main content/scrollable area of the sidebar, or the center container in the header.                                                                                  |
| `menuClass`          | `string`                                           | `''`          | Additional CSS classes applied to the mobile dropdown menu container (when `mobileMenuVariant="dropdown"`).                                                                                                |
| `rightClass`         | `string`                                           | `''`          | Additional CSS classes applied to the right-actions area (header) or bottom-pinned footer area (sidebar).                                                                                                  |
| `mobileTriggerClass` | `string`                                           | `''`          | Additional CSS classes applied to the default hamburger toggle button.                                                                                                                                     |
| `mobileMenuVariant`  | `'sidepanel' \| 'dropdown'`                        | `'sidepanel'` | Controls how the mobile menu is displayed. `sidepanel` opens an animated drawer from the left; `dropdown` renders a full-width panel below the navbar.                                                     |
| `sidebarToggle`      | `boolean`                                          | `false`       | Enables the desktop sidebar toggle feature (Layout Mode only). Renders a panel-left toggle before the logo. Preference is persisted in `localStorage` under `vlite-navbar-sidebar-visible`.               |
| `breadcrumb`         | `boolean`                                          | `false`       | When `true`, auto-generates a `Breadcrumb` from the current route path. Works in Layout Mode.                                                                                                              |
| `breadcrumbPosition` | `'header' \| 'main'`                               | `'header'`    | Where to render the breadcrumb: inside the header area or above the main content.                                                                                                                          |
| `breadcrumbVariant`  | `BreadcrumbVariant`                                | `'default'`   | Visual variant forwarded to the internal `<Breadcrumb>` component.                                                                                                                                         |
| `breadcrumbSeparator`| `BreadcrumbSeparator`                              | `'chevron'`   | Separator style (`'chevron'`, `'slash'`, etc.) forwarded to `<Breadcrumb>`.                                                                                                                                |
| `breadcrumbSize`     | `BreadcrumbSize`                                   | `'sm'`        | Size forwarded to `<Breadcrumb>`.                                                                                                                                                                          |
| `breadcrumbLabels`   | `Record<string, string>`                           | `—`           | Override auto-generated route labels by path, e.g. `{ '/settings': 'Preferences' }`.                                                                                                                      |
| `breadcrumbHomeIcon` | `string`                                           | `'lucide:home'`| Icon for the home breadcrumb segment.                                                                                                                                                                      |
| `breadcrumbClass`    | `string`                                           | `''`          | Extra CSS classes applied to the breadcrumb wrapper element.                                                                                                                                               |

---

## Slots

| Slot              | Description                                                                                                                            | Scoped Props                                                                                     |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `#header`         | Renders a full-width top header bar **and** activates Layout Mode. Must be used alongside `#main`.                                     | `{ isOpen, toggle, sidebarVisible, toggleSidebar, breadcrumbItems }`                             |
| `#main`           | Renders the main content area to the right of the sidebar in Layout Mode.                                                              | —                                                                                                |
| `#logo`           | Branding/logo area. In header, shown on the left. In sidebar, shown at the top above content.                                          | —                                                                                                |
| `#left`           | Left nav links (Header) or top section content (Sidebar). In header, hidden on mobile.                                                 | —                                                                                                |
| `#center`         | Center content (Header) or middle scrollable section (Sidebar). Alignment controlled by `centerPosition`.                              | —                                                                                                |
| `#right`          | Right action items (Header) or bottom-pinned footer (Sidebar, bordered).                                                               | —                                                                                                |
| `#mobile-trigger` | Replaces the default hamburger `<button>`. Must handle open/close logic manually using scoped props.                                   | `{ isOpen: boolean, toggle: () => void }`                                                        |
| `#mobile-menu`    | Replaces the default mobile menu content (both `sidepanel` and `dropdown` variants). Renders the full content area of the mobile menu. | —                                                                                                |
| `#default`        | Primary scrollable content area of the sidebar (typically a `<SidebarMenu>`). Rendered between `#left` and `#center`.                  | —                                                                                                |

### `#header` Scoped Props (detailed)

| Prop             | Type         | Description                                                         |
| :--------------- | :----------- | :------------------------------------------------------------------ |
| `isOpen`         | `boolean`    | Mobile menu open state.                                             |
| `toggle`         | `() => void` | Toggles the mobile menu open/closed.                                |
| `sidebarVisible` | `boolean`    | Whether the desktop sidebar is currently visible (`sidebarToggle`). |
| `toggleSidebar`  | `() => void` | Show/hide the desktop sidebar. Persisted in localStorage.           |
| `breadcrumbItems`| `BreadcrumbItem[]` | Auto-generated breadcrumb items from the current route.       |

---

## Internal Behavior

### Layout Mode

Activated when both `#header` and `#main` slots are provided. In Layout Mode:

- The component renders a full-page flex column wrapper (`.vlite-app-layout`).
- `#header` spans the full width as a `<header>` element.
- A flex row beneath contains the `<nav>` (sidebar) and `<main>` side by side.
- The `<nav>` is hidden on mobile (below `mobileBreakpoint`) since the SidePanel drawer handles mobile navigation.
- When `renderNestedTabs` is `true` and a sidebar item with children is selected, the `Navbar` renders a `NavbarTabs` bar at the top of `#main`.

### Sidebar Toggle (Desktop)

When `sidebarToggle="true"` and in Layout Mode:

- The sidebar visibility state is stored in `localStorage` under `vlite-navbar-sidebar-visible`.
- A smooth width + opacity CSS transition hides/shows the sidebar without jarring layout jumps.
- Mobile breakpoint behavior is completely unaffected — only visible/functional above `mobileBreakpoint`.

### Scroll Detection

A passive `scroll` listener updates `isScrolled` (true when `window.scrollY > 10`), which drives:

- The `glass` blur effect.
- A subtle `shadow-sm` when `position="sticky"` and not floating.

### Mobile Menu

Below `mobileBreakpoint`, the hamburger trigger appears. Two variants:

- **`sidepanel` (default):** Left-side `<SidePanel>` drawer. Logo renders in the panel header.
- **`dropdown`:** Absolutely positioned full-width panel below the navbar, closed by `onClickOutside`.

### Route Watching

A `watch` on `useRoute().path` automatically closes the mobile menu on every route change.

### Provide/Inject Context

```ts
provide('navbar-context', {
  compact: computed(() => props.compact),
  renderNestedTabs: computed(() => props.renderNestedTabs),
  setNestedTabs: (tabs: NavbarTabItem[], activeTab: string | number) => void,
})
```

All `SidebarMenu` and `NavbarItem` descendants receive this context automatically — no manual prop passing needed.

---

## Usage

### App Layout Mode (Full Structure)

```vue
<Navbar variant="sidebar">
  <template #header="{ toggle }">
    <div class="h-16 border-b bg-white w-full flex items-center justify-between px-6">
      <div class="flex items-center gap-4">
        <button class="md:hidden" @click="toggle">
          <Icon icon="lucide:menu" />
        </button>
        <span class="font-bold text-lg">My App</span>
      </div>
      <Avatar fallback="JD" />
    </div>
  </template>

  <template #default>
    <SidebarMenu :items="menuItems" />
  </template>

  <template #main>
    <div class="p-6">
      <RouterView />
    </div>
  </template>
</Navbar>
```

### Standard Top Header

```vue
<Navbar variant="header" position="sticky">
  <template #logo>
    <span class="font-bold text-xl">MyBrand</span>
  </template>

  <template #left>
    <NavbarGroup>
      <NavbarItem label="Dashboard" to="/" />
      <NavbarItem label="Products" to="/products" />
      <NavbarItem label="Pricing" to="/pricing" />
    </NavbarGroup>
  </template>

  <template #center>
    <Input placeholder="Search..." icon="lucide:search" class="w-64" />
  </template>

  <template #right>
    <Button variant="ghost" size="sm">Log in</Button>
    <Button size="sm">Sign up</Button>
  </template>
</Navbar>
```

### Standalone Sidebar

```vue
<div class="flex h-screen">
  <Navbar variant="sidebar" position="relative" class="w-64 h-full border-r bg-white">
    <template #logo>
      <div class="flex items-center gap-2 font-bold">
        <Icon icon="lucide:box" /> Dashboard
      </div>
    </template>

    <template #default>
      <SidebarMenu :items="menuItems" />
    </template>

    <template #right>
      <Button variant="ghost" class="w-full justify-start" icon="lucide:log-out">
        Logout
      </Button>
    </template>
  </Navbar>

  <main class="flex-1 overflow-auto p-8">
    <!-- Page content -->
  </main>
</div>
```

### Layout Mode with `renderNestedTabs`

Clicking a top-level item with children surfaces those children as tabs in the main area instead of expanding inline.

```vue
<Navbar variant="sidebar" :render-nested-tabs="true">
  <template #header="{ toggle }">
    <div class="h-16 border-b bg-white flex items-center px-6 w-full">
      <button class="md:hidden mr-4" @click="toggle">
        <Icon icon="lucide:menu" />
      </button>
      <span class="font-bold">TabApp</span>
    </div>
  </template>

  <template #default>
    <SidebarMenu :items="menuItems" />
  </template>

  <template #main>
    <div class="p-6">
      <RouterView />
    </div>
  </template>
</Navbar>
```

### Desktop Sidebar Toggle

```vue
<Navbar variant="sidebar" :sidebar-toggle="true">
  <template #header="{ toggle, toggleSidebar, sidebarVisible }">
    <div class="h-16 border-b bg-white flex items-center justify-between px-6 w-full">
      <div class="flex items-center gap-4">
        <!-- Mobile hamburger -->
        <button class="md:hidden" @click="toggle">
          <Icon icon="lucide:menu" />
        </button>
        <!-- Desktop sidebar toggle -->
        <button
          class="hidden md:flex p-2 rounded-md text-muted-foreground hover:bg-accent"
          :aria-label="sidebarVisible ? 'Hide sidebar' : 'Show sidebar'"
          @click="toggleSidebar">
          <Icon icon="lucide:panel-left" class="w-5 h-5" />
        </button>
        <span class="font-bold text-lg">My App</span>
      </div>
    </div>
  </template>

  <template #default>
    <SidebarMenu :items="menuItems" />
  </template>

  <template #main>
    <div class="p-6">
      <RouterView />
    </div>
  </template>
</Navbar>
```

### Auto Breadcrumb

```vue
<Navbar variant="sidebar" breadcrumb breadcrumb-position="header" breadcrumb-separator="slash">
  <template #header="{ toggle, breadcrumbItems }">
    <div class="h-16 border-b bg-white flex items-center px-6 w-full gap-6">
      <button class="md:hidden" @click="toggle">
        <Icon icon="lucide:menu" />
      </button>
      <span class="font-bold">App</span>
      <!-- breadcrumbItems is auto-generated from current route -->
      <Breadcrumb v-if="breadcrumbItems.length > 1" :items="breadcrumbItems" separator="slash" size="sm" />
    </div>
  </template>

  <template #default>
    <SidebarMenu :items="menuItems" />
  </template>

  <template #main>
    <RouterView />
  </template>
</Navbar>
```

### Mobile Menu: Dropdown Variant

```vue
<Navbar variant="header" mobile-menu-variant="dropdown" mobile-breakpoint="lg">
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

### Slot Class Customization

```vue
<Navbar
  variant="sidebar"
  position="relative"
  logoClass="bg-blue-50 border-b border-blue-100"
  contentClass="bg-gray-50"
  rightClass="bg-white border-t border-gray-200"
  class="w-64 h-screen">
  <template #logo>
    <div class="font-bold text-blue-700">My App</div>
  </template>
  <template #default>
    <SidebarMenu :items="menuItems" />
  </template>
  <template #right>
    <div class="text-sm text-gray-500">v2.1.0</div>
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

### NavbarItem Compact Mode

When the parent `Navbar` has `compact="true"`, `isCompact` becomes `true` (via `navbar-context` inject). In compact mode:

- Label text is hidden (`md:hidden`).
- `iconRight` and badge content are hidden.
- Layout switches to `justify-center`.
- A `Tooltip` with the `label` appears on the right side for discoverability.

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
  renderNestedTabs?: boolean
  logo?: string
  logoAlt?: string
  mobileBreakpoint?: 'sm' | 'md' | 'lg' | 'xl'
  logoClass?: string
  contentClass?: string
  menuClass?: string
  rightClass?: string
  mobileTriggerClass?: string
  mobileMenuVariant?: 'sidepanel' | 'dropdown'
  sidebarToggle?: boolean
  breadcrumb?: boolean
  breadcrumbPosition?: 'header' | 'main'
  breadcrumbVariant?: BreadcrumbVariant
  breadcrumbSeparator?: BreadcrumbSeparator
  breadcrumbSize?: BreadcrumbSize
  breadcrumbLabels?: Record<string, string>
  breadcrumbHomeIcon?: string
  breadcrumbClass?: string
}
```

---

## Notes & Best Practices

- **Layout Mode requires both `#header` and `#main` slots.** Providing only one will not activate Layout Mode.
- **`renderNestedTabs` only works in Layout Mode.** It requires `#main` to render the tab bar.
- In Layout Mode, set `height` on your `#header` content directly; the `height` prop only affects standalone `variant="header"` containers.
- The `compact` prop propagates via `provide/inject`. `NavbarItem` and `SidebarMenu` inside the Navbar receive it automatically.
- When using `mobileMenuVariant="dropdown"`, the parent must be a positioned container for correct stacking.
- The mobile `SidePanel` and `dropdown` menus mirror `#left`, `#center`, and `#right` content. Using `#mobile-menu` overrides them entirely.
- `sidebarToggle` is only functional in Layout Mode. It has no effect in standalone `variant="header"` or `variant="sidebar"` usage.

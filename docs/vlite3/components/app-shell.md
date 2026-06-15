# AppShell

**Import:** `import { AppShell } from 'vlite3'`

The `AppShell` component is a high-level layout orchestrator designed to serve as the foundational structure of your web application. It handles the dynamic arrangement of sidebars, main content areas, headers, and mobile drawers (SidePanel) gracefully.

By using `AppShell`, you separate the concern of *where* your UI elements live from *what* they are, utilizing semantic slots.

---

## Props

| Prop                 | Type                                                    | Default           | Description                                                                                                                                                                                                |
| :------------------- | :------------------------------------------------------ | :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `layoutMode`         | `'variant1' \| 'variant2' \| 'variant3' \| 'variant4' \| 'variant5' \| 'variant6'` | `'variant1'` | Controls the layout structure. <br>• `variant1`: Sidebar spans full height... <br>• `variant6`: Slot-based storefront header. |
| `variant`            | `'sidebar' \| 'header'`                                 | `'sidebar'`       | The root layout mode behavior. `'sidebar'` provides left-nav layout, `'header'` provides top-nav structures.                                 |
| `position`           | `'fixed' \| 'sticky' \| 'relative' \| 'absolute'`       | `'sticky'`        | Controls the CSS position of the layout components (header/sidebar).                                                                         |
| `glass`              | `boolean`                                               | `false`           | Enables an Apple-like frosted glass blur effect (`backdrop-blur`) on the header and floating elements.                                        |
| `border`             | `boolean`                                               | `true`            | Enables separating borders on the layout regions.                                                                                             |
| `floating`           | `boolean`                                               | `false`           | Adds margins and rounding to create a "floating" app shell visual effect.                                                                     |
| `height`             | `string`                                                | `'h-16'`          | Tailwind class to dictate the height of the top header bar.                                                                                  |
| `compact`            | `boolean`                                               | `false`           | Enables compact/collapsed mode for the main sidebar. Passed via provide/inject to child `SidebarMenu` components.                            |
| `hideSidebar`        | `boolean`                                               | `false`           | Hides the sidebar (using `v-show`). Keeps `renderNestedTabs` functioning even if hidden.                                                      |
| `hideHeader`         | `boolean`                                               | `false`           | Hides the header (using `v-show`). Keeps `renderNestedTabs` functioning even if hidden.                                                       |
| `sidebarToggle`      | `boolean`                                               | `false`           | Enables the desktop sidebar toggle feature. Renders a toggle if configured via `#header`. Preference is persisted in `localStorage`.         |
| `renderNestedTabs`   | `boolean`                                               | `false`           | When `true`, clicking a top-level sidebar item with children extracts those children and renders them as a `NavbarTabs` bar at the top of `#main`. |
| `mobileBreakpoint`   | `'sm' \| 'md' \| 'lg' \| 'xl'`                          | `'md'`            | The Tailwind breakpoint at which the layout switches from mobile (hamburger drawer) to the full desktop sidebar layout.                      |
| `contentClass`       | `string`                                                | `''`              | Additional CSS classes applied to the main scrollable area.                                                                                  |
| `rightClass`         | `string`                                                | `''`              | Additional CSS classes applied to the bottom-pinned footer area (`#sidebar-footer`) or right header section.                                 |
| `menuClass`          | `string`                                                | `''`              | Additional CSS classes applied to the menu wrapper.                                                                                          |
| `mobileTriggerClass` | `string`                                                | `''`              | Additional CSS classes applied to the mobile hamburger menu toggle button.                                                                   |
| `mobileMenuVariant`  | `'sidepanel' \| ...`                                    | `'sidepanel'`     | Determines the rendering strategy for the mobile menu container.                                                                             |
| `breadcrumb`         | `boolean`                                               | `false`           | When `true`, auto-generates a `Breadcrumb` using current route data.                                                                         |
| `breadcrumbPosition` | `'header' \| 'main'`                                    | `'header'`        | Where to render the breadcrumb automatically: inside the scoped header slot or auto-injected above the main content.                         |
| `breadcrumbVariant`  | `BreadcrumbVariant`                                     | `'default'`       | Visual variant forwarded to the internal `<Breadcrumb>` component.                                                                           |
| `breadcrumbSeparator`| `BreadcrumbSeparator`                                   | `'chevron'`       | Separator style (`'chevron'`, `'slash'`, etc.) forwarded to `<Breadcrumb>`.                                                                  |
| `breadcrumbSize`     | `BreadcrumbSize`                                        | `'sm'`            | Size forwarded to `<Breadcrumb>`.                                                                                                            |
| `breadcrumbHomeIcon` | `string`                                                | `'lucide:home'`   | Icon name for the root breadcrumb link.                                                                                                      |
| `breadcrumbClass`    | `string`                                                | `''`              | Additional CSS classes for the breadcrumb wrapper.                                                                                           |
| `breadcrumbLabels`   | `Record<string, string>`                                | `—`               | Override auto-generated route labels by path, e.g. `{ '/settings': 'Preferences' }`.                                                         |
| `categoryRoutePrefix`| `string`                                                | `''`              | Storefront helper. Provides a category route prefix to nested `CategoryMenu` instances and exposes it to the `#categories` slot.             |

---

## Slots

The `AppShell` uses an advanced slot architecture. You declare the elements for your desktop layout, and they are automatically carried over to your mobile drawer—with the option to independently override the mobile drawer content if desired.

### App Structure Slots
| Slot              | Description                                                                                                                            | Scoped Props                                                                                     |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `#header`         | Renders the top application header.                                     | `{ isOpen, toggle,  sidebarVisible, toggleSidebar, breadcrumbItems, pageTitle }`                             |
| `#main`           | Renders the main content area (e.g., your `<RouterView>`).                                                              | —                                                                                                |

### Desktop Sidebar Slots
| Slot              | Description                                                                                                                            | Scoped Props                                                                                     |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| `#sidebar-header` | The top section of the desktop sidebar (e.g., Branding or Logo).                                          | —                                                                                                |
| `#sidebar`        | Primary scrollable content area of the desktop sidebar (typically a `<SidebarMenu>`).                  | —                                                                                                |
| `#sidebar-footer` | Bottom-pinned footer of the desktop sidebar (e.g. Account Switcher, Logout, Theme Toggles).                                                               | —                                                                                                |

### Mobile Drawer (SidePanel) Slots
*By default, if you don't define these mobile slots, they perfectly mirror their desktop counterparts (`#sidebar-header`, `#sidebar`, `#sidebar-footer`). Use these only if your mobile menu needs a highly different structural format.*

| Slot              | Description                                                                                                                            |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `#mobile-sidebar-header` | Overrides `#sidebar-header` in mobile view.                                          |
| `#mobile-sidebar`        | Overrides `#sidebar` in mobile view.                  |
| `#mobile-sidebar-footer` | Overrides `#sidebar-footer` in mobile view.                                                               |

### Storefront Layout Slots (`layout-mode="variant6"`)
The storefront layout provides structural regions for maximum flexibility. Use standard Tailwind classes (e.g., `hidden md:flex`) within these slots to handle responsive visibility.

| Slot              | Description                                                                                                                            |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `#announcement`   | Optional full-width bar above the storefront header.                                                                                    |
| `#mobile-trigger` | Overrides the mobile drawer trigger. Scoped with `{ isOpen, toggle }`.                                                                  |
| `#left`           | Left region of the main header (typically used for Brand/Logo).                                                                         |
| `#center`         | Center region of the main header (typically used for desktop navigation).                                                               |
| `#right`          | Right region of the main header (typically used for search, cart, and profile actions).                                                 |
| `#mobile-bottom`  | An optional full-width row underneath the main header, visible on mobile (typically used for mobile search inputs).                     |
| `#categories`     | Desktop category/navigation rail below the main header row. Scoped with `{ categoryRoutePrefix }`.                                      |
| `#mobile-sidebar-header`| Top locked section of the mobile sidepanel (typically used for the mobile logo).                                                        |
| `#mobile-sidebar` | Scrollable body of the mobile sidepanel (typically used for mobile navigation and categories). Scoped with `{ categoryRoutePrefix }`.   |
| `#mobile-sidebar-footer`| Bottom locked section of the mobile sidepanel (typically used for locale or login buttons).                                             |
| `#footer`         | Optional footer below the scrollable main area.                                                                                         |


### Scoped Props in `#header`

When using the `<template #header>` slot, you are granted several powerful scoped properties to build your own custom functional top-bar:

| Prop             | Type         | Description                                                         |
| :--------------- | :----------- | :------------------------------------------------------------------ |
| `isOpen`         | `boolean`    | Current state of the mobile side drawer.                                             |
| `toggle`         | `() => void` | Toggles the mobile side drawer open/closed. Attach this to a hamburger icon!                             |
| `sidebarVisible` | `boolean`    | Whether the desktop sidebar is currently visible (requires `sidebarToggle`). |
| `toggleSidebar`  | `() => void` | Show/hide the desktop sidebar dynamically.           |
| `breadcrumbItems`| `BreadcrumbItem[]` | Auto-generated breadcrumb array from the current route. To be fed into `<Breadcrumb>`.       |
| `pageTitle`      | `string`     | The page title inferred automatically from `route.meta.title` or `route.name`. |

---

## Layout Modes Overview

The `AppShell` offers six uniquely distinct orchestrations for your application via the `layout-mode` prop.

### 1. `variant1` (Default)
The sidebar spans the entire full height of the viewport on the left. The `header` and `main` content are stacked vertically on the right side.

### 2. `variant4`
The `header` spans the full width of the screen at the very top. The `sidebar` and `main` content are grouped together beneath the header.

### 3. `variant2`
Creates a sophisticated "floating panel" aesthetic. The primary app wrapper receives a muted tone color, while the sidebar, header, and main content fields are distinct, rounded, white cards separated by subtle gaps and styling. Ideal for modern SaaS apps.

### 4. `variant3`
A minimalist floating sidebar that behaves similarly to a macOS dock. The sidebar is vertically centered, and dynamically bounds its height only to the content placed within it. Highly suited for compact application navigation.

### 5. `variant5`
The sidebar is flush against the left, top, and bottom edges of the screen with no gaps or rounded corners. The header and main content sit to the right of the sidebar inside a floating, rounded card container. This creates a premium "shell" aesthetic where the sidebar acts as a solid anchor while the content area feels modern and elevated. Supports both expanded and compact sidebar modes.

### 6. `variant6`
A slot-based storefront layout for commerce, marketplace, and product-led experiences. It provides an announcement region, responsive header grid, centered logo region, desktop navigation, search, right-side actions, category rail, mobile drawer, main content, and footer slots. The shell does not hardcode commerce-specific content such as carts, account buttons, category data, or search state.

When `category-route-prefix` is set, nested `CategoryMenu` components can inherit it and generate Vue Router category links from raw category data.

```vue
<AppShell layout-mode="variant6" category-route-prefix="/products">
  <template #categories>
    <CategoryMenu :items="categories" variant="mega" />
  </template>
</AppShell>
```

---

## Usage Example

### Standard AppShell Implementation

```vue
<AppShell variant="sidebar" layout-mode="variant2">
  <template #sidebar-header>
    <div class="font-bold text-lg p-2">Vlite3 App</div>
  </template>

  <template #sidebar>
    <SidebarMenu :items="menuItems" />
  </template>

  <template #sidebar-footer>
    <div class="p-2 border-t">
      <Button variant="ghost" class="w-full justify-start" icon="lucide:log-out">
        Logout
      </Button>
    </div>
  </template>

  <template #header="{ toggle, pageTitle }">
    <div class="h-16 border-b bg-white flex items-center justify-between px-6 w-full">
      <div class="flex items-center gap-4">
        <button class="md:hidden" @click="toggle">
          <Icon icon="lucide:menu" />
        </button>
        <span class="font-bold text-lg">{{ pageTitle || 'Overview' }}</span>
      </div>
      <Avatar fallback="JD" />
    </div>
  </template>

  <template #main>
    <div class="p-6">
      <RouterView />
    </div>
  </template>
</AppShell>
```

### Advanced Usage with Breadcrumbs and Mobile Overrides

```vue
<AppShell 
  layout-mode="variant1"
  mobileBreakpoint="lg" 
  breadcrumb
>
  <template #sidebar>
    <SidebarMenu :items="desktopItems" />
  </template>

  <template #mobile-sidebar>
    <div class="text-xs text-muted-foreground p-2">Mobile Menu</div>
    <SidebarMenu :items="mobileOptimizedItems" />
  </template>

  <template #header="{ toggle, breadcrumbItems }">
    <div class="h-14 border-b flex items-center px-4 w-full gap-4">
      <button class="lg:hidden" @click="toggle">
        <Icon icon="lucide:menu" />
      </button>
      
      <Breadcrumb 
        v-if="breadcrumbItems.length > 1" 
        :items="breadcrumbItems" 
        separator="slash" 
      />
    </div>
  </template>

  <template #main>
    <RouterView />
  </template>
</AppShell>
```

### Storefront Shell Usage (`variant6`)

The Storefront variant provides semantic slots (`#left`, `#center`, `#right`, `#categories`, `#announcement`, etc.) allowing you to quickly build robust consumer e-commerce headers while relying on standard Tailwind CSS classes to manage visibility between breakpoints.

```vue
<AppShell 
  variant="header"
  layout-mode="variant6"
  category-route-prefix="/collections"
  mobile-breakpoint="md"
>
  <!-- 1. Top Announcement Bar -->
  <template #announcement>
    <div class="bg-foreground text-background text-center text-xs py-1.5 px-4 font-medium">
      Free shipping on orders over $150
    </div>
  </template>

  <!-- 2. Header Left (Logo/Brand) -->
  <template #left>
    <div class="flex items-center gap-2">
      <span class="w-8 h-8 rounded-md bg-emerald-600 text-white flex items-center justify-center font-bold">M</span>
      <span class="font-black text-lg">Mellow</span>
    </div>
  </template>

  <!-- 3. Header Center (Desktop Nav) -->
  <template #center>
    <nav class="hidden md:flex items-center gap-2">
      <Button variant="ghost" size="sm">Shop</Button>
      <Button variant="ghost" size="sm">Rooms</Button>
      <Button variant="ghost" size="sm">Journal</Button>
    </nav>
  </template>

  <!-- 4. Header Right (Search, Cart, Profile) -->
  <template #right>
    <div class="flex items-center gap-2">
      <div class="hidden lg:block">
        <Input placeholder="Search" icon-left="lucide:search" size="sm" />
      </div>
      <Button variant="ghost" size="icon"><Icon icon="lucide:user" /></Button>
      <Button variant="ghost" size="icon" class="relative">
        <Icon icon="lucide:shopping-bag" />
        <span class="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">3</span>
      </Button>
    </div>
  </template>

  <!-- 5. Desktop Mega Menu Categories -->
  <template #categories>
    <!-- The AppShell provides 'categoryRoutePrefix' via injection to CategoryMenu -->
    <CategoryMenu :items="categories" variant="mega" />
  </template>

  <!-- 6. Mobile Sidebar Overrides -->
  <template #mobile-sidebar-header>
    <div class="font-bold text-lg flex items-center gap-2">
      <span class="w-6 h-6 rounded bg-emerald-600 text-white text-xs flex items-center justify-center">M</span>
      Mellow
    </div>
  </template>

  <template #mobile-sidebar>
    <div class="space-y-2 mb-4">
      <Button variant="ghost" class="w-full justify-start text-base">Shop</Button>
      <Button variant="ghost" class="w-full justify-start text-base">Rooms</Button>
    </div>
    <div class="pt-4 border-t border-border">
      <div class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">Categories</div>
      <CategoryMenu :items="categories" variant="sidebar" />
    </div>
  </template>

  <!-- 7. Main scrollable content -->
  <template #main>
    <div class="min-h-full bg-slate-50">
      <RouterView />
    </div>
  </template>

  <!-- 8. Footer -->
  <template #footer>
    <div class="p-4 text-center text-xs text-muted-foreground border-t bg-background">
      © 2026 Mellow Inc. All rights reserved.
    </div>
  </template>
</AppShell>
```

### Immersive / Transparent Header Usage

By leveraging the `position="absolute"` prop alongside a dynamic `:class` and a scroll observer, you can create an immersive layout where the header floats transparently over a cinematic hero image, becoming solid only when the user scrolls down past a certain threshold.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const isScrolled = ref(false)
const scrollTarget = ref(null)

// When the invisible 50px tall target leaves the viewport, the header becomes solid.
useIntersectionObserver(
  scrollTarget,
  ([{ isIntersecting }]) => {
    isScrolled.value = !isIntersecting
  },
  { threshold: 0 }
)
</script>

<template>
  <AppShell 
    variant="header"
    layout-mode="variant6"
    position="absolute"
    :border="false"
    :class="`text-foreground transition-colors duration-300 ${isScrolled ? 'bg-background border-b shadow-sm' : 'bg-transparent border-b border-white/10 text-white'}`"
  >
    <!-- Header Logo -->
    <template #left>
      <div class="font-serif text-2xl tracking-widest">LUXE</div>
    </template>
    
    <template #main>
      <!-- Invisible target at the very top to detect scrolling -->
      <div ref="scrollTarget" class="absolute top-0 start-0 w-full h-[50px] pointer-events-none"></div>
      
      <!-- Full-bleed cinematic hero section -->
      <section class="h-[80vh] flex items-center justify-center relative overflow-hidden bg-zinc-950">
        <img src="hero-image.jpg" class="absolute inset-0 w-full h-full object-cover opacity-60" />
        <h1 class="relative z-10 text-white text-5xl">New Collection</h1>
      </section>
      
      <!-- Content grid that pushes scroll -->
      <section class="p-8 h-screen bg-background">
        <!-- Products... -->
      </section>
    </template>
  </AppShell>
</template>
```

---

## RTL

Set `dir="rtl"` on `html` (or a wrapping ancestor). AppShell then:

- Places the desktop sidebar on **inline-start** (right in RTL)
- Uses logical borders (`border-e`) and slide transforms that originate from the start edge
- Opens the mobile `SidePanel` on the start side (`position="left"` maps to inline-start via logical insets)

Slot names `#left` / `#right` keep their API names but align as start/end regions under `dir`.

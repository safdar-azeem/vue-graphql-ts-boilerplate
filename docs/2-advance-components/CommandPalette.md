# CommandPalette (NavbarCommandPalette)

**Import:** `import { NavbarCommandPalette } from 'vlite3'`

> **Note:** The component is exported as `NavbarCommandPalette` but also referred to as the "Command Palette" in the UI. It is designed to be placed inside the `#header` slot of `Navbar`, but it works as a standalone component anywhere in your app.

`NavbarCommandPalette` renders a search trigger button that opens a full-screen command palette modal. It integrates with your existing `SidebarMenuItemSchema` tree (auto-flatten + group) or accepts a flat `CommandPaletteItem[]` list. The modal is opened via a keyboard shortcut (`⌘K` / `Ctrl+K` by default) or by clicking the trigger button.

---

## Props

| Prop                 | Type                      | Default                                     | Description                                                                                                      |
| :------------------- | :------------------------ | :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------- |
| `items`              | `CommandPaletteItem[]`    | `[]`                                        | Static flat list of command palette items. Merged with any items derived from `menuItems`.                       |
| `menuItems`          | `SidebarMenuItemSchema[]` | `[]`                                        | Raw sidebar menu tree. The palette auto-flattens and groups these into searchable entries.                        |
| `shortcutKey`        | `string`                  | `'k'`                                       | The key used with `Meta` (Mac) or `Ctrl` (Windows/Linux) to open the palette (e.g. `'k'` → `⌘K` / `Ctrl+K`).   |
| `placeholder`        | `string`                  | `'Search commands, pages, and actions...'`  | Placeholder text for the search input inside the palette.                                                        |
| `placeholderI18n`    | `string`                  | `—`                                         | i18n translation key for the placeholder. Overrides `placeholder` if the key resolves.                           |
| `maxResultsPerGroup` | `number`                  | `10`                                        | Maximum number of results displayed per group in the results list.                                               |
| `enabled`            | `boolean`                 | `true`                                      | When `false`, the trigger button is not rendered, keyboard shortcut is not registered, and the modal cannot open. |

---

## Types

```ts
export interface CommandPaletteItem {
  id: string
  label: string
  labelI18n?: string
  description?: string
  descriptionI18n?: string
  icon?: string
  group?: string
  to?: string
  href?: string
  action?: () => void
  keywords?: string[]
  disabled?: boolean
}

export interface CommandPaletteGroup {
  key: string
  label: string
  items: CommandPaletteItem[]
}
```

---

## Behavior

### Trigger Button

The trigger button is:

- Hidden on screens smaller than `md` (`hidden md:inline-flex`).
- Displays the first segment of `placeholder` text (before the first comma) as a compact label.
- Displays the keyboard shortcut badge (`⌘K` or `Ctrl+K`) on `lg` and larger screens.
- Auto-detects the platform: uses `⌘` on Mac, `Ctrl` on Windows/Linux.

### Keyboard Shortcut

When `enabled` is `true`, the component registers a `keydown` event listener on `window` during `onMounted`. The shortcut fires when `(e.metaKey || e.ctrlKey) && e.key === shortcutKey`. The listener is cleaned up on `onUnmounted` and re-registered/removed when `enabled` changes reactively.

### Modal

The palette opens as a `<Modal>` with `maxWidth="max-w-2xl"`. The actual search UI is rendered inside `CommandPaletteContent`, which receives `items`, `menuItems`, `placeholder`, `placeholderI18n`, and `maxResultsPerGroup` as `bodyProps`.

### Auto-flattening `menuItems`

When `menuItems` is provided, the palette traverses the full `SidebarMenuItemSchema` tree and creates one `CommandPaletteItem` per navigable leaf node:

- Items with `to` or `href` are included.
- Items with only `action` and no children are included.
- Parent group items (with children but no `to`/`href`/`action`) are excluded.
- The `group` field on each derived item is set to the top-level ancestor's `label`.

---

## Usage

### Inside Navbar Header (Recommended)

```vue
<Navbar variant="sidebar">
  <template #header="{ toggle }">
    <div class="h-16 border-b bg-white flex items-center justify-between px-6 w-full">
      <div class="flex items-center gap-4">
        <button class="md:hidden" @click="toggle">
          <Icon icon="lucide:menu" />
        </button>
        <span class="font-bold text-lg">My App</span>

        <!-- Command Palette trigger — powered by the sidebar menu tree -->
        <NavbarCommandPalette
          :enabled="true"
          :menu-items="menuItems"
          placeholder="Search components..."
          shortcut-key="k" />
      </div>
      <div class="flex items-center gap-3">
        <Avatar fallback="JD" />
      </div>
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

### Standalone (Outside Navbar)

```vue
<template>
  <div class="flex items-center gap-4">
    <NavbarCommandPalette
      :enabled="true"
      :menu-items="menuItems"
      placeholder="Search pages and commands..."
      shortcut-key="p" />
  </div>
</template>
```

### With Static Items Only

Use the `items` prop for custom command entries that are not part of the sidebar menu tree.

```vue
<NavbarCommandPalette
  :enabled="true"
  :items="[
    {
      id: 'new-project',
      label: 'New Project',
      description: 'Create a new project workspace',
      icon: 'lucide:folder-plus',
      group: 'Actions',
      action: () => openNewProjectModal(),
      keywords: ['create', 'add', 'workspace'],
    },
    {
      id: 'docs',
      label: 'Open Documentation',
      icon: 'lucide:book-open',
      group: 'Links',
      href: 'https://docs.example.com',
    },
    {
      id: 'theme',
      label: 'Toggle Theme',
      icon: 'lucide:sun-moon',
      group: 'Settings',
      action: () => toggleDarkMode(),
    },
  ]"
  placeholder="Search commands..." />
```

### Combined: Sidebar Tree + Custom Items

The `items` and `menuItems` props are merged together in the results list.

```vue
<NavbarCommandPalette
  :enabled="true"
  :menu-items="sidebarMenuItems"
  :items="[
    {
      id: 'logout',
      label: 'Log Out',
      icon: 'lucide:log-out',
      group: 'Account',
      action: () => logout(),
    },
  ]"
  placeholder="Search pages and commands..." />
```

### Disabling the Palette

Pass `:enabled="false"` to fully disable the component — no button, no shortcut listener, no modal.

```vue
<!-- Hidden from guests -->
<NavbarCommandPalette :enabled="isAuthenticated" :menu-items="menuItems" />
```

### Custom Shortcut Key

Change the trigger shortcut to `⌘P` / `Ctrl+P`:

```vue
<NavbarCommandPalette :menu-items="menuItems" shortcut-key="p" placeholder="Go to..." />
```

---

## Notes & Best Practices

- Place `NavbarCommandPalette` inside `#header` when using Layout Mode so it is always visible to the user.
- The trigger button is automatically hidden on mobile (`hidden md:inline-flex`). If you need mobile command palette access, add a separate mobile button that calls an `open()` function or reuses the keyboard shortcut.
- `maxResultsPerGroup` prevents the palette from showing hundreds of results when a broad search matches many items. Set it higher (e.g. `20`) for large navigation trees.
- Use `keywords` on static `CommandPaletteItem` entries to improve search discoverability for items that might be searched by synonyms.
- The `action` callback on static items fires immediately on selection and closes the palette. Pair it with router navigation if needed.
- `labelI18n` on static items follows the same convention as `SidebarMenuItemSchema.labelI18n` — the i18n key is resolved at render time.

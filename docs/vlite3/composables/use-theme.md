# useTheme

**Import:** `import { useTheme, initializeTheme } from 'vlite3'`

### Description

A composable for managing light/dark theme state. Persists the user's preference to `localStorage`, respects the system `prefers-color-scheme` setting, and applies the active theme class to `<html>`.

---

### `initializeTheme()`

Call once at the app root (e.g. `App.vue`) to bootstrap the theme before any component mounts. It reads the persisted or system theme, applies it to `<html>`, and wires up the system-preference change listener.
```vue
<!-- App.vue -->
<script setup lang="ts">
import { initializeTheme } from 'vlite3'

initializeTheme()
</script>
```

---

### `useTheme()`

Use inside any component to access and toggle the current theme.

#### Returns

| Key           | Type                   | Description                          |
| :------------ | :--------------------- | :----------------------------------- |
| `theme`       | `Ref<'light' \| 'dark'>` | Reactive current theme value         |
| `toggleTheme` | `() => void`           | Toggles between `light` and `dark`   |

#### Usage
```vue
<script setup lang="ts">
import { useTheme } from 'vlite3'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme">
    Current theme: {{ theme }}
  </button>
</template>
```

---

### Behavior

- On init, checks `localStorage` for a saved preference (`builto-theme`).
- Falls back to `prefers-color-scheme: dark` if no preference is saved.
- Defaults to `light` if neither is available.
- Adds `light` or `dark` class to `<html>` on every change.
- Listens for system theme changes and updates automatically when no manual preference is set.

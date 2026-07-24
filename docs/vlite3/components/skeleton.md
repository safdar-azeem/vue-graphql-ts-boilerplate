# Skeleton

**Import:** `import { Skeleton } from 'vlite3'`

Pixel-perfect skeleton loading screens generated directly from your real UI layout. Instead of manually configuring heights, widths, and border radii, the `Skeleton` component derives them automatically from the actual elements.

---

## ⚠️ Performance & Best Practices (CRITICAL)

To maintain 60fps and prevent CPU spikes in large applications, you **must** choose the correct rendering strategy based on your use case.

### 1. Lists and `v-for` Loops (The 20+ Component Scenario)

**🛑 NEVER use `auto` inside a loop.** If you render 20 items with `<Skeleton auto>`, the system will simultaneously perform 20 deep DOM traversals (`getBoundingClientRect`, `getComputedStyle`), causing severe layout thrashing and locking the main thread.

**✅ ALWAYS use `name` (Global Registry) for lists.**
Extract the skeleton once, register it, and pass the `name` prop. The component will skip DOM traversal entirely and stamp out the 20 VDOM nodes in milliseconds using a shared, cached memory reference.

```vue
<Skeleton v-for="user in users" :key="user.id" :loading="isLoading" auto>
  <UserCard :data="user" />
</Skeleton>

<Skeleton v-for="user in users" :key="user.id" :loading="isLoading" name="user-card">
  <UserCard :data="user" />
</Skeleton>
```

### 2. API Re-fetching & Reactivity

- **When using `name`:** Toggling `loading` from `false -> true` is instantaneous. It simply unhides the cached DOM nodes and resumes the CSS animation.
- **When using `auto`:** Toggling `loading` from `false -> true` forces a **brand new DOM snapshot**. It will capture the exact current state of the `#fixture`. Use this only for singular, complex layouts (like dynamic forms) that change shape over time.

---

### Props

| Prop             | Type                                | Default                     | Description                                                                                                                  |
| :--------------- | :---------------------------------- | :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `loading`        | `boolean`                           | `false`                     | When true, displays the skeleton overlay.                                                                                    |
| `auto`           | `boolean`                           | `false`                     | When true, automatically captures bones from the `#fixture` slot at runtime. Use ONLY for singular elements, NEVER in loops. |
| `name`           | `string`                            | —                           | Unique identifier to resolve pre-generated bones from the global registry. MANDATORY for lists/loops.                        |
| `initialBones`   | `SkeletonResult \| ResponsiveBones` | —                           | Pass pre-generated bone data directly, bypassing the registry.                                                               |
| `color`          | `string`                            | `rgba(0, 0, 0, 0.03)`       | Base color of the bones in light mode.                                                                                       |
| `darkColor`      | `string`                            | `rgba(255, 255, 255, 0.05)` | Base color of the bones in dark mode.                                                                                        |
| `animate`        | `AnimationStyle`                    | `'pulse'`                   | Visual animation style. Accepts `'pulse'`, `'shimmer'`, `'solid'`, or boolean.                                               |
| `stagger`        | `number \| boolean`                 | `false`                     | Stagger delay in milliseconds between bone animations (`true` = 80ms).                                                       |
| `transition`     | `number \| boolean`                 | `false`                     | Fade-out duration in milliseconds when loading finishes (`true` = 300ms).                                                    |
| `snapshotConfig` | `SnapshotConfig`                    | —                           | Fine-grained configuration for how bones are extracted from the DOM.                                                         |
| `class`          | `string`                            | —                           | Custom CSS classes applied to the root container.                                                                            |

### Slots

| Slot       | Description                                                                                                  |
| :--------- | :----------------------------------------------------------------------------------------------------------- |
| `default`  | Your actual component content. Rendered and visible when `loading` is false.                                 |
| `fixture`  | Mock content used to auto-generate bones when the `auto` prop is true. Rendered invisibly in the background. |
| `fallback` | Content shown when `loading` is true but no bone data is available (and `auto` is false).                    |

### Types

```ts
export type AnimationStyle = 'pulse' | 'shimmer' | 'solid' | boolean

export interface SnapshotConfig {
  /** HTML tags always captured as a single atomic bone. */
  leafTags?: string[]
  /** Capture containers with visible borders + border-radius. */
  captureRoundedBorders?: boolean
  /** HTML tags to skip entirely. */
  excludeTags?: string[]
  /** CSS selectors to skip entirely. */
  excludeSelectors?: string[]
}
```

### Usage

**1. Auto-Generated (Runtime Snapshotting)**
Best for single instances or complex dynamic forms. Do not use in lists.

```vue
<template>
  <Skeleton :loading="isLoading" auto animate="shimmer" transition>
    <ProfileCard :user="userData" />
  </Skeleton>
</template>
```

**2. Pre-Generated (Using the Registry)**
MANDATORY for lists, data tables, and high-performance repeated cards.

```vue
<template>
  <Skeleton name="profile-card" :loading="isLoading" stagger>
    <ProfileCard :user="userData" />
  </Skeleton>
</template>
```

# 3. The Skeleton Loop Trap

**NEVER** use `<Skeleton auto>` inside a `v-for` loop.

- **Why:** The `auto` prop forces the browser to calculate `getBoundingClientRect` and `getComputedStyle` for every single nested element. Doing this synchronously across 20+ list items will cause severe layout thrashing and lock the main thread.
- **REQUIRED FIX:** Always pre-register the skeleton layout and use the `name` prop so the DOM nodes are stamped out from a cached memory reference.

```vue
<Skeleton v-for="item in list" :key="item.id" auto>...</Skeleton>

<Skeleton v-for="item in list" :key="item.id" name="my-card">...</Skeleton>
```

For data tables, lists, and repeated cards, ALWAYS use pre-generated bones via the name prop. This extracts the layout exactly once, caches it as a VDOM object, and reuses it for every item instantly (O(1) calculation complexity).

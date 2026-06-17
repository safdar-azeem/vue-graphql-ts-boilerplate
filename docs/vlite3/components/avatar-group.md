# Avatar Group

**Import:** `import { AvatarGroup } from 'vlite3'`

### Description

A visual layout component that stacks multiple avatars horizontally with a configurable overlap. It automatically calculates an overflow count (e.g., "+3") when the number of items exceeds the `max` prop and provides built-in tooltips for individual avatars.

---

### Props

| Prop      | Type                   | Default      | Description                                                                          |
| :-------- | :--------------------- | :----------- | :----------------------------------------------------------------------------------- |
| `items`   | `AvatarGroupItem[]`    | **Required** | Array of avatar data objects.                                                        |
| `max`     | `number`               | `4`          | Maximum number of avatars to show before clustering the rest into an overflow badge. |
| `size`    | `AvatarSize`           | `'md'`       | Size of the avatars: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`.                |
| `rounded` | `AvatarRounded`        | `'full'`     | Border radius: `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'`.                           |
| `overlap` | `'sm' \| 'md' \| 'lg'` | `'md'`       | Density of the horizontal overlap.                                                   |

---

### Data Model

#### `AvatarGroupItem` Shape

| Property   | Type      | Description                                                |
| :--------- | :-------- | :--------------------------------------------------------- |
| `src`      | `string?` | Image URL for the avatar.                                  |
| `alt`      | `string?` | Alt text for accessibility.                                |
| `fallback` | `string?` | Initials or text to show if the image fails or is missing. |
| `heading`  | `string?` | Bold text shown in the tooltip (e.g., User Name).          |
| `text`     | `string?` | Secondary text shown in the tooltip (e.g., User email).    |

---

### Implementation Examples

#### 1. Basic Usage with Tooltips

```vue
<script setup>
import { AvatarGroup } from 'vlite3'

const team = [
  { src: '...', heading: 'Alice', text: 'Developer' },
  { src: '...', heading: 'Bob', text: 'Designer' },
  { src: '...', heading: 'Charlie', text: 'Product' },
  { src: '...', heading: 'David', text: 'DevOps' },
]
</script>

<template>
  <AvatarGroup :items="team" :max="3" size="lg" />
</template>
```

#### 2. Custom Shapes & Densities

```vue
<template>
  <!-- Square avatars with tight overlap -->
  <AvatarGroup :items="items" rounded="none" overlap="lg" size="sm" />
</template>
```

---

### Senior Engineer's Notes

1.  **Visual Separation**: The component automatically adds a ring (`ring-2 ring-background`) around each avatar to ensure clear visual separation when they overlap.
2.  **Performance**: The overflow calculation is handled via a lightweight computed property. For lists with hundreds of users, always keep the `max` prop at a reasonable number (e.g., 3-10) to minimize the number of DOM nodes.
3.  **Tooltip Integration**: The component uses the internal `Tooltip` component. Tooltips are only rendered if either `heading` or `text` is provided for an item.
4.  **Fallback Rendering**: If `src` is missing, the `Avatar` component's built-in fallback logic is used (usually showing initials derived from `alt` or `fallback`).

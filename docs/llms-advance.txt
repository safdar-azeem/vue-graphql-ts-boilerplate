# Table of Contents

* [Navbar](#navbar)
* [SidebarMenu](#sidebarmenu)
* [Heatmap](#heatmap)
* [PricingPlan](#pricingplan)
* [FileTree](#filetree)
* [Workbook](#workbook)

# Advanced Components

This section covers complex data visualization and business-logic components.

---
# Navbar

**Import:** `import { Navbar, NavbarGroup, NavbarItem } from 'vlite3'`

### Props

| Prop                 | Type                                              | Default  | Description                            |
| :------------------- | :------------------------------------------------ | :------- | :------------------------------------- |
| `variant`            | `'header' \| 'sidebar'`                           | `header` | Layout mode                            |
| `position`           | `'fixed' \| 'sticky' \| 'relative' \| 'absolute'` | `sticky` | CSS positioning                        |
| `centerPosition`     | `'center' \| 'left' \| 'right'`                   | `center` | Alignment of center slot (Header only) |
| `glass`              | `boolean`                                         | `true`   | Blur effect on scroll                  |
| `border`             | `boolean`                                         | `true`   | Show border (bottom or right)          |
| `floating`           | `boolean`                                         | `false`  | Floating card style                    |
| `compact`            | `boolean`                                         | `false`  | Compact interaction mode               |
| `mobileBreakpoint`   | `'sm' \| 'md' \| 'lg' \| 'xl'`                    | `md`     | Breakpoint to switch to mobile menu    |
| `height`             | `string`                                          | `h-16`   | Header height class                    |
| `width`              | `string`                                          | `w-64`   | Sidebar width class                    |
| `logoClass`          | `string`                                          | —        | Classes for logo container             |
| `contentClass`       | `string`                                          | —        | Classes for main content area          |
| `rightClass`         | `string`                                          | —        | Classes for right actions area         |
| `mobileTriggerClass` | `string`                                          | —        | Classes for hamburger button           |

### Slots

| Slot             | Description                                         | Props                |
| :--------------- | :-------------------------------------------------- | :------------------- |
| `logo`           | Branding area                                       | —                    |
| `left`           | Left content (Header) or Top content (Sidebar)      | —                    |
| `center`         | Center content (Header) or Middle content (Sidebar) | —                    |
| `right`          | Right actions (Header) or Bottom content (Sidebar)  | —                    |
| `mobile-trigger` | Custom hamburger button                             | `{ isOpen, toggle }` |
| `mobile-menu`    | Custom mobile menu content                          | —                    |

### Usage

#### Header

```vue
<Navbar variant="header" position="sticky">
  <template #logo>
    <span class="font-bold">GeneriCorp</span>
  </template>

  <template #left>
    <NavbarGroup>
      <NavbarItem label="Dashboard" to="/" active />
      <NavbarItem label="Settings" to="/settings" />
    </NavbarGroup>
  </template>

  <template #right>
    <Button size="sm">Logout</Button>
  </template>
</Navbar>
```

#### Sidebar

```vue
<Navbar variant="sidebar" class="h-screen">
  <template #logo>Logo</template>

  <template #default>
    <SidebarMenu :items="items" />
  </template>

  <template #right>
    <div class="p-4">User Profile</div>
  </template>
</Navbar>
```

### NavbarItem Props

| Prop      | Type                                            | Default | Description         |
| :-------- | :---------------------------------------------- | :------ | :------------------ |
| `label`   | `string`                                        | —       | Link text           |
| `to`      | `string`                                        | —       | Router link target  |
| `href`    | `string`                                        | —       | External link URL   |
| `icon`    | `string`                                        | —       | Leading icon        |
| `active`  | `boolean`                                       | `false` | Forced active state |
| `variant` | `'default' \| 'pill' \| 'underline' \| 'ghost'` | `ghost` | Visual style        |

---

# SidebarMenu

**Import:** `import { SidebarMenu } from 'vlite3'`
**Types:** `import type { SidebarMenuItemSchema } from 'vlite3'`

### Props

| Prop                | Type                      | Default   | Description                       |
| :------------------ | :------------------------ | :-------- | :-------------------------------- |
| `items`             | `SidebarMenuItemSchema[]` | `[]`      | Menu structure                    |
| `allowMultiple`     | `boolean`                 | `true`    | Allow multiple submenus open      |
| `indentSize`        | `number`                  | `12`      | Indentation pixels per level      |
| `variant`           | `'default' \| 'ghost'`    | `default` | Visual theme                      |
| `compact`           | `boolean`                 | `false`   | Collapsed mode (icons only)       |
| `renderMode`        | `'tree' \| 'popover'`     | `tree`    | Submenu rendering style           |
| `showCompactLabels` | `boolean`                 | `false`   | Show small labels in compact mode |

### Type Definition

```ts
interface SidebarMenuItemSchema {
  id?: string
  label: string
  icon?: string
  to?: string // Vue Router path
  href?: string // External link
  children?: SidebarMenuItemSchema[]
  badge?: string | number
  badgeClass?: string
  disabled?: boolean
  renderMode?: 'tree' | 'popover' // Override per item
  action?: (item: SidebarMenuItemSchema) => void
}
```

### Usage

```vue
<script setup>
const items = [
  {
    label: 'Dashboard',
    icon: 'lucide:home',
    to: '/dashboard',
  },
  {
    label: 'Projects',
    icon: 'lucide:folder',
    children: [
      { label: 'Active', to: '/projects/active' },
      { label: 'Archived', to: '/projects/archived' },
    ],
  },
]
</script>

<template>
  <SidebarMenu :items="items" />
</template>
```

---

# Heatmap

**Import:** `import { Heatmap } from 'vlite3'`

### Description

An interactive heatmap suitable for visualizing activity, time-series data, or density across a grid. Supports both calendar-style (sequential) and coordinate-based (grid) layouts.

### Props

| Prop             | Type                     | Default                | Description                               |
| :--------------- | :----------------------- | :--------------------- | :---------------------------------------- |
| `data`           | `HeatmapDataPoint[]`     | required               | Array of data points                      |
| `layout`         | `'grid' \| 'sequential'` | `'grid'`               | Layout mode                               |
| `interactive`    | `boolean`                | `true`                 | Enable hover and click effects            |
| `showLegend`     | `boolean`                | `true`                 | Show gradient legend at bottom            |
| `showLabels`     | `boolean`                | `false`                | Show values inside cells                  |
| `responsive`     | `boolean`                | `true`                 | Auto-calculate cell size to fit container |
| `minValue`       | `number`                 | calculated             | Min value for color normalization         |
| `maxValue`       | `number`                 | calculated             | Max value for color normalization         |
| `color-config`   | `HeatmapColorConfig`     | `{ scheme: 'github' }` | Color scheme configuration                |
| `grid-config`    | `object`                 | `{ rows: 7, gap: 3 }`  | Config for grid layout                    |
| `tooltip-config` | `object`                 | `{ enabled: true }`    | Tooltip settings                          |

### Data Format (`HeatmapDataPoint`)

```typescript
interface HeatmapDataPoint {
  x: number // Column index (or linear index for sequential)
  y: number // Row index
  value: number // Value for intensity
  date?: string // Optional ISO date string
  tooltip?: string // Custom tooltip text
  [key: string]: any // Any other data to pass through
}
```

### Events

- `@cell-click` (cell: `HeatmapCell`, event: `MouseEvent`): Emitted when a cell is clicked.
- `@cell-hover` (cell: `HeatmapCell | null`, event: `MouseEvent`): Emitted on mouse enter/leave.

### Usage

#### Basic Activity Grid

```vue
<script setup>
const data = [
  { x: 0, y: 0, value: 5 },
  { x: 0, y: 1, value: 10 },
  // ...
]
</script>

<template>
  <Heatmap
    :data="data"
    :color-config="{ scheme: 'green' }"
    @cell-click="(cell) => console.log(cell)" />
</template>
```

#### Sequential Timeline (Github Style)

```vue
<Heatmap
  :data="data"
  layout="sequential"
  :sequential-config="{ itemsPerRow: 7, gap: 2 }"
  :tooltip-config="{
    formatter: (cell) => `${cell.value} commits on ${cell.date}`,
  }" />
```

---

# PricingPlan

**Import:** `import { PricingPlan } from 'vlite3'`

### Description

A responsive pricing table component supporting highlighting, features lists, and different visual variants.

### Props

| Prop         | Type                      | Default     | Description                               |
| :----------- | :------------------------ | :---------- | :---------------------------------------- |
| `items`      | `PricingPlanItemSchema[]` | `[]`        | Array of plan definitions                 |
| `modelValue` | `string \| number`        | `null`      | Selected plan ID (v-model)                |
| `variant`    | `'outline' \| 'solid'`    | `'outline'` | Visual style variant                      |
| `columns`    | `number`                  | `3`         | Number of columns (responsive by default) |
| `gap`        | `number`                  | `6`         | Gap between cards (tailwind scale)        |

### Item Schema (`PricingPlanItemSchema`)

```typescript
interface PricingPlanItemSchema {
  id: string | number
  title: string
  price: string
  period?: string
  description?: string
  features: Array<string | { text: string; included: boolean }>
  buttonText?: string
  popular?: boolean // Adds "Popular" badge
  recommended?: boolean // Adds styling emphasis
  variant?: 'outline' | 'solid' // Override per item
}
```

### Events

- `@update:modelValue`: Emitted when a plan is selected (via button click).
- `@change`: Emitted when selection changes.

### Usage

```vue
<script setup>
import { ref } from 'vue'

const selected = ref('pro')
const plans = [
  {
    id: 'basic',
    title: 'Basic',
    price: '/bin/zsh',
    features: ['1 Project', 'Basic Support'],
  },
  {
    id: 'pro',
    title: 'Pro',
    price: '',
    popular: true,
    features: ['Unlimited Projects', 'Priority Support'],
  },
]
</script>

<template>
  <PricingPlan v-model="selected" :items="plans" variant="outline" />
</template>
```

---

# FileTree

**Import:** `import { FileTree } from 'vlite3'`

### Description

A recursive tree component for displaying hierarchical data (files, folders, categories) with support for selection, checkboxes, async loading, and search filtering.

### Props

| Prop                  | Type                            | Default    | Description                        |
| :-------------------- | :------------------------------ | :--------- | :--------------------------------- |
| `data`                | `FileNode[]`                    | `[]`       | Tree data structure                |
| `modelValue`          | `string[]`                      | `[]`       | Selected node IDs (v-model)        |
| `selectionMode`       | `'single' \| 'multiple'`        | `'single'` | Selection behavior                 |
| `showCheckboxes`      | `boolean`                       | `false`    | Show checkboxes for selection      |
| `loadData`            | `(node) => Promise<FileNode[]>` | —          | Async handler for loading children |
| `searchQuery`         | `string`                        | —          | Filter nodes by name or content    |
| `highlightSearch`     | `boolean`                       | `false`    | Highlight matching text            |
| `defaultExpandedKeys` | `string[]`                      | `[]`       | Initially expanded nodes           |

### Type Definitions

```typescript
interface FileNode {
  id: string
  label: string
  isFolder?: boolean
  children?: FileNode[]
  icon?: string // Custom icon name
  disabled?: boolean
  isLoaded?: boolean // For async loading status
  [key: string]: any // Allow custom data
}
```

### Events

- `@node-click` (node: `FileNode`): Emitted when a node is clicked.
- `@select` (node: `FileNode`, selected: `boolean`): Emitted when selection changes.
- `@expand` (node: `FileNode`, expanded: `boolean`): Emitted when a folder is expanded/collapsed.

### Usage

#### 1. Content Search & Highlighting

To enable content highlighting, your data nodes should include the `searchMatch` property.

```vue
<script setup>
import { computed, ref } from 'vue'

const searchQuery = ref('calculate')

// Example: Data is usually processed to attach search matches
const files = computed(() => [
  {
    id: 'utils',
    label: 'utils.ts',
    // ...
    searchMatch: {
      line_number: 42,
      line_content: 'export const calculateTotal = (a, b) => a + b',
      match_start: 24, // index where 'calculate' starts
      match_length: 9,
    },
  },
])
</script>

<template>
  <FileTree :data="files" :search-query="searchQuery" highlight-search />
</template>
```

#### 2. Async Loading with Skeleton State

Load children dynamically when a folder is expanded.

```vue
<script setup>
const handleLoad = async (node) => {
  // Simulate API call
  await new Promise((r) => setTimeout(r, 1000))

  return [{ id: `${node.id}-1`, label: 'Dynamic File.txt', isFolder: false }]
}
</script>

<template>
  <FileTree :data="initialNodes" :loadData="handleLoad" />
</template>
```

#### 3. Multiple Selection with Checkboxes

Handle selection state via `v-model`.

```vue
<script setup>
const selectedIds = ref([])
</script>

<template>
  <div class="h-64 border rounded p-2">
    <FileTree
      :data="projectFiles"
      v-model="selectedIds"
      selection-mode="multiple"
      show-checkboxes
      :default-expanded-keys="['root']" />
  </div>
  <div>Selected: {{ selectedIds }}</div>
</template>
```

---

# Workbook

**Import:** `import { Workbook } from 'vlite3'`

### Description
A spreadsheet-like tab interface supporting drag-and-drop reordering, inline editing (renaming), duplication, and dynamic sheet management.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `sheets` | `WorkbookSheet[]` | `[]` | Array of sheet objects (v-model:sheets) |
| `modelValue` | `string` | `''` | Active sheet ID (v-model) |
| `editable` | `boolean` | `true` | Enable renaming and context menus |
| `addable` | `boolean` | `true` | Show add button |
| `draggable` | `boolean` | `true` | Enable drag-and-drop reordering |
| `addButtonPosition` | `'attached' \| 'fixed-right'` | `'fixed-right'` | Position of the add button |
| `allowIconChange` | `boolean` | `true` | Allow changing icons via context menu |
| `variant` | `string` | `'chrome'` | Visual style variant |

### Sheet Object (`WorkbookSheet`)

```typescript
interface WorkbookSheet {
  id: string
  title: string
  icon?: string
  [key: string]: any // Custom data
}
```

### Events

- `@add` (): Emitted when the add button is clicked.
- `@delete` (id: `string`): Emitted when a sheet is deleted.
- `@duplicate` (id: `string`): Emitted when "Duplicate" is selected.
- `@change` (id: `string`): Emitted when active sheet changes.
- `@update:sheets` (sheets: `WorkbookSheet[]`): Emitted on reorder or property change.

### Usage

#### Basic Workbook
```vue
<script setup>
import { ref } from 'vue'

const activeSheet = ref('1')
const sheets = ref([
  { id: '1', title: 'Dashboard', icon: 'lucide:layout' },
  { id: '2', title: 'Settings', icon: 'lucide:settings' }
])

const handleAdd = () => {
  const id = Date.now().toString()
  sheets.value.push({ id, title: 'New Sheet', icon: 'lucide:file' })
  activeSheet.value = id
}
</script>

<template>
  <Workbook
    v-model="activeSheet"
    v-model:sheets="sheets"
    @add="handleAdd"
  >
    <div class="p-4">
      Active Content: {{ activeSheet }}
    </div>
  </Workbook>
</template>
```

#### Full Featured (Draggable & Editable)
```vue
<Workbook
  v-model="activeId"
  v-model:sheets="sheets"
  editable
  draggable
  add-button-position="attached"
  @add="handleAdd"
  @delete="(id) => removeSheet(id)"
  @duplicate="(id) => duplicateSheet(id)"
>
  <!-- Content -->
</Workbook>
```

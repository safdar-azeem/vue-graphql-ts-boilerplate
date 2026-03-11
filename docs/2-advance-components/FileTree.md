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
| `emptyText`           | `string`                        | —          | Text for empty state               |
| `emptyTextI18n`       | `string`                        | —          | I18n key for empty text            |
| `class`               | `string`                        | —          | CSS class for tree container       |

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

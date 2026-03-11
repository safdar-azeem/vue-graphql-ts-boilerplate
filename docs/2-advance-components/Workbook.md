# Workbook

**Import:** `import { Workbook } from 'vlite3'`

### Description

A spreadsheet-like tab interface supporting drag-and-drop reordering, inline editing (renaming), duplication, and dynamic sheet management.

### Props

| Prop                | Type                                         | Default         | Description                             |
| :------------------ | :------------------------------------------- | :-------------- | :-------------------------------------- |
| `sheets`            | `WorkbookSheet[]`                            | `[]`            | Array of sheet objects (v-model:sheets) |
| `modelValue`        | `string`                                     | `''`            | Active sheet ID (v-model)               |
| `editable`          | `boolean`                                    | `true`          | Enable renaming and context menus       |
| `addable`           | `boolean`                                    | `true`          | Show add button                         |
| `draggable`         | `boolean`                                    | `true`          | Enable drag-and-drop reordering         |
| `addButtonPosition` | `'attached' \| 'fixed-right'`                | `'fixed-right'` | Position of the add button              |
| `allowIconChange`   | `boolean`                                    | `true`          | Allow changing icons via context menu   |
| `variant`           | `'chrome' \| 'folder' \| 'simple' \| 'card'` | `'chrome'`      | Visual style variant                    |
| `maxSheets`         | `number`                                     | `50`            | Maximum number of sheets                |
| `confirmDelete`     | `boolean`                                    | `false`         | Show delete confirmation modal          |
| `class`             | `string`                                     | —               | Custom wrapper class                    |
| `itemClass`         | `string`                                     | —               | Class for sheet tabs                    |
| `activeItemClass`   | `string`                                     | —               | Class for active sheet tab              |
| `inactiveItemClass` | `string`                                     | —               | Class for inactive sheet tabs           |

### Sheet Object (`WorkbookSheet`)

```typescript
interface WorkbookSheet {
  id: string
  title: string
  titleI18n?: string
  icon?: string
  closable?: boolean
  disabled?: boolean
  [key: string]: any // Custom data
}
```

### Events

- `@update:modelValue` (id: `string`): Emitted when active sheet changes (v-model binding).
- `@update:sheets` (sheets: `WorkbookSheet[]`): Emitted on reorder or property change.
- `@change` (id: `string`): Emitted when active sheet changes.
- `@add` (): Emitted when the add button is clicked.
- `@delete` (id: `string`): Emitted when a sheet is deleted.
- `@duplicate` (id: `string`): Emitted when "Duplicate" is selected.
- `@edit-start` (id: `string`): Emitted when renaming starts.
- `@edit-end` (id: `string`): Emitted when renaming ends.

### Usage

#### Basic Workbook

```vue
<script setup>
import { ref } from 'vue'

const activeSheet = ref('1')
const sheets = ref([
  { id: '1', title: 'Dashboard', icon: 'lucide:layout' },
  { id: '2', title: 'Settings', icon: 'lucide:settings' },
])

const handleAdd = () => {
  const id = Date.now().toString()
  sheets.value.push({ id, title: 'New Sheet', icon: 'lucide:file' })
  activeSheet.value = id
}
</script>

<template>
  <Workbook v-model="activeSheet" v-model:sheets="sheets" @add="handleAdd">
    <div class="p-4">Active Content: {{ activeSheet }}</div>
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
  @duplicate="(id) => duplicateSheet(id)">
  <!-- Content -->
</Workbook>
```

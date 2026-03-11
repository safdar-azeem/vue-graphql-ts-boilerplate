# Kanban

**Import:** `import { Kanban } from 'vlite3'`

### Description

A fully functional, production-ready drag-and-drop Kanban board supporting multiple dynamic columns, customizable item templates, cross-board dragging, and infinite scrolling/pagination handlers per column.

### Props

| Prop             | Type                                  | Default          | Description                              |
| :--------------- | :------------------------------------ | :--------------- | :--------------------------------------- |
| `columns`        | `KanbanColumn[]`                      | required         | Array of columns/boards                  |
| `data`           | `Record<string \| number, any[]>`     | `{}`             | Items grouped by column ID               |
| `group`          | `string`                              | `'kanban-group'` | D&D group identifier                     |
| `itemKey`        | `string`                              | `'id'`           | The unique identifier property for items |
| `loadData`       | `(columnId, page) => Promise<Result>` | —                | Function to load more items if paginated |
| `boardClass`     | `string`                              | —                | Custom class for the board container     |
| `headerClass`    | `string`                              | —                | Custom class for column headers          |
| `bodyClass`      | `string`                              | —                | Custom class for column bodies           |
| `draggableClass` | `string`                              | —                | Custom class for draggable items         |
| `ghostClass`     | `string`                              | —                | Custom class for the drag ghost element  |
| `class`          | `string`                              | `h-full w-full`  | Custom class for the Kanban container    |

### Type Definitions

```ts
export interface KanbanColumn {
  id: string | number
  title: string
  [key: string]: any
}

export interface KanbanChangeEvent {
  moved?: { element: any; newIndex: number; oldIndex: number }
  added?: { element: any; newIndex: number }
  removed?: { element: any; oldIndex: number }
}
```

### Events

- `@update:data` (data: `Record<string | number, any[]>`): Emitted when items move. Use with `v-model:data`.
- `@change` (payload: `KanbanChangeEvent`): Emitted on internal drag-and-drop interaction.

### Slots

| Slot            | Description                                     | Scoped Props          |
| --------------- | ----------------------------------------------- | --------------------- |
| `column-header` | Replaces the default column header              | `{ column }`          |
| `prepend-item`  | Content above the items list                    | `{ column }`          |
| `item`          | Content template for the individual items/cards | `{ element, column }` |
| `append-item`   | Content below the items list                    | `{ column }`          |

### Usage

#### Basic Implementation

```vue
<script setup>
import { ref } from 'vue'

const columns = ref([
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
])

const boardData = ref({
  todo: [{ id: '1', title: 'Research competitors' }],
  'in-progress': [{ id: '2', title: 'Develop Kanban component' }],
  done: [{ id: '3', title: 'Setup Vue 3 project' }],
})
</script>

<template>
  <Kanban v-model:data="boardData" :columns="columns" />
</template>
```

#### Advanced Templating

```vue
<Kanban v-model:data="boardData" :columns="columns">
  <template #column-header="{ column }">
    <div class="flex items-center gap-2 p-3 font-bold">
      <span class="w-3 h-3 rounded-full bg-blue-500"></span>
      {{ column.title }}
    </div>
  </template>

  <template #item="{ element }">
    <div class="bg-card border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
      <h4 class="font-medium">{{ element.title }}</h4>
    </div>
  </template>
</Kanban>
```

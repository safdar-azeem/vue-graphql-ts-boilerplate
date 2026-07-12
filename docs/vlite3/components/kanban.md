# Kanban Board

**Import:** `import { Kanban } from 'vlite3'`

### Description

A high-performance, production-ready Kanban system built for Vue 3. It supports cross-column drag-and-drop, infinite scrolling per column, intelligent auto-grouping from flat arrays, consolidated fractional indexing for optimal database performance, and granular disabled/locked controls at both the board and item level.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `columns` | `KanbanColumn[]` | **Required** | Defines the vertical boards/status columns. |
| `rawData` | `any[]` | `undefined` | **Recommended.** Provide a flat array. The board will automatically group, sort, and manage drag-and-drop positions internally. |
| `groupKey` | `string` | `'status'` | The object property used to group flat `rawData` into columns (e.g., `'status'` or `'stage'`). Changing this rebuilds the board from `rawData`. |
| `positionKey` | `string` | `'position'` | The object property used to define the sorting order within a column. |
| `emptyColumnId` | `string \| number` | `undefined` | Column id that receives null / blank group values (e.g. a **No Priority** lane). |
| `unmappedColumnId` | `string \| number` | `undefined` | Column id that receives values that do not match any configured column (e.g. **Unmapped**). |
| `includeOrphanColumns` | `boolean` | `true` | When true, unmatched group values become visible columns so cards never silently disappear. |
| `data` | `Record<string, any[]>` | `{}` | Legacy manual grouping structure. (Supports `v-model:data`) |
| `group` | `string` | `'kanban-group'` | Unique identifier to allow dragging between different Kanban instances. |
| `itemKey` | `string` | `'id'` | The property name used as a unique identifier for items. |
| `loadData` | `Function` | `undefined` | Async function for infinite scrolling: `(colId, page) => Promise<r>`. |
| `boardClass` | `string` | `undefined` | Custom CSS class for the column container. |
| `isItemDisabled` | `(item: any) => boolean` | `undefined` | Predicate called per item. Return `true` to lock that specific item in place — it cannot be dragged to any column. The item still renders normally. |
| `onItemMoved` | `KanbanItemMovedHandler` | `undefined` | Async confirm handler for drops. Bound via `@item-moved` or `:on-item-moved`. See [Auto-revert on failed mutations](#auto-revert-on-failed-mutations). |

---

### `KanbanColumn` Shape

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | `string \| number` | **Required** | Unique column identifier. Must match the value of `groupKey` in your data. |
| `title` | `string` | **Required** | Display title rendered in the column header. |
| `titleI18n` | `string` | `undefined` | i18n key. When provided, takes precedence over `title`. |
| `disabled` | `boolean` | `undefined` | When `true`, the entire column is locked. Items cannot be dragged **into** or **out of** this column. A 🔒 badge is shown in the default header. |

---

### Events

| Event | Payload | Description |
| :--- | :--- | :--- |
| `@item-moved` | `(itemId, toColumnId, newPosition, item, meta?)` | **Confirm handler (prop).** The board awaits this function after an optimistic drop. Reject / return `false` → card auto-reverts. `meta.revert()` is also available for manual undo. |
| `@move` | `KanbanMoveEvent` | High-level move event detailing `fromColumn`, `toColumn`, `oldIndex`, `newIndex` (fires regardless of confirm outcome). |
| `@item-move-failed` | `{ itemId, fromColumnId, toColumnId, newPosition, item, error }` | Fired after an automatic revert caused by a rejected / `false` confirm handler. |
| `@update:data` | `Record<string, any[]>` | Emitted when the manual `data` structure changes. |

---

### Implementation Guide

#### The Auto-Calculation Approach (Recommended)
By supplying a flat array (`rawData`), the `<Kanban>` component fully abstracts away complex grouping watchers, map sorting, and the mathematical fractional indexing required to compute exact drag-and-drop placements (LexoRank style positioning).

```vue
<script setup>
import { Kanban } from 'vlite3'

// 1. Just fetch your flat array of tasks
const data = [{ id: 1, title: 'Task A', status: 'todo', position: 1024 }]
const columns = [{ id: 'todo', title: 'To Do' }, { id: 'done', title: 'Done' }]

// 2. Await your API mutation — throw / return false on failure and the card snaps back
const syncWithBackend = async (id, newStatus, newPosition) => {
    await api.tasks.update(id, { status: newStatus, position: newPosition })
}
</script>

<template>
  <Kanban 
    :raw-data="data" 
    group-key="status" 
    position-key="position"
    :columns="columns" 
    @item-moved="syncWithBackend" 
  />
</template>
```

---

#### Auto-revert on failed mutations

Drops are optimistic: the card moves immediately. The board then **awaits** `@item-moved` / `:on-item-moved`.

| Handler result | Board behaviour |
| :--- | :--- |
| resolves / returns `void` \| `true` | Keep the new column & position |
| returns `false` | Snap the card back to its previous column & index |
| rejects / throws | Snap back, then emit `@item-move-failed` |

No parent refetch or manual DOM undo is required — every consumer of `<Kanban>` gets this for free.

```vue
<script setup>
import { Kanban, showToast } from 'vlite3'

const onItemMoved = async (id, toColumnId, newPosition) => {
  try {
    await api.tasks.move(id, { statusId: toColumnId, position: newPosition })
  } catch (e) {
    showToast(e.message || 'Move failed', 'error')
    throw e // required — signals Kanban to revert
  }
}
</script>

<template>
  <Kanban
    :raw-data="tasks"
    :columns="columns"
    group-key="statusId"
    position-key="position"
    @item-moved="onItemMoved"
  />
</template>
```

`meta` (5th argument) exposes `{ fromColumnId, oldIndex, newIndex, previousPosition, revert }` if you ever need an imperative undo outside the promise contract.

---

#### Disabling an Entire Column (Board-Level Lock)

Set `disabled: true` on any column definition to fully lock that board. Sortable.js will natively reject all drag attempts into or out of it — no workarounds needed. The column receives a visual tint and a 🔒 badge in the default header.

**Use case:** "Archived", "Closed", "Released" columns that must remain read-only.

```vue
<script setup>
import { Kanban } from 'vlite3'

const columns = [
  { id: 'active',   title: 'Active' },
  { id: 'archived', title: 'Archived', disabled: true }, // 🔒 fully locked
]

const data = [
  { id: 1, title: 'Live feature',    status: 'active',   position: 1024 },
  { id: 2, title: 'Retired feature', status: 'archived', position: 1024 },
]
</script>

<template>
  <Kanban :raw-data="data" :columns="columns" group-key="status" position-key="position" />
</template>
```

---

#### Disabling Specific Items (Item-Level Lock)

Pass an `:is-item-disabled` predicate. Any item for which the predicate returns `true` is individually locked — it cannot be dragged anywhere, but it still renders and is visible. Other items in the same column remain freely draggable.

**Use case:** Tasks that are "in review", "assigned to another user", or flagged with a `locked` property.

```vue
<script setup>
import { Kanban } from 'vlite3'

const columns = [
  { id: 'todo',        title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
]

const data = [
  { id: 1, title: 'Normal task',  status: 'todo', position: 1024, locked: false },
  { id: 2, title: 'Locked task',  status: 'todo', position: 2048, locked: true }, // 🔒 item locked
  { id: 3, title: 'Another task', status: 'todo', position: 3072, locked: false },
]

// Return true for any item that should be undraggable
const isItemDisabled = (item) => item.locked === true
</script>

<template>
  <Kanban
    :raw-data="data"
    :columns="columns"
    group-key="status"
    position-key="position"
    :is-item-disabled="isItemDisabled"
  />
</template>
```

---

#### Combining Both: Locked Column + Locked Items

Both controls are fully composable. You can lock a whole column **and** lock individual items in other columns at the same time.

```vue
<script setup>
import { Kanban } from 'vlite3'

const columns = [
  { id: 'active',   title: 'Active' },
  { id: 'archived', title: 'Archived', disabled: true }, // board-level lock
]

const data = [
  { id: 1, title: 'Free task',   status: 'active',   position: 1024, locked: false },
  { id: 2, title: 'Locked task', status: 'active',   position: 2048, locked: true  }, // item-level lock
  { id: 3, title: 'Archived A',  status: 'archived', position: 1024, locked: false },
]

const isItemDisabled = (item) => item.locked === true
</script>

<template>
  <Kanban
    :raw-data="data"
    :columns="columns"
    group-key="status"
    position-key="position"
    :is-item-disabled="isItemDisabled"
  />
</template>
```

---

#### Slots Customization

| Slot Name | Scoped Props | Usage |
| :--- | :--- | :--- |
| `column-header` | `{ column, pageInfo }` | Replace the entire header UI. |
| `prepend-item` | `{ column, items }` | Add a "Create Task" button at the top of a column. |
| `item` | `{ item, column, isDisabled }` | **Crucial.** Customize the card design. `isDisabled` is `true` when the item or its board is locked. |
| `append-item` | `{ column, items }` | Add footers or summary info at the bottom. |

The `isDisabled` scoped prop on the `#item` slot lets you apply custom visual styling to locked items without duplicating the disable logic:

```vue
<template #item="{ item, isDisabled }">
  <div
    :class="[
      'p-3 rounded-lg border transition-colors',
      isDisabled
        ? 'opacity-60 cursor-not-allowed border-border'
        : 'cursor-grab hover:border-primary border-border',
    ]">
    <h4 class="text-sm font-medium">{{ item.title }}</h4>
    <span v-if="item.locked" class="text-xs text-amber-600">🔒 Locked</span>
  </div>
</template>
```

---

### Reactive grouping lifecycle

`rawData`, `columns`, `groupKey`, and `positionKey` are all reactive inputs. Whenever any of them change, the board rebuilds its internal column→item map from the original flat `rawData` using one shared resolver (`resolveKanbanGroupKey` — trim + case-insensitive match to canonical column ids).

Do **not** remount the board with `:key="groupBy"` to force a regroup — that is a workaround. Switch the `groupKey` / `columns` and the same cards redistribute immediately.

```vue
<script setup>
import { computed, ref } from 'vue'
import { Kanban } from 'vlite3'

const groupBy = ref('status')
const groupKey = computed(() => (groupBy.value === 'priority' ? 'priority' : 'statusId'))
const columns = computed(() =>
  groupBy.value === 'priority'
    ? [
        { id: 'LOW', title: 'Low' },
        { id: 'HIGH', title: 'High' },
        { id: '__no_priority__', title: 'No Priority', disabled: true },
        { id: '__unmapped__', title: 'Unmapped', disabled: true },
      ]
    : [
        { id: 'todo', title: 'To Do' },
        { id: 'done', title: 'Done' },
      ],
)
</script>

<template>
  <Kanban
    :raw-data="tasks"
    :columns="columns"
    :group-key="groupKey"
    position-key="position"
    empty-column-id="__no_priority__"
    unmapped-column-id="__unmapped__"
  />
</template>
```

### Senior Engineer's Notes (Best Practices)

1.  **Stop writing boilerplate:** Always prefer `:raw-data` and `@item-moved` over manually managing a `Record<string, any[]>` grouping state and computing next/prev positions manually.
2.  **Optimistic UI + automatic rollback:** The board updates locally on drop, awaits your `@item-moved` handler, and snaps the card back if the Promise rejects or returns `false`. Always `throw` (or `return false`) from a failed mutation — swallowing the error leaves a stale card in the wrong column.
3.  **Performance:** The board uses `v-memo` internally on items and explicitly prevents parent state reactivity death-loops by shallow cloning your `rawData` input.
4.  **Prefer board-level `disabled` for whole-column locks:** Setting `disabled: true` on a column delegates rejection to Sortable.js natively — it is zero-cost and happens before any Vue event fires.
5.  **Prefer `:is-item-disabled` over CSS tricks for item locks:** The predicate hooks into Sortable.js's `filter` option, so the drag is cancelled at the library level, not patched after the fact. This means `@item-moved` and `@move` are never called for disabled items — your backend stays safe without extra guards.
6.  **Use `isDisabled` in the `#item` slot for visual feedback:** The slot prop is already computed for you — no need to call your predicate again inside the template.
7.  **Never let cards vanish on regroup:** Provide `emptyColumnId` / `unmappedColumnId` (or rely on `includeOrphanColumns`) so null and stale group values stay visible.

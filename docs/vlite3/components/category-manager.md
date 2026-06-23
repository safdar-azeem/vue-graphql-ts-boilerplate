# Category Manager

**Import:** `import { CategoryManager, type CategoryItem } from 'vlite3'`

### Description

A production-ready, fully interactive tree manager for Vue 3. It allows users to create, edit, delete, and reorder hierarchical category structures with unlimited depth. It supports two distinct editing modes: **inline creation** (click-to-type, keyboard-confirmable) for speed, and a **modal form** for richer structured input via a fully customizable schema.

Built-in features include drag-and-drop reordering at every tree level, accordion expand/collapse, icon pickers, and a clean empty state.

---

### Props

| Prop               | Type              | Default                                    | Description                                                                             |
| :----------------- | :-------------- | :----------------------------------------- | :-------------------------------------------------------------------------------------- |
| `modelValue`       | `CategoryItem[]`| `[]`                                       | The nested category tree. Bind with `v-model`.                                          |
| `formSchema`       | `IForm[]?`      | Default schema (icon, title, description)  | Custom Form schema used in the Add/Edit modal. Overrides the default 3-field form.      |
| `readonly`         | `boolean`       | `false`                                    | Disables all mutations (add, edit, delete, drag). Renders the tree as a read-only view. |
| `loading`          | `boolean`       | `false`                                    | Shows a translucent overlay without destroying the component. **Use this instead of `v-if`** to preserve expanded/inline state across data refetches. |
| `defaultExpanded`  | `(string \| number)[]` | `undefined`                          | Array of category IDs to auto-expand on initial mount.                                  |
| `size`             | `'sm' \| 'md' \| 'lg'` | `'md'`                             | Size modifier applied to each tree node row.                                            |
| `emptyTitle`       | `string`        | `'No Categories Found'`                    | Heading shown in the empty state.                                                       |
| `emptyDescription` | `string`        | `'Get started by creating your first category.'` | Body text shown in the empty state.                                               |
| `*I18n`            | `string`        | `undefined`                                | Every text element in the component can be customized or localized. See **Customization & i18n** section. |

---

### Customization & i18n

Every string in the `CategoryManager` is customizable via props. You can pass raw strings (e.g. `addCategoryText="New Category"`) or i18n keys if you are using an i18n solution (e.g. `addCategoryTextI18n="myApp.newCategory"`).

| Property Type       | Available Props (Append `I18n` for i18n keys)                                                                                                           |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Empty State**     | `emptyTitle`, `emptyDescription`                                                                                                                        |
| **Header**          | `headerTitle`, `headerDescription`, `addCategoryText`, `createCategoryText`                                                                             |
| **Placeholders**    | `newRootPlaceholder`, `newSubcategoryPlaceholder`, `categoryTitlePlaceholder`                                                                           |
| **Modal**           | `modalTitleAdd`, `modalTitleAddChild`, `modalTitleEdit`, `modalSaveText`                                                                                |
| **Tooltips**        | `quickAddTooltip`, `advancedDetailsTooltip`, `deleteTooltip`, `saveTooltip`, `cancelTooltip`                                                            |

By default, the component looks for internal global keys using the `$t` utility (e.g., `vlite.categoryManager.emptyTitle`).

---

### Emits

| Event            | Payload          | Description                                                              |
| :--------------- | :--------------- | :----------------------------------------------------------------------- |
| `update:modelValue` | `CategoryItem[]` | Emitted on every mutation (add, edit, delete, reorder). Use with `v-model`. |
| `@onAdd`         | `CategoryItem`   | Emitted when a new category or sub-category is created.                  |
| `@onEdit`        | `CategoryItem`   | Emitted when an existing category is edited.                             |
| `@onDelete`      | `CategoryItem`   | Emitted when a category is deleted (the deleted item is passed).         |
| `@onReorder`     | `{ id, parentId, position }` | Emitted once after a drag-and-drop completes, providing the moved node's new placement details. |

---

### Data Model

#### `CategoryItem` Shape

| Field         | Type                  | Description                                                            |
| :------------ | :-------------------- | :--------------------------------------------------------------------- |
| `id`          | `string \| number`    | **Required.** Unique identifier. Auto-generated for inline creates.    |
| `title`       | `string`              | **Required.** Display name of the category.                            |
| `icon`        | `string?`             | Icon key (e.g., `'lucide:folder'`). Rendered as a visual prefix.       |
| `description` | `string?`             | Optional descriptor shown in the advanced modal form.                  |
| `children`    | `CategoryItem[]?`     | Nested sub-categories. The component auto-normalizes `undefined` to `[]`. |
| `[key]`       | `any`                 | Any additional fields are preserved on your data and passed through emits. |

---

### Slots

| Slot Name | Description |
| :--- | :--- |
| `header` | Replaces the entire header area (title + "Add Category" button). |

---

### Implementation Examples

#### 1. Basic Tree with v-model

```vue
<script setup>
import { ref } from 'vue'
import { CategoryManager, type CategoryItem } from 'vlite3'

const categories = ref<CategoryItem[]>([
  {
    id: 'cat-1',
    title: 'Electronics',
    icon: 'lucide:cpu',
    children: [
      { id: 'cat-1-1', title: 'Laptops', icon: 'lucide:laptop', children: [] },
    ],
  },
])
</script>

<template>
  <CategoryManager v-model="categories" />
</template>
```

#### 2. Full Event Handling

```vue
<template>
  <CategoryManager
    v-model="categories"
    @onAdd="(item) => console.log('Added:', item)"
    @onEdit="(item) => console.log('Edited:', item)"
    @onDelete="(item) => console.log('Deleted:', item)"
    @onReorder="(payload) => console.log('Reordered:', payload)"
  />
</template>
```

#### 3. Custom Form Schema for the Edit Modal

The modal that opens for "Add" and "Edit" actions is powered by the `<Form>` component. Pass any valid `IForm[]` schema to replace the default fields.

```vue
<script setup>
const customFormSchema = [
  { name: 'title', label: 'Name', type: 'text', required: true },
  { name: 'icon', label: 'Icon', type: 'iconPicker' },
  { name: 'color', label: 'Label Color', type: 'color', value: '#6366f1' },
  { name: 'isActive', label: 'Is Active', type: 'switch', value: true },
]
</script>

<template>
  <CategoryManager v-model="categories" :form-schema="customFormSchema" />
</template>
```

#### 4. Read-only Tree Display

```vue
<template>
  <CategoryManager :model-value="categories" readonly />
</template>
```

#### 5. Custom Header Slot

```vue
<template>
  <CategoryManager v-model="categories">
    <template #header>
      <h2 class="text-xl font-bold">Product Taxonomy</h2>
      </template>
  </CategoryManager>
</template>
```

#### 6. Production Pattern with API Refetching (Recommended)

When performing CRUD operations that trigger a data refetch, use the `:loading` prop **instead of `v-if`**. This keeps the component mounted and preserves all expanded/inline state across refetches.

```vue
<script setup>
import { computed } from 'vue'
import { CategoryManager, type CategoryManagerExpose } from 'vlite3'
import { useGetCategoriesQuery, useCreateCategoryMutation } from '@/graphql'

const { result, loading, refetch } = useGetCategoriesQuery(/* ... */)
const { mutate: create } = useCreateCategoryMutation()

const categories = computed(() => result.value?.getCategories?.items || [])
const categoryManagerRef = ref<CategoryManagerExpose | null>(null)

const handleAdd = async (item) => {
  await create({ data: { name: item.title, icon: item.icon } })
  refetch() // Component stays mounted, expanded sections preserved
}
</script>

<template>
  <!-- ✅ DO: Use :loading prop — component survives refetch -->
  <CategoryManager
    ref="categoryManagerRef"
    :loading="loading"
    :raw-data="categories"
    :default-expanded="['cat-1', 'cat-2']"
    @onAdd="handleAdd" />

  <!-- ❌ DON'T: v-if destroys the component and all internal state -->
  <!-- <CategoryManager v-if="!loading" :raw-data="categories" /> -->
</template>
```

#### 7. Programmatic Expand/Collapse (via ref)

```vue
<script setup>
const cmRef = ref()

// Expand all nodes
cmRef.value?.expandAll()
// Collapse all
cmRef.value?.collapseAll()
// Expand specific IDs
cmRef.value?.expand('cat-1', 'cat-2')
// Collapse specific IDs
cmRef.value?.collapse('cat-1')
// Read current expanded set
console.log(cmRef.value?.expandedIds)
</script>

<template>
  <CategoryManager ref="cmRef" v-model="categories" />
</template>
```

---

### Data Contract for AI Agents (JSON Template)

```json
[
  {
    "id": "cat-1",
    "title": "Electronics",
    "icon": "lucide:cpu",
    "children": [
      {
        "id": "cat-1-1",
        "title": "Computers",
        "icon": "lucide:monitor",
        "children": [
          { "id": "cat-1-1-1", "title": "Laptops", "icon": "lucide:laptop", "children": [] },
          { "id": "cat-1-1-2", "title": "Desktops", "icon": "lucide:pc-case", "children": [] }
        ]
      },
      { "id": "cat-1-2", "title": "Smartphones", "icon": "lucide:smartphone", "children": [] }
    ]
  }
]
```

---

### Exposed API (via `ref`)

Access these by setting a template ref on the component:

| Method / Property | Type | Description |
| :--- | :--- | :--- |
| `expandedIds` | `Ref<Set<string \| number>>` | Reactive set of currently expanded node IDs. |
| `expandAll()` | `() => void` | Expands every node in the tree. |
| `collapseAll()` | `() => void` | Collapses all nodes. |
| `expand(...ids)` | `(...ids: (string \| number)[]) => void` | Expands specific node(s) by ID. |
| `collapse(...ids)` | `(...ids: (string \| number)[]) => void` | Collapses specific node(s) by ID. |

---

### Senior Engineer's Notes

1.  **Two edit modes**: Each node has a **quick-add inline** mode (click ➕, type, press Enter to confirm or Esc to cancel) and a **modal form** mode (click the settings icon ⚙️). The inline mode is fast for 90% of cases; the modal is for structured data.
2.  **Unlimited depth**: The tree is rendered recursively via an internal `CategoryNode` component. There is no hard depth limit, though deep nesting (~5+) should be carefully considered from a UX perspective.
3.  **`children` auto-normalization**: If your API returns nodes without a `children` key, the component silently initializes it to `[]` during the deep clone on `watch`. This prevents undefined references in the recursive renderer and reorder logic.
4.  **Extra data fields are safe**: The `CategoryItem` interface uses `[key: string]: any` — your backend-specific fields (`slug`, `meta`, etc.) pass through undisturbed on all emit payloads.
5.  **Optimized Drag-and-Drop Syncing**: Items can be freely reordered within their parent group or extracted seamlessly to the root. Upon releasing a dragged node, the component emits the completely updated tree via `update:modelValue`. Simultaneously, `@onReorder` triggers exactly once per drop with a minimal payload (`id`, `parentId`, `position`), eliminating continuous mid-drag emissions and allowing for extremely efficient network updates to your API.
6.  **Self-contained state**: The component deep-clones your `modelValue` internally on initialization. All edits operate on this internal clone and emit the final state up. This prevents accidental mutation of your parent state.
7.  **State preservation on refetch**: When using the `:loading` prop instead of `v-if`, the component stays mounted through data refetches. The `rawData` watcher intelligently prunes stale IDs from the expanded set while preserving valid ones, so users never lose their place in the tree.
8.  **Empty data handling**: Deleting the last category via API (resulting in an empty `rawData` array) is handled correctly — the component clears its internal state and shows the empty state.

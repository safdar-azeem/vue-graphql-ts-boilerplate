# PermissionEditor

**Import:** `import { PermissionEditor } from 'vlite3'`

A single-role permission editor that renders grouped permissions with search, bulk group toggle, module filtering, and select-all controls. The `v-model` is a flat `string[]` of granted permission keys.

Use this when you need to assign permissions to a single role or user. For managing permissions across multiple roles simultaneously, use [`PermissionMatrix`](./PermissionMatrix.md).

---

## Props

| Prop              | Type                      | Default      | Description                                                                                       |
| :---------------- | :------------------------ | :----------- | :------------------------------------------------------------------------------------------------ |
| `modelValue`      | `string[]`                | —            | **Required.** Array of granted permission keys (v-model)                                          |
| `groups`          | `PermissionGroup[]`       | —            | **Required.** Permission groups with nested permissions                                           |
| `toggleMode`      | `PermissionToggleMode`    | `'checkbox'` | Toggle display mode for each permission row                                                       |
| `searchable`      | `boolean`                 | `true`       | Show search input above the permission list                                                       |
| `collapsible`     | `boolean`                 | `true`       | Allow groups to be collapsed/expanded by clicking their header                                    |
| `readonly`        | `boolean`                 | `false`      | Disable all toggles — display-only mode                                                           |
| `size`            | `PermissionMatrixSize`    | `'md'`       | Size variant affecting padding and text size                                                      |
| `class`           | `string`                  | `''`         | Extra CSS classes applied to the root element                                                     |
| `defaultExpanded` | `string[]`                | `[]`         | Group keys to start expanded. All other groups start collapsed. If empty, all groups are expanded |
| `layout`          | `PermissionEditorLayout`  | `'list'`     | Layout mode: `'list'` (default grouped list) or `'matrix'` (table with action columns)            |
| `matrixGroups`    | `PermissionMatrixGroup[]` | `[]`         | Matrix groups — used when `layout` is `'matrix'`                                                  |

---

## Events

| Event               | Payload    | Description                                      |
| :------------------ | :--------- | :----------------------------------------------- |
| `update:modelValue` | `string[]` | Emitted when the selected permission keys change |

---

## Slots

| Slot | Description                                    |
| :--- | :--------------------------------------------- |
| —    | No named slots. All UI is rendered internally. |

---

## Types

```ts
/** A single permission definition */
export interface PermissionDef {
  /** Unique key, e.g. 'hrm_manage_payroll' */
  key: string
  /** Display label, e.g. 'Manage Payroll' */
  label: string
  /** Optional tooltip description shown as an info icon next to the label */
  description?: string
}

/** Group of permissions under a module/category */
export interface PermissionGroup {
  /** Unique group key, e.g. 'hrm' */
  key: string
  /** Display label, e.g. 'HRM' */
  label: string
  /** Optional icon (Iconify format), e.g. 'lucide:briefcase' */
  icon?: string
  /** Permissions belonging to this group */
  permissions: PermissionDef[]
}

export type PermissionToggleMode = 'checkbox' | 'switch'
export type PermissionMatrixSize = 'sm' | 'md'
export type PermissionEditorLayout = 'list' | 'matrix'

/** A column (action) in the matrix layout */
export interface PermissionMatrixAction {
  key: string // e.g. 'create'
  label: string // e.g. 'Create'
}

/** A row (entity) in the matrix layout */
export interface PermissionMatrixRow {
  key: string // e.g. 'employee'
  label: string // e.g. 'Employee'
  /** Which action keys this row supports. Others render as disabled. */
  actions: string[]
  /** If true, key is `{prefix}-{row.key}` instead of `{prefix}-{row.key}-{action.key}` */
  singleKey?: boolean
  description?: string
}

/** A group of matrix rows sharing the same actions */
export interface PermissionMatrixGroup {
  key: string // permission prefix, e.g. 'hrm'
  label: string
  icon?: string
  actions: PermissionMatrixAction[]
  rows: PermissionMatrixRow[]
}
```

---

## Features

- **Search** — Filters permissions and group labels in real time. Groups containing matches auto-expand; unmatched groups collapse. The original collapsed state is restored when the search is cleared.
- **Module filter dropdown** — A filter button opens a multi-select dropdown to show only specific groups. An active filter count badge appears on the button. A "Clear filters" link resets the selection.
- **Bulk group toggle** — Each group header has a checkbox or switch that selects/deselects all permissions in that group. An indeterminate state is shown when only some permissions are selected.
- **Select All / Clear** — Top-bar controls to select all permissions across all groups or clear all selections at once. The "Clear" button is hidden when nothing is selected.
- **Stats counter** — Displays `{selected} / {total} selected` in the top bar.
- **Collapsible groups** — Clicking a group header toggles it open or closed. Manual toggles persist through search cycles.
- **`defaultExpanded`** — Seed which groups open on mount; all others start collapsed.
- **Readonly mode** — All toggles are visually disabled; no changes can be made.
- **Size variants** — `sm` reduces padding and font sizes for compact layouts.
- **Tooltips** — Permissions with a `description` field render an info icon that shows a tooltip on hover.

---

## Matrix Layout

Set `layout="matrix"` and pass `matrixGroups` to render permissions as a table with action columns (Create, Delete, View, Update, Manage, etc.) and entity rows. Cells map to permission keys using the pattern `{group.key}-{row.key}-{action.key}` (e.g. `hrm-employee-create`). Rows with `singleKey: true` produce `{group.key}-{row.key}` regardless of action.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PermissionEditor } from 'vlite3'
import type { PermissionMatrixGroup } from 'vlite3'

const matrixGroups: PermissionMatrixGroup[] = [
  {
    key: 'hrm',
    label: 'HRM',
    icon: 'lucide:briefcase',
    actions: [
      { key: 'create', label: 'Create' },
      { key: 'delete', label: 'Delete' },
      { key: 'view', label: 'View' },
      { key: 'update', label: 'Update' },
      { key: 'manage', label: 'Manage' },
    ],
    rows: [
      { key: 'employee', label: 'Employee', actions: ['create', 'delete', 'view', 'update'] },
      { key: 'branch', label: 'Branch', actions: ['create', 'delete', 'view', 'update'] },
      { key: 'can-share', label: 'Can Share', actions: ['manage'], singleKey: true },
      { key: 'can-download', label: 'Can Download', actions: ['manage'], singleKey: true },
    ],
  },
]

const perms = ref<string[]>([
  'hrm-employee-view',
  'hrm-employee-delete',
  'hrm-employee-create',
  'hrm-branch-create',
  'hrm-branch-view',
  'hrm-can-share',
  'hrm-can-download',
])
</script>

<template>
  <PermissionEditor v-model="perms" layout="matrix" :matrix-groups="matrixGroups" />
</template>
```

**Output:**

```json
[
  "hrm-employee-view",
  "hrm-employee-delete",
  "hrm-employee-create",
  "hrm-branch-create",
  "hrm-branch-view",
  "hrm-can-share",
  "hrm-can-download"
]
```

---

## Usage

### Basic (Checkbox mode)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PermissionEditor } from 'vlite3'
import type { PermissionGroup } from 'vlite3'

const groups: PermissionGroup[] = [
  {
    key: 'users',
    label: 'Users',
    icon: 'lucide:users',
    permissions: [
      {
        key: 'users_manage_employees',
        label: 'Manage Employees',
        description: 'Create, edit, delete employee records',
      },
      { key: 'users_view_employees', label: 'View Employees' },
      { key: 'users_manage_customers', label: 'Manage Customers' },
      { key: 'users_view_customers', label: 'View Customers' },
    ],
  },
  {
    key: 'hrm',
    label: 'HRM',
    icon: 'lucide:briefcase',
    permissions: [
      {
        key: 'hrm_manage_payroll',
        label: 'Manage Payroll',
        description: 'Create and edit payroll runs',
      },
      { key: 'hrm_view_payroll', label: 'View Payroll' },
      { key: 'hrm_manage_leaves', label: 'Manage Leaves' },
      { key: 'hrm_view_leaves', label: 'View Leaves' },
    ],
  },
]

const selectedPermissions = ref<string[]>([
  'users_view_employees',
  'hrm_view_payroll',
  'hrm_view_leaves',
])
</script>

<template>
  <PermissionEditor v-model="selectedPermissions" :groups="groups" />
</template>
```

---

### Switch mode

```vue
<PermissionEditor v-model="selectedPermissions" :groups="groups" toggle-mode="switch" />
```

---

### Controlling which groups start expanded

Use `defaultExpanded` to open only specific groups on mount. All other groups will start collapsed.

```vue
<PermissionEditor
  v-model="selectedPermissions"
  :groups="groups"
  :default-expanded="['users', 'hrm']" />
```

---

### Readonly mode

```vue
<PermissionEditor v-model="selectedPermissions" :groups="groups" readonly />
```

---

### Compact size

```vue
<PermissionEditor v-model="selectedPermissions" :groups="groups" size="sm" />
```

---

### Without search

```vue
<PermissionEditor v-model="selectedPermissions" :groups="groups" :searchable="false" />
```

---

### Non-collapsible groups

```vue
<PermissionEditor v-model="selectedPermissions" :groups="groups" :collapsible="false" />
```

---

### Reading the selected value

The `v-model` is a plain `string[]` of granted permission keys. You can inspect or submit it directly.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { PermissionEditor } from 'vlite3'

const perms = ref<string[]>([])

function save() {
  console.log('Granted permissions:', perms.value)
  // e.g. ['users_view_employees', 'hrm_view_payroll']
}
</script>

<template>
  <PermissionEditor v-model="perms" :groups="groups" />
  <button @click="save">Save Role</button>
</template>
```

---

## Behavior Notes

- The **module filter dropdown** and **search** are additive — both can be active simultaneously. Only groups/permissions matching all active filters are shown.
- When **search is cleared**, the collapsed state reverts to its last manually set state (not the initial `defaultExpanded`). This means if a user manually collapses a group during a search session, that state is preserved after clearing search.
- The **group bulk checkbox** shows an indeterminate state when some (but not all) permissions in that group are selected. Clicking it when indeterminate selects all; clicking it when all are selected deselects all.
- In **readonly mode**, `selectAll` and `deselectAll` are no-ops and the top-bar action buttons are hidden.
- **`defaultExpanded`** only runs on `onMounted`. Changing it after mount has no effect.

# CustomFields

**Import:** `import { CustomFields } from 'vlite3'`

### Description

A powerful array/repeater field component that allows users to add, remove, edit, and reorder multiple rows of structured data based on a provided schema. It can be used as a standalone component via `v-model` independently from the main `Form` component.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `modelValue` | `Record<string, any>[]` | `[]` | Array of row objects to bind to |
| `schema` | `IForm[]` | required | Array of field definitions for the columns |
| `headers` | `string[]` | `[]` | Optional custom column headers (overrides schema labels) |
| `label` | `string` | — | Display label for the entire component |
| `labelI18n` | `string` | — | I18n translation key for the label |
| `variant` | `InputVariant` | `'outline'` | Style variant for all inputs inside the table |
| `size` | `InputSize` | `'md'` | Size of inputs |
| `rounded` | `InputRounded` | `'md'` | Border radius of inputs |
| `disabled` | `boolean` | `false` | Disable all inputs and adding/removing rows |
| `draggable` | `boolean` | `false` | Enable drag and drop reordering of rows |
| `showRowNumbers` | `boolean` | `false` | Show a column with row index numbers |
| `minRows` | `number` | `0` | Minimum number of rows allowed |
| `maxRows` | `number` | — | Maximum number of rows allowed |
| `addButtonText`| `string` | `'Add Row'` | Text for the add button |
| `layout` | `'table' \| 'accordion'` | `'table'` | Structural rendering layout |
| `rowTitleKey` | `string` | — | Row object key used as the title in accordion headers and small-screen stacked table card headers (e.g. `'label'`, `'title'`). When omitted, titles resolve smartly from `label` / `title` / `name`, then the first filled text/select/object-label field. Stacked cards fall back to `#N` when nothing resolves |
| `accordionTitleKey` | `string` | — | Deprecated alias for `rowTitleKey` (backward compatible) |
| `values` | `Record<string, any>` | `{}` | Context values (used if inputs depend on external form state) |
| `isUpdate` | `boolean` | `false` | Mode for update/edit operations |

### Events

- `@update:modelValue` (value: `Record<string, any>[]`): Emitted when rows are added, removed, reordered, or when any field inside a row changes.
- `@change` (value: `Record<string, any>[]`): Alias for `update:modelValue`.

### Usage

#### Basic Usage

You can use `CustomFields` directly anywhere in your app using `v-model`.

```vue
<script setup>
import { ref } from 'vue'
import { CustomFields } from 'vlite3'

const teamMembers = ref([
  { name: 'John Doe', role: 'developer' }
])

const memberSchema = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter name' },
  { 
    name: 'role', 
    label: 'Role', 
    type: 'select', 
    options: [
      { label: 'Developer', value: 'developer' },
      { label: 'Designer', value: 'designer' },
      { label: 'Manager', value: 'manager' }
    ]
  }
]
</script>

<template>
  <div class="p-6">
    <CustomFields
      v-model="teamMembers"
      :schema="memberSchema"
      label="Team Members"
      draggable
      showRowNumbers
      :minRows="1"
      :maxRows="5"
    />
    
    <div class="mt-4 p-4 bg-gray-50 rounded">
      <pre class="text-xs">{{ teamMembers }}</pre>
    </div>
  </div>
</template>
```

#### Custom Headers

By default, column headers are generated from the `label` properties in your schema. You can override these using the `headers` prop.

```vue
<CustomFields
  v-model="items"
  :schema="schema"
  :headers="['Full Name', 'Assigned Role']"
/>
```

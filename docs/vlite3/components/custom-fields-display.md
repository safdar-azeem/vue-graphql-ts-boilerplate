# Custom Fields Display

**Import:** `import { CustomFieldsDisplay } from 'vlite3'`

### Description

A versatile display component for rendering arrays of key-value pairs (custom fields) in various layouts. It supports grid, list, card, and inline variants, complete with an optional header and icon.

---

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `fields` | `CustomFieldItem[]` | `[]` | Array of field data objects. |
| `variant` | `CustomFieldsDisplayVariant` | `'grid'` | Layout style: `'grid' \| 'list' \| 'card' \| 'inline'`. |
| `columns` | `1 \| 2 \| 3 \| 4` | `2` | Number of columns (used for grid/card variants). |
| `title` | `string?` | `''` | Display title for the header. |
| `titleI18n` | `string?` | `''` | i18n key for the title. |
| `icon` | `string?` | `''` | Icon name for the header. |
| `emptyText` | `string` | `'--'` | Text to show if the `fields` array is empty. |
| `keyProp` | `string` | `'key'` | Property name for the field label. |
| `valueProp` | `string` | `'value'` | Property name for the field value. |
| `class` | `string?` | `''` | Additional CSS class for the container. |
| `listValueThreshold` | `number` | `50` | (List Variant) Character count threshold to stack label and value vertically. |

---

### Layout Variants

| Variant | Best Use Case | Appearance |
| :--- | :--- | :--- |
| `grid` | Standard dashboard info displays. | Label (uppercase text-xs) above the value (text-sm). |
| `list` | Sidebars or mobile-first property lists. | Horizontal row with label on the left and value on the right. |
| `card` | High-emphasis feature or project details. | Each field rendered in a bordered card with `bg-card`. |
| `inline` | Compact tags or metadata pills. | Pill-shaped items with label and value separated by a colon. |

---

### Slots

| Slot Name | Scoped Props | Description |
| :--- | :--- | :--- |
| `title` | `—` | Replace the entire header content. |
| `key` | `{ field, index }` | Customize the rendering of the label for each item. |
| `value` | `{ field, index }` | Customize the rendering of the value for each item. |
| `empty` | `—` | Replace the default empty state UI. |

---

### Implementation Examples

#### 1. Basic List with Header

```vue
<script setup>
import { CustomFieldsDisplay } from 'vlite3'

const stats = [
  { key: 'Department', value: 'Engineering' },
  { key: 'Location', value: 'Remote' },
]
</script>

<template>
  <CustomFieldsDisplay 
    title="Employee Info" 
    icon="lucide:user" 
    :fields="stats" 
    variant="list" 
  />
</template>
```

#### 2. Grid Layout with 3 Columns

```vue
<template>
  <CustomFieldsDisplay 
    :fields="data" 
    variant="grid" 
    :columns="3" 
  />
</template>
```

---

### Senior Engineer's Notes

1.  **Dynamic Keys/Values**: Use `keyProp` and `valueProp` to map the component to existing data models without restructuring your arrays.
2.  **Adaptive List Layout**: In the `list` variant, the component automatically switches from horizontal to vertical stacking if a value exceeds the `listValueThreshold` (default: 50 characters). This prevents layout breakage for long descriptions.
3.  **Automatic Formatting**: The component handles booleans (`true` → "Yes") and arrays (`['A', 'B']` → "A, B") automatically. For complex objects, it falls back to a JSON-serialized string.
4.  **Semantic Styling**: Labels in `grid` and `card` variants are automatically transformed to uppercase with tracking-wider for a "metadata" look.

# ExportData

**Import:** `import { ExportData } from 'vlite3'`

### Description

`ExportData` is a flexible, self-contained component for exporting arrays of data to **Excel (.xlsx)**, **CSV (.csv)**, and **JSON (.json)** files directly in the browser (frontend mode) or by delegating to a backend API (backend mode).

Key capabilities:

- Supports **dot-notation** field paths for nested object properties (e.g., `'address.city'`).
- Supports **custom `format` functions** per field for value transformation before export.
- Adds a **UTF-8 BOM** to CSV output for correct character encoding in Excel.
- Exposes `exportData()` and `availableFormats` via `defineExpose` for programmatic use.

---

### Props

| Prop         | Type                                              | Default                    | Description                                                                                                                        |
| :----------- | :------------------------------------------------ | :------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `data`       | `any[]`                                           | _(required)_               | The array of data objects to export.                                                                                               |
| `title`      | `string`                                          | `'Export Data'`            | Used as the modal title and the default filename base (spaces converted to dashes, lowercased). Also used as the Excel sheet name. |
| `fields`     | `ExportField[]`                                   | _(required)_               | Ordered array of field definitions. Each entry maps a data property to a column title. See `ExportField` type below.               |
| `formats`    | `ExportFormat[]`                                  | `['excel', 'csv', 'json']` | Array of enabled export formats. If only one format is provided, clicking the button exports immediately (no modal shown).         |
| `filename`   | `string`                                          | _(derived from title)_     | Custom base filename without extension (e.g., `'users_2025'`). Defaults to `{title}-{YYYY-MM-DD}`.                                 |
| `buttonText` | `string`                                          | `'Export'`                 | Label for the trigger button.                                                                                                      |
| `buttonIcon` | `string`                                          | `'lucide:download'`        | Iconify icon ID for the trigger button.                                                                                            |
| `mode`       | `'frontend' \| 'backend'`                         | `'frontend'`               | Controls where export processing happens. `'frontend'` builds the file in the browser. `'backend'` calls `onExport` instead.       |
| `onExport`   | `(format: ExportFormat) => Promise<void> \| void` | —                          | Required when `mode='backend'`. Called with the selected format. You are responsible for triggering the file download.             |

---

### `ExportField` Type

```ts
export interface ExportField {
  field: string // Property path in the data object. Supports dot notation (e.g., 'address.city').
  title: string // Column header label in the exported file.
  format?: (value: any, row: any) => any // Optional transform applied to the cell value before export.
  // Receives the raw cell value and the full row object.
}
```

---

### `ExportFormat` Type

```ts
export type ExportFormat = 'excel' | 'csv' | 'json'
```

---

### `ExportDataProps` Interface (Full)

```ts
export interface ExportDataProps {
  data: any[]
  title?: string
  fields: ExportField[]
  formats?: ExportFormat[]
  filename?: string
  buttonText?: string
  buttonIcon?: string
  mode?: 'frontend' | 'backend'
  onExport?: (format: ExportFormat) => Promise<void> | void
}
```

---

### Exposed Methods (`defineExpose`)

These can be accessed via a template `ref` on the component:

| Name               | Signature                                                             | Description                                                            |
| :----------------- | :-------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| `exportData`       | `(format: ExportFormat, close?: () => void) => Promise<void>`         | Programmatically triggers an export. Optionally closes a parent modal. |
| `availableFormats` | `ComputedRef<{ label: string; value: ExportFormat; icon: string }[]>` | Reactive list of enabled format options (filtered by `formats` prop).  |

---

### Slots

| Slot     | Description                         |
| :------- | :---------------------------------- |
| _(none)_ | This component has no public slots. |

---

### Internal Behavior Details

**Filename Generation:** If `filename` is not set, the file is named `{title.toLowerCase().replace(/\s+/g, '-')}-{YYYY-MM-DD}`. For example, `title="Users Report"` generates `users-report-2025-07-04.xlsx`.

**Dot-notation Support:** The field path `'address.city'` correctly reads `row.address.city` using a recursive `getNestedValue` helper. Returns `''` for missing/null values.

**UTF-8 BOM for CSV:** A BOM (`\uFEFF`) is prepended to all CSV output. This ensures that special characters (accents, Arabic, CJK) display correctly when opened in Microsoft Excel.

**Single-Format Mode:** When `formats` contains exactly one item, clicking the button immediately triggers the export without showing a modal.

**Multi-Format Mode:** When `formats` contains more than one item, a modal dialog is shown with one button per format.

**Backend Mode:** When `mode='backend'`, the component skips all client-side data processing and calls `onExport(format)` directly. No file is generated by the component itself — your `onExport` callback is fully responsible for the download.

---

### Usage Examples

#### 1. Basic Frontend Export (All Formats)

```vue
<script setup>
import { ExportData } from 'vlite3'

const users = [
  {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    address: { city: 'New York' },
    balance: 1250.5,
  },
  { id: 2, name: 'Bob', email: 'bob@example.com', address: { city: 'London' }, balance: 340.0 },
]

const exportFields = [
  { field: 'id', title: 'User ID' },
  { field: 'name', title: 'Full Name' },
  { field: 'email', title: 'Email Address' },
  { field: 'address.city', title: 'City' },
  { field: 'balance', title: 'Balance ($)', format: (val) => `$${val.toFixed(2)}` },
]
</script>

<template>
  <ExportData
    :data="users"
    title="Users Report"
    filename="users_2025"
    :fields="exportFields"
    :formats="['excel', 'csv', 'json']" />
</template>
```

---

#### 2. Single Format — Direct CSV Download

When `formats` has exactly one entry, clicking the button exports immediately with no modal.

```vue
<template>
  <ExportData
    :data="orders"
    title="Orders"
    button-text="Download CSV"
    button-icon="lucide:file-down"
    :fields="orderFields"
    :formats="['csv']" />
</template>
```

---

#### 3. Custom Value Formatting

Use the `format` function on any field to transform values before they appear in the exported file.

```vue
<script setup>
const fields = [
  { field: 'status', title: 'Status', format: (val) => val.toUpperCase() },
  { field: 'price', title: 'Price', format: (val) => `$${Number(val).toFixed(2)}` },
  { field: 'date', title: 'Created At', format: (val) => new Date(val).toLocaleDateString() },
  {
    field: 'tags',
    title: 'Tags',
    format: (val, row) => (Array.isArray(val) ? val.join(', ') : val),
  },
]
</script>
```

---

#### 4. Backend Export Mode

In backend mode, the component collects the user's format choice and delegates everything to your callback.

```vue
<script setup>
import { ExportData } from 'vlite3'
import { myApi } from '@/api'
import { saveAs } from 'file-saver'

const fields = [
  { field: 'id', title: 'ID' },
  { field: 'name', title: 'Name' },
]

const handleBackendExport = async (format) => {
  const blob = await myApi.exportUsers({ format })
  saveAs(blob, `users-export.${format === 'excel' ? 'xlsx' : format}`)
}
</script>

<template>
  <ExportData
    :data="[]"
    title="Users Report"
    :fields="fields"
    :formats="['excel', 'csv']"
    mode="backend"
    :on-export="handleBackendExport" />
</template>
```

---

#### 5. Programmatic Export via Template Ref

Use `defineExpose` to trigger exports from external buttons or logic.

```vue
<script setup>
import { ref } from 'vue'
import { ExportData } from 'vlite3'

const exportRef = ref(null)

const triggerExcel = () => {
  exportRef.value?.exportData('excel')
}
</script>

<template>
  <ExportData ref="exportRef" :data="data" :fields="fields" class="hidden" />

  <Button @click="triggerExcel" icon="lucide:file-spreadsheet"> Export to Excel </Button>
</template>
```

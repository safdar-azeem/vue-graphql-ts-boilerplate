# ImportData

**Import:** `import { ImportData } from 'vlite3'`

### Description

`ImportData` is a production-ready, multi-step CSV import component. It provides a complete guided wizard experience including file upload (drag-and-drop or paste), automatic field mapping with override controls, conflict resolution options, and real-time batch processing with progress tracking.

The wizard has **4 steps**:

1. **Upload** — Drag & drop a CSV file or paste raw CSV/TSV data.
2. **Mapping** — Match CSV column headers to your defined system fields. Supports auto-detection and allows ignoring specific columns.
3. **Options** — Choose how to handle existing records (update, add as new, skip) and new records (create, skip).
4. **Import** — Shows a live circular progress indicator during processing. On completion shows a detailed summary (created, updated, skipped, failed) with optional error details.

---

### Props

| Prop           | Type                                                          | Default           | Description                                                                                                                            |
| :------------- | :------------------------------------------------------------ | :---------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `fields`       | `ImportField[]`                                               | _(required)_      | Definitions of the system fields to map CSV columns to. See `ImportField` type below.                                                  |
| `processBatch` | `(payload: ImportBatchPayload) => Promise<ImportBatchResult>` | _(required)_      | Async callback called for each batch of rows. Receives processed, mapped data and import options. Must return a result summary object. |
| `title`        | `string`                                                      | `'Import Data'`   | Title displayed in the modal header and on the trigger button.                                                                         |
| `titleI18n`    | `string`                                                      | —                 | i18n key for the modal title. Takes priority over `title` when set.                                                                    |
| `buttonText`   | `string`                                                      | `'Import'`        | Label for the default trigger button.                                                                                                  |
| `buttonIcon`   | `string`                                                      | `'lucide:upload'` | Iconify icon ID for the default trigger button.                                                                                        |
| `batchSize`    | `number`                                                      | `200`             | Number of rows processed per `processBatch` call. Increase for faster APIs, decrease for rate-limited or heavy processing.             |
| `onComplete`   | `() => void`                                                  | —                 | Optional callback invoked after all batches complete successfully. Use this to trigger a `refetch` on the parent screen.               |
| `show`         | `boolean`                                                     | `false`           | v-model binding to control the modal's open/closed state externally (used by Screen's "Import Data" option).                           |

---

### `ImportField` Type

```ts
export interface ImportField {
  field: string // System field key / property name in your data model.
  title: string // Human-readable label shown in the mapping table column.
  required?: boolean // If true, the field MUST be mapped or a validation error is shown.
  matchings?: string[] // Alternative CSV header names that auto-map to this field.
  // Matching is case-insensitive and uses camelCase normalization.
  expectedType?: 'string' | 'number' | 'boolean' | 'array' | 'object'
  // If set, values are coerced to this type during data organization.
  defaultValue?: any // Value used when the CSV cell is empty/null/undefined.
  onMatch?: (value: any) => any // Transform function applied to each matched value after type coercion.
}
```

---

### `ImportOptions` Type

Controlled by the user in Step 3. Passed to `processBatch` inside the payload.

```ts
export interface ImportOptions {
  existing: 'add' | 'replace' | 'skip'
  // 'add'     — Create a duplicate record even if a match is found.
  // 'replace' — Overwrite (update) the matching record with imported data.
  // 'skip'    — Ignore the row if a matching record already exists.

  new: 'create' | 'skip'
  // 'create' — Create a new record for rows with no existing match.
  // 'skip'   — Ignore the row if no existing match is found.
}
```

---

### `ImportBatchPayload` Type

The object passed to your `processBatch` function.

```ts
export interface ImportBatchPayload {
  data: any[] // Batch of fully mapped and transformed row objects.
  options: ImportOptions // User-selected conflict resolution options from Step 3.
}
```

---

### `ImportBatchResult` Type

The object your `processBatch` function **must** return.

```ts
export interface ImportBatchResult {
  processed: number // Total rows processed in this batch.
  created: number // Rows that resulted in a new record being created.
  updated: number // Rows that resulted in an existing record being updated.
  skipped: number // Rows that were intentionally skipped.
  failed: number // Rows that encountered an error during processing.
  errors: {
    // Details for each failed row.
    record: string // Row identifier (usually the 1-based row index as a string).
    message: string // Human-readable error description.
  }[]
}
```

---

### `ImportDataProps` Interface (Full)

```ts
export interface ImportDataProps {
  title?: string
  titleI18n?: string
  buttonText?: string
  buttonIcon?: string
  fields: ImportField[]
  batchSize?: number
  processBatch: (payload: ImportBatchPayload) => Promise<ImportBatchResult>
  onComplete?: () => void
}
```

---

### Events

| Event          | Payload   | Description                                                                     |
| :------------- | :-------- | :------------------------------------------------------------------------------ |
| `@update:show` | `boolean` | Emitted when the modal is opened or closed. Enables `v-model:show` binding.     |
| `@complete`    | _(none)_  | Emitted after all batches have finished processing (maps to `onComplete` prop). |

---

### Slots

| Slot      | Description                                                                                   |
| :-------- | :-------------------------------------------------------------------------------------------- |
| `trigger` | Replaces the default trigger button. When `show` prop is used externally, this is not needed. |

---

### Internal Behavior Details

**Auto-mapping:** In Step 1, after parsing the CSV, the component automatically matches each CSV header to a system field using `camelCase` normalization. The matching process checks both the `field` key and all strings in the `matchings` array. For example, a CSV header `"Email Address"` will auto-map to `{ field: 'email', matchings: ['email address', 'mail'] }`.

**Mapping Validation:** Proceeding from Step 2 triggers validation. Two rules are enforced:

1. **Duplicate mapping:** The same system field cannot be mapped to more than one CSV column.
2. **Required fields:** All fields with `required: true` must be mapped to a CSV column.

If validation fails, error messages are displayed below the mapping table and the wizard does not advance.

**Ignore Column:** In Step 2, each CSV column has an "Ignore" checkbox. Checking it sets that column's mapping to `''` (empty), meaning its data is excluded from the organized output passed to `processBatch`.

**Data Organization:** Before calling `processBatch`, the component transforms the raw parsed CSV rows:

- Applies the `field → CSV header` mapping in reverse to produce objects with correct system keys.
- Handles dot-notation fields (e.g., `'address.city'`) by building nested objects.
- Applies `expectedType` coercions.
- Applies `defaultValue` for blank cells.
- Applies `onMatch` transform functions.

**Batch Processing:** Large CSVs are split into chunks of `batchSize` rows. Each chunk is sent to `processBatch` sequentially. Progress is accumulated across all batches.

**Progress Simulation:** While batches are in flight, a smooth CSS-animated circular progress indicator is shown. A small timer also increments the percentage display for perceived responsiveness, capped at 99% until all batches complete.

**State Reset:** When the modal is closed (via the `@close` event), all internal state is fully reset: current step, files, mappings, options, import data, and progress.

---

### Usage Examples

#### 1. Standard Importer

```vue
<script setup>
import { ImportData } from 'vlite3'

const fields = [
  {
    field: 'firstName',
    title: 'First Name',
    required: true,
    matchings: ['name', 'fname', 'first name'],
  },
  {
    field: 'lastName',
    title: 'Last Name',
    matchings: ['lname', 'surname', 'last name'],
  },
  {
    field: 'email',
    title: 'Email Address',
    required: true,
    matchings: ['mail', 'email address'],
  },
  {
    field: 'role',
    title: 'User Role',
    expectedType: 'string',
    defaultValue: 'User',
  },
  {
    field: 'address.city',
    title: 'City',
    matchings: ['city', 'location'],
  },
]

const handleBatch = async ({ data, options }) => {
  const result = await myApi.importUsers(data, options)
  return {
    processed: data.length,
    created: result.created,
    updated: result.updated,
    skipped: result.skipped,
    failed: result.failed,
    errors: result.errors || [],
  }
}
</script>

<template>
  <ImportData
    title="Import Users"
    button-text="Import CSV"
    button-icon="lucide:upload-cloud"
    :fields="fields"
    :batch-size="100"
    :process-batch="handleBatch"
    :on-complete="fetchUsers" />
</template>
```

---

#### 2. Custom Trigger Button

```vue
<template>
  <ImportData :fields="fields" :process-batch="handleBatch">
    <template #trigger>
      <Button variant="secondary" icon="lucide:file-up"> Bulk Import </Button>
    </template>
  </ImportData>
</template>
```

---

#### 3. Externally Controlled via `v-model:show`

This is how `Screen` uses `ImportData` internally — the modal visibility is controlled by the parent.

```vue
<script setup>
import { ref } from 'vue'
import { ImportData } from 'vlite3'

const showImport = ref(false)
</script>

<template>
  <Button @click="showImport = true" icon="lucide:upload">Open Importer</Button>

  <ImportData
    v-model:show="showImport"
    title="Import Products"
    :fields="productFields"
    :process-batch="handleBatch"
    @complete="refetchProducts" />
</template>
```

---

#### 4. With `onMatch` Transform and `expectedType`

```vue
<script setup>
const fields = [
  {
    field: 'isActive',
    title: 'Active Status',
    expectedType: 'boolean',
    // CSV might contain 'yes', 'true', '1', or 'active'
    onMatch: (val) => {
      const v = String(val).toLowerCase().trim()
      return v === 'yes' || v === 'true' || v === '1' || v === 'active'
    },
  },
  {
    field: 'price',
    title: 'Price',
    expectedType: 'number',
    defaultValue: 0,
    // Strip currency symbols before conversion
    onMatch: (val) => parseFloat(String(val).replace(/[^0-9.]/g, '')) || 0,
  },
]
</script>
```

---

#### 5. Simulating a Backend `processBatch`

```vue
<script setup>
const simulateBatch = async ({ data, options }) => {
  await new Promise((resolve) => setTimeout(resolve, 600)) // Simulate network latency

  let created = 0,
    updated = 0,
    skipped = 0,
    failed = 0
  const errors = []

  data.forEach((row, i) => {
    if (!row.email) {
      failed++
      errors.push({ record: String(i + 1), message: 'Missing required field: email' })
    } else if (options.existing === 'skip' && i % 5 === 0) {
      skipped++
    } else if (options.existing === 'replace' && i % 4 === 0) {
      updated++
    } else {
      created++
    }
  })

  return { processed: data.length, created, updated, skipped, failed, errors }
}
</script>
```

---

### i18n Keys Reference

All user-facing strings in `Screen`, `ExportData`, and `ImportData` support i18n via the `$t()` utility. Below is the full list of translation keys and their English fallbacks.

#### Screen Keys

| Key                               | Default Fallback                                          |
| :-------------------------------- | :-------------------------------------------------------- |
| `vlite.screen.deleteSelected`     | `'Delete Selected'`                                       |
| `vlite.screen.listView`           | `'List View'`                                             |
| `vlite.screen.tableView`          | `'Table View'`                                            |
| `vlite.screen.refresh`            | `'Refresh'`                                               |
| `vlite.screen.searchPlaceholder`  | `'Search...'`                                             |
| `vlite.screen.confirmDeleteTitle` | `'Confirm Deletion'`                                      |
| `vlite.screen.confirmDeleteDesc`  | `'Are you sure you want to delete the selected item(s)?'` |
| `vlite.screen.confirmDeleteBtn`   | `'Delete'`                                                |
| `vlite.screen.cancelBtn`          | `'Cancel'`                                                |
| `vlite.screen.missingView`        | `'Please provide a :list or :table component.'`           |
| `vlite.screen.addNew`             | `'Add New'`                                               |
| `vlite.screen.filters`            | `'Filters'`                                               |
| `vlite.screen.filter`             | `'Filter'`                                                |
| `vlite.screen.applyFilters`       | `'Apply Filters'`                                         |
| `vlite.screen.exportData`         | `'Export Data'`                                           |
| `vlite.screen.importData`         | `'Import Data'`                                           |
| `vlite.screen.moreOptions`        | `'More Options'`                                          |

#### ExportData Keys

| Key                             | Default Fallback                            |
| :------------------------------ | :------------------------------------------ |
| `vlite.exportData.selectFormat` | `'Select Export Format'`                    |
| `vlite.exportData.success`      | `'Data exported successfully as {format}'`  |
| `vlite.exportData.error`        | `'An error occurred while exporting data.'` |
| `vlite.exportData.noData`       | `'No data available to export.'`            |

#### ImportData Keys

| Key                                 | Default Fallback                                           |
| :---------------------------------- | :--------------------------------------------------------- |
| `vlite.importData.stepUpload`       | `'Upload'`                                                 |
| `vlite.importData.stepMapping`      | `'Mapping'`                                                |
| `vlite.importData.stepOptions`      | `'Options'`                                                |
| `vlite.importData.stepImport`       | `'Import'`                                                 |
| `vlite.importData.btnBack`          | `'Back'`                                                   |
| `vlite.importData.btnNext`          | `'Next'`                                                   |
| `vlite.importData.btnStart`         | `'Start Import'`                                           |
| `vlite.importData.btnDone`          | `'Done'`                                                   |
| `vlite.importData.uploadData`       | `'Upload Data'`                                            |
| `vlite.importData.dragDrop`         | `'Drag & drop a file here or click to browse'`             |
| `vlite.importData.csvOnlyHint`      | `'Only CSV files are supported'`                           |
| `vlite.importData.pasteData`        | `'Or paste CSV/Excel data'`                                |
| `vlite.importData.process`          | `'Process Data'`                                           |
| `vlite.importData.pastePlaceholder` | `'id, name, email\n1, John Doe, john@example.com'`         |
| `vlite.importData.assignFields`     | `'Assign Fields'`                                          |
| `vlite.importData.assignDesc`       | `'Match your CSV columns to the correct system fields.'`   |
| `vlite.importData.csvHeader`        | `'CSV Header'`                                             |
| `vlite.importData.fieldMapping`     | `'System Field'`                                           |
| `vlite.importData.preview`          | `'Data Preview'`                                           |
| `vlite.importData.noHeaders`        | `'No headers mapped. Data will not be imported properly.'` |
| `vlite.importData.options`          | `'Import Options'`                                         |
| `vlite.importData.matchFound`       | `'When a match is found'`                                  |
| `vlite.importData.matchFoundDesc`   | `'Determine how to handle records that already exist.'`    |
| `vlite.importData.noMatch`          | `'When no match is found'`                                 |
| `vlite.importData.noMatchDesc`      | `'Determine how to handle completely new records.'`        |
| `vlite.importData.optAddTitle`      | `'Add New'`                                                |
| `vlite.importData.optAddDesc`       | `'Creates a duplicate record instead of overwriting.'`     |
| `vlite.importData.optReplaceTitle`  | `'Update'`                                                 |
| `vlite.importData.optReplaceDesc`   | `'Overwrites existing fields with the imported data.'`     |
| `vlite.importData.optSkipTitle`     | `'Skip'`                                                   |
| `vlite.importData.optSkipDesc`      | `'Leaves existing records completely untouched.'`          |
| `vlite.importData.optCreateTitle`   | `'Create New'`                                             |
| `vlite.importData.optCreateDesc`    | `'Creates a completely new record in the system.'`         |
| `vlite.importData.optSkipNewTitle`  | `'Skip'`                                                   |
| `vlite.importData.optSkipNewDesc`   | `'Ignores the row if it does not already exist.'`          |
| `vlite.importData.processing`       | `'Processing Data...'`                                     |
| `vlite.importData.doNotClose`       | `'Please do not close this window.'`                       |
| `vlite.importData.complete`         | `'Import Complete'`                                        |
| `vlite.importData.successCount`     | `'Successfully processed {total} records.'`                |
| `vlite.importData.total`            | `'Total'`                                                  |
| `vlite.importData.created`          | `'Created'`                                                |
| `vlite.importData.updated`          | `'Updated'`                                                |
| `vlite.importData.skipped`          | `'Skipped'`                                                |
| `vlite.importData.failedCount`      | `'{count} records failed to import'`                       |
| `vlite.importData.viewErrors`       | `'View Error Details'`                                     |
| `vlite.importData.hideErrors`       | `'Hide Error Details'`                                     |
| `vlite.importData.row`              | `'Row'`                                                    |
| `vlite.importData.csvOnly`          | `'Please upload a CSV file'`                               |
| `vlite.importData.emptyCsv`         | `'The CSV file is empty.'`                                 |
| `vlite.importData.parseError`       | `'Failed to parse CSV: '`                                  |
| `vlite.importData.processError`     | `'Error processing CSV data'`                              |
| `vlite.importData.success`          | `'Data imported successfully.'`                            |
| `vlite.importData.partial`          | `'Import completed with some errors.'`                     |
| `vlite.importData.error`            | `'A critical error occurred during import.'`               |

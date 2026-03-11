# DataTable

**Import:** `import { DataTable } from 'vlite3'`

### Props

| Prop                    | Type                       | Default             | Description                     |
| :---------------------- | :------------------------- | :------------------ | :------------------------------ |
| `rows`                  | `any[]`                    | `[]`                | Data array to display           |
| `headers`               | `TableHeader[]`            | `[]`                | Column definitions              |
| `keyField`              | `string`                   | `'_id'`             | Unique row identifier field     |
| `search`                | `string`                   | —                   | Search query string             |
| `showSearch`            | `boolean`                  | `true`              | Show search input               |
| `searchPlaceholder`     | `string`                   | `Search...`         | Placeholder for search          |
| `searchPlaceholderI18n` | `string`                   | —                   | I18n key for search placeholder |
| `loading`               | `boolean`                  | `false`             | Show loading state/skeleton     |
| `selectable`            | `boolean`                  | `false`             | Enable row selection            |
| `sortable`              | `boolean`                  | `false`             | Enable column sorting           |
| `showPagination`        | `boolean`                  | `true`              | Show footer pagination          |
| `paginationProps`       | `DataTablePaginationProps` | Default Config      | Control Pagination UI           |
| `striped`               | `boolean`                  | `false`             | Zebra striping                  |
| `hoverable`             | `boolean`                  | `true`              | Highlight row on hover          |
| `bordered`              | `boolean`                  | `true`              | Outer border                    |
| `compact`               | `boolean`                  | `false`             | Reduced padding                 |
| `variant`               | `'default' \| 'raised'`    | `default`           | Table style                     |
| `emptyTitle`            | `string`                   | `No data available` | Empty state title               |
| `emptyTitleI18n`        | `string`                   | —                   | I18n key for empty title        |
| `emptyDescription`      | `string`                   | —                   | Empty state text                |
| `emptyDescriptionI18n`  | `string`                   | —                   | I18n key for empty desc         |
| `emptyIcon`             | `string`                   | `lucide:inbox`      | Empty state icon                |

### Types

```ts
export type DataTablePaginationProps = Omit<PaginationProps, 'currentPage' | 'totalPages'>

export interface TableHeader {
  field: string
  title: string
  width?: string
  minWidth?: string
  sortable?: boolean
  hideOnMobile?: boolean
  align?: 'left' | 'center' | 'right'
  format?: (value: any, row?: any) => string
  class?: string | ((value: any, row?: any) => string)
  capitalize?: boolean
  addStatusColor?: boolean
  type?: 'text' | 'price' | 'date' | 'number'
}

export interface SortConfig {
  field: string
  order: 'asc' | 'desc' | ''
}

export interface TableState {
  pagination: { page: number; limit: number }
  sorting: SortConfig
  search: string
}
```

### Slots

| Slot             | Description                                         |
| ---------------- | --------------------------------------------------- |
| `[header.field]` | Custom cell content (e.g. `#name="{ value, row }"`) |
| `toolbar-left`   | Left side of toolbar                                |
| `toolbar-right`  | Right side of toolbar                               |
| `empty-action`   | Action button in empty state                        |

### Usage

```vue
<DataTable :headers="headers" :rows="users" selectable sortable :loading="isLoading">
  <template #status="{ value }">
    <Badge :variant="value === 'active' ? 'success' : 'secondary'">
      {{ value }}
    </Badge>
  </template>

  <template #toolbar-right>
    <Button icon="lucide:plus">New User</Button>
  </template>
</DataTable>
```

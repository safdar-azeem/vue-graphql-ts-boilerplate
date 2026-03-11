# Screen

**Import:** `import { Screen } from 'vlite3'`

### Description

`Screen` is a high-level smart wrapper component designed to standardize page layouts. It automatically manages titles, search, pagination, custom filters, primary actions (Add buttons/modals), empty states, delete operations, and seamlessly toggles between `list` and `table` child components. View mode (table/list) is automatically persisted using `usePersistentState`.

It also supports built-in **Export** and **Import** capabilities (via `ExportData` and `ImportData` sub-components) accessible through a contextual dropdown menu when configured.

---

### Props

| Prop                   | Type                             | Default                                                               | Description                                                                                                                                         |
| :--------------------- | :------------------------------- | :-------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                 | `string`                         | `''`                                                                  | Optional identifier used to persist the view state (list vs table). Combined with `title` to form a unique storage key.                             |
| `title`                | `string`                         | `''`                                                                  | Page title displayed at the top of the screen header.                                                                                               |
| `titleI18n`            | `string`                         | —                                                                     | i18n key for the page title. Takes priority over `title` when set.                                                                                  |
| `description`          | `string`                         | `''`                                                                  | Subtitle/description text rendered below the title.                                                                                                 |
| `descriptionI18n`      | `string`                         | —                                                                     | i18n key for the description. Takes priority over `description` when set.                                                                           |
| `info`                 | `string`                         | —                                                                     | Tooltip text shown when hovering the information (i) icon next to the title.                                                                        |
| `infoI18n`             | `string`                         | —                                                                     | i18n key for the info tooltip. Takes priority over `info` when set.                                                                                 |
| `data`                 | `any[]`                          | `[]`                                                                  | Array of data passed down to the active table/list child component.                                                                                 |
| `loading`              | `boolean`                        | `false`                                                               | Loading state passed down to child components.                                                                                                      |
| `pageInfo`             | `PageInfo`                       | —                                                                     | Pagination metadata object. See `PageInfo` type below.                                                                                              |
| `refetch`              | `Function`                       | —                                                                     | Callback triggered on search input, pagination change, filter apply, or refresh click. Receives a full payload object. See payload shape below.     |
| `list`                 | `Component`                      | —                                                                     | Vue component to render for the "List / Grid" view mode.                                                                                            |
| `table`                | `Component`                      | —                                                                     | Vue component to render for the "Table" view mode.                                                                                                  |
| `canSearch`            | `boolean`                        | `true`                                                                | Show or hide the search input field.                                                                                                                |
| `canAdd`               | `boolean`                        | `true`                                                                | Show or hide the primary Add action button.                                                                                                         |
| `showRefresh`          | `boolean`                        | `false`                                                               | Show a refresh icon button next to the filter button.                                                                                               |
| `filterSchema`         | `IForm[]`                        | `[]`                                                                  | Form field schema for the dynamic filter UI. An empty array hides the filter button.                                                                |
| `filterType`           | `'modal' \| 'dropdown'`          | `'modal'`                                                             | Determines whether the filter panel appears in a modal dialog or an inline dropdown.                                                                |
| `pagination`           | `boolean`                        | `true`                                                                | Enable or disable the bottom pagination bar.                                                                                                        |
| `paginationProps`      | `ScreenPaginationProps`          | `{ alignment: 'end', navType: 'icon', showItemsPerPage: false, ... }` | Additional props forwarded directly to the internal `Pagination` component.                                                                         |
| `customHeader`         | `boolean`                        | `false`                                                               | When `true`, hides the built-in header and renders the `#custom-header` slot instead.                                                               |
| `addBtn`               | `AddBtnConfig`                   | —                                                                     | Configuration object for the Add button behavior (label, modal, router link, external href, custom click). See `AddBtnConfig` below.                |
| `addComponent`         | `Component`                      | —                                                                     | Replaces the default Add button with a fully custom component. Rendered in both the header and the empty state.                                     |
| `emptyTitle`           | `string`                         | `'No records found'`                                                  | Title text shown when `data` is empty and not loading.                                                                                              |
| `emptyTitleI18n`       | `string`                         | —                                                                     | i18n key for the empty state title.                                                                                                                 |
| `emptyDescription`     | `string`                         | _(library default)_                                                   | Description text shown in the empty state.                                                                                                          |
| `emptyDescriptionI18n` | `string`                         | —                                                                     | i18n key for the empty state description.                                                                                                           |
| `emptyIcon`            | `string`                         | `'lucide:inbox'`                                                      | Iconify icon ID displayed in the empty state illustration.                                                                                          |
| `exportSchema`         | `ExportField[] \| any[]`         | `[]`                                                                  | Field definitions for the export feature. When non-empty and `exportProps` is not `false`, an Export option appears in the "More Options" dropdown. |
| `importSchema`         | `ImportField[] \| any[]`         | `[]`                                                                  | Field definitions for the import feature. When non-empty and `importProps` is not `false`, an Import option appears in the "More Options" dropdown. |
| `exportProps`          | `Record<string, any> \| boolean` | `false`                                                               | Set to `true` or an object of props to enable export. Set to `false` to disable export even if `exportSchema` is provided.                          |
| `importProps`          | `Record<string, any> \| boolean` | `false`                                                               | Set to `true` or an object of props to enable import. Set to `false` to disable import even if `importSchema` is provided.                          |
| `exportMode`           | `'frontend' \| 'backend'`        | `'frontend'` _(or from global config)_                                | Controls whether export is handled client-side (`'frontend'`) or delegated to a backend API (`'backend'`).                                          |
| `exportType`           | `string`                         | —                                                                     | A string identifier passed to `vliteConfig.services.exportApi` when `exportMode` is `'backend'`.                                                    |
| `importType`           | `string`                         | —                                                                     | A string identifier passed to `vliteConfig.services.importApi` for generic server-side batch processing.                                            |
| `containerClass`       | `string`                         | —                                                                     | Additional CSS classes applied to the main content area wrapper `div`.                                                                              |
| `headerClass`          | `string`                         | —                                                                     | Additional CSS classes applied to the header row `div`.                                                                                             |

---

### `refetch` Payload Shape

The `refetch` function is called with a single payload object every time the user interacts with search, pagination, filters, or the refresh button.

```ts
{
  pageinfo: {
    page: number // Current page number (1-indexed)
    limit: number // Items per page
  }
  pagination: {
    page: number // Alias of pageinfo.page
    limit: number // Alias of pageinfo.limit
  }
  search: string // Current search query string
  filter: Record<string, any> // Active filter values keyed by field name
}
```

> **Note:** `pageinfo` and `pagination` contain identical data. Both are provided for compatibility with different API conventions.

---

### `PageInfo` Type

```ts
interface PageInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage?: number
}
```

---

### `AddBtnConfig` Type

Passed to the `addBtn` prop to configure the primary action button.

```ts
export interface AddBtnConfig {
  label?: string // Button label text
  labelI18n?: string // i18n key for button label (takes priority over label)
  icon?: string // Iconify icon ID (default: 'fluent:add-16-filled')
  variant?: ButtonVariant // Button style variant (default: 'primary')
  to?: string | Record<string, any> // Vue Router route object or path string
  href?: string // External URL for an <a> tag link
  target?: string // Link target (_blank, _self, etc.)
  onClick?: () => void // Custom click handler (overrides @add emit)
  modal?: Component // Vue component to open inside a Modal dialog
  modalProps?: Record<string, any> // Props forwarded to the Modal wrapper
  buttonProps?: Record<string, any> // Extra props forwarded to the Button element
}
```

**Priority order for the Add button action:**

1. `addBtn.modal` — Opens the given component in a modal.
2. `addBtn.to` — Navigates via Vue Router.
3. `addBtn.href` — Navigates via native `<a>` link.
4. `addBtn.onClick` — Executes the custom handler.
5. _(fallback)_ — Emits the `@add` event.

---

### `ScreenPaginationProps` Type

All props from the `Pagination` component are supported **except** `currentPage` and `totalPages`, which are controlled by `Screen` internally.

```ts
export interface ScreenPaginationProps extends Omit<
  PaginationProps,
  'currentPage' | 'totalPages'
> {}
```

---

### Events

| Event     | Payload        | Description                                                                                                               |
| :-------- | :------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `@add`    | _(none)_       | Emitted when the Add button is clicked and no `addBtn.modal`, `addBtn.to`, `addBtn.href`, or `addBtn.onClick` is defined. |
| `@delete` | `items: any[]` | Emitted after the user confirms deletion in the `ConfirmationModal`. Payload is the array of items selected for deletion. |

---

### Slots

| Slot            | Props Available | Description                                                                                    |
| :-------------- | :-------------- | :--------------------------------------------------------------------------------------------- |
| `title`         | —               | Replaces the rendered `<h1>` title element entirely.                                           |
| `description`   | —               | Replaces the rendered `<p>` description element entirely.                                      |
| `before-search` | —               | Injects content just before the search input, refresh, and filter buttons in the header row.   |
| `actions`       | —               | Replaces the entire Add button / action area (overrides `addBtn`, `addComponent`, `canAdd`).   |
| `after-add`     | —               | Injects content immediately after the Add button (e.g., for secondary action buttons).         |
| `custom-header` | —               | Replaces the **entire** built-in header block. Requires `customHeader: true` prop to activate. |
| `empty`         | —               | Replaces the default empty state UI when `data` is empty and not loading.                      |

---

### Injected Provides (for Child Components)

`Screen` uses Vue's `provide/inject` mechanism to communicate with deeply nested components:

| Key                     | Type                     | Description                                                         |
| :---------------------- | :----------------------- | :------------------------------------------------------------------ |
| `screen-selected-rows`  | `Ref<any[]>`             | Reactive array of currently selected rows (for bulk delete).        |
| `screen-request-delete` | `(items: any[]) => void` | Function to trigger the delete confirmation modal programmatically. |

---

### Child Component Interface (List / Table)

When you pass a component to the `list` or `table` props, `Screen` automatically binds the following props to it. Your child component **must** accept these props:

| Injected Prop  | Type                     | Description                                                              |
| :------------- | :----------------------- | :----------------------------------------------------------------------- |
| `data`         | `any[]`                  | The data array from the `Screen` component.                              |
| `loading`      | `boolean`                | The loading state from the `Screen` component.                           |
| `refetch`      | `Function`               | The refetch callback from the `Screen` component.                        |
| `selectedRows` | `any[]` _(v-model)_      | Two-way bound array of selected rows for bulk delete support.            |
| `delete`       | `(items: any[]) => void` | Function to trigger the delete confirmation modal from inside the child. |
| `@delete`      | `items: any[]` _(event)_ | Alternative event to trigger delete from the child component.            |

**Example — Table Child Component (`UserTable.vue`):**

```vue
<script setup>
const props = defineProps({
  data: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  refetch: { type: Function, default: () => {} },
  selectedRows: { type: Array, default: () => [] },
  delete: { type: Function, default: null },
})

const emit = defineEmits(['update:selectedRows'])
</script>

<template>
  <DataTable
    :rows="data"
    :loading="loading"
    selectable
    :selected-rows="selectedRows"
    @update:selected-rows="emit('update:selectedRows', $event)" />
</template>
```

**Example — List Child Component (`UserList.vue`):**

```vue
<script setup>
const props = defineProps<{
  data?: any[]
  loading?: boolean
  delete?: (items: any[]) => void
}>()
</script>

<template>
  <DataList
    :data="data || []"
    :loading="loading"
    class-name="grid grid-cols-1 sm:grid-cols-3 gap-6">
    <template #item="{ item }">
      <div class="p-5 border border-border rounded-xl bg-card shadow-sm flex flex-col gap-4">
        <h3 class="font-semibold text-foreground">{{ item.name }}</h3>
        <Button
          variant="outline"
          size="sm"
          icon="lucide:trash-2"
          class="text-destructive"
          @click="props.delete?.([item])">
          Delete
        </Button>
      </div>
    </template>
  </DataList>
</template>
```

---

### Internal Behavior Details

**Search Debounce:** The search input is debounced by **300ms** before triggering `refetch`. This prevents excessive API calls while the user is typing.

**View Persistence:** The active view mode (`'table'` or `'list'`) is persisted to local storage using the key `view-mode-{name || title || 'default-screen'}`. This means the user's last choice survives page refreshes.

**View Toggle:** The list/table toggle buttons are only rendered when **both** `list` and `table` props are provided. If only one is provided, no toggle is shown.

**Delete Flow:** The delete confirmation modal (`ConfirmationModal`) is shown before emitting `@delete`. The modal can be triggered either by selecting rows (bulk delete via the trash button in the header) or by calling the injected `screen-request-delete` function from a child component.

**Export/Import Dropdown:** The "More Options" (`lucide:more-vertical`) dropdown is rendered only when at least one of `exportSchema`/`importSchema` is provided and their corresponding `exportProps`/`importProps` is not `false`.

---

### Usage Examples

#### 1. Basic Setup with Table and Deletion

```vue
<script setup>
import { Screen } from 'vlite3'
import UserTable from './UserTable.vue'

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
]

const fetchUsers = (params) => {
  console.log('Fetching:', params)
  // params.search, params.filter, params.pagination.page, params.pagination.limit
}

const handleDelete = (items) => {
  console.log('Deleting:', items)
  // Call your API, then trigger fetchUsers again
}
</script>

<template>
  <Screen
    name="users-view"
    title="Users"
    description="Manage system users."
    :data="users"
    :table="UserTable"
    :refetch="fetchUsers"
    @add="openCreateUserForm"
    @delete="handleDelete" />
</template>
```

---

#### 2. Toggle Between Table and List View

When both `table` and `list` props are provided, a view toggle switch automatically appears and the user's choice is persisted.

```vue
<script setup>
import { Screen } from 'vlite3'
import ProductTable from './ProductTable.vue'
import ProductGrid from './ProductGrid.vue'
</script>

<template>
  <Screen
    name="products-directory"
    title="Products"
    :data="products"
    :table="ProductTable"
    :list="ProductGrid"
    :add-btn="{ label: 'New Product', icon: 'lucide:plus' }" />
</template>
```

---

#### 3. Advanced Filtering with Refresh Button

Use `filterSchema` to auto-generate a powerful filter form. Use `filterType="dropdown"` for an inline panel instead of a modal.

```vue
<script setup>
import { Screen } from 'vlite3'
import OrderList from './OrderList.vue'
import AddOrderModal from './AddOrderModal.vue'

const filters = [
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { label: 'Pending', value: 'pending' },
      { label: 'Completed', value: 'completed' },
    ],
  },
  { name: 'dateRange', label: 'Date Range', type: 'date' },
]
</script>

<template>
  <Screen
    name="orders-screen"
    title="Orders"
    :data="orders"
    :list="OrderList"
    show-refresh
    filter-type="dropdown"
    :filter-schema="filters"
    :add-btn="{
      label: 'Create Order',
      modal: AddOrderModal,
      modalProps: { title: 'Create New Order', maxWidth: 'max-w-xl' },
    }" />
</template>
```

---

#### 4. With Pagination

```vue
<template>
  <Screen
    name="invoices-screen"
    title="Invoices"
    :data="invoices"
    :loading="isLoading"
    :page-info="pageInfo"
    :table="InvoiceTable"
    :refetch="fetchInvoices"
    :pagination-props="{
      alignment: 'end',
      navType: 'full',
      showItemsPerPage: true,
      itemsPerPageOptions: [10, 25, 50],
    }" />
</template>
```

---

#### 5. Export and Import Integration

```vue
<template>
  <Screen
    name="users-screen"
    title="Users"
    :data="users"
    :table="UserTable"
    :refetch="fetchUsers"
    :export-schema="[
      { field: 'id', title: 'ID' },
      { field: 'name', title: 'Name' },
      { field: 'email', title: 'Email' },
    ]"
    :import-schema="[
      { field: 'name', title: 'Name', required: true },
      { field: 'email', title: 'Email', required: true },
    ]"
    export-props
    import-props
    export-type="user"
    import-type="user"
    @delete="handleDelete" />
</template>
```

> When `exportProps` or `importProps` is `true` (or an object), a "More Options" button (⋮) is shown in the header. Clicking Export opens a format picker modal. Clicking Import opens the full `ImportData` multi-step wizard.

---

#### 6. Backend Export Mode

When `export-mode="backend"`, Screen delegates file generation to your server via `vliteConfig.services.exportApi`. The frontend does not process any data.

```vue
<template>
  <Screen
    name="reports-screen"
    title="Reports"
    :data="reports"
    :table="ReportTable"
    export-mode="backend"
    export-type="report"
    export-props
    :export-schema="[
      { field: 'id', title: 'ID' },
      { field: 'title', title: 'Title' },
    ]" />
</template>
```

Your global vlite config must define:

```ts
// vlite.config.ts
{
  services: {
    exportApi: async (
      type: string,
      payload: { format: string; search: string; filter: object }
    ) => {
      // Call your backend, trigger file download
      const blob = await myApi.export(type, payload)
      saveAs(blob, `${type}-export.${payload.format}`)
    }
  }
}
```

---

#### 7. Customizing the Empty State

```vue
<template>
  <Screen title="Invoices" :data="[]" :can-add="false">
    <template #empty>
      <div class="p-12 text-center border-2 border-dashed rounded-lg bg-gray-50">
        <h2 class="text-xl font-bold text-gray-700">No Invoices Yet</h2>
        <p class="text-gray-500 mb-4">Create your first invoice to get started.</p>
        <Button variant="primary" icon="lucide:file-plus">Create Invoice</Button>
      </div>
    </template>
  </Screen>
</template>
```

---

#### 8. Custom Header

```vue
<template>
  <Screen :custom-header="true" title="Dashboard" :data="items" :table="DashboardTable">
    <template #custom-header>
      <div
        class="flex items-center justify-between p-6 bg-gradient-to-r from-primary to-primary/70 text-white rounded-xl">
        <h1 class="text-2xl font-bold">My Custom Dashboard</h1>
        <Button variant="secondary" icon="lucide:plus">Add Widget</Button>
      </div>
    </template>
  </Screen>
</template>
```

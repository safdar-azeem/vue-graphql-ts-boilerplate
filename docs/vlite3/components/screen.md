# Screen

**Import:** `import { Screen } from 'vlite3'`

### Description

`Screen` is a high-level smart wrapper component designed to standardise page layouts. It automatically manages titles, search, pagination, custom filters, primary actions (Add buttons/modals), empty states, delete operations, and seamlessly toggles between view components. View mode is automatically persisted using `usePersistentState`.

It supports **any number of named views** — table, list, kanban, calendar, or any custom view — via the `views` prop. The legacy `table` and `list` props remain fully supported for backward compatibility.

It also supports built-in **Export** and **Import** capabilities (via `ExportData` and `ImportData` sub-components) accessible through a contextual dropdown menu when configured.

Alternatively, you can provide layouts via the `#table`, `#list`, and `#grid` slots instead of component props, which also support the view toggling and receive all necessary props exactly like the child components do.

---

### Props

| Prop                   | Type                            | Default                                                                  | Description                                                                                                                                                                                                        |
| :--------------------- | :------------------------------ | :----------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                 | `string`                        | `''`                                                                     | Optional identifier used to persist the view state. Combined with `title` to form a unique storage key.                                                                                                            |
| `title`                | `string`                        | `''`                                                                     | Page title displayed at the top of the screen header.                                                                                                                                                              |
| `titleI18n`            | `string`                        | —                                                                        | i18n key for the page title. Takes priority over `title` when set.                                                                                                                                                 |
| `description`          | `string`                        | `''`                                                                     | Subtitle/description text rendered below the title.                                                                                                                                                                |
| `descriptionI18n`      | `string`                        | —                                                                        | i18n key for the description.                                                                                                                                                                                      |
| `info`                 | `string`                        | —                                                                        | Tooltip info text shown next to the title via an info icon.                                                                                                                                                        |
| `infoI18n`             | `string`                        | —                                                                        | i18n key for the info tooltip.                                                                                                                                                                                     |
| `data`                 | `any[]`                         | `[]`                                                                     | The data array passed down to the active view component/slot.                                                                                                                                                      |
| `loading`              | `boolean`                       | `false`                                                                  | Propagated to child views and disables Refresh button while active.                                                                                                                                                |
| `refetch`              | `Function`                      | —                                                                        | Called on every search, filter, pagination, sort, or quick-filter change. Receives `{ pagination, search, sort, filter }`.                                                                                         |
| `pageInfo`             | `PageInfo`                      | —                                                                        | Pagination metadata (`currentPage`, `totalPages`, `totalItems`, `itemsPerPage`).                                                                                                                                   |
| `paginationProps`      | `ScreenPaginationProps`         | `{ alignment: 'between', navType: 'icon', showItemsPerPage: true, ... }` | Props forwarded to the `Pagination` component.                                                                                                                                                                     |
| `canSearch`            | `boolean`                       | `true`                                                                   | Show/hide the search input.                                                                                                                                                                                        |
| `canAdd`               | `boolean`                       | `true`                                                                   | Show/hide the Add button.                                                                                                                                                                                          |
| `pagination`           | `boolean`                       | `true`                                                                   | Show/hide the pagination bar.                                                                                                                                                                                      |
| `filterSchema`         | `IForm[]`                       | `[]`                                                                     | Form schema for the advanced filter modal/dropdown.                                                                                                                                                                |
| `filterType`           | `'modal' \| 'dropdown'`         | `'modal'`                                                                | Style of the advanced filter trigger.                                                                                                                                                                              |
| `showRefresh`          | `boolean`                       | `false`                                                                  | Show a manual Refresh button in the toolbar.                                                                                                                                                                       |
| `quickFilters`         | `ScreenQuickFilter[]`           | `[]`                                                                     | Array of tab options rendered as a **line-variant tab bar** between the header and content.                                                                                                                        |
| `skipQuickFilterViews` | `string[]`                      | `[]`                                                                     | Array of view keys (e.g., `['calendar', 'kanban']`) where quick filters should be hidden. If omitted, quick filters are shown on all views.                                                                   |
| `quickFilterKey`       | `string`                        | `'status'`                                                               | The key used to add the active quick filter value to the `filter` property in the refetch.                                                                                                                         |
| `defaultQuickFilter`   | `string \| number`              | first tab's value                                                        | Initial quick-filter value. Defaults to the first entry in `quickFilters` when not set.                                                                                                                            |
| `views`                | `ScreenView[]`                  | —                                                                        | **Dynamic multi-view definitions.** Pass any number of named views (table, list, kanban, calendar, etc.). Each entry renders a toggle button and maps to its component. The first entry is the default view.      |
| `list`                 | `Component`                     | —                                                                        | **Legacy.** Component rendered in list/grid view. Prefer `views` for new usage.                                                                                                                                   |
| `table`                | `Component`                     | —                                                                        | **Legacy.** Component rendered in table view. Prefer `views` for new usage.                                                                                                                                       |
| `addBtn`               | `AddBtnConfig`                  | —                                                                        | Configuration for the Add button (label, icon, variant, modal, router link, etc.).                                                                                                                                 |
| `addComponent`         | `Component`                     | —                                                                        | Fully custom component to replace the default Add button area.                                                                                                                                                     |
| `exportSchema`         | `ExportField[]`                 | `[]`                                                                     | Fields definition for the Export feature.                                                                                                                                                                          |
| `importSchema`         | `ImportField[]`                 | `[]`                                                                     | Fields definition for the Import feature.                                                                                                                                                                          |
| `exportProps`          | `Record<string,any> \| boolean` | `false`                                                                  | Extra props forwarded to `ExportData`. Set to `true` to enable with defaults.                                                                                                                                      |
| `importProps`          | `Record<string,any> \| boolean` | `false`                                                                  | Extra props forwarded to `ImportData`. Set to `true` to enable with defaults.                                                                                                                                      |
| `exportMode`           | `'frontend' \| 'backend'`       | `'frontend'`                                                             | Export processing mode.                                                                                                                                                                                            |
| `exportType`           | `string`                        | —                                                                        | Identifier passed to `vliteConfig.services.exportApi` for backend exports.                                                                                                                                         |
| `importType`           | `string`                        | —                                                                        | Identifier passed to `vliteConfig.services.importApi` for backend imports.                                                                                                                                         |
| `customHeader`         | `boolean`                       | `false`                                                                  | When `true`, hides the auto-generated header — use the `#custom-header` slot instead.                                                                                                                              |
| `emptyTitle`           | `string`                        | —                                                                        | Title shown in the empty state.                                                                                                                                                                                    |
| `emptyTitleI18n`       | `string`                        | —                                                                        | i18n key for the empty state title.                                                                                                                                                                                |
| `emptyDescription`     | `string`                        | —                                                                        | Description shown in the empty state.                                                                                                                                                                              |
| `emptyDescriptionI18n` | `string`                        | —                                                                        | i18n key for the empty state description.                                                                                                                                                                          |
| `emptyIcon`            | `string`                        | `'lucide:inbox'`                                                         | Icon shown in the empty state.                                                                                                                                                                                     |
| `containerClass`       | `string`                        | —                                                                        | Extra CSS class applied to the content wrapper `<div>`.                                                                                                                                                            |
| `headerClass`          | `string`                        | —                                                                        | Extra CSS class applied to the header row `<div>`.                                                                                                                                                                 |
| `titleClass`           | `string`                        | —                                                                        | Extra CSS class applied to the title `<h1>`.                                                                                                                                                                       |
| `descriptionClass`     | `string`                        | —                                                                        | Extra CSS class applied to the description `<p>`.                                                                                                                                                                  |
| `viewProps`            | `Record<string,any>`            | `{}`                                                                     | Additional props forwarded to the active view component.                                                                                                                                                           |
| `hideSelectable`       | `boolean`                       | `false`                                                                  | Hides the row-selection checkbox and bulk-delete button.                                                                                                                                                           |
| `hideDeleteBtn`        | `boolean`                       | `true`                                                                   | Show/hide the bulk delete button when rows are selected.                                                                                                                                                           |
| `skipEmptyViews`       | `string[]`                      | `[]`                                                                     | Array of view keys that should bypass the default empty state and always render their component even when there is no data. Useful for kanban boards or calendars where empty columns/grids are needed.            |

---

### `ScreenView` type
```ts
export interface ScreenView {
  /** Unique key used to identify and persist this view */
  key: string
  /** The Vue component to render for this view */
  component: Component | any
  /** Icon string (e.g. lucide icon name) shown in the view toggle button */
  icon?: string
  /** Tooltip / aria-label for the toggle button */
  label?: string
  /** i18n key for the label */
  labelI18n?: string
}
```

---

### Multi-View Support (`views` prop)

The `views` prop enables fully dynamic, extensible view switching. Pass an array of `ScreenView` objects — each renders a toggle button and maps to its component. The first entry becomes the default active view (unless persisted state overrides it).

All view components receive the same standard props: `data`, `loading`, `refetch`, `selectedRows`, `delete`, and anything in `viewProps`.

#### Example — Table + List + Kanban + Calendar
```vue
<script setup>
import { defineAsyncComponent } from 'vue'
const UserTable    = defineAsyncComponent(() => import('./UserTable.vue'))
const UserList     = defineAsyncComponent(() => import('./UserList.vue'))
const UserKanban   = defineAsyncComponent(() => import('./UserKanban.vue'))
const UserCalendar = defineAsyncComponent(() => import('./UserCalendar.vue'))
</script>

<template>
  <Screen
    name="users"
    title="Users"
    :data="users"
    :loading="loading"
    :refetch="fetchUsers"
    :views="[
      { key: 'table',    component: UserTable,    icon: 'lucide:list',        label: 'Table' },
      { key: 'list',     component: UserList,     icon: 'lucide:layout-grid', label: 'Grid' },
      { key: 'kanban',   component: UserKanban,   icon: 'lucide:kanban',      label: 'Kanban' },
      { key: 'calendar', component: UserCalendar, icon: 'lucide:calendar',    label: 'Calendar' },
    ]" />
</template>
```

#### Example — Two views only
```vue
<Screen
  name="orders"
  title="Orders"
  :data="orders"
  :refetch="fetchOrders"
  :views="[
    { key: 'table', component: OrderTable, icon: 'lucide:list',        label: 'Table' },
    { key: 'board', component: OrderBoard, icon: 'lucide:layout-panel-left', label: 'Board' },
  ]" />
```

---

### Legacy Props (`table` / `list`)

The original `table` and `list` props are fully supported and work exactly as before. They are normalised internally into the `views` system with default icons and keys.
```vue
<Screen
  name="users"
  title="Users"
  :data="users"
  :table="UserTable"
  :list="UserList"
  :refetch="fetchUsers" />
```

---

### Quick Filters

Quick filters provide a **tab bar** UI pattern common in modern dashboards (Shopify, Linear, Vercel). They appear between the header toolbar and the content area, using a clean `line` variant. The selected value will add to the `filter` property in the refetch based on the provided key. Default will be `status`. This behavior is completely invisible to the main Screen Filter state.

By default, quick filters are shown across all active views. You can hide them for specific views by passing an array of view keys to the `skipQuickFilterViews` prop (e.g., `:skip-quick-filter-views="['calendar', 'kanban']"`).

#### `ScreenQuickFilter` type
```ts
export interface ScreenQuickFilter {
  label: string
  labelI18n?: string
  value: string | number
  icon?: string
  /** Optional badge/count shown next to the label, e.g. "Active (12)" */
  count?: number
}
```

#### Refetch payload

When a quick-filter tab is selected, `refetch` is called, and the quick filter's value is automatically added to the `filter` property based on the provided `quickFilterKey` (default will be `'status'`):
```ts
refetch({
  pagination: { page: 1, limit: 10 },
  search: '...',
  sort: { field: '', order: '' },
  filter: { status: 'active', ...otherFilters }, // The selected tab value mapped to quickFilterKey
})
```

---

### Slots

| Slot            | Description                                                                                    |
| :-------------- | :--------------------------------------------------------------------------------------------- |
| `title`         | Replaces the `<h1>` title element.                                                             |
| `description`   | Replaces the description paragraph.                                                            |
| `before-search` | Injected before the search input in the toolbar.                                               |
| `actions`       | Replaces the entire Add button area (use to provide fully custom action buttons).              |
| `after-add`     | Appended after the Add button / ScreenOptionsDropdown.                                         |
| `custom-header` | Full replacement header (only rendered when `customHeader: true`).                             |
| `sub-header`    | Rendered after the main header row and after the quick-filter tabs, before the content.        |
| `empty`         | Custom empty state (replaces `ScreenEmptyState`).                                              |
| `table`         | Slot-based table view. Receives `{ data, loading, selectedRows, delete, updateSelectedRows }`. |
| `list`          | Slot-based list view. Same scoped props as `#table`.                                           |
| `grid`          | Slot-based grid view (treated as list mode). Same scoped props.                                |

---

### Events

| Event | Payload | Description |
| :------- | :------ | :---------------------------------------------------------------- |
| `add` | — | Emitted when the default Add is clicked (no `addBtn` configured). |
| `delete` | `any[]` | Emitted after the user confirms bulk/row deletion. |
| `activeView` | `string` | Emitted when the active view mode changes (e.g. toggled by user) **and on initial mount** so the parent always knows the current view. |

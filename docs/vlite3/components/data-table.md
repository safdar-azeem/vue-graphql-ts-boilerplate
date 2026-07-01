# DataTable

**Import:** `import { DataTable } from 'vlite3'`

**Types:** `import type { TableHeader, DataTableProps, TableState, TableFilter, SelectionState, RowClickPayload, ExpandPayload, PageInfo, DataTablePaginationProps } from 'vlite3'`

A data table with sorting, pagination, row selection, hierarchical tree rows (static or async), loading skeletons, empty states, and Screen integration. Column cells support built-in types (`price`, `date`, `number`), custom formatters, status coloring, and named slots.

---

### Props

| Prop                   | Type                       | Default             | Description |
| :--------------------- | :------------------------- | :------------------ | :---------- |
| `rows`                 | `any[]`                    | `[]`                | Data array to display. |
| `headers`              | `TableHeader[]`            | `[]`                | Column definitions. See **TableHeader** below. |
| `keyField`             | `string`                   | `'auto'`            | Unique row identifier. Supports dot-notation. `'auto'` picks the first of `id` / `_id` found on the first row, otherwise falls back to `'_id'`. |
| `selectedRows`         | `any[]`                    | `[]`                | Selected rows (`v-model:selectedRows`). Survives across page changes when the parent keeps the array. |
| `loading`              | `boolean`                  | `false`             | Show loading skeleton rows (up to `itemsPerPage`, capped at 15). |
| `hideSelectable`       | `boolean`                  | `false`             | Hide the selection checkbox column. Always respected, including inside `Screen`. |
| `isRowSelectable`      | `(row) => boolean`         | —                   | Keep selection visible but disable it for rows where the predicate returns `false`. Header select-all and selection events exclude disabled rows. |
| `sortable`             | `boolean`                  | `false`             | Enable column sorting for headers that allow it (see **Sorting**). |
| `showPagination`       | `boolean`                  | `true`              | Show footer pagination when `pageInfo.totalPages > 1`. |
| `paginationProps`      | `DataTablePaginationProps` | See below           | Props forwarded to `Pagination` (excludes `currentPage` / `totalPages`). |
| `pageInfo`             | `PageInfo`                 | —                   | Pagination metadata from the server. Required for the footer to render. |
| `striped`              | `boolean`                  | `false`             | Zebra striping on odd rows. |
| `hoverable`            | `boolean`                  | `true`              | Highlight row on hover. |
| `bordered`             | `boolean`                  | `true`              | Outer border on the table container. |
| `cellBordered`         | `boolean`                  | `false`             | Internal grid borders around every cell (vertical + horizontal). Pairs with `bordered` for the outer frame. |
| `rounded`              | `boolean`                  | `true`              | Rounded container corners. Set `false` for sharp/square edges (`rounded-none`). Also disables raised-variant header corner rounding. |
| `compact`              | `boolean`                  | `false`             | Reduced row/header padding (same as `size="xs"`). |
| `size`                 | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'`         | Row and header padding / text density. |
| `variant`              | `'default' \| 'raised'`    | `'default'`         | Container style. `raised` adds shadow, padding, and rounded header corners (when `rounded` is `true`). |
| `headerVariant`        | `'default' \| 'minimal'`   | `'default'`         | Header background. `default` uses `bg-accent`; `minimal` is transparent. |
| `tableClass`           | `string`                   | —                   | Extra classes on the `<table>` element. |
| `class`                | `string`                   | —                   | Extra classes on the outer container. |
| `emptyTitle`           | `string`                   | —                   | Empty-state title. When omitted, `Empty` uses its own default (`No data found`). |
| `emptyTitleI18n`       | `string`                   | —                   | i18n key for empty title (takes priority over `emptyTitle`). |
| `emptyDescription`     | `string`                   | —                   | Empty-state description. |
| `emptyDescriptionI18n` | `string`                   | —                   | i18n key for empty description. |
| `emptyIcon`            | `string`                   | `'lucide:inbox'`    | Empty-state icon (Iconify id). |
| `loadChildren`         | `(row) => Promise<any[]>`  | —                   | Async loader for nested rows. Result is cached inside the table. |
| `treeIndent`           | `number`                   | `20`                | Horizontal indent (px) per tree depth on the first data column. |
| `responsive`           | `boolean`                  | `true`              | When `true`, viewports below the Tailwind `md` breakpoint (768px) render stacked labeled cards instead of the multi-column table. Set `false` to keep the always-table + horizontal-scroll layout. |
| `resizable`            | `boolean`                  | `false`             | Opt in to drag-to-resize column boundaries on the desktop table. See **Column resizing**. When `false` the table renders and behaves exactly as it does without the feature. |
| `persistenceKey`       | `string`                   | —                   | Stable key used to persist user column widths in local storage. Separate from `keyField` (which identifies rows). Omit to keep resizing session-only. |

#### Responsive stacked cards

When `responsive` is enabled (default) and the viewport is below `md`:

- Each row becomes a bordered card.
- **Header:** checkbox / tree expand + the first visible non-action column (identity slot — e.g. avatar + name).
- **Body:** remaining visible columns as horizontal `LABEL | value` rows (label left, value right).
- **Footer:** columns whose `field` is `action` or `actions`, right-aligned.
- Selected cards use a `border-primary` outline with a soft `bg-muted` wash (no select-all bar on small screens).
- Columns with `hideOnMobile: true` stay hidden.
- Tree connector lines are desktop-only; expand/collapse and depth indent still work on cards.

At `md` and above, the original table is unchanged. No schema changes are required — layout is automatic from `headers`.

#### Default `paginationProps`

```ts
{
  alignment: 'between',
  navType: 'icon',
  showItemsPerPage: true,
  itemsPerPageOptions: [10, 25, 50, 100],
  showPageInfo: false,
}
```

---

### Events

| Event                  | Payload           | Description |
| :--------------------- | :---------------- | :---------- |
| `@change`              | `TableState`      | Emitted (debounced ~10ms) on sort or pagination change. Also forwarded to `Screen` via context when nested. |
| `@select`              | `SelectionState`  | Emitted when row selection changes. |
| `@rowClick`            | `RowClickPayload` | Emitted when a row is clicked (checkbox clicks do not trigger this). |
| `@delete`              | `any[]`           | Emitted with the selected rows after the internal delete confirmation is confirmed. Bulk delete in `Screen` is handled by Screen itself — prefer Screen’s `@delete` when using that layout. |
| `@update:selectedRows` | `any[]`           | `v-model:selectedRows` binding. |
| `@update:itemsPerPage` | `number`          | Emitted when the items-per-page selector changes. |
| `@expand`              | `ExpandPayload`   | Emitted when a tree row is expanded or collapsed. |
| `@columnResize`        | `ColumnResizePayload` | Emitted when a column resize is committed (drag end, keyboard adjust, or double-click reset). Deliberately **not** folded into `@change`, which stays sorting + pagination only. |

---

### Column resizing

Off by default. Set `resizable` to let users drag column boundaries, the same
interaction model as [`Splitter`](./splitter.md) but scoped to table headers.

```vue
<DataTable
  :headers="headers"
  :rows="rows"
  resizable
  persistence-key="employees-table"
/>
```

```text
Column 1 | Column 2 | Column 3 | Column 4
         ↑          ↑          ↑          ↑ outer edge (when resizable)
       Column 1   Column 2   Column 3   Column 4
```

- Each resizable column owns **one** boundary control on its logical trailing edge —
  right in LTR, left in RTL. The divider between two columns always resizes the column
  immediately before it; the next column is never selected by an index offset. A
  resizable final column gets a control on its outer trailing edge.
- Without internal cell borders, the separator is rendered inside its owning `<th>`.
  With `cellBordered`, the same owning edge is promoted to one measured, full-table-height
  control so the visible grid boundary remains interactive through every body row. Both
  variants pass `header.field` directly; neither uses a boundary index or neighbour lookup.
- The owning `header.field` is the single identity used by the handle, active state,
  width update, persisted value and `@columnResize` payload.
- The line uses the owning header's rendered logical trailing edge. During a drag, the
  owning `<col>` and the active control move in the same animation frame, so the accent
  remains aligned with the actual boundary.
- The hit area is a generous invisible strip centred on the boundary; only the 2px line
  is visible. While resizing is enabled, VLite's internal header-content box reserves a
  `0.5rem` logical gap on both sides. This protects the owning header and the header after
  the boundary even when a consumer applies dense or custom padding directly to `<th>`.
- Works with both the `default` and `minimal` header variants, and stays legible in
  light and dark themes.
- Dragging continues outside the header and the table container. Only a clean pointer
  release commits: `Escape`, `pointercancel` / `touchcancel`, lost pointer capture, the
  table switching to stacked cards, and unmounting all restore the starting width
  instead. The global cursor and text-selection lock are always released.
- Mouse, trackpad, touch and pen are supported through Pointer Events.
- Sorting is untouched: clicking the header content sorts as before, and interacting
  with the boundary only resizes. Resizing never triggers row clicks, selection
  changes, expand/collapse, or `@change`.
- The built-in selection checkbox column is fixed at 40px and is never resizable.

#### Visual states

| State | Appearance |
| :---- | :--------- |
| Rest | No resize accent; a bordered table keeps only its normal 1px grid line. |
| Hovering the boundary | A high-contrast 2px gray-700 accent appears on the owning column's trailing edge with the resize cursor. In a bordered table this applies anywhere along the visible vertical grid line. |
| Dragging | The owning column edge is accented and moves with the resized `<col>`. |
| Pointer release | The line disappears immediately. |
| Keyboard focus | The same edge is accented through `:focus-visible`. |

With `cellBordered`, the hit strip spans the rendered table height and the 2px accent
stays centred on the existing 1px cell border. The normal grid line remains untouched at rest; hover,
focus and active drag accent that same geometry rather than drawing a second offset line.
The layer contains one control per resizable column, not one per cell, and it isolates
pointer events from sorting, row clicks, selection, actions, tree expansion and text
selection. Columns with `resizable: false` render no separator.

#### Per-column opt-out

Set `resizable: false` on a header to pin it while the rest of the table resizes —
useful for action, icon and other fixed-width columns.

```ts
const headers: TableHeader[] = [
  { field: 'employee', title: 'Employee', sortable: true },
  { field: 'email', title: 'Email', width: '260px' },
  { field: 'actions', title: '', width: '96px', align: 'center', resizable: false },
]
```

#### Width precedence

When the first resize begins, the table captures the widths that are actually rendered
on screen. Those already reflect configured pixel, percentage, Tailwind and natural
content sizing. After that point the effective width is:

1. A valid persisted or current user-resized width
2. The captured rendered width
3. A configured pixel `width` / `minWidth` only when a rendered measurement is not yet available

Percentage widths (`'22%'`) and Tailwind utilities (`'w-32'`) keep working. When a drag
starts on such a column its rendered width is captured and the resize continues in stable
pixels. Reset removes only the user override and restores that captured baseline.

Columns never shrink below `minWidth` (or 60px when no `minWidth` is set). At runtime,
the table also measures the header label, logical padding, sort control and other header
actions, and uses the largest of those floors. Body content remains single-line and
truncates within the resolved width instead of breaking words into fragments.

A column pinned with `resizable: false` always uses its developer-configured width. A
stale override saved while it was still resizable is ignored and dropped from storage,
so a fixed column can never end up with a width the user has no way to reset.

The consumer's `headers` array and header objects are never mutated.

#### Independent column sizing

User-owned widths remain independent, with one deliberate trailing-layout rule:

- Dragging a divider changes only the column immediately before it. Explicit widths of
  neighbouring data, status and selection columns remain unchanged.
- If the final rendered column is fixed with `resizable: false`, positive unused viewport
  space is added only to that final column. Its logical trailing edge stays pinned to the
  viewport while its leading edge grows toward the table start. This passive fill is not
  persisted as a user width.
- When that sum exceeds the viewport, the existing `overflow-x-auto` wrapper scrolls
  horizontally; the trailing fill becomes zero and no required width is reduced.
- A resizable final column does not receive passive fill, so its outer trailing-edge
  handle retains normal resize behaviour.

#### Resetting a column

**Double-click a resize boundary** (or press `Enter` / `Space` with it focused) to
restore that column's configured `width` / `minWidth` / natural width. The override is
removed from local storage, and every other resized column keeps its width.

#### Persistent column widths

With both `resizable` and `persistenceKey`, widths are saved through the shared
`usePersistentState` utility (so the usual `builto-` storage prefix applies):

```text
data-table:{persistenceKey}:column-widths
```

Widths are keyed by stable `header.field` values — never by column index — so
reordering, hiding, adding or removing columns cannot shift them onto the wrong column.
The stored payload is versioned:

```ts
{
  version: 1,
  widths: { employee: 240, email: 300, status: 140 }
}
```

The UI updates continuously while dragging; local storage is written **once, when the
resize finishes** (keyboard adjustments are debounced), never on every pointer move.

Behaviour:

- Sorting, pagination, refetching, loading states and row changes never reset widths.
- Reordering headers preserves widths by `field`.
- Newly added columns use their configured or natural width; removed columns are a no-op.
- Unknown or stale stored fields are ignored, as are invalid, negative, non-numeric or
  corrupted values and payloads from a different schema version.
- Persisted widths still respect the column's current `minWidth`.
- Changing `persistenceKey` loads the state for the new table; two tables with different
  keys stay completely independent.
- If storage is unavailable, blocked, corrupted or over quota, the table keeps working
  without persistence.
- Without a `persistenceKey`, resizing still works for the session and **no** shared or
  generic local-storage entry is created.

#### Responsive and tree behaviour

Resizing is a desktop-table affordance. In responsive stacked-card mode there are no
handles, desktop widths are not applied to cards, and stored widths do not affect
label/value positioning — they are preserved and restored when the desktop table
returns. With `responsive="false"` the normal table (and resizing) stays available on
small viewports through horizontal scroll.

Tree tables resize normally. The effective width is applied to the `<colgroup>`, the
header cell and the body column together, so indentation, connector lines, expand
controls, async child loading and the fixed selection column all stay aligned.
Expanding or collapsing rows never recalculates saved widths.

#### Accessibility

Each handle is an accessible separator:

| Aspect | Behaviour |
| :----- | :-------- |
| Role | `role="separator"` with `aria-orientation="vertical"` — the divider is a vertical line between columns |
| Value | `aria-valuenow` / `aria-valuetext` (current px), `aria-valuemin` (effective minimum), `aria-valuemax` |
| Label | `aria-label` from the column title (i18n key `vlite.dataTable.resizeColumn`) |
| Keyboard | `←` / `→` adjust by 8px, with `Shift` by 40px |
| Reset | `Enter` / `Space`, or double-click |
| Focus | `:focus-visible` only, so a pointer press never leaves the divider stuck on while keyboard users still get a clear indicator |
| RTL | Arrow keys follow the logical direction, so a handle always grows its own column |

Keyboard resizing honours the same minimums and persistence rules as pointer resizing.
Its storage write is debounced, and any queued write is flushed before a newer
interaction (a drag, a reset, another column) takes over, so a delayed commit can never
land after a later action.

#### `@columnResize` payload — `ColumnResizePayload`

```ts
{
  field: string                              // header.field immediately before the divider
  width: number | null                       // committed px width, null after a reset
  previousWidth: number | null               // width before this interaction
  source: 'pointer' | 'keyboard' | 'reset'
}
```

#### Performance

Widths live in the table's `<colgroup>`, so a resize never touches body cells.

Everything scales with the number of **columns**, never rows. Each resizable header owns
one separator. In a bordered table that separator is a full-height overlay control
measured from the rendered header edge; no resize affordance or listener is rendered
inside body rows.

The drag path bypasses reactive width updates. Pointer movement is coalesced into
`requestAnimationFrame`, and each frame writes only the owning column's `<col>`, the
table width and (for `cellBordered`) the active boundary position. Other boundary
controls are disabled during the drag. No neighbouring data `<col>` is touched and row
data is not recalculated mid-drag. Reactive state and local storage are committed once,
when the interaction finishes. Global listeners and pending frames are always cleaned up.

#### Complete example

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { DataTable } from 'vlite3'
import type { TableHeader, TableState, ColumnResizePayload } from 'vlite3'

const showSalary = ref(true)

// Headers may come from a computed, change after an API response, or be
// reordered — widths follow `field`, so they stay on the right column.
const headers = computed<TableHeader[]>(() => [
  { field: 'employee', title: 'Employee', sortable: true, minWidth: '200px' },
  { field: 'email', title: 'Email', sortable: true, width: '22%' },
  ...(showSalary.value
    ? [{ field: 'salary', title: 'Salary', type: 'price', align: 'right' } as TableHeader]
    : []),
  { field: 'status', title: 'Status', capitalize: true, addStatusColor: true },
  // Fixed utility column — pinned while everything else resizes.
  { field: 'actions', title: '', width: '96px', align: 'center', resizable: false },
])

const rows = ref([])
const loading = ref(false)
const pageInfo = ref()

const fetchData = async (state?: TableState) => {
  loading.value = true
  const res = await myApi.getEmployees(state)
  rows.value = res.items
  pageInfo.value = res.pageInfo
  loading.value = false
}

onMounted(() => fetchData())

const onColumnResize = ({ field, width, source }: ColumnResizePayload) => {
  console.log(`${field} → ${width ?? 'reset'} (${source})`)
}
</script>

<template>
  <DataTable
    :headers="headers"
    :rows="rows"
    :loading="loading"
    :page-info="pageInfo"
    sortable
    resizable
    persistence-key="employees-table"
    @change="fetchData"
    @column-resize="onColumnResize">
    <template #actions="{ row }">
      <Button variant="ghost" size="sm" icon="lucide:pencil" @click.stop="edit(row)" />
    </template>
  </DataTable>
</template>
```

---

### Tree view

Tree mode turns on automatically when any row has nested `children`, any row has `hasChildren: true`, or `loadChildren` is provided. Expansion state, loading spinner, children cache, indentation, connector lines, and chevrons are managed inside `DataTable`. Consumers only pass nested data (and optionally `loadChildren` / `treeIndent`) — no custom flatten or connector logic in the page.

The first data column hosts the tree chrome (connectors + expand control). In tree mode the table uses `table-layout: fixed` and a `<colgroup>` so expanding or collapsing nested rows does **not** recalculate column widths. Prefer setting `width` (or `minWidth`) on headers for stable columns; tree indent stays inside the first column only.

#### Row conventions (fixed field names)

| Field | Type | Purpose |
| :---- | :--- | :------ |
| `children` | `any[]` | Static / preloaded nested rows. |
| `hasChildren` | `boolean` | Async marker — show expand chevron when children are not loaded yet. |

Field names are fixed conventions on each row object (not configurable props).

```ts
// Static
{ id: 1, name: 'Phase', children: [{ id: 2, name: 'Task' }] }

// Async-ready
{ id: 1, name: 'Phase', hasChildren: true }
```

A row is expandable when it already has `children.length > 0`, or when `hasChildren === true` (until an async load resolves to an empty list, which then hides the chevron).

#### Connector lines

Hierarchy connectors use the shared **`TreeConnectors`** primitive (`src/components/TreeConnectors`, also used by [`FileTree`](../advanced/file-tree.md)). Geometry comes from `buildTreeConnectorSegments` — vertical trunks, horizontal branches, and final-child corners (`├` / `└`) are derived from each visible row’s `depth`, `isLastSibling`, and `ancestorLastFlags`, plus layout units (`treeIndent`, toggle size). Nothing is hard-coded to sample data or fixed row heights.

In `DataTable`, the connector overlay is absolutely positioned over the first cell (including vertical padding) with `bleed-y` so trunks stay continuous across row borders. Lines stop at the final child of a parent. Recalculation is automatic on expand/collapse, insert/remove, and re-render.

#### `@expand` payload — `ExpandPayload`

```ts
{
  row: any
  expanded: boolean
  children?: any[]  // static or freshly loaded children when expanding
  depth: number
}
```

#### Selection in tree mode

Selecting a parent cascades to all **loaded** descendants. Deselecting a child updates ancestors (unchecked / indeterminate). Flat tables keep independent per-row selection.

#### Static tree

```vue
<DataTable
  :rows="treeRows"
  :headers="headers"
  :tree-indent="20"
  key-field="id"
  @expand="({ row, expanded }) => console.log(row, expanded)"
/>
```

#### Async tree

```vue
<script setup lang="ts">
const roots = ref([
  { id: 1, name: 'Construction Phase', hasChildren: true },
])

const loadChildren = async (row: any) => {
  const res = await api.getChildren(row.id)
  return res.items // cached by DataTable — do not remap rows
}
</script>

<template>
  <DataTable
    :rows="roots"
    :headers="headers"
    :load-children="loadChildren"
    key-field="id"
    @expand="onExpand"
  />
</template>
```

---

### `@change` Payload — `TableState`

```ts
{
  pagination: { page: number; limit: number }
  sort:       { field: string; order: 'asc' | 'desc' | '' }
  filter:     Record<string, any>  // currently always `{}` from DataTable; reserved for consumers / Screen
}
```

> `sort.field` is the resolved `sortKey` when set on the header, otherwise the column `field`. That is the value sent to the backend.

---

### Sorting

Sorting requires the table-level `sortable` prop.

A column is sortable when **all** of the following are true:

1. `sortable` is `true` on `DataTable`
2. The header does **not** set `sortable: false`
3. The header has a `title` or `titleI18n` (untitled / action columns are not sortable)

Clicking a sortable header cycles `asc` → `desc` on the same column, or starts at `asc` when switching columns. Changing sort resets the page to `1` and emits `@change`.

Use `sortKey` when the display `field` (and slot name) differ from the backend sort column:

```ts
const headers = computed<TableHeader[]>(() => [
  {
    field: 'employee',       // slot name (#employee) and display path
    sortKey: 'employeeName', // sent in sort.field
    title: 'Employee',
    sortable: true,
  },
  {
    field: 'department',
    sortKey: 'department.departmentName', // nested backend path
    title: 'Department',
    sortable: true,
  },
  {
    field: 'status',
    title: 'Status',
    sortable: true,
    // no sortKey → sort.field is 'status'
  },
])
```

When the user clicks **Employee**, the emitted sort is `{ field: 'employeeName', order: 'asc' }`. The active sort indicator on the header tracks the resolved key.

---

### Selection

- Selection is **on by default** (standalone and inside `Screen`, unless `Screen` sets `hideSelectable`).
- Pass `hideSelectable` to disable the checkbox column; this overrides Screen’s `forceSelectable`.
- Pass `isRowSelectable` when only some visible rows may be selected. Disabled rows remain visible, render a disabled checkbox, and are excluded from select-all and emitted selections.
- Bind with `v-model:selectedRows` or listen to `@select` / `@update:selectedRows`.
- Row ids come from `keyField` (supports nested paths). Selections that no longer appear in the loaded row set are pruned automatically.
- Header checkbox supports select-all / indeterminate state for the **current selectable scope** (current page in flat mode; loaded tree nodes in tree mode).
- In **tree mode**, parent selection cascades to loaded descendants; parents can show an indeterminate checkbox when only some descendants are selected.
- Clicking a checkbox does not emit `@rowClick`.

```ts
interface SelectionState {
  selected: any[]
  all: boolean
  indeterminate: boolean
}
```

---

### Pagination

The footer renders only when:

```ts
showPagination && pageInfo && pageInfo.totalPages > 1
```

`pageInfo.currentPage` and `pageInfo.itemsPerPage` sync into internal state when they change. Changing page or limit emits `@change` (and `@update:itemsPerPage` for limit).

```ts
interface PageInfo {
  currentPage: number
  totalPages: number
  totalItems?: number
  itemsPerPage?: number
}
```

---

### Types

```ts
export type DataTablePaginationProps = Omit<PaginationProps, 'currentPage' | 'totalPages'>

export interface PaginationConfig {
  page: number
  limit: number
}

export interface SortConfig {
  field: string
  order: 'asc' | 'desc' | ''
}

export interface TableState {
  pagination: PaginationConfig
  sort: SortConfig
  filter: Record<string, any>
}

export interface FilterConfig {
  [key: string]: any
}

export interface TableFilter {
  pagination: PaginationConfig
  sort?: SortConfig
  filter: FilterConfig
}

export interface TableHeader {
  field: string
  title: string
  titleI18n?: string
  /**
   * Key sent to the backend when sorting this column.
   * Falls back to `field` when omitted.
   * Use when the display field differs from the DB column
   * (e.g. field: 'employee' + slot, sortKey: 'employeeName').
   */
  sortKey?: string
  width?: string
  minWidth?: string
  sortable?: boolean
  /** `false` pins this column when the table sets `resizable`. */
  resizable?: boolean
  hideOnMobile?: boolean
  align?: 'left' | 'center' | 'right'
  format?: (value: any, row?: any) => string
  class?: string | ((value: any, row?: any) => string)
  capitalize?: boolean
  addStatusColor?: boolean
  type?: 'text' | 'price' | 'date' | 'number'
}

export interface DataTableProps {
  rows: any[]
  selectedRows?: any[]
  headers: TableHeader[]
  keyField?: string
  loading?: boolean
  hideSelectable?: boolean
  /** Return false to keep a row visible while disabling its selection checkbox. */
  isRowSelectable?: (row: any) => boolean
  // …empty / pagination / visual props…
  sortable?: boolean
  /** Rounded container corners. Set `false` for sharp edges. @default true */
  rounded?: boolean
  variant?: 'default' | 'raised'
  headerVariant?: 'default' | 'minimal'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Async loader for nested rows; result cached inside DataTable. */
  loadChildren?: (row: any) => Promise<any[]>
  /** Indent (px) per tree depth on the first column. @default 20 */
  treeIndent?: number
  /**
   * When `true` (default), viewports below Tailwind `md` render stacked cards.
   * Set `false` for always-table + horizontal scroll.
   */
  responsive?: boolean
  /** Opt in to drag-to-resize column boundaries. @default false */
  resizable?: boolean
  /** Stable key for persisting column widths. Separate from `keyField`. */
  persistenceKey?: string
}

export interface ColumnResizePayload {
  field: string
  width: number | null
  previousWidth: number | null
  source: 'pointer' | 'keyboard' | 'reset'
}

/** Versioned local-storage payload; widths keyed by `header.field`. */
export interface ColumnWidthsState {
  version: number
  widths: Record<string, number>
}

export interface SelectionState {
  selected: any[]
  all: boolean
  indeterminate: boolean
}

export interface RowClickPayload {
  row: any
  index: number
}

export interface ExpandPayload {
  row: any
  expanded: boolean
  children?: any[]
  depth: number
}

/** Internal flattened visible row used when tree mode is on. */
export interface DataTableFlatRow {
  row: any
  id: any
  depth: number
  parentId: any | null
  isLastSibling: boolean
  ancestorLastFlags: boolean[]
  index: number
}

/**
 * Provided by Screen to descendants via provide/inject.
 * - forceSelectable → enable row selection for bulk-delete
 * - onTableChange   → merge sort/pagination into Screen refetch
 *                     (undefined when DataTable is standalone)
 */
export interface ScreenContext {
  forceSelectable: boolean
  onTableChange?: (state: TableState) => void
}
```

---

### `TableHeader` schema

| Property         | Type                                      | Description |
| :--------------- | :---------------------------------------- | :---------- |
| `field`          | `string`                                  | **Required.** Value path on the row (dot-notation supported) and the named slot for custom cells. |
| `title`          | `string`                                  | Column label. Required for a column to be sortable. |
| `titleI18n`      | `string`                                  | i18n key for the label (takes priority over `title`). |
| `sortKey`        | `string`                                  | Backend sort field. Defaults to `field`. |
| `width`          | `string`                                  | Fixed width. CSS length (`'120px'`, `'22%'`) → inline style; Tailwind utility (`'w-32'`) → class. |
| `minWidth`       | `string`                                  | Minimum width. Same dual mode as `width` (`'120px'` vs `'min-w-40'`). |
| `sortable`       | `boolean`                                 | Set `false` to opt out when the table has `sortable`. Default: allowed. |
| `resizable`      | `boolean`                                 | Set `false` to pin this column when the table has `resizable`. Use for action / checkbox-like / fixed-width columns. Default: allowed. |
| `hideOnMobile`   | `boolean`                                 | Hide column below the `md` breakpoint (table mode and stacked cards). |
| `align`          | `'left' \| 'center' \| 'right'`           | Cell and header alignment. Default `'left'`. |
| `format`         | `(value, row?) => string`                 | Custom formatter. Return plain text or HTML (rendered via `v-html`). Takes priority over `type`. |
| `class`          | `string \| ((value, row?) => string)`     | Static or dynamic classes on the value cell. |
| `capitalize`     | `boolean`                                 | Apply `capitalize` to the cell. |
| `addStatusColor` | `boolean`                                 | Apply semantic text color from the cell value (see below). |
| `type`           | `'text' \| 'price' \| 'date' \| 'number'` | Built-in renderer when no slot / `format` is used. |

#### Built-in `type` rendering

| Value    | Output |
| :------- | :----- |
| `text`   | String (default). `null` / `undefined` → `'-'`. |
| `number` | `Intl.NumberFormat('en-US')`. |
| `price`  | Renders the `Price` component. |
| `date`   | Renders the `DateTime` component. |

#### `addStatusColor` map

Normalized (lowercased, separators stripped) values:

| Value | Style |
| :---- | :---- |
| `active`, `completed`, `success` | success |
| `pending`, `warning`, `medium` | warning |
| `cancelled`, `failed`, `error`, `high` | destructive |
| `info` | info |
| `inactive`, `low` | muted |

---

### Slots

| Slot             | Props                          | Description |
| :--------------- | :----------------------------- | :---------- |
| `[header.field]` | `{ value, row, index, field }` | Custom cell content. Example: `#name="{ value, row }"`. Overrides built-in `type` / `format` for that column. |
| `empty`          | —                              | Replaces the entire empty state. |
| `empty-action`   | —                              | Action slot inside the default `Empty` state. |

---

### Screen context (automatic behaviour)

When `DataTable` is rendered under `Screen` (via `:table` / `views` or `#table`), it injects `ScreenContext` and:

- **Enables row selection** when Screen’s `hideSelectable` is false (`forceSelectable`).
- **Forwards sort and pagination** to Screen’s refetch via `onTableChange` — no extra `@change` wiring needed. Sort payloads respect `sortKey`.

`hideSelectable` on `DataTable` still wins if you need a non-selectable table inside Screen.

Standalone usage (no Screen): selection is on by default; listen to `@change` yourself.

---

### Standalone usage

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { DataTable } from 'vlite3'
import type { TableHeader, TableState } from 'vlite3'

const headers: TableHeader[] = [
  { field: 'employee', sortKey: 'employeeName', title: 'Employee', sortable: true },
  { field: 'email', title: 'Email', sortable: true },
  { field: 'salary', title: 'Salary', type: 'price', align: 'right', sortable: true },
  { field: 'joined', title: 'Joined', type: 'date', sortable: true },
  { field: 'status', title: 'Status', capitalize: true, addStatusColor: true, sortable: true },
]

const rows = ref([])
const loading = ref(false)
const pageInfo = ref()
const selectedRows = ref([])

const fetchData = async (state?: TableState) => {
  loading.value = true
  // state.sort.field is 'employeeName' when the Employee column is sorted
  const res = await myApi.getEmployees(state)
  rows.value = res.items
  pageInfo.value = res.pageInfo
  loading.value = false
}

onMounted(() => fetchData())
</script>

<template>
  <DataTable
    v-model:selected-rows="selectedRows"
    :rows="rows"
    :headers="headers"
    :loading="loading"
    :page-info="pageInfo"
    sortable
    size="md"
    @change="fetchData"
    @row-click="({ row }) => openDetail(row)">
    <template #employee="{ row }">
      <div class="flex items-center gap-3">
        <img v-if="row.avatar" :src="row.avatar" class="w-9 h-9 rounded-full object-cover" />
        <div class="flex flex-col">
          <span class="font-medium text-sm">{{ row.employeeName }}</span>
          <span class="text-xs text-muted-foreground">{{ row.employeeId }}</span>
        </div>
      </div>
    </template>
  </DataTable>
</template>
```

---

### Usage inside Screen (recommended)

```vue
<!-- EmployeeTable.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { DataTable, type TableHeader } from 'vlite3'

defineProps<{ data: any[]; loading: boolean; delete?: Function }>()

const headers = computed<TableHeader[]>(() => [
  {
    field: 'employee',
    sortKey: 'employeeName',
    title: 'Employee',
    sortable: true,
  },
  { field: 'email', title: 'Email', sortable: true },
  {
    field: 'department',
    sortKey: 'department.departmentName',
    title: 'Department',
    sortable: true,
  },
  { field: 'status', title: 'Status', sortable: true, capitalize: true, addStatusColor: true },
  { field: 'actions', title: '', align: 'right' },
])
</script>

<template>
  <DataTable :headers="headers" :rows="data" sortable :loading="loading">
    <template #employee="{ row }">
      <div class="flex items-center gap-3">
        <img
          v-if="row.avatar"
          :src="row.avatar"
          class="w-9 h-9 rounded-full object-cover border shrink-0" />
        <div
          v-else
          class="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm font-semibold shrink-0">
          {{ row.employeeName?.charAt(0) }}
        </div>
        <div class="flex flex-col min-w-0">
          <span class="font-medium text-sm truncate">{{ row.employeeName }}</span>
          <span class="text-xs text-muted-foreground">{{ row.employeeId }}</span>
        </div>
      </div>
    </template>
    <template #department="{ row }">{{ row.department?.departmentName || '-' }}</template>
    <template #status="{ value }">
      <Badge :variant="value === 'active' ? 'success' : 'secondary'">{{ value }}</Badge>
    </template>
    <template #actions="{ row }">
      <div class="flex justify-end gap-1">
        <Button
          variant="ghost"
          size="sm"
          icon="lucide:trash-2"
          class="text-red-500"
          @click="props.delete?.([row])" />
      </div>
    </template>
  </DataTable>
</template>
```

```vue
<!-- EmployeesPage.vue -->
<template>
  <Screen
    name="employees"
    title="Employees"
    :data="items"
    :loading="loading"
    :page-info="pageInfo"
    :table="EmployeeTable"
    :refetch="handleRefetch"
    @delete="handleDelete" />
</template>
```

> Clicking the **Employee** column header sends `{ sort: { field: 'employeeName', order: 'asc' } }` to `handleRefetch` — the backend-friendly key, not the slot name.

---

### Related exports

| Export            | Notes |
| :---------------- | :---- |
| `DataTable`       | Main component. |
| `DataTableHeader` | Internal column header (also exported). |
| `DataTableRow`    | Internal row renderer (also exported); hosts tree chrome + `TreeConnectors` in tree mode. |
| Types from `./types` | `TableHeader`, `DataTableProps`, `TableState`, `TableFilter`, `SelectionState`, `RowClickPayload`, `ExpandPayload`, `ColumnResizePayload`, `ColumnWidthsState`, `DataTableFlatRow`, `ScreenContext`, `SCREEN_CONTEXT_KEY`, etc. |

Tree expansion state lives in the internal `useDataTableTree` composable, and column
resizing in `useDataTableColumnResize` (neither is a public package export). Connector drawing is shared via `TreeConnectors` / `buildTreeConnectorSegments` under `src/components/TreeConnectors` (same primitive as [`FileTree`](../advanced/file-tree.md)).

`DataTableToolbar` lives beside these files as a search/actions toolbar primitive (`v-model` search, `left` / `right` / `delete` slots). It is **not** wired into `DataTable` and is **not** re-exported from the package entry — compose it yourself above the table if needed.

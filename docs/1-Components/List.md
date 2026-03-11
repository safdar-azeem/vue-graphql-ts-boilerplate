# List

**Import:** `import { List } from 'vlite3'`

A schema-driven key-value information display component. Renders structured data records in a clean, accessible grid layout with support for multiple columns, variants, conditional fields, sensitive masking, custom formatters, Vue component injection, named slot overrides, and loading skeletons.

---

## Quick Start

```vue
<script setup lang="ts">
import { List } from 'vlite3'
import type { ListField } from 'vlite3'

const user = { name: 'Alice', email: 'alice@example.com', status: 'active' }

const fields: ListField[] = [
  { key: 'name', title: 'Full Name' },
  { key: 'email', title: 'Email' },
  { key: 'status', title: 'Status', addStatusColor: true },
]
</script>

<template>
  <List :fields="fields" :data="user" title="User Info" />
</template>
```

---

## Props

| Prop                 | Type                  | Default      | Description                                                                                                                                                                     |
| :------------------- | :-------------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `fields`             | `ListField[]`         | **required** | Array of field definitions (schema).                                                                                                                                            |
| `data`               | `Record<string, any>` | **required** | The data record to display.                                                                                                                                                     |
| `title`              | `string`              | —            | Optional section title shown in a header bar.                                                                                                                                   |
| `titleI18n`          | `string`              | —            | i18n translation key for the title.                                                                                                                                             |
| `titleIcon`          | `string`              | —            | Iconify icon ID displayed beside the title.                                                                                                                                     |
| `columns`            | `1 \| 2 \| 3`         | `2`          | Number of columns for field layout.                                                                                                                                             |
| `variant`            | `ListVariant`         | `'default'`  | Visual style of the container.                                                                                                                                                  |
| `class`              | `string`              | `''`         | Extra Tailwind classes on the root element.                                                                                                                                     |
| `showColon`          | `boolean`             | `true`       | Append `:` after each field label.                                                                                                                                              |
| `loading`            | `boolean`             | `false`      | Show animated skeleton rows instead of data.                                                                                                                                    |
| `skeletonRows`       | `number`              | `6`          | Number of skeleton rows rendered per column while loading.                                                                                                                      |
| `stackedBorderStyle` | `StackedBorderStyle`  | `'none'`     | Controls border dividers between cells in the `stacked` variant. `'none'` — no borders (default). `'divider'` — left border on non-first cells per row with extra left padding. |

---

## ListField Schema

Each object in the `fields` array describes one row.

| Property         | Type                                  | Description                                                                          |
| :--------------- | :------------------------------------ | :----------------------------------------------------------------------------------- |
| `key`            | `string`                              | **Required.** Path to the value in `data`. Supports dot-notation: `'location.city'`. |
| `title`          | `string`                              | Display label. Falls back to `key` if omitted.                                       |
| `titleI18n`      | `string`                              | i18n key for the label — takes priority over `title`.                                |
| `icon`           | `string`                              | Iconify icon ID displayed beside the label.                                          |
| `lineByLine`     | `boolean`                             | When `true`, the field spans the full component width (below the column grid).       |
| `whenTrue`       | `boolean`                             | Only render this row when the resolved value is truthy.                              |
| `when`           | `(value: any, data: any) => boolean`  | Custom visibility predicate — receives the resolved value and the full data object.  |
| `format`         | `(value: any, data: any) => string`   | Custom formatter. Return a plain string or an HTML string.                           |
| `isSensitive`    | `boolean`                             | Mask the value with dots and show an eye-toggle button.                              |
| `addStatusColor` | `boolean`                             | Apply a semantic color class based on the string value (e.g. `active` → green).      |
| `type`           | `ListFieldType`                       | Built-in rendering type applied automatically when no `format` is provided.          |
| `class`          | `string \| ((value, data) => string)` | Static or dynamic Tailwind class(es) applied to the value cell.                      |
| `component`      | `Component`                           | A Vue component rendered in the value cell. Receives `{ data, value }` props.        |
| `emptyText`      | `string`                              | Fallback text when the value is `null`, `undefined`, or `''`. Defaults to `'--'`.    |

### `ListFieldType` values

| Value      | Output                                           |
| :--------- | :----------------------------------------------- |
| `text`     | Plain string (default).                          |
| `date`     | Formatted date: `Apr 15, 2023`.                  |
| `dateTime` | Formatted date + time: `Apr 15, 2023, 09:30 AM`. |
| `time`     | Alias for `dateTime`.                            |
| `price`    | USD currency: `$1,234.50`.                       |
| `number`   | Locale number: `1,234`.                          |
| `boolean`  | `'Yes'` / `'No'`.                                |
| `image`    | Renders a `32×32` rounded avatar image.          |
| `html`     | Renders raw HTML via `v-html`.                   |

---

## Variants

| Value           | Description                                                               |
| :-------------- | :------------------------------------------------------------------------ |
| `default`       | Simple border + rounded container. Standard choice.                       |
| `card`          | Larger border-radius, card background, subtle shadow.                     |
| `minimal`       | No border, no background. Zero-chrome display.                            |
| `striped`       | Alternating row background on odd rows.                                   |
| `compact`       | Reduced vertical padding (`py-1.5`) for dense data grids.                 |
| `bordered-rows` | Full border wrapping with per-row dividers.                               |
| `stacked`       | Label on top, value below — grid of vertical cells. Ideal for info cards. |

---

## Slots

### `title`

Override the entire title bar content.

```vue
<List :fields="fields" :data="data">
  <template #title>
    <span class="font-bold text-primary">Custom Header</span>
  </template>
</List>
```

### `footer`

Rendered in a bordered footer at the bottom of the component.

```vue
<List :fields="fields" :data="data">
  <template #footer>
    <Button variant="ghost" size="sm">Edit</Button>
  </template>
</List>
```

### Per-field named slots

Override the value area of any specific field using its `key` as the slot name.
The slot receives `{ value, resolved, data }`.

| Slot prop  | Type     | Description                              |
| :--------- | :------- | :--------------------------------------- |
| `value`    | `any`    | Raw value from `data[field.key]`.        |
| `resolved` | `string` | Formatted value (after `format`/`type`). |
| `data`     | `object` | The full data record.                    |

```vue
<List :fields="fields" :data="user">
  <template #status="{ value }">
    <span
      class="px-2 py-0.5 rounded-full text-xs font-semibold"
      :class="value === 'active' ? 'bg-success-light text-success-dark' : 'bg-danger-light text-danger-dark'">
      {{ value }}
    </span>
  </template>
</List>
```

---

## lineByLine — Full-Width Rows

Fields with `lineByLine: true` are pulled out of the column grid and rendered
below it in a full-width section. A single `border-t` separates the two
sections — **no double borders**.

```ts
const fields: ListField[] = [
  { key: 'name', title: 'Name' }, // goes into column grid
  { key: 'email', title: 'Email' }, // goes into column grid
  { key: 'notes', title: 'Notes', lineByLine: true }, // full-width below
]
```

> **Border rule:** The last row in each column suppresses its own `border-b`
> when `lineByLine` items are present. The full-width wrapper's `border-t`
> acts as the sole visual separator — one clean 1 px line, never doubled.

---

## Stacked Variant

The `stacked` variant renders each field as a vertical cell — small muted label on top, bold value below — in a responsive CSS grid. Perfect for personal information cards, account details, and any UI where label-value pairs should be visually grouped in a compact grid.

```vue
<script setup lang="ts">
import { List } from 'vlite3'
import type { ListField } from 'vlite3'

const person = {
  gender: 'Female',
  dateOfBirth: '1996-03-05T00:00:00Z',
  nationality: 'Vietnam',
  language: 'Vietnamese, English',
  maritalStatus: 'Single',
}

const fields: ListField[] = [
  { key: 'gender', title: 'Gender' },
  { key: 'dateOfBirth', title: 'Date of birth', type: 'date' },
  { key: 'nationality', title: 'Nationality' },
  { key: 'language', title: 'Language' },
  { key: 'maritalStatus', title: 'Marital status' },
]
</script>

<template>
  <List
    :fields="fields"
    :data="person"
    title="Personal information"
    title-icon="lucide:user"
    variant="stacked"
    :show-colon="false"
    :columns="2" />
</template>
```

> **Layout:** Cells are arranged in a responsive CSS grid. The `columns` prop
> controls how many columns appear at wider breakpoints. On small screens
> (`< sm`), the layout automatically falls back to the default horizontal
> row style (label left, value right, with border dividers) for optimal
> readability on narrow viewports.

### `stackedBorderStyle`

Controls whether left-border dividers appear between cells in the stacked grid.

| Value       | Description                                                               |
| :---------- | :------------------------------------------------------------------------ |
| `'none'`    | No borders between cells. Default stock look.                             |
| `'divider'` | Left border on every non-first cell per row, plus increased left padding. |

```vue
<!-- Default: no cell dividers -->
<List variant="stacked" stacked-border-style="none" ... />

<!-- With dividers between columns -->
<List variant="stacked" stacked-border-style="divider" ... />
```

---

## Conditional Fields

### `whenTrue`

Field is only rendered when its resolved value is truthy.

```ts
{ key: 'adminCode', title: 'Admin Code', whenTrue: true }
```

### `when`

Custom predicate. The field is rendered when the function returns `true`.

```ts
{
  key: 'notes',
  title: 'Notes',
  when: (value) => !!value,   // hide when empty string
}

{
  key: 'discount',
  title: 'Discount',
  when: (value, data) => data.role === 'admin',  // only for admins
}
```

---

## Sensitive Fields

Fields with `isSensitive: true` mask the value with bullet dots and show an
eye-toggle button. The value is revealed on click and hidden again on second
click. Ideal for passwords, SSNs, bank account numbers, etc.

```ts
{ key: 'ssn',           title: 'SSN',        isSensitive: true }
{ key: 'accountNumber', title: 'Account No.', isSensitive: true }
```

---

## Status Colors

Fields with `addStatusColor: true` apply a semantic Tailwind color class
based on the string value. Matching is case-insensitive and ignores `-`, `_`,
and spaces.

| Value keyword                                                   | Color class applied             |
| :-------------------------------------------------------------- | :------------------------------ |
| `active`, `success`, `completed`, `yes`, `true`, `enabled`      | `text-success-dark font-medium` |
| `pending`, `warning`, `medium`                                  | `text-warning-dark font-medium` |
| `cancelled`, `failed`, `error`, `danger`, `high`, `no`, `false` | `text-danger-dark font-medium`  |
| `inactive`, `disabled`, `low`                                   | `text-muted-foreground`         |

```ts
{ key: 'status', title: 'Status', addStatusColor: true }
```

---

## Custom Formatters

Use `format` to return any string (including HTML).

```ts
// Boolean flag
{ key: 'isVerified', title: 'Verified', format: (v) => v ? 'Yes' : 'No' }

// Computed from multiple fields
{ key: 'firstName', title: 'Full Name', format: (v, data) => `${v} ${data.lastName}` }

// HTML badge
{
  key: 'priority',
  title: 'Priority',
  format: (v) => `<span class="text-danger-dark font-semibold">${v}</span>`,
}
```

---

## Dot-Notation Keys

Resolve values from nested objects using dot-notation paths.

```ts
const data = {
  location: {
    city: 'San Francisco',
    country: 'United States',
  },
}

const fields: ListField[] = [
  { key: 'location.city', title: 'City' },
  { key: 'location.country', title: 'Country' },
]
```

---

## Full Example

```vue
<script setup lang="ts">
import { List } from 'vlite3'
import type { ListField } from 'vlite3'

const customer = {
  name: 'Olivia Bennett',
  email: 'olivia@example.com',
  phone: '+1 (555) 234-5678',
  status: 'active',
  createdAt: '2023-04-15T09:30:00Z',
  totalAmount: 128450.75,
  ssn: '123-45-6789',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=olivia',
  notes: 'Prefers contact via email. Do not call before 9am.',
  location: { city: 'San Francisco', country: 'United States' },
}

const fields: ListField[] = [
  { key: 'name', title: 'Full Name', icon: 'lucide:user' },
  { key: 'email', title: 'Email', icon: 'lucide:mail' },
  { key: 'phone', title: 'Phone', isSensitive: true },
  { key: 'status', title: 'Status', addStatusColor: true },
  { key: 'createdAt', title: 'Member Since', type: 'date' },
  { key: 'totalAmount', title: 'Total', type: 'price' },
  { key: 'ssn', title: 'SSN', isSensitive: true, whenTrue: true },
  { key: 'avatar', title: 'Avatar', type: 'image' },
  { key: 'location.city', title: 'City' },
  { key: 'location.country', title: 'Country' },
  // Full-width rows rendered below the grid
  { key: 'notes', title: 'Notes', lineByLine: true, when: (v) => !!v },
]
</script>

<template>
  <List
    :fields="fields"
    :data="customer"
    title="Customer Information"
    title-icon="lucide:user-circle"
    variant="card"
    :columns="2"
    :show-colon="true"
    stacked-border-style="none">
    <!-- Custom slot override for status field -->
    <template #status="{ value }">
      <span
        class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold"
        :class="
          value === 'active'
            ? 'bg-success-light text-success-dark'
            : 'bg-danger-light text-danger-dark'
        ">
        <span
          class="w-1.5 h-1.5 rounded-full"
          :class="value === 'active' ? 'bg-success' : 'bg-danger'" />
        {{ value }}
      </span>
    </template>
    <!-- Footer -->
    <template #footer>
      <div class="flex justify-end gap-2">
        <Button variant="ghost" size="sm" icon="lucide:pencil">Edit</Button>
      </div>
    </template>
  </List>
</template>
```

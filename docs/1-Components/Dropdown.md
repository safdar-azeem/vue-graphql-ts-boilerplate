# Dropdown

**Import:** `import { Dropdown } from 'vlite3'`

A flexible, feature-rich dropdown component supporting single selection, nested menus, remote search, pagination, boolean toggles, grouped layouts, double confirmation, RTL direction, and more.

---

## Props

| Prop                 | Type                                         | Default              | Description                                                                           |
| -------------------- | -------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------- |
| `selected`           | `any`                                        | —                    | Selected value (alternative to v-model)                                               |
| `modelValue`         | `any`                                        | —                    | Binding (`v-model`)                                                                   |
| `className`          | `string`                                     | `''`                 | Custom class for dropdown menu                                                        |
| `emptyMessage`       | `string`                                     | `'No options found'` | Message when no options match                                                         |
| `position`           | `TooltTipPlacement`                          | —                    | Dropdown placement direction                                                          |
| `closeOnSelect`      | `boolean`                                    | `true`               | Close dropdown after selection                                                        |
| `toggleSelection`    | `boolean`                                    | `true`               | Allow deselecting currently active option                                             |
| `options`            | `IDropdownOptions \| string[] \| number[]`   | `[]`                 | Array of options (supports plain strings/numbers)                                     |
| `canCloseOutside`    | `boolean`                                    | `true`               | Close when clicking outside                                                           |
| `caret`              | `boolean`                                    | `false`              | Show caret arrow indicator                                                            |
| `offset`             | `[number, number]`                           | `[0, 8]`             | X/Y offset for dropdown                                                               |
| `isOpen`             | `boolean`                                    | —                    | Manual control of open state                                                          |
| `teleport`           | `boolean`                                    | `true`               | Teleport menu to body                                                                 |
| `selectedIndex`      | `number \| null`                             | `null`               | Index of highlighted item                                                             |
| `maxHeight`          | `string`                                     | `'300px'`            | Max height of menu                                                                    |
| `width`              | `string`                                     | —                    | Custom width                                                                          |
| `ignoreClickOutside` | `string[]`                                   | —                    | Array of element IDs to ignore                                                        |
| `menuId`             | `string`                                     | —                    | HTML ID for the menu container                                                        |
| `nestedPosition`     | `TooltTipPlacement`                          | —                    | Default position for all nested child dropdowns                                       |
| `nestedOffset`       | `[number, number]`                           | —                    | Default offset for all nested child dropdowns                                         |
| `showSelectedLabel`  | `boolean`                                    | `true`               | Show the selected label in trigger                                                    |
| `selectable`         | `boolean`                                    | `true`               | Enable item selection styles                                                          |
| `doubleConfirmation` | `boolean`                                    | `false`              | Require confirmation for selection                                                    |
| `layout`             | `'default' \| 'grouped'`                     | `'default'`          | Layout mode for options                                                               |
| `columns`            | `number \| string`                           | `3`                  | Number of columns in grouped layout (also accepts CSS grid string e.g. `'200px 1fr'`) |
| `loading`            | `boolean`                                    | `false`              | Show loading spinner state                                                            |
| `hasMore`            | `boolean`                                    | `false`              | Show "Load More" indicator for pagination                                             |
| `searchable`         | `boolean`                                    | `true`               | Enable search input (auto-shown for >9 options)                                       |
| `remote`             | `boolean`                                    | `false`              | Enable remote data loading mode                                                       |
| `debounceTime`       | `number`                                     | `300`                | Debounce delay (ms) for remote search emit                                            |
| `fetchSelected`      | `(ids: any[]) => Promise<IDropdownOption[]>` | —                    | Async function to hydrate selected labels in remote/paginated mode                    |
| `triggerProps`       | `ButtonProps`                                | —                    | Additional props for default trigger button                                           |
| `direction`          | `'ltr' \| 'rtl'`                             | `'ltr'`              | Text/layout direction                                                                 |

---

## Types

```ts
export type IDropdownOption = {
  label: string
  labelI18n?: string
  value?: any
  key?: string
  subtitle?: string
  subtitleI18n?: string
  description?: string
  descriptionI18n?: string
  icon?: string
  emoji?: string
  disabled?: boolean
  children?: IDropdownOption[]

  // --- Per-item styling ---
  class?: string // Applied to the option row element
  triggerClass?: string // Applied to the nested trigger wrapper (only for items with children)

  // --- Per-item nested dropdown control ---
  position?: TooltTipPlacement // Overrides nestedPosition for this specific item
  offset?: [number, number] // Overrides nestedOffset for this specific item
  showChevron?: boolean // Show/hide the chevron icon for this item (default: true)

  confirmation?:
    | boolean
    | {
        title?: string
        description?: string
        confirmText?: string
        cancelText?: string
        variant?: string
      }
  data?: any

  // --- Individual Select Hook ---
  onSelect?: (payload: {
    value: any
    option: IDropdownOption
    data: IDropdownOption[]
    values?: any
  }) => void
}

export type IDropdownOptions = IDropdownOption[]
```

### Per-item Option Fields

| Field          | Type                | Default | Description                                                                                              |
| -------------- | ------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| `class`        | `string`            | —       | CSS class applied to the option row (both leaf items and nested trigger rows)                            |
| `triggerClass` | `string`            | —       | CSS class applied only to the nested trigger wrapper div (takes priority over `class` for nested items)  |
| `position`     | `TooltTipPlacement` | —       | Overrides the global `nestedPosition` prop for this specific child dropdown                              |
| `offset`       | `[number, number]`  | —       | Overrides the global `nestedOffset` prop for this specific child dropdown                                |
| `showChevron`  | `boolean`           | `true`  | Set to `false` to hide the chevron arrow on a specific nested item                                       |
| `onSelect`     | `Function`          | —       | Callback triggered when this specific option is selected. Receives the fully merged root `values` state. |

### Special `data` fields

| Field            | Type      | Description                                                    |
| ---------------- | --------- | -------------------------------------------------------------- |
| `data.isBoolean` | `boolean` | Renders option as a toggle Switch instead of a selectable item |
| `data.avatar`    | `string`  | Avatar URL (used in custom `#item` slot patterns)              |

### Separator

Use `label: '---'` to render a horizontal divider line between options:

```ts
{
  label: '---'
}
```

---

## Events

| Event                | Payload                      | Description                                                  |
| -------------------- | ---------------------------- | ------------------------------------------------------------ |
| `@onSelect`          | `{ value: any; data?: any }` | Emitted when an option is selected                           |
| `@update:modelValue` | `any`                        | Emitted to update v-model                                    |
| `@onOpen`            | —                            | Emitted when dropdown opens                                  |
| `@onClose`           | —                            | Emitted when dropdown closes                                 |
| `@update:isOpen`     | `boolean`                    | Emitted on open/close state change                           |
| `@load-more`         | —                            | Emitted when scrolled to bottom (requires `hasMore: true`)   |
| `@search`            | `string`                     | Emitted when search query changes (debounced in remote mode) |

---

## Slots

| Slot      | Description                      | Slot Props                                                      |
| --------- | -------------------------------- | --------------------------------------------------------------- |
| `trigger` | Custom trigger element           | `{ isOpen: boolean, selectedLabel: string }`                    |
| `item`    | Custom option rendering          | `{ option: IDropdownOption, index: number, selected: boolean }` |
| `header`  | Sticky content at top of menu    | —                                                               |
| `footer`  | Sticky content at bottom of menu | —                                                               |
| `menu`    | Full menu replacement            | —                                                               |

---

## Exports

```ts
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  useDropdownSelection,
  useDropdownIds,
} from 'vlite3'
```

---

## Usage

### Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Dropdown } from 'vlite3'
import Button from 'vlite3/Button'

const val = ref('1')
</script>

<template>
  <Dropdown
    closeOnSelect
    :options="[
      { value: '1', label: 'Dashboard', icon: 'lucide:layout-dashboard' },
      { value: '2', label: 'Settings', icon: 'lucide:settings' },
      { value: '3', label: 'Profile', emoji: '🚀' },
      { value: '4', label: 'Logout', icon: 'lucide:log-out', disabled: true },
    ]"
    :selected="val"
    @on-select="(opt) => (val = opt.value)">
    <template #trigger>
      <Button variant="outline" icon-right="lucide:chevron-down">Menu</Button>
    </template>
  </Dropdown>
</template>
```

---

### Per-item onSelect Callback

You can attach an `onSelect` callback directly to individual options. This is especially useful for nested configurations where you need the complete, fully-merged state (`values`) of the root dropdown after a deeply nested item is selected.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Dropdown } from 'vlite3'

const config = ref({})
</script>

<template>
  <Dropdown
    v-model="config"
    :options="[
      {
        label: 'Advanced Settings',
        key: 'advanced',
        // The callback triggers even if a child nested deep inside is clicked
        onSelect: (payload) => {
          console.log('Advanced Settings interacted with!', payload.values)
        },
        children: [
          {
            label: 'Delete Branch',
            value: 'delete-branch',
            class: 'text-danger',
            // Specifically listen to this leaf node
            onSelect: ({ value, option, values }) => {
              console.log('Selected value:', value) // 'delete-branch'
              console.log('Full config state:', values) // e.g. { advanced: 'delete-branch' }
            },
          },
          { label: 'Force Push', value: 'force-push' },
        ],
      },
    ]">
    <template #trigger>
      <Button variant="outline">Advanced</Button>
    </template>
  </Dropdown>
</template>
```

---

### Per-item Class Styling

Use `class` to style any option row. For nested items (with `children`), use `triggerClass` to target the trigger wrapper specifically — it takes priority over `class` on nested rows.

```vue
:options="[ { label: 'Delete', value: 'delete', class: 'text-destructive hover:bg-destructive/10',
}, { label: 'More Options', class: 'font-semibold', triggerClass: 'bg-muted', children: [ { label:
'Export', value: 'export' }, { label: 'Archive', value: 'archive' }, ], }, ]"
```

---

### Per-item Nested Dropdown Control

Each option with `children` can independently override the global `nestedPosition`, `nestedOffset`, and `showChevron` settings.

```vue
:options="[ { label: 'Appearance', icon: 'lucide:palette', position: 'bottom-start', // override:
open below instead of to the right offset: [0, 4], // override: custom offset for this item
showChevron: false, // hide the chevron arrow for this item children: [ { label: 'Light', value:
'light' }, { label: 'Dark', value: 'dark' }, ], }, { label: 'Language', // uses global
nestedPosition / nestedOffset / showChevron defaults children: [ { label: 'English', value: 'en' },
{ label: 'French', value: 'fr' }, ], }, ]"
```

---

### v-model Binding

```vue
<Dropdown v-model="selectedUser" :options="users" searchable>
  <template #trigger="{ selectedLabel }">
    <Button variant="outline">
      {{ selectedLabel || 'Select User' }}
    </Button>
  </template>
</Dropdown>
```

---

### Custom Item Slot

Render each option with a custom template using the `#item` slot.

```vue
<Dropdown v-model="selectedUser" :options="users">
  <template #trigger="{ selectedLabel }">
    <Button variant="outline">
      {{ selectedLabel || 'Select User' }}
    </Button>
  </template>

  <template #item="{ option }">
    <div class="flex items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
      <Avatar :src="option.data?.avatar" size="xs" />
      <div class="flex flex-col">
        <span class="font-medium">{{ option.label }}</span>
        <span class="text-xs text-muted-foreground">{{ option.description }}</span>
      </div>
    </div>
  </template>
</Dropdown>
```

---

### Rich Options (Icon, Emoji, Subtitle, Description)

```vue
<Dropdown
  v-model="selected"
  :options="[
    {
      value: 'vue',
      label: 'Vue.js',
      subtitle: 'v3.x',
      description: 'Progressive JavaScript Framework',
      icon: 'logos:vue',
    },
    {
      value: 'react',
      label: 'React',
      subtitle: 'v18',
      description: 'A JS library for building UIs',
      emoji: '⚛️',
    },
  ]">
  <template #trigger="{ selectedLabel }">
    <Button variant="outline">{{ selectedLabel || 'Choose Framework' }}</Button>
  </template>
</Dropdown>
```

---

### Scrollable (Many Options)

The search input automatically appears when there are more than 9 options.

```vue
<Dropdown
  :options="Array.from({ length: 20 }, (_, i) => ({ value: `${i}`, label: `Option ${i + 1}` }))"
  v-model="selected">
  <template #trigger>
    <Button variant="outline" icon-right="lucide:chevron-down">Long List</Button>
  </template>
</Dropdown>
```

---

### Button Variants

The `#trigger` slot accepts any Button variant.

```vue
<Dropdown :options="options" v-model="val">
  <template #trigger>
    <Button variant="outline" size="sm" icon-right="lucide:chevron-down">Outline</Button>
  </template>
</Dropdown>

<Dropdown :options="options" v-model="val">
  <template #trigger>
    <Button variant="primary" icon-right="lucide:chevron-down">Primary</Button>
  </template>
</Dropdown>

<Dropdown :options="options" v-model="val">
  <template #trigger>
    <Button variant="ghost" icon-right="lucide:chevron-down">Ghost</Button>
  </template>
</Dropdown>
```

---

### Nested (Children)

Options with a `children` array render as a sub-dropdown triggered on hover/click.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Dropdown } from 'vlite3'

const selected = ref(null)
</script>

<template>
  <Dropdown
    v-model="selected"
    :options="[
      {
        label: 'Appearance',
        icon: 'lucide:palette',
        children: [
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
          { label: 'System', value: 'system' },
        ],
      },
      { label: 'Settings', value: 'settings', icon: 'lucide:settings' },
    ]">
    <template #trigger="{ selectedLabel }">
      <Button variant="outline">{{ selectedLabel || 'Options' }}</Button>
    </template>
  </Dropdown>
</template>
```

---

### Recursive / Keyed Object Selection

Use `key` on options to map selections into a structured object. Nested dropdowns merge into the parent `v-model` object using deep merge logic.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Dropdown } from 'vlite3'

// v-model will be shaped as: { theme: 'dark', language: 'en' }
const config = ref({})
</script>

<template>
  <Dropdown
    v-model="config"
    :options="[
      {
        label: 'Theme',
        key: 'theme',
        children: [
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
        ],
      },
      {
        label: 'Language',
        key: 'language',
        children: [
          { label: 'English', value: 'en' },
          { label: 'French', value: 'fr' },
        ],
      },
    ]">
    <template #trigger>
      <Button variant="outline">Configure</Button>
    </template>
  </Dropdown>
</template>
```

---

### Boolean Toggle Items

Set `data.isBoolean = true` on an option to render a `Switch` toggle instead of a selectable item.
Requires a `key` field. The `v-model` object will have that key set to `true`/`false`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Dropdown } from 'vlite3'

const settings = ref({ notifications: true, darkMode: false })
</script>

<template>
  <Dropdown
    v-model="settings"
    :options="[
      { label: 'Notifications', key: 'notifications', value: true, data: { isBoolean: true } },
      { label: 'Dark Mode', key: 'darkMode', value: false, data: { isBoolean: true } },
    ]">
    <template #trigger>
      <Button variant="outline">Settings</Button>
    </template>
  </Dropdown>
</template>
```

---

### Separators

Insert a horizontal divider by using `label: '---'`.

```vue
:options="[ { value: 'profile', label: 'Profile' }, { value: 'settings', label: 'Settings' }, {
label: '---' }, { value: 'logout', label: 'Logout' }, ]"
```

---

### Double Confirmation

Wrap any selection in a confirmation modal using `doubleConfirmation` (global) or per-option `confirmation`.

```vue
<Dropdown v-model="val" :options="options" :double-confirmation="true">
  <template #trigger>
    <Button variant="outline">Select with confirm</Button>
  </template>
</Dropdown>

:options="[ { value: 'delete', label: 'Delete Account', confirmation: { title: 'Delete Account?',
description: 'This action cannot be undone.', confirmText: 'Delete', cancelText: 'Cancel', variant:
'danger', }, }, { value: 'edit', label: 'Edit Profile' }, ]"
```

---

### RTL Direction

Set `direction="rtl"` to flip layout, chevrons, and dropdown position for right-to-left languages.

```vue
<Dropdown v-model="val" :options="options" direction="rtl">
  <template #trigger="{ selectedLabel }">
    <Button variant="outline">{{ selectedLabel || 'اختر' }}</Button>
  </template>
</Dropdown>
```

---

### Grouped Layout (Mega Menu)

Use `layout="grouped"` with options containing `children` to render a multi-column grid menu.
Control columns with the `columns` prop (number or CSS grid string).

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Dropdown } from 'vlite3'

const selected = ref(null)
</script>

<template>
  <Dropdown
    v-model="selected"
    layout="grouped"
    :columns="3"
    position="bottom-start"
    :options="[
      {
        label: 'Frontend',
        icon: 'lucide:monitor',
        children: [
          { label: 'Vue', value: 'vue' },
          { label: 'React', value: 'react' },
          { label: 'Svelte', value: 'svelte' },
        ],
      },
      {
        label: 'Backend',
        icon: 'lucide:server',
        children: [
          { label: 'Node.js', value: 'node' },
          { label: 'Django', value: 'django' },
        ],
      },
      {
        label: 'Database',
        icon: 'lucide:database',
        children: [
          { label: 'PostgreSQL', value: 'pg' },
          { label: 'MongoDB', value: 'mongo' },
        ],
      },
    ]">
    <template #trigger>
      <Button variant="outline" icon-right="lucide:chevron-down">Tech Stack</Button>
    </template>
  </Dropdown>
</template>
```

---

### Pagination (Load More)

Use `hasMore` and listen to `@load-more` to implement infinite scroll pagination.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Dropdown } from 'vlite3'

const selected = ref(null)
const options = ref(Array.from({ length: 15 }, (_, i) => ({ value: i, label: `Item ${i + 1}` })))
const hasMore = ref(true)
const loading = ref(false)
let page = 1

const loadMore = async () => {
  if (loading.value) return
  loading.value = true
  await new Promise((r) => setTimeout(r, 800))
  const next = Array.from({ length: 10 }, (_, i) => {
    const n = page * 10 + i + 6
    return { value: n, label: `Item ${n}` }
  })
  options.value.push(...next)
  page++
  if (page >= 4) hasMore.value = false
  loading.value = false
}
</script>

<template>
  <Dropdown
    v-model="selected"
    :options="options"
    :has-more="hasMore"
    :loading="loading"
    @load-more="loadMore">
    <template #trigger="{ selectedLabel }">
      <Button variant="outline">{{ selectedLabel || 'Load More Demo' }}</Button>
    </template>
  </Dropdown>
</template>
```

---

### Remote Search

Set `remote` to disable client-side filtering. The `@search` event is debounced (default 300ms) and fires when the user types. Push new results into `:options` on each search.

Use `fetchSelected` to hydrate labels for already-selected values that may not be in the current result set (e.g. after page reload).

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Dropdown } from 'vlite3'
import type { IDropdownOption } from 'vlite3'

const selected = ref(null)
const options = ref<IDropdownOption[]>([])
const loading = ref(false)

const onSearch = async (query: string) => {
  loading.value = true
  await new Promise((r) => setTimeout(r, 400))
  options.value = [
    { value: 1, label: `Result for "${query}" #1` },
    { value: 2, label: `Result for "${query}" #2` },
    { value: 3, label: `Result for "${query}" #3` },
  ]
  loading.value = false
}

const fetchSelected = async (ids: any[]): Promise<IDropdownOption[]> => {
  return ids.map((id) => ({ value: id, label: `User #${id}` }))
}
</script>

<template>
  <Dropdown
    v-model="selected"
    :options="options"
    :loading="loading"
    remote
    searchable
    :fetch-selected="fetchSelected"
    @search="onSearch">
    <template #trigger="{ selectedLabel }">
      <Button variant="outline">{{ selectedLabel || 'Search users...' }}</Button>
    </template>
  </Dropdown>
</template>
```

---

### Sticky Header / Footer Slots

Use `#header` and `#footer` slots to render persistent content above and below the scrollable list.

```vue
<Dropdown v-model="selected" :options="options">
  <template #trigger>
    <Button variant="outline">With Header & Footer</Button>
  </template>

  <template #header>
    <div class="px-3 py-2 border-b text-xs font-semibold text-muted-foreground uppercase tracking-wide">
      Recent
    </div>
  </template>

  <template #footer>
    <div class="border-t px-3 py-2">
      <Button variant="ghost" size="sm" class="w-full">+ Add new</Button>
    </div>
  </template>
</Dropdown>
```

---

### Plain String / Number Options

The `options` prop also accepts plain string or number arrays — they are normalized automatically.

```vue
<Dropdown v-model="lang" :options="['English', 'French', 'Arabic']">
  <template #trigger="{ selectedLabel }">
    <Button variant="outline">{{ selectedLabel || 'Language' }}</Button>
  </template>
</Dropdown>
```

---

## Keyboard Navigation

| Key         | Action                        |
| ----------- | ----------------------------- |
| `ArrowDown` | Move focus to next option     |
| `ArrowUp`   | Move focus to previous option |
| `Enter`     | Select focused option         |
| `Escape`    | Close dropdown                |

Mouse movement exits keyboard mode and restores hover highlight.

---

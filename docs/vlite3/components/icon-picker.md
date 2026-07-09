# IconPicker

**Import:** `import { IconPicker } from 'vlite3'`

The picker follows the icon mode configured by `createVLite()`:

- Online mode preserves the existing remote Iconify catalogue search.
- Hybrid mode shows registered local icons initially and permits remote search.
- Offline mode never mounts the remote-search picker. It searches, paginates,
  and renders only icons returned by `listVLiteIcons()`.

When no local data is registered, the offline picker displays a clear empty
state. A selected locally registered identifier continues to render after a
refresh without network access.

### Props

| Prop              | Type                | Default                 | Description                         |
| :---------------- | :------------------ | :---------------------- | :---------------------------------- |
| `value`           | `string`            | `'tabler:icons-filled'` | Selected icon name                  |
| `position`        | `TooltTipPlacement` | `'bottom'`              | Picker dropdown position            |
| `btnProps`        | `ButtonProps`       | —                       | Props to pass to the trigger button |
| `placeholder`     | `string`            | —                       | Placeholder for the search input    |
| `placeholderI18n` | `string`            | —                       | I18n key for the placeholder        |

### Events

- `@onSelect`: Emitted when an icon is selected (`value`, `svg`)
- `@onTrigger`: Emitted when the trigger button is clicked
- `@onClose`: Emitted when the picker closes

### Slots

| Slot       | Description                 | Props       |
| :--------- | :-------------------------- | :---------- |
| `default`  | Custom trigger element      | —           |
| `menu-top` | Content above the icon grid | `{ close }` |

### Usage

#### Basic Usage

```vue
<IconPicker :value="selectedIcon" @on-select="(val) => (selectedIcon = val)" />

<Icon :icon="selectedIcon" />
```

#### Custom Trigger

```vue
<IconPicker v-model="icon">
  <Button variant="ghost">Select Icon</Button>
</IconPicker>
```

For strict offline setup, selected-icon extraction, dynamic identifiers, and
complete collection bundling, see [Icon](./icon.md).

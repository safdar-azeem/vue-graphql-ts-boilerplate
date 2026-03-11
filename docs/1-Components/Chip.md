# Chip

**Import:** `import { Chip } from 'vlite3'`

### Props

| Prop        | Type                             | Default  | Description                                      |
| :---------- | :------------------------------- | :------- | :----------------------------------------------- |
| `variant`   | `ChipVariant \| string`          | `subtle` | Visual style of the chip                         |
| `size`      | `'small' \| 'medium' \| 'large'` | `medium` | Dimensions of the chip                           |
| `text`      | `string`                         | `''`     | Label text rendered inside the chip              |
| `textI18n`  | `string`                         | —        | i18n translation key for the label text          |
| `icon`      | `string`                         | —        | Leading icon (Iconify icon ID or image URL)      |
| `clickable` | `boolean`                        | `false`  | Enable click interaction styles and click event  |
| `deletable` | `boolean`                        | `false`  | Show a delete (×) button and emit delete event   |
| `disabled`  | `boolean`                        | `false`  | Disable all interactions and apply muted styling |
| `class`     | `string`                         | `''`     | Additional CSS classes applied to the root       |

### Slots

| Slot   | Description                                                                         |
| :----- | :---------------------------------------------------------------------------------- |
| `icon` | Override the default icon area (rendered before the text)                           |
| `default` | Override the label content (rendered inside the text `<span>`)                  |

### Events

| Event     | Payload      | Condition                | Description                             |
| :-------- | :----------- | :----------------------- | :-------------------------------------- |
| `click`   | `MouseEvent` | Requires `clickable`     | Fired when the chip is clicked          |
| `delete`  | `MouseEvent` | Requires `deletable`     | Fired when the delete button is clicked |

### Keyboard Support

| Key                   | Action                                            |
| :-------------------- | :------------------------------------------------ |
| `Enter` / `Space`     | Triggers `click` event when `clickable` is `true` |
| `Backspace` / `Delete`| Triggers `delete` event when `deletable` is `true`|

### Types
```ts
type ChipVariant =
  | 'solid'
  | 'outline'
  | 'ghost'
  | 'subtle'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'purple'
  | 'teal'
  | 'indigo'
  | 'orange'
  | 'pink'
  | 'cyan'
```

### Variants

| Value       | Description                                                        |
| :---------- | :----------------------------------------------------------------- |
| `solid`     | Filled primary background with primary foreground text             |
| `outline`   | Transparent background with visible border                         |
| `ghost`     | No border, no background — muted foreground text                   |
| `subtle`    | Light accent background, no border (default)                       |
| `secondary` | Secondary semantic color (subtle background + border)              |
| `success`   | Green semantic color                                               |
| `warning`   | Amber/yellow semantic color                                        |
| `danger`    | Red semantic color                                                 |
| `info`      | Blue semantic color                                                |
| `purple`    | Purple extended semantic color                                     |
| `teal`      | Teal extended semantic color                                       |
| `indigo`    | Indigo extended semantic color                                     |
| `orange`    | Orange extended semantic color                                     |
| `pink`      | Pink extended semantic color                                       |
| `cyan`      | Cyan extended semantic color                                       |

> The `variant` prop also accepts any `string` to support dynamic or custom extended themes.

### Usage
```vue
<!-- Basic -->
<Chip text="Vue" variant="subtle" />

<!-- Semantic colors -->
<Chip text="Active" variant="success" icon="lucide:check" />
<Chip text="Failed" variant="danger" icon="lucide:x-circle" />

<!-- Sizes -->
<Chip text="Small" size="small" />
<Chip text="Large" size="large" />

<!-- Clickable -->
<Chip text="Filter" variant="outline" clickable @click="onSelect" />

<!-- Deletable -->
<Chip text="Tag" variant="secondary" deletable @delete="onRemove" />

<!-- Clickable + Deletable -->
<Chip text="Mixed" clickable deletable @click="onSelect" @delete="onRemove" />

<!-- Disabled -->
<Chip text="Inactive" disabled />

<!-- Icon only -->
<Chip icon="lucide:bell" variant="outline" />

<!-- Custom slot content -->
<Chip variant="subtle">
  <template #icon>
    <img src="/avatar.png" class="w-3.5 h-3.5 rounded-full" />
  </template>
  Jane Doe
</Chip>
```


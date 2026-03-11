# Tabes

**Import:** `import { Tabes } from 'vlite3'`

### Props

| Prop         | Type               | Default   | Description           |
| :----------- | :----------------- | :-------- | :-------------------- |
| `modelValue` | `string \| number` | —         | Binding (`v-model`)   |
| `options`    | `TabesOption[]`    | required  | Array of tabs         |
| `size`       | `TabesSize`        | `md`      | Dimensions            |
| `variant`    | `TabesVariant`     | `surface` | Visual style          |
| `block`      | `boolean`          | `false`   | Full width            |
| `textClass`  | `string`           | —         | Custom class for text |

### Types

```ts
export interface TabesOption {
  label: string
  labelI18n?: string
  value: string | number
  icon?: string
  disabled?: boolean
}

export type TabesSize = 'sm' | 'md' | 'lg'

export type TabesVariant =
  | 'surface'
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'outline'
  | 'line'
```

### Events

- `@update:modelValue`: Emitted on tab selection (v-model binding)
- `@change`: Emitted when tab selection changes

### Usage

```vue
<Tabes
  v-model="currentTab"
  :options="[
    { label: 'Home', value: 'home' },
    { label: 'Profile', value: 'profile' },
  ]"
  variant="line"
  block />
```

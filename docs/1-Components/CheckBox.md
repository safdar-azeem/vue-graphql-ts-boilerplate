# CheckBox

**Import:** `import { CheckBox } from 'vlite3'`

### Props

| Prop            | Type              | Default | Description                            |
| --------------- | ----------------- | ------- | -------------------------------------- |
| `modelValue`    | `boolean`         | `false` | Binding (`v-model`)                    |
| `checked`       | `boolean`         | `false` | Binding (`v-model:checked`)            |
| `label`         | `string`          | —       | Side label text                        |
| `labelI18n`     | `string`          | —       | I18n translation key for label         |
| `indeterminate` | `boolean`         | `false` | Mixed state visually                   |
| `disabled`      | `boolean`         | `false` | Disable input                          |
| `size`          | `CheckboxSize`    | `md`    | Dimensions                             |
| `rounded`       | `CheckboxRounded` | —       | Corner radius (defaults to size style) |
| `id`            | `string`          | —       | ID for the checkbox element            |
| `class`         | `string`          | —       | Custom CSS classes                     |

### Types

```ts
type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type CheckboxRounded = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
```

### Usage

```vue
<CheckBox v-model:checked="isAgreed" label="I accept terms" />
```

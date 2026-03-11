# Switch

**Import:** `import { Switch } from 'vlite3'`

### Props

| Prop         | Type      | Default | Description         |
| ------------ | --------- | ------- | ------------------- |
| `modelValue` | `boolean` | `false` | Binding (`v-model`) |
| `label`      | `string`  | —       | Side label text     |
| `labelI18n`  | `string`  | —       | I18n key for label  |
| `class`      | `string`  | —       | Custom class        |
| `disabled`   | `boolean` | `false` | Disable toggle      |

### Events

- `@update:modelValue`: Emitted when toggled

### Usage

```vue
<Switch v-model="isEnabled" label="Airplane Mode" />
```

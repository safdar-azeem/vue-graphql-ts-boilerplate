# Textarea

**Import:** `import { Textarea } from 'vlite3'`

### Props

| Prop              | Type      | Default | Description              |
| :---------------- | :-------- | :------ | :----------------------- |
| `modelValue`      | `string`  | `''`    | Binding (`v-model`)      |
| `rows`            | `number`  | `3`     | Default visible rows     |
| `placeholder`     | `string`  | —       | Placeholder text         |
| `placeholderI18n` | `string`  | —       | I18n key for placeholder |
| `class`           | `string`  | —       | Custom CSS classes       |
| `disabled`        | `boolean` | `false` | Disable input            |
| `dir`             | `'ltr' \| 'rtl'` | page dir | Text / placeholder direction |

### Events

- `@update:modelValue`
- `@focus`
- `@blur`

### Usage

```vue
<Textarea v-model="message" placeholder="Leave a comment..." :rows="5" />
```

#### RTL

Placeholder and typed text follow `document.documentElement.dir` (or an explicit `dir` prop). When used as `Input type="textarea"`, the same nested field-dir rules as Input apply.

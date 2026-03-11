# Button

**Import:** `import { Button } from 'vlite3'`

### Props

| Prop             | Type                        | Default   | Description                         |
| :--------------- | :-------------------------- | :-------- | :---------------------------------- |
| `variant`        | `ButtonVariant`             | `primary` | Visual style                        |
| `size`           | `ButtonSize`                | `md`      | Dimensions                          |
| `rounded`        | `ButtonRounded`             | `md`      | Border radius                       |
| `icon`           | `string`                    | —         | Left icon (Iconify ID or Image URL) |
| `iconRight`      | `string`                    | —         | Right icon (Iconify ID)             |
| `text`           | `string`                    | —         | Label text (alt to slot)            |
| `textI18n`       | `string`                    | —         | I18n translation key for text       |
| `type`           | `button \| submit \| reset` | `button`  | Native type                         |
| `loading`        | `boolean`                   | `false`   | Show spinner                        |
| `disabled`       | `boolean`                   | `false`   | Disable interaction                 |
| `asIcon`         | `boolean`                   | `false`   | Force render as icon button         |
| `textClass`      | `string`                    | —         | Custom class for text span          |
| `iconClass`      | `string`                    | —         | Custom class for left icon          |
| `iconRightClass` | `string`                    | —         | Custom class for right icon         |
| `class`          | `any`                       | —         | Custom class for button router/root |

### Types

```ts
type ButtonVariant =
  | 'primary'
  | 'primary-light'
  | 'secondary'
  | 'danger'
  | 'danger-light'
  | 'warning'
  | 'warning-light'
  | 'info'
  | 'info-light'
  | 'success'
  | 'success-light'
  | 'outline'
  | 'outline-primary'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-info'
  | 'outline-success'
  | 'ghost'
  | 'link'
type ButtonSize = 'xs' | 'sm' | 'sm2' | 'md' | 'lg' | 'xl'
type ButtonRounded = 'none' | 'sm' | 'sm2' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
```

### Usage

```vue
<Button variant="primary" icon="lucide:plus">Add Item</Button>
<Button variant="ghost" loading />
```

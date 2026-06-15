# Alert

**Import:** `import { Alert } from 'vlite3'`

### Props

| Prop              | Type                            | Default   | Description                          |
| :---------------- | :------------------------------ | :-------- | :----------------------------------- |
| `title`           | `string`                        | —         | Alert title                          |
| `titleI18n`       | `string`                        | —         | I18n translation key for title       |
| `description`     | `string`                        | —         | Alert description                    |
| `descriptionI18n` | `string`                        | —         | I18n key for description             |
| `icon`            | `string`                        | —         | Custom icon (overrides variant icon) |
| `variant`         | `AlertVariant`                  | `primary` | Visual style theme                   |
| `closable`        | `boolean`                       | `false`   | Show close button                    |
| `role`            | `'alert' \| 'status' \| 'none'` | —         | ARIA role                            |
| `class`           | `string`                        | —         | Custom classes                       |

### Types

```ts
export type AlertVariant = 'primary' | 'success' | 'warning' | 'danger'
```

### Usage

```vue
<Alert
  title="Payment Success"
  description="Your transaction has been processed."
  variant="success"
  closable
  @close="onClose" />
```

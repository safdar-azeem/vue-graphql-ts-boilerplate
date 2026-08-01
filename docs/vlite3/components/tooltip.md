# Tooltip

**Import:** `import { Tooltip } from 'vlite3'`

### Props

| Prop           | Type                                     | Default | Description          |
| :------------- | :--------------------------------------- | :------ | :------------------- |
| `content`      | `string`                                 | —       | Tooltip text         |
| `contentI18n`  | `string`                                 | —       | I18n key for text    |
| `placement`    | `'top' \| 'bottom' \| 'left' \| 'right'` | `top`   | Position             |
| `class`        | `string`                                 | —       | Custom wrapper class |
| `className`    | `string`                                 | —       | Tooltip popup class  |
| `teleport`     | `boolean`                                | `true`  | Teleport to body     |
| `arrow`        | `boolean`                                | `true`  | Show tooltip arrow   |
| `contentClass` | `string`                                 | `...`   | Class for content    |
| `triggerClass` | `string`                                 | —       | Class for trigger    |
| `disabled`     | `boolean`                                | `false` | Disable tooltip      |

### Slots

- `default`: Trigger element
- `content`: Custom HTML content (overrides `content` prop)

### Usage

```vue
<Tooltip content="Edit item">
  <Button icon="lucide:edit" />
</Tooltip>
```

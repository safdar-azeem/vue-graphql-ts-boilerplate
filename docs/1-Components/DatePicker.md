# DatePicker

**Import:** `import { DatePicker } from 'vlite3'`

### Props

| Prop              | Type                                | Default           | Description                     |
| :---------------- | :---------------------------------- | :---------------- | :------------------------------ |
| `modelValue`      | `any`                               | —                 | Binding (`v-model`)             |
| `mode`            | `'date' \| 'dateTime' \| 'time'`    | `date`            | Selection mode                  |
| `minDate`         | `string`                            | —                 | Minimum allowed date            |
| `maxDate`         | `string`                            | —                 | Maximum allowed date            |
| `disabledDates`   | `{ start: string, end?: string }[]` | —                 | Dates to disable                |
| `placeholder`     | `string`                            | —                 | Input placeholder               |
| `placeholderI18n` | `string`                            | —                 | I18n translation key            |
| `icon`            | `string`                            | `lucide:calendar` | Trigger icon                    |
| `size`            | `ButtonSize`                        | `md`              | Trigger button size             |
| `variant`         | `ButtonVariant`                     | `outline`         | Trigger button style            |
| `btnProps`        | `any`                               | —                 | Extra props for Dropdown button |
| `teleport`        | `boolean`                           | `true`            | Teleport dropdown to body       |
| `minuteInterval`  | `number`                            | `5`               | Minute step for time            |
| `timeFormat`      | `'12h' \| '24h'`                    | `'12h'`           | Time formatting                 |
| `disabled`        | `boolean`                           | `false`           | Disable picker                  |
| `readonly`        | `boolean`                           | `false`           | Readonly mode                   |

### Usage

```vue
<DatePicker v-model="date" mode="dateTime" :min-date="new Date().toISOString()" variant="ghost" />
```

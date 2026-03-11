# DateRangePicker

**Import:** `import { DateRangePicker } from 'vlite3'`

### Props

| Prop               | Type                               | Default         | Description                                     |
| :----------------- | :--------------------------------- | :-------------- | :---------------------------------------------- |
| `modelValue`       | `{ start: any, end: any }`         | `{}`            | Binding (`v-model`) for the date range          |
| `placeholderStart` | `string`                           | `'Start Date'`  | Input placeholder for start date                |
| `placeholderEnd`   | `string`                           | `'End Date'`    | Input placeholder for end date                  |
| `minDate`          | `string`                           | —               | Minimum allowed date overall                    |
| `maxDate`          | `string`                           | —               | Maximum allowed date overall                    |
| `disabled`         | `boolean`                          | `false`         | Disable the entire range picker                 |
| `readonly`         | `boolean`                          | `false`         | Readonly mode                                   |
| `size`             | `ButtonSize`                       | `md`            | Trigger button size                             |
| `variant`          | `ButtonVariant`                    | `outline`       | Trigger button style                            |
| `showQuickRanges`  | `boolean`                          | `true`          | Toggle the quick selection dropdown visibility  |

### Usage

```vue
<DateRangePicker v-model="dateRange" />
```

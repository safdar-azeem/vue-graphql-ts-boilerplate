# DatePicker

**Import:** `import { DatePicker } from 'vlite3'`

### Props

| Prop              | Type                                                   | Default           | Description                     |
| :---------------- | :----------------------------------------------------- | :---------------- | :------------------------------ |
| `modelValue`      | `any`                                                  | —                 | Binding (`v-model`)             |
| `mode`            | `'date' \| 'dateTime' \| 'time' \| 'week' \| 'month'` | `date`            | Selection mode                  |
| `minDate`         | `string`                                               | —                 | Minimum allowed date            |
| `maxDate`         | `string`                                               | —                 | Maximum allowed date            |
| `disabledDates`   | `{ start: string, end?: string }[]`                    | —                 | Dates to disable                |
| `placeholder`     | `string`                                               | —                 | Input placeholder               |
| `placeholderI18n` | `string`                                               | —                 | I18n translation key            |
| `icon`            | `string`                                               | `lucide:calendar` | Trigger icon                    |
| `size`            | `ButtonSize`                                           | `md`              | Trigger button size             |
| `variant`         | `ButtonVariant`                                        | `outline`         | Trigger button style            |
| `btnProps`        | `any`                                                  | —                 | Extra props for Dropdown button |
| `teleport`        | `boolean`                                              | `true`            | Teleport dropdown to body       |
| `minuteInterval`  | `number`                                               | `5`               | Minute step for time            |
| `timeFormat`      | `'12h' \| '24h'`                                       | `'12h'`           | Time formatting                 |
| `disabled`        | `boolean`                                              | `false`           | Disable picker                  |
| `readonly`        | `boolean`                                              | `false`           | Readonly mode                   |

### Return Value by Mode

| Mode       | `v-model` type                          | Description                                              |
| :--------- | :-------------------------------------- | :------------------------------------------------------- |
| `date`     | `Date`                                  | The selected date                                        |
| `dateTime` | `Date`                                  | The selected date and time                               |
| `time`     | `string`                                | The selected time string (e.g. `'14:30'`)                |
| `month`    | `Date`                                  | The first day of the selected month                      |
| `week`     | `{ start: Date, end: Date }`            | Both the first and last date of the selected week        |

### Week Mode

When `mode="week"` is used, the picker returns an object containing both the **start** (Monday/first day) and **end** (Sunday/last day) of the selected week. The trigger button displays the full range (e.g. `Jan 1, 2025 - Jan 7, 2025`).
```vue
<script setup>
import { ref } from 'vue'
const weekRange = ref(null)
</script>

<template>
  <DatePicker v-model="weekRange" mode="week" placeholder="Select week" />
  <!-- weekRange => { start: Date, end: Date } -->
</template>
```

### Usage
```vue
<DatePicker v-model="date" mode="dateTime" :min-date="new Date().toISOString()" variant="ghost" />
```

### RTL

Date modes use `Dropdown` with `direction="auto"`, so under `html[dir=rtl]` the trigger icon and value start on the **inline-start** (right) side and the panel opens from `bottom-end`. Time mode inherits document direction via its trigger button (no Dropdown wrapper).

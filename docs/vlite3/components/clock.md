# Clock

**Import:** `import { Clock } from 'vlite3'`

A live, auto-updating clock component powered by `dayjs`. Displays the current time and date with
a clean, minimal layout. Every aspect — format, visibility, and styling — is fully controllable
through props. The `tickInterval` prop is **reactive**: changing it at runtime will immediately
restart the internal timer with the new interval.

---

## Props

| Prop           | Type      | Default                 | Description                                                             |
| :------------- | :-------- | :---------------------- | :---------------------------------------------------------------------- |
| `timeFormat`   | `string`  | `'hh:mm:ss A'`          | `dayjs`-compatible format string for the time portion                   |
| `dateFormat`   | `string`  | `'dddd, MMMM D, YYYY'`  | `dayjs`-compatible format string for the date portion                   |
| `showTime`     | `boolean` | `true`                  | Whether to render the time heading                                      |
| `showDate`     | `boolean` | `true`                  | Whether to render the date paragraph                                    |
| `tickInterval` | `number`  | `1000`                  | ms between each tick. Reactive — changing it restarts the interval      |
| `timeClass`    | `string`  | `''`                    | Additional Tailwind/CSS classes applied to the time `<h2>` element      |
| `dateClass`    | `string`  | `''`                    | Additional Tailwind/CSS classes applied to the date `<p>` element       |
| `wrapperClass` | `string`  | `''`                    | Additional Tailwind/CSS classes applied to the root wrapper `<div>`     |

---

## Usage

### Default
```vue
<script setup lang="ts">
import { Clock } from 'vlite3'
</script>

<template>
  <Clock />
</template>
```

### Custom Formats
```vue
<template>
  <!-- 24-hour time, European date -->
  <Clock time-format="HH:mm:ss" date-format="DD/MM/YYYY" />
</template>
```

### Show Time Only
```vue
<template>
  <Clock :show-date="false" />
</template>
```

### Custom Styling
```vue
<template>
  <Clock
    time-class="text-primary text-5xl font-bold"
    date-class="text-primary/60 text-base font-medium mt-2" />
</template>
```

### Slower Refresh (reactive interval)
```vue
<template>
  <!-- Refresh every 5 seconds — interval restarts immediately if the prop changes -->
  <Clock :tick-interval="5000" time-format="hh:mm A" />
</template>
```

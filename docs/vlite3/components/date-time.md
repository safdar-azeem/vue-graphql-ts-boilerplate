# DateTime

**Import:** `import { DateTime } from 'vlite3'`

A reactive utility component to consistently format date and time values. Powered by `dayjs` under the hood, ensuring it is lightweight, beautiful, and fully accurate.

The component inherits its formatting rules from the global `vlite3` configuration, but can be overridden locally on a per-component basis. It also intelligently parses bare time strings (e.g., `"09:00"`, `"17:00"`) and formats them nicely.

---

## Props

| Prop     | Type                       | Default | Description                                                                                                                         |
| :------- | :------------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------- |
| `value`  | `string \| number \| Date` | —       | The date or time value to format. Supports ISO strings, UNIX timestamps, native `Date` objects, and time strings (e.g., `'14:30'`). |
| `format` | `string`                   | —       | Local override for the output format string (e.g., `'MM/DD/YYYY'`, `'YYYY-MM-DD'`, `'h:mm A'`).                                     |

---

## Usage

### Basic Local Usage

Pass any valid date object, string, or timestamp. By default, it will use `'MM/DD/YYYY'` unless globally configured otherwise.

```vue
<script setup lang="ts">
import { DateTime } from 'vlite3'
</script>

<template>
  <DateTime :value="'2026-03-12T05:07:48.000Z'" />
  <DateTime :value="1710214068000" format="YYYY-MMM-DD" />
</template>
```

### Time String Formatting

The component automatically handles raw time strings and formats them. By default, time strings use the `'h:mm A'` format (e.g., `"17:00"` -> `"5:00 PM"`).

```vue
<template>
  <DateTime :value="'09:00'" />
  <DateTime :value="'17:00'" />
  <DateTime :value="'17:00'" format="HH:mm" />
</template>
```

---

## Global Configuration

You can set a default date format for your entire application during plugin initialization.

```ts
// main.ts
import { createApp } from 'vue'
import { createVLite } from 'vlite3'
import App from './App.vue'

const app = createApp(App)

const vlite = createVLite({
  components: {
    datetime: {
      format: 'DD/MM/YYYY', // Set default format to European standard
    },
  },
})

app.use(vlite)
app.mount('#app')
```

---

## Dynamic Global Updates (Change From Anywhere)

If your application allows users to switch their preferred region/locale formats on the fly, you can dynamically update the global configuration using the `updateConfig` utility.

This will automatically trigger an instant re-render across your application, ensuring `<DateTime />` components, `List` grids, and `DataTable` columns update without refreshing the page.

```vue
<script setup lang="ts">
import { updateConfig } from 'vlite3'

const switchFormat = (newFormat: string) => {
  updateConfig({
    components: {
      datetime: {
        format: newFormat,
      },
    },
  })
}
</script>

<template>
  <div class="flex gap-2">
    <button @click="switchFormat('MM/DD/YYYY')">US format</button>
    <button @click="switchFormat('DD/MM/YYYY')">EU format</button>
  </div>
</template>
```

# Price

**Import:** `import { Price } from 'vlite3'`

A reactive utility component to render properly formatted currency values. It automatically formats numbers based on the standard `Intl.NumberFormat` API. 

The component inherits its currency settings from the global `vlite3` configuration, but can be overridden locally on a per-component basis.

---

## Props

| Prop       | Type               | Default | Description                                                                 |
| :--------- | :----------------- | :------ | :-------------------------------------------------------------------------- |
| `value`    | `number \| string` | `0`     | The numeric value to format. Strings are automatically parsed to numbers.   |
| `currency` | `string`           | —       | Local override for the currency code (e.g., `'EUR'`, `'GBP'`, `'JPY'`).     |
| `numberFormat`   | `string`           | `'standard'` | How the number is formatted. Set to `'compact'` to use abbreviations (e.g., 1K, 1M). |
| `compactThreshold` | `number`           | `1000`  | The value at which numbers start to be compacted. Numbers below this remain standard. |

---

## Usage

### Basic Local Usage

Pass a numeric or string value. By default, it will use `'USD'` unless globally configured otherwise.

```vue
<script setup lang="ts">
import { Price } from 'vlite3'
</script>

<template>
  <Price :value="1234.56" /> 
  <Price :value="2500" currency="EUR" /> 
  <Price :value="1000000" numberFormat="compact" /> <!-- Renders as $1M -->
  <Price :value="9500" numberFormat="compact" :compactThreshold="10000" /> <!-- Below threshold, renders $9,500 -->
  <Price :value="15000" numberFormat="compact" :compactThreshold="10000" /> <!-- Above threshold, renders $15K -->
  </template>

```

---

## Global Configuration

You can set a default currency for your entire application during plugin initialization. This is useful if your application primarily operates in a specific region.

```ts
// main.ts
import { createApp } from 'vue'
import { createVLite } from 'vlite3'
import App from './App.vue'

const app = createApp(App)

const vlite = createVLite({
  components: {
    price: {
      currency: 'GBP', // Set default currency to British Pound
      numberFormat: 'standard', // Set default format to standard
      compactThreshold: 1000,   // Sets default compaction threshold
    },
  },
})

app.use(vlite)
app.mount('#app')

```

---

## Dynamic Global Updates (Change From Anywhere)

If your application allows users to switch their preferred currency on the fly (e.g., from a settings menu or navbar), you can dynamically update the global configuration using the `updateConfig` utility.

Because the configuration state is fully reactive, **all** `<Price />` components across your application will instantly re-render with the newly selected currency.

```vue
<script setup lang="ts">
import { updateConfig } from 'vlite3'

const switchCurrency = (newCurrency: string) => {
  // This will dynamically update the global config and trigger a re-render 
  // for all Price components globally without refreshing the page.
  updateConfig({
    components: {
      price: {
        currency: newCurrency
      }
    }
  })
}
</script>

<template>
  <div class="flex gap-2">
    <button @click="switchCurrency('USD')">USD</button>
    <button @click="switchCurrency('EUR')">EUR</button>
    <button @click="switchCurrency('GBP')">GBP</button>
  </div>
</template>

```


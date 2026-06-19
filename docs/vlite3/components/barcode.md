# Barcode

**Import:** `import { Barcode, barcodesConstants } from 'vlite3'`

### Description

A highly customizable and responsive component for rendering barcodes in multiple formats using `jsbarcode`. It automatically scales to fit inside its parent container while preserving its aspect ratio.

### Props

| Prop           | Type      | Default     | Description                      |
| :------------- | :-------- | :---------- | :------------------------------- |
| `value`        | `string`  | —           | The value to encode              |
| `format`       | `string`  | `'CODE128'` | Barcode format                   |
| `displayValue` | `boolean` | `true`      | Show the value below the barcode |
| `width`        | `number`  | `2`         | Width of a single bar            |
| `height`       | `number`  | `100`       | Height of the barcode            |
| `lineColor`    | `string`  | `'#000000'` | Color of the barcode bars        |
| `background`   | `string`  | `'#ffffff'` | Background color                 |
| `margin`       | `number`  | `10`        | Margin around the barcode        |

### Constants

You can import `barcodesConstants` for a convenient list of supported formats:

```ts
import { barcodesConstants } from 'vlite3'
```

Includes: `CODE128`, `CODE39`, `UPC`, `EAN13`, `ITF14`, `EAN8`, `EAN5`, `MSI`, `pharmacode`, `EAN2`

### Usage

```vue
<script setup>
import { Barcode } from 'vlite3'
</script>

<template>
  <Barcode value="vLite3-1234" format="CODE128" />
</template>
```

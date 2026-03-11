# QRCode

**Import:** `import { QRCode } from 'vlite3'`

### Description

A lightweight and responsive QR Code component powered by `@vueuse/integrations`. It can generate a QR code from a string value or safely display a pre-generated QR code image URL. It scales cleanly into any container sizes.

### Props

| Prop          | Type               | Default       | Description                                                               |
| :------------ | :----------------- | :------------ | :------------------------------------------------------------------------ |
| `value`       | `string`           | —             | The string value to encode into a QR code                                 |
| `imageUrl`    | `string`           | —             | A direct URL to an existing QR code image (overrides `value` if provided) |
| `size`        | `number \| string` | `200`         | Width/Height size of the container box                                    |
| `margin`      | `number`           | `4`           | Quiet zone margin                                                         |
| `color.dark`  | `string`           | `'#000000ff'` | Color for dark modules (ensure hex with alpha e.g. `#000000ff`)           |
| `color.light` | `string`           | `'#ffffffff'` | Color for light modules (ensure hex with alpha e.g. `#ffffffff`)          |

### Usage

#### From Value

```vue
<script setup>
import { QRCode } from 'vlite3'
</script>

<template>
  <QRCode value="https://example.com" :size="250" />
</template>
```

#### From Existing Image URL

```vue
<template>
  <QRCode image-url="https://example.com/qr.png" :size="250" />
</template>
```

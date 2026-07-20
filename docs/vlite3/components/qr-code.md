# QRCode

**Import:** `import { QRCode } from 'vlite3'`

### Description

A lightweight and responsive QR Code component powered by `qrcode`. It encodes any supplied string exactly as provided, or displays a pre-generated QR image URL.

### Props

| Prop          | Type               | Default       | Description                                                               |
| :------------ | :----------------- | :------------ | :------------------------------------------------------------------------ |
| `value`       | `string`           | —             | The string value to encode into a QR code                                 |
| `imageUrl`    | `string`           | —             | A direct URL to an existing QR code image (overrides `value` if provided) |
| `size`        | `number \| string` | `200`         | Width/height of the container box                                          |
| `margin`      | `number`           | `4`           | Quiet zone margin                                                         |
| `scale`       | `number`           | `4`           | Internal render scale for crisp display and printing                      |
| `errorCorrectionLevel` | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'` | QR error-correction level                              |
| `alt`         | `string`           | `'QR Code'`   | Accessible image description                                              |
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

#### Base64 or Other Pre-Encoded Values

Pass pre-encoded values directly. The component treats them as ordinary strings and does not decode, normalize, or otherwise transform their content.

```vue
<template>
  <QRCode
    :value="base64Value"
    :size="320"
    :margin="4"
    alt="Invoice QR code" />
</template>
```

If `value` is a `data:image/...` URL, the component displays it directly instead of re-encoding it.

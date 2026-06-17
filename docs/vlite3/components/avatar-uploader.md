# AvatarUploader

**Import:** `import { AvatarUploader } from 'vlite3'`

### Description

A single-image avatar picker built on `FilePicker`. Use it standalone with `v-model`, or as a Form field via `type: 'avatarUpload'`. Pending base64 values are uploaded through the global upload service before form submission — the same pipeline used by [`ThumbnailSelector`](../advanced/thumbnail-selector.md) (`thumbnailSelector`) and `fileUploader`.

For multi-image galleries with a primary thumbnail, use [ThumbnailSelector](../advanced/thumbnail-selector.md) instead.

### Props

| Prop         | Type             | Default    | Description                                 |
| :----------- | :--------------- | :--------- | :------------------------------------------ |
| `modelValue` | `string \| null` | `null`     | Binding (`v-model`) - usually Base64 or URL |
| `size`       | `AvatarSize`     | `'xl'`     | Size of the avatar                          |
| `rounded`    | `AvatarRounded`  | `'full'`   | Border radius                               |
| `editable`   | `boolean`        | `true`     | Enable upload/remove actions                |
| `loading`    | `boolean`        | `false`    | Show loading overlay                        |
| `disabled`   | `boolean`        | `false`    | Disable interactions                        |
| `fallback`   | `string`         | —          | Fallback image/text                         |
| `alt`        | `string`         | `'Avatar'` | Alt text for accessible reading             |
| `maxSize`    | `number`         | —          | Max file size in bytes                      |
| `className`  | `string`         | —          | Custom class for Avatar                     |

### Events

- `@update:modelValue`: Emitted with Base64 string on upload
- `@change`: Emitted with full `FilePickerValue` object
- `@error`: Emitted on validation errors

### Form Field Integration

Declare `type: 'avatarUpload'` in a Form schema. The field value is a string (URL or pending base64). Use `maxFileSize` (in **MB**) on the schema field — Form forwards it to the uploader.

```javascript
const schema = [
  {
    name: 'avatar',
    label: 'Profile Picture',
    type: 'avatarUpload',
    maxFileSize: 5, // MB
  },
]
```

See [Forms — File Uploads](./forms.md#file-uploads) for the full upload field set (`avatarUpload`, `thumbnailSelector`, `fileUploader`, `file`).

### Usage

#### Basic Usage

```vue
<AvatarUploader v-model="userAvatar" size="xl" />
```

#### Rounded Square & Validation

```vue
<AvatarUploader v-model="avatar" rounded="lg" :max-size="1024 * 1024" @error="handleError" />
```

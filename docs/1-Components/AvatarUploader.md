# AvatarUploader

**Import:** `import { AvatarUploader } from 'vlite3'`

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

### Usage

#### Basic Usage

```vue
<AvatarUploader v-model="userAvatar" size="xl" />
```

#### Rounded Square & Validation

```vue
<AvatarUploader v-model="avatar" rounded="lg" :max-size="1024 * 1024" @error="handleError" />
```

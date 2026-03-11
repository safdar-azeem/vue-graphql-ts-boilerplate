# FilePicker

**Import:** `import { FilePicker } from 'vlite3'`

### Props

| Prop              | Type                                           | Default      | Description                                 |
| :---------------- | :--------------------------------------------- | :----------- | :------------------------------------------ |
| `modelValue`      | `FilePickerValue \| FilePickerValue[] \| null` | `null`       | Binding (`v-model`)                         |
| `variant`         | `'dropzone' \| 'input'`                        | `'dropzone'` | Display variant                             |
| `multiSelect`     | `boolean`                                      | `false`      | Allow multiple file selection               |
| `fileTypes`       | `string[]`                                     | `[]`         | Allowed types (e.g., `['image/*', '.pdf']`) |
| `returnFormat`    | `'file' \| 'base64'`                           | `'file'`     | Output format for file data                 |
| `maxSize`         | `number`                                       | —            | Max file size in bytes                      |
| `maxFiles`        | `number`                                       | —            | Max number of allowed files                 |
| `loading`         | `boolean`                                      | `false`      | Show loading state                          |
| `disabled`        | `boolean`                                      | `false`      | Disable interaction                         |
| `placeholder`     | `string`                                       | —            | Placeholder (for `input` variant)           |
| `placeholderI18n` | `string`                                       | —            | I18n key for input placeholder              |
| `textI18n`        | `string`                                       | —            | I18n key for dropzone text                  |
| `size`            | `InputSize`                                    | `'md'`       | Size (for `input` variant)                  |
| `rounded`         | `InputRounded`                                 | `'md'`       | Border radius (for `input` variant)         |

### Types

```ts
export interface FilePickerValue {
  fileName: string
  fileType: string
  fileSize: number
  file: File // Actual File object
  base64: string // Populated if returnFormat='base64'
}
```

### Events

- `@update:modelValue`: Emitted when value changes
- `@change`: Emitted when value changes
- `@error`: Emitted on validation errors (type, size, etc.)

### Slots

| Slot      | Description         | Props                                       |
| :-------- | :------------------ | :------------------------------------------ |
| `trigger` | Custom trigger area | `{ trigger, files, isDragging, isLoading }` |

### Usage

#### Basic Dropzone

```vue
<FilePicker v-model="files" :file-types="['image/*']" />
```

#### Input Variant

```vue
<FilePicker v-model="files" variant="input" placeholder="Upload document..." :multi-select="true" />
```

#### Base64 Return

```vue
<FilePicker v-model="files" return-format="base64" @change="uploadToServer" />
```

#### Custom Trigger Slot

```vue
<FilePicker v-model="files">
  <template #trigger="{ trigger, files, isLoading }">
    <Button 
      :loading="isLoading" 
      icon="lucide:upload" 
      @click="trigger">
      {{ files?.length ? 'Change File' : 'Upload' }}
    </Button>
  </template>
</FilePicker>
```

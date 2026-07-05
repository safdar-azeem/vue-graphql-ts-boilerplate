# FilePreview

**Import:** `import { FilePreview } from 'vlite3'`

A wrapper component for rendering documents (PDFs, images, etc.) inline or inside modals. It relies on the `v-file-preview` library to securely render content within a dedicated viewer.

### Props

| Prop          | Type      | Default | Description                                                   |
| :------------ | :-------- | :------ | :------------------------------------------------------------ |
| `url`         | `string`  | —       | The URL of the file to preview. (Required)                    |
| `name`        | `string`  | —       | Optional file name for display and context.                   |
| `canDownload` | `boolean` | `true`  | Toggles the visibility of the "Download" programmatic action. |

### Usage

```vue
<script setup>
import { FilePreview, Modal, Button } from 'vlite3'
</script>

<template>
  <div class="p-4 space-y-4">
    <FilePreview
      url="[https://example.com/document.pdf](https://example.com/document.pdf)"
      name="Company Policy.pdf" />

    <Modal
      title="Preview Document"
      max-width="max-w-3xl"
      :body="FilePreview"
      :bodyProps="{
        url: '[https://example.com/document.pdf](https://example.com/document.pdf)',
        name: 'Policy.pdf',
      }">
      <template #trigger>
        <Button>Open Preview</Button>
      </template>
    </Modal>
  </div>
</template>
```

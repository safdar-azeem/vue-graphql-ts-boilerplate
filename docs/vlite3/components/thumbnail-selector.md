# Thumbnail Selector

**Import:** `import { ThumbnailSelector } from 'vlite3'`

### Description

A full-featured image picker and thumbnail manager for Vue 3. Users can upload multiple images, drag-and-drop to reorder them, and designate one as the primary thumbnail.

Use it as a **standalone component** with `v-model:images` / `v-model:thumbnail`, or as a **Form field** via `type: 'thumbnailSelector'`. Both modes integrate with the global upload service — the same pipeline used by [`AvatarUploader`](../basic/avatar-uploader.md) (`avatarUpload`) and `fileUploader`.

---

### Props

| Prop        | Type             | Default     | Description                                                                    |
| :---------- | :--------------- | :---------- | :----------------------------------------------------------------------------- |
| `images`    | `string[]`       | `[]`        | Array of currently loaded image URLs. Bind with `v-model:images`.              |
| `thumbnail` | `string \| null` | `null`      | The currently selected thumbnail URL. Bind with `v-model:thumbnail`.           |
| `label`     | `string?`        | `undefined` | An optional label rendered above the component.                                |
| `disabled`  | `boolean`        | `false`     | Disables all interactions: uploading, clicking, removing, and reordering.      |
| `loading`   | `boolean`        | `false`     | Shows a spinner on the upload button and disables interactions.                |
| `maxSize`   | `number?`        | `undefined` | Maximum file size in **MB** per image. Forwarded to the internal `FilePicker`. |

---

### Emits

| Event              | Payload                                           | Description                                                         |
| :----------------- | :------------------------------------------------ | :------------------------------------------------------------------ |
| `update:images`    | `string[]`                                        | Emitted when the images array changes (upload, remove, or reorder). |
| `update:thumbnail` | `string \| null`                                  | Emitted when the selected thumbnail changes.                        |
| `change`           | `{ images: string[]; thumbnail: string \| null }` | Convenience event that consolidates both values in one payload.     |

---

### Implementation Examples

#### 1. Standalone with v-model

```vue
<script setup>
import { ref } from 'vue'
import { ThumbnailSelector } from 'vlite3'

const images = ref(['https://cdn.example.com/img1.jpg', 'https://cdn.example.com/img2.jpg'])
const thumbnail = ref(images.value[0])
</script>

<template>
  <ThumbnailSelector
    v-model:images="images"
    v-model:thumbnail="thumbnail"
    label="Product Images"
    :max-size="5" />
</template>
```

#### 2. Schema-driven inside Form (recommended)

Declare a field with `type: 'thumbnailSelector'` in your Form schema. Upload processing is handled automatically by `useForm` before `onSubmit` fires.

In **non-multi-step** forms (flat or grouped), Form automatically hoists the field into a **side panel**: right on large screens (`min-w` ~350px), stacked above the fields on small screens. In **multi-step** wizards it stays inline with the step fields.

```vue
<script setup>
import { Form } from 'vlite3'

const schema = [
  { name: 'title', type: 'text', label: 'Product Title', required: true },
  {
    name: 'media',
    type: 'thumbnailSelector',
    label: 'Product Images',
    maxFileSize: 5, // MB — forwarded as ThumbnailSelector `maxSize`
  },
]

const handleSubmit = ({ values }) => {
  /**
   * values.media = {
   *   images: ['https://cdn.example.com/img1.jpg'],
   *   thumbnail: 'https://cdn.example.com/img1.jpg'
   * }
   * base64 data URIs are resolved to URLs before this fires.
   */
  console.log(values)
}
</script>

<template>
  <Form :schema="schema" submit-text="Save" @onSubmit="handleSubmit" />
</template>
```

#### 3. With initial values

```vue
<script setup>
import { Form } from 'vlite3'

const schema = [
  { name: 'title', type: 'text', label: 'Product Title' },
  {
    name: 'media',
    type: 'thumbnailSelector',
    label: 'Product Images',
    maxFileSize: 5,
  },
]

const values = {
  title: 'Existing product',
  media: {
    images: ['https://cdn.example.com/img1.jpg', 'https://cdn.example.com/img2.jpg'],
    thumbnail: 'https://cdn.example.com/img1.jpg',
  },
}
</script>

<template>
  <Form :schema="schema" :values="values" is-update submit-text="Update" @onSubmit="handleSubmit" />
</template>
```

---

### Form Field Integration

When declared as a field in a `Form` schema with `type: 'thumbnailSelector'`, the value stored in `useForm` is a structured object:

```ts
{
  images: string[]          // all image URLs (or pending base64 data URIs)
  thumbnail: string | null  // the selected thumbnail URL
}
```

| Schema property | Maps to ThumbnailSelector prop | Notes                                      |
| :-------------- | :----------------------------- | :----------------------------------------- |
| `label`         | `label`                        | Shown above the preview                    |
| `maxFileSize`   | `maxSize`                      | Size limit in **MB**                       |
| `disabled`      | `disabled`                     | Supports static boolean or `(ctx) => bool` |
| `when`          | —                              | Conditionally show/hide the whole field    |

The global upload service automatically detects any `base64` data URIs in `images[]` and uploads them before `onSubmit` fires. The `thumbnail` reference is updated to the resolved CDN URL in the same pass — identical to how `avatarUpload` and `fileUploader` fields work.

Pass `folderId` on the Form to store uploads under a specific folder.

> **Layout note:** Only the first `thumbnailSelector` field is extracted into the side panel. Multi-step schemas always render the field inline (no side panel) to avoid layout issues across tabs.

---

### Accepted File Types

The component only accepts images. The following MIME types are supported:

| Format | MIME type       |
| :----- | :-------------- |
| JPEG   | `image/jpeg`    |
| PNG    | `image/png`     |
| WebP   | `image/webp`    |
| GIF    | `image/gif`     |
| SVG    | `image/svg+xml` |

---

### Testing

Automatic `data-testid` resolution:

| Attribute       | Format              | Fallback              | Example                                   |
| :-------------- | :------------------ | :-------------------- | :---------------------------------------- |
| `data-testid`   | `thumbnail-{name}`  | `thumbnail-selector`  | `[data-testid="thumbnail-media"]`         |

Override by passing `data-testid` via schema `props` or as an attribute on the standalone component.

---

### Senior Engineer's Notes

1. **Auto-thumbnail selection**: When a user uploads their first image and no thumbnail is set, the component auto-selects it. Subsequent uploads do not change the active selection.
2. **Drag-to-reorder**: All images in the grid can be reordered by dragging the grip handle that appears on hover. The `update:images` event fires with the new sorted array and the `thumbnail` selection is preserved.
3. **Disabled vs Loading**: Use `disabled` for read-only display (e.g., view mode). Use `loading` during an upload in progress — it shows a spinner on the upload button but still displays the image grid.
4. **Delete logic**: Deleting the currently selected thumbnail automatically promotes the first remaining image to thumbnail, or sets it to `null` if the gallery is empty.
5. **Pending uploads**: Newly picked files are stored as `data:` URIs so `collectFileFields` / `processFileUploads` can upload them on submit. Blob URLs are used only as a preview fallback when base64 is unavailable.
6. **Hover isolation**: The delete and drag-handle buttons use scoped CSS selectors (not Tailwind's `group-hover`) to ensure hover effects are isolated to the individual card being pointed at.

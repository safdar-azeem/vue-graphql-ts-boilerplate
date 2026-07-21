# RichTextEditor

**Import:** `import { RichTextEditor, RichTextReader } from 'vlite3'`

### Description

A lightweight WYSIWYG editor built on the native browser `contenteditable` API — no heavy editor framework. Supports headings, inline formatting, lists, blockquotes, links, images, alignment, and more. The `v-model` value is an HTML string.

Images inserted via the toolbar, paste, or drag-and-drop are uploaded through `useFileUpload` (the same service used by `FilePicker` / form file fields). While uploading, a temporary blob URL is shown; it is replaced with the final URL when the upload completes.

Pair with `RichTextReader` to render saved HTML with the same typography as the editor.

---

### Props

| Prop          | Type           | Default            | Description                                                                 |
| :------------ | :------------- | :----------------- | :-------------------------------------------------------------------------- |
| `modelValue`  | `string`       | `''`               | Binding (`v-model`) — HTML content                                          |
| `placeholder` | `string`       | `'Start typing…'`  | Placeholder shown when the editor is empty                                  |
| `label`       | `string`       | —                  | Optional label above the editor                                             |
| `error`       | `string`       | —                  | Error message shown below the editor (also sets invalid styles)             |
| `id`          | `string`       | auto-generated     | DOM id for the editable surface                                             |
| `disabled`    | `boolean`      | `false`            | Disables editing and toolbar actions                                        |
| `readonly`    | `boolean`      | `false`            | Makes content non-editable while still showing the toolbar (disabled)       |
| `minHeight`   | `string`       | `'180px'`          | Minimum height of the editable area                                         |
| `maxHeight`   | `string`       | `''`               | Maximum height; when set, the editor scrolls vertically                     |
| `tools`       | `RichTextTools`| —                  | Toolbar contents — preset string, tool ID array, or omit for full toolbar   |

---

### Events

| Event               | Payload       | Description                                              |
| :------------------ | :------------ | :------------------------------------------------------- |
| `update:modelValue` | `string`      | Emitted on every content change with the current HTML    |
| `focus`             | `FocusEvent`  | Emitted when the editor gains focus                      |
| `blur`              | `FocusEvent`  | Emitted when the editor loses focus                      |
| `image-removed`     | `string`      | Emitted with the image URL when an `<img>` is deleted    |

---

### Types

```ts
/** Single toolbar button identifier */
export type RichTextToolId =
  | 'undo' | 'redo'
  | 'h1' | 'h2' | 'p'
  | 'bold' | 'italic' | 'underline' | 'strikethrough' | 'code'
  | 'bulletList' | 'orderedList' | 'blockquote' | 'hr' | 'image'
  | 'alignLeft' | 'alignCenter' | 'alignRight'
  | 'link' | 'clearFormat'

/** Curated toolbar presets */
export type RichTextToolsPreset = 'all' | 'standard' | 'basic' | 'minimal'

/** Accepted by the `tools` prop */
export type RichTextTools = RichTextToolId[] | RichTextToolsPreset
```

Also exported: `resolveRichTextTools`, `RICH_TEXT_TOOL_GROUPS`.

---

### Toolbar customization (`tools` prop)

| Value        | Buttons included                                              |
| :----------- | :------------------------------------------------------------ |
| _(omit)_ / `'all'` | Every tool                                              |
| `'standard'` | Everything except alignment (`alignLeft` / `Center` / `Right`) |
| `'basic'`    | Headings, inline formatting, lists, blockquote, image, link, clear |
| `'minimal'`  | `bold`, `italic`, `bulletList`, `link`                        |
| `RichTextToolId[]` | Only the listed tools, rendered in canonical group order |

Group separators are hidden automatically when adjacent groups have no visible tools.

#### Available tool IDs

| Group             | Tool IDs                                               |
| :---------------- | :----------------------------------------------------- |
| History           | `undo`, `redo`                                         |
| Block format      | `h1`, `h2`, `p`                                        |
| Inline formatting | `bold`, `italic`, `underline`, `strikethrough`, `code` |
| Lists & blocks    | `bulletList`, `orderedList`, `blockquote`, `hr`, `image` |
| Alignment         | `alignLeft`, `alignCenter`, `alignRight`               |
| Misc              | `link`, `clearFormat`                                  |

---

### Keyboard shortcuts

| Shortcut              | Action              |
| :-------------------- | :------------------ |
| `Ctrl/Cmd + B`        | Bold                |
| `Ctrl/Cmd + I`        | Italic              |
| `Ctrl/Cmd + U`        | Underline           |
| `Ctrl/Cmd + K`        | Insert / edit link  |
| `Ctrl/Cmd + Z` / `Y`  | Undo / Redo        |
| `Escape`              | Close link popover  |

---

### Usage

#### Basic

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { RichTextEditor } from 'vlite3'

const content = ref('<p>Hello <strong>World</strong>!</p>')
</script>

<template>
  <RichTextEditor v-model="content" placeholder="Start typing…" />
</template>
```

#### With label & error

```vue
<RichTextEditor
  v-model="description"
  label="Description"
  placeholder="Write a description…"
  error="This field is required" />
```

#### Custom height

```vue
<RichTextEditor
  v-model="notes"
  label="Notes"
  min-height="80px"
  max-height="320px" />
```

#### Toolbar presets

```vue
<!-- Minimal: bold, italic, bullet list, link -->
<RichTextEditor v-model="content" tools="minimal" />

<!-- Basic: headings + formatting + lists + image + link -->
<RichTextEditor v-model="content" tools="basic" />

<!-- Explicit subset (canonical group order is preserved) -->
<RichTextEditor
  v-model="content"
  :tools="['bold', 'italic', 'bulletList', 'link', 'image']" />
```

#### Disabled / readonly

```vue
<RichTextEditor v-model="content" :disabled="true" />
<RichTextEditor v-model="content" :readonly="true" />
```

#### Image removal

```vue
<RichTextEditor
  v-model="content"
  @image-removed="(url) => deleteFromStorage(url)" />
```

---

# RichTextReader

**Import:** `import { RichTextReader } from 'vlite3'`

### Description

Read-only renderer for HTML produced by `RichTextEditor`. Uses the same typography styles so published content matches what authors saw while editing. Ideal for detail pages, comments, blog posts, and previews.

### Props

| Prop      | Type     | Default | Description                          |
| :-------- | :------- | :------ | :----------------------------------- |
| `content` | `string` | `''`    | HTML string to render (`v-html`)     |

### Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { RichTextEditor, RichTextReader } from 'vlite3'

const content = ref('<p>Hello <strong>World</strong>!</p>')
</script>

<template>
  <RichTextEditor v-model="content" />

  <div class="mt-6 p-6 border rounded-lg">
    <RichTextReader :content="content" />
  </div>
</template>
```

---

### Form integration

Use `type: 'richTextEditor'` in a form schema. The field value is an HTML string. Pass editor props via `props` (including `tools`, `minHeight`, `maxHeight`). See [Forms](./forms.md#rich-text-editor) for schema examples, required-field behavior, and image upload notes.

# AttachmentsList

**Import:** `import { AttachmentsList } from 'vlite3'`

Styled attachment list with secure download (Fetch + Blob, no new tab) and inline preview via `FilePreview`. Stable BEM classes (`vl-attachments-list__*`) for CSS overrides; `*Class` props inject Tailwind/custom classes without touching source.

## Index

| # | Section | Jump |
|---|---------|------|
| 0 | Overview | _(above)_ |
| 1 | Props | [#1-props](#1-props) |
| 2 | Types | [#2-types](#2-types) |
| 3 | Slots | [#3-slots](#3-slots) |
| 4 | Variants | [#4-variants](#4-variants) |
| 5 | BEM / CSS hooks | [#5-bem--css-hooks](#5-bem--css-hooks) |
| 6 | Usage | [#6-usage](#6-usage) |
| 7 | Full props example | [#7-full-props-example](#7-full-props-example) |

---

## 1. Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `attachments` | `AttachmentItem \| AttachmentItem[]` | `[]` | File(s) to display |
| `canView` | `boolean` | `true` | Show Preview (eye) control |
| `canDownload` | `boolean` | `true` | Enable programmatic download |
| `variant` | `'default' \| 'list' \| 'inline' \| 'card'` | `'default'` | Layout mode → [#4](#4-variants) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size for `default`/`list`/`inline` |
| `clickToPreview` | `boolean` | `false` | Row click opens preview; eye hidden |
| `showDownloadInList` | `boolean` | `true` | `false` hides list download btn (modal download still via `canDownload`) |
| `rootClass` | `string` | `''` | Root wrapper |
| `gridClass` | `string` | `''` | Card grid (**card** only) |
| `cardClass` | `string` | `''` | Card item (**card**) |
| `cardThumbnailClass` | `string` | `''` | Card thumbnail (**card**) |
| `cardInfoClass` | `string` | `''` | Card footer info (**card**) |
| `cardActionsClass` | `string` | `''` | Card overlay actions (**card**) |
| `listClass` | `string` | `''` | List container (`default`/`list`/`inline`) |
| `itemClass` | `string` | `''` | List row (`default`/`list`/`inline`) |
| `itemIconBoxClass` | `string` | `''` | List icon/thumbnail box |
| `itemNameClass` | `string` | `''` | File name text |
| `itemSizeClass` | `string` | `''` | File size subtext |
| `itemActionsClass` | `string` | `''` | List actions container |
| `emptyClass` | `string` | `''` | Empty-state placeholder |

---

## 2. Types

```ts
export interface AttachmentItem {
  fileName?: string
  fileSize?: number
  fileUrl: string
  thumbnailUrl?: string
  fileType?: string
  [key: string]: any
}

/** Scoped props for `#item` slot */
export interface AttachmentItemSlotProps {
  file: AttachmentItem
  index: number
  variant: 'default' | 'list' | 'inline' | 'card'
  size: 'sm' | 'md' | 'lg'
  canView: boolean
  canDownload: boolean
  clickToPreview: boolean
  showDownloadInList: boolean
  isDownloading: boolean
  isPreviewable: boolean
  isImage: boolean
  formattedSize: string       // e.g. "1.5 MB"; empty if no size
  icon: string                // Iconify icon for file type
  preview: () => void | Promise<void>  // open built-in preview (or download if not previewable)
  download: () => Promise<void>        // secure programmatic download
}
```

---

## 3. Slots

| Slot | Scoped props | Behavior |
|------|--------------|----------|
| `item` | `AttachmentItemSlotProps` [#2](#2-types) | Replaces default row/card UI. Use `preview()` / `download()` for built-in actions. |

When `#item` is set, default card/list markup for that item is not rendered.

```vue
<AttachmentsList :attachments="files" variant="list">
  <template #item="{ file, icon, formattedSize, isDownloading, preview, download, canDownload }">
    <div class="flex items-center gap-3 p-3 rounded-lg border cursor-pointer" @click="preview()">
      <Icon :icon="icon" class="w-5 h-5 shrink-0" />
      <div class="min-w-0 flex-1">
        <p class="truncate">{{ file.fileName }}</p>
        <p v-if="formattedSize">{{ formattedSize }}</p>
      </div>
      <Button v-if="canDownload" :loading="isDownloading" icon="lucide:download" @click.stop="download()" />
    </div>
  </template>
</AttachmentsList>
```

---

## 4. Variants

| Variant | Layout | Notes |
|---------|--------|-------|
| `default` / `list` | Vertical bordered rows | Supports `size` sm/md/lg |
| `inline` | Transparent/muted rows | For chat bubbles / embedded content; supports `size` |
| `card` | Thumbnail grid + hover actions | Default 4-col responsive grid; override via `gridClass` |

```vue
<AttachmentsList :attachments="files" variant="list" size="md" />
<AttachmentsList :attachments="files" variant="inline" size="sm" />
<AttachmentsList :attachments="files" variant="card" />
```

---

## 5. BEM / CSS hooks

| Element | BEM | Related prop |
|---------|-----|--------------|
| Root | `vl-attachments-list` | `rootClass` |
| Card grid | `vl-attachments-list__grid` | `gridClass` |
| Card item | `vl-attachments-list__card` | `cardClass` |
| Card thumbnail | `vl-attachments-list__card-thumbnail` | `cardThumbnailClass` |
| Card info/footer | `vl-attachments-list__card-info` | `cardInfoClass` |
| Card overlay actions | `vl-attachments-list__card-actions` | `cardActionsClass` |
| List container | `vl-attachments-list__list` | `listClass` |
| List row | `vl-attachments-list__item` | `itemClass` |
| List icon box | `vl-attachments-list__item-icon-box` | `itemIconBoxClass` |
| File name | `vl-attachments-list__item-name` | `itemNameClass` |
| File size | `vl-attachments-list__item-size` | `itemSizeClass` |
| List actions | `vl-attachments-list__item-actions` | `itemActionsClass` |
| Empty state | `vl-attachments-list__empty` | `emptyClass` |

CSS override examples:

```css
.vl-attachments-list__card-thumbnail { height: 12rem; }
.vl-attachments-list__item {
  background-color: hsl(var(--primary) / 0.05);
  border-color: hsl(var(--primary) / 0.2);
}
.vl-attachments-list__item-icon-box { border-radius: 9999px; }
```

---

## 6. Usage

**Basic**
```vue
<script setup>
import { AttachmentsList } from 'vlite3'
const files = [{ fileName: 'invoice-2023.pdf', fileSize: 1048576, fileUrl: 'https://example.com/invoice.pdf' }]
</script>
<template>
  <AttachmentsList :attachments="files" />
</template>
```

**Disable actions**
```vue
<AttachmentsList :attachments="files" :can-download="false" :can-view="false" />
```

**Click-to-preview** — eye hidden; row clickable; list download optional
```vue
<AttachmentsList
  :attachments="files"
  variant="list"
  :click-to-preview="true"
  :show-download-in-list="false" />
```

**Card + class hooks** — 2-col grid, tighter gap, custom card chrome
```vue
<AttachmentsList
  :attachments="files"
  variant="card"
  grid-class="grid-cols-2 gap-2"
  card-class="rounded-none border-2"
  card-thumbnail-class="h-32" />
```

**List + class hooks**
```vue
<AttachmentsList
  :attachments="files"
  variant="list"
  item-class="!border-primary/30 !bg-primary/5"
  item-icon-box-class="!rounded-full"
  item-name-class="!text-primary"
  item-size-class="!text-primary/50" />
```

**Custom `#item`** → [#3](#3-slots)

---

## 7. Full props example

```vue
<AttachmentsList
  :attachments="files"
  variant="card"
  size="md"
  :can-view="true"
  :can-download="true"
  :click-to-preview="false"
  :show-download-in-list="true"
  root-class="p-4 border rounded-xl"
  grid-class="grid-cols-3 gap-3"
  card-class="shadow-lg"
  card-thumbnail-class="h-48"
  card-info-class="bg-muted/20"
  card-actions-class="gap-2"
  list-class="gap-2"
  item-class="!rounded-xl"
  item-icon-box-class="!rounded-full"
  item-name-class="font-bold"
  item-size-class="italic"
  item-actions-class="gap-2"
  empty-class="!border-solid !border-primary/30" />
```

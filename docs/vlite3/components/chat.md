# Chat

**Import:** `import { ChatInterface } from 'vlite3'`

A fully-featured, enterprise-grade chat component supporting reverse infinite scroll, message editing, message deletion with optional double-confirm, file attachments with inline preview, and a responsive auto-growing textarea input.

---

## Props

| Prop            | Type                  | Default              | Description                                                                                                      |
| :-------------- | :-------------------- | :------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `data`          | `ChatMessage[]`       | **required**         | Array of messages to display.                                                                                    |
| `currentUserId` | `string \| number`    | **required**         | The ID of the currently authenticated user. Used to distinguish sender vs. receiver bubbles.                     |
| `showAvatar`    | `boolean`             | `true`               | Toggles avatar visibility next to each message.                                                                  |
| `showUserInfo`  | `boolean`             | `true`               | Toggles the sender name label above receiver messages.                                                           |
| `showTimestamp` | `boolean`             | `true`               | Toggles the formatted timestamp below each message.                                                              |
| `placeholder`   | `string`              | `'Type a message...'`| Placeholder text for the message input textarea.                                                                 |
| `isLoadingMore` | `boolean`             | `false`              | When `true`, shows a spinner at the top of the message list (used during reverse-scroll pagination).             |
| `allowDeleteAll`| `boolean`             | `false`              | When `true`, allows the current user to delete messages sent by others (admin mode).                             |
| `allowEditAll`  | `boolean`             | `false`              | When `true`, allows the current user to edit messages sent by others (admin mode).                               |
| `allowFileUpload`| `boolean`            | `true`               | When `true` (default), shows the file attachment picker button.                                                  |
| `confirmDelete` | `boolean`             | `true`               | When `true`, the delete button requires a second click to confirm. Set to `false` to delete on first click.      |
| `folderId`      | `string`              | `undefined`          | The storage folder ID passed to the file upload handler when attaching files.                                    |
| `maxFileSize`   | `number`              | `undefined`          | Maximum allowed file size in bytes for attachments (e.g. `10 * 1024 * 1024` for 10 MB).                         |

---

## Events

| Event     | Payload                              | Description                                                                                         |
| :-------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------- |
| `add`     | `(text: string, attachments?: ChatAttachment[])` | Emitted when the user sends a new message. `attachments` is `undefined` if no files were selected. |
| `delete`  | `(id: string \| number)`            | Emitted when a message is confirmed for deletion.                                                   |
| `edit`    | `(message: ChatMessage)`            | Emitted when the user saves an edited message. The payload is the full updated message object.      |
| `refetch` | `()`                                 | Emitted when the user scrolls to the top, signaling that older messages should be loaded.           |

---

## Types
```ts
export interface ChatMessage {
  id: string | number
  text: string
  senderId: string | number
  senderName?: string
  avatar?: string
  timestamp?: string | Date
  isEdited?: boolean
  attachments?: ChatAttachment[]
  [key: string]: any
}

export interface ChatAttachment {
  fileUrl: string
  fileName?: string
  fileType?: string
  fileSize?: number
  [key: string]: any
}
```

---

## Usage

### Basic Chat
```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ChatInterface, type ChatMessage, type ChatAttachment } from 'vlite3'

const currentUserId = 'user_1'

const messages = ref<ChatMessage[]>([
  {
    id: 1,
    text: 'Hey! How are you doing?',
    senderId: 'user_2',
    senderName: 'Alice',
    avatar: 'https://i.pravatar.cc/150?img=5',
    timestamp: new Date(),
  },
  {
    id: 2,
    text: 'I am good! Just working on something cool.',
    senderId: 'user_1',
    senderName: 'Me',
    timestamp: new Date(),
  },
])

const handleAdd = (text: string, attachments?: ChatAttachment[]) => {
  messages.value.push({
    id: Date.now(),
    text,
    senderId: currentUserId,
    senderName: 'Me',
    timestamp: new Date(),
    attachments,
  })
}

const handleDelete = (id: string | number) => {
  messages.value = messages.value.filter(m => m.id !== id)
}

const handleEdit = (updated: ChatMessage) => {
  const i = messages.value.findIndex(m => m.id === updated.id)
  if (i !== -1) messages.value[i] = { ...updated }
}
</script>

<template>
  <div class="h-[600px] border border-border rounded-xl overflow-hidden flex flex-col">
    <ChatInterface
      :data="messages"
      :current-user-id="currentUserId"
      @add="handleAdd"
      @delete="handleDelete"
      @edit="handleEdit" />
  </div>
</template>
```

---

### With Reverse Infinite Scroll

The component uses an `IntersectionObserver` internally. When the user scrolls to the top of the message list, the `refetch` event fires. Prepend older messages to `data` and set `isLoadingMore` accordingly. The component automatically preserves the scroll position after prepending so the view does not jump.
```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ChatInterface, type ChatMessage } from 'vlite3'

const messages = ref<ChatMessage[]>([/* initial page */])
const isLoadingMore = ref(false)
const page = ref(1)

const handleRefetch = async () => {
  if (isLoadingMore.value) return
  isLoadingMore.value = true

  const older = await fetchOlderMessages(page.value)
  messages.value = [...older, ...messages.value]

  page.value++
  isLoadingMore.value = false
}
</script>

<template>
  <div class="h-[600px] flex flex-col border border-border rounded-xl overflow-hidden">
    <ChatInterface
      :data="messages"
      current-user-id="user_1"
      :is-loading-more="isLoadingMore"
      @refetch="handleRefetch"
      @add="handleAdd"
      @delete="handleDelete"
      @edit="handleEdit" />
  </div>
</template>
```

---

### With File Attachments

Pass a `folderId` to route uploads to a specific storage folder. Optionally cap file size via `maxFileSize`. Attachments are uploaded before the message is emitted — the `add` event always receives already-uploaded `ChatAttachment[]` objects with resolved `fileUrl` values.
```vue
<template>
  <ChatInterface
    :data="messages"
    current-user-id="user_1"
    folder-id="chat-uploads"
    :max-file-size="10 * 1024 * 1024"
    @add="handleAdd"
    @delete="handleDelete"
    @edit="handleEdit" />
</template>
```

---

### Delete Confirmation

By default (`confirmDelete: true`), the delete button turns into a **check icon** on first click, requiring a second click to confirm. A small **×** badge appears on the button to cancel the pending delete. If the user does not confirm within **3 seconds**, the state resets automatically.
```vue
<!-- Default: requires double-click to confirm (recommended) -->
<ChatInterface :data="messages" current-user-id="user_1" :confirm-delete="true" ... />

<!-- Instant delete on first click -->
<ChatInterface :data="messages" current-user-id="user_1" :confirm-delete="false" ... />
```

**Delete flow with `confirmDelete: true`:**

1. User hovers the message → action buttons appear.
2. User clicks 🗑️ → button switches to ✓ (red tint) + a tiny × cancel badge.
3. User clicks ✓ → `delete` event emits with the message `id`.
4. If user clicks × or waits 3 s → state resets back to 🗑️.

---

### Admin Mode

Use `allowDeleteAll` and `allowEditAll` to grant the current user the ability to act on messages sent by others (e.g. a moderator or support agent).
```vue
<ChatInterface
  :data="messages"
  current-user-id="admin_1"
  :allow-delete-all="true"
  :allow-edit-all="true"
  @add="handleAdd"
  @delete="handleDelete"
  @edit="handleEdit" />
```

---

### Minimal (No Avatars, No Timestamps)
```vue
<ChatInterface
  :data="messages"
  current-user-id="user_1"
  :show-avatar="false"
  :show-user-info="false"
  :show-timestamp="false"
  @add="handleAdd"
  @delete="handleDelete"
  @edit="handleEdit" />
```

---

## Keyboard Shortcuts

| Key              | Action                                      |
| :--------------- | :------------------------------------------ |
| `Enter`          | Send the message (when input is focused).   |
| `Shift + Enter`  | Insert a newline in the message input.      |
| `Escape`         | Cancel an active edit and restore input.    |

---

## Attachment Display — `AttachmentsList`

Attachments are rendered inline inside the chat bubble using the `AttachmentsList` component in `variant="inline"` mode. This variant:

- Inherits the current text color (`currentColor`) of the bubble so icons are always visible against both the sender's primary-colored bubble and the receiver's muted bubble.
- Uses a semi-transparent background (`bg-black/10` / `dark:bg-white/10`) for each attachment row instead of a hard-coded card color.
- Provides **Eye** (preview) and **Download** buttons that open a `FilePreview` modal or trigger a secure blob-based download respectively.

The `AttachmentsList` component can also be used standalone with `variant="default"` (the default) for rendering attachment lists outside of a chat context.
```vue
<script setup lang="ts">
import { AttachmentsList } from 'vlite3'

const files = [
  {
    fileName: 'invoice-2023.pdf',
    fileSize: 1048576,
    fileUrl: 'https://example.com/invoice.pdf',
  },
]
</script>

<template>
  <!-- Standalone default card style -->
  <AttachmentsList :attachments="files" />

  <!-- Inline style for embedding inside colored containers -->
  <AttachmentsList :attachments="files" variant="inline" />

  <!-- Without download -->
  <AttachmentsList :attachments="files" :can-download="false" />

  <!-- Without preview -->
  <AttachmentsList :attachments="files" :can-view="false" />
</template>
```

### `AttachmentsList` Props

| Prop          | Type                                 | Default     | Description                                                                              |
| :------------ | :----------------------------------- | :---------- | :--------------------------------------------------------------------------------------- |
| `attachments` | `AttachmentItem \| AttachmentItem[]` | `[]`        | A single file or array of files to display.                                              |
| `canView`     | `boolean`                            | `true`      | Toggles the preview (Eye) button.                                                        |
| `canDownload` | `boolean`                            | `true`      | Toggles the download button.                                                             |
| `variant`     | `'default' \| 'inline'`             | `'default'` | `'inline'` uses `currentColor` for icons to blend seamlessly into any colored container. |

### `AttachmentItem` Type
```ts
export interface AttachmentItem {
  fileName?: string
  fileSize?: number
  fileUrl: string
  [key: string]: any
}
```

---

## Layout Requirement

`ChatInterface` uses `flex-1` and `min-h-0` to fill its parent. Always wrap it in a container with a **fixed height** and `flex flex-col`:
```vue
<template>
  <!-- Required: fixed height + flex col wrapper -->
  <div class="h-[600px] flex flex-col border border-border rounded-xl overflow-hidden">
    <ChatInterface ... />
  </div>
</template>
```

Without a fixed height, the message list will not scroll correctly and the input will not anchor to the bottom.

---

## Internal Architecture

| Concern                   | Implementation                                                                                     |
| :------------------------ | :------------------------------------------------------------------------------------------------- |
| Reverse infinite scroll   | `IntersectionObserver` watching a 1px sentinel `div` at the top of the message list.              |
| Scroll preservation       | Compares `scrollHeight` before and after prepend; offsets `scrollTop` by the difference.          |
| Textarea auto-grow        | Resets `height: auto` then sets `height` to `scrollHeight`, capped at `120px` (≈5 lines).         |
| File upload               | Delegates to `useFileUpload` composable; uploads complete before `add` event fires.               |
| Delete confirmation       | Local `pendingDelete` ref per bubble; auto-resets via `setTimeout` after 3 seconds.               |
| Attachment inline styling | `variant="inline"` on `AttachmentsList` uses raw `<button>` elements inheriting `currentColor`.   |

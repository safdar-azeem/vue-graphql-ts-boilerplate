# Comment Thread

An interactive, completely abstracted discussion interface perfectly suited for GitHub PRs, Jira tickets, documentation platforms, or complex collaborative SaaS environments.

## Architecture

Unlike the traditional `Chat` feature (which handles real-time, flat sequential messages), the `CommentThread` specializes in deep contextual nesting (infinite trees of replies). It natively understands the nested payload and recursively builds its own DOM structures visually linking discussions with vertical line indenting.

It includes out-of-the-box integration with:
- Nested Inline Replies
- Nested Inline Edits
- Rich File Attachment Previews
- Native Internal Pagination (Facebook / Instagram style deep nested load-more)
- Double-confirm "Delete" logic (Click to prep, click again to confirm).

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { CommentThread, type CommentNode } from 'vlite3'

const currentUser = { id: 'me_1', name: 'Admin', avatar: 'https://i.pravatar.cc/150' }

const myThreads = ref<CommentNode[]>([
  {
    id: 1,
    text: "Parent Comment with a file",
    author: { id: 'u1', name: 'John Doe' },
    attachments: [
      { fileName: 'spec.pdf', fileUrl: 'https://...', fileSize: 1024 }
    ],
    replies: [
      {
        id: 2,
        text: "Nested child Reply",
        author: { id: 'u2', name: 'Jane Doe' },
        replies: []
      }
    ]
  }
])

const handleAdd = (payload) => { /* logic to unshift/push comment based on payload.parentId */ }
const handleEdit = (updatedComment) => { /* logic to update comment tree deep */ }
const handleDelete = (id) => { /* logic to remove comment deep */ }
</script>

<template>
  <CommentThread 
    :comments="myThreads" 
    :current-user="currentUser"
    @add="handleAdd"
    @edit="handleEdit" 
    @delete="handleDelete" 
  />
</template>
```

## Props (`CommentThread.vue`)

| Prop | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| `comments` | `CommentNode[]` | `[]` | A recursive tree payload mapping the threaded discussion. |
| `currentUser` | `CommentAuthor \| null` | `null` | Crucial context! Determines permission views, edit/delete abilities, and your own Avatar display picture. |
| `inputPosition` | `'top' \| 'bottom' \| 'hidden'` | `'top'` | Where to automatically attach the `<CommentEditor>`. |
| `threaded` | `boolean` | `true` | Visually draws the vertical joining line between deep replies. |
| `allowDelete` | `boolean` | `true` | Show the Trash action icon. |
| `allowEdit` | `boolean` | `true` | Show the Pencil action icon. |
| `allowReply` | `boolean` | `true` | Show the Reply action icon. |
| `allowFileUpload` | `boolean` | `true` | Show the Attachment picker context. |
| `confirmDelete` | `boolean` | `true` | Requires the user to double click the trash can to prevent accidental drops! |
| `folderId` | `string` | `undefined` | Target upload folder for server connections. |
| `maxFileSize` | `number` | `undefined` | Upload size limit in bytes. |
| `hasMore` | `boolean` | `false` | Display the root thread "View more comments" pagination pattern. |
| `loadingMore` | `boolean` | `false` | Enables spinner on the root thread pagination button. |

### Translation Props (i18n)

Every bit of text relies on robust global translation `$t` fallbacks, making it effortlessly customizable locally if you don't provide anything. 
If you want to use your own localized dictionaries, you can simply pass the keys to your localization tool directly in the vue bindings like `:empty-text="$t('my.custom.key')"`.

- `emptyText`
- `placeholder`
- `replyPlaceholder`
- `editPlaceholder`
- `replyText`
- `editedText`
- `editingText`
- `cancelText`
- `cancelEditText`
- `loadMoreText`
- `loadMoreRepliesText`

## Payload (`CommentNode` interface)

Your payload objects should strictly match this shape:

```ts
export interface CommentNode {
  id: string | number
  text: string
  author: {
    id: string | number
    name: string
    avatar?: string
    role?: string
  }
  timestamp?: string | number | Date
  isEdited?: boolean
  attachments?: any[]
  replies?: CommentNode[]
  
  // -- Pagination fields --
  hasMoreReplies?: boolean
  loadingMoreReplies?: boolean
  replyCount?: number
}
```

## Events

The Comment component does *not* mutate your source array; it tells your application what users intended to do natively.

| Event | Payload | Description |
|:------|:--------|:------------|
| `add` | `{ text, attachments, parentId? }` | Fired when a submittal occurs. If `parentId` is provided, user clicked inline-reply; if omitted, they clicked the root thread box. |
| `edit` | `CommentNode` | Returns the entirety of the updated object with the new `.text` applied. |
| `delete` | `string \| number` | Fired when the trash button is confirmed. |
| `load-more` | `void` | Fired when root thread pagination is clicked. |
| `load-more-replies`| `string \| number` | Returns ID of the comment node that user wants to expand deep nested pagination replies for! |

## Pagination (Facebook / Instagram Style)

The `CommentThread` interface seamlessly supports deep infinite nested pagination out-of-the-box, leveraging standard industry patterns seen on Facebook/Instagram. 

When a payload includes a deeply nested item that you don't want to over-fetch, simply mock its parent using metadata:
```ts
{
  id: 'c1',
  text: "Parent Comment",
  hasMoreReplies: true,
  replyCount: 5,
  replies: []
}
```
This signals the interface to render an inline, horizontal dashed action button: `—— View 5 more replies`. When clicked it emits `@load-more-replies`. Set `.loadingMoreReplies = true`, fetch your data, and use standard Vue reactivity `parent.replies.push(...)` and it smoothly animates them into the inline tree!

## External Editor Abstraction

Did you want to render the text Editor on a sticky footer out-of-context, but render the thread comments elsewhere?

You don't need a custom interface for it. Simply load `CommentThread` with `inputPosition="hidden"`, then anywhere else simply instantiate the native `CommentEditor` component:

```vue
<script setup>
import { CommentThread, CommentEditor } from 'vlite3'
</script>

<template>
  <!-- Renders Comments ONLY (handles nested replies internally still!) -->
  <CommentThread input-position="hidden" :comments="data" />
  
  <!-- Load the standalone CommentEditor elsewhere -->
  <CommentEditor 
    variant="root" 
    :current-user="currentUser" 
    @submit="(text, attts) => handleAdd({ text, attachments: attts })" 
  />
</template>
```

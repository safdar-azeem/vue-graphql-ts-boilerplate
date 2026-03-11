# Modal

**Import:** `import { Modal } from 'vlite3'`

### Props

| Prop              | Type        | Default       | Description                                 |
| :---------------- | :---------- | :------------ | :------------------------------------------ |
| `show`            | `boolean`   | `false`       | Binding (`v-model:show`) - Visibility state |
| `title`           | `string`    | —             | Modal title text                            |
| `titleI18n`       | `string`    | —             | I18n key for the title text                 |
| `description`     | `string`    | —             | Helper text below title                     |
| `descriptionI18n` | `string`    | —             | I18n key for the helper text                |
| `maxWidth`        | `string`    | `sm:max-w-lg` | Tailwind max-width class (e.g. `max-w-2xl`) |
| `closeOutside`    | `boolean`   | `true`        | Close when clicking backdrop                |
| `backdrop`        | `boolean`   | `true`        | Show dark overlay                           |
| `triggerClass`    | `string`    | —             | Classes for the trigger wrapper             |
| `headerClass`     | `string`    | —             | Classes for the header section              |
| `bodyClass`       | `string`    | —             | Classes for the content section             |
| `footerClass`     | `string`    | —             | Classes for the footer section              |
| `body`            | `Component` | —             | Component to render lazily inside           |
| `bodyProps`       | `object`    | —             | Props to pass to the `body` component       |

### Events

- `@close`: Emitted when the modal is closed
- `@update:show`: Emitted to update the v-model
- `@onOpen`: Emitted when the modal opens

### Slots

| Slot      | Description                           | Props                   |
| :-------- | :------------------------------------ | :---------------------- |
| `trigger` | Element that opens the modal on click | —                       |
| `default` | Main content of the modal             | `{ close: () => void }` |
| `footer`  | Footer content (buttons, etc.)        | `{ close: () => void }` |

### Usage

```vue
<Modal title="Edit User">
  <template #trigger>
    <Button>Open Modal</Button>
  </template>

  <div class="space-y-4">
    <p>User details form goes here...</p>
  </div>

  <template #footer="{ close }">
    <Button variant="outline" @click="close">Cancel</Button>
    <Button @click="save">Save</Button>
  </template>
</Modal>
```

#### Programmatic Control

```vue
<Modal v-model:show="isOpen" title="Programmatic" description="Controlled via v-model">
  <p>Content...</p>
</Modal>
```

# Lazy Modal & SidePanel

**Import:** `import { Modal, SidePanel } from 'vlite3'`

### Description

For performance optimization, especially when dealing with heavy API calls or complex components, use the `body` prop to lazy-load the content. The component passed to `body` will only be rendered when the Modal or SidePanel is opened.

### Usage

#### 1. Define the Lazy Component (`UserInfo.vue`)

This component executes its setup/API calls only when mounted (i.e., when the modal opens).

```vue
<script setup lang="ts">
// Props passed from the parent via 'body-props' or direct binding on Modal/SidePanel
const props = defineProps<{
  user: { name: string; email: string }
  close?: () => void // Automatically passed by Modal/SidePanel
}>()

// Operations here (e.g., fetching details) run only when modal opens
console.log('UserInfo mounted, fetching data for:', props.user.name)
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-lg font-bold">{{ user.name }}</h2>
    <p class="text-gray-600">{{ user.email }}</p>
    <div class="flex justify-end">
      <button @click="close" class="btn btn-secondary">Close</button>
    </div>
  </div>
</template>
```

#### 2. Implement Parent (`Users.vue`)

Pass the component reference to the `body` prop.
Any additional props set on the `Modal` (like `:user="user"`) are automatically passed to the `body` component. You can also use `:body-props="{ user: currentUser }"` for explicit prop passing.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import UserInfo from './UserInfo.vue' // Import the component definition, do not instantiate
import { Modal, Button } from 'vlite3'

const currentUser = ref({
  name: 'John Doe',
  email: 'john@example.com',
})
</script>

<template>
  <Modal title="Edit User" :body="UserInfo" :user="currentUser">
    <!-- :user="currentUser" is automatically passed to UserInfo props -->
    <template #trigger>
      <Button>Open User Info</Button>
    </template>
  </Modal>
</template>
```

### Key Benefits

- **Performance**: Child components are not mounted/created until the modal is actually opened.
- **Efficiency**: Heavy operations (API calls, complex computations) in the child's `setup` or `onMounted` hook are deferred.
- **Clean State**: Each open creates a fresh instance of the component (unless kept alive externally), avoiding stale state issues.

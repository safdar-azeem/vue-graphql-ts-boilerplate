# Frontend Architecture

Stack:

- Vue 3
- GraphQL (vue-apollo-client)
- Tailwind v4
- vlite3 (UI system)

This file defines how the project MUST use these libraries.

---

# 1. GraphQL Layer — vue-apollo-client

Purpose:

- Typed queries/mutations
- Auto code generation
- Token handling (cookies)
- SSR support
- Offline mutation queue
- Smart refetch

Rules:

- All operations live in `.graphql` files.
- NEVER write raw Apollo queries in components.
- ALWAYS use generated composables from `src/graphql/generated.ts`.

Patterns:

Query (SSR):
await useMeQuery()

Query (Client):
useMeQuery()

❌ Reactive variables auto-refetch, DO NOT use `ref` or `computed` for query variables.

Mutation:
const { mutate } = useLoginMutation()
await mutate(payload)

Offline support is enabled in this project.
If the network is unavailable, mutations are queued and replayed when connection returns.

Multi-query:
useMultiQuery(queries, ['useQueryA', 'useQueryB'])

Token utilities:

- setToken()
- getToken()
- removeToken()
- useKeepCookieAlive()

Automatically refreshed when activity is detected

Token is auto-attached to requests.

---

# 2. UI Layer — vlite3

Purpose:

- Tailwind-based components
- Semantic theming
- Dark mode
- Schema-driven forms
- Global upload registry

Import pattern:
import { Button, Input, Form } from 'vlite3'

---

# Theming System (Semantic Only)

Never hardcode colors. Use semantic classes. vlite3 uses a semantic theming system inspired by **shadcn/ui** and compatible with **Tailwind CSS v4**. All colors are defined as CSS variables, making it easy to customize the look and feel of your application including Dark Mode support.

## Core Classes

- bg-background, bg-white → app background
- text-foreground → main text
- text-muted → secondary text
- bg-card → surfaces
- border → default borders with defined color.
- rounded → global radius

### Semantic Colors

You can customize these colors in your CSS by overriding the variables in `:root` or `.dark` classes (if you are using a class-based dark mode switcher).

| Variable                   | Class Name                    | Description             | Recommended Usage                                                           |
| :------------------------- | :---------------------------- | :---------------------- | :-------------------------------------------------------------------------- |
| `--background`             | `bg-background`               | Default page background | The main background color of your app.                                      |
| `--foreground`             | `text-foreground`             | Default text color      | The primary text color for content.                                         |
| `--card`                   | `bg-card`                     | Card background         | Little Gray Background for cards, containers, surfece, panels, and dialogs. |
| `--primary`                | `bg-primary`                  | Primary brand color     | Used for main actions (buttons, active states).                             |
| `--primary-foreground`     | `text-primary-foreground`     | Primary text color      | Text color for content on top of primary background.                        |
| `--secondary`              | `bg-secondary`                | Secondary background    | Used for secondary actions or muted sections.                               |
| `--secondary-foreground`   | `text-secondary-foreground`   | Secondary text color    | Text color for content on top of secondary background.                      |
| `--muted`                  | `bg-muted`                    | Muted background        | Subtle backgrounds (e.g., table headers, disabled states).                  |
| `--muted`                  | `text-muted`                  | Muted Text              | Secondary text, Unactive Link, description.                                 |
| `--muted-foreground`       | `text-muted-foreground`       | Muted text color        | Secondary text, hints, placeholders.                                        |
| `--accent`                 | `bg-accent`                   | Accent background       | Used for hover states, selection highlights.                                |
| `--accent-foreground`      | `text-accent-foreground`      | Accent text color       | Text color on accent backgrounds.                                           |
| `--destructive`            | `bg-destructive`              | Destructive color       | Used for error states and destructive actions.                              |
| `--destructive-foreground` | `text-destructive-foreground` | Destructive text color  | Text color on destructive backgrounds.                                      |
| `--border`                 | `border`                      | Default border color    | Borders for inputs, cards, and dividers.                                    |
| `--input`                  | `border-input`                | Input border color      | Borders specifically for form inputs.                                       |
| `--ring`                   | `ring-ring`                   | Focus ring color        | Outline color for focused elements.                                         |
| `--radius`                 | `rounded`                     | Border radius           | Global border radius for components.                                        |

### Extended Color Variants

For more complex components, vlite3 provides extended variants for main semantic colors (`primary`, `danger`, `warning`, `info`, `success`). These are useful for building nuanced UIs with subtle backgrounds, hover states, and accessible text.

| Base Color  | Variant Variables                                                                                       | Usage Description                                                                                                                                                                                           |
| :---------- | :------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Primary** | `--color-primary-light`<br>`--color-primary-dark`<br>`--color-primary-fg`<br>`--color-primary-fg-light` | **Light**: Subtle background (e.g., 10% opacity).<br>**Dark**: Hover state for the main color.<br>**Fg**: Text color on top of the _main_ color.<br>**Fg-Light**: Text color on top of the _light_ variant. |
| **Danger**  | `--color-danger-light`<br>`--color-danger-dark`<br>`--color-danger-fg`<br>`--color-danger-fg-light`     | **Light**: Error backgrounds (alerts).<br>**Dark**: Hover state for destructive buttons.<br>**Fg**: Text on destructive buttons.<br>**Fg-Light**: Text on error alerts.                                     |
| **Warning** | `--color-warning-light`<br>`--color-warning-dark`<br>`--color-warning-fg`<br>`--color-warning-fg-light` | **Light**: Warning backgrounds.<br>**Dark**: Active/Determined warning states.<br>**Fg**: Text on warning badges.<br>**Fg-Light**: Text on warning backgrounds.                                             |
| **Success** | `--color-success-light`<br>`--color-success-dark`<br>`--color-success-fg`<br>`--color-success-fg-light` | **Light**: Success backgrounds (toasts).<br>**Dark**: Hover/Active success actions.<br>**Fg**: Text on success buttons.<br>**Fg-Light**: Text on success backgrounds.                                       |
| **Info**    | `--color-info-light`<br>`--color-info-dark`<br>`--color-info-fg`<br>`--color-info-fg-light`             | **Light**: Info backgrounds.<br>**Dark**: Hover/Active info actions.<br>**Fg**: Text on info buttons.<br>**Fg-Light**: Text on info backgrounds.                                                            |

**Example Usage:**

```html
<!-- A success badge with subtle background and matching text -->
<div class="bg-success-light text-success-fg-light border border-success/20">
  Operation Completed
</div>

<!-- A danger button with hover effect -->
<button class="bg-danger text-danger-fg hover:bg-danger-dark">Delete</button>
```

### Additional Colors

vlite3 also provides additional utility colors for specific feedback states:

| Variable          | Class Name                   | Description                             |
| :---------------- | :--------------------------- | :-------------------------------------- |
| `--color-success` | `text-success`, `bg-success` | For success messages/badges.            |
| `--color-warning` | `text-warning`, `bg-warning` | For warning messages/badges.            |
| `--color-info`    | `text-info`, `bg-info`       | For informational messages/badges.      |
| `--color-danger`  | `text-danger`, `bg-danger`   | Alias for destructive in some contexts. |

Dark mode:
Override variables inside `.dark`.

---

# Forms & Uploads

Form is schema-driven.

File inputs automatically:

- Use global `services.upload`
- Upload in parallel
- Replace File objects with returned URLs
- Emit cleaned payload

Upload service MUST return a URL string.

## 4. Usage

Import components directly in your Vue files:

```vue
<script setup>
import { Button, Input, Form } from 'vlite3'

// The form will automatically use the global upload service defined in main.ts
const schema = [
  {
    name: 'avatar',
    label: 'Profile Picture',
    type: 'avatarUpload',
  },
  {
    name: 'documents',
    label: 'Attachments',
    type: 'fileUploader',
    props: { multiple: true },
  },
]

const handleSubmit = (payload) => {
  // payload.values.avatar will be a URL string (e.g., "https://api...")
  // payload.values.documents will be an array of URL strings
  console.log(payload.values)
}
</script>

<template>
  <div class="p-4 space-y-4">
    <Button>Click Me</Button>
    <Input placeholder="Type here..." />

    <Form :schema="schema" @onSubmit="handleSubmit" />
  </div>
</template>
```

---

# Data Flow

.graphql → auto composables → Vue component → vlite3 UI

Upload:
Form → upload service → URL → mutation

Auth:
Login → setToken() → cookie → auto attached to GraphQL

---

## ✅ Components

- **Button**
- **ButtonGroup**
- **Icon**
- **Label**
- **Badge**
- **Chip**
- **Logo**
- **Navbar**
- **SidebarMenu**
- **SidePanel**
- **Masonry Grid**
- **ThemeToggle**

### Inputs & Forms

- **Input**
- **Textarea**
- **CheckBox**
- **Switch**
- **ChoiceBox**
- **Slider**
- **OTPInput**
- **DatePicker**
- **ColorPicker**
- **FilePicker**
- **AvatarUploader**
- **IconPicker**
- **MultiSelect**
- **Form**
- **CustomFields**

### Data Display

- **Avatar**
- **Accordion**
- **Carousel**
- **DataTable**
- **Pagination**
- **Timeline**
- **Heatmap**
- **PricingPlan**
- **FileTree**
- **Workbook**
- **Tabes**

### Feedback & Overlays

- **Alert**
- **Modal**
- **ConfirmationModal**
- **ToastNotification**
- **Tooltip**
- **Dropdown**

# Hard Rules

- No manual Apollo setup inside components.
- No hardcoded colors.
- All uploads via vlite3 registry.
- All GraphQL via generated hooks only.
- ❌ border-border | ✅ border
- ❌ rounded-rounded | ✅ rounded

End.

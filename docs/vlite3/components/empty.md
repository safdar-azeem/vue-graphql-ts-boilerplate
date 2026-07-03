# Empty

**Import:** `import { Empty } from 'vlite3'`

A versatile component used to display empty states when no data is available. It comes with 12 distinct, highly-polished variants designed for modern SaaS interfaces, ranging from simple icons to elaborate structural skeletons and minimalist focus blocks.

The component inherits its default variant from the global `vlite3` configuration, but can be overridden locally on a per-component basis.

---

## Props

| Prop               | Type               | Default | Description                                                                 |
| :----------------- | :----------------- | :------ | :-------------------------------------------------------------------------- |
| `title`            | `string`           | `'No data found'` | The main title of the empty state. |
| `titleI18n`        | `string`           | —       | An i18n key to use for the title, translated automatically. |
| `description`      | `string`           | `'There is nothing to display here right now.'` | The descriptive subtitle text. Supports HTML. |
| `descriptionI18n`  | `string`           | —       | An i18n key to use for the description, translated automatically. |
| `icon`             | `string`           | `'lucide:inbox'` | The icon to display, using any valid Iconify string format. |
| `variant`          | `EmptyVariant`     | `'variant1'` | The visual variant to render. Accepts `'variant1'` through `'variant11'`. |

---

## Slots

| Slot Name | Description |
| :-------- | :---------- |
| `action`  | A slot typically used for rendering call-to-action buttons below the description. |
| `default` | The default slot, rendered inside the component block for custom additions. |

---

## Usage

### Basic Local Usage

Pass a title and description to quickly render a clean empty state. By default, it will use `'variant1'` unless globally configured otherwise.

```vue
<script setup lang="ts">
import { Empty, Button } from 'vlite3'
</script>

<template>
  <Empty 
    title="No Habits Tracked" 
    description="Your journey is waiting. Start building consistency today by defining your first daily ritual."
    icon="lucide:sparkles"
    variant="variant10"
  >
    <template #action>
      <Button variant="primary">Get Started</Button>
    </template>
  </Empty>
</template>
```

---

## Global Configuration

You can set a default empty state variant for your entire application during plugin initialization. This ensures consistent empty states across all your data tables, lists, and pages without manually passing the `variant` prop every time.

```ts
// main.ts
import { createApp } from 'vue'
import { createVLite } from 'vlite3'
import App from './App.vue'

const app = createApp(App)

const vlite = createVLite({
  components: {
    empty: {
      variant: 'variant10', // Set default variant for all Empty components
    },
  },
})

app.use(vlite)
app.mount('#app')
```

---

## Variants Overview

The `Empty` component relies on its unique variants to match different parts of an application:

- **Variant 1 (Clean):** Minimalist focused on a clean icon display.
- **Variant 2 (Horizontal):** Useful for compact or wide row layouts.
- **Variant 3 (Typographic):** Dramatic, larger text sizes with a focus on copy.
- **Variant 4 (Structural):** A split wireframe layout mimicking a dashboard, great for full-page empty apps.
- **Variant 5 (Atmospheric):** A flat, grey minimalist block with a large resting icon.
- **Variant 6 (Interactive):** A clear dashed-border dropzone style layout.
- **Variant 7 (Narrative):** An offset timeline tree structure, implying a user journey.
- **Variant 8 (Floating):** A crisp, simple elevated card centered in the viewport.
- **Variant 9 (Split):** Split visual layout aesthetics.
- **Variant 10 (Essential):** An ultra-clean left-aligned block with zero bounding boxes. Pure data.
- **Variant 11 (Large Text):** Emphasized typography layout structure.

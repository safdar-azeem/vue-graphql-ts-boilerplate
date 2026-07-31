# Timeline

**Import:** `import { Timeline } from 'vlite3'`

---

### Props

| Prop            | Type                    | Default      | Description                                         |
| :-------------- | :---------------------- | :----------- | :-------------------------------------------------- |
| `steps`         | `TimelineStep[]`        | required     | Array of steps to display                           |
| `activeStep`    | `number`                | `0`          | Index of current active step                        |
| `direction`     | `TimelineDirection`     | `horizontal` | Layout direction (`horizontal` or `vertical`)       |
| `textPosition`  | `TimelineTextPosition`  | `bottom`     | Position of text relative to step (horizontal only) |
| `lineStyle`     | `TimelineLineStyle`     | `solid`      | Connector line style (`solid` or `dashed`)          |
| `indicatorType` | `TimelineIndicatorType` | `icon`       | Indicator style (`icon`, `number`, or `dot`)        |
| `clickable`     | `boolean`               | `false`      | Enable click events on steps                        |
| `class`         | `string`                | —            | Custom class for the wrapper element                |

---

### Types

```ts
export type TimelineProgressStatus = 'completed' | 'current' | 'upcoming'
export type TimelineDirection = 'horizontal' | 'vertical'
export type TimelineTextPosition = 'bottom' | 'right'
export type TimelineLineStyle = 'solid' | 'dashed'
export type TimelineIndicatorType = 'icon' | 'number' | 'dot'

export interface TimelineStep {
  id: string | number
  title?: string
  titleI18n?: string
  subtitle?: string
  subtitleI18n?: string
  description?: string
  descriptionI18n?: string
  date?: string
  icon?: string
  status?: string // Business-logic badge label (e.g. 'Pending', 'Approved')
  progressStatus?: TimelineProgressStatus // Explicit visual override
  component?: any // Dynamic component rendered in the body slot
  componentProps?: Record<string, any>
  [key: string]: any // Any extra payload your slot templates need
}
```

---

### Events

| Event        | Payload                               | Description                                           |
| :----------- | :------------------------------------ | :---------------------------------------------------- |
| `step-click` | `(step: TimelineStep, index: number)` | Emitted when a step is clicked (`clickable` required) |

---

### Slots

Every slot receives the current `step` object and its `index` as slot props.

| Slot        | Scope             | Description                                                                |
| :---------- | :---------------- | :------------------------------------------------------------------------- |
| `indicator` | `{ step, index }` | Replaces the entire indicator (icon / number / dot)                        |
| `title`     | `{ step, index }` | Replaces the step title text                                               |
| `subtitle`  | `{ step, index }` | Replaces the subtitle / date line beneath the title                        |
| `status`    | `{ step, index }` | Replaces the status badge shown to the right of the title row              |
| `body`      | `{ step, index }` | Injected below the title/subtitle block — great for cards, avatars, extras |
| `content`   | `{ step, index }` | Takes over the **entire** text area; use when you need full layout freedom |

> **Slot priority:** `content` overrides everything inside the text area.  
> `title`, `subtitle`, `status`, and `body` are composable sub-slots within the default layout.

---

### Usage

#### Basic Horizontal

```vue
<Timeline
  :steps="[
    { id: 1, title: 'Ordered', icon: 'lucide:shopping-cart' },
    { id: 2, title: 'Processing', icon: 'lucide:settings' },
    { id: 3, title: 'Shipped', icon: 'lucide:truck' },
    { id: 4, title: 'Delivered', icon: 'lucide:check' },
  ]"
  :active-step="1"
  direction="horizontal" />
```

---

#### Vertical — Numbered + Dashed Line + `#body` Slot

Use `#body` to inject content **below** the title/subtitle without replacing the header row.  
Extra fields on each step object (e.g. `user`) are passed through to your template via slot props.

```vue
<script setup lang="ts">
import type { TimelineStep } from 'vlite3'

const approvalSteps: TimelineStep[] = [
  {
    id: 1,
    title: 'step',
    subtitle: 'Initial Review',
    status: 'Pending',
    user: { name: 'Private Development Corp', role: 'Project Owner', initials: 'PD' },
  },
  {
    id: 2,
    title: 'step',
    subtitle: 'Technical Review',
    status: 'Pending',
    user: {
      name: 'XYZ Builders',
      role: 'Project Contractor',
      img: 'https://i.pravatar.cc/150?u=1',
    },
  },
  {
    id: 3,
    title: 'step',
    subtitle: 'Final Review',
    status: 'Pending',
    user: { name: 'Employee 1', role: 'Consultant', img: 'https://i.pravatar.cc/150?u=2' },
  },
]
</script>

<template>
  <Timeline
    :steps="approvalSteps"
    :active-step="1"
    direction="vertical"
    indicator-type="number"
    line-style="dashed">
    <!-- #body is rendered below title+subtitle, above the connector line -->
    <template #body="{ step }">
      <div class="mt-4 flex items-center gap-4 p-4 bg-muted/20 rounded-xl border">
        <img v-if="step.user.img" :src="step.user.img" class="w-12 h-12 rounded-lg object-cover" />
        <div
          v-else
          class="w-12 h-12 rounded-lg bg-muted flex items-center justify-center font-bold">
          {{ step.user.initials }}
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-semibold">{{ step.user.name }}</span>
          <span class="text-xs text-muted-foreground">{{ step.user.role }}</span>
        </div>
      </div>
    </template>
  </Timeline>
</template>
```

---

#### Vertical — Dot Indicator + Full `#content` Override

Use `#content` when you need **complete control** over the entire text area (title, status badge, body — everything).

```vue
<script setup lang="ts">
import type { TimelineStep } from 'vlite3'

const reviewSteps: TimelineStep[] = [
  {
    id: 1,
    label: 'Step 1',
    title: 'Step completed, moving forward',
    date: '06 March 2026 1:26 am',
    status: 'Completed',
    logo: 'lucide:history',
  },
  {
    id: 2,
    label: 'Step 1',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date: '06 March 2026 1:26 am',
    status: 'Approved',
    logo: 'lucide:check',
  },
  {
    id: 3,
    label: 'Step 1',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date: '06 March 2026 1:26 am',
    status: 'In Progress',
    logo: 'lucide:loader-2',
  },
]
</script>

<template>
  <Timeline :steps="reviewSteps" :active-step="2" direction="vertical" indicator-type="dot">
    <!-- #content replaces the entire text area for each step -->
    <template #content="{ step }">
      <div class="border rounded-xl p-5 bg-card shadow-sm mb-2 hover:shadow-md transition-shadow">
        <div class="flex justify-between items-start">
          <div class="flex gap-4 items-center mb-4">
            <div class="h-12 w-12 rounded-xl border bg-background flex items-center justify-center">
              <Icon :icon="step.logo" class="h-6 w-6 text-muted-foreground" />
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-semibold">Acme</span>
              <span class="text-xs text-muted-foreground">{{ step.label }}</span>
            </div>
          </div>
          <span
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border">
            {{ step.status }}
          </span>
        </div>
        <div class="flex justify-between items-end mt-2">
          <p class="text-sm max-w-md">{{ step.title }}</p>
          <span class="text-xs text-muted-foreground">{{ step.date }}</span>
        </div>
      </div>
    </template>
  </Timeline>
</template>
```

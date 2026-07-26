# Splitter

A layout primitive that allows users to resize adjacent vertical or horizontal panels, commonly used in IDEs, data viewers, and complex dashboards.

## Overview

The `Splitter` component gives you an out-of-the-box resizable divider separating two slots: `#start` and `#end`. The sizing dynamically calculates percentages upon dragging, ensuring layout fluidity across different screen sizes.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Splitter } from 'vlite3'

const splitPercentage = ref(40)
</script>

<template>
  <div class="h-[500px] border">
    <Splitter v-model="splitPercentage" layout="horizontal" :min="20" :max="80">
      <template #start>
        <div class="p-4 bg-muted">Left Panel</div>
      </template>
      <template #end>
        <div class="p-4">Right Panel</div>
      </template>
    </Splitter>
  </div>
</template>
```

## Props

| Prop         | Type                       | Default        | Description                                                       |
|:-------------|:---------------------------|:---------------|:------------------------------------------------------------------|
| `layout`     | `'horizontal' \| 'vertical'`| `'horizontal'` | Splitting direction. Horizontal splits left/right, Vertical top/bottom. |
| `modelValue` | `number`                   | `50`           | The current position of the splitter as a percentage (0 to 100). |
| `min`        | `number`                   | `10`           | The minimum allowed percentage size for the `#start` panel.       |
| `max`        | `number`                   | `90`           | The maximum allowed percentage size for the `#start` panel.       |
| `class`      | `string`                   | `''`           | Additional CSS classes for the outermost wrapping element.        |
| `lineClass`  | `string`                   | `''`           | Additional CSS classes for the splitter line (resize handle).     |
| `lineStyle`  | `CSSProperties`            | —              | Inline styles for the splitter line (resize handle).              |

## CSS hooks

The splitter line always includes the static class `vl-splitter__line`, so you can style it from your project CSS without passing props:

```css
.vl-splitter__line {
  background-color: hsl(var(--primary) / 0.15);
}

.vl-splitter__line:hover {
  background-color: hsl(var(--primary) / 0.3);
}
```

## Customizing the splitter line

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Splitter } from 'vlite3'

const splitPercentage = ref(40)
</script>

<template>
  <div class="h-[500px] border">
    <Splitter
      v-model="splitPercentage"
      line-class="bg-primary/20 hover:bg-primary/40"
      :line-style="{ width: '4px' }">
      <template #start>
        <div class="p-4 bg-muted">Left Panel</div>
      </template>
      <template #end>
        <div class="p-4">Right Panel</div>
      </template>
    </Splitter>
  </div>
</template>
```

## Slots

| Name    | Description                                             |
|:--------|:--------------------------------------------------------|
| `start` | The primary panel rendered before the resize handle.    |
| `end`   | The secondary panel rendered after the resize handle.   |

## Events

| Event               | Payload  | Description                                 |
|:--------------------|:---------|:--------------------------------------------|
| `update:modelValue` | `number` | Fires continuously while the handle is dragged, emitting the new position percentage. |

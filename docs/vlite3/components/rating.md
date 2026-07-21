# Rating

The `Rating` component allows users to view and provide ratings using highly customizable icons (stars, hearts, emojis, etc.). It supports half-values, read-only modes, custom active/inactive states, and progressive distribution charts.

## Base Components

- `Rating`
- `ReviewSummary`

## Usage

```vue
<script setup>
import { Rating, ReviewSummary } from 'vlite3'
import { ref } from 'vue'

const rating = ref(3)
</script>

<template>
  <Rating v-model="rating" />
</template>
```

## Features

- **Interactive Half Values**: Pass `allow-half` to select 0.5 increments.
- **Solid vs Outline Styling**: `solid` prop (`true` by default) automatically ensures the selected rating is visually filled by injecting `fill-current`. You can set `:solid="false"` for outline styling.
- **Custom Icons & Emojis**: Supply a specific `lucide` icon or an entire Array of different emojis through `icon` and `active-icon`.
- **Review Summary UI**: Visualizes the distribution of votes seamlessly using `ReviewSummary`.

## Props

### Rating

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `modelValue` | `number` | `0` | The current value of the rating. |
| `max` | `number` | `5` | The maximum possible rating value. |
| `allowHalf` | `boolean` | `false` | Enables interactive half-star selection. |
| `readonly` | `boolean` | `false` | When true, the rating cannot be modified. |
| `showText` | `boolean` | `false` | Displays the numeric rating (e.g., 4.5 / 5) next to the icons. |
| `icon` | `string \| string[]` | `'lucide:star'` | The default icon(s) to display for unselected values. |
| `activeIcon` | `string \| string[]` | `'lucide:star'` | The icon(s) to display for active/filled values. |
| `activeColor` | `string` | `'text-amber-400'` | Tailwind classes applied to the active icons. |
| `inactiveColor` | `string` | `'text-muted-foreground/30'` | Tailwind classes applied to the inactive/empty icons. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | The size of the icons. |
| `clearable` | `boolean` | `false` | If true, clicking the active icon again resets the value to 0. |
| `solid` | `boolean` | `true` | If true, applies `fill-current` to make active icons solid. Set to `false` for outline styles. |
| `disabled` | `boolean` | `false` | Disables interaction and dims the component. |

### ReviewSummary

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `ratingDistribution` | `array` | `[]` | Array of objects `{ rating: number, percentage: number, count?: number }`. |
| `totalReviews` | `number` | `undefined` | Total number of reviews (fallback is calculated from count). |
| `averageRating` | `number` | `undefined` | The average rating (fallback is calculated from distribution). |
| `showTotal` | `boolean` | `true` | Shows the "Based on N global ratings" text. |

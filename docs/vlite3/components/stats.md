# Stats

**Import:** `import { Stats } from 'vlite3'`

### Description

A flexible and fully-typed grid component for displaying key metrics and statistics. Supports multiple visual variants, rich layout modes, icon box customization, trend indicators, and responsive column configurations.

### Props

| Prop           | Type               | Default       | Description                                           |
| :------------- | :----------------- | :------------ | :---------------------------------------------------- |
| `items`        | `StatItemSchema[]` | required      | Array of stat items to display                        |
| `variant`      | `StatsVariant`     | `'outline'`   | Visual style of each card                             |
| `layout`       | `StatsLayout`      | `'layout-1'` | Layout mode for icon and content arrangement          |
| `columns`      | `number \| string` | `4`           | Number of grid columns (1–6)                          |
| `attached`     | `boolean`          | `false`       | Fuse cards together with shared borders (no gaps)     |
| `titleSize`    | `string`           | —             | Custom Tailwind classes for the title text            |
| `valueSize`    | `string`           | —             | Custom Tailwind classes for the value text            |
| `iconSize`     | `string`           | —             | Custom Tailwind classes for the icon (e.g. `w-8 h-8`) |
| `iconBoxShape` | `IconBoxShape`     | `'rounded'`   | Shape of the icon container box                       |
| `iconBoxStyle` | `IconBoxStyle`     | `'filled'`    | Style of the icon container box                       |
| `sparklineHeight` | `number`        | `56`          | Default sparkline height in px for `layout-9`         |
| `class`        | `string`           | —             | Extra CSS class for the outer grid container          |

### Types

```typescript
type StatsVariant = 'solid' | 'outline' | 'shadow' | 'transparent'

type StatsLayout =
  | 'layout-1'
  | 'layout-2'
  | 'layout-3'
  | 'layout-4'
  | 'layout-5'
  | 'layout-6'
  | 'layout-7'
  | 'layout-8'
  | 'layout-9' // Executive sparkline cards

type IconBoxShape = 'rounded' | 'full-rounded' | 'none'
type IconBoxStyle = 'filled' | 'transparent'

interface StatTrend {
  value: string | number
  isPositive?: boolean | null
  neutral?: boolean
  label?: string
  hideIcon?: boolean
}

interface StatItemSchema {
  id: string | number
  title: string
  titleI18n?: string
  value: string | number
  icon?: string
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | string
  trend?: StatTrend
  isPrice?: boolean
  sparkline?: number[] | Array<{ label?: string; value: number; color?: string }>
  sparklineColor?: string
  sparklineFill?: boolean
  sparklineHeight?: number
  [key: string]: any
}
```

### Variants

| Value         | Description                                               |
| :------------ | :-------------------------------------------------------- |
| `outline`     | White/body background with a subtle border (default)      |
| `solid`       | Colored background based on each item's `color` field     |
| `shadow`      | White/body background with a drop shadow and faint border |
| `transparent` | No background or border                                   |

### Layouts

| Value                         | Description                                                      |
| :---------------------------- | :--------------------------------------------------------------- |
| `layout-1`                   | Icon on the left, title and value stacked on the right (default) |
| `layout-2`                  | Title and value on the left, icon pushed to the right            |
| `layout-3`                    | Icon above the title and value                                   |
| `layout-4` | Title at the top; value bottom-left, icon bottom-right           |
| `layout-5`        | Value on top (larger), title below — centered, no icon           |
| `layout-6`               | Icon absolutely positioned at the top-right corner of the card   |
| `layout-7`                   | Colored left border accent with stacked title/value              |
| `layout-8`                   | Inline label and value layout                                    |
| `layout-9`                   | Executive card: icon → title → value → trend → sparkline         |

### Usage

#### Basic Usage

```vue
<script setup>
import { Stats } from 'vlite3'

const items = [
  {
    id: 1,
    title: 'Total Revenue',
    value: '$45,231.89',
    icon: 'lucide:dollar-sign',
    color: 'success',
    trend: { value: '+20.1%', isPositive: true, label: 'from last month' },
  },
  {
    id: 2,
    title: 'Subscriptions',
    value: '+2,350',
    icon: 'lucide:users',
    color: 'primary',
    trend: { value: '+180.1%', isPositive: true, label: 'from last month' },
  },
]
</script>

<template>
  <Stats :items="items" variant="outline" />
</template>
```

#### Variants

```vue
<Stats :items="items" variant="solid" />
<Stats :items="items" variant="shadow" />
<Stats :items="items" variant="transparent" />
```

#### Attached (Fused Borders)

```vue
<Stats :items="items" attached variant="outline" />
<Stats :items="items" attached variant="shadow" />
```

#### Layouts

```vue
<!-- Icon on the right -->
<Stats :items="items" layout="layout-2" />

<!-- Icon above content -->
<Stats :items="items" layout="layout-3" />

<!-- Title top, value bottom-left, icon bottom-right -->
<Stats :items="items" layout="layout-4" />

<!-- Centered: large value on top, title below (no icon) -->
<Stats :items="items" layout="layout-5" />

<!-- Floating icon absolutely positioned at top-right -->
<Stats :items="items" layout="layout-6" variant="shadow" />

<!-- Colored left border accent -->
<Stats :items="items" layout="layout-7" />

<!-- Executive sparkline cards -->
<Stats
  :items="executiveItems"
  layout="layout-9"
  icon-box-shape="full-rounded"
  :sparkline-height="64"
  value-size="text-2xl font-bold"
  title-size="text-xs font-medium" />
```

`layout-9` items accept optional sparkline fields:

```js
{
  id: 'revenue',
  title: 'Total Revenue',
  value: 1250000,
  isPrice: true,
  icon: 'lucide:circle-dollar-sign',
  color: 'info',
  trend: { value: '12.5%', isPositive: true, label: 'vs last period' },
  sparkline: [42, 48, 45, 62, 71, 84, 96],
  sparklineColor: 'var(--color-info)',
  sparklineFill: true,
}
```

#### Icon Box Shape & Style

```vue
<!-- Full rounded (circle) icon box -->
<Stats :items="items" icon-box-shape="full-rounded" />

<!-- No background on icon box, only icon color -->
<Stats :items="items" icon-box-style="transparent" />

<!-- Combining both -->
<Stats :items="items" icon-box-style="transparent" icon-box-shape="full-rounded" />
```

#### Custom Columns

```vue
<Stats :items="items" :columns="3" />
<Stats :items="items" :columns="6" />
```

#### Custom Sizing

```vue
<Stats
  :items="items"
  :columns="2"
  title-size="text-lg font-semibold text-gray-600"
  value-size="text-5xl font-black text-primary"
  icon-size="w-8 h-8" />
```

#### Custom Color (Non-Semantic)

Any hex color string can be passed as the `color` field on an item. The component will derive tinted backgrounds automatically.

```javascript
const items = [
  {
    id: 1,
    title: 'Custom Color',
    value: '9,999',
    icon: 'lucide:star',
    color: '#7c3aed', // Any valid CSS color
  },
]
```

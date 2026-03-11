# Stats

**Import:** `import { Stats } from 'vlite3'`

### Description

A flexible and fully-typed grid component for displaying key metrics and statistics. Supports multiple visual variants, rich layout modes, icon box customization, trend indicators, and responsive column configurations.

### Props

| Prop           | Type            | Default       | Description                                          |
| :------------- | :-------------- | :------------ | :--------------------------------------------------- |
| `items`        | `StatItemSchema[]` | required   | Array of stat items to display                       |
| `variant`      | `StatsVariant`  | `'outline'`   | Visual style of each card                            |
| `layout`       | `StatsLayout`   | `'icon-left'` | Layout mode for icon and content arrangement         |
| `columns`      | `number \| string` | `4`        | Number of grid columns (1–6)                         |
| `attached`     | `boolean`       | `false`       | Fuse cards together with shared borders (no gaps)    |
| `titleSize`    | `string`        | —             | Custom Tailwind classes for the title text           |
| `valueSize`    | `string`        | —             | Custom Tailwind classes for the value text           |
| `iconSize`     | `string`        | —             | Custom Tailwind classes for the icon (e.g. `w-8 h-8`) |
| `iconBoxShape` | `IconBoxShape`  | `'rounded'`   | Shape of the icon container box                      |
| `iconBoxStyle` | `IconBoxStyle`  | `'filled'`    | Style of the icon container box                      |
| `class`        | `string`        | —             | Extra CSS class for the outer grid container         |

### Types
```typescript
type StatsVariant = 'solid' | 'outline' | 'shadow' | 'transparent'

type StatsLayout =
  | 'icon-left'
  | 'icon-right'
  | 'icon-top'
  | 'title-top-icon-bottom-right'
  | 'centered-value-title'
  | 'floating-icon'
  | 'split-bar'

type IconBoxShape = 'rounded' | 'full-rounded' | 'none'
type IconBoxStyle = 'filled' | 'transparent'

interface StatTrend {
  value: string | number
  isPositive?: boolean
  label?: string
}

interface StatItemSchema {
  id: string | number
  title: string
  titleI18n?: string           // I18n translation key for title
  value: string | number
  icon?: string                // Iconify icon ID
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | string
  trend?: StatTrend
  [key: string]: any
}
```

### Variants

| Value         | Description                                             |
| :------------ | :------------------------------------------------------ |
| `outline`     | White/body background with a subtle border (default)    |
| `solid`       | Colored background based on each item's `color` field   |
| `shadow`      | White/body background with a drop shadow and faint border |
| `transparent` | No background or border                                 |

### Layouts

| Value                       | Description                                                      |
| :-------------------------- | :--------------------------------------------------------------- |
| `icon-left`                 | Icon on the left, title and value stacked on the right (default) |
| `icon-right`                | Title and value on the left, icon pushed to the right            |
| `icon-top`                  | Icon above the title and value                                   |
| `title-top-icon-bottom-right` | Title at the top; value bottom-left, icon bottom-right         |
| `centered-value-title`      | Value on top (larger), title below — centered, no icon           |
| `floating-icon`             | Icon absolutely positioned at the top-right corner of the card   |
| `split-bar`                 | Colored left border accent with stacked title/value              |

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
<Stats :items="items" layout="icon-right" />

<!-- Icon above content -->
<Stats :items="items" layout="icon-top" />

<!-- Title top, value bottom-left, icon bottom-right -->
<Stats :items="items" layout="title-top-icon-bottom-right" />

<!-- Centered: large value on top, title below (no icon) -->
<Stats :items="items" layout="centered-value-title" />

<!-- Floating icon absolutely positioned at top-right -->
<Stats :items="items" layout="floating-icon" variant="shadow" />

<!-- Colored left border accent -->
<Stats :items="items" layout="split-bar" />
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


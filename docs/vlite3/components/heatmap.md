# Heatmap

**Import:** `import { Heatmap } from 'vlite3'`

### Description

An interactive heatmap suitable for visualizing activity, time-series data, or density across a grid. Supports both calendar-style (sequential) and coordinate-based (grid) layouts.

### Props

| Prop               | Type                     | Default                | Description                               |
| :----------------- | :----------------------- | :--------------------- | :---------------------------------------- |
| `data`             | `HeatmapDataPoint[]`     | required               | Array of data points                      |
| `layout`           | `'grid' \| 'sequential'` | `'grid'`               | Layout mode                               |
| `interactive`      | `boolean`                | `true`                 | Enable hover and click effects            |
| `showLegend`       | `boolean`                | `true`                 | Show gradient legend at bottom            |
| `showLabels`       | `boolean`                | `false`                | Show values inside cells                  |
| `responsive`       | `boolean`                | `true`                 | Auto-calculate cell size to fit container |
| `minValue`         | `number`                 | calculated             | Min value for color normalization         |
| `maxValue`         | `number`                 | calculated             | Max value for color normalization         |
| `colorConfig`      | `HeatmapColorConfig`     | `{ scheme: 'github' }` | Color scheme configuration                |
| `gridConfig`       | `object`                 | `{ rows: 7, gap: 3 }`  | Config for grid layout                    |
| `sequentialConfig` | `object`                 | `{ itemsPerRow: 7 }`   | Config for sequential layout              |
| `tooltipConfig`    | `object`                 | `{ enabled: true }`    | Tooltip settings                          |
| `minCellSize`      | `number`                 | `8`                    | Minimum cell size                         |
| `maxCellSize`      | `number`                 | `20`                   | Maximum cell size                         |
| `class`            | `string`                 | —                      | Container class                           |
| `cellClass`        | `string`                 | —                      | Extra class for cells                     |
| `emptyCellClass`   | `string`                 | —                      | Extra class for empty cells               |

### Data Format (`HeatmapDataPoint`)

```typescript
interface HeatmapDataPoint {
  x: number // Column index (or linear index for sequential)
  y: number // Row index
  value: number // Value for intensity
  date?: string // Optional ISO date string
  tooltip?: string // Custom tooltip text
  [key: string]: any // Any other data to pass through
}
```

### Events

- `@cell-click` (cell: `HeatmapCell`, event: `MouseEvent`): Emitted when a cell is clicked.
- `@cell-hover` (cell: `HeatmapCell | null`, event: `MouseEvent`): Emitted on mouse enter/leave.

### Usage

#### Basic Activity Grid

```vue
<script setup>
const data = [
  { x: 0, y: 0, value: 5 },
  { x: 0, y: 1, value: 10 },
  // ...
]
</script>

<template>
  <Heatmap
    :data="data"
    :color-config="{ scheme: 'green' }"
    @cell-click="(cell) => console.log(cell)" />
</template>
```

#### Sequential Timeline (Github Style)

```vue
<Heatmap
  :data="data"
  layout="sequential"
  :sequential-config="{ itemsPerRow: 7, gap: 2 }"
  :tooltip-config="{
    formatter: (cell) => `${cell.value} commits on ${cell.date}`,
  }" />
```

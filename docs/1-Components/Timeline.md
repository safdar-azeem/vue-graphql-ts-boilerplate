# Timeline

**Import:** `import { Timeline } from 'vlite3'`

### Props

| Prop           | Type                   | Default      | Description                                   |
| :------------- | :--------------------- | :----------- | :-------------------------------------------- |
| `steps`        | `TimelineStep[]`       | required     | Array of steps to display                     |
| `activeStep`   | `number`               | `0`          | Index of current active step                  |
| `direction`    | `TimelineDirection`    | `horizontal` | Layout direction (`horizontal` or `vertical`) |
| `textPosition` | `TimelineTextPosition` | `bottom`     | Position of text relative to step             |
| `clickable`    | `boolean`              | `false`      | Enable click events on steps                  |
| `class`        | `string`               | —            | Custom class for wrapper                      |

### Types

```ts
export interface TimelineStep {
  id: string | number
  title: string
  titleI18n?: string
  description?: string
  descriptionI18n?: string
  icon?: string
  status?: 'completed' | 'current' | 'upcoming'
}

export type TimelineDirection = 'horizontal' | 'vertical'
export type TimelineTextPosition = 'bottom' | 'right'
```

### Events

- `@step-click`: Emitted when a step is clicked (requires `clickable` prop)

### Usage

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

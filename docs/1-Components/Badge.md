# Badge

**Import:** `import { Badge } from 'vlite3'`

A small inline label component for displaying statuses, categories, or counts. Renders as a rounded pill with a semantic or neutral color variant.

### Props

| Prop      | Type                    | Default     | Description                                    |
| :-------- | :---------------------- | :---------- | :--------------------------------------------- |
| `variant` | `BadgeVariant \| string` | `'default'` | Color theme of the badge                       |
| `class`   | `string`                | `''`        | Additional CSS classes applied to the root     |

### Slots

| Slot      | Description                        |
| :-------- | :--------------------------------- |
| `default` | Badge label / content              |

### Types
```ts
type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'danger'
  | 'warning'
  | 'info'
  | 'success'
  | 'purple'
  | 'teal'
  | 'indigo'
  | 'orange'
  | 'pink'
  | 'cyan'
```

### Variants

| Value       | Description                                                 |
| :---------- | :---------------------------------------------------------- |
| `default`   | Filled primary background with primary foreground text      |
| `secondary` | Secondary subtle background with matching border            |
| `outline`   | Transparent background with visible border, foreground text |
| `danger`    | Red semantic color (subtle background + border)             |
| `warning`   | Amber/yellow semantic color                                 |
| `info`      | Blue semantic color                                         |
| `success`   | Green semantic color                                        |
| `purple`    | Purple extended semantic color                              |
| `teal`      | Teal extended semantic color                                |
| `indigo`    | Indigo extended semantic color                              |
| `orange`    | Orange extended semantic color                              |
| `pink`      | Pink extended semantic color                                |
| `cyan`      | Cyan extended semantic color                                |

> The `variant` prop also accepts any `string` to support dynamic or custom extended themes.

### Usage
```vue
<!-- Base -->
<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>

<!-- Semantic colors -->
<Badge variant="success">Completed</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Failed</Badge>
<Badge variant="info">Processing</Badge>

<!-- Extended colors -->
<Badge variant="purple">Beta</Badge>
<Badge variant="teal">Featured</Badge>
<Badge variant="indigo">New</Badge>

<!-- With custom class -->
<Badge variant="success" class="text-sm px-3">Large Badge</Badge>
```


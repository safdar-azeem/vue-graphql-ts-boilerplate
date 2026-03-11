# ProgressBar

**Import:** `import { ProgressBar } from 'vlite3'`

### Description

A versatile progress bar component supporting linear and circular modes with striped, animated, and indeterminate states.

### Props

| Prop            | Type                     | Default          | Description                              |
| :-------------- | :----------------------- | :--------------- | :--------------------------------------- |
| `modelValue`    | `number`                 | required         | Current progress (0-100)                 |
| `type`          | `'linear' \| 'circular'` | `'linear'`       | Visual style mode                        |
| `variant`       | `ProgressBarVariant`     | `'primary'`      | Color theme                              |
| `size`          | `ProgressBarSize`        | `'md'`           | Size preset                              |
| `showValue`     | `boolean`                | `false`          | Show percentage label                    |
| `label`         | `string`                 | —                | Custom text label (overrides percentage) |
| `indeterminate` | `boolean`                | `false`          | Loading state without specific value     |
| `striped`       | `boolean`                | `false`          | Enable striped background (Linear only)  |
| `animated`      | `boolean`                | `false`          | Animate stripes (Linear only)            |
| `height`        | `string \| number`       | —                | Custom height (Linear)                   |
| `width`         | `string \| number`       | —                | Custom width (Circular)                  |
| `color`         | `string`                 | —                | Custom hex color                         |
| `trackColor`    | `string`                 | —                | Custom track color                       |
| `strokeWidth`   | `number`                 | —                | Custom stroke thickness (Circular)       |
| `rounded`       | `string`                 | `'rounded-full'` | Border radius class                      |

### Types

```ts
type ProgressBarVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'gradient'
type ProgressBarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

### Usage

```vue
<ProgressBar :model-value="45" variant="success" show-value />

<ProgressBar type="circular" :model-value="75" size="lg" />

<ProgressBar indeterminate striped animated variant="warning" />

<ProgressBar type="circular" :model-value="90" color="#6366f1" track-color="#e0e7ff" :width="120" />
```

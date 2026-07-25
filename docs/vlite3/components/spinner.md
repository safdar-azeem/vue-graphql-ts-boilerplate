# Spinner

**Import:** `import { Spinner } from 'vlite3'`

### Props

| Prop      | Type             | Default   | Description        |
| :-------- | :--------------- | :-------- | :----------------- |
| `size`    | `SpinnerSize`    | `md`      | Dimensions         |
| `color`   | `SpinnerColor`   | `current` | Color theme        |
| `variant` | `SpinnerVariant` | `border`  | Visual style       |
| `class`   | `string`         | —         | Custom CSS classes |

### Types

```ts
type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type SpinnerColor = 'current' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'white'
type SpinnerVariant = 'border' | 'dots' | 'bars' | 'ping'
```

### Usage

```vue
<Spinner />
<Spinner variant="dots" size="lg" color="primary" />
```

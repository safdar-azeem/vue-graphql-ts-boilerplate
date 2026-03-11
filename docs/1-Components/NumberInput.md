# NumberInput

**Import:** `import { NumberInput } from 'vlite3'`

### Props

| Prop          | Type                 | Default     | Description             |
| :------------ | :------------------- | :---------- | :---------------------- |
| `modelValue`  | `number`             | `undefined` | Binding (`v-model`)     |
| `min`         | `number`             | —           | Minimum value           |
| `max`         | `number`             | —           | Maximum value           |
| `step`        | `number`             | `1`         | Increment step          |
| `variant`     | `NumberInputVariant` | `split`     | Visual style            |
| `mode`        | `NumberInputMode`    | `outline`   | Background/border style |
| `size`        | `NumberInputSize`    | `md`        | Dimensions              |
| `rounded`     | `NumberInputRounded` | `md`        | Border radius           |
| `placeholder` | `string`             | —           | Input placeholder       |
| `name`        | `string`             | —           | Input name attribute    |
| `id`          | `string`             | —           | Input ID attribute      |
| `disabled`    | `boolean`            | `false`     | Disable interaction     |
| `readonly`    | `boolean`            | `false`     | Read-only state         |

### Types

```ts
type NumberInputVariant = 'split' | 'stacked'
type NumberInputMode = 'solid' | 'outline' | 'ghost'
type NumberInputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type NumberInputRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
```

### Usage

```vue
<NumberInput v-model="quantity" :min="1" :max="10" />
<NumberInput v-model="price" variant="stacked" mode="ghost" />
```

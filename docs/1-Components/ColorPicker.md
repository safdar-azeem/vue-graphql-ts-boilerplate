# ColorPicker

**Import:** `import { ColorPicker } from 'vlite3'`

### Props

| Prop         | Type                   | Default     | Description                   |
| :----------- | :--------------------- | :---------- | :---------------------------- |
| `modelValue` | `string`               | `'#000000'` | Hex color binding             |
| `size`       | `'sm' \| 'md' \| 'lg'` | `md`        | Picker size                   |
| `position`   | `TooltipPlacement`     | `bottom`    | Popover placement             |
| `disabled`   | `boolean`              | `false`     | Disable picker                |
| `btnProps`   | `ButtonProps`          | —           | Overrides for dropdown button |
| `showInput`  | `boolean`              | `true`      | Show hex input and eyedropper |

### Usage

```vue
<ColorPicker v-model="accentColor" />
```

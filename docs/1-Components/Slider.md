# Slider

**Import:** `import { Slider } from 'vlite3'`

### Props

| Prop           | Type                           | Default | Description          |
| :------------- | :----------------------------- | :------ | :------------------- |
| `modelValue`   | `number`                       | `0`     | Value binding        |
| `min`          | `number`                       | `0`     | Minimum value        |
| `max`          | `number`                       | `100`   | Maximum value        |
| `step`         | `number`                       | `1`     | Step interval        |
| `label`        | `string`                       | —       | Label text           |
| `labelI18n`    | `string`                       | —       | I18n key for label   |
| `labelClass`   | `string`                       | —       | CSS class for label  |
| `icon`         | `string`                       | —       | Icon next to label   |
| `showValue`    | `boolean`                      | `true`  | Show numerical value |
| `size`         | `'xs' \| 'sm' \| 'md' \| 'lg'` | `md`    | Dimensions           |
| `centerOrigin` | `boolean`                      | —       | Force bipolar mode   |
| `disabled`     | `boolean`                      | `false` | Disable interaction  |

### Events

- `@update:modelValue`: Emitted as value changes (v-model)
- `@change`: Emitted when change completes (drag end)
- `@iconClick`: Emitted when the label or icon wrapper is clicked

### Usage

```vue
<Slider label="Volume" v-model="volume" :max="100" />
<Slider label="Balance" v-model="balance" :min="-50" :max="50" icon="lucide:scale" />
```

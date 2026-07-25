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
| `valueClass`   | `string`                       | —       | CSS class for value  |
| `icon`         | `string`                       | —       | Icon next to label   |
| `showValue`    | `boolean`                      | `true`  | Show numerical value |
| `size`         | `'xs' \| 'sm' \| 'md' \| 'lg'` | `md`    | Dimensions           |
| `variant`      | `'one' \| 'two'`               | `one`   | Layout variant       |
| `thumbVariant` | `'default' \| 'solid'`         | `default`| Thumb style variant  |
| `centerOrigin` | `boolean`                      | —       | Force bipolar mode   |
| `orientation`  | `'horizontal' \| 'vertical'`   | `horizontal` | Slider orientation  |
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

#### RTL

Under `html[dir=rtl]` (horizontal orientation):

- Label sits on **inline-start** (right), value on **inline-end** (left)
- Track fill grows from the **right**; the thumb position mirrors with the value
- The native `<input type="range">` uses matching `dir="rtl"` so drag/click stay in sync with the painted thumb (moving left increases value)
- Bipolar origin tick and fill rounding use logical edges so they stay correct in both directions

Vertical orientation is unchanged by page direction.

# ColorPicker

**Import:** `import { ColorPicker } from 'vlite3'`

The lower-level `ColorPickerCanvas` primitive is also exported for inline color-editing experiences that should not open a dropdown.

### Props

| Prop         | Type                   | Default     | Description                                                             |
| :----------- | :--------------------- | :---------- | :---------------------------------------------------------------------- |
| `modelValue` | `string`               | `'#000000'` | Hex color binding                                                       |
| `size`       | `'sm' \| 'md' \| 'lg'` | `md`        | Picker size                                                             |
| `position`   | `TooltipPlacement`     | `bottom`    | Popover placement                                                       |
| `disabled`   | `boolean`              | `false`     | Disable picker                                                          |
| `btnProps`   | `ButtonProps`          | —           | Overrides for dropdown button                                           |
| `showInput`  | `boolean`              | `true`      | Show hex input and eyedropper                                           |
| `trigger`    | `'input' \| 'button' \| 'swatch'` | `'input'` | Trigger style for picker                                                |
| `isOpen`     | `boolean`              | —           | Optional controlled popover visibility; omit for internal state         |
| `offset`     | `[number, number]`     | `[0, 8]`    | Popover offset passed to the underlying Dropdown                        |
| `teleport`   | `boolean`              | `true`      | Teleport the popover outside the trigger's DOM hierarchy                |
| `allowReset` | `boolean`              | `false`     | Show reset controls; reset sets the value to `#0000` (transparent)      |

### Events

| Event               | Payload  | Description                                      |
| :------------------ | :------- | :----------------------------------------------- |
| `update:modelValue` | `string` | Emitted when the color changes                   |
| `change`            | `string` | Emitted when the color changes                   |
| `reset`             | `string` | Emitted when reset is used (always `#0000`)      |
| `update:isOpen`     | `boolean` | Emitted whenever popover visibility changes     |
| `open`              | —        | Emitted when the popover opens                    |
| `close`             | —        | Emitted when the popover closes                   |

### Slots

| Name      | Slot Props               | Description                                   |
| :-------- | :----------------------- | :-------------------------------------------- |
| `trigger` | `{ isOpen: boolean }`    | Custom trigger element for the color picker   |

### Usage

```vue
<ColorPicker v-model="accentColor" />
```

### Controlled visibility

Bind `v-model:is-open` when multiple pickers need coordinated visibility. Existing consumers can omit it and keep the default internally managed behavior.

```vue
<ColorPicker
  v-model="accentColor"
  v-model:is-open="accentPickerOpen"
  position="right-start"
  :offset="[0, 10]"
/>
```

### Reset to transparent

Enable `allowReset` to show a clear control on the trigger and a reset button inside the picker menu. Reset writes `#0000` (transparent).

```vue
<ColorPicker v-model="backgroundColor" allow-reset />
```

### Inline color canvas

Use the shared `ColorPickerCanvas` primitive when the picker must render inline. It provides the same color canvas, sliders, eyedropper, sizing, and cleanup behavior used internally by `ColorPicker`.

```vue
<script setup lang="ts">
import { ColorPickerCanvas } from 'vlite3'
</script>

<ColorPickerCanvas
  :color="accentColor"
  show-header
  @update:color="accentColor = $event"
  @close="closeInlineEditor"
/>
```

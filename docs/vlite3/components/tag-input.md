# TagInput

**Import:** `import { TagInput } from 'vlite3'`

A component for inputting a list of string values, such as tags or keywords. Press **Enter**, type a **comma**, or click the **+** button to add a tag. Supports pasting comma-separated values to add multiple tags at once.

### Props

| Prop              | Type                                                              | Default      | Description                              |
| :---------------- | :---------------------------------------------------------------- | :----------- | :--------------------------------------- |
| `modelValue`      | `string[]`                                                        | `[]`         | Binding (`v-model`)                      |
| `placeholder`     | `string`                                                          | `Add tag...` | Input placeholder                        |
| `placeholderI18n` | `string`                                                          | —            | I18n key for the placeholder             |
| `disabled`        | `boolean`                                                         | `false`      | Disable input and tag removal            |
| `maxTags`         | `number`                                                          | —            | Maximum number of tags allowed           |
| `variant`         | `'outline' \| 'solid' \| 'transparent' \| 'outline-b' \| 'floating'` | `outline`    | Visual style of the input                |
| `size`            | `'sm' \| 'md' \| 'lg'`                                            | `md`         | Dimensions (affects input and tag chips) |
| `rounded`         | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'`       | `md`         | Border radius of the input               |
| `error`           | `string`                                                          | —            | Error message / state                    |
| `class`           | `string`                                                          | —            | Custom wrapper class                     |

### Events

- `@update:modelValue`: Emitted when tags are added or removed (array of current tags)
- `@change`: Emitted alongside `update:modelValue` with the new tags array

### Behaviour

- **Adding tags** — Press `Enter`, type `,`, or click the trailing `+` icon.
- **Paste support** — Pasting comma-separated text automatically splits and adds each value as a separate tag. Duplicates are ignored.
- **Duplicates** — A tag that already exists in the list will not be added again.
- **Max limit** — When `maxTags` is set and the limit is reached, the input is disabled and the placeholder changes to *"Max tags reached"*.
- **Removing tags** — Click the `×` button on a tag chip. Disabled when `disabled` is `true`.

### Usage

```vue
<!-- Basic -->
<TagInput v-model="tags" placeholder="Add tag..." />

<!-- With max tags limit -->
<TagInput v-model="tags" :maxTags="5" />

<!-- Variants -->
<TagInput v-model="tags" variant="outline" />
<TagInput v-model="tags" variant="solid" />
<TagInput v-model="tags" variant="transparent" />

<!-- Disabled state -->
<TagInput v-model="tags" disabled />
```

#### RTL

Built on `Input`, so the field placeholder, trailing `+` icon, and clear/add chrome follow page direction. Tag chips use normal flex-wrap flow under RTL (remove control sits on the inline-end of each chip).

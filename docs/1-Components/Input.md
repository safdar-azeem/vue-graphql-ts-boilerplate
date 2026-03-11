# Input

**Import:** `import { Input } from 'vlite3'`

### Props

| Prop              | Type                                                   | Default   | Description                              |
| :---------------- | :----------------------------------------------------- | :-------- | :--------------------------------------- |
| `modelValue`      | `string \| number`                                     | `''`      | Binding (`v-model`)                      |
| `type`            | `InputType`                                            | `text`    | Native input type (text, password, etc.) |
| `label`           | `string`                                               | —         | Label text                               |
| `labelI18n`       | `string`                                               | —         | I18n key for the label                   |
| `placeholder`     | `string`                                               | —         | Input placeholder                        |
| `placeholderI18n` | `string`                                               | —         | I18n key for the placeholder             |
| `disabled`        | `boolean`                                              | `false`   | Disable input                            |
| `error`           | `string`                                               | —         | Error message / state                    |
| `variant`         | `'solid' \| 'outline' \| 'outline-b' \| 'transparent'` | `outline` | Visual style                             |
| `size`            | `'sm' \| 'md' \| 'lg'`                                 | `md`      | Dimensions                               |
| `rounded`         | `InputRounded`                                         | `md`      | Border radius                            |
| `icon`            | `string`                                               | —         | Leading icon (Iconify ID)                |
| `iconRight`       | `string`                                               | —         | Trailing icon (Iconify ID)               |
| `loading`         | `boolean`                                              | `false`   | Show spinner                             |
| `showClearButton` | `boolean`                                              | `true`    | Show clear 'x' when value exists         |
| `autofocus`       | `boolean`                                              | `false`   | Automatically focus on mount             |
| `lazy`            | `boolean`                                              | `false`   | Update v-model lazily                    |
| `rows`            | `number`                                               | `3`       | Number of rows (for textarea type)       |
| `addonLeft`       | `string`                                               | —         | Text addon on the left                   |
| `addonRight`      | `string`                                               | —         | Text addon on the right                  |
| `addonLeftClass`  | `string`                                               | —         | Custom class for left addon wrapper      |
| `addonRightClass` | `string`                                               | —         | Custom class for right addon wrapper     |
| `labelPosition`   | `'top' \| 'left' \| 'right'`                           | `top`     | Label placement                          |
| `class`           | `string`                                               | —         | Custom wrapper class                     |
| `inputClass`      | `string`                                               | —         | Custom input element class               |

### Events

- `@update:modelValue`: Emitted on input
- `@change`: Emitted on blur/change
- `@focus`
- `@blur`
- `@click:icon`: Click on left icon
- `@click:icon-right`: Click on right icon

### Usage

```vue
<Input v-model="username" label="Username" placeholder="Enter username" icon="lucide:user" />

<Input v-model="password" label="Password" type="password" variant="filled" />

<Input v-model="price" label="Price" addon-left="$" addon-right=".00" type="number" />
```

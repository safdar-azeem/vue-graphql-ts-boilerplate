# ThemeToggle

**Import:** `import { ThemeToggle } from 'vlite3'`

### Description

A dedicated button component to toggle between light and dark modes. It utilizes the `useTheme` composable internally.

### Props

| Prop      | Type            | Default     | Description          |
| :-------- | :-------------- | :---------- | :------------------- |
| `variant` | `ButtonVariant` | `secondary` | Visual style         |
| `size`    | `ButtonSize`    | —           | Button dimensions    |
| `rounded` | `ButtonRounded` | `md`        | Border radius        |
| `class`   | `string`        | —           | Custom wrapper class |

### Slots

| Slot      | Description                              | Props                                      |
| :-------- | :--------------------------------------- | :----------------------------------------- |
| `default` | Custom content to replace default button | `{ toggleTheme: Function, theme: string }` |

### Usage

#### Basic Usage

```vue
<ThemeToggle />
```

#### With Custom Class

```vue
<ThemeToggle class="absolute top-4 right-4" />
```

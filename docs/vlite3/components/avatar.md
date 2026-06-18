# Avatar

**Import:** `import { Avatar } from 'vlite3'`

### Props

| Prop       | Type            | Default  | Description                           |
| ---------- | --------------- | -------- | ------------------------------------- |
| `src`      | `string`        | —        | Image URL                             |
| `alt`      | `string`        | `Avatar` | Alt text, used for initial generation |
| `fallback` | `string`        | —        | Explicit text fallback (e.g. "JD")    |
| `size`     | `AvatarSize`    | `md`     | Dimensions                            |
| `rounded`  | `AvatarRounded` | `full`   | Shape                                 |
| `class`    | `string`        | —        | Custom classes                        |

### Types

```ts
type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
type AvatarRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
```

### Usage

```vue
<Avatar src="https://i.pravatar.cc/150" size="lg" />
<Avatar alt="John Doe" fallback="JD" rounded="md" />
```

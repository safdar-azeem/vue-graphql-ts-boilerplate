# Button

**Import:** `import { Button } from 'vlite3'`

### Props

| Prop             | Type                                   | Default      | Description                           |
| :--------------- | :------------------------------------- | :----------- | :------------------------------------ |
| `variant`        | `ButtonVariant`                        | `primary`    | Visual style                          |
| `size`           | `ButtonSize`                           | `md`         | Dimensions                            |
| `rounded`        | `ButtonRounded`                        | `md`         | Border radius                         |
| `icon`           | `string`                               | —            | Leading icon (inline-start; Iconify ID or image URL) |
| `iconRight`      | `string`                               | —            | Trailing icon (inline-end; Iconify ID) |
| `text`           | `string`                               | —            | Label text (alt to slot)              |
| `description`    | `string`                               | —            | Subtitle/description text below label |
| `textI18n`       | `string`                               | —            | I18n translation key for text         |
| `type`           | `button \| submit \| reset`            | `button`     | Native type                           |
| `loading`        | `boolean`                              | `false`      | Show spinner                          |
| `disabled`       | `boolean`                              | `false`      | Disable interaction                   |
| `asIcon`         | `boolean`                              | `false`      | Force render as icon button           |
| `layout`         | `'horizontal' \| 'vertical' \| 'tile'` | `horizontal` | Layout orientation                    |
| `dir`            | `'ltr' \| 'rtl' \| 'auto'`             | `auto`       | Text/icon direction (`auto` → ancestor `dir`, then `html[dir]`) |
| `textClass`      | `string`                               | —            | Custom class for text span            |
| `iconClass`      | `string`                               | —            | Custom class for leading icon         |
| `iconRightClass` | `string`                               | —            | Custom class for trailing icon        |
| `class`          | `any`                                  | —            | Custom class for button router/root   |

### Types

```ts
type ButtonVariant =
  | 'primary'
  | 'primary-light'
  | 'secondary'
  | 'danger'
  | 'danger-light'
  | 'warning'
  | 'warning-light'
  | 'info'
  | 'info-light'
  | 'success'
  | 'success-light'
  | 'outline'
  | 'outline-primary'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-info'
  | 'outline-success'
  | 'ghost'
  | 'transparent'
  | 'link'

type ButtonSize = 'xs' | 'sm' | 'sm2' | 'md' | 'lg' | 'xl'
type ButtonRounded = 'none' | 'sm' | 'sm2' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
```

### Usage

```vue
<Button variant="primary" icon="lucide:plus">Add Item</Button>
<Button variant="ghost" loading />

<!-- Tile layout (app-shortcut grid) -->
<Button icon="lucide:instagram" layout="tile" variant="primary" rounded="xl">Instagram</Button>
<Button icon="lucide:camera" layout="tile" variant="info-light" rounded="xl">Camera</Button>

<!-- Tile with custom icon background -->
<Button icon="lucide:heart" layout="tile" variant="danger" rounded="xl">Health</Button>

<!-- With Beacon -->
<div class="relative inline-flex">
  <Button icon="lucide:bell" variant="outline" rounded="full" />
  <Beacon variant="danger" class="absolute top-0 end-0" />
</div>
```

#### RTL

By default `dir="auto"` **inherits** direction from the nearest ancestor / `html[dir]` (the attribute is omitted so a stale `dir="ltr"` cannot pin the control). Horizontal buttons keep DOM order under that direction so:

- `icon` sits on **inline-start** (right under RTL)
- label / slot text follows the inherited direction
- `iconRight` sits on **inline-end** (left under RTL)
- description blocks use `text-start` alignment

Pass `dir="rtl"` / `"ltr"` to force a side. Avoid adding `flex-row` on the button — global RTL utilities reverse that class; `v-btn-horizontal` already locks the correct row order.

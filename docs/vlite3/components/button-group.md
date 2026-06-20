# ButtonGroup

**Import:** `import { ButtonGroup } from 'vlite3'`

### Props

| Prop        | Type                         | Default      | Description                   |
| ----------- | ---------------------------- | ------------ | ----------------------------- |
| `variant`   | `ButtonVariant`              | —            | Group button variant          |
| `size`      | `ButtonSize`                 | —            | Group button size             |
| `direction` | `'horizontal' \| 'vertical'` | `horizontal` | Layout axis                   |
| `attached`  | `boolean`                    | `true`       | Fuse borders (false adds gap) |
| `class`     | `string`                     | —            | Custom class                  |

### Usage

```vue
<ButtonGroup attached>
  <Button>Years</Button>
  <Button>Months</Button>
</ButtonGroup>
```

#### Outline variant (border-aware)

```vue
<ButtonGroup>
  <Button variant="outline">Left</Button>
  <Button variant="outline">Center</Button>
</ButtonGroup>
```

#### RTL

Under `html[dir=rtl]`, the first slot item sits on **inline-start** (right) and attached outer corners use logical radii (`border-*-start/end-radius`), so the capsule ends stay rounded. Avoid adding `flex-row` on the group — global RTL utilities reverse that class and invert the rounding.

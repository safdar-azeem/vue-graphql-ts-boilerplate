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

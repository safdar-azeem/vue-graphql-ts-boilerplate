# Label

**Import:** `import { Label } from 'vlite3'`

### Props

| Prop    | Type                         | Default | Description                   |
| :------ | :--------------------------- | :------ | :---------------------------- |
| `for`   | `string`                     | —       | ID of the target form element |
| `size`  | `'xs' \| 'sm' \| 'md' \| 'lg'` | `md`    | Size of the label             |
| `class` | `string`                     | —       | Custom CSS class              |

### Usage

```vue
<Label size="xs">Extra Small Label</Label>
<Label size="sm">Small Label</Label>
<Label size="md">Medium Label (Default)</Label>
<Label size="lg">Large Label</Label>

<div class="mt-4">
  <Label for="email">Email Address</Label>
  <Input id="email" />
</div>
```

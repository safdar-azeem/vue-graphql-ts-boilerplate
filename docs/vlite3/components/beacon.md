# Beacon

**Import:** `import { Beacon } from 'vlite3'`

A pulsating beacon that attracts attention, acting as an indicator for users to notice updates, notifications, or features.

### Props

| Prop      | Type                                                    | Default   | Description   |
| :-------- | :------------------------------------------------------ | :-------- | :------------ |
| `variant` | `primary \| danger \| warning \| success \| info`       | `primary` | Visual style  |
| `size`    | `sm \| md \| lg`                                        | `md`      | Dimensions    |
| `class`   | `any`                                                   | —         | Custom class  |

### Usage

```vue
<!-- Basic -->
<Beacon />

<!-- Status Indicator -->
<Beacon variant="success" />

<!-- On a Button -->
<div class="relative inline-flex">
  <Button icon="lucide:bell" variant="outline" rounded="full" />
  <Beacon variant="danger" class="absolute top-0 right-0" />
</div>
```

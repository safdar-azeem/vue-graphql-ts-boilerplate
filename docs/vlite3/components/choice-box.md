# ChoiceBox

**Import:** `import { ChoiceBox, type ChoiceBoxOption } from 'vlite3'`

### Props

| Prop              | Type                                               | Default | Description               |
| :---------------- | :------------------------------------------------- | :------ | :------------------------ |
| `modelValue`      | `string \| number \| (string \| number)[] \| null` | —       | Selection binding         |
| `options`         | `ChoiceBoxOption[]`                                | —       | Data source               |
| `multiple`        | `boolean`                                          | `false` | Allow multiple selections |
| `title`           | `string`                                           | —       | Group title               |
| `titleI18n`       | `string`                                           | —       | I18n key for group title  |
| `description`     | `string`                                           | —       | Group description         |
| `descriptionI18n` | `string`                                           | —       | I18n key for description  |
| `grid`            | `number`                                           | `1`     | Grid columns (1-4)        |
| `gap`             | `number`                                           | `4`     | Gap size (2, 3, 4, 6, 8)  |
| `disabled`        | `boolean`                                          | `false` | Disable all options       |

### Types

```ts
export interface ChoiceBoxOption {
  id: string | number
  title: string
  titleI18n?: string
  description?: string
  descriptionI18n?: string
  icon?: string
  disabled?: boolean
  badge?: string
  badgeI18n?: string
}
```

### Usage

```vue
<ChoiceBox v-model="selectedPlan" :options="plans" title="Choose Plan" :grid="3" />
```

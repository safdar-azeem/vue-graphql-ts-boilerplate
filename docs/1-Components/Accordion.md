# Accordion

**Import:** `import { Accordion } from 'vlite3'`

### Props

| Prop                | Type                    | Default   | Description                       |
| :------------------ | :---------------------- | :-------- | :-------------------------------- |
| `modelValue`        | `string \| string[]`    | `[]`      | Controlled value for open items   |
| `defaultValue`      | `string \| string[]`    | `[]`      | Initial value for open items      |
| `items`             | `AccordionItemSchema[]` | `[]`      | Data source for items             |
| `allowMultiple`     | `boolean`               | `false`   | Allow multiple items open at once |
| `variant`           | `AccordionVariant`      | `default` | Visual style                      |
| `size`              | `AccordionSize`         | `md`      | Size of trigger/content           |
| `attached`          | `boolean`               | `false`   | Remove spacing between items      |
| `disabled`          | `boolean`               | `false`   | Disable all interaction           |
| `showIndex`         | `boolean`               | `false`   | Show item number (1, 2...)        |
| `openIcon`          | `string`                | —         | Icon when open                    |
| `closeIcon`         | `string`                | —         | Icon when closed                  |
| `iconVariant`       | `IconVariant`           | `simple`  | Style of the toggle icon          |
| `activeIconVariant` | `IconVariant`           | —         | Style when active                 |
| `class`             | `string`                | —         | Custom class for container        |
| `triggerClass`      | `string`                | —         | Custom class for trigger          |
| `contentClass`      | `string`                | —         | Custom class for content          |
| `itemClass`         | `string`                | —         | Custom class for item wrapper     |

### Types

```ts
export interface AccordionItemSchema {
  id: string
  title: string
  titleI18n?: string
  description?: string
  descriptionI18n?: string
  content?: string
  icon?: string
  disabled?: boolean
  bodyComponent?: Component | any
  [key: string]: any
}

export type AccordionVariant = 'default' | 'solid' | 'outline' | 'separated' | 'ghost'
export type AccordionSize = 'sm' | 'md' | 'lg'
export type IconVariant = 'simple' | 'solid' | 'outline' | 'primary' | 'ghost'
```

### Usage

```vue
<Accordion :items="items" variant="outline" allow-multiple attached show-index />
```

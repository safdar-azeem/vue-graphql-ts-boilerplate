# Masonry

**Import:** `import { Masonry } from 'vlite3'`

### Props

| Prop      | Type                                         | Default                        | Description                                    |
| :-------- | :------------------------------------------- | :----------------------------- | :--------------------------------------------- |
| `data`    | `any[]`                                      | required                       | Array of items to render                       |
| `cols`    | `number \| Record<string \| number, number>` | `{ default: 1, sm: 2, lg: 3 }` | Column configuration for different breakpoints |
| `gap`     | `number`                                     | `16`                           | Space between items in pixels                  |
| `tag`     | `string`                                     | `'div'`                        | Root container HTML tag                        |
| `itemKey` | `string`                                     | `'id'`                         | Unique key property in data items              |

### Breakpoints

Default numeric values for named breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Slots

| Slot      | Description                    | Props                       |
| :-------- | :----------------------------- | :-------------------------- |
| `default` | Template for each masonry item | `{ data, index, colIndex }` |

### Usage

#### Basic Usage (Fixed Columns)

```vue
<Masonry :data="items" :cols="3" :gap="20">
  <template #default="{ data }">
    <div class="card">{{ data.title }}</div>
  </template>
</Masonry>
```

#### Responsive Grid

```vue
<Masonry :data="images" :cols="{ default: 1, sm: 2, md: 3, lg: 4 }" :gap="16">
  <template #default="{ data }">
    <img :src="data.url" class="rounded-lg w-full h-auto" />
  </template>
</Masonry>
```

#### Performance Optimization

The `Masonry` component uses `content-visibility: auto` and `ResizeObserver` to ensure high performance even with thousands of items by skipping rendering for off-screen content.

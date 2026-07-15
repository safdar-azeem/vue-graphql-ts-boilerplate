# MultiSelect

**Import:** `import { MultiSelect } from 'vlite3'`

### Props

| Prop              | Type                                | Default             | Description                      |
| :---------------- | :---------------------------------- | :------------------ | :------------------------------- |
| `modelValue`      | `any[]`                             | `[]`                | Selected values                  |
| `options`         | `IDropdownOptions`                  | `[]`                | Options to display               |
| `placeholder`     | `string`                            | `'Select items...'` | Placeholder text                 |
| `placeholderI18n` | `string`                            | —                   | I18n key for the placeholder     |
| `searchable`      | `boolean`                           | `true`              | Enable search functionality      |
| `disabled`        | `boolean`                           | `false`             | Disable interaction              |
| `loading`         | `boolean`                           | `false`             | Show loading state               |
| `variant`         | `'default' \| 'outline' \| 'solid'` | `'outline'`         | Visual style variant             |
| `size`            | `'sm' \| 'md' \| 'lg'`              | `'md'`              | Component size                   |
| `maxVisible`      | `number`                            | `2`                 | Max tags to show before +N badge |
| `hasMore`         | `boolean`                           | `false`             | Show "Load More" trigger         |
| `remote`          | `boolean`                           | `false`             | Enable remote search mode        |
| `layout`          | `'default' \| 'grouped'`            | `'default'`         | Option layout mode               |

### Events

- `@update:modelValue`: Emitted when selection changes
- `@change`: Emitted when selection changes
- `@search`: Emitted when search query changes
- `@load-more`: Emitted when scrolling to bottom

### Usage

#### Basic Usage

```vue
<MultiSelect v-model="selected" :options="options" placeholder="Select frameworks" />
```

#### Remote Search

```vue
<MultiSelect v-model="selected" :options="results" remote :loading="isLoading" @search="onSearch" />
```

#### Grouped Options

```vue
<MultiSelect v-model="selected" :options="groupedOptions" layout="grouped" />
```

#### Pagination

```vue
<MultiSelect v-model="selected" :options="items" :has-more="hasMore" @load-more="loadNextPage" />
```

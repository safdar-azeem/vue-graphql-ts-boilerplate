# Carousel

**Import:** `import { Carousel } from 'vlite3'`

### Props

| Prop                            | Type                               | Default           | Description                                            |
| :------------------------------ | :--------------------------------- | :---------------- | :----------------------------------------------------- |
| `data`                          | `any[]`                            | `[]`              | Array of items to render                               |
| `pagination`                    | `string \| string[] \| boolean`    | `'dots'`          | Pagination type: `dots`, `buttons`, or array of both   |
| `paginationSize`                | `'sm' \| 'md' \| 'lg'`             | `'md'`            | Size of pagination elements                            |
| `paginationPosition`            | `string \| string[]`               | `'bottom-center'` | Position(s) of pagination                              |
| `paginationVisibility`          | `string \| string[]`               | `'always'`        | Visibility: `always`, `hover`                          |
| `paginationHoverInitialTimeout` | `number`                           | —                 | Timeout before hiding on hover mode                    |
| `paginationHoverEdgeThreshold`  | `number`                           | —                 | Edge threshold for hover mode                          |
| `direction`                     | `'horizontal' \| 'vertical'`       | `'horizontal'`    | Scroll direction                                       |
| `itemsToShow`                   | `number \| Record<number, number>` | `1`               | Number of items or responsive map (e.g., `{ 768: 2 }`) |
| `gap`                           | `number`                           | `0`               | Space between items in pixels                          |
| `autoPlay`                      | `boolean`                          | `false`           | Enable auto-scrolling                                  |
| `autoPlayInterval`              | `number`                           | `3000`            | Delay between auto-plays                               |
| `draggable`                     | `boolean`                          | `false`           | Enable mouse/touch dragging                            |
| `loop`                          | `boolean`                          | `false`           | Infinite loop mode                                     |
| `speed`                         | `number`                           | `300`             | Transition speed in ms                                 |
| `easing`                        | `string`                           | `'ease'`          | CSS easing function                                    |
| `mousewheel`                    | `boolean`                          | `true`            | Enable scrolling via mousewheel                        |
| `currentItem`                   | `number`                           | `0`               | Index of the current item                              |
| `bufferSize`                    | `number`                           | `5`               | DOM nodes rendered outside view                        |
| `maxDomElements`                | `number`                           | `10`              | Max DOM elements to render                             |
| `updateKey`                     | `string \| number`                 | —                 | Force carousel update when changed                     |

### Exposed Methods

Access these via `ref`:

- `goToSlide(index: number, smooth?: boolean)`: Navigate to specific index
- `goNext(smooth?: boolean)`: Next item
- `goPrev(smooth?: boolean)`: Previous item
- `goNextPage(smooth?: boolean)`: Next page of items
- `goPrevPage(smooth?: boolean)`: Previous page of items

### Slots

| Slot      | Description                  | Props             |
| :-------- | :--------------------------- | :---------------- |
| `default` | Template for each slide item | `{ item, index }` |

### Usage

#### Basic Carousel

```vue
<Carousel :data="images" pagination="dots">
  <template #default="{ item }">
    <img :src="item" class="rounded-lg" />
  </template>
</Carousel>
```

#### Responsive with Gap

```vue
<Carousel :data="items" :items-to-show="{ 640: 1, 1024: 3 }" :gap="20" pagination="buttons">
  <template #default="{ item }">
    <Card :title="item.title" />
  </template>
</Carousel>
```

#### Vertical mode

```vue
<Carousel :data="images" direction="vertical" :items-to-show="1">
  <template #default="{ item }">
    <div class="h-[400px]">
      <img :src="item" class="h-full object-cover" />
    </div>
  </template>
</Carousel>
```

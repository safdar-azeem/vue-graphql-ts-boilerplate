# CategoryMenu

**Import:** `import { CategoryMenu, type CategoryMenuProps, type CategoryMenuItem } from 'vlite3'`

A read-only, presentation-focused counterpart to [`CategoryManager`](./category-manager.md). The data shape is the same — `CategoryManager`'s `CategoryItem[]` can be passed straight in, or you can leverage the built-in `rawData` prop to feed it flat datasets direct from an API. Four built-in variants cover the most common e-commerce presentation needs: tabs, mega menu, sidebar accordion, and inline pills.

---

## Variants

### `tabs` (default)

A horizontal scrollable row of top-level categories, featuring overflow gradients and left/right hidden-scroll controls identical to standard tabs (`NavbarTabs` or `Tabes`). Hovering a top-level item on desktop opens a popover listing its immediate children — and **the popover is fully recursive**: any child with its own `children` opens a nested popover to the right, and so on. The cascading popovers, positioning, overflow handling, keyboard nav, and click-outside are all inherited from the existing `<Dropdown>` component. On mobile, the popover is replaced with an inline expanded list.

```

[ All ]  < [ Electronics ]  [ Clothing ]  [ Sale ] >
│
└─ popover:
· Computers  ▶
· Smartphones  ▶
· Cameras
· Audio
│
└─ (nested popover to the right)
· Laptops
· Desktops
· Tablets

```

### `mega`

A wide panel that drops below the top row. **Active-only**: hovering a top-level button displays only that top-level's children — one column, populated with the active top-level's children. Nested children (up to 3 levels deep) render inline as smaller in-column sub-items, so the panel is flat — no nested side-popovers. Implemented via `<Dropdown layout="grouped">` with the active top-level passed as a single-element options array.

```

[ Electronics ]  [ Clothing ]  [ Sale ]
↓ hovering Clothing
─────────────────────────────────────────────────────────────
│ Clothing                                                       │
│  Men                                                           │
│   · Shirts                                                     │
│   · Pants                                                      │
│   · Suits                                                      │
│  Women                                                         │
│   · Dresses                                                    │
│   · Tops                                                       │
│   · Skirts                                                     │
│  Kids                                                          │
│   · Boys                                                       │
│   · Girls                                                      │
│   · Baby                                                       │
─────────────────────────────────────────────────────────────

```

The active top-level is the _trigger_ — it never appears as a nested item the user has to click. Click a child to select; click a top-level button in the row above the panel to navigate to that category directly.

### `sidebar`

A vertical accordion. Each parent expands to show its children. By default only one parent can be open at a time; pass `multi-expand` to allow several. Honors `active-id` by auto-expanding the path to the active node.

```

> Electronics
> Laptops
> Smartphones
> v Clothing
> Men
> Women
> Kids
> Sale

```

### `inline`

A compact pill list. Each parent shows a "Children A · Children B" hint beside its name. Designed for tight horizontal spaces — e.g. just under a search bar, or inside a card.

```

[ Electronics · Laptops · Cameras ]  [ Clothing ]  [ Sale ]

```

---

## Props

| Prop               | Type                                        | Default     | Description                                                                                                                                            |
| :----------------- | :------------------------------------------ | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `items`            | `CategoryMenuItem[]`                        | `[]`        | Hierarchical category tree. Accepts the same shape as `CategoryManager`.                                                                               |
| `rawData`          | `RawCategoryItem[]`                         | `undefined` | Alternative to `items`: Flat array of category items. Converts flat relational objects into a nested hierarchy locally.                                |
| `variant`          | `'tabs' \| 'mega' \| 'sidebar' \| 'inline'` | `'tabs'`    | Layout variant — see [Variants](#variants).                                                                                                            |
| `maxDepth`         | `number`                                    | `2`         | Max depth to render. `1` = top-level only. The `mega` and `sidebar` variants render grandchildren inline when `maxDepth >= 3`.                         |
| `showIcons`        | `boolean`                                   | `true`      | Whether to render the icon prefix on each item.                                                                                                        |
| `showAllItem`      | `boolean`                                   | `false`     | Show an "All" pseudo-item at the start. (`tabs` variant only.)                                                                                         |
| `allItemLabel`     | `string`                                    | `'All'`     | Label for the "All" item.                                                                                                                              |
| `multiExpand`      | `boolean`                                   | `false`     | `sidebar` variant: allow multiple parents to be open at once.                                                                                          |
| `activeId`         | `string \| number \| null`                  | `null`      | The currently active category. Highlights the matching node; in `sidebar` mode, auto-expands its ancestors.                                            |
| `routePrefix`      | `string`                                    | `''`        | Optional Vue Router path prefix used to auto-generate category links. Nested categories join their slug path with hyphens, e.g. `/products/cloth-men`. |
| `megaColumns`      | `number`                                    | `4`         | `mega` variant: number of columns in the panel. Clamped to `[1, 6]`.                                                                                   |
| `showImages`       | `boolean`                                   | `true`      | `mega` variant: whether to render the hero image for the active top-level.                                                                             |
| `showDescriptions` | `boolean`                                   | `true`      | `mega` variant: whether to render the description text under the hero.                                                                                 |
| `class`            | `string`                                    | `''`        | Pass-through classes for the root container.                                                                                                           |

---

## Events

| Event    | Payload            | Description                                                                        |
| :------- | :----------------- | :--------------------------------------------------------------------------------- |
| `select` | `CategoryMenuItem` | Emitted when any leaf, child, or parent is clicked. The clicked item is passed in. |

---

## Slots

The component currently exposes no public slots. The built-in variants cover the 95% case; if you need a fully custom render, fork the variant you need or wrap `CategoryMenu` in a Vue component of your own.

---

## Usage Examples

### Using raw API Data directly

You don't need to manually compute the nested tree. Like `CategoryManager`, you can simply bind `rawData` directly inside the template. The component handles the recursion and nesting locally.

```vue
<script setup>
const flatCategoriesFromApi = [
  { id: '1', name: 'Electronics' },
  { id: '2', name: 'Laptops', parentId: '1' },
]
</script>

<template>
  <CategoryMenu :raw-data="flatCategoriesFromApi" variant="tabs" />
</template>
```

### Basic tabs

```vue
<script setup>
import { ref } from 'vue'
import { CategoryMenu } from 'vlite3'

const categories = ref([
  {
    id: 1,
    title: 'Electronics',
    icon: 'lucide:cpu',
    children: [
      { id: 11, title: 'Laptops' },
      { id: 12, title: 'Smartphones' },
    ],
  },
  { id: 2, title: 'Clothing', icon: 'lucide:shirt' },
  { id: 3, title: 'Sale', icon: 'lucide:tag' },
])

const onSelect = (cat) => console.log('Selected:', cat)
</script>

<template>
  <CategoryMenu
    :items="categories"
    variant="tabs"
    route-prefix="/products"
    show-all-item
    all-item-label="Shop all"
    @select="onSelect" />
</template>
```

### Mega menu for a brand-led store

```vue
<template>
  <CategoryMenu
    :items="categoryTree"
    variant="mega"
    route-prefix="/collections"
    :mega-columns="4"
    :max-depth="2"
    :show-images="true" />
</template>
```

With `route-prefix="/collections"`, a nested item like `Men -> Bags` is rendered as a Vue Router link to `/collections/men-bags`.

### Sidebar in a category-browser page

```vue
<aside class="w-64 border-r border-border p-4">
  <CategoryMenu
    :items="categoryTree"
    variant="sidebar"
    route-prefix="/products"
    :active-id="route.params.categoryId"
    :max-depth="3"
    multi-expand />
</aside>
```

### Inline pills under a hero

```vue
<header>
  <h1>What's trending</h1>
  <CategoryMenu
    :items="trendingCategories"
    variant="inline"
    route-prefix="/trending"
    :show-icons="false"
    @select="onSelect" />
</header>
```

### Using a `CategoryManager`-managed tree

The data shape is identical, so any tree you've built with `CategoryManager` can be passed straight in. The `loading` and `rawData` props of `CategoryManager` continue to work in tandem — feed the result into `CategoryMenu`:

```vue
<script setup>
import { CategoryManager, CategoryMenu } from 'vlite3'

const { result, loading } = useGetCategoriesQuery()
</script>

<template>
  <CategoryManager :loading="loading" :raw-data="result?.getCategories?.items" readonly />

  <CategoryMenu :raw-data="result?.getCategories?.items" variant="mega" route-prefix="/products" />
</template>
```

---

## Senior Engineer's Notes

1. **Read-only by design.** `CategoryMenu` deliberately does not emit anything that would mutate the tree. It only emits `@select`. If you need CRUD, use [`CategoryManager`](https://www.google.com/search?q=./CategoryManager.md) instead.
2. **Compatible data shape.** The `CategoryMenuItem` type is structurally identical to `CategoryManager`'s `CategoryItem`, which means swapping between the two is a one-line change. The same data drives both the admin editor and the storefront menu.
3. **Automatic router links.** Pass `routePrefix` once and the component derives clean slugs from `slug`, `title`, `name`, `label`, or `id`. Nested category names are joined with hyphens at any depth, so `Cloth -> Men -> Shirts` becomes `/products/cloth-men-shirts`.
4. **Powered by `<Dropdown>` for the floating variants.** The `tabs` and `mega` variants don't reinvent popper logic — they delegate to the existing `<Dropdown>` component (which is built on `v-tooltip-lite` + Popper.js). A small adapter in `./utils` (`categoryToDropdownOption`) bridges the field names. The cascade-style nested popovers, the multi-column grouped mega panel, keyboard navigation, click-outside, scroll/resize handling, and RTL behavior are all inherited for free. `sidebar` and `inline` are pure-render and don't need it.
5. **Cascading depth in `tabs`.** The `tabs` popover is fully recursive — hover a sub-category with its own `children` and another popover opens to the right. The depth is unlimited; the visible depth is limited only by the data you feed in. (`sidebar` shows the same data flat; `mega` flattens to 3 levels inline and cascades beyond that.)
6. **`maxDepth` is a UX hint, not a hard cap.** Setting it to `1` hides all children; setting it to `3` exposes grandchildren inline in `mega` and `sidebar`. Going past `3` is supported but rarely useful — deep trees should usually be paginated, not inlined.
7. **Active-node tracking.** Pass `activeId` to highlight the current category. The `sidebar` variant auto-expands the path to that node, which is exactly what you want for a category browser page.
8. **Empty / loading states.** When `items` is empty, the component renders a single muted "No categories to display." line. For a richer skeleton, wrap it in a `<Skeleton>` or use `v-if` at the call site.

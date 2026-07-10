# ImageComparison

**Import:** `import { ImageComparison } from 'vlite3'`

A highly optimized before/after slider component to showcase visual differences. Perfect for AI generation apps, photo editing features, and portfolio showcases. Built with multi-touch support and GPU-accelerated smooth animations.

### Props

| Prop              | Type               | Default    | Description                                    |
| :---------------- | :----------------- | :--------- | :--------------------------------------------- |
| `beforeImage`     | `string`           | —          | URL or path of the "before" image              |
| `afterImage`      | `string`           | —          | URL or path of the "after" image               |
| `beforeLabel`     | `string`           | `'Before'` | Label text for the before image                |
| `afterLabel`      | `string`           | `'After'`  | Label text for the after image                 |
| `initialPosition` | `number`           | `50`       | Initial position of the slider handle (0-100)  |
| `hover`           | `boolean`          | `false`    | Enable sliding by hovering instead of dragging |
| `width`           | `string \| number` | `'100%'`   | Width of the container                         |
| `height`          | `string \| number` | `'auto'`   | Height of the container                        |
| `containerClass`  | `string`           | `''`       | Custom CSS class for the root container        |
| `handleClass`     | `string`           | `''`       | Custom CSS class for the slider handle         |
| `showHandle`      | `boolean`          | `true`     | Show or hide the handle icon on the divider    |
| `variant`         | `'one' \| 'two'`   | `'one'`    | Visual style of the comparison slider          |

### Usage

#### Standard Comparison

```vue
<template>
  <ImageComparison
    beforeImage="https://cdn.example.com/before.webp"
    afterImage="https://cdn.example.com/after.webp" 
  />
</template>
```

#### Hover Interaction

Set `:hover="true"` to allow users to slide simply by moving their cursor over the image. Perfect for quick exploration.

```vue
<template>
  <ImageComparison
    beforeImage="https://cdn.example.com/before.webp"
    afterImage="https://cdn.example.com/after.webp"
    :hover="true"
    beforeLabel="Raw Capture"
    afterLabel="AI Enhanced" 
  />
</template>
```

# ScaleGenerator

**Import:** `import { ScaleGenerator } from 'vlite3'`

A generic CSS-transform scaler. Renders any content at a fixed **target**
width and applies a `transform: scale(...)` so it shrinks to fit the
available viewport. Designed for preview panes that need to embed a
full-width page (storefront, dashboard, document, marketing site).

The component is **pure geometry** — it knows nothing about shops or any
specific domain. It is reused by the ERP editor's storefront preview, by
any future embed-style preview, and by the live storefront when a fixed
display width is desired.

### Props

| Prop              | Type                            | Default     | Description                                                                                             |
| :---------------- | :------------------------------ | :---------- | :------------------------------------------------------------------------------------------------------ |
| `enabled`         | `boolean`                       | `undefined` | Master switch. When `false` the content renders at its natural width (clamped to `maxWidth`).           |
| `targetWidth`     | `number`                        | `1440`      | The width (in `px`) the content was designed for. Falls back to `maxWidth`.                             |
| `maxWidth`        | `number`                        | —           | Hard cap on the content width when not scaling.                                                         |
| `minScale`        | `number`                        | `0.25`      | Lower bound for the computed scale.                                                                     |
| `maxScale`        | `number`                        | `1`         | Upper bound for the computed scale.                                                                     |
| `scale`           | `number \| null`                | `null`      | Manual scale override. When provided, the component uses this value (clamped) instead of computing one. |
| `isEditMode`      | `boolean`                       | `false`     | When `true`, scaling is enabled by default.                                                             |
| `horizontalAlign` | `'left' \| 'center' \| 'right'` | `'center'`  | Horizontal alignment of the (possibly scaled) content inside the frame.                                 |
| `contentClass`    | `string`                        | `''`        | Extra class for the inner content wrapper.                                                              |

### Events

- `@update:scale` — emitted with the current scale (already clamped).
- `@update:containerWidth` — emitted with the frame's current `clientWidth`.
- `@update:ready` — emitted once after the first fitted scale is applied
  (content was kept invisible until then to avoid a full-size flash).

### Scoped Slot

The default slot exposes four values:

```ts
{
  scale: number // current effective scale (1 when disabled)
  containerWidth: number // frame's current width in px
  targetWidth: number // resolved target width
  ready: boolean // true after the initial measurement reveal
}
```

### Usage

```vue
<script setup lang="ts">
import { ScaleGenerator } from 'vlite3'
import { ref } from 'vue'

const liveScale = ref(1)
</script>

<template>
  <ScaleGenerator
    :target-width="1440"
    :min-scale="0.25"
    :max-scale="1"
    @update:scale="(v) => (liveScale = v)">
    <div class="p-8">…your 1440px-wide content…</div>
  </ScaleGenerator>
</template>
```

### Notes

- The component uses `ResizeObserver` to react to viewport changes. It
  guards the global with `typeof ResizeObserver === 'undefined'` so it is
  safe to import in SSR contexts (Nuxt server build will simply skip
  observation).
- `transform: scale(...)` is layout-free: descendants keep their original
  font sizes, padding, and Tailwind utility behavior. The visible
  difference is the effective rendered size.
- This viewport transform is independent from `ThemeProvider`'s optional
  base-font spacing scale, which changes the content's own `--spacing` token.
- The frame's height tracks `content.scrollHeight * scale` so the wrapper
  shrinks/grows with the content.
- The frame uses `overflow: clip` so it clips scaled content without
  becoming a scroll container. Descendant `scrollIntoView` / focus
  navigation cannot displace the frame (`overflow: hidden` would still
  allow programmatic scrolling).
- On first paint while scaling is enabled, the frame stays clipped with zero
  height and `visibility: hidden` until a positive frame width is measured and
  remains stable across a paint boundary. This prevents hidden tabs and other
  temporarily zero-width layouts from revealing at `minScale` before their real
  geometry is available.
- Initial transform transitions are disabled with an inline style, including
  transitions supplied through `contentClass`. The guard is removed only after
  the fitted transform is committed; later resizes keep the normal
  `duration-150` transition (unless reduced motion is preferred).
- ResizeObserver callbacks are coalesced to a single `requestAnimationFrame`
  tick. Scale / width / height emits are skipped when values are unchanged
  to prevent parent shell feedback loops.
- The frame and content wrappers use `contain: layout style` and the
  content uses `will-change: transform` so scaled previews stay on their
  own compositor layer (see `docs/guides/performance.md`).

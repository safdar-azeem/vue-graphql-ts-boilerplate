# PanZoomViewport

**Import:** `import { PanZoomViewport } from 'vlite3'`

`PanZoomViewport` is a generic, transform-only viewport for navigating any
slotted interface, document, diagram, preview, dashboard, or editor surface.
It owns one `{ scale, x, y }` transform and never reflows the slotted content.
Zoom, pan input sources, and horizontal/vertical transform movement can each be
disabled independently. Every new capability flag defaults to `true`, so existing
consumers retain the full interaction model.

It is intentionally separate from `ScaleGenerator`: use `ScaleGenerator` when
content only needs to fit a target width, use `PanZoomViewport` when users need
interactive zooming and panning, or compose them when interactive zoom must be
relative to a responsive fit baseline.

## Gestures

- Trackpad pinch or Ctrl/Command + wheel zooms around the pointer.
- Ordinary wheel and two-finger trackpad movement pans on both axes.
- Space + primary-button drag and middle-button drag pan with pointer capture.
- Direct primary-button/touch drag is opt-in through `panOnPrimaryDrag` so
  controls inside arbitrary content keep their native behavior by default.
- Focus the viewport to use Ctrl/Command + `+`, `-`, or `0`, and the arrow keys.
- A nested scrollable descendant consumes ordinary wheel input while it can
  scroll in that direction. The viewport takes over only at its boundary.

Wheel handlers are attached only to the viewport. Browser page zoom and
horizontal history navigation are prevented only while the component is
actively consuming a gesture.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `modelValue` | `PanZoomViewportTransform` | `{ scale: 1, x: 0, y: 0 }` | Reactive transform used by `v-model`. |
| `contentWidth` | `number` | natural | Optional fixed unscaled content width. |
| `contentHeight` | `number` | natural | Optional fixed unscaled content height. |
| `minScale` | `number` | `0.1` | Lower bound applied to every zoom source, fit, reset, and controlled transform. |
| `maxScale` | `number` | `4` | Upper bound applied to every zoom source and controlled transform. |
| `zoomStep` | `number` | `0.2` | Multiplicative step for zoom controls. |
| `wheelZoomSpeed` | `number` | `0.002` | Exponential wheel/pinch sensitivity. |
| `keyboardPanStep` | `number` | `40` | Local pixels moved by an arrow key. |
| `fitPadding` | `number` | `24` | Default inset used by fit-to-content. |
| `fitMode` | `'contain' \| 'width' \| 'height'` | `'contain'` | Default fit strategy. |
| `fitAlignX` | `'start' \| 'center' \| 'end'` | `'center'` | Default horizontal alignment after fitting. |
| `fitAlignY` | `'start' \| 'center' \| 'end'` | `'center'` | Default vertical alignment after fitting. |
| `initialFit` | `boolean` | `false` | Fit after the first measurement without an initial animation. |
| `autoFitOnResize` | `boolean` | `false` | Refit when the viewport size changes. |
| `zoomEnabled` | `boolean` | `true` | Enables wheel, keyboard, and controller-driven zoom. |
| `zoomInEnabled` | `boolean` | `true` | Enables scale increases while below `maxScale`. |
| `zoomOutEnabled` | `boolean` | `true` | Enables scale decreases while above `minScale`. |
| `panEnabled` | `boolean` | `true` | Master switch for component-owned transform translation. |
| `pointerPanEnabled` | `boolean` | `true` | Enables Space-, middle-button-, and configured primary-button drag panning. |
| `wheelPanEnabled` | `boolean` | `true` | Enables component-owned ordinary wheel/trackpad translation. |
| `keyboardPanEnabled` | `boolean` | `true` | Enables component-owned arrow-key translation. |
| `horizontalPanEnabled` | `boolean` | `true` | Enables horizontal transform translation. |
| `verticalPanEnabled` | `boolean` | `true` | Enables vertical transform translation. |
| `panOnWheel` | `boolean` | `true` | Pan on ordinary wheel/trackpad input. |
| `wheelZoomMode` | `'modifier' \| 'always' \| 'disabled'` | `'modifier'` | Controls which wheel gestures zoom. |
| `panOnPrimaryDrag` | `boolean` | `false` | Enables direct primary-button/touch panning outside editable controls. |
| `keyboard` | `boolean` | `true` | Enables focused keyboard navigation. |
| `disabled` | `boolean` | `false` | Disables gestures and keyboard handling; imperative controls remain available. |
| `ariaLabel` | `string` | `'Pan and zoom viewport'` | Accessible region label. |
| `contentClass` | `string` | `''` | Extra class for the transformed content layer. |

## Transform and events

```ts
interface PanZoomViewportTransform {
  scale: number
  x: number
  y: number
}
```

- `@update:modelValue` provides the sanitized transform at most once per
  animation frame during continuous gestures.
- `@change` provides the transform plus a source such as `wheel`, `pointer`,
  `fit`, `reset`, or `keyboard`.
- `@update:viewportSize` and `@update:contentSize` report unscaled geometry.
- `@update:ready` fires after initial measurement and optional fitting.
- `@pan-start` and `@pan-end` describe pointer-drag sessions.
- `@zoom-availability-change` reports reactive `canZoomIn` and `canZoomOut`
  values for disabling external controls.

The default slot receives `transform`, `viewportSize`, `contentSize`, `ready`,
`panning`, `canZoomIn`, and `canZoomOut`.

## Imperative controls

A component ref exposes:

- `zoomIn`, `zoomOut`, and `setScale`
- `panBy`, in local or client/visual coordinate space
- `setTransform` and `reset`
- `fitToContent`, with contain/width/height and alignment options
- `canZoomIn()` and `canZoomOut()` for external control state
- `focus` and `getViewportElement`

Control methods accept `behavior: 'auto' | 'smooth'`. Smooth transitions are
automatically disabled when reduced motion is preferred. Zoom methods can use
the viewport center or an explicit local/client anchor.

All component-owned scale changes use one bound/direction resolver. Non-finite
requests retain the current safe scale. Non-positive bounds use the documented
defaults; when a valid minimum exceeds the requested maximum, the effective
maximum collapses to the minimum so the configured floor is never lowered.
Direction flags override the available range: when one is `false`, that
direction remains unavailable even away from its bound.

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  PanZoomViewport,
  type PanZoomViewportExposed,
  type PanZoomViewportTransform,
} from 'vlite3'

const viewport = ref<PanZoomViewportExposed | null>(null)
const transform = ref<PanZoomViewportTransform>({ scale: 1, x: 0, y: 0 })
</script>

<template>
  <div class="h-[32rem]">
    <PanZoomViewport
      ref="viewport"
      v-model="transform"
      :content-width="1200"
      fit-mode="width"
      initial-fit
      auto-fit-on-resize>
      <Dashboard />
    </PanZoomViewport>
  </div>

  <button
    :disabled="!viewport?.canZoomOut()"
    @click="viewport?.zoomOut({ behavior: 'smooth' })">
    Zoom out
  </button>
  <span>{{ Math.round(transform.scale * 100) }}%</span>
  <button
    :disabled="!viewport?.canZoomIn()"
    @click="viewport?.zoomIn({ behavior: 'smooth' })">
    Zoom in
  </button>
  <button @click="viewport?.fitToContent({ mode: 'width' })">Fit width</button>
  <button @click="viewport?.setScale(1)">100%</button>
</template>
```

### Zoom-only with native scrolling

Wrap the viewport in an `overflow: auto` element and turn off component-owned
movement. Disabled axes expose a scaled layout footprint to the nearest native
scroll ancestor, while the content itself remains transform-scaled. Ordinary
wheel, trackpad, pointer-drag, and arrow-key movement then falls through to the
browser; modifier-wheel/pinch zoom remains pointer anchored by updating the
ancestor's native scroll position.

```vue
<div class="canvas-scroll" style="height: 32rem; overflow: auto; overscroll-behavior: contain">
  <PanZoomViewport
    v-model="transform"
    :content-width="1200"
    :min-scale="1"
    :max-scale="4"
    zoom-enabled
    zoom-in-enabled
    zoom-out-enabled
    :pan-enabled="false"
    :pointer-pan-enabled="false"
    :wheel-pan-enabled="false"
    :keyboard-pan-enabled="false"
    :horizontal-pan-enabled="false"
    :vertical-pan-enabled="false"
    :pan-on-wheel="false"
    wheel-zoom-mode="modifier">
    <Dashboard />
  </PanZoomViewport>
</div>
```

Axis flags can be mixed. For example, disabling only vertical transform
movement delegates that axis to a native vertical scroll ancestor while the
component continues to own horizontal translation.

### Zoom relative to a fitted baseline

`minScale` and `maxScale` always describe the transform owned by
`PanZoomViewport`. When its slot contains an independently fitted surface,
that transform is naturally a user multiplier. Keep `ScaleGenerator` inside
the viewport, size the viewport's content footprint to the fitted frame, and
use a minimum multiplier of `1`:

```vue
<PanZoomViewport
  v-model="userZoom"
  :content-width="fittedFrameWidth"
  :min-scale="1"
  :max-scale="4"
  :fit-padding="24"
  :pan-enabled="false"
  :horizontal-pan-enabled="false"
  :vertical-pan-enabled="false"
  @update:viewport-size="updateViewportSize">
  <ScaleGenerator
    :enabled="true"
    :target-width="1200"
    :min-scale="0.1"
    :max-scale="1"
    horizontal-align="left">
    <Dashboard />
  </ScaleGenerator>
</PanZoomViewport>
```

Here `fittedFrameWidth` is the target width capped to the viewport's available
width after padding. `ScaleGenerator` derives and continuously updates the fit
scale from that frame. If the fit scale is `0.62`, user zoom `1` renders at
`0.62`, user zoom `1.5` renders at `0.93`, and user zoom `2` renders at `1.24`.
Resizing changes only the fit scale; the user multiplier remains unchanged.
Fit, reset, and “100%” controls should set the multiplier to `1`, not set the
combined rendered scale to `1`.

## Coordinate and performance behavior

- Pointer anchors and client-space pan deltas are derived from
  `getBoundingClientRect()` and normalized by the viewport's layout size. This
  keeps navigation accurate under transformed ancestors and browser zoom.
- Wheel delta modes are normalized for pixel, line, and page devices.
- Gesture updates are coalesced with `requestAnimationFrame`; content navigation
  remains a CSS `translate3d`/`scale` transform. Native-scroll mode additionally
  updates only the outer footprint and native scroll offsets.
- The content layer uses `will-change: transform` and both layers use
  `contain: layout style`.
- Resize observers, animation frames, pointer capture, listeners, and
  transition timers are cleaned up on unmount. Browser globals are guarded for
  SSR imports.
- The viewport uses `overscroll-behavior: none` locally. It does not install a
  page-wide wheel listener or interfere with content outside its bounds.

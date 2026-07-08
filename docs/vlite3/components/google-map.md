# GoogleMap

**Import:** `import { GoogleMap, type GoogleMapMarker } from 'vlite3'`

`GoogleMap` is a browser-only, responsive Google Maps wrapper. It loads the Google Maps JavaScript
API only when the first map mounts and shares that load across every map instance on the page. No
additional package is required.

## API key configuration

Enable the **Maps JavaScript API** in Google Cloud, then configure the key once through the existing
vlite3 plugin:

```ts
import { createApp } from 'vue'
import { createVLite } from 'vlite3'
import App from './App.vue'

createApp(App)
  .use(
    createVLite({
      components: {
        googleMap: { apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY },
      },
    })
  )
  .mount('#app')
```

The local `api-key` prop overrides global configuration. Never commit a key to source control.
Restrict browser keys by HTTP referrer and restrict their API access to Maps JavaScript API in
Google Cloud. Client-side keys are visible to browsers by design; restrictions are the security
boundary.

## Basic coordinate and single marker

```vue
<script setup lang="ts">
import { GoogleMap } from 'vlite3'

const location = { lat: 24.8607, lng: 67.0011 }
</script>

<template>
  <GoogleMap :center="location" :markers="[{ ...location, title: 'Office', label: 'O' }]" />
</template>
```

## Multiple markers, independent center, and zoom

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { GoogleMap, type GoogleMapMarker } from 'vlite3'

const center = { lat: 24.8607, lng: 67.0011 }
const zoom = ref(11)
const markers: GoogleMapMarker[] = [
  { id: 1, lat: 24.8607, lng: 67.0011, title: 'Location A', label: 'A' },
  { id: 2, lat: 24.817, lng: 66.985, title: 'Location B', label: 'B' },
]
</script>

<template>
  <GoogleMap
    :center="center"
    :markers="markers"
    :zoom="zoom"
    height="clamp(280px, 50vh, 560px)"
    @marker-click="console.log($event.marker)" />
</template>
```

If `center` is omitted, the first valid marker is used. Duplicate marker coordinates are valid and
render independently. Empty markers are valid when a valid center is supplied.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `apiKey` | `string` | global config | Local API-key override. |
| `center` | `GoogleMapCoordinate \| null` | first valid marker | Map center, independent from markers. |
| `markers` | `GoogleMapMarker[]` | `[]` | Markers with `lat`, `lng`, optional `id`, `title`, and `label`. |
| `zoom` | `number` | `12` | Map zoom. Reactive after initialization. |
| `height` | `string \| number` | `'400px'` | CSS height; numbers are treated as pixels. |
| `width` | `string \| number` | `'100%'` | CSS width; numbers are treated as pixels. |
| `options` | `GoogleMapOptions` | `{}` | Essential Google Map options such as controls, dragging, scrolling, or `mapId`. |
| `ariaLabel` | `string` | `'Interactive Google map'` | Accessible region label. |
| `loadingText` | `string` | `'Loading map…'` | Default loading message. |
| `errorText` | `string` | `'The map is unavailable.'` | Prefix for the default failure message. |

## Events

| Event | Payload | Description |
| :--- | :--- | :--- |
| `ready` | `{ map: unknown }` | Map initialized. The instance is intentionally opaque. |
| `click` | `{ coordinate, nativeEvent }` | Map surface clicked. |
| `center-changed` | `GoogleMapCoordinate` | Center changed by props or interaction. |
| `zoom-changed` | `number` | Zoom changed by props or interaction. |
| `marker-click` | `{ marker, index, nativeEvent }` | Marker clicked. |
| `error` | `GoogleMapError` | Validation, SSR, configuration, or load failure. |

## Loading, failure, and slots

The component shows an accessible status while loading and an alert when configuration,
coordinates, or network loading fails. Invalid markers are omitted and announced without crashing
the map. Customize states with `#loading` and `#error="{ error }"` slots.

Coordinate validation requires finite numeric latitude in `-90..90` and longitude in `-180..180`.
A missing key, invalid center with no valid fallback marker, unavailable browser APIs, and script
load failure all emit `error` with a stable error code.

## Responsive and lifecycle behavior

The default width is responsive. Use CSS values such as `100%`, `50vh`, or `clamp()` for sizing.
The component observes its container and asks Google Maps to resize without recreating the map.
Ensure its parent ultimately provides non-zero height; a zero-height value cannot display map
tiles. Center, zoom, options, and markers update the existing instance.

Multiple maps reuse one script request. All map/marker listeners and resize observers are removed
when an instance unmounts. The loaded Google script remains page-global, as required by Google
Maps, so later mounts do not download it again.

## SSR limitation

The component renders its fallback markup during server rendering and initializes only after a
browser mount. In SSR applications, render it client-side when possible. A direct loader call
without `window` rejects with `ssr-unavailable`; it never crashes application rendering.

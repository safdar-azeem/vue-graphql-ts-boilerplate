# Icon

**Import:** `import { Icon } from 'vlite3'`

`Icon` renders Iconify identifiers, directly supplied Iconify data, image sources,
and emoji. Iconify loading is online by default for backward compatibility.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `string \| IconifyIcon` | `''` | Iconify ID, local icon data, image URL, data URI, or local image path |
| `emoji` | `string` | `''` | Native emoji character such as `🚀` |

```vue
<Icon icon="lucide:settings" class="h-4 w-4" />
<Icon icon="/assets/logo.svg" class="h-6 w-6" />
<Icon icon="data:image/svg+xml;base64,..." />
<Icon emoji="🔥" class="text-xl" />
```

## Resolution modes

Configure icon behavior synchronously through `createVLite()`:

| Mode | Behavior |
| --- | --- |
| `online` | Default. Icon strings use normal Iconify API resolution. |
| `hybrid` | Registered local data is preferred; unknown strings may load online. |
| `offline` | Only registered data is rendered. Unknown strings never reach Iconify's API loader. |

`@iconify/vue` is a `vlite3` runtime dependency with a `^5.0.0` contract and is
installed automatically. Package-manager deduplication keeps registration and
rendering on the same Iconify storage instance.

### Complete local collection

This is useful for extensions, icon pickers, and runtime-generated icon names:

```ts
import { createApp } from 'vue'
import { icons as lucideIcons } from '@iconify-json/lucide'
import { createVLite } from 'vlite3'
import App from './App.vue'

const app = createApp(App)

app.use(
  createVLite({
    icons: {
      mode: 'offline',
      collections: [lucideIcons],
      fallback: 'lucide:circle-help',
      warnOnMissing: true,
    },
  })
)

app.mount('#app')
```

Collections and individual icons are registered during plugin installation,
before any component can render. The fallback must also be locally registered
in offline mode. With no fallback, a missing offline icon renders nothing.
Warnings are deduplicated by identifier.

### Individual icons and custom collections

```ts
import {
  registerVLiteIcon,
  registerVLiteIconCollection,
  type VLiteIconData,
} from 'vlite3'

const logo: VLiteIconData = {
  body: '<path d="M2 2h20v20H2z" />',
  width: 24,
  height: 24,
}

registerVLiteIcon('company:logo', logo)
registerVLiteIconCollection(myPartialCollection)
```

You can also configure individual data with
`icons.individualIcons`, either as `{ name, data }[]` or a record keyed by icon
identifier. Re-registering the same icon or collection is skipped.

The stable public registry API includes:

- `registerVLiteIcon()`
- `registerVLiteIconCollection()` and `registerVLiteIconCollections()`
- `registerVLiteIcons()`
- `hasVLiteIcon()`
- `resolveVLiteIcon()`
- `listVLiteIcons()`
- `getVLiteIconConfig()`

Non-Vite consumers can import a local IconifyJSON collection and use either
`createVLite()` or these manual registration functions. They do not need to
call `@iconify/vue` APIs directly.

## Selected-icon Vite bundles

For normal applications, bundling selected icons is smaller than including a
complete collection:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vliteIcons } from 'vlite3/vite'

export default defineConfig({
  plugins: [
    vue(),
    vliteIcons({
      mode: 'offline',
      include: ['src/**/*.{vue,ts,tsx,js,jsx}'],
      icons: [
        // Explicitly include runtime-generated values.
        'lucide:settings',
        'lucide:search',
        'lucide:circle-alert',
      ],
    }),
  ],
})
```

```ts
// main.ts
app.use(
  createVLite({
    icons: {
      mode: 'offline',
      fallback: 'lucide:circle-help',
      warnOnMissing: true,
    },
  })
)
```

The Vite integration:

- scans configured source files and the installed `vlite3` distribution;
- reads only installed, version-locked `@iconify-json/<prefix>` packages;
- generates deterministic partial collections and registers them before HTML
  entry modules execute;
- deduplicates identifiers and collection data;
- reports unresolved identifiers;
- never downloads icon data.

Install every scanned collection explicitly, for example:

```bash
npm install @iconify-json/lucide
```

Static scanning cannot discover values from APIs, databases, user settings,
string concatenation, or arbitrary component props. Put those IDs in the
plugin's `icons` array.

To bundle a complete installed collection intentionally:

```ts
vliteIcons({
  mode: 'offline',
  collections: ['lucide'],
})
```

Complete collections are appropriate for icon pickers or unrestricted dynamic
content, but are never bundled by default. Set `autoRegister: false` only when
you want to import and control `virtual:vlite-icons` yourself.

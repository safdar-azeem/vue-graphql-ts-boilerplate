
# Icon

**Import:** `import { Icon } from 'vlite3'`

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `string` | `''` | Iconify ID (e.g., `lucide:home`) or Image URL |
| `emoji` | `string` | `''` | Native emoji character (e.g., `🚀`) |

### Usage

```vue
<Icon icon="lucide:settings" class="w-4 h-4" />
<Icon icon="[https://example.com/logo.png](https://example.com/logo.png)" />
<Icon emoji="🔥" class="text-xl" />

```


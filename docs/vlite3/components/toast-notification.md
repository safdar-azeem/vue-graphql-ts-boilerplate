# ToastNotification

**Composable:** `import { useNotifications, showToast, toast } from 'vlite3'`
**Component:** `import { ToastNotification } from 'vlite3'`

`<ToastNotification />` provides a global, animated toast notification container supporting stacked alerts, multiple position anchors, and rich toast variants. Place `<ToastNotification />` once in your root layout (e.g., `App.vue`).

---

### Component Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `position` | `ToastPosition` | — | Override default global notification position |
| `expand` | `boolean` | `false` | Force expanded list view of stacked toasts |

`ToastPosition` can be one of:
`'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'`

---

### Toast Variants

| Variant | Helper Method | Use Case | Visual Style |
| :--- | :--- | :--- | :--- |
| `success` | `toast.success(msg, options)` | Confirmed operations & positive updates | Green background (`bg-success`) with check icon |
| `error` | `toast.error(msg, options)` | Critical failures & system exceptions | Red background (`bg-danger`) with octagon X icon |
| `warning` | `toast.warning(msg, options)` | Non-critical warnings & soft blocks | Amber background (`bg-warning`) with alert icon |
| `info` | `toast.info(msg, options)` | Neutral status notices & announcements | Blue background (`bg-info`) with info icon |
| `default` | `toast(msg, options)` | Standard notifications & generic messages | Neutral background (`bg-gray-100`) with bell icon |

---

### Options Interface

```ts
export interface ToastOptions {
  description?: string
  duration?: number // Milliseconds (use Infinity for persistent toasts)
  action?: {
    label: string
    onClick: () => void
  }
  position?: ToastPosition
}
```

---

### Composable Usage

```ts
import { useNotifications, showToast, toast } from 'vlite3'

const { configure } = useNotifications()

// Configure global defaults
configure({
  position: 'bottom-right',
  duration: 4000,
  variant: 'default',
})

// 1. Variant Helpers
toast.success('Profile updated', { description: 'Your changes have been saved.' })
toast.error('Payment failed', { description: 'Card declined. Please try another card.' })
toast.warning('Storage limit near', { description: 'You are using 90% of disk quota.' })
toast.info('Update available', { description: 'vLite3 v1.5.0 is ready to install.' })
toast('New message received', { description: 'Alex sent you a message.' })

// 2. Toast with Action Button
toast.warning('File deleted', {
  description: 'Item will be permanently removed.',
  action: {
    label: 'Undo',
    onClick: () => toast.success('Deletion canceled'),
  },
})

// 3. Promise Wrapper
toast.promise(saveData(), {
  loading: 'Saving changes...',
  success: (data) => `Saved ${data.name} successfully`,
  error: (err) => `Failed to save: ${err.message}`,
})

// 4. Low-level Direct Function Call
showToast('Operation status', 'info', { position: 'top-center', duration: 3000 })
```

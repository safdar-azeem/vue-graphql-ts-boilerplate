# ToastNotification

**Composable:** `import { showToast } from 'vlite3'`
**Component:** `import { ToastNotification } from 'vlite3'`

### Component Props

Place `<ToastNotification />` in your root layout (e.g., `App.vue`).

| Prop       | Type            | Default | Description              |
| :--------- | :-------------- | :------ | :----------------------- |
| `position` | `ToastPosition` | —       | Override global position |
| `expand`   | `boolean`       | `false` | Force expanded state     |

type: 'success' | 'error' | 'info' | 'warning' | 'default'

export interface ToastOptions {
description?: string
duration?: number
action?: NotificationAction
position?: ToastPosition
}

function showToast(
message: string,
type?: Notification['type'],
options?: ToastOptions
): number {}

### Composable API

```ts
import { showToast } from 'vlite3'
const { configure, toast } = useNotifications()

// Configuration
configure({
  position: 'top-right',
  duration: 5000,
  variant: 'default',
})

// Usage
showToast('Operation successful')
showToast('Saved!')
showToast('Failed to save')

// Promise wrapper
toast.promise(saveData(), {
  loading: 'Saving...',
  success: 'Data saved',
  error: 'Error saving data',
})
```

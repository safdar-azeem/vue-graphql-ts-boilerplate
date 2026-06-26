# Clipboard

**Import:** `import { Clipboard } from 'vlite3'`

The `Clipboard` component standardizes copy-button presentation and feedback. Use direct text mode for static values the component can write itself, or external action mode when the consuming project owns content generation, redaction, loading, clipboard writing, notifications, or other copy orchestration.

### Success contract

- A resolved `void` or `true` action result is successful.
- A resolved `false` result is unsuccessful and does not show copied feedback.
- A synchronous throw or rejected promise emits `error` and does not show copied feedback.
- While an action is pending, the button shows its loading state and ignores duplicate clicks.

If both `action` and `textToCopy` are supplied, `action` takes precedence.

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `textToCopy` | `string` | — | Direct mode: exact content written by the component |
| `action` | `() => boolean \| void \| Promise<boolean \| void>` | — | External mode: project-owned copy action |
| `variant` | `ButtonVariant` | `outline` | Visual style of the button |
| `size` | `ButtonSize` | `md` | Dimensions |
| `rounded` | `ButtonRounded` | `full` | Border radius |
| `defaultIcon` | `string` | `lucide:copy` | Icon shown in the default state |
| `copiedIcon` | `string` | `lucide:check` | Icon shown after confirmed success |
| `defaultText` | `string` | — | Custom default label |
| `copiedText` | `string` | — | Custom successful label |
| `defaultTextI18n` | `string` | `vlite.clipboard.copy` | I18n key for the default label |
| `copiedTextI18n` | `string` | `vlite.clipboard.copied` | I18n key for the successful label |
| `confirmationDuration` | `number` | `1500` | Successful-feedback duration in milliseconds |
| `asIcon` | `boolean` | `false` | Render an icon-only button |
| `dir` | `'ltr' \| 'rtl' \| 'auto'` | `auto` | Text/icon direction passed to Button |
| `disabled` | `boolean` | `false` | Disable interaction |
| `class` | `any` | — | Custom CSS classes |

At least one of `textToCopy` or `action` is required for an interactive button.

### Events

| Event | Payload | Description |
| :--- | :--- | :--- |
| `copy` | `string \| undefined` | Emitted after confirmed success; direct mode includes the copied text |
| `error` | `Error` | Emitted when direct copying fails or an external action throws/rejects |

### Default slot

The default slot receives `{ copied, loading }`. When supplied, it replaces the component's text label while keeping the standard icon, loading, and confirmation behavior.

### Usage

#### Direct text mode

```vue
<Clipboard text-to-copy="npm install vlite3" />
```

#### External action mode

Keep project-specific generation and clipboard behavior in the project action:

```vue
<script setup lang="ts">
async function copySelected(): Promise<boolean> {
  const output = await generateAndRedactSelection()
  return writeProjectClipboard(output)
}
</script>

<template>
  <Clipboard :action="copySelected" default-text="Copy output" />
</template>
```

#### Row-specific action

```vue
<Clipboard :action="() => copyUrl(request)" as-icon />
```

#### Icon only

Icon-only buttons use the copy icon by default, the check icon after success, and an accessible label derived from the current state.

```vue
<Clipboard text-to-copy="Secret API Key" as-icon rounded="full" />
```

#### Custom text, icons, and duration

```vue
<Clipboard
  text-to-copy="https://example.com/share/123"
  default-text="Copy Link"
  copied-text="Link Copied!"
  default-icon="lucide:link"
  copied-icon="lucide:check-circle"
  :confirmation-duration="2500"
  variant="secondary"
/>
```

#### RTL

Clipboard is built on `Button`, so labeled controls inherit the page or nearest ancestor `dir`. Under `html[dir=rtl]`, the icon sits at inline-start. Inside a `dir="ltr"` island, the control remains LTR with the surrounding strip.

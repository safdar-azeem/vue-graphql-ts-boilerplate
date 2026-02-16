# 🎨 Theming & Customization

Reference guide for **vlite3** and the Tailwind CSS v4 theming system. This setup uses a semantic design token approach inspired by shadcn/ui and optimized for Tailwind CSS v4.

All colors are defined as CSS variables, allowing you to customize the appearance of your application with minimal effort, including full Dark Mode support.

---

## Semantic Colors

Override these variables in `:root` or within a `.dark` class (when using class-based dark mode) to adjust your theme.

| Variable                         | Utility Class                 | Description                             | Recommended Usage                               |
| -------------------------------- | ----------------------------- | --------------------------------------- | ----------------------------------------------- |
| `--color-background`             | `bg-background`               | Default page background (white)         | Main application background                     |
| `--color-foreground`             | `text-foreground`             | Default text color (gray-900)           | Primary content text                            |
| `--color-card`                   | `bg-card`                     | Card background (gray-100)              | Cards, containers, surfaces, panels, dialogs    |
| `--color-primary`                | `bg-primary`                  | Primary brand color (blue)              | Main actions, buttons, active states            |
| `--color-primary-foreground`     | `text-primary-foreground`     | Text on primary background (white)      | Text/icons displayed on primary elements        |
| `--color-secondary`              | `bg-secondary`                | Secondary background (gray-200)         | Secondary actions, muted sections               |
| `--color-secondary-foreground`   | `text-secondary-foreground`   | Text on secondary background (gray-900) | Content displayed on secondary elements         |
| `--color-muted`                  | `bg-muted`                    | Muted background (gray-150)             | Subtle surfaces, table headers, disabled states |
| `--color-muted`                  | `text-muted`                  | Muted text (gray-600)                   | Secondary text, inactive links, descriptions    |
| `--color-accent`                 | `bg-accent`                   | Accent background (gray-150)            | Hover states, selection highlights              |
| `--color-accent-foreground`      | `text-accent-foreground`      | Text on accent background (gray-900)    | Content displayed on accent elements            |
| `--color-destructive`            | `bg-destructive`              | Destructive color (red)                 | Errors, warnings, destructive actions           |
| `--color-destructive-foreground` | `text-destructive-foreground` | Text on destructive background (white)  | Content displayed on destructive elements       |
| `--color-border`                 | `border`                      | Default border color (gray-250)         | Inputs, cards, dividers                         |
| `--radius`                       | `rounded`                     | Global border radius                    | Shared radius across components                 |

---

### Extended Color Variants

For more complex components, vlite3 provides extended variants for main semantic colors (`primary`, `danger`, `warning`, `info`, `success`). These are useful for building nuanced UIs with subtle backgrounds, hover states, and accessible text.

| Base Color  | Variant Variables                                                                                       | Usage Description                                                                                                                                                                                           |
| :---------- | :------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Primary** | `--color-primary-light`<br>`--color-primary-dark`<br>`--color-primary-fg`<br>`--color-primary-fg-light` | **Light**: Subtle background (e.g., 10% opacity).<br>**Dark**: Hover state for the main color.<br>**Fg**: Text color on top of the _main_ color.<br>**Fg-Light**: Text color on top of the _light_ variant. |
| **Danger**  | `--color-danger-light`<br>`--color-danger-dark`<br>`--color-danger-fg`<br>`--color-danger-fg-light`     | **Light**: Error backgrounds (alerts).<br>**Dark**: Hover state for destructive buttons.<br>**Fg**: Text on destructive buttons.<br>**Fg-Light**: Text on error alerts.                                     |
| **Warning** | `--color-warning-light`<br>`--color-warning-dark`<br>`--color-warning-fg`<br>`--color-warning-fg-light` | **Light**: Warning backgrounds.<br>**Dark**: Active/Determined warning states.<br>**Fg**: Text on warning badges.<br>**Fg-Light**: Text on warning backgrounds.                                             |
| **Success** | `--color-success-light`<br>`--color-success-dark`<br>`--color-success-fg`<br>`--color-success-fg-light` | **Light**: Success backgrounds (toasts).<br>**Dark**: Hover/Active success actions.<br>**Fg**: Text on success buttons.<br>**Fg-Light**: Text on success backgrounds.                                       |
| **Info**    | `--color-info-light`<br>`--color-info-dark`<br>`--color-info-fg`<br>`--color-info-fg-light`             | **Light**: Info backgrounds.<br>**Dark**: Hover/Active info actions.<br>**Fg**: Text on info buttons.<br>**Fg-Light**: Text on info backgrounds.                                                            |

**Example Usage:**

```html
<!-- A success badge with subtle background and matching text -->
<div class="bg-success-light text-success-fg-light border border-success/20">
  Operation Completed
</div>

<!-- A danger button with hover effect -->
<button class="bg-danger text-danger-fg hover:bg-danger-dark">Delete</button>
```

---


## 8. Typography Scale System

The typography system is organized into two complementary scales:

* Compact scale (prefixed with `--text--fs-*`) 
* Progressive scale (prefixed with `--text-fs-*`) 

Use the progressive scale only when you need finer visual control beyond the standard Tailwind size tokens. 
For most layout and content needs, prefer the default Tailwind text sizes to maintain consistency.

### Compact Text Scale

```css
--text--fs-1: 0.95em;
--text--fs-2: 0.8em;
--text--fs-3: 0.75em;
--text--fs-4: 0.7em;
--text--fs-5: 0.65em;
--text--fs-6: 0.6em;
--text--fs-7: 0.55em;
--text--fs-8: 0.5em;
```


### Progressive Text Scale

```css
--text-fs-0.5: 1.05em;
--text-fs-1: 1.1em;
--text-fs-1.5: 1.14em;
--text-fs-2: 1.18em;
--text-fs-2.5: 1.22em;
--text-fs-3: 1.26em;
--text-fs-3.5: 1.3em;
--text-fs-4: 1.34em;
--text-fs-4.5: 1.38em;
--text-fs-5: 1.42em;
--text-fs-5.5: 1.46em;
--text-fs-6: 1.5em;
--text-fs-6.5: 1.54em;
--text-fs-7: 1.58em;
--text-fs-7.5: 1.62em;
--text-fs-8: 1.68em;
--text-fs-8.5: 1.72em;
--text-fs-9: 1.8em;
--text-fs-9.5: 2em;
--text-fs-10: 2.5em;
```

### Tailwind Size Tokens

```css
--text-xs: 0.75rem
--text-sm: 0.875rem
--text-base: 1rem
--text-lg: 1.125rem
--text-xl: 1.25rem
--text-2xl: 1.5rem
--text-3xl: 1.875rem
--text-4xl: 2.25rem
--text-5xl: 3rem
--text-6xl: 4rem
```

---

### Usage Examples

```html
<p class="text-fs-2">
  Body text
</p>

<span class="-text-fs-4 text-muted">
  Caption text
</span>

<h1 class="text-xl font-semibold">
  Page Title
</h1>
```


## Hard Rules

Follow these rules strictly to ensure visual consistency and predictable styling across the system:

* Use `border` instead of `border-border` (the default border color (gray-250) is already applied).
* Use `rounded` instead of `rounded-rounded`.
* Use `bg-muted` instead of `bg-secondary/20`.
* Use `gap-x-*` instead of applying `ml-*` or `mr-*` directly on sibling items.
* Use `gap-y-*` instead of applying `mt

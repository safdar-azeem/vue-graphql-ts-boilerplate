# 🎨 Theming & Customization (The Clean System)

Hello there! 👋 This guide will show you how to customize **vlite3** using our Tailwind CSS v4 theming system.

The **Clean** design system relies heavily on a semantic design token approach. It focuses on simplicity, minimalism, ample whitespace, and legible typography. By limiting our color palettes, we reduce visual clutter, letting users easily flow through your application.

---

## 🎨 Semantic Colors

We use CSS variables for all of our colors. Modifying them is incredibly straightforward! Override these variables in `:root` or within a `.dark` class (if you're using class-based dark mode) to create an interface that truly feels yours. 

To keep things "Clean", try to opt for subtle, harmonious tones rather than highly saturated, clashing colors.

| Variable                         | Utility Class                 | Description                             | Recommended Usage                               |
| -------------------------------- | ----------------------------- | --------------------------------------- | ----------------------------------------------- |
| `--color-background`             | `bg-background`               | Default layout background (e.g. white/black) | Main application background. Keep it pure.     |
| `--color-foreground`             | `text-foreground`             | Default text color (e.g. zinc-900/100)  | Primary content text. Should have high contrast.|
| `--color-card`                   | `bg-card`                     | Card background                         | Use for surface elevations (cards, dialogs).    |
| `--color-card-light`             | `bg-card-light`               | Lighter card background                 | Use for nested cards or softer elevations.      |
| `--color-primary`                | `bg-primary`                  | Primary brand color                     | Main actions, buttons, and active states.       |
| `--color-primary-foreground`     | `text-primary-foreground`     | Text on primary background              | Text/icons displayed on primary elements.       |
| `--color-muted`                  | `bg-muted`                    | Muted/subtle background                 | Very soft surfaces for secondary importance.    |
| `--color-muted`                  | `text-muted`                  | Muted/subtle text                       | Secondary text, inactive links, descriptions.   |
| `--color-border`                 | `border`                      | Default border color                    | Use softly! Keep borders light (`/40` or `/30`).|
| `--radius`                       | `rounded`                     | Global border radius                    | A shared radius perfectly ties everything together.|

---

## Root Background and scoped Surface

`ThemeProvider` treats `bgColor` as the root palette seed. An optional
`surfaceColor` independently seeds every `.bg-card` descendant with a complete
local palette, so a dark card on a light page automatically receives readable
foreground, muted, border, input, semantic, chart, shadow, and scrollbar
tokens. The primary brand palette remains unchanged in both scopes.

`.bg-card-light` is a shallower companion to the selected Surface, while
nested `.bg-card` elements move progressively away from their parent color.
Without `surfaceColor`, existing root-derived card behavior remains unchanged.

`primaryColor` maps to the brand `--color-primary*` family. The similarly named
`--color-accent` variable is a neutral interaction token for hover and selected
states; these concepts are intentionally separate.

## Optional base-font spacing

Typography always scales with `baseFontSize`. Tailwind geometry remains fixed
at `--spacing: 0.25rem` by default for backward compatibility. Set
`scaleSpacingWithBaseFontSize` to opt in to:

```text
--spacing = 0.25rem * (baseFontSize / 16)
```

This affects numeric Tailwind spacing utilities such as padding, margin, gap,
offset, width, height, and size. Percentage, viewport, full-size, arbitrary,
and fixed-pixel utilities are unchanged.

---

### Subtle & Extended Color Variants

For more complex and expressive components, vlite3 gives you extended variants for main semantic intents (`primary`, `danger`, `warning`, `info`, `success`). To follow our Clean aesthetic, heavily favor the **Light** backgrounds (e.g., `<color>-light`) paired with **Fg-Light** text, rather than relying on harsh, solid colors!

*   **Primary Variants:** `--color-primary-light`, `--color-primary-dark`, `--color-primary-fg`, `--color-primary-fg-light`
*   **Danger Variants:** `--color-danger-light`, `--color-danger-dark`, `--color-danger-fg`, `--color-danger-fg-light`
*   **Success Variants:** `--color-success-light`, `--color-success-dark`, `--color-success-fg`, `--color-success-fg-light`

**Clean Usage Example:**

```html
<!-- A beautifully subtle success badge without visual fatigue -->
<div class="bg-success-light text-success-fg-light border border-success/20 px-3 py-1 rounded-full text-sm">
  Operation Completed
</div>

<!-- A clear, prominent danger action button -->
<button class="bg-danger text-danger-fg hover:bg-danger-dark transition-colors px-4 py-2 rounded-md">
  Delete Project
</button>
```

---

## ✒️ Typography Scale System

Legible typography is an absolute cornerstone of the Clean system. Our fluid scaling approach guarantees that your text will always sit perfectly within its whitespace.

We provide two unique scales to complement the standard Tailwind tokens (`text-sm`, `text-base`, etc.):

1.  **Compact scale** (Prefix: `--text--fs-*`): Perfect for incredibly dense internal tools where readability is required at small scales.
2.  **Progressive scale** (Prefix: `--text-fs-*`): Great for marketing or editorial pages needing fine-tuned sizing.

*Tip: For standard layout needs, always prefer Tailwind's default `text-*` classes to ensure perfect consistency!*

### Usage Examples

```html
<!-- Need a very specific large-but-not-too-large title? -->
<h1 class="text-fs-6 font-semibold tracking-tight text-foreground">
  Clean Dashboard
</h1>

<!-- Beautiful, readable body text -->
<p class="text-base leading-relaxed text-muted-foreground mt-2">
  Here is some beautifully spaced paragraph text that is very easy to read.
</p>
```

---

## 📐 The "Clean" Hard Rules

To maintain the pristine, highly-usable feel of your interfaces, kindly follow these robust layout rules:

1.  **Keep Borders Invisible (or soft):** Rely on whitespace and soft shadows (glassmorphism) to separate content, instead of heavy box borders. If you use a border, make it subtle (`border-border/30`).
2.  **Use `bg-muted` Intelligently:** Use muted backgrounds for structure to contrast against pure `bg-background` cards. 
3.  **Mind your Gaps:** Let the layout breathe! Rely on Flexbox/Grid `gap-x-*` and `gap-y-*` rather than injecting ad-hoc `mt-*` or `ml-*` margins on sibling items.
4.  **Tailwind Shortcuts:** 
    *   Use `border` instead of `border-border`
    *   Use `rounded` instead of `rounded-md` or `rounded-rounded`

Enjoy building your gorgeous, Clean interface! ✨

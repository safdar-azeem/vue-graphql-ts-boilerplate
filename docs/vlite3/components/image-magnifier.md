# ImageMagnifier

**Import:** `import { ImageMagnifier } from 'vlite3'`

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | **required** | Image source URL |
| `alt` | `string` | `'Magnifiable Image'` | Image alt text |
| `zoom` | `number` | `2` | Magnification zoom level |
| `magnifierSize` | `number` | `120` | Width and height of the magnifier glass in pixels |
| `glass` | `boolean` | `true` | Apply a subtle backdrop blur effect on the magnifier |
| `class` | `any` | — | Custom class for the wrapper element |
| `imageClass` | `any` | — | Custom class for the image element |

### Usage

```vue
<ImageMagnifier 
  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" 
  alt="Red shoes"
  :zoom="2.5" 
  :magnifierSize="150" 
/>
```

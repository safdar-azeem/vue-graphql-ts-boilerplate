# Persona

**Import:** `import { Persona } from 'vlite3'`

A visual representation of a person inside your application. The component consists of an avatar, an optional online status (presence) indicator, a primary name (label), and a secondary details (secondary label).

### Props

| Prop             | Type                                                               | Default   | Description                                          |
| :--------------- | :----------------------------------------------------------------- | :-------- | :--------------------------------------------------- |
| `src`            | `string`                                                           | —         | Image Source URL (passed to Avatar `src`)            |
| `link`           | `string`                                                           | —         | Link to navigate to. Transforms wrapper to `router-link` |
| `alt`            | `string`                                                           | `Avatar`  | Image alt text (also used for fallback initials prep)|
| `fallback`       | `string`                                                           | —         | Custom fallback initials if image fails or missing   |
| `size`           | `AvatarSize` (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`)                 | `md`      | Dimensions scaling for both Avatar and texts         |
| `rounded`        | `AvatarRounded`                                                    | `full`    | Rounding of the Avatar                               |
| `presence`       | `online` \| `offline` \| `busy` \| `dnd` \| `away`                 | —         | Type of presence badge displayed on the avatar       |
| `label`          | `string`                                                           | —         | Primary display text (usually Name)                  |
| `secondaryLabel` | `string`                                                           | —         | Secondary text underneath label (Job, Status)        |
| `labelTheme`     | `default` \| `primary` \| `danger` \| *etc*                        | `default` | Color theme for the primary label                    |
| `hideDetails`    | `boolean`                                                          | `false`   | Option to visually hide the `label` and `secondary`  |
| `class`          | `any`                                                              | —         | Custom classes for the container wrapper             |

### Usage

```vue
<!-- Basic -->
<Persona label="Olivia Martin" secondaryLabel="Frontend Engineer" fallback="OM" />

<!-- With Custom Label Theme -->
<Persona label="Premium Member" secondaryLabel="Subscribed" labelTheme="primary" fallback="PM" />

<!-- With Src & Presence -->
<Persona 
  src="https://unsplash.com/photos/123/download?w=64" 
  alt="Olivia"
  label="Olivia Martin" 
  presence="online" 
/>

<!-- Navigation Link -->
<Persona 
  link="/users/1" 
  label="Olivia Martin" 
  secondaryLabel="View Profile"
  presence="online" 
/>

<!-- Presence Do Not Disturb -->
<Persona 
  fallback="OM"
  label="Olivia Martin" 
  presence="dnd" 
  size="lg"
/>
```

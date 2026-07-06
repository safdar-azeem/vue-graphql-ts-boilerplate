# Footer Component

**Import:** `import { Footer } from 'vlite3'`

### Description

An API-driven, multi-variant footer component for Vue 3. Pass a single JSON data object and the component auto-generates brand sections, link columns, social icons, optional newsletter subscriptions, and legal links. Fully customizable through props with complete dark mode support.

The component ships with 3 visual variants designed for different use cases — from full marketing websites to minimal dashboard footers.

---

### Props

| Prop             | Type                                         | Default      | Description                                                                    |
| :--------------- | :------------------------------------------- | :----------- | :----------------------------------------------------------------------------- |
| `data`           | `FooterData`                                 | **Required** | The complete data object powering the footer.                                  |
| `variant`        | `FooterVariant`                              | `'Variant1'` | Selects the visual style: `'Variant1'`, `'Variant2'`, or `'Variant3'`.         |
| `labels`         | `FooterLabels`                               | `{}`         | Custom static text labels (e.g. overriding "Subscribe", "Follow us").          |
| `containerClass` | `string \| any[] \| Record<string, boolean>` | `undefined`  | Custom class applied to the root footer element.                               |

---

### Events

| Event        | Payload                        | Description                                                 |
| :----------- | :----------------------------- | :---------------------------------------------------------- |
| `subscribe`  | `email: string`                | Emitted when the newsletter subscribe button is clicked.     |
| `link-click` | `url: string, event: MouseEvent` | Emitted when any link is clicked (useful for SPA routing).  |

---

### Data Models (API Reference)

#### `FooterData`

The root object passed to the `:data` prop.

| Field              | Type                       | Description                                                              |
| :----------------- | :------------------------- | :----------------------------------------------------------------------- |
| `brandName`        | `string?`                  | Company or brand name displayed in the footer.                           |
| `brandLogo`        | `string?`                  | URL to the brand logo image.                                              |
| `brandDescription` | `string?`                  | Brand tagline or short description.                                       |
| `linkGroups`       | `FooterLinkGroup[]?`       | Column-based link groups (e.g., Product, Company, Resources).            |
| `socialLinks`      | `FooterSocialLink[]?`      | Social media icon links rendered as icon buttons.                        |
| `copyright`        | `string?`                  | Copyright text (e.g., '© 2024 Acme Inc. All rights reserved.').         |
| `legalLinks`       | `FooterLink[]?`            | Legal links in the bottom bar (e.g., Terms, Privacy Policy).             |
| `newsletter`       | `FooterNewsletterConfig?`  | Optional newsletter subscription section configuration.                  |
| `badge`            | `string?`                  | Small badge text near brand (e.g., version number).                      |

#### `FooterLinkGroup`

Defines a column of links in the footer.

| Field   | Type            | Description                                    |
| :------ | :-------------- | :--------------------------------------------- |
| `title` | `string`        | Column heading (e.g., 'Product', 'Company').   |
| `links` | `FooterLink[]`  | Array of links in this group.                  |

#### `FooterLink`

Individual navigational link.

| Field      | Type       | Description                                                     |
| :--------- | :--------- | :-------------------------------------------------------------- |
| `label`    | `string`   | Display text for the link.                                       |
| `url`      | `string`   | Full URL (href).                                                  |
| `external` | `boolean?` | Opens in a new tab with `rel="noopener noreferrer"`.             |
| `icon`     | `string?`  | Optional leading Iconify icon name.                              |

#### `FooterSocialLink`

Social media icon button.

| Field   | Type      | Description                                               |
| :------ | :-------- | :-------------------------------------------------------- |
| `icon`  | `string`  | Iconify icon name (e.g., `'lucide:instagram'`).           |
| `url`   | `string`  | Full URL for the social link.                             |
| `label` | `string?` | Accessible label for screen readers (e.g., 'Instagram').  |

#### `FooterNewsletterConfig`

Optional newsletter subscription section.

| Field         | Type      | Description                                  |
| :------------ | :-------- | :------------------------------------------- |
| `title`       | `string?` | Heading text (e.g., "Stay updated").         |
| `description` | `string?` | Description below the title.                 |
| `placeholder` | `string?` | Input placeholder text.                      |
| `buttonText`  | `string?` | Submit button text.                          |

#### `FooterLabels`

Dictionary used to override static text inside the component via the `labels` prop.

| Field       | Type      | Description                              |
| :---------- | :-------- | :--------------------------------------- |
| `followUs`  | `string?` | Replaces the "Follow us" heading.        |
| `subscribe` | `string?` | Replaces the "Subscribe" button text.    |
| `newsletter`| `string?` | Replaces the "Newsletter" heading.       |

---

### Variant Descriptions

| Variant    | Style                | Best For                                |
| :--------- | :------------------- | :-------------------------------------- |
| `Variant1` | Classic Columnar     | SaaS products, marketing websites       |
| `Variant2` | Centered / Stacked   | Portfolios, creative agencies, blogs    |
| `Variant3` | Minimal Single-line  | Dashboards, internal tools, admin panels|

---

### Data Contract for AI Agents (JSON Template)

```json
{
  "brandName": "Acme Corp",
  "brandLogo": "https://cdn.example.com/logo.svg",
  "brandDescription": "Building the future of web development.",
  "linkGroups": [
    {
      "title": "Product",
      "links": [
        { "label": "Overview", "url": "/overview" },
        { "label": "Pricing", "url": "/pricing" },
        { "label": "Features", "url": "/features" }
      ]
    },
    {
      "title": "Company",
      "links": [
        { "label": "About", "url": "/about" },
        { "label": "Blog", "url": "/blog" },
        { "label": "Careers", "url": "/careers" }
      ]
    },
    {
      "title": "Resources",
      "links": [
        { "label": "Documentation", "url": "/docs" },
        { "label": "Help Center", "url": "/help" },
        { "label": "API Reference", "url": "/api", "external": true }
      ]
    }
  ],
  "socialLinks": [
    { "icon": "lucide:twitter", "url": "https://twitter.com/acme", "label": "Twitter" },
    { "icon": "lucide:github", "url": "https://github.com/acme", "label": "GitHub" },
    { "icon": "lucide:linkedin", "url": "https://linkedin.com/company/acme", "label": "LinkedIn" }
  ],
  "newsletter": {
    "title": "Stay in the loop",
    "description": "Get notified about new releases and features.",
    "placeholder": "you@example.com",
    "buttonText": "Subscribe"
  },
  "copyright": "© 2024 Acme Corp. All rights reserved.",
  "legalLinks": [
    { "label": "Terms of Service", "url": "/terms" },
    { "label": "Privacy Policy", "url": "/privacy" }
  ],
  "badge": "v2.0"
}
```

---

### Implementation Examples

#### 1. SaaS Product Footer (Variant 1)

```vue
<script setup>
import { Footer } from 'vlite3'

const footerData = {
  brandName: 'Acme Corp',
  brandDescription: 'Building the future of web development.',
  linkGroups: [
    {
      title: 'Product',
      links: [
        { label: 'Overview', url: '#' },
        { label: 'Pricing', url: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', url: '#' },
        { label: 'Careers', url: '#' },
      ],
    },
  ],
  socialLinks: [
    { icon: 'lucide:twitter', url: '#', label: 'Twitter' },
    { icon: 'lucide:github', url: '#', label: 'GitHub' },
  ],
  copyright: '© 2024 Acme Corp. All rights reserved.',
  legalLinks: [
    { label: 'Privacy', url: '#' },
    { label: 'Terms', url: '#' },
  ],
}
</script>

<template>
  <Footer :data="footerData" variant="Variant1" />
</template>
```

#### 2. Centered Portfolio Footer (Variant 2)

```vue
<template>
  <Footer :data="portfolioData" variant="Variant2" />
</template>
```

#### 3. Minimal Dashboard Footer (Variant 3)

```vue
<script setup>
const dashboardFooter = {
  brandName: 'AppDash',
  copyright: '© 2024 AppDash Inc.',
  legalLinks: [
    { label: 'Terms', url: '#' },
    { label: 'Privacy', url: '#' },
  ],
}
</script>

<template>
  <Footer :data="dashboardFooter" variant="Variant3" />
</template>
```

---

### Senior Engineer's Implementation Notes

1.  **API-Driven Design**: The component is purely presentational — it takes a JSON object and renders the footer. This makes it perfect for CMS-driven sites where footer content comes from an API.
2.  **Event Handling**: The `link-click` event allows SPA apps to intercept navigation and use `router.push()` instead of hard page loads. Call `event.preventDefault()` in your handler to stop the default `<a>` navigation.
3.  **Variant Selection**:
    - **Variant 1** is the classic columnar layout matching most SaaS/product sites.
    - **Variant 2** centers everything — ideal for portfolios, blogs, and creative agencies.
    - **Variant 3** is a single-line minimal footer — perfect for dashboards and internal tools where you don't need link columns.
4.  **Newsletter**: The optional newsletter section emits a `subscribe` event with the email string. No built-in HTTP calls — wire it to your own API.
5.  **Responsive**: All variants are fully responsive. Link columns stack vertically on mobile. The bottom bar switches from horizontal to vertical layout on small screens.

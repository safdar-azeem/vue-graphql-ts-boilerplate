# SeoProvider

**Import:** `import { SeoProvider, useSeo } from 'vlite3'`

`SeoProvider` is vlite3's framework-agnostic SEO foundation. Applications map
site and route domain data onto provider inputs; vlite3 alone owns fallback
resolution, token replacement, normalization, and adapter output.

The default adapter is suitable for client-rendered Vue applications. Nuxt/SSR
hosts supply an adapter while reusing the same `SeoPayload`.

## Breaking changes

- `SeoData.keywords` accepts a string, an array, or `null`; normalized
  `SeoPayload.keywords` is always a comma-separated string.
- `SeoData.robots` accepts a string, a boolean index flag, a structured
  directive object, or `null`; normalized `SeoPayload.robots` is a string or
  `null`.
- `SeoData.jsonLd` accepts one object, an ordered array, or `null`;
  normalized `SeoPayload.jsonLd` is always an array.
- All canonical fields, including OG/Twitter/JSON-LD fields, can be declared
  directly through `useSeo`. `overrides` remains compatible and wins.
- `SeoData` is the authored input contract. `SeoPayload` is the normalized
  adapter contract.

## Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `defaults` | `Partial<SeoData> \| null` | `null` | Site-level baseline. |
| `fallback` | `Partial<SeoData> \| null` | `null` | Static page/domain fallback. |
| `pageFallbacks` | `Record<string, Partial<SeoData>> \| null` | `null` | Page-key fallback map. |
| `pageType` | `string` | `home` | Active page key when no context declares one. |
| `globalReplacements` | `SeoReplacements` | — | Tokens available to every layer. |
| `sanitizeText` | `boolean` | `false` | Converts resolved textual fields from HTML/rich text to plain text. |
| `adapter` | `SeoAdapter \| null` | DOM adapter | Host-specific emitter. |

The provider emits `update(payload: SeoPayload)` after every normalized
change and renders its default slot.

## Resolution contract

Precedence is:

1. `context.overrides`
2. direct `useSeo` context fields
3. active page/static fallback
4. site defaults

Empty strings and empty arrays fall through. `null` explicitly clears an
inherited value. Tokens are replaced after a layer is selected. When
sanitization is enabled, textual fields are converted to plain text after token
replacement.

OG and Twitter title, description, image, and URL derive from the normalized
core fields when their dedicated values are absent. `ogType` defaults to
`website` on `home`; `twitterCard` derives from image presence.
Twitter image alt text derives from `ogImageAlt` when it is not authored
separately.

## Input ergonomics

```ts
const defaults: Partial<SeoData> = {
  title: 'Acme',
  description: '<p>Furniture &amp; lighting</p>',
  keywords: ['furniture', 'lighting'],
  robots: { index: true, follow: true },
  jsonLd: [
    createOrganizationStructuredData({
      name: 'Acme',
      url: 'https://example.com',
    }),
    createWebPageStructuredData({
      name: 'Home',
      url: 'https://example.com',
    }),
  ],
}
```

Robot booleans normalize as follows:

| Input | Output |
| :--- | :--- |
| `true` | `index, follow` |
| `false` | `noindex, nofollow` |
| `{ index: false, follow: true }` | `noindex, follow` |

Structured robots also support `archive`, `imageIndex`, `translate`, and
an `additional` directive list.

## Structured-data builders

All builders are pure, DOM-free functions returning plain JSON-LD objects:

- `createArticleStructuredData`
- `createPersonStructuredData`
- `createCreativeWorkStructuredData`
- `createWebPageStructuredData`
- `createOrganizationStructuredData`
- `createBreadcrumbListStructuredData`
- `createStructuredData` for any other schema.org type
- `defineStructuredData` as a typed passthrough for fully custom objects

Dedicated builders include `https://schema.org` as `@context`, omit
`null`/`undefined` optional properties, and can receive a custom context or
`@id`.

## Plain-text sanitizer

`htmlToPlainText(value, options?)` is a pure O(input) scanner. It strips tags,
comments, script/style contents, decodes named and numeric entities, and
normalizes whitespace. Set `preserveLineBreaks` for multi-line output.

Use the provider's `sanitizeText` prop for all resolved SEO text, or call the
helper directly when structured-data descriptions also need the same value.

## Canonical/OG URL composition

`composeSeoUrl(origin, path, options?)` and its
`composeCanonicalUrl` alias:

- require an HTTP(S) origin;
- normalize root and trailing slashes;
- preserve search parameters by default;
- omit fragments by default;
- support `remove`, `preserve`, or `add` trailing-slash modes.

Invalid origins return an empty string rather than emitting a malformed URL.

## Per-page context

```ts
const handle = useSeo({
  pageType: 'article',
  title: '{{articleTitle}} · {{siteName}}',
  description: article.body,
  canonicalUrl: composeSeoUrl(origin, route.path),
  robots: { index: article.isPublished, follow: true },
  jsonLd: createArticleStructuredData({
    headline: article.title,
    description: htmlToPlainText(article.body),
  }),
  replacements: {
    articleTitle: article.title,
    siteName: site.name,
  },
  sanitizeText: true,
})

handle.update(nextContext)
handle.clear()
```

Multiple callers merge in registration order; later defined scalar fields win,
while replacements and overrides shallow-merge. Each handle clears only its
own entry and automatically unregisters on unmount. Outside a provider,
`useSeo` remains a safe no-op.

## Adapters

`createDomSeoAdapter()` writes title, standard meta, complete Open Graph and
Twitter meta, canonical, favicon, and every JSON-LD block. It keeps a single
tag per semantic key, removes stale tags during navigation, reuses JSON-LD
scripts by `@id` or stable position, and removes all owned state on
`reset()`. It no-ops when `document` is unavailable.

Custom adapters receive normalized data:

```ts
interface SeoPayload {
  pageType: string
  title: string
  description: string
  keywords: string
  robots: string | null
  jsonLd: SeoStructuredData[]
  // remaining canonical, OG, Twitter, favicon, and site fields
}
```

## Pure exports and tests

The pure modules export `normalizeSeo`, `replaceSeoTokens`,
`normalizeSeoKeywords`, `normalizeSeoRobots`, `normalizeSeoJsonLd`,
the sanitizer, URL composers, and every structured-data builder. They import no
Vue, Nuxt, or DOM APIs and are covered by the plain-Node test file
`tests/SeoProvider.test.ts`.

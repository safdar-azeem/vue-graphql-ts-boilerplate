---
title: Cart
description: A reusable, fully-typed cart component with 4 visual variants — built to work for both e-commerce sites and POS systems from a single API. The cart does the math for you.
---

# Cart

A flexible, fully-typed cart component for the vlite3 library. The same `<Cart />` component
renders an e-commerce slide-over drawer, a POS register list, a full-page cart with a sticky
summary, or a header mini-cart — driven entirely by the `variant` prop and a `features` toggle
object.

**The big idea:** the cart owns all the business math. Subtotal, discount, tax, shipping and
grand-total are computed inside the component from `items + tax + shipping + coupon`. You pass
in the data, the cart does the rest. If you already have server-side totals, you can still pass
`data.totals` and the cart will use them verbatim.

## Highlights

- **Self-driving math** — pass `items + tax + shipping + coupon` and the cart computes
  subtotal, discount, tax, shipping, and grand-total internally. Re-runs on every item change.
- **Plug-and-play tax** — rate, flat, exempt, or VAT-inclusive.
- **Plug-and-play shipping** — flat, free, free-over-threshold, tiered, pickup, or a custom
  function. Free-shipping progress with a formatted remaining amount is rendered automatically.
- **Cart-wide currency** — set `data.currency` once and every internal `Price` in line items,
  summaries, coupon discounts, and progress messages uses that currency. Server-provided totals
  can also carry `totals.currency`.
- **Two coupon modes** — sync (`data.coupons[]`, validated in-browser) or async
  (`validateCoupon` prop, validated by your API). Fixed or percentage. The cart drives the
  `applying` / `applied` / `invalid` / `expired` / `error` UX for you.
- **4 visual variants** out of the box: Drawer, POS, Full Page, Mini.
- **Per-feature toggles** — turn on/off subtotal, discount, estimated tax, shipping, coupon,
  total savings, thumbnails, qty editing, item removal, "clear cart" — independently.
- **Coupon UX modeled as states** — `idle`, `applying`, `applied`, `invalid`, `expired`, `error`
  with proper border / icon / helper text for each.
- **Read-only mode** — disables qty editing, item removal and coupon mutation. Use it for order
  detail pages.
- **Compact mode** — same convention as `Invoice`. Reduces padding / typography for dense
  contexts.
- **Built on the library's own primitives** — `Input`, `Button`, `Label`, `Price`, `Icon`.
  No custom inputs, no duplicated design tokens.
- **Trust signals** — pass a `trustSignals` array to render preformatted shipping thresholds,
  return windows, secure-checkout notes, etc., dynamically via the API instead of static text.
- **`v-model` for the applied coupon** — `(cart) => cart.coupon` and the cart auto-applies
  internally.

## Quick start — self-driving

This is the **recommended** path. You pass your line items, the tax rate, the shipping rule,
and a list of valid coupons. The cart computes everything else, including the discount amount
when the user applies a coupon.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Cart } from 'vlite3'
import type { CartData, CartCouponDefinition, CartCoupon } from 'vlite3'

// Your product/service line items — the only thing you have to maintain
const cart = ref<CartData>({
  title: 'Your Cart',
  currency: 'USD', // ISO 4217 code used by all cart price displays
  items: [
    {
      id: 1,
      name: 'Wireless Noise-Cancelling Headphones',
      sku: 'AUD-NC-2024',
      variant: 'Midnight Black',
      thumbnail: 'https://…/headphones.jpg',
      price: 299,
      quantity: 1,
      taxable: true,
    },
    {
      id: 2,
      name: 'Mechanical Keyboard',
      variant: 'Cream',
      price: 159,
      quantity: 2,
      taxable: true,
    },
  ],

  // ── Tax config — the cart applies this to taxable items ──
  tax: {
    mode: 'rate',         // 'rate' | 'flat' | 'exempt' | 'inclusive'
    rate: 8.75,           // 8.75% US sales tax
    label: 'Sales Tax',
    applyTo: 'afterDiscount',
  },

  // ── Shipping config ──
  shipping: {
    mode: 'freeOver',     // 'flat' | 'free' | 'freeOver' | 'tiered' | 'function' | 'pickup'
    cost: 9.99,           // standard shipping rate
    freeOver: 50,         // free when subtotal ≥ 50
    label: 'Standard shipping',
  },

  // ── Coupon catalog — the cart validates user input against this list ──
  coupons: [
    {
      code: 'WELCOME10',
      type: 'percentage',          // 'percentage' or 'fixed'
      value: 10,                    // 10% off
      description: '10% off your first order',
      minSubtotal: 100,
      maxDiscount: 50,
      expiresAt: '2026-12-31',
    },
    {
      code: 'SAVE25',
      type: 'fixed',
      value: 25,                    // 25 off in the cart currency
      description: '25 off your order',
    },
    {
      code: 'VIP20',
      type: 'percentage',
      value: 20,
      description: '20% off — VIP only',
      minSubtotal: 200,
      maxDiscount: 100,
    },
  ] as CartCouponDefinition[],

  // ── Trust Signals (Optional) ──
  trustSignals: [
    { icon: 'lucide:truck', text: 'Free shipping over 50' },
    { icon: 'lucide:rotate-ccw', text: '30-day easy returns' },
    { icon: 'lucide:shield-check', text: 'Secure checkout' },
  ],
})
</script>

<template>
  <Cart :data="cart" variant="Variant1" @continue="$router.push('/checkout')" />
</template>
```

That's it. No math in your component, no API call to validate the coupon, no discount
recomputation when the user changes quantity. The cart does it all.

## Quick start — with `useCart`

Use `useCart` when your page needs to add products from elsewhere, read quantities for badges,
or wire the cart events without writing the same item-management code in every app.

```vue
<script setup lang="ts">
import { Cart, useCart } from 'vlite3'
import type { CartItem } from 'vlite3'

const cart = useCart({
  title: 'Your Cart',
  currency: 'USD', // preserved in cart.data and computed totals
  tax: { mode: 'rate', rate: 8.75 },
  shipping: { mode: 'freeOver', cost: 9.99, freeOver: 50 },
  items: [],
})

const product: CartItem = {
  id: 'keyboard-cream',
  name: 'Mechanical Keyboard',
  variant: 'Cream',
  price: 159,
  quantity: 1,
  taxable: true,
}

function addProduct() {
  cart.addToCart(product)
}

function quantityInCart(productId: string) {
  return cart.getQuantity(productId)
}
</script>

<template>
  <button @click="addProduct">
    Add to cart ({{ quantityInCart('keyboard-cream') }})
  </button>

  <Cart
    :data="cart.data"
    variant="Variant1"
    @update:quantity="cart.updateQuantity"
    @remove="cart.removeFromCart"
    @clear="cart.clearCart"
    @update:coupon="cart.setCoupon"
  />
</template>
```

### `useCart` return API

| Name | Type | Description |
| --- | --- | --- |
| `items` | `Ref<CartItem[]>` | Reactive cart line items. Use this when you need to render or watch the live cart contents. |
| `coupon` | `Ref<CartCoupon \| null>` | Reactive applied coupon. Updated by `setCoupon` and suitable for syncing with `<Cart @update:coupon>`. |
| `totals` | `ComputedRef<CartTotals>` | Computed totals from the same cart calculator used by `<Cart />`: subtotal, discount, tax, shipping, grand total, item count, and savings. |
| `data` | `ComputedRef<CartData>` | A ready-to-pass object for `<Cart :data="cart.data" />`. It includes current `items`, `coupon`, `totals`, and any options passed to `useCart`. |
| `itemCount` | `ComputedRef<number>` | Total quantity across all cart lines. Useful for header badges and mini-cart counts. |
| `isEmpty` | `ComputedRef<boolean>` | `true` when the cart has no line items. Useful for disabling checkout actions. |
| `addToCart(item, quantity?)` | `(item: CartItem, quantity?: number) => void` | Adds a new line item or merges with an existing line that has the same `id`. Quantity defaults to `item.quantity` or `1`, and respects `maxQuantity`. |
| `removeFromCart(itemId, quantity?)` | `(itemId: string \| number, quantity?: number) => void` | Removes a line completely when `quantity` is omitted. When `quantity` is provided, subtracts that amount and removes the line at zero. |
| `updateQuantity(itemId, quantity)` | `(itemId: string \| number, quantity: number) => void` | Sets an exact line quantity. Values less than or equal to `0` remove the item. |
| `incrementQuantity(itemId, amount?)` | `(itemId: string \| number, amount?: number) => void` | Increases a line quantity. `amount` defaults to `1`. |
| `decrementQuantity(itemId, amount?)` | `(itemId: string \| number, amount?: number) => void` | Decreases a line quantity. `amount` defaults to `1`, and the line is removed at zero. |
| `setItems(nextItems)` | `(nextItems: CartItem[]) => void` | Replaces the whole cart item list. Use after loading a saved cart or syncing from an API. |
| `clearCart()` | `() => void` | Removes every item from the cart. Useful for `<Cart @clear="cart.clearCart" />`. |
| `setCoupon(nextCoupon)` | `(nextCoupon: CartCoupon \| null) => void` | Sets or clears the applied coupon. Wire this to `<Cart @update:coupon="cart.setCoupon" />`. |
| `getQuantity(itemId)` | `(itemId: string \| number) => number` | Returns the current quantity for a line item, or `0` when the item is not in the cart. |
| `getCartItems()` | `() => CartItem[]` | Returns a shallow-copied snapshot of the current cart items for API calls, persistence, or analytics. |

## Quick start — async coupon (call your API)

If your coupons live in a database (rate-limited, single-use, fraud-checked), swap the static
`data.coupons` list for a `validateCoupon` prop. The cart will await your promise and drive
the `applying` → `applied` / `invalid` / `expired` / `error` UX around it.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Cart } from 'vlite3'
import type { CartData, CartCouponDefinition } from 'vlite3'

const cart = ref<CartData>({
  currency: 'USD', // passed into validateCoupon as the currency context
  items: [/* … */],
  tax: { mode: 'rate', rate: 8.75 },
  shipping: { mode: 'flat', cost: 9.99 },
})

async function validateCoupon(code, { subtotal, currency, items }) {
  const res = await fetch(`/api/coupons/${code}`, {
    method: 'POST',
    body: JSON.stringify({ subtotal, currency, items }),
  })
  if (res.status === 404) {
    return { code, state: 'invalid', message: 'That coupon code is not valid.' }
  }
  if (res.status === 410) {
    return { code, state: 'expired', message: 'This coupon has expired.' }
  }
  if (!res.ok) {
    return { code, state: 'error', message: 'We could not apply that coupon right now.' }
  }
  // 200 — return the definition, the cart applies the discount itself
  return (await res.json()) as CartCouponDefinition
}
</script>

<template>
  <Cart
    :data="cart"
    :validate-coupon="validateCoupon"
    variant="Variant3"
    @update:coupon="(c) => cart.coupon = c"
    @update:totals="(t) => cart.totals = t" />
</template>
```

Resolve with a `CartCouponDefinition` to apply, or `{ code, state, message }` to reject.

## Quick start — server-side totals (advanced)

Already have totals from your API? Skip the built-in calculator and pass `data.totals` directly.

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
import { Cart } from 'vlite3'
import type { CartData, CartTotals } from 'vlite3'

const cart = ref<CartData>({
  title: 'Your Cart',
  currency: 'EUR',
  items: [/* … */],
  // `totals` is OPTIONAL — if you pass it, the cart uses it verbatim and skips its own math.
  // If you don't, the cart computes it from items + tax + shipping + coupon.
})
const totals = ref<CartTotals>(/* fetched from your API */)

watch([() => cart.value.items, () => cart.value.coupon], async () => {
  const res = await fetch('/api/cart/quote', { method: 'POST', body: JSON.stringify(cart.value) })
  totals.value = await res.json()
}, { deep: true })
</script>

<template>
  <Cart :data="{ ...cart, totals: totals }" variant="Variant1" />
</template>
```

The cart will render your server-side totals as-is. For display, it uses `data.currency` first
and falls back to `data.totals.currency` when `data.currency` is missing. If coupon rules or
your async validator depend on currency, still pass `data.currency`; that is the currency sent
to coupon validation.

## Currency display

Use ISO 4217 currency codes such as `USD`, `EUR`, `PKR`, or `AED`.

The cart passes one active currency into every internal `Price` component used by:

- line item unit prices, original prices, and line totals
- subtotal, discount, shipping, estimated tax, grand total, and total savings rows
- applied coupon discount pills
- free-shipping progress and coupon min-spend messages
- the `Variant4` header total

Currency precedence for display is:

1. `data.currency`
2. `data.totals.currency`
3. the global `Price` config from `createVLite`

When the cart computes totals internally, it writes `totals.currency` from `data.currency`,
`tax.currency`, or `shipping.currency`. Currency-specific coupons and `validateCoupon` receive
`data.currency`, so set `data.currency` when coupon validity depends on the order currency.

## Quick start — manual control (legacy / maximal control)

If you want full control — drive every state transition yourself — skip the new APIs and use
the original `apply-coupon` / `remove-coupon` events. The cart still renders everything
(applied pill, discount row, free-shipping hint) based on whatever you set `data.coupon` to.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Cart } from 'vlite3'
import type { CartData, CartCoupon } from 'vlite3'

const cart = ref<CartData>({ /* items + tax + shipping, no coupons list, no validateCoupon */ })
const coupon = ref<CartCoupon>({ code: '', state: 'idle' })

async function onApplyCoupon(code: string) {
  coupon.value = { code, state: 'applying' }
  const def = await fetch(`/api/coupons/${code}`).then((r) => r.json())
  if (!def) {
    coupon.value = { code, state: 'invalid', message: 'Invalid coupon code.' }
  } else {
    coupon.value = {
      code,
      state: 'applied',
      discountAmount: def.amount,   // you pass the computed amount; cart renders it
      description: def.description,
    }
  }
  cart.value.coupon = coupon.value
}
</script>

<template>
  <Cart
    :data="cart"
    @apply-coupon="onApplyCoupon"
    @remove-coupon="coupon = { code: '', state: 'idle' }; cart.coupon = undefined" />
</template>
```

## Variants

| Variant       | Use case                                       | Layout                                                                 |
| ------------- | ---------------------------------------------- | ---------------------------------------------------------------------- |
| `Variant1`    | E-commerce slide-over drawer                   | Full line items, sticky bottom summary + actions                       |
| `Variant2`    | POS / register / fast checkout                 | Dense list, no thumbnails, dashed dividers, inline coupon              |
| `Variant3`    | Full-page cart (`/cart` route)                 | 2-column with sticky summary card on lg+; stacks on mobile             |
| `Variant4`    | Header dropdown / mini cart                    | Single column, summary-first, tiny line items                          |

## Coupon States

The `CartCoupon.state` field drives the entire UX of the coupon input. The cart sets this
state automatically when you use `data.coupons` or `validateCoupon`. If you drive it
manually, set it from your validation logic.

| State       | UI                                                                                     |
| ----------- | -------------------------------------------------------------------------------------- |
| `idle`      | Empty input, no validation feedback.                                                  |
| `applying`  | Spinner replaces the Apply button label, input + button disabled.                     |
| `applied`   | Green check pill showing the code, description, and discount amount. Remove replaces Apply. |
| `invalid`   | Red border on the input, red helper text, error icon.                                  |
| `expired`   | Amber border, amber helper text, clock icon.                                           |
| `error`     | Red border, red helper text, alert icon — message comes from `coupon.message`.         |

## Tax config (`CartTaxConfig`)

| Mode          | What it does                                          | Required fields             |
| ------------- | ----------------------------------------------------- | --------------------------- |
| `rate`        | `%` tax on post-discount subtotal (default base)      | `rate` (e.g. `8.75`)        |
| `flat`        | Fixed tax amount regardless of cart value             | `amount`                    |
| `exempt`      | No tax at all (digital goods, B2B resale)             | —                           |
| `inclusive`   | Tax already baked into the displayed price (EU VAT)   | `rate`                      |

Use `applyTo: 'afterDiscount'` (default) to tax the discounted subtotal, or
`applyTo: 'subtotal'` to tax the full price (some jurisdictions require this).

## Shipping config (`CartShippingConfig`)

| Mode         | What it does                                                                                  |
| ------------ | --------------------------------------------------------------------------------------------- |
| `flat`       | Always `cost`                                                                                 |
| `free`       | Always free                                                                                   |
| `pickup`     | In-store pickup — always free, label says "In-store pickup"                                   |
| `freeOver`   | `cost` normally, free when subtotal ≥ `freeOver`. UI shows a formatted "Add more for free shipping" amount. |
| `tiered`     | Lookup table; first row with `minSubtotal ≤ subtotal` wins.                                  |
| `function`   | `(subtotal, items) => { cost, isFree?, label? }` — fully custom.                              |

## Coupon definition (`CartCouponDefinition`)

| Field         | Type                | Notes                                                                                  |
| ------------- | ------------------- | -------------------------------------------------------------------------------------- |
| `code`        | `string`            | Required. Matched case-insensitively.                                                  |
| `type`        | `'percentage' \| 'fixed'` | Required. Determines how `value` is interpreted.                                  |
| `value`       | `number`            | Required. Percent (0-100) for `percentage`, currency amount for `fixed`.              |
| `description` | `string?`           | Shown in the applied pill.                                                             |
| `minSubtotal` | `number?`           | Min cart subtotal required to apply. UI shows a formatted "Add more to use CODE" amount. |
| `maxDiscount` | `number?`           | Cap on the discount — typically used with `type: 'percentage'`.                       |
| `expiresAt`   | `string \| Date?`   | Expiry. After this, the cart auto-rejects with `expired` state.                        |
| `currency`    | `string?`           | Coupon only applies if cart currency matches.                                          |
| `minItems`    | `number?`           | Min number of items in cart.                                                            |
| `usageLimit`  | `number?`           | Reserved for future client-side tracking; server-side enforcement recommended.        |

## Features (toggles)

Every optional block can be turned on or off via the `features` prop. Defaults match a standard
e-commerce cart; POS scenarios typically disable `thumbnails` and `description`.

```ts
features: {
  editableQuantity: true,
  removable: true,
  clearable: true,
  coupon: true,
  subtotal: true,
  discount: true,
  estimatedTax: true,
  shipping: true,
  totalSavings: true,
  continue: true,
  continueShopping: true,
  thumbnails: true,
  description: true,
  sku: true,
  itemVariant: true,
  emptyState: true,
  trustSignals: true,
}
```

For a POS scenario:

```ts
features: {
  thumbnails: false,
  description: false,
  sku: false,
  totalSavings: false,
  continueShopping: true, // shown as "Add more"
  trustSignals: false,
}
```

## Read-only mode

Set `data.readonly = true` (or pass `readonly` globally) to disable every editing affordance —
quantity stepper, remove buttons, "clear cart", and the coupon field. The cart becomes a static
summary. Use this for **order detail pages** and **past-order receipts**.

## Compact mode

Pass `data.compact = true` to reduce padding, spacing, and font sizes — same convention as the
`Invoice` component.

## Global configuration

The Cart component can be globally configured via `createVLite`:

```ts
import { createApp } from 'vue'
import { createVLite } from 'vlite3'

const app = createApp(App)
app.use(createVLite, {
  components: {
    cart: {
      variant: 'Variant3', // default for the whole app
      compact: true,
      actions: {
        continueLabel: 'Proceed to checkout',
      },
    },
  },
})
```

## Events

| Event             | Payload                                                  | When                                                |
| ----------------- | -------------------------------------------------------- | --------------------------------------------------- |
| `update:quantity` | `(itemId, newQuantity)`                                  | User clicks +/- on a stepper or types a new qty.    |
| `remove`          | `(itemId)`                                               | User clicks the trash / × button on a line.        |
| `clear`           | `()`                                                     | User clicks "Clear cart".                           |
| `apply-coupon`    | `(code: string)`                                         | User submits a coupon code. Always emitted.         |
| `remove-coupon`   | `()`                                                     | User removes an applied coupon.                     |
| `coupon-change`   | `(code: string)`                                         | User types in the coupon field.                     |
| `update:coupon`   | `(coupon: CartCoupon \| null)`                           | Cart wants to change the applied coupon (apply / reject / remove). Use with `v-model:coupon`. |
| `update:totals`   | `(totals: CartTotals)`                                   | Cart's currently-used totals. Fires whenever the totals change — whether the cart computed them or you supplied them. **Observe only.** Use to sync to your server, but never write this back into `data.totals` (it'll freeze the cart on the first emitted value). |
| `continue`        | `()`                                                     | User clicks the primary action.                     |
| `continue-shopping` | `()`                                                   | User clicks the secondary action.                   |

## API

See the [Cart Demo](/components/cart) for a full interactive reference. The key types are:

- `CartData` — root data object (includes `tax`, `shipping`, `coupons`, `currency`)
- `CartItem` — one line item
- `CartTotals` — subtotal / discount / tax / grand total / currency (auto-computed if not provided)
- `CartTaxConfig` — `rate | flat | exempt | inclusive` tax configuration
- `CartShippingConfig` — `flat | free | freeOver | tiered | function | pickup` shipping rule
- `CartCouponDefinition` — coupon business rules (type, value, min/max, expiry, etc.)
- `CartCoupon` — applied coupon with state + (optional) definition
- `CartFeatures` — per-feature on/off toggles
- `CartActions` — action button configuration
- `CartLabels` — text label overrides for i18n / rebranding
- `CartTrustSignal` — array of icon + text objects for rendering trust signals
- `CartVariant` — `'Variant1' | 'Variant2' | 'Variant3' | 'Variant4'`
- `CartCouponState` — `'idle' | 'applying' | 'applied' | 'invalid' | 'expired' | 'error'`
- `CartProps` — component props (adds `validateCoupon` for async validation)
- `useCart` — cart state composable for adding/removing items and passing data into `<Cart />`
- `UseCartOptions` / `UseCartReturn` — composable options and return contracts

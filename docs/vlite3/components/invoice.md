# Invoice Component

**Import:** `import { Invoice, InvoiceTotals } from 'vlite3'`

### Description

A highly-sophisticated, production-grade invoice and receipt engine for Vue 3. It provides 4 distinct visual variants designed to handle everything from legal enterprise billing to thermal POS receipts and modern service invoices.

The component is strictly typed, accessible, and print-optimized with built-in support for barcodes (CODE128), QR codes, and semantic status coloring.

---

### Props

| Prop      | Type             | Default      | Description                                                                           |
| :-------- | :--------------- | :----------- | :------------------------------------------------------------------------------------ |
| `data`    | `InvoiceData`    | **Required** | The complete data object powering the invoice.                                        |
| `variant` | `InvoiceVariant` | `'Variant1'` | selects the visual style: `'Variant1'`, `'Variant2'`, `'Variant3'`, or `'Variant4'`.  |
| `compact` | `boolean`        | `false`      | When true, scales down padding and typography. See **CSS Variables** for fine-tuning. |
| `labels`  | `InvoiceLabels`  | `{}`         | Custom static text labels (e.g. overriding "Invoice", "Issued").                      |

---

### Data Models (API Reference)

#### `InvoiceData`

The root object passed to the `:data` prop.

| Field           | Type                   | Description                                                              |
| :-------------- | :--------------------- | :----------------------------------------------------------------------- |
| `invoiceNumber` | `string`               | **Required.** Primary identifier (e.g., "INV-2024-001").                 |
| `items`         | `InvoiceLineItem[]`    | **Required.** Array of products/services.                                |
| `totals`        | `InvoiceTotal[]`       | **Required.** Array of summary rows (Subtotal, Tax, Final).              |
| `brandTitle`    | `string?`              | Custom header title (e.g., "COMMERCIAL INVOICE"). Defaults to "Invoice". |
| `brandName`     | `string?`              | Your company name shown in the header.                                   |
| `brandLogo`     | `string?`              | URL for the brand logo. Transparent PNG/SVG recommended.                 |
| `status`        | `string?`              | Raw status string (e.g. "Paid"). Affects semantic coloring.              |
| `issuedDate`    | `string \| Date?`      | Date the invoice was generated.                                          |
| `dueDate`       | `string \| Date?`      | Deadline for payment.                                                    |
| `companyInfo`   | `InvoiceCompanyInfo?`  | Nested object for issuer details (From).                                 |
| `customerInfo`  | `InvoiceCustomerInfo?` | Nested object for recipient details (Billed To).                         |
| `shippingInfo`  | `InvoiceCustomerInfo?` | Nested object for shipping details (Ship To).                            |
| `paymentMethod` | `string?`              | Payment method used or expected.                                         |
| `shippingMethod`| `string?`              | Shipping method used or expected.                                        |
| `barcode`       | `string?`              | Renders a CODE128 barcode at the bottom.                                 |
| `qrcode`        | `string?`              | QR value encoded exactly as provided.                                    |
| `qrcodeSize`    | `number?`              | Overrides the visual variant's default QR size.                          |
| `notes`         | `string?`              | Multi-line text for memos or additional terms.                           |
| `footerText`    | `string?`              | Legal small print at the very bottom.                                    |

#### `InvoiceLineItem`

Fields for individual row items in the document.

| Field           | Type               | Description                                            |
| :-------------- | :----------------- | :----------------------------------------------------- |
| `id`            | `string \| number` | Unique item ID (used as Vue key).                      |
| `name`          | `string`           | **Required.** Display name of the product/service.     |
| `quantity`      | `number`           | **Required.** Quantity of items.                       |
| `price`         | `number`           | **Required.** Unit price (before discounts).           |
| `total`         | `number`           | **Required.** Final calculated total for the line.     |
| `sku`           | `string?`          | Stock Keeping Unit or internal part number.            |
| `thumbnail`     | `string?`          | URL for a small product preview image.                 |
| `description`   | `string?`          | Detailed subtitle (hidden in compact/POS views).       |
| `size`          | `string?`          | Specific variant detail (e.g., "Large", "42", "Blue"). |
| `discount`      | `number?`          | The amount subtracted from the subtotal for this line. |
| `discountLabel` | `string?`          | Short text for the discount (e.g., "10% OFF", "BOGO"). |

#### `InvoiceCustomerInfo` & `InvoiceCompanyInfo`

Detailed contact structures for parties involved (From, Billed To, Ship To).

| Field     | Type      | Description                               |
| :-------- | :-------- | :---------------------------------------- |
| `name`    | `string`  | Person or Entity name.                    |
| `address` | `string?` | Street address / Suite.                   |
| `city`    | `string?` | City name.                                |
| `state`   | `string?` | State / Province / Region.                |
| `zip`     | `string?` | Postal / Zip code.                        |
| `country` | `string?` | Country name.                             |
| `email`   | `string?` | Contact email address.                    |
| `phone`   | `string?` | Contact phone number.                     |
| `website` | `string?` | (Company Only) Corporate website URL.     |
| `taxId`   | `string?` | VAT #, Tax #, or Business Registration #. |

#### `InvoiceTotal`

Defines the final summary rows.

| Field          | Type       | Description                                                   |
| :------------- | :--------- | :------------------------------------------------------------ |
| `label`        | `string`   | Display label (e.g., "VAT (15%)").                            |
| `value`        | `number`   | The numeric amount.                                           |
| `isSubtotal`   | `boolean?` | If true, applies light emphasis styling.                      |
| `isTax`        | `boolean?` | If true, identifies row as a tax type.                        |
| `isDiscount`   | `boolean?` | If true, identifies row as a deduction.                       |
| `isGrandTotal` | `boolean?` | If true, renders large, bold, and with a primary color theme. |

#### `InvoiceLabels`

Dictionary used to override static English text inside the component via the `labels` prop.

| Field      | Type      | Description                         |
| :--------- | :-------- | :---------------------------------- |
| `invoice`  | `string?` | Replaces "Invoice".                 |
| `issued`   | `string?` | Replaces "Issued" or "Issue Date".  |
| `due`      | `string?` | Replaces "Due" or "Due Date".       |
| `from`     | `string?` | Replaces "From".                    |
| `billedTo` | `string?` | Replaces "Billed To" or "Customer". |
| `shipTo`   | `string?` | Replaces "Ship To" or "Delivery".   |
| `item`     | `string?` | Replaces "Description" or "Item".   |
| `price`    | `string?` | Replaces "Unit Price" or "Price".   |
| `qty`      | `string?` | Replaces "Qty".                     |
| `total`    | `string?` | Replaces "Total" or "Amount".       |
| `notes`    | `string?` | Replaces "Notes".                   |
| `taxId`    | `string?` | Replaces "Tax ID" or "VAT".         |
| `sku`      | `string?` | Replaces "SKU".                     |
| `paymentMethod` | `string?` | Replaces "Payment Method" or "Payment". |
| `shippingMethod`| `string?` | Replaces "Shipping Method" or "Shipping".|

---

### Customization & Logic

#### Automatic Status Colors

The component maps specific status strings to semantic colors automatically.

| Status Category | Colors        | Example Keywords                    |
| :-------------- | :------------ | :---------------------------------- |
| **Positive** | Green         | Paid, Success, Completed, Delivered |
| **Warning** | Yellow/Orange | Pending, Overdue, Expiring, Waiting |
| **Negative** | Red/Pink      | Rejected, Cancelled, Failed, Danger |
| **Information** | Blue/Indigo   | Processing, Started, In Progress    |
| **Neutral** | Gray          | Draft, Archived, Disabled, Void     |

#### CSS Variable Hooks

For advanced users needing to fine-tune the "Compact" or standard output (especially for print), the following CSS variables are supported on the component container:

```css
/* Example: Customizing font scale for specific printing needs */
.v-invoice-container {
  --text-sm: 13.5px; /* Base small text e.g. address */
  --text-xs: 10px; /* Extra small text e.g. SKU info */
}
```

---

### Data Contract for AI Agents (JSON Template)

Use this exhaustive object to generate or validate a full-featured invoice payload.

```json
{
  "brandTitle": "COMMERCIAL INVOICE",
  "brandName": "Vertex Systems LLC",
  "brandLogo": "[https://cdn.example.com/logo.svg](https://cdn.example.com/logo.svg)",
  "invoiceNumber": "VXT-8842-2024",
  "status": "Paid",
  "issuedDate": "2024-03-30",
  "dueDate": "2024-04-15",
  "paymentMethod": "Wire Transfer (Net 15)",
  "shippingMethod": "FedEx Priority",
  "companyInfo": {
    "name": "Vertex Systems LLC",
    "address": "1200 Innovation Way",
    "city": "Austin",
    "state": "TX",
    "zip": "78701",
    "country": "USA",
    "email": "billing@vertex.io",
    "taxId": "VAT-TX12345678"
  },
  "customerInfo": {
    "name": "Global Logistics Inc.",
    "address": "400 Harbor Drive",
    "city": "Miami",
    "state": "FL",
    "zip": "33101",
    "email": "procurement@global.log"
  },
  "shippingInfo": {
    "name": "Global Logistics Inc. (Receiving)",
    "address": "400 Harbor Drive, Dock 4",
    "city": "Miami",
    "state": "FL",
    "zip": "33101",
    "phone": "+1 (555) 019-8833"
  },
  "items": [
    {
      "id": "1",
      "name": "Enterprise Shield - Annual Subscription",
      "sku": "V-SHD-ENT",
      "quantity": 1,
      "price": 12000,
      "total": 11000,
      "discount": 1000,
      "discountLabel": "MULTI-YEAR DISCOUNT",
      "size": "Enterprise Tier"
    }
  ],
  "totals": [
    { "label": "Subtotal", "value": 12000, "isSubtotal": true },
    { "label": "Customer Discount", "value": -1000, "isDiscount": true },
    { "label": "Sales Tax (0%)", "value": 0, "isTax": true },
    { "label": "Total Amount due", "value": 11000, "isGrandTotal": true }
  ],
  "barcode": "VXT-8842-2024",
  "qrcode": "[https://pay.vertex.io/VXT-8842-2024](https://pay.vertex.io/VXT-8842-2024)",
  "qrcodeSize": 200,
  "notes": "Thank you for your business. Terms: Net 15.",
  "footerText": "Vertex Systems LLC is a registered trademark in TX."
}
```

Pre-encoded QR values can be passed directly without decoding or transformation:

```ts
const invoiceData = {
  // ...invoice fields
  qrcode: invoice.qrValue,
  qrcodeSize: 300,
}
```

---

### Standalone Components

#### `InvoiceTotals`

The totals section of the invoice can be used completely independently of the main `Invoice` component. This is useful for custom checkout pages, standalone receipt modals, or custom layouts that need to display standard invoice calculations natively.

**Props:**

| Prop             | Type                                           | Default     | Description                                                          |
| :--------------- | :--------------------------------------------- | :---------- | :------------------------------------------------------------------- |
| `totals`         | `InvoiceTotal[]`                               | **Required**| Array of summary rows (Subtotal, Tax, Final).                        |
| `compact`        | `boolean`                                      | `false`     | When true, scales down padding and typography.                       |
| `variant`        | `InvoiceVariant \| 'default'`                  | `'default'` | Matches the visual style to a specific invoice variant.              |
| `containerClass` | `string \| any[] \| Record<string, boolean>`   | `undefined` | Custom class to override the wrapper container styles.               |

**Example:**

```vue
<script setup>
import { InvoiceTotals } from 'vlite3'

const checkoutTotals = [
  { label: 'Subtotal', value: 250, isSubtotal: true },
  { label: 'Promo Code (SAVE20)', value: -50, isDiscount: true },
  { label: 'Estimated Tax', value: 15, isTax: true },
  { label: 'Total Due', value: 215, isGrandTotal: true }
]
</script>

<template>
  <div class="max-w-sm p-5 border rounded-xl bg-card">
    <InvoiceTotals :totals="checkoutTotals" variant="Variant4" />
  </div>
</template>
```

---

### Implementation Examples

#### 1. Standard Sales Invoice (Variant 1)

```vue
<script setup>
import { Invoice } from 'vlite3'

const invoiceData = {
  brandName: 'Acme Corp.',
  invoiceNumber: 'INV-2024-001',
  items: [{ name: 'UI/UX Design', quantity: 1, price: 1200, total: 1200 }],
  totals: [{ label: 'Total', value: 1200, isGrandTotal: true }],
}
</script>

<template>
  <Invoice :data="invoiceData" variant="Variant1" />
</template>
```

#### 2. POS Thermal Receipt (Variant 2)

Variant 2 follows a narrow vertical layout optimized for small thermal prints and retail environments.

```vue
<template>
  <Invoice :data="posData" variant="Variant2" :compact="true" />
</template>
```

#### 3. Professional Service with Discounts (Variant 4)

```vue
<script setup>
const serviceData = {
  brandTitle: 'SERVICE INVOICE',
  items: [
    {
      name: 'Software Development',
      quantity: 40,
      price: 150,
      discount: 600,
      discountLabel: 'Volume Discount',
      total: 5400,
    },
  ],
  totals: [
    { label: 'Subtotal', value: 6000, isSubtotal: true },
    { label: 'Discount', value: -600, isDiscount: true },
    { label: 'Total Due', value: 5400, isGrandTotal: true },
  ],
}
</script>

<template>
  <Invoice :data="serviceData" variant="Variant4" />
</template>
```

---

### Senior Engineer's Implementation Notes

1.  **Strict Math**: The component **does not** compute totals. It is a presentational layer. This is by design to prevent "floating-point drift" where the UI shows one value and the backend expects another. Always pass final, pre-calculated values.
2.  **Adaptive Columns**: The `Size` and `Discount` columns are truly dynamic. If half your items have a size and the other half don't, the component will render empty space for the missing values to maintain alignment. If **no** items have these fields, the columns are removed from the DOM entirely.
3.  **Variant Selection**:
    - **Variant 2** is the only one that uses `print:max-w-[300px]`, making it dedicated to roll-based thermal printers.
    - **Variant 4** uses `hero` header backgrounds; ensure you have a high-contrast logo (either white or dark) defined in `brandLogo`.
4.  **Responsive Print**: Use `compact: true` specifically for email attachments or physical printing to minimize page count.

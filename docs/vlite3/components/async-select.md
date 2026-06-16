# AsyncSelect (Async Dropdowns)

**Import:** `import { createAsyncSelect } from 'vlite3'`

Welcome to `AsyncSelect`! If you have a dropdown that needs to load data from your database (like a list of thousands of Customers or Products), standard dropdowns will slow down your app.

`AsyncSelect` solves this by creating a smart dropdown that automatically handles:

- **Pagination:** Only loads a few items at a time (infinite scroll).
- **Search:** Searches your database instantly as the user types.
- **Hydration:** Automatically fetches the correct display name if your form is initialized with just an ID.

---

## 🛠️ Step 1: Prepare Your Data Source (GraphQL Composable)

Before creating the select component, you need a GraphQL query composable. `AsyncSelect` expects your composable to accept `pagination` and `search` variables to work automatically.

Here is an example of what your generated composable should look like to be compatible:

```ts
/**
 * __useGetCrmCustomersQuery__
 *
 * @example
 * const { result, loading, error, refetch } = useGetCrmCustomersQuery({
 * pagination: { page: 1, limit: 20 },
 * search: 'John', // AsyncSelect updates this automatically when the user types
 * sort: { field: 'createdAt', order: 'DESC' },
 * filter: { status: 'ACTIVE' } // You can pass dynamic filters later
 * });
 */
```

---

## 🏗️ Step 2: Create Your Reusable Component

Instead of writing complex logic every time you need a Customer dropdown, you create it **once** using the `createAsyncSelect` factory.

Create a file (e.g., `Selects.ts`) and define your dropdowns:

```ts
// src/components/Selects.ts
import { createAsyncSelect } from 'vlite3'
import { useGetCrmCustomersQuery } from '@/graphql'

export const SelectCustomer = createAsyncSelect({
  name: 'SelectCustomer', // The name for Vue DevTools
  useQuery: useGetCrmCustomersQuery, // Your generated GraphQL hook
  queryName: 'getCrmCustomers', // The exact root key returned by your GraphQL response
  labelKey: 'name', // Which database field to show as the main text
  descriptionKey: 'email', // (Optional) Smaller text to display below the name
  iconKey: 'profilePicture', // (Optional) Avatar URL or icon string
})
```

🎉 That's it! You now have a fully functional `<SelectCustomer />` component that you can reuse anywhere in your project.

---

## 🚀 Step 3: Define Your Form Schema

You can now drop `SelectCustomer` directly into any `vlite3` Form Schema. The form will handle saving the selected `id` automatically!

**What happens here?** When the user selects "John Doe" from the dropdown, your form values will automatically update to `{ customerId: "123-abc" }`.

---

## 🖥️ Step 4: Rendering the Form & Initial Values

Now that you have your schema, pass it to the `vlite3` `<Form>` component.

If you are editing an existing record, pass the initial data to the `:values` prop. `AsyncSelect` will detect the ID (e.g., `customerId: "123-abc"`) and automatically fetch the user's name in the background so the dropdown doesn't just show a raw ID!

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vlite3'
import { SelectCustomer } from '@/components/Selects'

export const orderSchema: IForm[] = [
  {
    name: 'customerId', // This key gets saved to your form values
    label: 'Select a Customer',
    type: SelectCustomer, // 👈 Pass your new component directly here!
    required: true,
    placeholder: 'Search customers...',
  },
]
// Example: Data fetched from your API when editing an order
const initialData = ref({
  id: 'order_999',
  customerId: '123-abc', // AsyncSelect will hydrate this automatically!
})

const handleSubmit = async (payload: any) => {
  console.log('Form submitted with values:', payload.values)
  // Example output: { customerId: '123-abc', branchIds: [...] }
}
</script>

<template>
  <Form
    :schema="orderSchema"
    :values="initialData"
    submit-text="Save Order"
    @on-submit="handleSubmit" />
</template>
```

---

## 💡 Advanced Features

### 1. Selecting Multiple Items

Want to select multiple customers? Just add `multiple: true` to the props. This will turn the component into a `MultiSelect` and save an array of IDs (e.g., `['id_1', 'id_2']`).

```ts
{
  name: 'customerId',
  label: 'Select a Customer',
  type: SelectCustomer,
  props: {
    multiple: true,
  }
}
```

### 2. Dynamic Filtering (Dependent Dropdowns)

`filter` accepts two shapes — pick whichever fits the situation:

**Static filter** — apply the same filter regardless of form state:

```ts
{
  name: 'categoryId',
  label: 'Category',
  type: SelectCategory,
  props: {
    filter: { status: 'ACTIVE' }
  }
}
```

**Dynamic filter function** — derive the filter from the current form values.
The function receives `{ values }` (the full form state) and must return a
filter object, or `undefined` to clear the filter. The query automatically
refetches whenever the resolved filter changes, and pagination restarts from
page 1 so you never land on a page that no longer exists.

```ts
{
  name: 'contactId',
  label: 'Primary Contact',
  type: SelectContact,
  // Only show contacts that belong to the selected customer.
  // The query refetches automatically when `customerId` changes.
  props: {
    filter: ({ values }) => ({ customerId: values.customerId })
  },
}
```

#### Dependent dropdown example (your filter, your way)

A common pattern: pick a quotation type, then the vehicle type list should
narrow to tankers only for water delivery.

```ts
{
  name: 'vehicleTypeId',
  label: 'Vehicle Type',
  type: SelectVehicleType,
  props: {
    // values.quotationType is read from the parent form
    filter: ({ values }) =>
      values.quotationType === 'WATER_DELIVERY'
        ? { isTanker: true }
        : undefined // clears the filter for all other quotation types
  },
}
```

A few things worth knowing:

- Returning `undefined` (or any non-object) is treated as "no filter".
- **The function is only re-invoked when one of the keys it actually reads
  changes.** We run it once with a tracking Proxy to discover which
  top-level keys of `values` you read, and then watch *only those keys*.
  Reading `values.quotationType` will not cause the function to re-run when
  `values.cargoQuantityDelivered` changes — even though the parent form
  replaces the whole `values` object on every field change. Top-level keys
  only; nested paths like `values.pricing.amount` won't auto-track, so
  prefer reading from the top level when you can.
- If the function throws, the error is logged and the dropdown falls back to
  an empty filter instead of breaking the UI.
- When the resolved filter changes mid-pagination, the dropdown resets to
  page 1.

### 3. Auto-filling other form fields

If picking a customer should automatically fill in their billing address, use the `updateValues` hook. The `data` parameter gives you the **full database record** of the selected item.

```ts
{
  name: 'customerId',
  label: 'Customer',
  type: SelectCustomer,
  updateValues: ({ values, data }) => {
    // 'data' holds the complete customer object returned from the API
    if (data) {
      return {
        ...values,
        // Auto-fill the billing address field based on the selected customer
        billingAddress: data.billingAddress ?? values.billingAddress,
        shippingAddress: data.shippingAddress ?? values.shippingAddress,
      }
    }
    return values
  }
}
```

### 4. Inline Item Creation (Add New)

If a user needs to select an item that hasn't been created yet, you can pass an `addNewConfig` inside `props` to allow them to create the item directly from the dropdown. This renders an "Add New" button at the bottom of the dropdown that opens a modal with your provided component.

```ts
import CreateCategoryForm from '../../components/category/CreateCategoryForm.vue'

{
  name: 'categoryId',
  label: 'Product Category',
  type: SelectCategory,
  props: {
    addNewConfig: {
      component: CreateCategoryForm,     // Your form component to create the item
      label: 'Add Category',             // Text for the button and modal title
      labelI18n: 'common.addCategory',   // Optional i18n key
      props: {                           // Optional props to pass down to the component
        // any additional props your form component expects
      }
    }
  }
}
```

When the item is successfully created, ensure your custom component calls the `close()` function passed down to it as a prop. This will close the modal and automatically trigger `AsyncSelect` to refetch its data.

```vue
<script setup lang="ts">
// Inside your CreateCategoryForm.vue
const props = defineProps<{ close?: () => void }>()

const handleSave = async (payload: any) => {
  await createCategory(payload)
  // Important: Call close() to dismiss the modal and trigger the dropdown data refresh
  props.close?.()
}
</script>
```

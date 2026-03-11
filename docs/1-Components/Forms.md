# Form

**Import:** `import { Form } from 'vlite3'`

### Description

A schema-driven form builder with built-in validation, multi-step wizards, grouped layouts, dynamic field dependencies, and automatic data mapping.

### Props

| Prop                       | Type                   | Default     | Description                                                            |
| :------------------------- | :--------------------- | :---------- | :--------------------------------------------------------------------- |
| `schema`                   | `IForm[] \| IForm[][]` | required    | Array of field definitions (or array of arrays for grouped/multi-step) |
| `values`                   | `Record<string, any>`  | `{}`        | Initial form values                                                    |
| `variant`                  | `InputVariant`         | `'outline'` | Style variant for all inputs                                           |
| `size`                     | `InputSize`            | `'md'`      | Size of inputs                                                         |
| `rounded`                  | `InputRounded`         | `'md'`      | Border radius of inputs                                                |
| `class`                    | `string`               | —           | Custom class for form element                                          |
| `className`                | `string`               | —           | Custom class for grid                                                  |
| `loading`                  | `boolean`              | `false`     | Loading state on submit button                                         |
| `submitText`               | `string`               | `'Submit'`  | Label for submit button                                                |
| `submitProps`              | `ButtonProps`          | —           | Extra props for submit button                                          |
| `isUpdate`                 | `boolean`              | `false`     | Mode for update/edit operations                                        |
| `tabs`                     | `IFormStep[]`          | —           | Configuration for multi-step wizard                                    |
| `groupsHeadings`           | `string[]`             | —           | Headings for grouped layout                                            |
| `groupHeadingsDescription` | `string[]`             | —           | Descriptions for grouped layout                                        |
| `folderId`                 | `string`               | —           | Folder ID for file uploads                                             |
| `cancelText`               | `string`               | `'Cancel'`  | Label for cancel button                                                |
| `showCancel`               | `boolean`              | `false`     | Show cancel button                                                     |
| `groupClass`               | `string`               | —           | Custom class for grouped layout                                        |
| `headerClass`              | `string`               | —           | Custom class for group header                                          |
| `footerClass`              | `string`               | —           | Custom class for footer                                                |
| `timelineTextPosition`     | `TimelineTextPosition` | `'bottom'`  | Text position for timeline tabs                                        |
| `footer`                   | `boolean`              | `true`      | Show footer and submit button                                          |
| `emitFields`               | `string[]`             | —           | Explicitly include these fields in the submit payload                  |

### Schema Interface (`IForm`)

| Property           | Type                             | Description                                                          |
| :----------------- | :------------------------------- | :------------------------------------------------------------------- |
| `name`             | `string`                         | Field key in values object (supports dot notation)                   |
| `mapFrom`          | `string`                         | Key to read initial value from the incoming `values` object          |
| `mapTo`            | `string`                         | Key to write the final value to in the submit payload                |
| `valueKey`         | `string`                         | Property to extract from nested objects or arrays of objects         |
| `key`              | `string`                         | Alias for `valueKey`                                                 |
| `format`           | `(val, rawValues) => any`        | Function to format raw incoming data before it enters the form state |
| `transform`        | `(val, formValues) => any`       | Function to transform the form's state value before submission       |
| `label`            | `string \| Component`            | Display label                                                        |
| `type`             | `IFormFieldType`                 | Input type (text, email, password, select, file, etc.)               |
| `required`         | `boolean`                        | Marks field as required                                              |
| `placeholder`      | `string`                         | Input placeholder                                                    |
| `options`          | `IDropdownOptions`               | Options for select/multiSelect/radio                                 |
| `validation`       | `(ctx) => string`                | Return error message or empty string                                 |
| `when`             | `(ctx) => boolean`               | Conditionally show/hide field                                        |
| `updateValues`     | `(ctx) => Record\<string, any\>` | Dynamically update other fields on change                            |
| `itemClass`        | `string`                         | Class for field wrapper (e.g. `col-span-2`)                          |
| `disabled`         | `boolean \| (ctx) => boolean`    | Disable field                                                        |
| `icon`             | `string`                         | Left icon (Iconify ID)                                               |
| `iconRight`        | `string`                         | Right icon (Iconify ID)                                              |
| `addonLeft`        | `string \| IFormAddon`           | Left addon — plain text or addon config object                       |
| `addonRight`       | `string \| IFormAddon`           | Right addon — plain text or addon config object                      |
| `props`            | `Record<string, any>`            | Extra props forwarded to the field component                         |
| `maxFileSize`      | `number`                         | Maximum file size in MB for file/avatar uploads                      |
| `maxFiles`         | `number`                         | Maximum number of files allowed when multiple is true                |
| `returnFileObject` | `boolean`                        | Output `{fileName, fileUrl, fileType, fileSize}` on upload           |

### Addon Interface (`IFormAddon`)

When `addonLeft` or `addonRight` is an object, it renders a dropdown or button inside the input addon. Each select addon binds to its own key in form state.

```ts
export interface IFormAddon {
  /** Key in form values this addon writes to (required for select, optional for button) */
  name?: string
  /** 'select' renders a Dropdown; 'button' renders a Button */
  type: 'select' | 'button'
  /** Default value (for select addons) */
  value?: any
  /** Dropdown options (required when type='select') */
  options?: IDropdownOptions
  /** Button label (required when type='button') */
  text?: string
  /** Emitted action name on button click */
  action?: string
  /** Extra props forwarded to the rendered component */
  props?: Record<string, any>
}
```

### Events

- `@onSubmit` (payload: `{ values, isUpdate }`, close): Emitted when form is valid and submitted.
- `@onCancel`: Emitted when cancel button is clicked.
- `@onStepChange` (step: `number`): Emitted when step changes in multi-step mode.
- `@onAddonAction` (action: `string`): Emitted when a button addon is clicked (carries the `action` string from the addon config).

### Usage

#### Basic Form

```vue
<script setup>
const schema = [
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'password', label: 'Password', type: 'password', required: true },
]
</script>

<template>
  <Form :schema="schema" @onSubmit="handleSubmit" />
</template>
```

#### Validation & Conditional Logic

```javascript
const schema = [
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    options: [
      { label: 'Admin', value: 'admin' },
      { label: 'User', value: 'user' },
    ],
  },
  {
    name: 'adminCode',
    label: 'Admin Code',
    type: 'password',
    // Only show if role is admin
    when: ({ values }) => values.role === 'admin',
    // Custom validation
    validation: ({ value }) => (value === 'SECRET' ? '' : 'Invalid code'),
  },
]
```

#### Data Mapping & Formatting

The Form component can automatically extract, format, and transform complex API data structures so you don't have to write boilerplate mapping code.

```javascript
// Example API Response:
// {
//   id: 'prod_123',
//   taxes: [{ id: 'tax_1', rate: 20 }, { id: 'tax_2', rate: 5 }],
//   inventory_sizes: [{ sizeId: 'sz_m', qty: "10" }]
// }

const schema = [
  {
    name: 'taxIds', // Internal form state name
    mapFrom: 'taxes', // Read from 'taxes' array in the incoming data
    valueKey: 'id', // Automatically extract just the 'id' property from the objects in the array
    type: 'multiSelect',
    options: [
      { label: 'VAT', value: 'tax_1' },
      { label: 'Sales Tax', value: 'tax_2' },
    ],
  },
  {
    name: 'sizes', // Internal form state name
    mapFrom: 'inventory_sizes', // Read from 'inventory_sizes' in incoming data
    mapTo: 'inventory_sizes', // Write back to 'inventory_sizes' in the submit payload
    type: 'customFields',
    // Transform data before submission (e.g., ensure quantities are Numbers)
    transform: (val) => val.map((s) => ({ ...s, qty: Number(s.qty) })),
    props: {
      schema: [
        { name: 'sizeId', type: 'select' /* options... */ },
        { name: 'qty', type: 'number' },
      ],
    },
  },
]
```

#### Multi-Step Wizard

```vue
<script setup>
const tabs = [
  { id: 1, title: 'Account', icon: 'lucide:user' },
  { id: 2, title: 'Profile', icon: 'lucide:settings' },
]

// Schema is array of arrays
const schema = [
  [
    // Step 1
    { name: 'username', label: 'Username', type: 'text' },
  ],
  [
    // Step 2
    { name: 'bio', label: 'Bio', type: 'textarea' },
  ],
]
</script>

<template>
  <Form :steps="tabs" :schema="schema" @onSubmit="console.log" />
</template>
```

#### Custom Fields (Repeater)

Use `type: 'customFields'` to create array/repeater fields.

```javascript
const schema = [
  {
    name: 'teamMembers',
    label: 'Team Members',
    type: 'customFields',
    props: {
      headers: ['Name', 'Role'],
      schema: [
        { name: 'name', label: 'Name', type: 'text' },
        {
          name: 'role',
          label: 'Role',
          type: 'select',
          options: [
            { label: 'Dev', value: 'dev' },
            { label: 'Design', value: 'design' },
          ],
        },
      ],
    },
  },
]
```

#### File Uploads

Support for single file, multiple files, size limits, file count limits, and different UI variants.

```javascript
const schema = [
  {
    name: 'avatar',
    label: 'Avatar',
    type: 'avatarUpload', // Specialized avatar uploader
    maxFileSize: 5, // Maximum file size of 5MB
  },
  {
    name: 'resume',
    label: 'Resume',
    type: 'fileUploader', // Dropzone style
    props: { accept: '.pdf' },
    maxFileSize: 10, // Maximum file size of 10MB
    returnFileObject: true, // Output { fileName, fileUrl, fileType, fileSize } instead of just URL
  },
  {
    name: 'documents',
    label: 'Documents',
    type: 'file', // Standard input style
    props: { multiple: true },
    maxFiles: 5, // Limit to a maximum of 5 files
    maxFileSize: 2, // Maximum 2MB per file
  },
]
```

#### Grouped Forms

Organize complex forms into visual groups with headings.

```vue
<script setup>
// Define schema as array of arrays
const schema = [
  [
    // Group 1: Personal
    { name: 'firstName', label: 'First Name', type: 'text' },
    { name: 'lastName', label: 'Last Name', type: 'text' },
  ],
  [
    // Group 2: Contact
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone', type: 'tel' },
  ],
]
</script>

<template>
  <Form
    :schema="schema"
    :groupsHeadings="['Personal Info', 'Contact Details']"
    :groupHeadingsDescription="['Basic identification', 'How to reach you']" />
</template>
```

#### Input Addons (Schema-Driven)

Use `addonLeft` and `addonRight` as objects to render dropdowns or buttons inside input addons. Each select addon binds to its own key in form state.

```vue
<script setup>
const schema = [
  {
    name: 'domain',
    label: 'Website',
    type: 'text',
    placeholder: 'example.com',
    // Dropdown addon on the left — writes to formValues.protocol
    addonLeft: {
      name: 'protocol',
      type: 'select',
      value: 'https://',
      options: [
        { label: 'https://', value: 'https://' },
        { label: 'http://', value: 'http://' },
      ],
      props: { class: 'w-24' },
    },
    // Button addon on the right — emits @onAddonAction
    addonRight: {
      type: 'button',
      text: 'Check',
      action: 'checkAvailability',
    },
  },
  {
    name: 'amount',
    label: 'Price',
    type: 'text',
    placeholder: '0.00',
    // Select addon + plain text addon can be mixed
    addonLeft: {
      name: 'currency',
      type: 'select',
      value: 'USD',
      options: [
        { label: 'USD', value: 'USD' },
        { label: 'EUR', value: 'EUR' },
      ],
    },
    addonRight: '.00', // Plain string addon (unchanged API)
  },
]

const handleAddonAction = (action) => {
  // action === 'checkAvailability'
}
</script>

<template>
  <Form :schema="schema" @onSubmit="handleSubmit" @onAddonAction="handleAddonAction" />
</template>
```

> **Note:** Plain string addons (e.g. `addonLeft: '$'`) still work exactly as before — fully backward compatible.

#### Form in Lazy Modal (Real-world Example)

A common pattern is using a Form inside a lazy modal. The `close` method is automatically passed to the component, allowing you to close the modal after a successful submission.

**CreateFolder.vue**

```vue
<script setup lang="ts">
import { Form, showToast } from 'vlite3'
// Example usage with a mutation hook
import { useCreateFolderMutation } from '@/graphql'

interface Props {
  parentId: string | null
}

const props = defineProps<Props>()

// Mock mutation hook
const { mutate: createFolder, loading: creatingFolder } = useCreateFolderMutation({
  refetchQueries: ['GetFolders'],
})

const handleCreateFolder = async (payload: any, close) => {
  try {
    await createFolder({
      input: {
        name: payload.values.name,
        parentId: props.parentId,
      },
    })
    showToast('Folder created', 'success')
    // Close the modal on success
    close?.()
  } catch (e: any) {
    showToast(e.message, 'error')
  }
}
</script>

<template>
  <div class="p-4">
    <Form
      :schema="[
        {
          name: 'name',
          label: 'Folder Name',
          type: 'text',
          required: true,
          placeholder: 'My Documents',
        },
      ]"
      :loading="creatingFolder"
      submit-text="Create Folder"
      @on-submit="handleCreateFolder" />
  </div>
</template>
```

**Usage in Parent Page**

```vue
<script setup>
import CreateFolder from './CreateFolder.vue'
</script>

<template>
  <div>
    <Modal
      title="Create New Folder"
      :body="CreateFolder"
      max-width="max-w-md"
      :parentId="currentFolderId">
      <template #trigger>
        <Button icon="lucide:folder-plus">New Folder</Button>
      </template>
    </Modal>
  </div>
</template>
```

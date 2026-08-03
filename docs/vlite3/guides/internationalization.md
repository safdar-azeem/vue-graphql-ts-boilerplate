# 🌍 Translation (i18n) Support

**vlite3** provides a lightweight, library-agnostic translation system. Instead of forcing you to use a specific i18n package (like `vue-i18n`), vlite3 allows you to register a global translation handler. If registered, components will automatically resolve translation keys; if not, they gracefully fall back to the default text properties.

---

## 1. Setup & Configuration

To enable translations, you need to provide a translation handler function `t` to the `createVLite` plugin in your `main.ts` (or `main.js`) file.

### Example 1: Using `vue-i18n`

If you are using the official `vue-i18n` library, you can pass its global `t` function directly to vlite3.

```typescript
// main.ts
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createVLite } from 'vlite3'
import App from './App.vue'

const app = createApp(App)

// 1. Setup your i18n instance
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      common: {
        save: 'Save Changes',
        cancel: 'Cancel',
      },
    },
  },
})

// 2. Pass the translation function to vLite
const vlite = createVLite({
  services: {
    t: (key: string, ...args: any[]) => {
      // Use vue-i18n's global translation method
      return i18n.global.t(key, ...args)
    },
  },
})

app.use(i18n)
app.use(vlite)
app.mount('#app')
```

### Example 2: Using a Custom Dictionary

If you have a custom translation system or a simple dictionary object, you can wrap it in the handler.

```typescript
// main.ts
import { createApp } from 'vue'
import { createVLite } from 'vlite3'
import App from './App.vue'

const myTranslations: Record<string, string> = {
  'auth.login': 'Sign In',
  'auth.password': 'Enter your password',
}

const vlite = createVLite({
  services: {
    t: (key: string) => myTranslations[key] || key, // Fallback to key if missing
  },
})

const app = createApp(App)
app.use(vlite)
app.mount('#app')
```

---

## 2. Global Internal Component Translations

For structural texts hardcoded inside components (like empty states, search placeholders, or pagination labels), vlite3 requests specific keys under the `vlite.` namespace. Add these keys to your dictionary/locale files to automatically translate the internal UI text.

| Key                                   | Default Fallback                                      | Component           |
| ------------------------------------- | ----------------------------------------------------- | ------------------- |
| **Forms & Selectors**                 |                                                       |                     |
| `vlite.customFields.emptyTitle`       | "No items added"                                      | `CustomFields`      |
| `vlite.customFields.emptyDescription` | "Add a new item to get started"                       | `CustomFields`      |
| `vlite.dropdown.empty`                | "No options found"                                    | `Dropdown`          |
| `vlite.dropdown.search`               | "Search..."                                           | `Dropdown`          |
| `vlite.filePicker.clickToUpload`      | "Click to upload"                                     | `FilePicker`        |
| `vlite.filePicker.dragAndDrop`        | "or drag and drop"                                    | `FilePicker`        |
| `vlite.filePicker.addMore`            | "Add more"                                            | `FilePicker`        |
| `vlite.multiSelect.placeholder`       | "Select items..."                                     | `MultiSelect`       |
| `vlite.datePicker.placeholder`        | "Select date"                                         | `DatePicker`        |
| `vlite.iconPicker.search`             | "Search 1000+ icons..."                               | `IconPicker`        |
| **Data Display & Tables**             |                                                       |                     |
| `vlite.empty.title`                   | "No data found"                                       | `Empty`, `DataList` |
| `vlite.empty.description`             | "There is nothing to display here right now."         | `Empty`, `DataList` |
| `vlite.dataTable.searchPlaceholder`   | "Search..."                                           | `DataTable`         |
| `vlite.dataTable.confirmDeleteTitle`  | "Confirm Deletion"                                    | `DataTable`         |
| `vlite.dataTable.confirmDeleteDesc`   | "Are you sure you want to delete the selected items?" | `DataTable`         |
| `vlite.dataTable.deleteBtn`           | "Delete"                                              | `DataTable`         |
| `vlite.dataTable.cancelBtn`           | "Cancel"                                              | `DataTable`         |
| **Screens & Layouts**                 |                                                       |                     |
| `vlite.screen.deleteSelected`         | "Delete Selected"                                     | `Screen`            |
| `vlite.screen.listView`               | "List View"                                           | `Screen`            |
| `vlite.screen.tableView`              | "Table View"                                          | `Screen`            |
| `vlite.screen.refresh`                | "Refresh"                                             | `Screen`            |
| `vlite.screen.searchPlaceholder`      | "Search..."                                           | `Screen`            |
| `vlite.screen.confirmDeleteTitle`     | "Confirm Deletion"                                    | `Screen`            |
| `vlite.screen.confirmDeleteDesc`      | "Are you sure you want to delete this item?"          | `Screen`            |
| `vlite.screen.confirmDeleteBtn`       | "Delete"                                              | `Screen`            |
| `vlite.screen.cancelBtn`              | "Cancel"                                              | `Screen`            |
| `vlite.screen.missingView`            | "Please provide a `:list` or `:table` component."     | `Screen`            |
| `vlite.screen.addNew`                 | "Add New"                                             | `Screen`            |
| `vlite.screen.filters`                | "Filters"                                             | `Screen`            |
| `vlite.screen.applyFilters`           | "Apply Filters"                                       | `Screen`            |
| `vlite.screen.filter`                 | "Filter"                                              | `Screen`            |
| **Pagination**                        |                                                       |                     |
| `vlite.pagination.show`               | "Show"                                                | `Pagination`        |
| `vlite.pagination.perPage`            | "per page"                                            | `Pagination`        |
| `vlite.pagination.page`               | "Page"                                                | `Pagination`        |
| `vlite.pagination.of`                 | "of"                                                  | `Pagination`        |
| `vlite.pagination.previous`           | "Previous"                                            | `Pagination`        |
| `vlite.pagination.next`               | "Next"                                                | `Pagination`        |
| **Advanced Components**               |                                                       |                     |
| `vlite.fileTree.emptyText`            | "No results found."                                   | `FileTree`          |
| `vlite.pricingPlan.selected`          | "Selected"                                            | `PricingPlan`       |
| `vlite.pricingPlan.choosePlan`        | "Choose Plan"                                         | `PricingPlan`       |
| `vlite.pricingPlan.recommended`       | "Recommended"                                         | `PricingPlan`       |
| `vlite.pricingPlan.mostPopular`       | "Most Popular"                                        | `PricingPlan`       |
| `vlite.workbook.rename`               | "Rename"                                              | `Workbook`          |
| `vlite.workbook.duplicate`            | "Duplicate"                                           | `Workbook`          |
| `vlite.workbook.delete`               | "Delete"                                              | `Workbook`          |
| `vlite.workbook.addSheet`             | "Add New Sheet"                                       | `Workbook`          |
| **Modals & Utilities**                |                                                       |                     |
| `vlite.confirmation.confirm`          | "Confirm"                                             | `ConfirmationModal` |
| `vlite.confirmation.cancel`           | "Cancel"                                              | `ConfirmationModal` |
| `vlite.googleLogin.buttonText`        | "Sign in with Google"                                 | `GoogleLogin`       |
| `vlite.themeToggle.switchToDark`      | "Switch to dark mode"                                 | `ThemeToggle`       |
| `vlite.themeToggle.switchToLight`     | "Switch to light mode"                                | `ThemeToggle`       |

---

## 3. Using Translations in Components

Almost every component in vlite3 supports `*I18n` props. If the i18n key is resolved successfully, it will be displayed. If no translation is found or the system is unconfigured, it will fall back to the standard standard props (`text`, `title`, `label`, `description`, etc.).

### Common i18n Props

- `textI18n` (Button, Chip)
- `labelI18n` (Input, Checkbox, Switch, Textarea, Slider, etc.)
- `placeholderI18n` (Input, Textarea, Select, DatePicker, etc.)
- `titleI18n` & `descriptionI18n` (Modal, SidePanel, Alert, Empty, Screen, Accordion, ChoiceBox, etc.)
- `contentI18n` (Tooltip)
- `confirmTextI18n` & `cancelTextI18n` (ConfirmationModal)

### Button & Chip Example

```vue
<template>
  <Button textI18n="common.save" text="Save" icon="lucide:check" />
  <Chip textI18n="status.active" text="Active" variant="success" />
</template>
```

### Input & Form Controls

```vue
<template>
  <Input
    v-model="email"
    labelI18n="form.email.label"
    label="Email Address"
    placeholderI18n="form.email.placeholder"
    placeholder="Enter your email" />
</template>
```

### Schema Arrays (Dropdown, ChoiceBox, Accordion)

Options and Schema arrays fully support i18n keys for their respective text fields.

```typescript
const options = [
  {
    label: 'General Settings',
    labelI18n: 'settings.general.title',
    description: 'Manage preferences',
    descriptionI18n: 'settings.general.desc',
    value: 'general',
  },
]
```

### Modals & Alerts

```vue
<template>
  <Alert
    titleI18n="alert.success.title"
    title="Operation Successful"
    descriptionI18n="alert.success.desc"
    description="Your changes have been saved."
    variant="success" />
</template>
```

---

## 4. Using Translations in Form Schemas

When using the schema-driven `<Form />` component, you can define translation keys directly inside your field definitions. The `FormFields` component will dynamically resolve these keys using the global `t` handler. Error messages will also automatically use the translated label.

```vue
<script setup lang="ts">
import { Form, type IForm } from 'vlite3'

const branchSchema: IForm[] = [
  {
    name: 'name',
    type: 'text',
    required: true,
    // Fallback standard props
    label: 'Branch Name',
    placeholder: 'Enter branch name',
    // i18n keys
    labelI18n: 'common.words.name',
    placeholderI18n: 'hrm.branch.form.namePlaceholder',
  },
  {
    name: 'manager',
    type: 'select',
    options: [{ label: 'Option 1', labelI18n: 'options.one', value: '1' }],
    // Fallback standard props
    label: 'Manager',
    placeholder: 'Add Manager',
    // i18n keys
    labelI18n: 'hrm.branch.form.managerLabel',
    placeholderI18n: 'hrm.branch.form.managerPlaceholder',
  },
]
</script>

<template>
  <Form :schema="branchSchema" @onSubmit="handleSave" />
</template>
```

**Supported schema properties:**

- `labelI18n`: Translates the field label (including CustomFields array headers).
- `placeholderI18n`: Translates the input placeholder.

---

## 5. `$t` Utility Function (Advanced)

If you are building your own custom components, static validation schemas, or Pinia/Vuex actions and need access to the translation handler registered in `vlite3`, you can import and use the global `$t` function directly. It works safely inside or outside of a Vue component's setup context.

```vue
<script setup lang="ts">
import { $t } from 'vlite3'

const welcomeMessage = $t('dashboard.welcome', { user: 'John' })
</script>

<template>
  <div>
    <h1>{{ welcomeMessage }}</h1>
  </div>
</template>
```

### Note on Performance

This setup is entirely optional. If a developer installs `vlite3` but does not register a `t` function via `createVLite()`, the components and the `$t` utility will simply bypass the translation step and render the standard fallback props (`label`, `text`, `placeholder`, `title`, etc.) without any performance penalty.

EOF

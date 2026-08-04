# Testing Forms & Components

**VLite3** provides a robust, zero-configuration testing ecosystem for form components. Whether you are writing End-to-End (E2E) tests with **Playwright** / **Cypress** or Component tests with **Vitest** / **Vue Test Utils**, our form elements are designed to be immediately queryable.

## The `data-testid` System

You do **not** need to manually add `data-testid` attributes to your form schemas. The VLite3 library automatically generates and injects these attributes based on your schema's existing `name`, `label`, or `id` properties.

This ensures that your components remain completely accessible for testing without polluting your production schemas or requiring any migrations for existing codebases.

### Standardized Selectors

Here is how the automatic `data-testid` mapping resolves across different component types:

| Component            | Test ID Format        | Fallback Resolution Order               | Example Output                          |
| :------------------- | :-------------------- | :-------------------------------------- | :-------------------------------------- |
| **Input**            | `input-{name}`        | `name` → `label` (kebab-case) → `input` | `[data-testid="input-email"]`           |
| **Textarea**         | `textarea-{name}`     | `name` → `textarea`                     | `[data-testid="textarea-description"]`  |
| **Button**           | `btn-{text}`          | `text` (kebab-case) → `icon` → `button` | `[data-testid="btn-sign-in"]`           |
| **Switch**           | `switch-{name}`       | `name` → `id` → `label` → `switch`      | `[data-testid="switch-rememberMe"]`     |
| **Checkbox**         | `checkbox-{name}`     | `name` → `id` → `label` → `checkbox`    | `[data-testid="checkbox-terms"]`        |
| **NumberInput**      | `number-{name}`       | `name` → `id` → `number-input`          | `[data-testid="number-age"]`            |
| **Number (Inc/Dec)** | `number-{name}-inc`   | Appends `-inc` or `-dec` to base ID     | `[data-testid="number-age-inc"]`        |
| **DatePicker**       | `datepicker-{name}`   | `name` → `datepicker`                   | `[data-testid="datepicker-birthDate"]`  |
| **DateRange**        | `daterange-{name}`    | `name` → `daterange`                    | `[data-testid="daterange-period"]`      |
| **MultiSelect**      | `multiselect-{name}`  | `name` → `multiselect`                  | `[data-testid="multiselect-roles"]`     |
| **FilePicker**       | `filepicker-{name}`   | `name` → `filepicker`                   | `[data-testid="filepicker-resume"]`     |
| **AvatarUploader**   | `avatar-{name}`       | `name` → `avatar-uploader`              | `[data-testid="avatar-profilePicture"]` |
| **ThumbnailSelector**| `thumbnail-{name}`    | `name` → `thumbnail-selector`           | `[data-testid="thumbnail-media"]`       |
| **Dropdown Item**    | `dropdown-item-{val}` | `value` → `label` (kebab-case)          | `[data-testid="dropdown-item-admin"]`   |

> **Note:** If you explicitly pass a `data-testid` via a component's `props` in the schema, it will immediately override the automatically generated ID.

---

## Playwright Integration (E2E)

Playwright has native support for `data-testid` via the `page.getByTestId()` locator. Here is an example of testing a standard authentication form built with VLite3.

### Example Form Schema

```ts
const loginSchema = [
  { name: 'email', label: 'Email Address', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' },
  { name: 'rememberMe', label: 'Remember Me', type: 'switch' },
]
```

### Playwright Test (`login.spec.ts`)

```typescript
import { test, expect } from '@playwright/test'

test('User can fill and submit the login form', async ({ page }) => {
  await page.goto('/login')

  // 1. Target inputs via auto-generated test IDs
  const emailInput = page.getByTestId('input-email')
  const passwordInput = page.getByTestId('input-password')

  // 2. Fill standard text fields
  await emailInput.fill('john@example.com')
  await passwordInput.fill('123456')

  // 3. Interact with boolean switches
  const rememberSwitch = page.getByTestId('switch-rememberMe')
  await rememberSwitch.click()

  // 4. Assert field states before submission
  await expect(emailInput).toHaveValue('john@example.com')
  await expect(rememberSwitch).toHaveAttribute('aria-checked', 'true')

  // 5. Target auto-generated button IDs and submit
  const submitButton = page.getByTestId('btn-sign-in')
  await submitButton.click()

  // 6. Assert successful navigation or toast
  await expect(page).toHaveURL('/dashboard')
})
```

### Testing Complex Components (Dropdowns & Selects)

VLite3 Dropdowns use Portals (`Teleport`), which means their menu items might be appended to the end of the `<body>`. Using `data-testid` bypasses complex DOM traversing.

```typescript
test('User can select a role from a dropdown', async ({ page }) => {
  // Click the multi-select trigger
  await page.getByTestId('multiselect-role').click()

  // Wait for the dropdown menu to animate in, then click the exact item
  const adminOption = page.getByTestId('dropdown-item-admin')
  await expect(adminOption).toBeVisible()
  await adminOption.click()

  // Close the dropdown (pressing Escape is usually safest for accessibility-compliant components)
  await page.keyboard.press('Escape')
})
```

---

## Vitest & Vue Test Utils (Component Testing)

When writing localized component tests, the consistent `data-testid` attributes make finding and interacting with deeply nested form elements reliable.

### Vitest Test (`LoginForm.spec.ts`)

```typescript
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import LoginForm from './LoginForm.vue'

describe('LoginForm.vue', () => {
  it('emits the correct payload on form submission', async () => {
    const wrapper = mount(LoginForm)

    // 1. Find elements cleanly
    const emailInput = wrapper.find('[data-testid="input-email"]')
    const passwordInput = wrapper.find('[data-testid="input-password"]')
    const submitBtn = wrapper.find('[data-testid="btn-sign-in"]')

    // 2. Set values
    await emailInput.setValue('test@vlite.com')
    await passwordInput.setValue('secure-pass')

    // 3. Submit
    await submitBtn.trigger('click')

    // 4. Validate emitted Form component event
    const emitted = wrapper.findComponent({ name: 'Form' }).emitted('onSubmit')
    expect(emitted).toBeTruthy()

    const payload = emitted[0][0] // Extract first emission's payload
    expect(payload.values).toEqual({
      email: 'test@vlite.com',
      password: 'secure-pass',
    })
  })

  it('increments number fields correctly', async () => {
    const wrapper = mount(LoginForm)

    const incButton = wrapper.find('[data-testid="number-age-inc"]')
    const numberInput = wrapper.find('[data-testid="number-age"]')

    await incButton.trigger('keydown.up') // Or trigger pointerdown

    // Check internal state / DOM update
    expect((numberInput.element as HTMLInputElement).value).toBe('1')
  })
})
```

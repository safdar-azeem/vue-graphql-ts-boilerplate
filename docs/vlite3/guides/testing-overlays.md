# Testing Overlays (Modals & SidePanels)

Testing components that rely on `<Teleport>` to render outside the standard DOM hierarchy (like `Modal`, `SidePanel`, and `ConfirmationModal`) requires a slight shift in strategy compared to standard inline components.

VLite3 simplifies this by automatically generating semantic `data-testid` attributes on both the **Trigger** and the **Teleported Body**.

## The `data-testid` System

You do not need to manually add test attributes to overlays. They are derived directly from the `title` of the overlay component to ensure immediate predictability.

| Component | Teleported Body ID | Trigger ID | Close Button ID |
| :--- | :--- | :--- | :--- |
| **Modal** | `modal-{title}` | `modal-trigger-{title}` | `modal-close-btn` |
| **SidePanel** | `sidepanel-{title}` | `sidepanel-trigger-{title}` | `sidepanel-close-btn` |
| **ConfirmationModal** | `confirm-modal-{title}`| `modal-trigger-{title}` | `confirm-modal-cancel` / `confirm-modal-confirm` |

> **Example:** A `<Modal title="Edit User">` will have its trigger wrapped with `data-testid="modal-trigger-edit-user"` and the teleported dialog body will have `data-testid="modal-edit-user"`.

If you explicitly pass `data-testid="my-custom-modal"` to the component, the trigger will receive `my-custom-modal-trigger` and the body will receive `my-custom-modal`.

---

## Playwright Integration (E2E)

Playwright searches the real DOM effortlessly, meaning you can locate Teleported elements exactly as you would locate standard inline elements.

### Example: Testing a Modal Workflow
```typescript
import { test, expect } from '@playwright/test';

test('User can open and submit the Edit Profile modal', async ({ page }) => {
  await page.goto('/settings');

  // 1. Click the trigger using its auto-generated ID
  await page.getByTestId('modal-trigger-edit-profile').click();

  // 2. Wait for the teleported modal body to animate in and become visible
  const modal = page.getByTestId('modal-edit-profile');
  await expect(modal).toBeVisible();

  // 3. Interact with the form *inside* the modal
  const usernameInput = modal.getByTestId('input-username');
  await usernameInput.fill('new_username');

  // 4. Submit and verify closure
  await modal.getByTestId('btn-save').click();
  await expect(modal).toBeHidden();
});

test('User can dismiss a Confirmation Modal', async ({ page }) => {
  await page.getByTestId('modal-trigger-delete-account').click();
  
  const confirmModal = page.getByTestId('confirm-modal-delete-account');
  await expect(confirmModal).toBeVisible();

  // Click the specific cancel button inside the confirmation wrapper
  await confirmModal.getByTestId('confirm-modal-cancel').click();
  await expect(confirmModal).toBeHidden();
});
```

---

## Vitest & Vue Test Utils (Component Testing)

When writing localized component tests with `@vue/test-utils`, `<Teleport>` targets like `body` are outside the scope of your `wrapper`. By default, `wrapper.find()` will **not** find teleported content.

You have two solutions: 

### Strategy 1: Global Stubs (Recommended)
You can configure Vitest to stub the `<Teleport>` component so that it renders its contents **inline** (where the component was declared), rather than moving it to the `<body>`. This makes standard `wrapper.find()` queries work perfectly.

```typescript
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import UserProfile from './UserProfile.vue';

describe('UserProfile.vue', () => {
  it('opens the sidepanel when clicking the edit button', async () => {
    const wrapper = mount(UserProfile, {
      global: {
        stubs: {
          // Renders the sidepanel inline for easy querying
          teleport: true 
        }
      }
    });

    // 1. Click the SidePanel Trigger
    await wrapper.find('[data-testid="sidepanel-trigger-user-settings"]').trigger('click');

    // 2. Because Teleport is stubbed, we can find the panel inside the wrapper
    const panel = wrapper.find('[data-testid="sidepanel-user-settings"]');
    expect(panel.exists()).toBe(true);

    // 3. Close it via the internal close button
    await panel.find('[data-testid="sidepanel-close-btn"]').trigger('click');
  });
});
```

### Strategy 2: Querying `document.body` directly
If you are testing logic that specifically relies on the element existing at the end of the DOM hierarchy, you can query `document.body` manually. Ensure you clean up your DOM after each test.

```typescript
import { mount } from '@vue/test-utils';
import { describe, it, expect, afterEach } from 'vitest';
import UserProfile from './UserProfile.vue';

describe('UserProfile.vue (Real DOM)', () => {
  afterEach(() => {
    // Crucial: Clean up the DOM so teleports don't bleed between tests
    document.body.innerHTML = '';
  });

  it('renders teleported modal into the body', async () => {
    const wrapper = mount(UserProfile);

    await wrapper.find('[data-testid="modal-trigger-edit-profile"]').trigger('click');

    // Query the actual document body
    const modalInBody = document.body.querySelector('[data-testid="modal-edit-profile"]');
    expect(modalInBody).not.toBeNull();
  });
});
```

## Accessibility (A11y) Testing
VLite3 overlays automatically inject correct ARIA attributes when they mount. If you write accessibility tests (like `axe-core`), you can target standard ARIA selectors.
* Both `Modal` and `SidePanel` bodies possess `role="dialog"` and `aria-modal="true"`.
* Focus is trapped inside the component while open, and restored back to the trigger on close.

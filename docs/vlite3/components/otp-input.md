# OTPInput

**Import:** `import { OTPInput } from 'vlite3'`

### Props

| Prop          | Type                              | Default   | Description                                        |
| :------------ | :-------------------------------- | :-------- | :------------------------------------------------- |
| `modelValue`  | `string`                          | `''`      | Binding (`v-model`) - Joined string                |
| `length`      | `number`                          | `6`       | Number of inputs                                   |
| `type`        | `'text' \| 'number'`              | `number`  | Input mask                                         |
| `placeholder` | `string`                          | `''`      | Input placeholder                                  |
| `variant`     | `'solid' \| 'outline' \| 'ghost'` | `outline` | Visual style                                       |
| `size`        | `'sm' \| 'md' \| 'lg'`            | `md`      | Dimensions                                         |
| `attached`    | `boolean`                         | `false`   | Group inputs visually                              |
| `error`       | `boolean`                         | `false`   | Error state                                        |
| `disabled`    | `boolean`                         | `false`   | Disable all inputs                                 |
| `autofocus`   | `boolean`                         | `false`   | Focus first input on mount                         |
| `mask`        | `boolean`                         | `false`   | Hide input values like a password field            |
| `fluid`            | `boolean`                         | `false`   | Stretch inputs to fill parent container width equally |
| `allowResend`      | `boolean`                         | `false`   | Enables the resend countdown UI                    |
| `resendDuration`   | `number`                          | `45`      | The countdown duration in seconds                  |
| `maxResends`       | `number`                          | `5`       | Maximum number of times a user can resend          |
| `resendText`       | `string`                          | `'Don\'t see it?'`       | Text displayed before wait/action text   |
| `resendActionText` | `string`                          | `'Resend code'`          | Text of the clickable action button      |
| `resendWaitText`   | `string`                          | `'Resend code in'`       | Text displayed during countdown          |
| `resendLimitText`  | `string`                          | `'Too many attempts...'` | Text displayed when limits are reached   |

### Events

- `@update:modelValue`: Emitted on change
- `@change`: Emitted when the joined string changes
- `@complete`: Emitted when all fields are filled
- `@resend`: Emitted when the user requests a new code, providing the current `count`
- `@resend-limit-reached`: Emitted when the user surpasses the `maxResends` capacity

#### RTL

The digit row is a **`dir="ltr"` island** (left → right), including attached-cell radii and attached `-space-x` overlap, so digit order and focus traversal stay left-to-right on RTL pages.

### Usage
```vue
<!-- Basic -->
<OTPInput v-model="otp" :length="4" variant="solid" @complete="verifyOtp" />

<!-- Masked (hidden digits like password) -->
<OTPInput v-model="otp" mask @complete="verifyOtp" />

<!-- Fluid (stretches to parent width) -->
<div class="w-full max-w-sm">
  <OTPInput v-model="otp" fluid />
</div>

<!-- Masked + Fluid -->
<div class="w-full max-w-sm">
  <OTPInput v-model="otp" mask fluid @complete="verifyOtp" />
</div>

<!-- With Resend Functionality -->
<OTPInput 
  v-model="otp" 
  allow-resend
  :resend-duration="45"
  :max-resends="3"
  @resend="handleResend"
  @resend-limit-reached="handleResendLimit" 
/>
```

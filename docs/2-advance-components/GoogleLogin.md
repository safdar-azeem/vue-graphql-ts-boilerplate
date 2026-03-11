# GoogleLogin

**Import:** `import { GoogleLogin } from 'vlite3'`

### Description

A lightweight component integrating `vue3-google-login` for seamless Google OAuth authentication. Supports native visual styling or custom slot overrides.

### Props

| Prop             | Type      | Default               | Description                       |
| :--------------- | :-------- | :-------------------- | :-------------------------------- |
| `clientId`       | `string`  | required              | Google OAuth Client ID            |
| `buttonText`     | `string`  | `Sign in with Google` | Label text for the default button |
| `buttonTextI18n` | `string`  | —                     | I18n translation key for text     |
| `btnClass`       | `string`  | —                     | Custom class for the button       |
| `variant`        | `string`  | `outline`             | Visual style variant of button    |
| `size`           | `string`  | `md`                  | Dimensions scale                  |
| `rounded`        | `string`  | `md`                  | Border radius                     |
| `disabled`       | `boolean` | `false`               | Disable the interaction           |

### Events

- `@success`: Emitted when Google login is successfully executed, returning the response object.
- `@error`: Emitted when Google login fails or throws an error.

### Slots

| Slot      | Description               | Scoped Props                                                 |
| :-------- | :------------------------ | :----------------------------------------------------------- |
| `default` | Custom button replacement | `{ login: () => void, loading: boolean, disabled: boolean }` |

### Usage

#### Basic Usage

```vue
<script setup>
import { GoogleLogin } from 'vlite3'

const handleSuccess = (response) => {
  console.log('Token received', response)
}
</script>

<template>
  <GoogleLogin clientId="YOUR_GOOGLE_CLIENT_ID" @success="handleSuccess" @error="console.error" />
</template>
```

#### Custom Slot Implementation

```vue
<GoogleLogin clientId="YOUR_GOOGLE_CLIENT_ID" @success="handleSuccess" @error="handleError">
  <template #default="{ login, loading, disabled }">
    <Button
      variant="primary"
      :loading="loading"
      :disabled="disabled"
      @click="login"
      icon="lucide:log-in"
    >
      Custom Google Sign-in
    </Button>
  </template>
</GoogleLogin>
```

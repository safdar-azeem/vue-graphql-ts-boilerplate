# 🚀 Setup & Global Configuration

Welcome! We are thrilled to have you here. Setting up **vlite3** is designed to be as frictionless and clean as our components. Let’s get you up and running so you can focus on building wonderful, minimalist interfaces.

---

## 1. Installation

First, pull the package into your project using your favorite package manager:

```bash
npm install vlite3
```
*or*
```bash
yarn add vlite3
```

Vlite3 installs its required Tailwind 4 packages automatically.

## 2. Tailwind CSS Setup (Tailwind v4)

In order to adopt the beautiful, minimalistic **Clean** aesthetics, register the Tailwind plugin.

**`vite.config.ts`**
```ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
```

**`style.css`**
```css
@import 'tailwindcss';
@layer theme, base, components, utilities;

/* Import the core vlite3 styles */
@import 'vlite3/style.css';
@source "../node_modules/vlite3";
```

## 3. Basic Usage

Now for the fun part! You can start dropping gorgeous components directly into your Vue templates. 

Notice how easily everything fits together, relying on ample whitespace by default:

```vue
<script setup>
import { Button, Input } from 'vlite3'
</script>

<template>
  <!-- Notice the generous p-8 padding for a clean layout -->
  <div class="p-8 space-y-6 max-w-sm mx-auto">
    <h2 class="text-xl font-semibold tracking-tight text-foreground">Welcome Back</h2>
    
    <div class="space-y-4">
      <Input placeholder="Enter your email..." />
      <Button class="w-full">Sign In</Button>
    </div>
  </div>
</template>
```

---

## 🌎 Global Configuration (The Registry System)

To maintain a perfectly pristine codebase (free of repetitive code clutter!), vlite3 features a plugin-based architecture. You define your global behavior *once*, and the entire library intelligently reacts to it.

### Setting up the Plugin

Jump into your `main.ts` or `main.js` and set up the `vlite` plugin:

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import { createVLite, vScrollReveal, GoogleSignInPlugin } from 'vlite3'

const app = createApp(App)

// Add delightful scroll animations
app.directive('scroll-reveal', vScrollReveal)

// Optionally add Google Auth
app.use(GoogleSignInPlugin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
})

// Initialize VLite with your Custom Configuration
const vlite = createVLite({
  // 1. Global Service Registry
  services: {
    /**
     * Upload Once, Use Everywhere!
     * 
     * Simply define your upload logic here. Any Form component using 
     * 'file', 'fileUploader', 'avatarUpload', or 'thumbnailSelector'
     * types will automatically use this function. Pure magic! ✨
     */
    upload: async (file, folderId) => {
      const formData = new FormData()
      formData.append('file', file)
      if (folderId) formData.append('folder_id', folderId)

      const response = await fetch('https://api.yourdomain.com/v1/upload', {
        method: 'POST',
        body: formData,
        headers: { Authorization: 'Bearer ...' },
      })

      if (!response.ok) throw new Error('Upload failed')
      const data = await response.json()
      
      return data.url // MUST return the secure file URL string
    },
  },

  // 2. Global UI Component Configurations
  components: {
    form: {
      // Define a system-wide form aesthetic to ensure UI consistency
      variant: 'outline', // Choose 'solid' | 'outline' | 'floating'
      size: 'md', 
      rounded: 'md', 
      showRequiredAsterisk: true, 
    },
  },
})

app.use(vlite)
app.mount('#app')
```

### Beautiful Side-Effects 🌸

By adopting this structure, you achieve incredible things:

1.  **Automatic Form Uploads**: The `Form` component automatically processes and uploads all your files in *parallel* the moment a user submits, replacing the raw files with the secure URLs from your service before invoking your final `@onSubmit` hook.
2.  **Unshakeable Consistency**: Every single form field gracefully adopts your global `variant` and `rounded` properties, eliminating UI fragmentation across pages.

### Advanced Form Override Example

Need a specific form to look slightly different? You can easily override the global fallbacks right on the specific component:

```vue
<script setup>
import { Form } from 'vlite3'

const schema = [
  { name: 'avatar', label: 'Profile Picture', type: 'avatarUpload' },
  { name: 'resume', label: 'Resume', type: 'fileUploader', props: { multiple: true } },
]

const handleSubmit = (payload) => {
  // Relax! The payload already has the URLs, not the raw files 😊
  console.log('Avatar URL:', payload.values.avatar)
  console.log('Resume URLs:', payload.values.resume)
}
</script>

<template>
  <div class="max-w-2xl mx-auto py-10">
    <!-- Inherits standard global aesthetics -->
    <Form :schema="schema" @onSubmit="handleSubmit" />

    <!-- Overriding globally defined styles for this specific block -->
    <Form :schema="schema" variant="floating" size="lg" @onSubmit="handleSubmit" />
  </div>
</template>
```

You are now fully set up. Have fun shaping digital beauty!

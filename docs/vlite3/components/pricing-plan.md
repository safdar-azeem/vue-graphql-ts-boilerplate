# PricingPlan

**Import:** `import { PricingPlan } from 'vlite3'`

### Description

A responsive pricing table component supporting highlighting, features lists, and different visual variants.

### Props

| Prop         | Type                      | Default     | Description                               |
| :----------- | :------------------------ | :---------- | :---------------------------------------- |
| `items`      | `PricingPlanItemSchema[]` | `[]`        | Array of plan definitions                 |
| `modelValue` | `string \| number`        | `null`      | Selected plan ID (v-model)                |
| `variant`    | `'outline' \| 'solid'`    | `'outline'` | Visual style variant                      |
| `columns`    | `number`                  | `3`         | Number of columns (responsive by default) |
| `gap`        | `number`                  | `6`         | Gap between cards (tailwind scale)        |

### Item Schema (`PricingPlanItemSchema`)

```typescript
interface PricingPlanItemSchema {
  id: string | number
  title: string
  price: string
  period?: string
  description?: string
  features: Array<string | { text: string; included: boolean }>
  buttonText?: string
  popular?: boolean // Adds "Popular" badge
  recommended?: boolean // Adds styling emphasis
  variant?: 'outline' | 'solid' // Override per item
}
```

### Events

- `@update:modelValue`: Emitted when a plan is selected (via button click).
- `@change`: Emitted when selection changes.

### Usage

```vue
<script setup>
import { ref } from 'vue'

const selected = ref('pro')
const plans = [
  {
    id: 'basic',
    title: 'Basic',
    price: '/bin/zsh',
    features: ['1 Project', 'Basic Support'],
  },
  {
    id: 'pro',
    title: 'Pro',
    price: '',
    popular: true,
    features: ['Unlimited Projects', 'Priority Support'],
  },
]
</script>

<template>
  <PricingPlan v-model="selected" :items="plans" variant="outline" />
</template>
```

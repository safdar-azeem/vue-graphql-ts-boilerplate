import type { IForm } from 'vlite3'

export const forgotPasswordSchema: IForm[] = [
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your registered email',
    required: true,
    icon: 'lucide:mail',
  },
]

export const resetPasswordSchema: IForm[] = [
  {
    name: 'password',
    label: 'New Password',
    type: 'password',
    placeholder: 'Enter new password',
    required: true,
    icon: 'lucide:lock',
    validation: ({ value }) => {
      if (!value) return 'Password is required'
      if (value.length < 6) return 'Password must be at least 6 characters'
      return ''
    },
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Confirm new password',
    required: true,
    icon: 'lucide:check',
    validation: ({ value, values }) => {
      if (!value) return 'Please confirm your password'
      if (value !== values.password) return 'Passwords do not match'
      return ''
    },
  },
]

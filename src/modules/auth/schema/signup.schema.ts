import type { IForm } from 'vlite3'

export const signupSchema: IForm[] = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'johndoe',
    required: true,
    icon: 'lucide:user',
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'you@example.com',
    required: true,
    icon: 'lucide:mail',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    required: true,
    icon: 'lucide:lock',
    validation: ({ value }) => {
      if (!value) return ''
      if (value.length < 6) return 'Password must be at least 6 characters'
      return ''
    },
  },
]

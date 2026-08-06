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
    name: 'workspaceName',
    label: 'Workspace Name',
    type: 'text',
    placeholder: 'My Workspace',
    required: true,
    icon: 'lucide:building-2',
    validation: ({ value }) => {
      if (!value) return ''
      const trimmed = value.trim()
      if (trimmed.length < 2) return 'Workspace name must be at least 2 characters'
      if (trimmed.length > 100) return 'Workspace name must be at most 100 characters'
      return ''
    },
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
      if (value.length < 8) return 'Password must be at least 8 characters'
      return ''
    },
  },
]

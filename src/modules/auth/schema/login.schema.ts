import type { IForm } from 'vlite3'

export const loginSchema: IForm[] = [
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
	},
]

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Form, useNotifications, type IForm } from 'vlite3'
import { useMeQuery, useUpdateUserProfileMutation } from '@/graphql/generated'

// Using auto-generated composables
const { result: meResult, refetch } = useMeQuery()
const { mutate: updateProfile, loading: updating } =
	useUpdateUserProfileMutation()
const { showToast } = useNotifications()

// Form Schema
const schema: IForm[] = [
	{
		name: 'avatar',
		label: 'Profile Picture',
		type: 'avatarUpload',
	},
	{
		name: 'username',
		label: 'Username',
		type: 'text',
		placeholder: 'Enter your username',
		required: true,
		icon: 'lucide:user',
	},
	{
		name: 'email',
		label: 'Email',
		type: 'email',
		disabled: true,
		icon: 'lucide:mail',
		props: {
			addonRight: '(Read Only)',
		},
	},
]

// Initial Values State
const initialValues = ref({})

// Sync form values when query result loads
watch(
	() => meResult.value?.me,
	(user) => {
		if (user) {
			initialValues.value = {
				avatar: user.avatar,
				username: user.username,
				email: user.email,
			}
		}
	},
	{ immediate: true },
)

const handleSubmit = async (payload: { values: any }) => {
	try {
		const { values } = payload

		// NOTE: 'values.avatar' is already the public URL string here.
		// The uploadService registered in main.ts handled the file upload
		// automatically before this callback was invoked.

		await updateProfile({
			data: {
				username: values.username,
				avatar: values.avatar,
			},
		})

		showToast('Profile updated successfully', 'success')
		refetch() // Refresh local data
	} catch (err: any) {
		console.error(err)
		showToast(err.message || 'Failed to update profile', 'error')
	}
}
</script>

<template>
	<div class="bg-white p-6 rounded-lg border shadow-sm">
		<div class="mb-6 border-b pb-4">
			<h3 class="text-lg font-semibold text-gray-900">
				Profile Settings
			</h3>
			<p class="text-sm text-gray-500">
				Update your personal information and avatar.
			</p>
		</div>

		<Form
			:schema="schema"
			:values="initialValues"
			:loading="updating"
			submit-text="Save Changes"
			@on-submit="handleSubmit" />
	</div>
</template>

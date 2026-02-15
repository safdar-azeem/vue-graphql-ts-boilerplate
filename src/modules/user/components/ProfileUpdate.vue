<script setup lang="ts">
import { computed } from 'vue'
import { Form, showToast, type IForm } from 'vlite3'
import { useMeQuery, useUpdateUserProfileMutation } from '@/graphql'

const { result: meResult, refetch } = useMeQuery()
const { mutate: updateProfile, loading: updating } = useUpdateUserProfileMutation()

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

const initialValues = computed(() => {
  return {
    avatar: meResult.value?.me?.avatar,
    username: meResult.value?.me?.username,
    email: meResult.value?.me?.email,
  }
})

const handleSubmit = async (payload: { values: any }) => {
  try {
    const { values } = payload

    await updateProfile({
      data: {
        username: values.username,
        avatar: values.avatar,
      },
    })

    showToast('Profile updated successfully', 'success')
    refetch()
  } catch (err: any) {
    console.error(err)
    showToast(err.message || 'Failed to update profile', 'error')
  }
}
</script>

<template>
  <div class="bg-white p-6 rounded-lg border shadow-sm">
    <div class="mb-6 border-b pb-4">
      <h3 class="text-lg font-semibold text-gray-900">Profile Settings</h3>
      <p class="text-sm text-gray-500">Update your personal information and avatar.</p>
    </div>

    <Form
      :schema="schema"
      :values="initialValues"
      :loading="updating"
      submit-text="Save Changes"
      @on-submit="handleSubmit" />
  </div>
</template>

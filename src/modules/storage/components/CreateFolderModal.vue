<script setup lang="ts">
import { Modal, Form, useNotifications } from 'vlite3'
import { useCreateFolderMutation } from '@/graphql/generated'

interface Props {
	parentId: string | null
}

const props = defineProps<Props>()
const emit = defineEmits(['update:show', 'created'])

const { showToast } = useNotifications()
const { mutate: createFolder, loading: creatingFolder } =
	useCreateFolderMutation()

const handleCreateFolder = async (payload: any, close) => {
	try {
		await createFolder({
			input: {
				name: payload.values.name,
				parentId: props.parentId,
			},
		})
		showToast('Folder created', 'success')
		emit('created')
		close()
	} catch (e: any) {
		showToast(e.message, 'error')
	}
}
</script>

<template>
	<Modal
		title="Create New Folder"
		max-width="max-w-md">
		<template #trigger>
			<slot />
		</template>

		<template #default="{ close }">
			<Form
				:schema="[
					{
						name: 'name',
						label: 'Folder Name',
						type: 'text',
						required: true,
						placeholder: 'My Documents',
					},
				]"
				:loading="creatingFolder"
				submit-text="Create Folder"
				@on-submit="(payload) => handleCreateFolder(payload, close)" />
		</template>
	</Modal>
</template>

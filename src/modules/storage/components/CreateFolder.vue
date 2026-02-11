<script setup lang="ts">
import { Form, useNotifications } from 'vlite3'
import { useCreateFolderMutation } from '@/graphql/generated'

interface Props {
	parentId: string | null
}

const props = defineProps<Props>()

const { showToast } = useNotifications()
const { mutate: createFolder, loading: creatingFolder } =
	useCreateFolderMutation({
		refetchQueries: ['GetFolders', 'GetFiles'],
	})

const handleCreateFolder = async (payload: any, close) => {
	try {
		await createFolder({
			input: {
				name: payload.values.name,
				parentId: props.parentId,
			},
		})
		showToast('Folder created', 'success')
		close?.()
	} catch (e: any) {
		showToast(e.message, 'error')
	}
}
</script>

<template>
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
		@on-submit="handleCreateFolder" />
</template>

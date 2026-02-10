<script setup lang="ts">
import { ref } from 'vue'
import { Modal, Button, FilePicker, useNotifications } from 'vlite3'
import { uploadHandler } from '@/services/upload.service'

interface Props {
	folderId: string | null
}

const props = defineProps<Props>()
const emit = defineEmits(['update:show', 'uploaded'])

const { showToast } = useNotifications()
const uploadFiles = ref<any[]>([])
const uploading = ref(false)

const handleUpload = async (close) => {
	if (!uploadFiles.value.length) return
	uploading.value = true

	try {
		const promises = uploadFiles.value.map((fileVal) =>
			uploadHandler(fileVal.file, props.folderId),
		)

		await Promise.all(promises)

		showToast('Files uploaded successfully', 'success')
		close()
		emit('uploaded')
		uploadFiles.value = []
	} catch (e: any) {
		console.error(e)
		showToast(e.message, 'error')
	} finally {
		uploading.value = false
	}
}
</script>

<template>
	<Modal
		title="Upload Files"
		max-width="max-w-lg"
		@update:show="(val) => emit('update:show', val)">
		<template #trigger>
			<slot />
		</template>

		<template #default="{ close }">
			<div class="space-y-4">
				<FilePicker
					v-model="uploadFiles"
					multi-select
					class="w-full" />
				<div class="flex justify-end gap-2 mt-4">
					<Button
						variant="outline"
						@click="emit('update:show', false)"
						>Cancel</Button
					>
					<Button
						:disabled="!uploadFiles.length"
						:loading="uploading"
						@click="handleUpload(close)">
						Upload {{ uploadFiles.length }} File(s)
					</Button>
				</div>
			</div>
		</template>
	</Modal>
</template>

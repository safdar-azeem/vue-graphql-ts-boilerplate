<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
	Button,
	DataTable,
	Icon,
	Modal,
	Form,
	useNotifications,
	FilePicker,
} from 'vlite3'
import {
	useGetFilesQuery,
	useGetFoldersQuery,
	useCreateFolderMutation,
	useDeleteFolderMutation,
	useDeleteFilesMutation,
	useConfirmUploadMutation,
} from '@/graphql/generated'
import { uploadHandler } from '@/services/upload.service'

const { showToast } = useNotifications()

// --- State ---
const currentFolderId = ref<string | null>(null)
const searchQuery = ref('')
const showCreateFolderModal = ref(false)
const showUploadModal = ref(false)
const uploadFiles = ref<any[]>([])
const uploading = ref(false)
const viewMode = ref<'grid' | 'list'>('list')

// --- Queries ---
const {
	result: filesResult,
	refetch: refetchFiles,
	loading: filesLoading,
} = useGetFilesQuery({
	filter: {
		folderId: computed(() => currentFolderId.value),
		search: computed(() => searchQuery.value),
	},
})

const {
	result: foldersResult,
	refetch: refetchFolders,
	loading: foldersLoading,
} = useGetFoldersQuery({
	filter: {
		parentId: computed(() => currentFolderId.value),
		search: computed(() => searchQuery.value),
	},
})

const { mutate: createFolder, loading: creatingFolder } =
	useCreateFolderMutation()
const { mutate: deleteFolder } = useDeleteFolderMutation()
const { mutate: deleteFiles } = useDeleteFilesMutation()

// --- Computed ---
const items = computed(() => {
	const folders = (foldersResult.value?.getFolders?.items || []).map((f) => ({
		...f,
		type: 'folder',
	}))
	const files = (filesResult.value?.getFiles?.items || []).map((f) => ({
		...f,
		type: 'file',
	}))
	return [...folders, ...files]
})

const breadcrumbs = ref<{ id: string | null; name: string }[]>([
	{ id: null, name: 'Home' },
])

// --- Actions ---
const handleFolderClick = (folder: any) => {
	currentFolderId.value = folder.id
	breadcrumbs.value.push({ id: folder.id, name: folder.name })
}

const handleBreadcrumbClick = (index: number) => {
	const target = breadcrumbs.value[index]
	currentFolderId.value = target.id
	breadcrumbs.value = breadcrumbs.value.slice(0, index + 1)
}

const handleCreateFolder = async (payload: any) => {
	try {
		await createFolder({
			input: {
				name: payload.values.name,
				parentId: currentFolderId.value,
			},
		})
		showToast('Folder created', 'success')
		showCreateFolderModal.value = false
		refetchFolders()
	} catch (e: any) {
		showToast(e.message, 'error')
	}
}

const handleUpload = async () => {
	if (!uploadFiles.value.length) return
	uploading.value = true

	try {
		// Process files one by one or parallel
		const promises = uploadFiles.value.map((fileVal) =>
			uploadHandler(fileVal.file, currentFolderId.value),
		)

		await Promise.all(promises)

		showToast('Files uploaded successfully', 'success')
		showUploadModal.value = false
		uploadFiles.value = []
		refetchFiles()
	} catch (e: any) {
		showToast(e.message, 'error')
	} finally {
		uploading.value = false
	}
}

const handleDelete = async (itemsToDelete: any[]) => {
	if (!confirm(`Delete ${itemsToDelete.length} items?`)) return

	const fileIds = itemsToDelete
		.filter((i) => i.type === 'file')
		.map((i) => i.id)
	const folderIds = itemsToDelete
		.filter((i) => i.type === 'folder')
		.map((i) => i.id)

	try {
		if (fileIds.length) await deleteFiles({ ids: fileIds })
		// Note: Folder delete usually needs individual calls or a batch endpoint
		for (const fid of folderIds) {
			await deleteFolder({ id: fid })
		}
		showToast('Deleted successfully', 'success')
		refetchFiles()
		refetchFolders()
	} catch (e: any) {
		showToast(e.message, 'error')
	}
}

const getFileIcon = (mimeType: string) => {
	if (mimeType?.startsWith('image')) return 'lucide:image'
	if (mimeType?.includes('pdf')) return 'lucide:file-text'
	return 'lucide:file'
}

// --- Table Config ---
const headers = [
	{ field: 'name', title: 'Name', sortable: true },
	{ field: 'size', title: 'Size', sortable: true },
	{ field: 'updatedAt', title: 'Last Modified', sortable: true },
	{ field: 'action', title: 'Action', align: 'center' },
]

const formatSize = (bytes: number) => {
	if (!bytes) return '-'
	const k = 1024
	const sizes = ['B', 'KB', 'MB', 'GB']
	const i = Math.floor(Math.log(bytes) / Math.log(k))
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

<template>
	<div class="p-6 h-full flex flex-col bg-gray-50 min-h-screen">
		<div
			class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
			<div>
				<h1
					class="text-2xl font-bold text-gray-900 flex items-center gap-2">
					<Icon
						icon="lucide:hard-drive"
						class="text-primary" />
					Storage Manager
				</h1>
				<div class="flex items-center gap-2 text-sm text-gray-500 mt-1">
					<template
						v-for="(crumb, idx) in breadcrumbs"
						:key="idx">
						<span
							class="cursor-pointer hover:text-primary transition-colors"
							@click="handleBreadcrumbClick(idx)">
							{{ crumb.name }}
						</span>
						<Icon
							v-if="idx < breadcrumbs.length - 1"
							icon="lucide:chevron-right"
							class="w-4 h-4" />
					</template>
				</div>
			</div>

			<div class="flex items-center gap-3">
				<Button
					variant="outline"
					icon="lucide:folder-plus"
					@click="showCreateFolderModal = true">
					New Folder
				</Button>
				<Button
					variant="primary"
					icon="lucide:upload"
					@click="showUploadModal = true">
					Upload
				</Button>
			</div>
		</div>

		<div
			class="bg-white rounded-xl border shadow-sm flex-1 overflow-hidden flex flex-col">
			<DataTable
				:rows="items"
				:headers="headers"
				:loading="filesLoading || foldersLoading"
				selectable
				hoverable
				@delete="handleDelete">
				<template #name="{ value: row }">
					<div
						class="flex items-center gap-3 cursor-pointer"
						@click="
							row.type === 'folder'
								? handleFolderClick(row)
								: null
						">
						<div
							class="w-10 h-10 rounded-lg flex items-center justify-center"
							:class="
								row.type === 'folder'
									? 'bg-blue-50 text-blue-600'
									: 'bg-gray-100 text-gray-600'
							">
							<img
								v-if="
									row.type === 'file' &&
									row.mimeType?.startsWith('image')
								"
								:src="row.url"
								class="w-full h-full object-cover rounded-lg" />
							<Icon
								v-else
								:icon="
									row.type === 'folder'
										? 'lucide:folder'
										: getFileIcon(row.mimeType)
								" />
						</div>
						<span class="font-medium text-gray-900">{{
							row.name || row.originalName
						}}</span>
					</div>
				</template>

				<template #size="{ value: row }">
					<span class="text-gray-500 text-sm">{{
						row.type === 'folder' ? '-' : formatSize(row.size)
					}}</span>
				</template>

				<template #updatedAt="{ value: row }">
					<span class="text-gray-500 text-sm">{{
						new Date(row.updatedAt).toLocaleDateString()
					}}</span>
				</template>

				<template #action="{ value: row }">
					<div class="flex justify-center gap-2">
						<Button
							v-if="row.type === 'file'"
							variant="ghost"
							size="xs"
							icon="lucide:download"
							component="a"
							:href="row.url"
							download />
						<Button
							variant="ghost"
							size="xs"
							icon="lucide:trash-2"
							class="text-red-500 hover:text-red-600 hover:bg-red-50"
							@click.stop="handleDelete([row])" />
					</div>
				</template>
			</DataTable>
		</div>

		<Modal
			v-model:show="showCreateFolderModal"
			title="Create New Folder"
			max-width="max-w-md">
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
		</Modal>

		<Modal
			v-model:show="showUploadModal"
			title="Upload Files"
			max-width="max-w-lg">
			<div class="space-y-4 py-4">
				<FilePicker
					v-model="uploadFiles"
					multi-select
					class="w-full" />
				<div class="flex justify-end gap-2 mt-4">
					<Button
						variant="outline"
						@click="showUploadModal = false"
						>Cancel</Button
					>
					<Button
						:disabled="!uploadFiles.length"
						:loading="uploading"
						@click="handleUpload">
						Upload {{ uploadFiles.length }} File(s)
					</Button>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
	Button,
	DataTable,
	Icon,
	useNotifications,
	type TableHeader,
	ConfirmationModal,
	Modal,
} from 'vlite3'
import {
	useGetFilesQuery,
	useGetFoldersQuery,
	useDeleteFolderMutation,
	useDeleteFilesMutation,
} from '@/graphql/generated'
import ShareModal from '../components/ShareModal.vue'
import CreateFolder from '../components/CreateFolder.vue'
import UploadForm from '../components/UploadForm.vue'

const { showToast } = useNotifications()

// --- State ---
const currentFolderId = ref<string | null>(null)
const searchQuery = ref('')

// --- Queries ---
const {
	result: filesResult,
	refetch: refetchFiles,
	loading: filesLoading,
} = useGetFilesQuery(() => ({
	filter: {
		folderId: currentFolderId.value,
		search: searchQuery.value,
	},
}))

const {
	result: foldersResult,
	refetch: refetchFolders,
	loading: foldersLoading,
} = useGetFoldersQuery(() => ({
	filter: {
		parentId: currentFolderId.value,
		search: searchQuery.value,
	},
}))

const { mutate: deleteFolder, loading: deletingFolder } =
	useDeleteFolderMutation()
const { mutate: deleteFiles, loading: deletingFiles } = useDeleteFilesMutation()

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

const refreshData = () => {
	refetchFiles()
	refetchFolders()
}

const handleFolderClick = (folder: any) => {
	currentFolderId.value = folder.id
	breadcrumbs.value.push({ id: folder.id, name: folder.name })
}

const handleBreadcrumbClick = (index: number) => {
	const target = breadcrumbs.value[index]
	currentFolderId.value = target.id
	breadcrumbs.value = breadcrumbs.value.slice(0, index + 1)
}

const executeDelete = async (itemsToDelete: any[]) => {
	const fileIds = itemsToDelete
		.filter((i) => i.type === 'file')
		.map((i) => i.id)
	const folderIds = itemsToDelete
		.filter((i) => i.type === 'folder')
		.map((i) => i.id)

	try {
		if (fileIds.length) await deleteFiles({ ids: fileIds })
		for (const fid of folderIds) {
			await deleteFolder({ id: fid })
		}
		showToast('Deleted successfully', 'success')
		refreshData()
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
const headers: TableHeader[] = [
	{ field: 'name', title: 'Name', sortable: true, minWidth: '200px' },
	{
		field: 'size',
		title: 'Size',
		sortable: true,
		width: '100px',
		hideOnMobile: true,
	},
	{
		field: 'updatedAt',
		title: 'Last Modified',
		sortable: true,
		width: '150px',
		hideOnMobile: true,
	},
	{ field: 'action', title: 'Action', align: 'center', width: '120px' },
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
	<div
		class="p-4 md:p-6 h-full flex flex-col bg-gray-50 min-h-[calc(100vh-64px)] md:min-h-screen">
		<div
			class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
			<div class="w-full sm:w-auto">
				<h1
					class="text-2xl font-bold text-gray-900 flex items-center gap-2">
					<Icon
						icon="lucide:hard-drive"
						class="text-primary" />
					Storage Manager
				</h1>
				<div
					class="flex items-center gap-2 text-sm text-gray-500 mt-1 overflow-x-auto whitespace-nowrap pb-1 scrollbar-hide max-w-[calc(100vw-32px)] sm:max-w-none">
					<template
						v-for="(crumb, idx) in breadcrumbs"
						:key="idx">
						<span
							class="cursor-pointer hover:text-primary transition-colors flex-shrink-0"
							@click="handleBreadcrumbClick(idx)">
							{{ crumb.name }}
						</span>
						<Icon
							v-if="idx < breadcrumbs.length - 1"
							icon="lucide:chevron-right"
							class="w-4 h-4 flex-shrink-0" />
					</template>
				</div>
			</div>
		</div>

		<div class="bg-white p-4 shadow-sm rounded">
			<div class="flex-1 overflow-x-auto">
				<DataTable
					:rows="items"
					:headers="headers"
					:loading="filesLoading || foldersLoading"
					selectable
					hoverable
					key-field="id"
					@delete="executeDelete">
					<template #toolbar-right>
						<div class="flex items-center gap-3 w-full sm:w-auto">
							<Modal
								:body="CreateFolder"
								title="Create New Folder"
								max-width="max-w-md"
								:parentId="currentFolderId">
								<Button
									variant="outline"
									icon="lucide:folder-plus"
									class="flex-1 sm:flex-none justify-center">
									New Folder
								</Button>
							</Modal>

							<Modal
								:body="UploadForm"
								title="Upload Files"
								:folderId="currentFolderId"
								:refresh="refreshData">
								<Button
									variant="primary"
									icon="lucide:upload"
									class="flex-1 sm:flex-none justify-center">
									Upload
								</Button>
							</Modal>
						</div>
					</template>

					<template #name="{ value: row }">
						<div
							class="flex items-center gap-3 cursor-pointer min-w-0"
							@click="
								row.type === 'folder'
									? handleFolderClick(row)
									: null
							">
							<div
								class="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
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
							<span class="font-medium text-gray-900 truncate">{{
								row.name || row.originalName
							}}</span>
						</div>
					</template>

					<template #size="{ value: row }">
						<span class="text-gray-500 text-sm whitespace-nowrap">{{
							row.type === 'folder' ? '-' : formatSize(row.size)
						}}</span>
					</template>

					<template #updatedAt="{ value: row }">
						<span class="text-gray-500 text-sm whitespace-nowrap">{{
							new Date(row.updatedAt).toLocaleDateString()
						}}</span>
					</template>

					<template #action="{ value: row }">
						<div class="flex justify-end gap-1">
							<Modal
								:body="ShareModal"
								max-width="max-w-xl"
								:title="`Share ${row?.name || 'Item'}`"
								:item="row">
								<Button
									variant="ghost"
									size="xs"
									icon="lucide:share-2"
									title="Share" />
							</Modal>
							<Button
								v-if="row.type === 'file'"
								variant="ghost"
								size="xs"
								icon="lucide:download"
								component="a"
								:href="row.url"
								download />
							<ConfirmationModal
								title="Delete Item"
								description="Are you sure you want to delete this item?"
								@confirm="executeDelete([row])">
								<Button
									variant="ghost"
									size="xs"
									icon="lucide:trash-2"
									class="text-red-500 hover:text-red-600 hover:bg-red-50" />
							</ConfirmationModal>
						</div>
					</template>
				</DataTable>
			</div>
		</div>
	</div>
</template>

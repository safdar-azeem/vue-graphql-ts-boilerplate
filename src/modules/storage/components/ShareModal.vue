<script setup lang="ts">
import { ref, computed } from 'vue'
import {
	Modal,
	Button,
	Icon,
	useNotifications,
	Form,
	Badge,
	showToast,
} from 'vlite3'
import {
	useGetFileShareLinksQuery,
	useGetFolderShareLinksQuery,
	useCreateShareLinkMutation,
	useDeleteShareLinkMutation,
} from '@/graphql/generated'

interface Props {
	item: { id: string; name: string; type: 'file' | 'folder' } | null
}

const props = defineProps<Props>()

// --- State ---
const expiryOptions = [
	{ label: '1 Hour', value: 60 },
	{ label: '24 Hours', value: 1440 },
	{ label: '7 Days', value: 10080 },
	{ label: '30 Days', value: 43200 },
]

// --- Computed Enabled States ---
const fileLinksEnabled = computed(
	() => props.item?.type === 'file' && !!props.item?.id,
)

const folderLinksEnabled = computed(
	() => props.item?.type === 'folder' && !!props.item?.id,
)

// --- Queries ---
const {
	result: fileLinksResult,
	refetch: refetchFileLinks,
	loading: fileLoading,
} = useGetFileShareLinksQuery(
	computed(() => ({ fileId: props.item?.id || '' })),
	{ enabled: fileLinksEnabled, fetchPolicy: 'network-only' },
)

const {
	result: folderLinksResult,
	refetch: refetchFolderLinks,
	loading: folderLoading,
} = useGetFolderShareLinksQuery(
	computed(() => ({ folderId: props.item?.id || '' })),
	{ enabled: folderLinksEnabled, fetchPolicy: 'network-only' },
)

const { mutate: createLink, loading: creating } = useCreateShareLinkMutation()
const { mutate: deleteLink, loading: deleting } = useDeleteShareLinkMutation()

const activeLinks = computed(() => {
	if (props.item?.type === 'file')
		return fileLinksResult.value?.getFileShareLinks || []
	if (props.item?.type === 'folder')
		return folderLinksResult.value?.getFolderShareLinks || []
	return []
})

// --- Actions ---
const handleCreate = async (payload: any) => {
	if (!props.item?.id) return

	try {
		await createLink({
			input: {
				fileId: props.item.type === 'file' ? props.item.id : null,
				folderId: props.item.type === 'folder' ? props.item.id : null,
				expiresInMinutes: Number(payload.values.expiresIn),
			},
		})

		showToast('Link created successfully', 'success')
		refreshLinks()
	} catch (e: any) {
		console.error(e)
		showToast(e.message || 'Failed to create link', 'error')
	}
}

const handleDelete = async (id: string) => {
	if (!id) return
	// Ensure ID is passed as a string, not wrapped in an array or event object
	try {
		await deleteLink({ id: String(id) })
		showToast('Link revoked', 'success')
		refreshLinks()
	} catch (e: any) {
		console.error(e)
		showToast(e.message, 'error')
	}
}

const copyToClipboard = async (url: string) => {
	try {
		await navigator.clipboard.writeText(url)
		showToast('Link copied to clipboard', 'success')
	} catch (err) {
		showToast('Failed to copy', 'error')
	}
}

const refreshLinks = () => {
	if (props.item?.type === 'file') refetchFileLinks()
	else if (props.item?.type === 'folder') refetchFolderLinks()
}

const formatDate = (date: string) => {
	return new Date(date).toLocaleString()
}

const isExpired = (date: string) => {
	return new Date(date) < new Date()
}
</script>

<template>
	<div class="space-y-6 py-2">
		<div class="bg-gray-50 p-4 rounded-lg border border-gray-100">
			<h4 class="text-sm font-medium text-gray-900 mb-3">
				Create New Link
			</h4>
			<Form
				:schema="[
					{
						name: 'expiresIn',
						type: 'select',
						placeholder: 'Select expiration time',
						options: expiryOptions,
						value: 1440,
						required: true,
					},
				]"
				:loading="creating"
				submit-text="Generate Link"
				footer-class="bg-transparent!"
				@on-submit="handleCreate">
				<template #submit="{ loading }">
					<Button
						type="submit"
						:loading="loading"
						icon="lucide:link"
						class="w-full">
						Create Share Link
					</Button>
				</template>
			</Form>
		</div>

		<div>
			<h4
				class="text-sm font-medium text-gray-900 mb-3 flex items-center justify-between">
				<span>Active Links</span>
				<span
					v-if="activeLinks.length"
					class="text-xs text-gray-500"
					>{{ activeLinks.length }} active</span
				>
			</h4>

			<div
				v-if="fileLoading || folderLoading"
				class="flex justify-center py-4">
				<div
					class="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
			</div>

			<div
				v-else-if="activeLinks.length === 0"
				class="text-center py-6 text-gray-500 bg-white border border-dashed rounded-lg">
				<Icon
					icon="lucide:link-2-off"
					class="w-8 h-8 mx-auto mb-2 text-gray-300" />
				<p class="text-sm">No active share links found.</p>
			</div>

			<div
				v-else
				class="space-y-3 max-h-[300px] overflow-y-auto pr-1">
				<div
					v-for="link in activeLinks"
					:key="link.id"
					class="flex items-center justify-between p-3 bg-white border rounded-lg hover:border-gray-300 transition-colors">
					<div class="flex-1 min-w-0 mr-4">
						<div class="flex items-center gap-2 mb-1">
							<p
								class="text-sm font-medium text-gray-900 truncate max-w-[200px]"
								:title="link.url">
								{{ link.url }}
							</p>
							<Badge
								v-if="isExpired(link.expiresAt)"
								variant="danger"
								size="sm"
								>Expired</Badge
							>
							<Badge
								v-else
								variant="success"
								size="sm"
								>Active</Badge
							>
						</div>
						<p
							class="text-xs text-gray-500 flex items-center gap-1">
							<Icon
								icon="lucide:clock"
								class="w-3 h-3" />
							Expires: {{ formatDate(link.expiresAt) }}
						</p>
					</div>
					<div class="flex items-center gap-2">
						<Button
							size="xs"
							variant="outline"
							icon="lucide:copy"
							title="Copy Link"
							@click="copyToClipboard(link.url)" />
						<Button
							size="xs"
							variant="ghost"
							icon="lucide:trash-2"
							class="text-red-500 hover:text-red-600 hover:bg-red-50"
							title="Revoke Link"
							:loading="deleting"
							@click="handleDelete(link.id)" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

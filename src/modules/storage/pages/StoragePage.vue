<script setup lang="ts">
import { ref, computed, markRaw, provide } from 'vue'
import {
  Screen,
  Modal,
  Button,
  Icon,
  Breadcrumb,
  showToast,
  type BreadcrumbItemSchema,
} from 'vlite3'
import {
  useGetFilesQuery,
  useGetFoldersQuery,
  useDeleteFolderMutation,
  useDeleteFilesMutation,
} from '@/graphql'

import StorageTable from '../components/StorageTable.vue'
import CreateFolder from '../components/CreateFolder.vue'
import UploadForm from '../components/UploadForm.vue'

// markRaw prevents Vue from making these reactive (they are component definitions)
const StorageTableRaw = markRaw(StorageTable)

// --- Breadcrumb state ---
// Each entry tracks id (null = root) and a display label
const breadcrumbs = ref<{ id: string | null; name: string }[]>([{ id: null, name: 'Home' }])

// --- Current folder context ---
const currentFolderId = ref<string | null>(null)

// --- Pagination & search ---
const paginationParams = ref({ page: 1, limit: 10 })
const searchQuery = ref('')

const isSearching = computed(() => !!searchQuery.value && searchQuery.value.trim().length > 0)

// --- Build BreadcrumbItemSchema[] for vlite3 Breadcrumb component ---
const breadcrumbItems = computed<BreadcrumbItemSchema[]>(() =>
  breadcrumbs.value.map((crumb, idx) => ({
    label: crumb.name,
    icon: idx === 0 ? 'lucide:hard-drive' : 'lucide:folder',
    // Mark only the last item as active (non-clickable)
    active: idx === breadcrumbs.value.length - 1,
  }))
)

// --- Provide folder click handler to StorageTable via inject ---
const handleFolderClick = (folder: any) => {
  searchQuery.value = ''
  paginationParams.value.page = 1
  currentFolderId.value = folder.id
  breadcrumbs.value.push({ id: folder.id, name: folder.name })
}
provide('storage:folderClick', handleFolderClick)

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
  pagination: {
    page: paginationParams.value.page,
    limit: paginationParams.value.limit,
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
  pagination: {
    page: paginationParams.value.page,
    limit: paginationParams.value.limit,
  },
}))

const { mutate: deleteFolder } = useDeleteFolderMutation()
const { mutate: deleteFiles } = useDeleteFilesMutation()

// --- Merged data for Screen ---
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

// --- Page info: sum total items from both sources ---
const pageInfo = computed(() => {
  const fInfo = filesResult.value?.getFiles?.pageInfo
  const dInfo = foldersResult.value?.getFolders?.pageInfo
  // Use the one with more pages to avoid cutting off items
  const fTotal = fInfo?.totalItems || 0
  const dTotal = dInfo?.totalItems || 0
  const selected = fTotal > dTotal ? fInfo : dInfo
  return {
    currentPage: paginationParams.value.page,
    totalPages: selected?.totalPages || 1,
    totalItems: fTotal + dTotal,
  }
})

const isLoading = computed(() => filesLoading.value || foldersLoading.value)

// --- Data refresh ---
const refreshData = () => {
  refetchFiles()
  refetchFolders()
}

// --- Breadcrumb item click: navigate to the clicked crumb level ---
const handleBreadcrumbClick = ({ index }: { item: BreadcrumbItemSchema; index: number }) => {
  // Ignore clicks on the current (last) item — it is already active
  if (index === breadcrumbs.value.length - 1) return

  const target = breadcrumbs.value[index]
  currentFolderId.value = target.id
  searchQuery.value = ''
  paginationParams.value.page = 1
  // Trim breadcrumbs back to the clicked level
  breadcrumbs.value = breadcrumbs.value.slice(0, index + 1)
}

// --- Screen refetch callback ---
const handleRefetch = (payload: any) => {
  const newSearch = payload.search ?? ''
  if (newSearch !== searchQuery.value) {
    searchQuery.value = newSearch
    paginationParams.value.page = 1
    return
  }
  if (payload.pagination) {
    paginationParams.value.page = payload.pagination.page
    paginationParams.value.limit = payload.pagination.limit
  }
}

// --- Delete handler ---
const handleDelete = async (itemsToDelete: any[]) => {
  const fileIds = itemsToDelete.filter((i) => i.type === 'file').map((i) => i.id)
  const folderIds = itemsToDelete.filter((i) => i.type === 'folder').map((i) => i.id)
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
</script>

<template>
  <Screen
    name="storage-manager"
    :data="items"
    :loading="isLoading"
    :page-info="pageInfo"
    :table="StorageTableRaw"
    :refetch="handleRefetch"
    show-refresh
    empty-icon="lucide:hard-drive"
    empty-title="No files or folders"
    empty-description="Upload files or create a folder to get started."
    @delete="handleDelete">
    <!-- Override title slot with hard-drive icon + vlite3 Breadcrumb -->
    <template #title>
      <div class="flex flex-col gap-2">
        <h1 class="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Icon icon="lucide:hard-drive" class="text-primary w-5 h-5" />
          Storage Manager
        </h1>

        <!-- Breadcrumb navigation (hidden while searching) -->
        <Breadcrumb
          v-if="!isSearching"
          :items="breadcrumbItems"
          variant="default"
          separator="chevron"
          size="sm"
          @item-click="handleBreadcrumbClick" />

        <!-- Search mode label -->
        <div v-else class="flex items-center gap-1 text-sm text-primary font-medium">
          <Icon icon="lucide:search" class="w-3.5 h-3.5" />
          <span>Search: "{{ searchQuery }}"</span>
        </div>
      </div>
    </template>

    <!-- New Folder button injected after the Upload (add) button -->
    <template #after-add>
      <Modal
        :body="CreateFolder"
        title="Create New Folder"
        max-width="max-w-md"
        :parentId="currentFolderId">
        <Button variant="outline" icon="lucide:folder-plus"> New Folder </Button>
      </Modal>
      <Modal
        :body="UploadForm"
        max-width="max-w-md"
        title="Upload Files"
        :folderId="currentFolderId"
        :refresh="refreshData"
        :parentId="currentFolderId">
        <Button variant="primary" icon="lucide:upload"> Upload </Button>
      </Modal>
    </template>
  </Screen>
</template>

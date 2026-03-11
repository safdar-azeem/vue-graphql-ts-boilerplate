import { ref, computed } from 'vue'
import { showToast } from 'vlite3'
import {
  useGetFilesQuery,
  useGetFoldersQuery,
  useDeleteFolderMutation,
  useDeleteFilesMutation,
} from '@/graphql'
import { useStorageBreadcrumb } from './useStorageBreadcrumb'

export function useStorage() {
  // --- Breadcrumb & folder navigation ---
  const { breadcrumbs, breadcrumbItems, currentFolderId, enterFolder, navigateTo } =
    useStorageBreadcrumb()

  const handleFolderClick = (folder: any) => {
    enterFolder(folder)
  }

  // --- Queries ---
  const {
    result: filesResult,
    refetch: refetchFiles,
    loading: filesLoading,
  } = useGetFilesQuery(() => ({}))

  const {
    result: foldersResult,
    refetch: refetchFolders,
    loading: foldersLoading,
  } = useGetFoldersQuery(() => ({}))

  const { mutate: deleteFolder } = useDeleteFolderMutation()
  const { mutate: deleteFiles } = useDeleteFilesMutation()

  const isSearching = ref()

  // --- Merged rows: folders first, then files ---
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

  const isLoading = computed(() => filesLoading.value || foldersLoading.value)

  // --- Unified page info derived from both query results ---
  const pageInfo = computed(() => {
    const fInfo = filesResult.value?.getFiles?.pageInfo
    const dInfo = foldersResult.value?.getFolders?.pageInfo
    const fTotal = fInfo?.totalItems || 0
    const fCurrent = fInfo?.currentPage || 1
    const dCurrent = dInfo?.currentPage || 1
    const dTotal = dInfo?.totalItems || 0
    const selected = fTotal > dTotal ? fInfo : dInfo
    const currentPage = fTotal > dTotal ? fCurrent : dCurrent

    return {
      currentPage: currentPage,
      totalPages: selected?.totalPages || 1,
      totalItems: fTotal + dTotal,
    }
  })

  // --- Refresh both queries ---
  const refreshData = (payload = {}) => {
    refetchFiles(payload)
    refetchFolders(payload)
  }

  // --- Screen refetch callback (search + pagination) ---
  const handleRefetch = (payload: any) => {
    refreshData(payload)

    isSearching.value = payload.search
  }

  // --- Bulk / single item delete ---
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

  return {
    // breadcrumb
    breadcrumbs,
    breadcrumbItems,
    currentFolderId,
    navigateTo,
    // folder click — must be provided in the page component setup
    handleFolderClick,
    pageInfo,
    isSearching,
    // data
    items,
    isLoading,
    // handlers
    refreshData,
    handleRefetch,
    handleDelete,
  }
}

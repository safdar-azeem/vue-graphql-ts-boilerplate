import { ref, computed, watch } from 'vue'
import { showToast } from 'vlite3'
import {
  useGetFilesQuery,
  useGetFoldersQuery,
  useDeleteFolderMutation,
  useDeleteFilesMutation,
} from '@/graphql'
import { useStorageBreadcrumb } from './useStorageBreadcrumb'

export function useStorage() {
  const { breadcrumbs, breadcrumbItems, currentFolderId, enterFolder, navigateTo } =
    useStorageBreadcrumb()

  const handleFolderClick = (folder: any) => {
    enterFolder(folder)
  }

  // Ensure initial queries include the current folder state
  // so we fetch root nodes instead of globally fetching everything.
  const {
    result: filesResult,
    refetch: refetchFiles,
    loading: filesLoading,
  } = useGetFilesQuery(() => ({
    filter: { folderId: currentFolderId.value },
  }))

  const {
    result: foldersResult,
    refetch: refetchFolders,
    loading: foldersLoading,
  } = useGetFoldersQuery(() => ({
    filter: { parentId: currentFolderId.value },
  }))

  const { mutate: deleteFolder } = useDeleteFolderMutation()
  const { mutate: deleteFiles } = useDeleteFilesMutation()

  const isSearching = ref('')

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

  const refreshData = (payload: any = {}) => {
    const pagination = {
      page: payload?.pagination?.page || 1,
      limit: payload?.pagination?.limit || 10,
    }
    const search = payload.search || undefined

    refetchFiles({
      pagination,
      search,
      filter: { folderId: currentFolderId.value },
    })
    refetchFolders({
      pagination,
      search,
      filter: { parentId: currentFolderId.value },
    })
  }

  const handleRefetch = (payload: any) => {
    isSearching.value = payload.search
    refreshData(payload)
  }

  watch(currentFolderId, () => {
    refreshData({ search: isSearching.value })
  })

  const handleDelete = async (itemsToDelete: any[]) => {
    const fileIds = itemsToDelete.filter((i) => i.type === 'file').map((i) => i.id)
    const folderIds = itemsToDelete.filter((i) => i.type === 'folder').map((i) => i.id)
    try {
      if (fileIds.length) await deleteFiles({ ids: fileIds })
      for (const fid of folderIds) {
        await deleteFolder({ id: fid })
      }
      showToast('Deleted successfully', 'success')
      refreshData({ search: isSearching.value })
    } catch (e: any) {
      showToast(e.message, 'error')
    }
  }

  return {
    breadcrumbs,
    breadcrumbItems,
    currentFolderId,
    navigateTo,
    handleFolderClick,
    pageInfo,
    isSearching,
    items,
    isLoading,
    refreshData,
    handleRefetch,
    handleDelete,
  }
}

<script setup lang="ts">
import { markRaw, provide } from 'vue'
import { Screen, Modal, Button, Icon, Breadcrumb } from 'vlite3'

import StorageTable from '../components/StorageTable.vue'
import CreateFolder from '../components/CreateFolder.vue'
import UploadForm from '../components/UploadForm.vue'
import { useStorage } from '../composables/useStorage'

// markRaw prevents Vue from making the component definition itself reactive
const StorageTableRaw = markRaw(StorageTable)

const {
  breadcrumbItems,
  currentFolderId,
  navigateTo,
  handleFolderClick,
  items,
  pageInfo,
  isLoading,
  isSearching,
  refreshData,
  handleRefetch,
  handleDelete,
} = useStorage()

// provide() must be called in the component setup scope, not inside the composable
provide('storage:folderClick', handleFolderClick)
</script>

<template>
  <Screen
    name="storage-manager"
    :data="items"
    :loading="isLoading"
    :page-info="pageInfo"
    :table="StorageTableRaw"
    :refetch="handleRefetch"
    :can-add="false"
    show-refresh
    empty-icon="lucide:hard-drive"
    empty-title="No files or folders"
    empty-description="Upload files or create a folder to get started."
    @delete="handleDelete">
    <!-- Page title + breadcrumb navigation -->
    <template #title>
      <div class="flex flex-col gap-2">
        <h1 class="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Icon icon="lucide:hard-drive" class="text-primary w-5 h-5" />
          Storage Manager
        </h1>

        <!-- vlite3 Breadcrumb (hidden while the user is searching) -->
        <Breadcrumb
          v-if="!isSearching"
          :items="breadcrumbItems"
          variant="default"
          separator="chevron"
          size="sm"
          @item-click="navigateTo" />
      </div>
    </template>

    <!-- Action buttons replacing the default Add button -->
    <template #actions>
      <div class="flex gap-3">
        <Modal
          :body="CreateFolder"
          title="Create New Folder"
          max-width="max-w-md"
          :parentId="currentFolderId">
          <Button variant="outline" icon="lucide:folder-plus">New Folder</Button>
        </Modal>

        <Modal
          :body="UploadForm"
          max-width="max-w-md"
          title="Upload Files"
          :folderId="currentFolderId"
          :refresh="refreshData"
          :parentId="currentFolderId">
          <Button variant="primary" icon="lucide:upload">Upload</Button>
        </Modal>
      </div>
    </template>
  </Screen>
</template>

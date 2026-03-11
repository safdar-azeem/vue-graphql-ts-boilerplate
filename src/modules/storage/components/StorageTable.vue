<script setup lang="ts">
import { inject } from 'vue'
import { DataTable, Icon, Button, Modal, ConfirmationModal, type TableHeader } from 'vlite3'
import ShareModal from './ShareModal.vue'
import FilePreview from '@/components/FilePreview.vue'

const props = defineProps<{
  data: any[]
  loading: boolean
  refetch?: Function
  selectedRows?: any[]
  delete?: (items: any[]) => void
}>()

const emit = defineEmits<{
  (e: 'update:selectedRows', rows: any[]): void
  (e: 'delete', items: any[]): void
}>()

// Injected from StoragePage to handle folder navigation
const handleFolderClick = inject<(folder: any) => void>('storage:folderClick', () => {})

const headers: TableHeader[] = [
  { field: 'name', title: 'Name', sortable: true, minWidth: '200px' },
  { field: 'size', title: 'Size', sortable: true, width: '100px', hideOnMobile: true },
  {
    field: 'updatedAt',
    title: 'Last Modified',
    sortable: true,
    width: '150px',
    hideOnMobile: true,
  },
  { field: 'action', title: 'Action', align: 'center', width: '160px' },
]

const getFileIcon = (mimeType: string) => {
  if (mimeType?.startsWith('image')) return 'lucide:image'
  if (mimeType?.includes('pdf')) return 'lucide:file-text'
  return 'lucide:file'
}

const formatSize = (bytes: number) => {
  if (!bytes) return '-'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const handleRowDelete = (row: any) => {
  if (props.delete) {
    props.delete([row])
  } else {
    emit('delete', [row])
  }
}
</script>

<template>
  <DataTable
    :rows="data"
    :headers="headers"
    :loading="loading"
    :selected-rows="selectedRows"
    selectable
    hoverable
    :show-search="false"
    key-field="id"
    :show-items-per-page="false"
    @update:selected-rows="emit('update:selectedRows', $event)">
    <!-- Name cell -->
    <template #name="{ row }">
      <div
        class="flex items-center gap-3 min-w-0"
        :class="{ 'cursor-pointer': row.type === 'folder' }"
        @click="row.type === 'folder' ? handleFolderClick(row) : undefined">
        <div
          class="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center"
          :class="row.type === 'folder' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'">
          <img
            v-if="row.type === 'file' && row.mimeType?.startsWith('image')"
            :src="row.url"
            class="w-full h-full object-cover rounded-lg" />
          <Icon
            v-else
            class="h-4.5 w-4.5"
            :icon="row.type === 'folder' ? 'lucide:folder' : getFileIcon(row.mimeType)" />
        </div>
        <div class="min-w-0 flex flex-col">
          <span class="font-medium text-gray-900 truncate">{{ row.name || row.originalName }}</span>
        </div>
      </div>
    </template>

    <!-- Size cell -->
    <template #size="{ row }">
      <span class="text-gray-500 text-sm whitespace-nowrap">
        {{ row?.type === 'folder' ? '-' : formatSize(row?.size) }}
      </span>
    </template>

    <!-- Date cell -->
    <template #updatedAt="{ row }">
      <span class="text-gray-500 text-sm whitespace-nowrap">
        {{ new Date(row?.updatedAt).toLocaleDateString() }}
      </span>
    </template>

    <!-- Action cell -->
    <template #action="{ row }">
      <div class="flex justify-end gap-1">
        <!-- Preview button: only for files -->
        <Modal
          v-if="row?.type === 'file'"
          :body="FilePreview"
          :max-width="'max-w-4xl'"
          :title="row?.name || row?.originalName || 'Preview'"
          :url="row?.url"
          :name="row?.name || row?.originalName">
          <Button
            variant="ghost"
            size="xs"
            icon="lucide:eye"
            title="Preview" />
        </Modal>

        <!-- Share button -->
        <Modal
          :body="ShareModal"
          max-width="max-w-xl"
          :title="`Share ${row?.name || 'Item'}`"
          :item="row">
          <Button variant="ghost" size="xs" icon="lucide:share-2" title="Share" />
        </Modal>

        <!-- Download button: only for files -->
        <Button
          v-if="row?.type === 'file'"
          variant="ghost"
          size="xs"
          icon="lucide:download"
          component="a"
          :href="row?.url"
          download />

        <!-- Delete button -->
        <ConfirmationModal
          title="Delete Item"
          description="Are you sure you want to delete this item? This action cannot be undone."
          @confirm="handleRowDelete(row)">
          <Button
            variant="ghost"
            size="xs"
            icon="lucide:trash-2"
            class="text-red-500 hover:text-red-600 hover:bg-red-50" />
        </ConfirmationModal>
      </div>
    </template>
  </DataTable>
</template>

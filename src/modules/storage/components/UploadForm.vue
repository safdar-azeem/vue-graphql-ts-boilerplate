<script setup lang="ts">
import { useNotifications, Form } from 'vlite3'

interface Props {
  folderId: string | null
  refresh: () => void
}

const props = defineProps<Props>()

const { showToast } = useNotifications()

const handleUpload = async (_, close) => {
  try {
    console.log('folderId :>> ', props.folderId)
    showToast('Files uploaded successfully', 'success')
    close?.()
    props?.refresh?.()
  } catch (e: any) {
    showToast(e.message, 'error')
  }
}
</script>

<template>
  <div class="space-y-4">
    <Form
      :schema="[
        {
          type: 'fileUploader',
          name: 'files',
          label: 'Upload Files',
          required: true,
          props: {
            multiSelect: true,
          },
        },
      ]"
      :folder-id="folderId"
      @on-submit="handleUpload" />
  </div>
</template>

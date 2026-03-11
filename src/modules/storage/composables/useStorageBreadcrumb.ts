import { ref, computed } from 'vue'
import type { BreadcrumbItemSchema } from 'vlite3'

interface BreadcrumbEntry {
  id: string | null
  name: string
}

export function useStorageBreadcrumb() {
  // --- Internal breadcrumb trail ---
  const breadcrumbs = ref<BreadcrumbEntry[]>([{ id: null, name: 'Home' }])

  // --- Current folder id derived from the last breadcrumb entry ---
  const currentFolderId = computed<string | null>(
    () => breadcrumbs.value[breadcrumbs.value.length - 1].id
  )

  // --- vlite3 BreadcrumbItemSchema[] for the Breadcrumb component ---
  const breadcrumbItems = computed<BreadcrumbItemSchema[]>(() =>
    breadcrumbs.value.map((crumb, idx) => ({
      label: crumb.name,
      icon: idx === 0 ? 'lucide:hard-drive' : 'lucide:folder',
      // Last item is the active (current) page — non-interactive
      active: idx === breadcrumbs.value.length - 1,
    }))
  )

  // --- Push a new folder level onto the trail ---
  const enterFolder = (folder: { id: string; name: string }) => {
    breadcrumbs.value.push({ id: folder.id, name: folder.name })
  }

  // --- Navigate back to an arbitrary breadcrumb index ---
  const navigateTo = ({ index }: { item: BreadcrumbItemSchema; index: number }) => {
    // Clicking the active (last) crumb is a no-op
    if (index === breadcrumbs.value.length - 1) return
    breadcrumbs.value = breadcrumbs.value.slice(0, index + 1)
  }

  return {
    breadcrumbs,
    breadcrumbItems,
    currentFolderId,
    enterFolder,
    navigateTo,
  }
}

import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePersistentState } from '@/composables/usePersistentState'

export const languages = [
  { label: 'English', value: 'en', dir: 'ltr' },
  { label: 'العربية', value: 'ar', dir: 'rtl' },
]

export const useLanguage = () => {
  const { locale } = useI18n()
  const currentLang = usePersistentState('language', 'en')

  const updateDocumentAttributes = (langCode: string) => {
    const selected = languages.find((l) => l.value === langCode)
    if (selected) {
      document.documentElement.setAttribute('dir', selected.dir)
      document.documentElement.setAttribute('lang', selected.value)
      locale.value = selected.value
    }
  }

  const initLanguage = () => {
    updateDocumentAttributes(currentLang.value)

    watch(currentLang, (newLang) => {
      updateDocumentAttributes(newLang)
    })
  }

  return {
    languages,
    currentLang,
    initLanguage,
    updateDocumentAttributes,
  }
}

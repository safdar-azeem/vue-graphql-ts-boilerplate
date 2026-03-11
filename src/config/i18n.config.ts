import { createI18n } from 'vue-i18n'
import { deepMerge } from 'vlite3'

// Vite's import.meta.glob automatically gathers all matching files at build/runtime.
// This completely replaces the need for an external merge-translations.js script.
const enFiles = import.meta.glob('/src/**/translations/en.json', { eager: true, import: 'default' })
const arFiles = import.meta.glob('/src/**/translations/ar.json', { eager: true, import: 'default' })

let enMessages = {}
let arMessages = {}

// Deep merge all English module translations
for (const path in enFiles) {
  enMessages = deepMerge(enMessages, enFiles[path] as object)
}

// Deep merge all Arabic module translations
for (const path in arFiles) {
  arMessages = deepMerge(arMessages, arFiles[path] as object)
}

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: enMessages,
    ar: arMessages,
  },
})

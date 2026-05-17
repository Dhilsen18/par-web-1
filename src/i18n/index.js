/**
 * index.js
 * @summary Vue-i18n configuration with English and Spanish locales.
 * @author Student Developer
 */
import { createI18n } from 'vue-i18n'
import en from './en.js'
import es from './es.js'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, es }
})

export default i18n

/**
 * main.js
 * @summary Application entry point. Registers Vue, PrimeVue, Pinia, Router, i18n.
 * @author Student Developer
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import App from './App.vue'
import router from './router/index.js'
import i18n from './i18n/index.js'

import 'primevue/resources/themes/lara-light-teal/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)

app.mount('#app')

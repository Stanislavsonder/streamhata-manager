import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from '@/router'
import i18n from '@/i18n'
import apolloProvider from '@/graphql'

createApp(App)
	.use(router)
	.use(i18n)
	.use(apolloProvider)
	.mount('#app')

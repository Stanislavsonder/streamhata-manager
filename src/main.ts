import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from '@/router'
import i18n from '@/i18n'
import apolloProvider from '@/graphql'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
	components,
	directives,
})

import vuetify from '@/configs/vuetify'

createApp(App)
	.use(router)
	.use(i18n)
	.use(vuetify)
	.use(apolloProvider)
	.mount('#app')

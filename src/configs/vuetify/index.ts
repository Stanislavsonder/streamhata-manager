import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import {
	aliases, mdi
} from 'vuetify/iconsets/mdi'
import darkTheme from '@/configs/vuetify/darkTheme'

const vuetify = createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: 'darkTheme',
		themes: {
			darkTheme
		},
	},

	icons: {
		defaultSet: 'mdi',
		aliases,
		sets: {
			mdi,
		}
	},
})

export default vuetify

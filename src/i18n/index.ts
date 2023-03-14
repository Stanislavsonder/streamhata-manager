import { createI18n } from 'vue-i18n'
import en from './languages/en.json'
import ru from './languages/ru.json'


export default createI18n({
	locale: 'en',
	messages: {
		en,
		ru
	},
	legacy: false
})

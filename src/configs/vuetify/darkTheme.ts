import { rarityColorsVuetify } from '@constants'

const darkTheme = {
	dark: true,
	colors: {
		background: '#121212',
		surface: '#212121',
		primary: '#6200EE',
		'primary-darken-1': '#3700B3',
		secondary: '#03DAC6',
		'secondary-darken-1': '#018786',
		text: '#F9F6F0',
		'text-secondary': '#b3b3b3',
		error: '#B00020',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FB8C00',
		detail: '#8a3455',
		...rarityColorsVuetify
	}
}


export default darkTheme

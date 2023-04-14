<template>
	<AppHeader />
	<router-view />
	<ImageSearcher />
</template>

<script lang="ts">
import {
	defineComponent
} from 'vue'
// todo: resolve issue with aliases
import AppHeader from './components/layout/header/AppHeader.vue'
import ImageSearcher from '@pages/ImageSearcher/ImageSearcher.vue'

export default defineComponent({
	name: 'App',
	components: {
		ImageSearcher,
		AppHeader,
	},
	data() {
		return {
			gameFilter: undefined
		}
	},
	methods: {
		log(value: any) {
			console.log(value)
		}
	},
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
html {
	height: 100%;
}
* {
	font-family: 'Chakra Petch', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

body {
	height: 100%;
	position: relative;
	font-family: 'Chakra Petch', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}

.card {
	width: 200px;
	height: 200px;
	margin: 100px;
}

nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: var(--text);

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>

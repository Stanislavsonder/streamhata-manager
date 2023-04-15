<template>
	<AppHeader />
	<router-view />
</template>

<script lang="ts">
import {
	defineComponent
} from 'vue'

// todo: resolve issue with aliases
import AppHeader from '@/components/layout/header/AppHeader.vue'

export default defineComponent({
	name: 'App',
	components: {
		AppHeader,
	},
})
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap');
html {
	height: 100%;
}

body > * {
	font-family: var(--default-font);
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

body {
	height: 100%;
	position: relative;
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
	}
}
</style>

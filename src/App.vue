<template>
	<AppHeader />
	<nav>
		<router-link to="/">
			Home
		</router-link> |
		<router-link to="/about">
			About
		</router-link>
	</nav>
	<p>TEST TEXT</p>
	<router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from './components/layout/header/AppHeader.vue'

export default defineComponent({
	name: 'App',
	components: {
		AppHeader
	}
})
</script>

<style lang="scss" src="./styles/index.scss"/>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}

nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>

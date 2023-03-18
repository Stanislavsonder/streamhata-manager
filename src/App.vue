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
	<v-card
		class="card"
	/>
	<router-view />
</template>

<script lang="ts">
import {
	defineComponent
} from 'vue'
import gql from 'graphql-tag'
import AppHeader from './components/layout/header/AppHeader.vue'
import { useTheme } from 'vuetify'

export default defineComponent({
	name: 'App',
	components: {
		AppHeader
	},
	setup() {
		const theme = useTheme()
		return {
			theme
		}
	},
	data() {
		return {
			getGames: undefined
		}
	},
	apollo: {
		getGames: {
			query() {
				return gql`{
					getGames(query: { limit: 1000 }) {
						title
					}
				}`
			},
			loadingKey: 'loading...'
		}
	}
})
</script>

<style lang="scss">
.card {
	width: 200px;
	height: 200px;
	margin: 100px;

}

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
		color: var(--text);

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>

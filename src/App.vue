<template>
	<AppHeader />
	<router-view />
	<main>
		<GamesFilter
			:initial-filters="gameFilter"
			@apply="log"
		/>
	</main>
</template>

<script lang="ts">
import {
	defineComponent
} from 'vue'
import gql from 'graphql-tag'
import GamesFilter from '@components/common/GamesFilter/GamesFilter.vue'

// todo: resolve issue with aliases
import AppHeader from '@components/layout/header/AppHeader.vue'
import { useTheme } from 'vuetify'

export default defineComponent({
	name: 'App',
	components: {
		AppHeader,
		GamesFilter
	},
	setup() {
		const theme = useTheme()
		return {
			theme
		}
	},
	data() {
		return {
			getGames: undefined,
			gameFilter: undefined
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

.card {
	width: 200px;
	height: 200px;
	margin: 100px;
}

#app {
	font-family: 'Chakra Petch', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}

nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: var(--text);

		// &.router-link-exact-active {
		// 	color: #42b983;
		// }
	}
}
</style>

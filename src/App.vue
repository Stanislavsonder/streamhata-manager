<template>
	<nav>
		<router-link to="/">
			Home
		</router-link> |
		<router-link to="/about">
			About
		</router-link>
	</nav>
	<div>
		<p v-if="!getGames">
			Loading...
		</p>
		<ul v-else>
			<li
				v-for="game in getGames"
				:key="game.title"
			>
				{{ game.title }}
			</li>
		</ul>
	</div>

	<router-view />
</template>

<script lang="ts">
import gql from 'graphql-tag'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'App',
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

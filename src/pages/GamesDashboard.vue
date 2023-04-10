<template>
	<div class="games-dashboard">
		<h1 class="games-dashboard__title">
			Games Dashboard
		</h1>
		<div class="games-dashboard__content">
			<div
				v-if="$apollo.loading"
				class="loading"
			>
				Loading...
			</div>
			<div
				v-else
				class="cards"
			>
				<GameCard
					v-for="game in games"
					:game="game"
					:key="game.id"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import gql from 'graphql-tag'

import GameCard from '@components/game-card/GameCard.vue'

const filterjson = JSON.stringify({
	score: {
		$gt: 0
	}
})

export default defineComponent({
	name: 'GamesDashboard',
	components: {
		GameCard
	},
	data() {
		return {
			games: undefined as any
		}
	},
	apollo: {
		games: {
			query: gql`query($filter: Any!) {
					getGames(query: { limit: 100, filter: $filter }) {
						_id
						title
						releaseDate
						imageSource
						tags
						platforms
						rarity
						duration
						score
					}
			}`,
			variables: {
				filter: filterjson
			},
			update: data => data.getGames,
			result(ApolloQueryResult, key) {
				console.log(this.games)
			}
		}
	}
})
</script>

<style scoped lang="scss">
.games-dashboard {
	padding: 28px;

	&__title {
		font-size: 36px;
		font-weight: 700;
		text-align: left;
		margin-bottom: 32px;
	}
	&__content {

		.loading {
			font-size: 32px;
		}
		
		.cards {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
		}
	}
}
</style>
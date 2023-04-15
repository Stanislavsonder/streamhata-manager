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
			<ul
				v-else
				class="cards"
			>
				<li
					v-for="game in games"
					:key="game._id"
				>
					<GameCard
						:game="game"
					/>
				</li>
			</ul>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import GameCard from '@components/game-card/GameCard.vue'
import { GameForCard } from '@types'
import GET_ALL_GAMES from '@/graphql/queries/GET_ALL_GAMES'

const filterjson = JSON.stringify({
	score: {
		$gt: 0
	}
})

interface Data {
	games: GameForCard[]
}

export default defineComponent({
	name: 'GamesDashboard',
	components: {
		GameCard
	},
	data(): Data {
		return {
			games: []
		}
	},
	apollo: {
		games: {
			query: GET_ALL_GAMES,
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
<template>
	<div class="games-dashboard">
		<h1 class="games-dashboard__title">
			Games Dashboard
		</h1>
		<div class="games-dashboard__search">
			<v-container class="search-container">
				<v-row>
					<v-col
						cols="12"
						md="3"
					>
						<v-select
							v-model="searchBy"
							:items="searchOptions"
							item-title="caption"
							item-value="value"
							label="Search By"
							variant="solo"
							density="compact"
							return-object
							hide-details
							class="search__type"
						/>
					</v-col>
					<v-col
						cols="12"
						md="7"
					>
						<v-text-field
							v-model="search"
							label="Search"
							density="compact"
							single-line
							hide-details
							class="search__input"
						/>
					</v-col>
					<v-col
						cols="12"
						md="2"
						align-self="center"
					>
						<v-btn>
							Search
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</div>

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

import GameCard from '@components/common/GameCard/GameCard.vue'
import {
	GameForCard, SearchType 
} from '@types'
import GET_ALL_GAMES from '@/graphql/queries/GET_ALL_GAMES'
import { GAMES_SEARCH_OPTIONS } from '@constants'

const filterjson = JSON.stringify({
	score: {
		$gt: 0
	}
})

interface Data {
	games: GameForCard[],
	search: string,
	searchBy: SearchType
}

export default defineComponent({
	name: 'GamesDashboard',
	components: {
		GameCard
	},
	data(): Data {
		return {
			games: [],
			search: '',
			searchBy: {
				caption: 'Title',
				value: 'title'
			}
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
	},
	computed: {
		searchOptions(): SearchType[] {
			return GAMES_SEARCH_OPTIONS
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
		margin-bottom: 20px;
	}

	&__search {
		display: flex;
		justify-content: center;
		margin-bottom: 32px;

		.search-container {
			width: 50%;
			max-width: 1000px;
		}

		& > *:not(:last-child) {
			margin-right: 12px;
		}
		&__icon {
			margin-left: 4px;
		}
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
			gap: 56px
		}
	}
}
</style>
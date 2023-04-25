<template>
	<div class="game-overview">
		<div class="game-overview__wrapper">
			<p class="game-id">
				{{ gameId }}
			</p>
			<div class="game">
				<div class="game__column left-col">
					<img
						:src="game.imageSource"
						:alt="`Poster for ${game.title}`"
					>
					<p>
						{{ $t('image-searcher__aspect-ratio-index') }}:
						<strong :style="{color: getColor(1.25, 0.5, imageAspectRatio)}">
							{{ imageAspectRatio.toFixed(2) }}
						</strong>
					</p>
					<p>
						{{ $t('image-searcher__quality-index') }}:
						<strong :style="{color: getColor(750, 300, imageQuality)}">
							{{ imageQuality.toFixed() }}
						</strong>
					</p>
					<div class="links">
						<a
							:href="game.metacriticUrl"
							target="_blank"
							rel="noopener noreferrer"
						>
							<v-btn>
								Metacritic
							</v-btn>
						</a>
					</div>
				</div>
				<div class="game__column right-col">
					<div class="game-info-section title-info">
						<p class="title-info__title">
							{{ game.title }}
						</p>
						<p class="title-info__secondary">
							{{ releaseYear }}
						</p>
						<p class="title-info__secondary">
							{{ developers }}
						</p>
					</div>
					<div class="game-info-section parameters-info">
						<p>
							<v-icon
								size="20"
								icon="mdi-star"
								class="icon"
							/>
							{{ score }}
						</p>
						<p>
							<v-icon
								size="20"
								icon="mdi-clock-time-four"
								class="icon"
							/>
							{{ gameDuration }}
						</p>
						<p>
							<v-icon
								size="20"
								icon="mdi-biohazard"
								class="icon"
							/>
							{{ rarity }}
						</p>
					</div>

					<div class="game-info-section platforms">
						<ul class="platforms__items">
							<li
								v-for="platformGroup in Object.keys(mergedPlatforms)"
								:key="platformGroup"
							>
								<div class="platforms__group">
									<v-icon
										class="platform-icon"
										size="28"
										:icon="platformIcons[platformGroup as Platforms]"
									/>
									<v-tooltip
										activator="parent"
										location="top"
									>
										{{ generatePlatformTooltipText(mergedPlatforms[platformGroup as Platforms] || []) }}
									</v-tooltip>
								</div>
							</li>
						</ul>
					</div>

					<div class="game-info-section tags">
						<div
							v-for="tag in game.tags"
							:key="tag"
							class="tags__item"
							:style="{ backgroundColor: getTagColor(tag)}"
						>
							{{ tag }}
						</div>
						<div v-if="!(game.tags || []).length">
							no tags
						</div>
					</div>
					<div class="game-info-section description">
						<p>{{ game.description }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import GET_GAME from '@/graphql/queries/GET_GAME'
import {
	Game, MergedPlatforms, Platforms 
} from '@/types'
import {
	PLATFORM_ICONS, RARITY_FOR_VIEW_ARRAY 
} from '@/utils/constants'
import {
	getColor, getTagColor, mergePlatforms 
} from '@/utils/utils'
import { defineComponent } from 'vue'

interface Data {
	gameId: string
	game: Game
}

export default defineComponent({
	name: 'GameOverview',
	data(): Data {
		return {
			gameId: this.$route.params.gameId as string,
			game: {} as Game
		}
	},
	computed: {
		imageQuality(): number {
			return this.game.imageQuality || 0
		},
		imageAspectRatio(): number {
			return this.game.imageAspectRatio || 0
		},
		releaseYear(): number {
			return new Date(this.game.releaseDate).getFullYear()
		},
		developers(): string {
			return (this.game.developers || []).join(', ')
		},
		score(): string | number {
			return this.game.score || 'ー'
		},
		gameDuration(): string {
			return this.game.duration ? this.game.duration + this.$t('hours') : 'ー'
		},
		rarity(): string {
			return RARITY_FOR_VIEW_ARRAY[this.game.rarity]
		},
		mergedPlatforms(): MergedPlatforms {
			return mergePlatforms(this.game.platforms || [])
		},
		platformIcons() {
			return PLATFORM_ICONS
		}
	},
	methods: {
		getColor(idealValue: number, delta: number, currentValue: number): string {
			return getColor(idealValue, delta, currentValue)
		},
		generatePlatformTooltipText(platforms: string[]): string {
			return platforms.join(', ')
		},
		getTagColor(tag: string): string {
			return getTagColor(tag)
		},
	},
	apollo: {
		game: {
			query: GET_GAME,
			// очень странная хуйня, что нужно обозначить возвращаемый тип, иначе выскочит ошибка
			variables(): { id: string } {
				return { id: this.gameId }
			},
			update: data => data.getGame,
			result(ApolloQueryResult, key) {
				console.log(this.game)
			}
		}
	}
})
</script>

<style scoped lang="scss">
.game-overview {
	display: flex;
	justify-content: center;

	&__wrapper {
		background-color: var(--surface);
		width: 75%;
		height: calc(100vh - var(--header-height));
		max-width: 1200px;
		padding: 20px;
		display: flex;
		flex-direction: column;
	
		.game-id {
			color: var(--text-secondary);
			font-size: 14px;
			text-align: initial;
			margin-bottom: 8px;
		}
	
		.game {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
		
			&__column {
				display: flex;
				flex-direction: column;
			
				&.left-col {
					width: 40%;
				}
			
				&.right-col {
					width: 60%;
					padding: 0 12px;
				}

				.links {
					display: flex;
					flex-direction: row;
				}
			}

			.game-info-section {
				border-bottom: 1px solid var(--background);
				display: flex;
				padding: 16px;
			}

			.title-info {
				flex-direction: column;
				align-items: flex-start;

				&__title {
					font-size: 36px;
					font-weight: 700;
					text-align: initial;
				}

				&__secondary {
					font-size: 20px;
					text-align: initial;
					color: var(--text-secondary);
				}
			}

			.parameters-info {
				justify-content: space-around;

				p {
					font-size: 24px;
				}
			}

			.platforms {
				justify-content: center;

				&__items {
					display: flex;
					flex-direction: row;
				}

				&__group {
					.platform-icon {
						margin-right: 12px;
					}
				}
			}

			.description {
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				text-align: initial;font-size: 20px;
			}

			.tags {
				display: flex;
				flex-direction: row;
				font-size: 16px;

				&__item {
					padding: 4px 8px;
					margin-right: 8px;
					border-radius: 8px;
					font-weight: 700;
					line-height: 16px;
				}
			}

		}
	}
}
</style>

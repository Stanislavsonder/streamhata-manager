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
						class="game-image"
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
					<!-- Title Info -->
					<div
						v-if="!isEditMode"
						class="game-info-section title-info"
					>
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

					<!-- Edit Title Info  -->
					<div
						v-else
						class="game-info-section title-info edit-mode"
					>
						<v-text-field
							v-model="editedGame.title"
							:label="$t('image-searcher__title')"
							density="compact"
							hide-details
							required
						/>
						<v-text-field
							v-model="editedGame.releaseDate"
							:label="$t('game-overview__release-date')"
							density="compact"
							hide-details
							required
							type="date"
						/>
						<v-combobox
							v-model="editedGame.developers"
							:items="editedGame.developers"
							:label="$t('game-overview__developers')"
							chips
							density="compact"
							hide-details
							multiple
						/>
					</div>

					<!-- Parameters Info -->
					<div
						v-if="!isEditMode"
						class="game-info-section parameters-info"
					>
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

					<!-- Edit Parameters Info -->
					<div
						v-else
						class="game-info-section parameters-info edit-mode"
					>
						<v-text-field
							v-model.number="editedGame.score"
							:label="$t('game-overview__score')"
							density="compact"
							hide-details
							required
							type="number"
						/>
						<v-text-field
							v-model.number="editedGame.duration"
							:label="$t('game-overview__duration')"
							density="compact"
							hide-details
							required
							type="number"
						/>
						<v-select
							v-model="editedGame.rarity"
							:items="rarityOptions"
							density="compact"
							hide-details
							item-title="title"
							item-value="value"
							:label="$t('game-overview__rarity')"
						/>
					</div>

					<!-- Platforms Info -->
					<div
						v-if="!isEditMode"
						class="game-info-section platforms"
					>
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
										{{
											generatePlatformTooltipText(mergedPlatforms[platformGroup as Platforms] || [])
										}}
									</v-tooltip>
								</div>
							</li>
						</ul>
					</div>

					<!-- Edit Platforms Info -->
					<div
						v-else
						class="game-info-section platforms"
					>
						<v-select
							v-model="editedGame.platforms"
							:items="platformOptions"
							chips
							hide-details
							:label="$t('game-overview__platforms')"
							multiple
						/>
					</div>

					<!-- Tags -->
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

					<!-- Description -->
					<div
						v-if="!isEditMode"
						class="game-info-section description"
					>
						<p>{{ game.description }}</p>
					</div>

					<!-- Edit Description -->
					<div
						v-else
						class="game-info-section description"
					>
						<v-textarea
							:label="$t('game-overview__description')"
							v-model="editedGame.description"
							auto-grow
						/>
					</div>

					<div class="instruments">
						<!-- EDIT BUTTON -->
						<v-btn
							class="ma-2"
							@click="activateEditMode"
							v-if="!isEditMode"
						>
							{{ $t('edit') }}
							<v-icon
								end
								icon="mdi-pencil"
							/>
						</v-btn>

						<!-- CANCEL BUTTON -->
						<v-btn
							class="ma-2"
							@click="cancelEdit"
							v-if="isEditMode"
						>
							{{ $t('cancel') }}
							<v-icon
								end
								icon="mdi-cancel"
							/>
						</v-btn>

						<!-- SAVE BUTTON -->
						<v-btn
							class="ma-2"
							color="primary"
							@click="updateGame"
							v-if="isEditMode"
						>
							{{ $t('apply') }}
							<v-icon
								end
								icon="mdi-check-bold"
							/>
						</v-btn>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import GET_GAME from '@/graphql/queries/GET_GAME'
import UPDATE_GAME from '@/graphql/mutations/UPDATE_GAME'
import {
	Game,
	MergedPlatforms,
	Platforms
} from '@/types'
import {
	PLATFORM_ICONS, RARITIES_FOR_SELECT, RARITY_FOR_VIEW_ARRAY
} from '@/utils/constants'
import {
	deepCopy,
	getColor,
	getTagColor,
	mergePlatforms
} from '@/utils/utils'
import { defineComponent } from 'vue'
import { ALL_PLATFORMS } from '@/utils/constants'

interface Data {
	gameId: string
	game: Game
	editedGame: Game
	isEditMode: boolean
}

export default defineComponent({
	name: 'GameOverview',
	data(): Data {
		return {
			gameId: this.$route.params.gameId as string,
			game: {} as Game,
			editedGame: {} as Game,
			isEditMode: false
		}
	},
	computed: {
		Platforms() {
			return Platforms
		},
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
		},
		rarityOptions() {
			return RARITIES_FOR_SELECT
		},
		platformOptions() {
			return ALL_PLATFORMS
		}
	},
	methods: {
		activateEditMode() {
			this.isEditMode = true
			this.editedGame = deepCopy(this.game)
			this.editedGame.releaseDate = new Date(this.editedGame.releaseDate).toDateString()
		},
		cancelEdit() {
			this.editedGame = {} as Game
			this.isEditMode = false
		},
		async updateGame() {
			const gameInput = this.transformGameForInput()
			const updatedGame = await this.$apollo.mutate({
				mutation: UPDATE_GAME,
				variables: {
					game: gameInput
				},
				fetchPolicy: 'no-cache',
			})
			this.game = updatedGame.data.updateGame
			this.isEditMode = false
			this.editedGame = {} as Game
		},
		transformGameForInput(): Game {
			const tmpGame = deepCopy(this.editedGame)
			tmpGame.releaseDate = new Date(tmpGame.releaseDate).toDateString()
			delete tmpGame.__typename
			tmpGame.releaseDate = tmpGame.releaseDate.toString()
			return tmpGame
		},
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
			variables(): { id: string } {
				return { id: this.gameId }
			},
			update: data => data.getGame,
			fetchPolicy: 'no-cache'
		}
	}
})
</script>

<style scoped lang="scss">
.game-overview {
	display: flex;
	justify-content: center;

	&__wrapper {
		display: flex;
		flex-direction: column;
		width: 75%;
		height: calc(100vh - var(--header-height));
		max-width: 1200px;
		padding: 32px 24px;
		background-color: var(--surface);

		.game-id {
			margin-bottom: 8px;
			font-size: 14px;
			text-align: initial;
			color: var(--text-secondary);
		}

		.game {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;

			&__column {
				display: flex;
				flex-direction: column;

				.game-image {
					margin-bottom: 12px;
				}

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
					margin-top: 12px;
				}
			}

			.game-info-section {
				display: flex;
				width: 100%;
				padding: 16px;
				border-bottom: 1px solid var(--background);

				.v-input {
					width: 100%;
				}
			}

			.title-info {
				flex-direction: column;
				align-items: flex-start;

				&.edit-mode {
					gap: 12px;
				}

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
				pointer-events: none;

				&.edit-mode {
					gap: 12px;
					flex-direction: column;
					pointer-events: all;
				}

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
				text-align: initial;
				font-size: 20px;
			}

			.tags {
				display: flex;
				flex-direction: row;
				font-size: 16px;
				pointer-events: none;

				&__item {
					padding: 4px 8px;
					margin-right: 8px;
					border-radius: 8px;
					font-weight: 700;
					line-height: 16px;
				}
			}

			.instruments {
				margin-top: 12px;
			}

		}
	}
}
</style>

<template>
	<RouterLink
		:to="`/games/${game._id}`"
		class="link-no-style"
	>
		<article
			class="game-card"
		>
			<ul class="game-card__platforms">
				<li
					v-for="platformGroup in Object.keys(mergedPlatforms)"
					:key="platformGroup"
				>
					<div>
						<v-icon
							class="platform-icon"
							size="24"
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

			<div class="game-card__rarity" />

			<div class="game-card__content">
				<time
					class="release-date"
					:datetime="releaseYear.toString()"
				>{{ releaseYear }}</time>
				<div class="title-wrapper">
					<h3 class="title">
						{{ game.title }}
					</h3>
					<div class="details">
						<div class="details__item">
							{{ gameDuration }}
							<v-icon
								size="16"
								icon="mdi-clock-time-four"
								class="icon"
							/>
						</div>
						<div class="details__item">
							{{ score }}
							<v-icon
								size="16"
								icon="mdi-star"
								class="icon"
							/>
						</div>
					</div>
				</div>
				<div class="tags">
					<div
						v-for="tag in game.tags.slice(0, 2)"
						:key="tag"
						class="tags__item"
						:style="{ backgroundColor: getTagColor(tag)}"
					>
						{{ tag }}
					</div>
					<div
						v-if="moreTags > 0"
						class="more"
					>
						+{{ moreTags }} more
					</div>
					<div v-if="!game.tags.length">
						no tags
					</div>
				</div>
			</div>
		</article>
	</RouterLink>
</template>

<script lang="ts">
import {
	PropType, defineComponent 
} from 'vue'
import {
	GameForCard, MergedPlatforms, Platforms
} from '@types'
import {
	PLATFORM_ICONS, RARITIES 
} from '@constants'
import {
	getTagColor, mergePlatforms 
} from '@utils/utils'

export default defineComponent({
	name: 'GameCard',
	props: {
		game: {
			type: Object as PropType<GameForCard>,
			required: true
		}
	},
	data() {
		return {
			backgroundImage: ''
		}
	},
	computed: {
		// todo: write util function to get rarity color
		rarityColor(): string {
			return `var(--rarity-${RARITIES[this.game.rarity]})`
		},

		releaseYear(): number {
			return new Date(this.game.releaseDate).getFullYear()
		},

		moreTags(): number {
			return this.game.tags.length - 2
		},

		gameDuration(): string {
			return this.game.duration ? this.game.duration + this.$t('hours') : 'ー'
		},

		score(): string | number {
			return this.game.score || 'ー'
		},

		mergedPlatforms(): MergedPlatforms {
			return mergePlatforms(this.game.platforms)
		},

		platformIcons() {
			return PLATFORM_ICONS
		},

		Platforms() {
			return Platforms
		}
	},
	created() {
		this.checkImageExistance()
	},
	methods: {
		generatePlatformTooltipText(platforms: string[]): string {
			return platforms.join(', ')
		},
		getTagColor(tag: string): string {
			return getTagColor(tag)
		},
		checkImageExistance() {
			if (!this.game.imageSource) {
				this.backgroundImage = 'url("../../../noimage.jpg")'
				return
			}

			const img = new Image()

			img.onload = () => {
				this.backgroundImage = `url(${this.game.imageSource})` 
			}

			img.onerror = () => {
				this.backgroundImage = 'url("../../../noimage.jpg")'
			}

			img.src = this.game.imageSource
		}
	},
})
</script>

<style scoped lang="scss">
.game-card {
	position: relative;
	user-select: none;
	display: flex;
	align-items: flex-end;
	width: 320px;
	height: 400px;
	padding: 8px;
	margin: 4px;
	cursor: pointer;
	border-radius: 8px;
	background-image: v-bind(backgroundImage);
	background: linear-gradient(to top, #000000 20%, rgba(0, 0, 0, 0.2) 50%), v-bind(backgroundImage);
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	box-shadow: 0px 0px 4px v-bind(rarityColor);
	transition: box-shadow 0.3s ease-out, transform 0.3s ease-out;

	&:hover {
		box-shadow: 0px 0px 40px v-bind(rarityColor);
		transform: scale(1.03);
	}

	&__platforms {
		display: flex;
		position: absolute;
		top: 8px;
		left: 8px;
		padding: 4px;
		background: rgba(17, 17, 17, 0.75);
		backdrop-filter: blur(2px);
		border-radius: 8px;
	}

	&__rarity {
		position: absolute;
		bottom: 8px;
		right: 8px;
		width: 16px;
		height: 16px;
		background-color: v-bind(rarityColor);
		border-radius: 50%;
	}

	&__content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		.release-date {
			font-size: 14px;
			color: #9D9D9D;
		}

		.title-wrapper {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.title {
				text-align: start;
				font-size: 24px;
				font-weight: 700;
				line-height: 28px;
				max-width: 75%;
				user-select: text;
				cursor: text;
			}

			.details {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				line-height: 24px;

				&__item {
					display: flex;
					align-items: center;

					.icon {
						margin-left: 4px;
					}
				}
			}
		}

		.tags {
			display: flex;
			flex-direction: row;
			margin-top: 8px;
			font-size: 12px;

			&__item {
				padding: 4px 8px;
				margin-right: 8px;
				border-radius: 8px;
				font-weight: 700;
				line-height: 16px;
			}

			.more {
				display: flex;
				align-items: center;
				font-weight: 300;
				pointer-events: none;
			}
		}
	}
}

.platform-icon {
	margin: 0 4px;
}
</style>

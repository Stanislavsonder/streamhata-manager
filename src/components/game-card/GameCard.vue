<template>
	<div
		class="game-card"
	>
		<div class="game-card__platforms">
			<v-icon
				v-for="platform in game.platforms.slice(0, 3)"
				:key="platform"
				size="24"
				:icon="platform"
				class="platform-icon"
			/>
		</div>
		<div class="game-card__rarity" />

		<div class="game-card__content">
			<span class="release-date">{{ formattedDate }}</span>
			<div class="title-wrapper">
				<span class="title">{{ game.title }}</span>
				<div class="details">
					<div class="details__item">
						{{ game.duration }} {{ $t('hours') }}
						<v-icon
							size="16"
							icon="mdi-clock-time-four"
							class="icon"
						/>
					</div>
					<div class="details__item">
						{{ game.score }}
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
				>
					{{ tag }}
				</div>
				<div
					v-if="isShowMoreVisible"
					class="more"
				>
					+{{ moreTags }} more
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import {
	Rarity, Tag 
} from '@/types'
import { defineComponent } from 'vue'
import { RARITY_ARRAY } from '../../utils/constants'

export default defineComponent({
	name: 'GameCard',
	components: {
	},
	data() {
		return {
			game: {
				title: 'Death Stranding Director\'s Cut',
				releaseDate: new Date(2012, 7, 23),
				imageSource: 'https://m.media-amazon.com/images/M/MV5BZWFjMmY2NTEtNjAzNi00OTZkLWJiOTMtNWZkZDk4NzZhZjJlXkEyXkFqcGdeQXVyMTI0MzA4NTgw._V1_.jpg',
				tags: [Tag['For Adults'],
					Tag.Arcade,
					Tag.Action],
				platforms: ['mdi-desktop-classic',
					'mdi-sony-playstation',
					'mdi-microsoft-xbox'],
				rarity: Rarity.GOTY,
				duration: 12,
				score: 69
			}
		}
	},

	computed: {
		RARITY_ARRAY(): Array<string> {
			return RARITY_ARRAY
		},

		backgroundImage(): string {
			return `url(${this.game.imageSource})`
		},

		// todo: write util function to get rarity color
		rarityColor(): string {
			return '#7440C9'
		},

		formattedDate(): number {
			return this.game.releaseDate.getFullYear()
		},

		isShowMoreVisible(): boolean {
			return this.game.tags.length > 2
		},

		moreTags(): number {
			return this.game.tags.length - 2
		}
	}
})
</script>

<style scoped lang="scss">
.game-card {
	position: relative;
	display: flex;
	align-items: flex-end;
	width: 320px;
	height: 400px;
	padding: 8px;
	border-radius: 8px;
	background-image: v-bind(backgroundImage);
	background: linear-gradient(to top, #000000 20%, rgba(0, 0, 0, 0.2) 50%), v-bind(backgroundImage);
	background-size: cover;
	// todo: add rarity vars to css
	box-shadow: 0px 0px 4px #7440C9;


	&__platforms {
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
				text-transform: uppercase;
				text-align: start;
				font-size: 24px;
				font-weight: 700;
				line-height: 28px;
				max-width: 232px;
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
				background-color: #2D5B37;
				font-weight: 700;
				line-height: 16px;
			}

			.more {
				display: flex;
				align-items: center;
				font-weight: 300;
			}
		}
	}
}

.platform-icon {
	margin: 0 4px;
}
</style>

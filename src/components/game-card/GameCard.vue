<template>
	<article
		class="game-card"
	>
		<ul class="game-card__platforms">
			<li
				v-for="platform in game.platforms.slice(0, 3)"
				:key="platform"
			>
				<v-icon
					size="24"
					:icon="platform"
					class="platform-icon"
				/>
			</li>
		</ul>
		<div class="game-card__rarity" />

		<div class="game-card__content">
			<time
				class="release-date"
				:datetime="formattedDate.toString()"
			>{{ formattedDate }}</time>
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
				>
					{{ tag }}
				</div>
				<div
					v-if="moreTags"
					class="more"
				>
					+{{ moreTags }} more
				</div>
			</div>
		</div>
	</article>
</template>

<script lang="ts">
import {
	Game,
	Rarity, 
	Tag 
} from '@/types'
import {
	PropType, defineComponent 
} from 'vue'
import { RARITY_ARRAY } from '../../utils/constants'

export default defineComponent({
	name: 'GameCard',
	props: {
		game: {
			type: Object as PropType<Game>,
			required: true
		}
	},

	computed: {
		backgroundImage(): string {
			return this.game.imageSource 
				? `url(${this.game.imageSource})` 
				: 'url("../../../noimage.jpg")'
		},

		// todo: write util function to get rarity color
		rarityColor(): string {
			return '#7440C9'
		},

		formattedDate(): number {
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
		}
	},
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
	margin: 16px;
	border-radius: 8px;
	background-image: v-bind(backgroundImage);
	background: linear-gradient(to top, #000000 20%, rgba(0, 0, 0, 0.2) 50%), v-bind(backgroundImage);
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
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
				text-align: start;
				font-size: 24px;
				font-weight: 700;
				line-height: 28px;
				max-width: 75%;
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

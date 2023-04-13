<template>
	<main class="image-searcher">
		<h1 class="image-searcher__title">
			Select new image for a game
		</h1>
		<div class="image-searcher__sections">
			<section class="current-game">
				<h2 class="image-searcher__subtitle">
					{{ currentGame?.title || '' }}
				</h2>
				<p>
					{{
						currentImage?.width ?
							`${currentImage.width}x${currentImage.height}` :
							currentImageSize
					}}
				</p>
				<div class="current-game__image-container">
					<img
						v-if="currentImage"
						class="current-game__image"
						:src="currentImage.link"
					>
				</div>

				<nav class="current-game__buttons">
					<v-btn
						@click="apply"
						color="success"
					>
						Apply
					</v-btn>
					<v-btn @click="clear">
						Clear
					</v-btn>
					<v-btn @click="skip">
						Skip ➤
					</v-btn>
				</nav>
			</section>
		</div>
		<div class="image-searcher__other">
			<h2 class="image-searcher__subtitle">
				Suggested images:
			</h2>
			<ul class="other">
				<li
					v-for="image in images"
					:key="image"
				>
					<article
						class="image-wrapper"
						@click="setImage(image)"
					>
						<p>{{ `${image.width}x${image.height}` }}</p>
						<img
							class="image"
							:src="image.link"
						>
					</article>
				</li>
			</ul>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Game } from '@types'
import GET_GAME_WITH_LOW_QUALITY_IMAGE from '@/graphql/queries/GET_GAME_WITH_LOW_QUALITY_IMAGE'
import ImageSearcherService, { ImageInfo } from '@/services/ImageSearcherService'
import CHANGE_GAME_COVER from '@/graphql/mutations/CHANGE_GAME_COVER'

interface Data {
	skipped: number
	isLoaded: boolean
	currentGame?: Game
	currentImage?: ImageInfo
	images: ImageInfo[]
	recommended: ImageInfo[]
	currentImageSize: string
}

export default defineComponent({
	name: 'ImageSearcher',
	apollo: {
		currentGame: {
			query: GET_GAME_WITH_LOW_QUALITY_IMAGE,
			update: data => data.getGameWithLowQualityImage,
			loadingKey: 'loading',
			variables() {
				return {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					skip: this.skipped
				}
			}
		}
	},
	data(): Data {
		return {
			skipped: 0,
			isLoaded: false,
			currentGame: undefined,
			images: [],
			recommended: [],
			currentImageSize: '',
			currentImage: undefined
		}
	},
	watch: {
		async isLoaded(value: boolean) {
			if (value) {
				this.images = await ImageSearcherService.search(this.currentGame?.title + ' game cover')
			}
		},
		async currentGame(value: Game) {
			if (!value) {
				return
			}
			const img = new Image()
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			const that = this
			img.onload = function (this: any) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				if (!this?.width || !this?.height) {
					that.currentImage = {
						link: value.imageSource,
						qualityIndex: 0,
						aspectRatioIndex: 0,
						width: 0,
						height: 0,
					}
					return
				}
				that.currentImageSize = this?.width + 'x' + this?.height
				that.currentImage = {
					link: value.imageSource,
					qualityIndex: (this?.width + this?.height) / 2,
					aspectRatioIndex: this?.height / this?.width,
					width: this?.width,
					height: this?.height,
				}
			}
			img.src = value.imageSource
		},
	},
	created() {
		gapi.load('client')
		const interval = setInterval(() => {
			if (gapi?.client && !this.$apollo.loading) {
				this.isLoaded = true
				clearInterval(interval)
			}
		}, 100)
	},
	methods: {
		skip() {
			this.skipped++
			this.$apollo.queries.currentGame.start()
		},
		apply() {
			if (!this.currentGame || !this.currentImage) {
				return
			}
			this.$apollo.mutate({
				mutation: CHANGE_GAME_COVER,
				variables: {
					id: this.currentGame._id,
					url: this.currentImage.link,
					aspectRatio: this.currentImage.aspectRatioIndex,
					quality: this.currentImage.qualityIndex
				}
			})
			console.log(this.currentGame.title + ' have updated!')
			this.$apollo.queries.currentGame.start()
		},
		clear() {
			this.currentImage = {
				link: this.currentGame?.imageSource || '',
				qualityIndex: 0,
				aspectRatioIndex: 0,
				width: this.currentImageSize.split('x')[0] as unknown as number,
				height: this.currentImageSize.split('x')[1] as unknown as number,
			}

		},
		setImage(image: ImageInfo) {
			this.currentImage = image
		}
	}
})
</script>


<style scoped lang="scss">
.image-searcher {
	padding: 24px;

	&__title {
		font-size: 32px;
		margin-bottom: 24px;
	}

	&__subtitle {
		font-size: 24px;
		padding: 12px;
	}

	&__sections {
		display: grid;
		gap: 24px;
	}

	&__other {
		background: rgba(255 255 255 / 5%);
		border-radius: 8px;
	}
}

.image-wrapper {
	padding: 12px;
	border-radius: 8px;
	height: 100%;
	box-shadow: 0 0 3px 2px rgba(0 0 0 / 10%);
	background:  rgba(255 255 255 / 10%);
	cursor: pointer;

	&:hover {
		background:  rgba(255 255 255 / 15%);
		box-shadow: 0 0 5px 3px rgba(0 0 0 / 10%);
	}
}


.current-game {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	&__image {
		max-width: 100%;
		max-height: 100%;
	}

	&__image-container {
		width: 400px;
		height: 150px;
	}

	&__buttons {
		display: flex;
		justify-content: center;
		gap: 8px;
		padding: 24px 0;
	}
}

img {
	max-width: 75%;
	max-height: 75%;
	outline: 1px solid rgba(255, 0, 0, 0.47);
	outline-offset: 4px;
	margin: 8px;
	pointer-events: none;
}


.recommended,
.other {
	display: grid;
	gap: 16px;
	padding: 24px;
}
.recommended {
	grid-template-columns: 1fr 1fr 1fr;
}

.other {
	grid-template-columns: repeat(5, 1fr);
}
</style>

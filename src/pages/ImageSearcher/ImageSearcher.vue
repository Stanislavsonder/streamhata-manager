<template>
	<main class="image-searcher">
		<h1 class="image-searcher__title">
			{{ $t('image-searcher__title') }}
		</h1>
		<div class="image-searcher__sections">
			<section class="current-game">
				<h2 class="image-searcher__subtitle">
					{{ `${currentGame?.title} (${new Date(currentGame?.releaseDate)?.getFullYear()})` }}
				</h2>
				<SearchedImage
					:image="currentImageLink"
					v-model:info="currentImageInfo"
					not-clickable
				/>
				<p>
					{{ $t('image-searcher__aspect-ratio-index') }}:
					<strong :style="{color: getColor(1.25, 0.5, currentImageInfo.aspectRatioIndex)}">
						{{ currentImageInfo.aspectRatioIndex.toFixed(2) }}
					</strong>
				</p>
				<p>
					{{ $t('image-searcher__quality-index') }}:
					<strong :style="{color: getColor(750, 300, currentImageInfo.qualityIndex)}">
						{{ currentImageInfo.qualityIndex.toFixed() }}
					</strong>
				</p>
				<nav class="current-game__buttons">
					<v-btn
						@click="apply"
						color="success"
					>
						{{ $t('apply') }}
					</v-btn>
					<v-btn @click="clear">
						{{ $t('clear') }}
					</v-btn>
					<v-btn
						:href="`https://www.google.com/search?q=${currentGame?.title + ' game cover steam'}&tbm=isch`"
						target="_blank"
					>
						Google It
					</v-btn>
					<v-btn @click="skip">
						{{ $t('skip') }} ➤
					</v-btn>
				</nav>
				<section class="add-manually">
					<h2 class="image-searcher__subtitle">
						{{ $t('image-searcher__add-manually') }}
					</h2>
					<label>
						<v-text-field
							class="add-manually__field"
							v-model="tmpImageLink"
						/>
						<v-btn
							:disabled="!tmpImageLink"
							variant="flat"
							@click="addManualImage"
						>
							{{ $t('add') }}
						</v-btn>
					</label>
				</section>
			</section>
			<section class="images">
				<h2 class="image-searcher__subtitle">
					{{ $t('image-searcher__possible-images') }} ({{ images.length }}):
				</h2>
				<ul class="images__list">
					<li
						v-for="url in images"
						:key="url"
					>
						<SearchedImage
							:image="url"
							@click="setImage(url)"
						/>
					</li>
				</ul>
			</section>
		</div>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Game } from '@types'
import GET_GAME_WITH_LOW_QUALITY_IMAGE from '@/graphql/queries/GET_GAME_WITH_LOW_QUALITY_IMAGE'
import ImageSearcherService, { ImageInfo } from '@/services/ImageSearcherService'
import CHANGE_GAME_COVER from '@/graphql/mutations/CHANGE_GAME_COVER'
import SearchedImage from '@pages/ImageSearcher/part/SearchedImage.vue'

interface Data {
	tmpImageLink: string
	skipped: number
	isLoaded: boolean
	currentGame?: Game
	currentImageLink: string
	currentImageInfo: ImageInfo
	images: string[]
}

export default defineComponent({
	name: 'ImageSearcher',
	components: { SearchedImage },
	apollo: {
		currentGame: {
			query: GET_GAME_WITH_LOW_QUALITY_IMAGE,
			update: data => data.getGameWithLowQualityImage,
			fetchPolicy: 'no-cache',
			variables() {
				return {
					skip: 0
				}
			}
		}
	},
	data(): Data {
		return {
			tmpImageLink: '',
			skipped: 0,
			isLoaded: false,
			currentGame: undefined,
			images: [],
			currentImageLink: '',
			currentImageInfo: {
				link: '',
				width: 0,
				height: 0,
				aspectRatioIndex: 0,
				qualityIndex: 0
			}
		}
	},
	watch: {
		async isLoaded(value: boolean) {
			if (value) {
				this.images = await ImageSearcherService.search(this.currentGame?.title)
			}
		},
		async currentGame(value: Game) {
			this.currentImageLink = value.imageSource
			if (value && gapi?.client) {
				this.images = await ImageSearcherService.search(this.currentGame?.title)
			}
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
		getColor(idealValue: number, delta: number, currentValue: number): string {
			const shift = Math.min(Math.abs(idealValue - currentValue), idealValue)
			const index = 255 / delta
			const colorIndex = Math.round(Math.min((index * shift), 255))
			const red = colorIndex
			const green = 255 - colorIndex
			return `rgb(${red} ${green} 0)`
		},
		skip() {
			this.$apollo.queries.currentGame.refetch({
				skip: ++this.skipped
			})
		},
		async apply() {
			if (!this.currentGame || !this.currentImageInfo) {
				return
			}
			await this.$apollo.mutate({
				mutation: CHANGE_GAME_COVER,
				variables: {
					id: this.currentGame._id,
					url: this.currentImageInfo.link,
					aspectRatio: this.currentImageInfo.aspectRatioIndex,
					quality: this.currentImageInfo.qualityIndex
				}
			})
			this.$apollo.queries.currentGame.refetch()
		},
		clear() {
			this.currentImageLink = this.currentGame?.imageSource as string
		},
		setImage(url: string) {
			this.currentImageLink = url
		},
		addManualImage() {
			this.images.unshift(this.tmpImageLink)
			this.tmpImageLink = ''
		},
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
		position: relative;
		display: grid;
		grid-template-columns: 400px 1fr;
		grid-template-rows: 400px auto;
		gap: 24px;
	}
}

.current-game {
	position: sticky;
	top: 100px;
	height: 500px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	&__buttons {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 8px;
		padding: 24px 0;
	}
}
.add-manually {
	width: 100%;
	&__field {
		width: 100%;
	}
}

.images {
	grid-row: span 2;
	background: rgba(255 255 255 / 5%);
	border-radius: 8px;

	&__list {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
		padding: 24px;
	}
}
</style>

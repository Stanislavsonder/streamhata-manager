<template>
	<div
		class="image"
		:class="{'image--not-clickable': notClickable}"
	>
		<img
			class="image__picture"
			:src="image"
			alt="none"
		>
		<p class="image__sizes">
			{{ imageInfo.width }} x {{ imageInfo.height }}
		</p>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, PropType,
} from 'vue'
import { ImageInfo } from '@services/ImageSearcherService'


interface Data {
	imageInfo: ImageInfo
}

export default defineComponent({
	name: 'SearchedImage',
	emits: ['update:info'],
	props: {
		image: {
			type: String,
			required: true
		},
		info: {
			type: Object as PropType<ImageInfo>,
		},
		notClickable: {
			type: Boolean,
			default: false
		}
	},
	data(): Data {
		return {
			imageInfo: {
				link: '',
				width: 0,
				height: 0,
				aspectRatioIndex: 0,
				qualityIndex: 0
			}
		}
	},
	watch: {
		image: {
			async handler(value: string) {
				if (!value) {
					return
				}
				this.imageInfo = await this.getImageInfo(value)
				this.$emit('update:info', this.imageInfo)
			},
			immediate: true
		}
	},
	methods: {
		async getImageInfo(url: string): Promise<ImageInfo> {
			const link = url || this.image
			try {
				const image = new Image()
				image.src = url || this.image
				await image.decode()
				return {
					link: link,
					width: image.width,
					height: image.height,
					aspectRatioIndex: image.height / image.width,
					qualityIndex: (image.height + image.width) / 2
				}
			}
			catch {
				console.error('Unable to load image: ', link)
				return {
					link: link,
					width: 0,
					height: 0,
					aspectRatioIndex: 0,
					qualityIndex: 0
				}
			}


		}
	}
})
</script>

<style scoped lang="scss">
.image {
	display: flex;
	width: 300px;
	height: 300px;
	padding: 8px;
	align-items: center;
	flex-direction: column;
	justify-content: space-between;
	gap: 16px;
	border-radius: 8px;

	&:not(.image--not-clickable) {
		cursor: pointer;
		transition: background-color 0.15s ease-out,  transform 0.15s ease-out;

		&:hover {
			transform: scale(1.01);
			background-color: rgba(255 255 255/ 5%);
		}

	}

	&__sizes {
		height: 40px;
	}

	&__picture {
		max-width: calc(100% - 40px);
		max-height: calc(100% - 40px);
		outline: 1px solid rgba(255 0 0 / 20%);
		outline-offset: 2px;
		pointer-events: none;
	}
}
</style>

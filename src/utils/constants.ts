import {
	Filter, ImageExisting
} from '@/types'

export const RARITIES = [
	'no-rank',
	'trash',
	'common',
	'good',
	'great',
	'masterpiece',
	'goty'
]

export const EMPTY_FILTER: Filter = {
	imageSource: {
		aspectRatio: {
			value: [0,
				2],
			exclude: false
		},
		quality: {
			value: [0,
				2],
			exclude: false
		},
		exist: ImageExisting.Any
	},
	releaseDate: {
		value: [1980,
			new Date().getFullYear() + 2],
		exclude: false
	},
	score: {
		value: [-1,
			100],
		exclude: false
	},
	duration: {
		value: [-1,
			100],
		exclude: false
	},
	rarity: {
		value: [],
		exclude: true
	},
	tags: {
		value: [],
		exclude: true
	},
	platforms: {
		value: [],
		exclude: true
	}
}

export const rarityColors = {
	'no-ranked': '#3B3B3B',
	'trash': '#807550',
	'common': '#F1E9DD',
	'good': '#61E78B',
	'great': '#7440C9',
	'masterpiece': '#FFD700',
	'goty': '#B71C1C'
}

export const rarityColorsVuetify = Object.fromEntries(
	Object.entries(rarityColors)
		.map(e => [
			'rarity-' + e[0],
			e[1]
		]))

export const RARITY_ARRAY = [
	'NoRank',
	'Trash',
	'Common',
	'Good',
	'Great',
	'Masterpiece',
	'GOTY'
]

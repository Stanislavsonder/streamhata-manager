import {
	Filter, ImageExisting, Platforms
} from '@types'
import { deepCopy, removePlatformGroupsValues } from './utils'

export const RARITIES = [
	'no-rank',
	'trash',
	'common',
	'good',
	'great',
	'masterpiece',
	'goty'
]

export const ALL_PLATFORMS = [
	'PC',
	'iPhone/iPad',
	'Switch',
	'PlayStation 4',
	'PlayStation 5',
	'Xbox One',
	'Xbox Series X',
	'Wii U',
	'3DS',
	'Stadia',
	'PlayStation 3',
	'PlayStation Vita',
	'PlayStation 2',
	'Xbox 360'
]

export const PlatformGroups = {
	[Platforms.PC]: [
		'PC',
		'Stadia'
	],
	[Platforms.Xbox]: [
		'Xbox One',
		'Xbox Series X',
		'Xbox 360'
	],
	[Platforms.PS]: [
		'PlayStation 2',
		'PlayStation Vita',
		'PlayStation 3',
		'PlayStation 4',
		'PlayStation 5',
	],
	[Platforms.Nintendo]: [
		'Switch',
		'Wii U',
		'3DS',
	],
	[Platforms.Mobile]: [
		'iPhone/iPad',
	]
}

export const PlatformGroupsTemplate = removePlatformGroupsValues(deepCopy(PlatformGroups))

// TODO: find icons to replace deprecated
export const PLATFORM_ICONS = {
	[Platforms.PC]: 'mdi-desktop-classic',
	[Platforms.Xbox]: 'mdi-microsoft-xbox',
	[Platforms.PS]: 'mdi-sony-playstation',
	[Platforms.Nintendo]: 'mdi-nintendo-switch',
	[Platforms.Mobile]: 'mdi-cellphone-basic',
	[Platforms.Other]: 'mdi-dots-horizontal'
}

export const tagColors = [
	'#664d00CC',
	'#6e2a0cCC',
	'#691312CC',
	'#5d0933CC',
	'#291938CC',
	'#042d3aCC',
	'#12403cCC',
	'#475200CC',
	'#c1121fCC',
	'#415a77CC',
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


export const RARITY_FOR_VIEW_ARRAY = [
	'No Rank',
	'Trash',
	'Common',
	'Good',
	'Great',
	'Masterpiece',
	'GOTY'
]

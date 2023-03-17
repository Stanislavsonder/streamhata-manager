import {
	Component
} from 'vue'

export type HeaderMenuOption = {
	key: string
	label?: string
	icon: Component
	link: string
}

export enum Rarity {
	NoRank,
	Trash,
	Common,
	Good,
	Great,
	Masterpiece,
	GOTY
}

export enum Tag {
	'Adventure' = 'adventure',
	'Action' = 'action',
	'Arcade' = 'arcade',
	'Racing' = 'racing',
	'Strategy' = 'strategy',
	'Simulator'= 'simulator',
	'RPG'= 'rpg',
	'Puzzle' = 'logic',
	'Casual' = 'casual',
	'Online' = 'online',
	'DLC' = 'add-on',
	'Casino' = 'casino',
	'Sport' = 'sport',
	'MMO' = 'massively multiplayer',
	'неизвестно' = 'неизвестно',
	'Cards' = 'cards',
	'Fighting' = 'fighting',
	'For Adults' =  'for adults',
	'For Kids' = 'for kids',
	'Educational' = 'educational'
}


export enum Platform {
	'PC' = 'PC',
	'Mac' = 'Mac',
	'Linux' = 'Linux',
	'PlayStation1' = 'PS',
	'PlayStation2' = 'PS2',
	'PlayStation3' = 'PS3',
	'PlayStation4' = 'PS4',
	'PlayStation5' = 'PS5',
	'PlayStationPortable' = 'PSP',
	'PlayStationVita' = 'PSV' ,
	'Xbox' = 'XBOX',
	'Xbox360' = 'X360',
	'XboxOne' = 'XONE',
	'XboxSeries' = 'XBOXSX',
	'Nintendo64' = 'N64',
	'NSW' = 'NSW',
	'Android' = 'Android',
	'iOS' = 'iOS' ,
	'Atari' = 'Atari',
	'GameBoyAdvance' = 'GBA',
	'GC' = 'GC' ,
	'Stadia' = 'Stadia',
	'неизвестно' = 'неизвестно',
	'Amiga' = 'Amiga',
	'Apple II' = 'Apple II',
	'Browser' = 'Browser',
	'WII' = 'WII',
	'3DO' = '3DO',
	'3DS' = '3DS',
	'CD-i' = 'CD-i',
	'JAG' = 'JAG' ,
	'NDS' = 'NDS',
	'SAT' = 'SAT',
	'WM' = 'WM',
	'Wii U' = 'Wii U',
	'DC' = 'DC',
	'BlackBerry' = 'BlackBerry',
	'J2ME' = 'J2ME',
	'Symbian' = 'Symbian',
	'AmzKF' = 'AmzKF',
	'Oculus' = 'Oculus',
	'Steam VR' = 'Steam VR',
	'WinPhone' = 'WinPhone',
	'N-Gage' = 'N-Gage',
	'SMD' = 'SMD',
	'GBC' = 'GBC',
	'PS VR2' = 'PS VR2',
	'GB' = 'GB',
	'GG' = 'GG',
	'NG' = 'NG',
	'NGCD' = 'NGCD',
	'NGPC' = 'NGPC',
	'SCD' = 'SCD',
	'SNES' = 'SNES',
	'PS VR' = 'PS VR',
	'C128' = 'C128',
	'C64' = 'C64',
	'Arcade' = 'Arcade',
	'OUYA' = 'OUYA',
	'WSC' = 'WSC',
	'NES' = 'NES',
	'PCE' = 'PCE',
	'SMS' = 'SMS' ,
	'OnLive' = 'OnLive',
	'ZX' = 'ZX',
	'Жанры' = 'Жанры',
	'MSX' = 'MSX',
	'iDVD' = 'iDVD',
	'VB' = 'VB',
	'A26' = 'A26',
	'A52' = 'A52',
	'S32X' = 'S32X',
	'FDS' = 'FDS',
	'LYNX' = 'LYNX',
	'WS' = 'WS',
	'NGP' = 'NGP',
	'Жанр' = 'Жанр'
}

export type UUID = string

export type Game = {
	_id: UUID
	title: string
	description: string
	releaseDate: Date
	imageSource: string
	developers: string[]
	tags: string[]
	platforms: string[]
	rarity: Rarity
	duration: number
	score: number
}

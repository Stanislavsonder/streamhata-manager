export type HeaderMenuOption = {
	key: string
	label: string
	icon: string
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

// TODO: Удалить тег НЕИЗВЕСТО 'неизвестно'
// TODO: Переименовать add-on В DLC
// TODO: Удалить платформы "Жанр" и "Жанры" и 'неизвестно'

export enum Tag {
	'adventure' = 'Adventure',
	'action' = 'Action',
	'arcade' = 'Arcade',
	'racing' = 'Racing',
	'strategy' = 'Strategy',
	'simulator'= 'Simulator',
	'rpg'= 'RPG',
	'logic' = 'Puzzle',
	'casual' = 'Casual',
	'online' = 'Online',
	'dlc' = 'DLC',
	'casino' = 'Casino',
	'sport' = 'Sport',
	'massively multiplayer' = 'MMO',
	'cards' = 'Cards',
	'fighting' = 'Fighting',
	'for adults' =  'For Adults',
	'for kids' = 'For Kids',
	'educational' = 'Educational'
}


export enum Platform {
	'PC' = 'PC',
	'Mac' = 'Mac',
	'Linux' = 'Linux',
	'PS' = 'PlayStation 1',
	'PS2' = 'PlayStation 2',
	'PS3' = 'PlayStation 3',
	'PS4' = 'PlayStation 4',
	'PS5' = 'PlayStation 5',
	'PSP' = 'PlayStation Portable',
	'PSV' = 'PlayStation Vita' ,
	'PS VR' = 'PlayStation VR',
	'XBOX' = 'Xbox',
	'X360' = 'Xbox 360',
	'XONE' = 'Xbox One',
	'XBOXSX' = 'Xbox Series X/S',
	'N64' = 'Nintendo 64',
	'NSW' = 'Nintendo Switch',
	'WII' = 'Nintendo WII',
	'Wii U' = 'Nintendo Wii U',
	'3DS' = 'Nintendo 3DS',
	'NDS' = 'Nintendo DS',
	'SNES' = 'SNES',
	'Android' = 'Android',
	'iOS' = 'iOS' ,
	'Atari' = 'Atari',
	'GBA' = 'GameBoy Advance',
	'GC' = 'GameCube' ,
	'Stadia' = 'Stadia',
	'Amiga' = 'Amiga',
	'Apple II' = 'AppleII',
	'Browser' = 'Browser',
	'3DO' = '3DOInteractiveMultiplayer',
	'CD-i' = 'CD-i',
	'JAG' = 'Atari Jaguar',
	'SAT' = 'SAT',
	'WM' = 'WM',
	'DC' = 'DC',
	'BlackBerry' = 'BlackBerry',
	'J2ME' = 'Java Mobile',
	'Symbian' = 'Symbian',
	'AmzKF' = 'Amazon Kindle Fire',
	'OculusVR' = 'Oculus VR',
	'SteamVR' = 'Steam VR',
	'WinPhone' = 'Windows Phone',
	'N-Gage' = 'Nokia N-Gage',
	'SMD' = 'Sega Genesis',
	'GBC' = 'GameBoy Color',
	'PS VR2' = 'PlayStation VR 2',
	'GB' = 'GameBoy',
	'GG' = 'GG',
	'NG' = 'Neo Geo',
	'NGCD' = 'Neo Geo CD',
	'NGPC' = 'Neo Geo Pocket Color',
	'SCD' = 'SEGA CD',
	'C128' = 'Commodore 128',
	'C64' = 'Commodore 64',
	'Arcade' = 'Arcade',
	'OUYA' = 'OUYA',
	'WSC' = 'WonderSwan Color',
	'NES' = 'NES',
	'PCE' = 'PCEngine',
	'SMS' = 'Sega Master System' ,
	'OnLive' = 'OnLive',
	'ZX' = 'ZX Spectrum',
	'MSX' = 'MSX',
	'iDVD' = 'iDVD',
	'VB' = 'Virtual Boy',
	'A26' = 'Atari 2600',
	'A52' = 'Atari 5200',
	'S32X' = 'Sega Genesis 32X',
	'FDS' = 'Famicom Disk System',
	'LYNX' = 'Atari Lynx',
	'WS' = 'WonderSwan',
	'NGP' = 'NeoGeo Pocket',
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
	imageAspectRatio?: number
	imageQuality?: number
}



type ExcludableRange<T> = {
	value: [T, T]
	exclude: boolean
}

type Excludable<T> = {
	value: T
	exclude: boolean
}

export enum ImageExisting {
	Any,
	Exist,
	NotExist
}

export type Filter = {
	imageSource: {
		exist: ImageExisting
		aspectRatio: ExcludableRange<number>
		quality: ExcludableRange<number>
	}
	releaseDate: ExcludableRange<number>
	score: ExcludableRange<number>
	duration: ExcludableRange<number>
	tags: Excludable<string[]>
	platforms: Excludable<string[]>
	rarity: Excludable<Rarity[]>
}

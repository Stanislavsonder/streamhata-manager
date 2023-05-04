export type HeaderMenuOption = {
	key: string
	label: string
	icon: string
	link: string
}

export const enum Rarity {
	NoRank,
	Trash,
	Common,
	Good,
	Great,
	Masterpiece,
	GOTY
}

export const enum RarityColor {
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
	'simulator' = 'Simulator',
	'rpg' = 'RPG',
	'logic' = 'Puzzle',
	'casual' = 'Casual',
	'online' = 'Online',
	'dlc' = 'DLC',
	'casino' = 'Casino',
	'sport' = 'Sport',
	'massively multiplayer' = 'MMO',
	'cards' = 'Cards',
	'fighting' = 'Fighting',
	'for adults' = 'For Adults',
	'for kids' = 'For Kids',
	'educational' = 'Educational'
}

export enum Platforms {
	'PC' = 'PC',
	'Xbox' = 'Xbox',
	'PS' = 'PlayStation',
	'Nintendo' = 'Nintendo',
	'Mobile' = 'Mobile',
	'Other' = 'Other',
}

export type MergedPlatforms = {
	[Platforms.PC]?: string[]
	[Platforms.PS]?: string[]
	[Platforms.Xbox]?: string[]
	[Platforms.Nintendo]?: string[]
	[Platforms.Mobile]?: string[]
	[Platforms.Other]?: string[]
}

export type UUID = string

export type Game = {
	_id: UUID
	title: string
	description: string
	releaseDate: Date | string
	imageSource: string
	developers: string[]
	tags: string[]
	platforms: string[]
	rarity: Rarity
	duration: number
	score: number
	imageAspectRatio?: number
	imageQuality?: number
	metacriticUrl?: string
	__typename?: string
}

export type GameForCard = Omit<Game, 'developers' | 'description'>

type ExcludableRange<T> = {
	value: [T, T]
	exclude: boolean
}

type Excludable<T> = {
	value: T
	exclude: boolean
}

export const enum ImageExisting {
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

export type SearchType = {
	caption: string
	value: string
}

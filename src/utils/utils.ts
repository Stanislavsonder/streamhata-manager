import {
	MergedPlatforms, Platforms 
} from '@types'
import {
	PlatformGroups, PlatformGroupsTemplate, tagColors 
} from '@constants'

export function copy<T>(value: T): T {
	return JSON.parse(JSON.stringify(value))
}

export function allEnumItems<T>(enumItem: T): T[]{
	return Object.values(enumItem)
}

export function mergePlatforms(platforms: string[]): MergedPlatforms  {
	const mergedPlatforms: MergedPlatforms = deepCopy(PlatformGroupsTemplate)

	platforms.forEach((platform) => {
		const matchedGroup = findMatchingGroup(platform)
		mergedPlatforms[matchedGroup as Platforms] = [platform,
			...(mergedPlatforms[matchedGroup as Platforms] || [])]
	})

	// removing empty fields
	for (const key in mergedPlatforms) {
		if (!mergedPlatforms[key as Platforms]?.length) {
			delete mergedPlatforms[key as Platforms]
		}
	}

	return mergedPlatforms
}

export function findMatchingGroup(platform: string): string {
	for (const [key,
		value] of Object.entries(PlatformGroups)) {
		if (value.includes(platform)) {
			return key
		}
	}
	return Platforms.Other
}

export function removePlatformGroupsValues(groups: MergedPlatforms): MergedPlatforms {
	for (const key in groups) {
		groups[key as Platforms] = []
	}
	return groups
}

export function getTagColor(tag: string): string {
	return tagColors[
		[...new TextEncoder()
			.encode(tag)]
			.reduce((a,b) => a + b) % tagColors.length
	]
}

export function deepCopy<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj))
}

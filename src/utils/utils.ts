export function copy<T>(value: T): T {
	return JSON.parse(JSON.stringify(value))
}

export function allEnumItems<T>(enumItem: T): T[]{
	return Object.values(enumItem)
}

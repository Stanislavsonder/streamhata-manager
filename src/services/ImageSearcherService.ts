
type ImageInfoRaw = {
	kind: string
	title: string
	htmlTitle: string
	link: string
	displayLink: string
	snippet: string
	htmlSnippet: string
	mime: string
	fileFormat: string
	image: {
		contextLink: string
		height: number
		width: number
		byteSize: number
		thumbnailLink: string
		thumbnailHeight: number
		thumbnailWidth: number
	}
}

export type ImageInfo = {
	link: string
	width: number
	height: number
	aspectRatioIndex: number
	qualityIndex: number
}



export default new class ImageSearcherService {
	private API_KEYS: string[] = [
		'AIzaSyAYPA2PW7zQWCqdzYkUJopZ1ufGNNqNVdg',
		'AIzaSyCFO_PO02jWbw6x3SNGNQdFUN2BCpjpzuU',
		'AIzaSyCEihc-TBlocJ3UtbR_QcAtD9zvzGmS2Pk',
		'AIzaSyD33XnH712WawP3LhBO58OBpgsWpR8aUow',
		'AIzaSyBvzuMFbTkVcX1y1qZGLg0qKjr0K2MgePs'
	]

	public async search(prompt?: string): Promise<string[]> {
		try {
			if (!this.API_KEYS.length) {
				console.error('No more quote for google API.')
				return []
			}
			if (!prompt) {
				return []
			}
			gapi.client.setApiKey(this.API_KEYS[0])
			await gapi.client.load('https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest')
			const rawInfo = (await gapi.client.search.cse.list({
				'cx': '25735d6b9108a4f33',
				'imgSize': 'LARGE',
				'imgType': 'imgTypeUndefined',
				'q': prompt + ' game cover',
				'safe': 'safeUndefined',
				'searchType': 'image',
			})).result.items as ImageInfoRaw[]
			gapi.client.setApiKey(this.API_KEYS[0])
			await gapi.client.load('https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest')
			const rawInfo2 = (await gapi.client.search.cse.list({
				'cx': '25735d6b9108a4f33',
				'imgSize': 'LARGE',
				'imgType': 'imgTypeUndefined',
				'q': prompt + ' steam',
				'safe': 'safeUndefined',
				'searchType': 'image',
			})).result.items as ImageInfoRaw[]

			const set = new Set<string>()
			rawInfo.forEach(image => set.add(image.link))
			rawInfo2.forEach(image => set.add(image.link))

			return [...set.values()]
		}
		catch (error) {
			console.error('Google API error: ', error)
			this.API_KEYS.shift()
			return this.search(prompt)
		}
	}

}()

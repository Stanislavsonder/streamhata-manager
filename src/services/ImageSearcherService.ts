
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
	private API_KEY = 'AIzaSyAYPA2PW7zQWCqdzYkUJopZ1ufGNNqNVdg'

	public async search(prompt: string): Promise<ImageInfo[]> {
		try {
			gapi.client.setApiKey(this.API_KEY)
			await gapi.client.load('https://content.googleapis.com/discovery/v1/apis/customsearch/v1/rest')
			const rawInfo = (await gapi.client.search.cse.list({
				'cx': '25735d6b9108a4f33',
				'imgSize': 'LARGE',
				'imgType': 'imgTypeUndefined',
				'q': prompt,
				'safe': 'safeUndefined',
				'searchType': 'image',
				'access_token': this.API_KEY
			})).result.items as ImageInfoRaw[]

			return rawInfo.map(image => ({
				link: image.link,
				width: image.image.width,
				height: image.image.height,
				aspectRatioIndex: image.image.height / image.image.width,
				qualityIndex: (image.image.width + image.image.height) / 2
			}))
		}
		catch (error) {
			console.error('Google API error: ', error)
			return []
		}
	}

}()

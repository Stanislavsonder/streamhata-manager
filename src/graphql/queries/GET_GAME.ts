import { gql } from 'graphql-tag'

export default gql`query($id: String!) {
	getGame(id: $id) {
		_id
		title
		description
		releaseDate
		imageSource
		developers
		tags
		platforms
		rarity
		duration
		score
		imageAspectRatio
		imageQuality
		metacriticUrl
	}
}`

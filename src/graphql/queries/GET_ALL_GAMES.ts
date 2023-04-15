import { gql } from 'graphql-tag'

export default gql`query($filter: Any!) {
	getGames(query: { limit: 100, filter: $filter }) {
		_id
		title
		releaseDate
		imageSource
		tags
		platforms
		rarity
		duration
		score
	}
}`

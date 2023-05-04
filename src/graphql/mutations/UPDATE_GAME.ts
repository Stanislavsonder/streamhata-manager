import gql from 'graphql-tag'

export default gql`mutation updateGame($game: GameInput!) {
	updateGame(updatedGame: $game){
		_id
		title
		imageSource
		releaseDate
		developers
		platforms
		tags
		rarity
		score
		duration
		metacriticUrl
		description
		imageAspectRatio
		imageQuality
	}
}`
import gql from 'graphql-tag'

export default gql`
	mutation updateGameCover($id: String!, $url: String!, $quality: Float!, $aspectRatio:Float!) {
		updateGameCover(id: $id, url:$url, quality:$quality, aspectRatio: $aspectRatio) {
			_id
		}
}`

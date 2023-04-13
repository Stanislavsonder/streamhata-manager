import gql from 'graphql-tag'

export default gql`
query getGameWithLowQualityImage($skip: Float){
  getGameWithLowQualityImage(skip: $skip) {
    title
    imageSource
    _id
  }
}`

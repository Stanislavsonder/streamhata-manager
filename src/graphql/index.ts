import {
	ApolloClient, createHttpLink, InMemoryCache
} from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

const httpLink = createHttpLink({
	uri: 'http://localhost:2334/graphql',
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
	link: httpLink,
	cache,
})

const apolloProvider = createApolloProvider({
	defaultClient: apolloClient,
})

export default apolloProvider
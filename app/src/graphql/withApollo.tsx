import nextWithApollo from 'next-with-apollo'
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { ApolloProvider } from '@apollo/react-hooks'
import { SANITY_GRAPHQL_URL } from '../config'

import introspectionQueryResultData from '../../fragmentTypes-sanity.json'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

const httpLink = createHttpLink({ uri: SANITY_GRAPHQL_URL })

export const withApollo = nextWithApollo(
  ({ initialState }) => {
    return new ApolloClient({
      ssrMode: true,
      link: httpLink,
      cache: new InMemoryCache({ fragmentMatcher }).restore(initialState || {}),
    })
  },
  // {
  //   render: ({ Page, props }) => {
  //     return (
  //       <ApolloProvider client={props.apollo}>
  //         <Page {...props} />
  //       </ApolloProvider>
  //     )
  //   },
  // },
)

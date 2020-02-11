import * as React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { getDataFromTree } from '@apollo/react-ssr'
import { Footer, Navigation } from '../src/views'
import { Providers } from '../src/providers/AllProviders'
import { withApollo } from '../src/graphql'

interface AppProps {
  Component: React.ComponentType
  pageProps: any
  router: any
  apollo: ApolloClient<any>
}

const App = (props: AppProps) => {
  const { Component, pageProps } = props

  return (
    <Providers>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
    </Providers>
  )
}

export default withApollo()(App)

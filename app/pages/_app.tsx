import * as React from 'react'
import styled from '@xstyled/styled-components'
import { ApolloClient } from 'apollo-client'
import { Footer, Navigation } from '../src/views'
import { Providers } from '../src/providers/AllProviders'
import { withApollo } from '../src/graphql'

interface AppProps {
  Component: React.ComponentType
  pageProps: any
  router: any
  apollo: ApolloClient<any>
}

const Main = styled.main``

const App = (props: AppProps) => {
  const { Component, pageProps } = props

  return (
    <Providers>
      <Main>
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </Main>
    </Providers>
  )
}

export default withApollo()(App)

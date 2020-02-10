import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Footer, Navigation } from '../src/views'
import { Providers } from '../src/providers/AllProviders'
import { withApollo } from '../src/graphql'

interface AppProps {
  Component: React.ComponentType
  pageProps: any
  router: any
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

export default withApollo(App)

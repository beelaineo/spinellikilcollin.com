import * as React from 'react'
import { NextRouter } from 'next/router'
import styled, { ThemeProvider } from '@xstyled/styled-components'
import { ApolloClient } from 'apollo-client'
import Head from 'next/head'
import { Footer, Navigation } from '../src/views'
import { Providers } from '../src/providers/AllProviders'
import { withApollo } from '../src/graphql'
import { getThemeByRoute } from '../src/theme'

interface AppProps {
  Component: React.ComponentType
  pageProps: any
  router: NextRouter
  apollo: ApolloClient<any>
}

export interface PageContext {
  query: any
  apolloClient: ApolloClient<any>
}

const Main = styled.main`
  background-color: background;
  transition: background-color 0.3s;
`

const ComponentWrapper = styled.div`
  min-height: 100vh;
`

const App = (props: AppProps) => {
  const { Component, pageProps, router } = props
  const path = router.pathname

  return (
    <Providers>
      <ThemeProvider theme={getThemeByRoute(path)}>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
  _affirm_config = {
     public_api_key:  "YFV3AOI9Q9ROPM3E",
     script:          "https://cdn1.affirm.com/js/v2/affirm.js",
     session_id:      "YOUR_VISITOR_SESSION_ID"
  };
  (function(l,g,m,e,a,f,b){var d,c=l[m]||{},h=document.createElement(f),n=document.getElementsByTagName(f)[0],k=function(a,b,c){return function(){a[b]._.push([c,arguments])}};c[e]=k(c,e,"set");d=c[e];c[a]={};c[a]._=[];d._=[];c[a][b]=k(c,a,b);a=0;for(b="set add save post open empty reset on off trigger ready setProduct".split(" ");a<b.length;a++)d[b[a]]=k(c,e,b[a]);a=0;for(b=["get","token","url","items"];a<b.length;a++)d[b[a]]=function(){};h.async=!0;h.src=g[f];n.parentNode.insertBefore(h,n);delete g[f];d(g);l[m]=c})(window,_affirm_config,"affirm","checkout","ui","script","off");
      `,
            }}
          />
        </Head>
        <Main>
          <Navigation />
          <ComponentWrapper>
            <Component {...pageProps} />
          </ComponentWrapper>
          <Footer />
        </Main>
      </ThemeProvider>
    </Providers>
  )
}

export default withApollo()(App)

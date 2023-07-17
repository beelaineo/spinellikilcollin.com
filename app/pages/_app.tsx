import * as React from 'react'
import { NextRouter } from 'next/router'
import styled, { ThemeProvider } from '@xstyled/styled-components'
import Head from 'next/head'
import Script from 'next/script'
import { Providers } from '../src/providers/AllProviders'
import { Footer } from '../src/components/Footer'
import { Navigation } from '../src/components/Navigation'
import { SearchPane } from '../src/components/Search'
import { ToastRoot } from '../src/components/Toast'
import { getThemeByRoute } from '../src/theme'
import { config } from '../src/config'
import { KeepAliveProvider } from 'react-next-keep-alive'

import '../public/static/fonts/fonts.css'

const { useEffect } = React

interface AppProps {
  Component: React.ComponentType
  pageProps: any
  router: NextRouter
}

const Main = styled.div`
  background-color: background;
  transition: background-color 0.3s;
`

const App = (props: AppProps) => {
  const { Component, pageProps: allPageProps, router } = props
  const path = router.asPath
  const { shopData, ...pageProps } = allPageProps
  if (!shopData) return null

  // Hubspot Conversations launcher
  useEffect(() => {
    const paramString = router.asPath.replace(/^(.*)\?/, '')
    const params = new URLSearchParams(paramString)
    const timeout = setTimeout(() => {
      if (
        params.get('openChat') === 'true' &&
        window &&
        // @ts-ignore
        window?.HubSpotConversations?.widget
      ) {
        // @ts-ignore
        window.HubSpotConversations.widget.open()
      }
    }, 500)
    return () => clearTimeout(timeout)
  }, [router.isReady])
  // Breadcrumbs (previous and current browsing paths)
  useEffect(() => storePathValues, [router.asPath])

  function storePathValues() {
    const storage = globalThis?.sessionStorage
    if (!storage) return
    // Set the previous path as the value of the current path.
    const prevPath = storage.getItem('currentPath')
    //@ts-ignore
    storage.setItem('prevPath', prevPath)
    // Set the current path value by looking at the browser's location object.
    storage.setItem('currentPath', globalThis.location.pathname)
  }

  console.log('query test:', router.query)

  return (
    <Providers shopData={shopData}>
      <ThemeProvider theme={getThemeByRoute(path)}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=2"
          />
        </Head>
        <Main>
          <Navigation />
          <SearchPane />
          <ToastRoot />
          <KeepAliveProvider router={router}>
            <Component {...pageProps} />
          </KeepAliveProvider>

          <Footer />
        </Main>
        <div id="modal" />
      </ThemeProvider>
    </Providers>
  )
}

export default App

import * as React from 'react'
import { NextRouter } from 'next/router'
import styled, { ThemeProvider } from '@xstyled/styled-components'
import Head from 'next/head'
import { Providers } from '../src/providers/AllProviders'
import { Footer } from '../src/components/Footer'
import { Navigation } from '../src/components/Navigation'
import { SearchPane } from '../src/components/Search'
import { ToastRoot } from '../src/components/Toast'
import { getThemeByRoute } from '../src/theme'
import { KeepAliveProvider } from 'react-next-keep-alive'
import { useBreadcrumbs } from '../src/hooks/useBreadcrumbs'

import * as braze from '@braze/web-sdk'

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('../src/utils/braze-exports').then(
        ({
          initialize,
          openSession,
          automaticallyShowInAppMessages,
          getUser,
        }) => {
          initialize('8c2c6ebc-a139-4836-a787-25756bd6c8f8', {
            baseUrl: 'sdk.iad-07.braze.com',
            enableLogging: true,
            allowUserSuppliedJavascript: true,
          })

          automaticallyShowInAppMessages()

          const user = getUser()
          const userId = user?.getUserId()

          console.log('The user ID is:', user, userId)

          openSession()
        },
      )
    }
  }, [])

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

  const breadCrumbs = useBreadcrumbs()

  if (!shopData) return null
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
          <Navigation breadCrumbs={breadCrumbs} />
          <SearchPane breadCrumbs={breadCrumbs} />
          <ToastRoot />
          <KeepAliveProvider router={router}>
            <Component {...pageProps} />
          </KeepAliveProvider>

          <Footer breadCrumbs={breadCrumbs} />
        </Main>
        <div id="modal" />
      </ThemeProvider>
    </Providers>
  )
}

export default App

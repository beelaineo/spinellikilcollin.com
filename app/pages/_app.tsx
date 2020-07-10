import * as React from 'react'
import { NextRouter } from 'next/router'
import styled, { ThemeProvider } from '@xstyled/styled-components'
import Head from 'next/head'
import { Providers } from '../src/providers/AllProviders'
import { Footer } from '../src/components/Footer'
import { Navigation } from '../src/components/Navigation'
import { SearchPane } from '../src/components/Search'
import { getThemeByRoute } from '../src/theme'

interface AppProps {
  Component: React.ComponentType
  pageProps: any
  router: NextRouter
}

const Main = styled.main`
  background-color: background;
  transition: background-color 0.3s;
`

const App = (props: AppProps) => {
  const { Component, pageProps: allPageProps, router } = props
  const path = router.pathname
  const { shopData, ...pageProps } = allPageProps
  if (!shopData) return null

  // throw new Error('This page did not fetch the shop data')

  return (
    <Providers shopData={shopData}>
      <ThemeProvider theme={getThemeByRoute(path)}>
        <Head>
          <link rel="stylesheet" href="/static/fonts/fonts.css" />
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
          <script
            dangerouslySetInnerHTML={{
              __html: `

  window.intercomSettings = {
    app_id: "deljq5df"
  };

              `,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
// We pre-filled your app ID in the widget URL: 'https://widget.intercom.io/widget/deljq5df'
(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/deljq5df';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
                `,
            }}
          />
        </Head>
        <Main>
          <Navigation />
          <SearchPane />
          <Component {...pageProps} />
          <Footer />
        </Main>
        <div id="modal" />
      </ThemeProvider>
    </Providers>
  )
}

export default App

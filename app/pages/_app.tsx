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
import { config } from '../src/config'

const { useEffect } = React

interface AppProps {
  Component: React.ComponentType
  pageProps: any
  router: NextRouter
}

const Main = styled.main`
  background-color: background;
  transition: background-color 0.3s;
`

export const gtm = {
  prod: {
    script: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-36441837-1', { send_page_view: false });
    `,
    // TODO: Temporarily disabled while testing out normal GA tracking
    //   script: `
    //     (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    //     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    //     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    //     'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    //     })(window,document,'script','dataLayer','GTM-TRLD2RW');
    //   `,
    //   iframeSrc: `https://www.googletagmanager.com/ns.html?id=GTM-TRLD2RW&gtm_auth=zOnG3Cp61zcz375N0eQCtg&gtm_preview=env-12&gtm_cookies_win=x`,
  },
  staging: {
    script: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=7LOUFPFE1s9d9-BbRuFWzg&gtm_preview=env-13&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-TRLD2RW');
     `,
    iframeSrc: `https://www.googletagmanager.com/ns.html?id=GTM-TRLD2RW&gtm_auth=7LOUFPFE1s9d9-BbRuFWzg&gtm_preview=env-13&gtm_cookies_win=x`,
  },
  dev: {
    script: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=zOnG3Cp61zcz375N0eQCtg&gtm_preview=env-12&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-TRLD2RW');
      `,
    iframeSrc: `https://www.googletagmanager.com/ns.html?id=GTM-TRLD2RW&gtm_auth=zOnG3Cp61zcz375N0eQCtg&gtm_preview=env-12&gtm_cookies_win=x`,
  },
}

const { STOREFRONT_ENV } = config

const App = (props: AppProps) => {
  const { Component, pageProps: allPageProps, router } = props
  const path = router.asPath
  const { shopData, ...pageProps } = allPageProps
  if (!shopData) return null

  const tagInfo =
    STOREFRONT_ENV === 'production'
      ? gtm.prod
      : STOREFRONT_ENV === 'staging'
      ? gtm.staging
      : gtm.dev

  return (
    <Providers shopData={shopData}>
      <ThemeProvider theme={getThemeByRoute(path)}>
        <Head>
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-36441837-1"
          ></script>
          <script
            /* Tag Manager */
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: tagInfo.script,
            }}
          />

          <link rel="stylesheet" href="/static/fonts/fonts.css" />
          <link rel="icon" href="/static/favicon.png" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          />
          <script
            /* Pinterest tag */
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                !function(e){if(!window.pintrk){window.pintrk=function()
                {window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
                n=window.pintrk;n.queue=[],n.version="3.0";var
                t=document.createElement("script");t.async=!0,t.src=e;var
                r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}
                ("https://s.pinimg.com/ct/core.js"); 
                pintrk('load','2613624654029', { em: '', });
                pintrk('page');
             `,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
                <img
                  height="1"
                  width="1"
                  style={{ display: 'none' }}
                  alt=""
                  src="https://ct.pinterest.com/v3/?tid=2613624654029&noscript=1"
                />
              `,
            }}
          />
          <script
            /* Affirm */
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
          <SearchPane />
          <ToastRoot />
          <Component {...pageProps} />
          <Footer />
        </Main>
        <div id="modal" />
      </ThemeProvider>
      <script
        /* Hubspot */
        type="text/javascript"
        id="hs-script-loader"
        async
        defer
        src="//js.hs-scripts.com/7668999.js"
      />
    </Providers>
  )
}

export default App

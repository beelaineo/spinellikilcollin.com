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
    //   script: `
    // window.dataLayer = window.dataLayer || [];
    // function gtag(){dataLayer.push(arguments);}
    // gtag('js', new Date());

    // gtag('config', 'UA-36441837-1', { send_page_view: false });
    //   `,
    script: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TRLD2RW');
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
  // TODO: Disabled temporarily
  // staging: {
  //   script: `
  //     (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  //     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  //     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  //     'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=7LOUFPFE1s9d9-BbRuFWzg&gtm_preview=env-13&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
  //     })(window,document,'script','dataLayer','GTM-TRLD2RW');
  //    `,
  //   iframeSrc: `https://www.googletagmanager.com/ns.html?id=GTM-TRLD2RW&gtm_auth=7LOUFPFE1s9d9-BbRuFWzg&gtm_preview=env-13&gtm_cookies_win=x`,
  // },
  // dev: {
  //   script: `
  //     (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  //     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  //     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  //     'https://www.googletagmanager.com/gtm.js?id='+i+dl+ '&gtm_auth=zOnG3Cp61zcz375N0eQCtg&gtm_preview=env-12&gtm_cookies_win=x';f.parentNode.insertBefore(j,f);
  //     })(window,document,'script','dataLayer','GTM-TRLD2RW');
  //     `,
  //   iframeSrc: `https://www.googletagmanager.com/ns.html?id=GTM-TRLD2RW&gtm_auth=zOnG3Cp61zcz375N0eQCtg&gtm_preview=env-12&gtm_cookies_win=x`,
  // },
  staging: { script: '', iframeSrc: '' },
  dev: { script: '', iframeSrc: '' },
}

const { STOREFRONT_ENV, FB_PIXEL_ID } = config

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

  return (
    <Providers shopData={shopData}>
      <ThemeProvider theme={getThemeByRoute(path)}>
        <Head>
          {/* <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-36441837-1"
          ></script> */}
          <script
            /* Tag Manager */
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-TRLD2RW');`,
            }}
          />
          <link
            id="GEPIStyles"
            rel="stylesheet"
            href="//gepi.global-e.com/includes/css/10000945"
          />

          <link rel="stylesheet" href="/static/fonts/fonts.css" />
          <link rel="icon" href="/static/favicon.png" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          />
          <meta
            name="facebook-domain-verification"
            content="w5tnp2wbd81v1e20fyohim1nynkquj"
          />
          <meta
            name="google-site-verification"
            content="Kjki-i70-5FfYssOGX8NqsZaiuxYjDluvTiBnNiLoHM"
          />
          {/* <script
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
          /> */}
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
          {/* Global Site Code Pixel - Facebook Pixel */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (window && typeof(fbq) === 'undefined') {
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', ${FB_PIXEL_ID});
                  fbq('track', 'PageView');
                }
              `,
            }}
          />
          <script
            id="globaleScript"
            type="text/javascript"
            async
            defer
            src="https://gepi.global-e.com/includes/js/10000945"
          />
          {/* <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript> */}
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
      <noscript
        dangerouslySetInnerHTML={{
          __html: `
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TRLD2RW"
            height="0"
            width="0"
            style="{{ display: 'none', visibility: 'hidden' }}"
          ></iframe>
          `,
        }}
      />
      <script
        /* Hubspot */
        type="text/javascript"
        id="hs-script-loader"
        async
        defer
        src="//js.hs-scripts.com/7668999.js"
      />
      {/* Bambuser */}
      <script src="https://lcx-embed.bambuser.com/spinelli-kilcollin/embed.js" />
    </Providers>
  )
}

export default App

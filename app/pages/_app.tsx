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
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-TRLD2RW');
    `,
  },
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
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TRLD2RW');`,
          }}
        />
        {/* Affirm */}
        <Script
          id="affirm-script"
          dangerouslySetInnerHTML={{
            __html: `
            _affirm_config = {
               public_api_key:  "YFV3AOI9Q9ROPM3E",
               script:          "https://cdn1.affirm.com/js/v2/affirm.js"
            };
            (function(l,g,m,e,a,f,b){var d,c=l[m]||{},h=document.createElement(f),n=document.getElementsByTagName(f)[0],k=function(a,b,c){return function(){a[b]._.push([c,arguments])}};c[e]=k(c,e,"set");d=c[e];c[a]={};c[a]._=[];d._=[];c[a][b]=k(c,a,b);a=0;for(b="set add save post open empty reset on off trigger ready setProduct".split(" ");a<b.length;a++)d[b[a]]=k(c,e,b[a]);a=0;for(b=["get","token","url","items"];a<b.length;a++)d[b[a]]=function(){};h.async=!0;h.src=g[f];n.parentNode.insertBefore(h,n);delete g[f];d(g);l[m]=c})(window,_affirm_config,"affirm","checkout","ui","script","off");
           `,
          }}
        />
        {/* Global Site Code Pixel - Facebook Pixel */}
        <Script
          id="fb-pixel"
          dangerouslySetInnerHTML={{
            __html: `if (window && typeof(fbq) === 'undefined') {
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
            }`,
          }}
        />
        {/* Global Site Code Pixel - TikTok */}
        <Script
          id="tik-tok-pixel"
          dangerouslySetInnerHTML={{
            __html: `if (window && typeof(ttq) === 'undefined') {
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              }(window, document, 'ttq');
              ttq.load('C71KNOLHGFJ2F6MB01S0');
              ttq.page();
            }`,
          }}
        />
        {/* Global-E */}
        <Script
          id="globaleScript"
          src="https://gepi.global-e.com/includes/js/10000945"
          strategy="beforeInteractive"
        />
        <Head>
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
          {/* Pinterest */}
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
      {/* Hubspot */}
      <Script
        id="hs-script-loader"
        src="//js.hs-scripts.com/7668999.js"
        async
        defer
      />
      {/* Bambuser */}
      <Script
        id="bambuser-script-loader"
        src="https://lcx-embed.bambuser.com/spinelli-kilcollin/embed.js"
        strategy="beforeInteractive"
      />
    </Providers>
  )
}

export default App

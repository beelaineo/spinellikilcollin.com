import * as React from 'react'
import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import Script from 'next/script'
import { ServerStyleSheet } from 'styled-components'
import { config } from '../src/config'

const { FB_PIXEL_ID } = config

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#8e8e8e" />
          <link
            rel="preconnect dns-prefetch"
            href="https://triplewhale-pixel.web.app/"
            crossOrigin="anonymous"
          />
          <link
            rel="preconnect dns-prefetch"
            href="https://api.config-security.com/"
            crossOrigin="anonymous"
          />
          <meta name="msapplication-TileColor" content="#f5f3f4" />
          <meta name="theme-color" content="#ffffff"></meta>
          <meta
            name="facebook-domain-verification"
            content="w5tnp2wbd81v1e20fyohim1nynkquj"
          />
          <meta
            name="google-site-verification"
            content="Kjki-i70-5FfYssOGX8NqsZaiuxYjDluvTiBnNiLoHM"
          />
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
            strategy="afterInteractive"
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
            strategy="beforeInteractive"
          />
          {/* Aspire */}
          <Script
            id="aspire-script"
            dangerouslySetInnerHTML={{
              __html: `
              !function(){var o=window.tdl=window.tdl||[];if(o.invoked)window.console&&console.error&&console.error("Tune snippet has been included more than once.");else{o.invoked=!0,o.methods=["init","identify","convert"],o.factory=function(n){return function(){var e=Array.prototype.slice.call(arguments);return e.unshift(n),o.push(e),o}};for(var e=0;e<o.methods.length;e++){var n=o.methods[e];o[n]=o.factory(n)}o.init=function(e){var n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://js.go2sdk.com/v2/tune.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(n,t),o.domain=e}}}();

              tdl.init("https://aspireiq.go2cloud.org") 
              tdl.identify() 
            `,
            }}
            strategy="beforeInteractive"
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
            strategy="beforeInteractive"
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
            strategy="beforeInteractive"
          />
        </Head>
        <body>
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
          {/* Triple Whale Pixel */}
          <Script
            id="triple-pixel-var"
            dangerouslySetInnerHTML={{
              __html: `TripleHeadless = "spinellikilcollin.myshopify.com"`,
            }}
            strategy="beforeInteractive"
          />
          <Script
            id="triple-pixel"
            dangerouslySetInnerHTML={{
              __html: `
                /* >> TriplePixel :: start*/
                ~function(W,H,A,L,E,_,B,N){function O(U,T,H,R){void 0===R&&(R=!1),H=new XMLHttpRequest,H.open("GET",U,!0),H.send(null),H.onreadystatechange=function(){4===H.readyState&&200===H.status?(R=H.responseText,U.includes(".txt")?eval(R):N[B]=R):(299<H.status||H.status<200)&&T&&!R&&(R=!0,O(U,T-1))}}if(N=window,!N[H+"sn"]){N[H+"sn"]=1;try{A.setItem(H,1+(0|A.getItem(H)||0)),(E=JSON.parse(A.getItem(H+"U")||"[]")).push(location.href),A.setItem(H+"U",JSON.stringify(E))}catch(e){}A.getItem(\'\"!nC\`\')||(A=N,A[H]||(L=function(){return Date.now().toString(36)+"_"+Math.random().toString(36)},E=A[H]=function(t,e){return W=L(),(E._q=E._q||[]).push([W,t,e]),W},E.ch=W,B="configSecurityConfModel",N[B]=1,O("//conf.config-security.com/model",0),O("//triplewhale-pixel.web.app/triplefw.txt?",5)))}}("K","TriplePixel",localStorage);
                /* << TriplePixel :: end*/
              `,
            }}
            strategy="beforeInteractive"
          />
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
          <Main />
          <NextScript />
          <Script
            id="bambuser-script-loader"
            src="https://lcx-embed.bambuser.com/spinelli-kilcollin/embed.js"
            strategy="beforeInteractive"
          />
          {/* Hubspot */}
          <Script
            id="hs-script-loader"
            src="//js.hs-scripts.com/7668999.js"
            async
            defer
            strategy="beforeInteractive"
          />
          <Script
            id="hs-form-loader"
            src="//js.hsforms.net/forms/embed/v2.js"
            strategy="beforeInteractive"
          />
        </body>
      </Html>
    )
  }
}

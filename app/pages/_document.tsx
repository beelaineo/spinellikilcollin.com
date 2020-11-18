import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { gtm } from './_app'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
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
    const ENV = process.env.STOREFRONT_ENV

    const tagInfo =
      ENV === 'production'
        ? gtm.prod
        : ENV === 'staging'
        ? gtm.staging
        : gtm.dev

    return (
      <Html>
        <Head />
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
           <iframe
              src={${tagInfo.iframeSrc}}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
        
            `,
            }}
          />

          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

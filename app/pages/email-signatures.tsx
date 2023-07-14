import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import Link from 'next/link'
import Head from 'next/head'
import gql from 'graphql-tag'
import { NotFound } from '../src/views/NotFound'
import { GetStaticProps } from 'next'
import { request } from '../src/graphql'
import { requestShopData } from '../src/providers/ShopDataProvider/shopDataQuery'
import { EmailSignatureSettings, Maybe } from '../src/types'
const { useCallback, useRef, useEffect } = React
import { sanityClient } from '../src/services/sanity'
import CopyToClipboard from 'react-copy-html-to-clipboard'

const Main = styled.main`
  min-height: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: white;
`

const PageWrapper = styled.mainBox`
  ${({ theme }) => css`
    padding: calc(${theme.navHeight} + ${theme.space[9]}px) 10 8;
    overflow-x: hidden;
  `}
`

const SignatureWrapper = styled.mainBox`
  ${({ theme }) => css`
    padding: 16px;
    border: 1px solid black;
    margin: 72px 48px 24px 48px;
  `}
`

interface EmailSignaturesProps {
  signatures?: EmailSignatureSettings
}

const Pronouns = ({ pronouns }: { pronouns: string }) => {
  return (
    <span style={{ fontSize: '11px', marginLeft: '4px' }}>({pronouns})</span>
  )
}

const Location = ({ location }: { location: string }) => {
  return <span>Location: {location}</span>
}

const Email = ({ email }: { email: string }) => {
  return (
    <a
      style={{ color: '#222', textDecoration: 'none!important' }}
      href={`mailto:${email}`}
    >
      {email}
    </a>
  )
}

const Phone = ({ label, phone }: { label: string; phone: string }) => {
  return (
    <a
      style={{ color: '#222', textDecoration: 'none!important' }}
      href={`tel:${phone.replace(/[^A-Z0-9]+/gi, '')}`}
    >
      {label} {phone}
    </a>
  )
}

const Signature = ({
  signature,
  wordmark,
}: {
  signature: any
  wordmark?: string
}) => {
  const [headerData, setHeaderData] = React.useState<Maybe<string>>(null)
  const [headerWidth, setHeaderWidth] = React.useState<Maybe<number>>(null)
  const [clipboardText, setClipboardText] = React.useState('')
  const signatureHTML = useRef<HTMLDivElement>(null)
  // const onButtonClick = useCallback(() => {
  //   if (header.current === null) {
  //     return
  //   }

  //   toPng(header.current, { cacheBust: true, })
  //     .then((dataUrl) => {
  //       setHeaderData(dataUrl)
  //       if (header.current) setHeaderWidth(header.current?.offsetWidth)
  //       console.log('dataUrl', dataUrl)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }, [header])

  // useEffect(() => {
  //   if (!headerData) return
  //   const uploadImage = async () => {
  //     const buffer =  Buffer.from(headerData, "base64")
  //     console.log('buffer', buffer)
  //     const res = await sanityClient.assets.upload('image', buffer)
  //     const { url, assetId } = res
  //     console.log('image url', url)
  //   }
  // }, [headerData])

  // const res = await sdRes.json();
  //     const { images } = res;
  //     const newImage = images[0];
  //     if (newImage && props.document?._id != 'placeholder') {
  //       const newImageValue = `data:image/png;base64,${newImage}`;
  //       setImage(newImageValue);
  //       patch.execute([
  //         {
  //           set: {
  //             image: newImageValue,
  //           },
  //         },
  //       ]);
  //     }

  // const blob = header?.current ? await toPng(header.current) : null
  // imagenMap[imagenId] = blob
  // let data = [new window.ClipboardItem({ [blob.type]: blob })];
  // await navigator.clipboard.write(data)

  const renderEmailSignature = (html) => {
    return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
    <html><head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    </head>
    <body>${html}</body></html>`
  }

  const updateText = () => {
    // console.log(renderEmailSignature(signatureHTML.current?.outerHTML))
    setClipboardText(renderEmailSignature(signatureHTML.current?.outerHTML))
  }

  return (
    <>
      <SignatureWrapper ref={signatureHTML}>
        <style jsx>{`
          @font-face {
            font-family: 'Inferi Book';
            font-style: normal;
            font-weight: 400;
            src: url('https://www.spinellikilcollin.com/static/fonts/Inferi-Book.woff2')
                format('woff2'),
              url('https://www.spinellikilcollin.com/static/fonts/Inferi-Book.woff')
                format('woff'),
              url('https://www.spinellikilcollin.com/static/fonts/Inferi-Book.otf')
                format('opentype');
          }
          @font-face {
            font-family: 'Inferi Book';
            font-style: italic;
            font-weight: 400;
            src: url('https://www.spinellikilcollin.com/static/fonts/Inferi-BookItalic.woff2')
                format('woff2'),
              url('https://www.spinellikilcollin.com/static/fonts/Inferi-BookItalic.woff')
                format('woff'),
              url('https://www.spinellikilcollin.com/static/fonts/Inferi-BookItalic.otf')
                format('opentype');
          }
        `}</style>
        <table
          cellSpacing="0"
          cellPadding="0"
          style={{
            lineHeight: '1.33',
            color: '#222222',
            textAlign: 'left',
            fontFamily: "'Inferi Book', 'Garamond', 'Georgia', serif",
            fontWeight: '200',
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  paddingRight: '12px',
                  lineHeight: '1.33',
                  color: '#222222',
                  textAlign: 'left',
                  fontFamily: "'Inferi Book', 'Garamond', 'Georgia', serif",
                  fontWeight: '200',
                }}
              >
                <a
                  style={{ display: 'block', lineHeight: 0 }}
                  href="https://spinellikilcollin.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  <img width="75" src={wordmark} />
                </a>
              </td>
              <td
                style={{
                  fontSize: '16px',
                  paddingTop: '8px',
                  verticalAlign: 'top',
                  color: '#222222',
                  textAlign: 'left',
                  fontFamily: "'Inferi Book', 'Garamond', 'Georgia', serif",
                  fontWeight: '200',
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: '16px',
                      verticalAlign: 'bottom',
                      color: '#222222',
                      textAlign: 'left',
                      fontFamily: "'Inferi Book', 'Garamond', 'Georgia', serif",
                      fontWeight: '200',
                    }}
                  >
                    {signature.title}
                    {signature.pronouns && (
                      <Pronouns pronouns={signature.pronouns} />
                    )}
                    <br />
                    <em>{signature.role}</em>
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td>&nbsp;</td>
              <td
                style={{
                  fontSize: '11px',
                  lineHeight: '1.33',
                  color: '#222222',
                  paddingTop: '8px',
                  textAlign: 'left',
                  verticalAlign: 'top',
                  fontFamily: "'Inferi Book', 'Garamond', 'Georgia', serif",
                  fontWeight: '200',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    lineHeight: '1.33',
                    color: '#222222',
                    textAlign: 'left',
                    fontFamily: "'Inferi Book', 'Garamond', 'Georgia', serif",
                    fontWeight: '200',
                  }}
                >
                  {signature.email && (
                    <>
                      <Email email={signature.email} />
                    </>
                  )}

                  {signature.location && (
                    <>
                      <br />
                      <Location location={signature.location} />
                    </>
                  )}
                  {signature.phone && (
                    <>
                      <br />
                      <Phone
                        phone={signature.phone}
                        label={signature.phone_label || 'Office:'}
                      />
                    </>
                  )}
                  {signature.phone_2 && (
                    <>
                      <br />
                      <Phone
                        phone={signature.phone_2}
                        label={signature.phone_label_2 || 'Office:'}
                      />
                    </>
                  )}
                  {signature.additional_info && (
                    <>
                      <br />
                      <span>{signature.additional_info}</span>
                    </>
                  )}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        {/* {!headerData ? (
    <button onClick={onButtonClick}>Click me</button>
    ) : null} */}
      </SignatureWrapper>
      <CopyToClipboard
        text={clipboardText}
        options={{ asHtml: true }}
        onCopy={(text, result) => {
          // console.log(`on copied: ${result}`, text)
        }}
      >
        {/* <button className="copy btn btn-primary float-right">Copy to clipboard</button> */}
        <button
          style={{ border: '1px solid black', padding: '16px' }}
          onMouseDown={updateText}
        >
          Copy above signature to clipboard
        </button>
      </CopyToClipboard>
    </>
  )
}

const EmailSignatures = ({ signatures }: EmailSignaturesProps) => {
  if (!signatures) return <NotFound />
  return (
    <PageWrapper>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Main>
        <h2>SK Email Signatures</h2>
        <section>
          {signatures.signatures?.map((s) => (
            <Signature
              key={s?._key}
              signature={s}
              wordmark={
                signatures.wordmark?.asset?.url !== null
                  ? signatures.wordmark?.asset?.url
                  : undefined
              }
            />
          ))}
        </section>
      </Main>
    </PageWrapper>
  )
}

const emailSignatureSettingsQuery = gql`
  query EmailSignatureSettingsQuery {
    EmailSignatureSettings(id: "emailSignatureSettings") {
      _id
      _type
      wordmark {
        asset {
          url
        }
      }
      signatures {
        _key
        title
        role
        email
        pronouns
        location
        phone
        phone_label
        phone_2
        phone_label_2
        additional_info
      }
    }
  }
`

interface EmailSignatureSettingsResponse {
  EmailSignatureSettings?: Maybe<EmailSignatureSettings>
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async () => {
  const [response, shopData] = await Promise.all([
    request<EmailSignatureSettingsResponse>(emailSignatureSettingsQuery),
    requestShopData(),
  ])

  const signatures = response?.EmailSignatureSettings || null

  return { props: { shopData, signatures }, revalidate: 10 }
}

export default EmailSignatures

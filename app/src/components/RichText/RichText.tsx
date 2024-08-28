import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { Heading, Span, P, BlockQuote, Li, Ul, Ol } from '../Text'
import { Image } from '../Image'
import { useModal } from '../../providers/ModalProvider'
import { useCurrentProduct } from '../../providers/CurrentProductProvider'
import { useCart } from '../../providers/CartProvider'
import { useShopData } from '../../providers/ShopDataProvider'
import { LinkInfo } from '../../utils'
import { EmbeddedForm } from './EmbeddedForm'
import { CloudinaryVideo } from '../CloudinaryVideo'
import { CountDown } from '../CountDown'
import { Iframe } from '../Iframe'

import Link from 'next/link'

interface WithArticle {
  article?: boolean
}

const RichTextWrapper = styled.div<WithArticle>`
  ${({ theme, article }) => css`
    ${article
      ? css`
          h2 {
            line-height: 1.5em;
            margin: 0.6em 0;
          }
          h4,
          p {
            line-height: 1.8em;
            margin: 1em 0;
            font-size: 4;
          }
        `
      : ''}
    picture {
      max-width: 80%;
      margin: 80px auto;
    }

    ul {
      font-weight: 300;
      line-height: 1.4em;
      font-size: 5;
    }

    h2:has(a) {
      width: fit-content;
      margin: 2 auto 0.5em;

      a:focus-visible {
        ${theme.focus.left(0)}
        position: relative;
      }
    }

    h4:has(a) {
      margin: 2 auto 0.5em;

      a:focus-visible {
        ${theme.focus.bottom(0, 4)}
        position: relative;
      }
    }

    h3:has(a) {
      a:focus-visible {
        ${theme.focus.left(0)}
        position: relative;
      }
    }

    h3:has(span) {
      a:focus-visible {
        ${theme.focus.bottom(0, 5)}
        position: relative;
      }
    }

    p:has(span) {
      a:focus-visible {
        ${theme.focus.left(0)}
        position: relative;
      }
    }

    h3:has(span) {
      span:focus-visible {
        ${theme.focus.bottom(0, 5)}
        position: relative;
      }
    }

    p:has(span) {
      margin: 2 auto 0.5em;

      span:focus-visible {
        ${theme.focus.bottom(0, 5)}
        position: relative;
      }
    }

    p:has(a) {
      margin: 2 auto 0.5em;

      > a:focus-visible {
        ${theme.focus.bottom(0, 5)}
        position: relative;
      }
    }

    ${theme.mediaQueries.tablet} {
      picture {
        max-width: 80%;
        margin: 8 auto;
      }

      h2 {
        font-size: 22px;
      }
    }
  `}
`

interface RichTextProps {
  body?: { [key: string]: any } | null
  blockWrapper?: React.ComponentType
  wrapper?: React.ComponentType
  imageSizes?: string
  weight?: number
  article?: boolean
}

export const RichText = ({
  body,
  blockWrapper: BlockWrapper,
  wrapper: CustomWrapper,
  imageSizes,
  weight,
  article,
}: RichTextProps) => {
  const currentProductContext = useCurrentProduct()
  const currentProduct = currentProductContext?.product
  const currentVariant = currentProductContext?.currentVariant
  const { openCart } = useCart()
  const { openCustomizationModal, openRingSizerModal } = useModal()
  const openHubspotChat = () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window?.HubSpotConversations?.widget) {
      // @ts-ignore
      window.HubSpotConversations.widget.open()
    }
  }
  const { getLinkByRef } = useShopData()
  const openCustomizationModalWithProduct = () =>
    openCustomizationModal({ currentProduct, currentVariant })

  const openRingSizerModalWithProduct = () =>
    openRingSizerModal({ currentProduct, currentVariant })
  const Wrapper = CustomWrapper || RichTextWrapper

  const components: PortableTextComponents = {
    marks: {
      thin: ({ children }) => <Span fontWeight={100}>{children}</Span>,
      light: ({ children }) => <Span fontWeight={200}>{children}</Span>,
      book: ({ children }) => <Span fontWeight={300}>{children}</Span>,
      regular: ({ children }) => <Span fontWeight={400}>{children}</Span>,
      bold: ({ children }) => <Span fontWeight={700}>{children}</Span>,
      internalLink: ({ children, value }) => {
        const linkData = getLinkByRef(value?.document?._ref)
        if (!linkData) return <>{children}</>
        const { href } = linkData
        return <Link href={href}>{children}</Link>
      },
      action: ({ children, value }) => {
        const { actionType } = value

        const onClick =
          actionType === 'openCart'
            ? () => openCart()
            : actionType === 'launchHubspot'
            ? () => openHubspotChat()
            : actionType === 'launchCustomizationModal'
            ? () => openCustomizationModalWithProduct()
            : actionType === 'launchRingSizerModal'
            ? () => openRingSizerModalWithProduct()
            : null
        if (!actionType) {
          return <>{children}</>
        }
        return (
          <Span role="button" tabIndex={0} cursor="pointer" onClick={onClick}>
            {children}
          </Span>
        )
      },
      textAction: ({ children, value }) => {
        const { actionType } = value

        const onClick =
          actionType === 'openCart'
            ? () => openCart()
            : actionType === 'launchHubspot'
            ? () => openHubspotChat()
            : actionType === 'launchCustomizationModal'
            ? () => openCustomizationModalWithProduct()
            : actionType === 'launchRingSizerModal'
            ? () => openRingSizerModalWithProduct()
            : null
        if (!actionType) {
          return <>{children}</>
        }
        return (
          <Span role="button" tabIndex={0} cursor="pointer" onClick={onClick}>
            {children}
          </Span>
        )
      },
    },
    types: {
      BlockWrapper: BlockWrapper
        ? ({ value }) => <BlockWrapper {...value} />
        : undefined,
      richImage: ({ value }) => (
        <Image image={value} sizes={imageSizes} richImage />
      ),
      form: ({ value }) => (
        <EmbeddedForm block={value} openRingSizerModal={openRingSizerModal} />
      ),
      cloudinaryVideo: ({ value }) => <CloudinaryVideo video={value} />,
      countdown: ({ value }) => {
        return (
          <React.Suspense>
            <CountDown targetDate={value.dateTime} />
          </React.Suspense>
        )
      },
      iframe: ({ value }) => <Iframe code={value.code} />,
    },
    block: {
      h1: ({ children }) => (
        <Heading level={1} weight={weight}>
          {children}
        </Heading>
      ),
      h2: ({ children }) => (
        <Heading level={2} weight={weight}>
          {children}
        </Heading>
      ),
      h3: ({ children }) => (
        <Heading level={3} weight={weight}>
          {children}
        </Heading>
      ),
      h4: ({ children }) => (
        <Heading level={4} weight={weight}>
          {children}
        </Heading>
      ),
      h5: ({ children }) => (
        <Heading level={5} weight={weight}>
          {children}
        </Heading>
      ),
      h6: ({ children }) => (
        <Heading level={6} weight={weight}>
          {children}
        </Heading>
      ),
      blockquote: ({ children }) => <BlockQuote>{children}</BlockQuote>,
      normal: ({ children }) => <P>{children}</P>,
      default: ({ children }) => <P>{children}</P>,
    },
    list: {
      number: ({ children }) => <Ol>{children}</Ol>,
      bullet: ({ children }) => <Ul>{children}</Ul>,
    },
  }

  return body ? (
    <Wrapper article={article}>
      <PortableText value={body} components={components} />
    </Wrapper>
  ) : null
}

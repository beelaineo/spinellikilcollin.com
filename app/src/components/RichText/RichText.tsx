import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import * as BlockContent from '@sanity/block-content-to-react'
import { Heading, Span, P, BlockQuote, Li, Ul, Ol } from '../Text'
import { ListBlock, RichTextBlock } from '../../types'
import { Image } from '../Image'
import { useModal } from '../../providers/ModalProvider'
import { useCurrentProduct } from '../../providers/CurrentProductProvider'
import { useCart } from '../../providers/CartProvider'
import { useShopData } from '../../providers/ShopDataProvider'
import { LinkInfo } from '../../utils'
import { EmbeddedForm } from './EmbeddedForm'
import { CloudinaryVideo } from '../CloudinaryVideo'
import { CountDown } from '../CountDown'

import Link from 'next/link'
import { Maybe } from '@good-idea/unwind-edges'

interface CustomSerializerConfig {
  blockWrapper?: any
  imageSizes?: string
  openCustomizationModal: () => void
  openRingSizerModal: () => void
  openHubspotChat: () => void
  openCart: () => void
  getLinkByRef: (ref: string) => LinkInfo | null
  weight?: number
}

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

/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
const serializers = ({
  blockWrapper: Wrapper,
  imageSizes,
  openCustomizationModal,
  openRingSizerModal,
  openHubspotChat,
  openCart,
  getLinkByRef,
  weight: customWeight,
}: CustomSerializerConfig) => ({
  list: (props: ListBlock) => {
    if (props.type === 'number') {
      return <Ol>{props.children}</Ol>
    }
    return <Ul>{props.children}</Ul>
  },
  marks: {
    thin: ({ children }) => <Span fontWeight={100}>{children}</Span>,
    light: ({ children }) => <Span fontWeight={200}>{children}</Span>,
    book: ({ children }) => <Span fontWeight={300}>{children}</Span>,
    regular: ({ children }) => <Span fontWeight={400}>{children}</Span>,
    bold: ({ children }) => <Span fontWeight={700}>{children}</Span>,
    internalLink: ({ children, mark }) => {
      const linkData = getLinkByRef(mark?.document?._ref)
      if (!linkData) return <>{children}</>
      const { as, href } = linkData
      return <Link href={href}>{children}</Link>
    },
    action: ({ children, mark }) => {
      const { actionType } = mark
      const onClick =
        actionType === 'openCart'
          ? openCart
          : actionType === 'launchHubspot'
          ? () => openHubspotChat()
          : actionType === 'launchCustomizationModal'
          ? () => openCustomizationModal()
          : actionType === 'launchRingSizerModal'
          ? () => openRingSizerModal()
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
  listItem: (props) => <Li weight={3} {...props} />,
  cloudinaryVideo: (props) => {
    const { node } = props
    return <CloudinaryVideo video={node} />
  },
  block: (props: RichTextBlock): React.ReactNode => {
    const { node } = props
    /* If a custom block wrapper was passed in, use it instead.
     * This allows us to change a default P tag into a different size/style */
    // @ts-ignore

    if (Wrapper) return <Wrapper {...props} />
    const weight = customWeight ?? 4

    if (node._type === 'richImage') {
      return <Image image={node} sizes={imageSizes} richImage />
    }
    if (node._type === 'form') {
      return (
        <EmbeddedForm block={node} openRingSizerModal={openRingSizerModal} />
      )
    }
    if (node._type === 'cloudinaryVideo') {
      return <CloudinaryVideo video={node} />
    }

    if (node._type === 'countdown') {
      return (
        <React.Suspense>
          <CountDown targetDate={node.dateTime} />
        </React.Suspense>
      )
    }

    const style = node.style || 'normal'
    // if (props.node._type === 'videoEmbed') return <VideoEmbed video={props.node} />

    switch (style) {
      case 'h1':
        return <Heading level={1} weight={weight} {...props} />
      case 'h2':
        return <Heading level={2} weight={weight} {...props} />
      case 'h3':
        return <Heading level={3} weight={weight} {...props} />
      case 'h4':
        return <Heading level={4} weight={weight} {...props} />
      case 'h5':
        return <Heading level={5} weight={weight} {...props} />
      case 'h6':
        return <Heading level={6} weight={weight} {...props} />
      case 'blockquote':
        return <BlockQuote {...props} />
      case 'normal':
        return <P {...props} />
      default:
        return <P {...props} />
    }
  },
})

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
  blockWrapper,
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
  return body ? (
    <Wrapper article={article}>
      <BlockContent
        blocks={body}
        serializers={serializers({
          blockWrapper,
          imageSizes,
          openCustomizationModal: openCustomizationModalWithProduct,
          openRingSizerModal: openRingSizerModalWithProduct,
          getLinkByRef,
          openCart,
          openHubspotChat,
          weight,
        })}
      />
    </Wrapper>
  ) : null
}

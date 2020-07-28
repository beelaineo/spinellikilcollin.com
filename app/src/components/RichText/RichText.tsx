import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import Link from 'next/link'
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

interface CustomSerializerConfig {
  blockWrapper?: React.ComponentType
  imageSizes?: string
  openCustomizationModal: () => void
  openRingSizerModal: () => void
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
      const { href, as } = linkData
      return (
        <Link href={href} as={as}>
          <a>{children}</a>
        </Link>
      )
      return null
    },
    action: ({ children, mark }) => {
      const { actionType } = mark
      const onClick =
        actionType === 'openCart'
          ? openCart
          : actionType === 'launchCustomizationModal'
          ? () => openCustomizationModal()
          : actionType === 'launchRingSizerModal'
          ? () => openRingSizerModal()
          : null
      if (!actionType) {
        console.warn(`Action type "${actionType}" is not a valid option`)
        return <>{children}</>
      }
      return (
        <Span role="button" cursor="pointer" onClick={onClick}>
          {children}
        </Span>
      )
    },
  },
  listItem: (props) => <Li weight={3} {...props} />,
  block: (props: RichTextBlock): React.ReactNode => {
    const { node } = props
    /* If a custom block wrapper was passed in, use it instead.
     * This allows us to change a default P tag into a different size/style */
    if (Wrapper) return <Wrapper {...props} />
    const weight = customWeight ?? 4

    if (node._type === 'richImage') {
      return <Image image={node} sizes={imageSizes} />
    }
    if (node._type === 'form') {
      return <EmbeddedForm block={node} />
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
  const { getLinkByRef } = useShopData()
  const openCustomizationModalWithProduct = () =>
    openCustomizationModal({ currentProduct, currentVariant })
  const Wrapper = CustomWrapper || RichTextWrapper
  return body ? (
    <Wrapper article={article}>
      <BlockContent
        blocks={body}
        serializers={serializers({
          blockWrapper,
          imageSizes,
          openCustomizationModal: openCustomizationModalWithProduct,
          openRingSizerModal,
          getLinkByRef,
          openCart,
          weight,
        })}
      />
    </Wrapper>
  ) : null
}

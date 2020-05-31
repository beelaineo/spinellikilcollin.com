import * as React from 'react'
import styled from '@xstyled/styled-components'
import Link from 'next/link'
import * as BlockContent from '@sanity/block-content-to-react'
import { Heading, Span, P, BlockQuote, Li, Ul, Ol } from '../Text'
import { Image } from '../Image'
import { useModal, ModalName } from '../../providers/ModalProvider'
import { useCart } from '../../providers/CartProvider'
import { useShopData } from '../../providers/ShopDataProvider'
import { LinkInfo } from '../../utils'

interface CustomSerializerConfig {
  blockWrapper?: React.ComponentType
  imageSizes?: string
  openModal: (name: ModalName) => void
  openCart: () => void
  getLinkByRef: (ref: string) => LinkInfo | null
  weight?: number
}

const RichTextWrapper = styled.div`
  line-height: 1.4em;
`

/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
const serializers = ({
  blockWrapper: Wrapper,
  imageSizes,
  openModal,
  openCart,
  getLinkByRef,
  weight: customWeight,
}: CustomSerializerConfig) => ({
  list: (props) => {
    if (props.type === 'number') return <Ol {...props} />
    return <Ul {...props} />
  },
  marks: {
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
          ? () => openModal('customization')
          : actionType === 'launchRingSizerModal'
          ? () => openModal('ringSizer')
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
  listItem: (props) => <Li {...props} />,
  block: (props): React.ReactNode => {
    /* If a custom block wrapper was passed in, use it instead.
     * This allows us to change a default P tag into a different size/style */
    if (Wrapper) return <Wrapper {...props} />
    const weight = customWeight ?? 4

    const style = props.node.style || 'normal'
    if (/image|richImage/.test(props.node._type)) {
      return <Image image={props.node} sizes={imageSizes} />
    }
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
}

export const RichText = ({
  body,
  blockWrapper,
  wrapper: CustomWrapper,
  imageSizes,
  weight,
}: RichTextProps) => {
  const { openCart } = useCart()
  const { openModal } = useModal()
  const { getLinkByRef } = useShopData()
  const Wrapper = CustomWrapper || RichTextWrapper
  return body ? (
    <Wrapper>
      <BlockContent
        blocks={body}
        serializers={serializers({
          blockWrapper,
          imageSizes,
          openModal,
          getLinkByRef,
          openCart,
          weight,
        })}
      />
    </Wrapper>
  ) : null
}

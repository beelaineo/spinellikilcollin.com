import * as React from 'react'
import {
  Label,
  Wrapper,
  Inner,
  Item,
  ProductButton,
  ProductImageWrapper,
  StatusWrapper,
  TextWrapper,
} from './styled'
import { useEffect, useRef } from 'react'
import { PlusMinus } from '../PlusMinus'
import { useDebounce } from 'react-use'
import { Product, RichImage, SanityRawImage, ShopifyImage } from '../../types'
import { Heading } from '../Text'
import { Image } from '../Image'
import { useMedia } from '../../hooks'
import { ImageGallery } from '../ImageGallery'

interface SanityProduct extends Product {
  images?: RichImage[] | ShopifyImage[]
}

interface AccordionProps {
  label?: string
  children?: React.ReactNode
  product?: SanityProduct
}

export const Accordion = ({ label, product, children }: AccordionProps) => {
  const [open, setOpen] = React.useState(false)
  const shouldOpen = false
  const toggleOpen = () => setOpen(!open)

  const isMobile = useMedia({
    maxWidth: '650px',
  })

  const [height, updateHeight] = React.useState(0)

  const refContainer = useRef<HTMLDivElement>(null)

  const coverImage = product?.images
    ? product?.images[product.images.length - 1]
    : null

  const productSizes = product?.options?.find(
    (option) => option?.name === 'Size',
  )

  const productSize = productSizes?.values?.[0]?.value ?? null

  useDebounce(
    () => {
      const element = refContainer?.current

      if (!element) return

      const observer = new ResizeObserver(() => {
        if (!refContainer.current) return

        updateHeight(refContainer.current.clientHeight)
      })

      observer.observe(element)

      return () => {
        observer.disconnect()
      }
    },
    300,
    [],
  )

  useEffect(() => {
    if (open || !shouldOpen) return

    setTimeout(() => {
      if (label !== 'Description') return

      setOpen(label === 'Description')
    }, 3000)
  }, [label])

  const renderProductButton = () => {
    return (
      <ProductButton>
        {isMobile ? (
          <ImageGallery
            hideThumbnails={!open}
            product={product}
            onClick={!open ? toggleOpen : null}
          />
        ) : (
          <ProductImageWrapper open={open} onClick={!open ? toggleOpen : null}>
            {coverImage && <Image image={coverImage} ratio={0.5} />}
          </ProductImageWrapper>
        )}
        <TextWrapper onClick={!open ? toggleOpen : null} open={open}>
          <Heading level={3}>
            {product?.title}
            {productSize && (
              <span
                style={{
                  fontSize: '0.68em',
                  fontStyle: 'italic',
                  paddingLeft: '1em',
                }}
              >
                Size {productSize}
              </span>
            )}
          </Heading>
          <StatusWrapper onClick={toggleOpen}>
            <Heading level={5}>{open ? `close` : `expand`}</Heading>
            <PlusMinus open={open} />
          </StatusWrapper>
        </TextWrapper>
      </ProductButton>
    )
  }

  return (
    <Wrapper isProduct={Boolean(product)} open={open}>
      {label && (
        <Label onClick={toggleOpen}>
          {label}
          <PlusMinus open={open} />
        </Label>
      )}
      {product && renderProductButton()}

      <Inner tabIndex={-1} open={open} height={height}>
        <Item ref={refContainer} isProduct={Boolean(product)}>
          {children}
        </Item>
      </Inner>
    </Wrapper>
  )
}

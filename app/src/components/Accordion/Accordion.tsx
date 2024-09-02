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
import { Product } from '../../types'
import { Heading } from '../Text'
import { Image } from '../Image'

interface AccordionProps {
  label?: string
  children?: React.ReactNode
  product?: Product
}

export const Accordion = ({ label, product, children }: AccordionProps) => {
  const [open, setOpen] = React.useState(false)
  const shouldOpen = false
  const toggleOpen = () => setOpen(!open)

  const [height, updateHeight] = React.useState(0)

  const refContainer = useRef<HTMLDivElement>(null)

  console.log(product)

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
      <ProductButton onClick={toggleOpen}>
        <ProductImageWrapper>
          {product?.store?.images && (
            <Image image={product.store.images[0]} ratio={0.6} />
          )}
        </ProductImageWrapper>
        <TextWrapper>
          <Heading level={4}>{product?.title}</Heading>
          <StatusWrapper>
            <Heading level={5}>{open ? `close` : `expand`}</Heading>
            <PlusMinus open={open} />
          </StatusWrapper>
        </TextWrapper>
      </ProductButton>
    )
  }

  return (
    <Wrapper isProduct={Boolean(product)}>
      {label && (
        <Label onClick={toggleOpen}>
          {label}
          <PlusMinus open={open} />
        </Label>
      )}
      {product && renderProductButton()}

      <Inner tabIndex={-1} open={open} height={height}>
        <Item ref={refContainer}>{children}</Item>
      </Inner>
    </Wrapper>
  )
}

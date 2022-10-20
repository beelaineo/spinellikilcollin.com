import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { useModal } from '../../../providers/ModalProvider'
import InternationalIcon from '../../../svg/International.svg'
import { Heading } from '../../../components/Text'

import { ShopifyProduct, ShopifyProductVariant } from '../../../types'
import { CheckoutLineItemInput } from '../../../providers/ShopifyProvider/types/checkout'

interface SizeConverterButtonProps {
  mobile?: boolean
  product: ShopifyProduct
  variant: ShopifyProductVariant
  addLineItem?: (lineItem: CheckoutLineItemInput) => Promise<void>
  openRingSizerModal?: ({
    currentProduct: ShopifyProduct,
    currentVariant: ShopifyProductVariant,
  }) => void
}

interface WithMobile {
  mobile?: boolean
}

const Wrapper = styled.button<WithMobile>`
  ${({ mobile, theme }) => css`
    display: ${mobile ? 'none' : 'flex'};
    justify-content: center;
    align-items: center;
    height: 32px;

    svg {
      margin-right: 2;
      height: 29px;
      width: 29px;
    }

    ${theme.mediaQueries.tablet} {
      display: ${mobile ? 'flex' : 'none'};
      margin: 4 0 0;
      padding: 0;
    }
  `}
`

export const SizeConverterButton = ({
  mobile,
  product,
  variant,
  addLineItem,
}: SizeConverterButtonProps) => {
  const { openSizeConverterModal } = useModal()
  const { openRingSizerModal } = useModal()
  const handleClick = () =>
    openSizeConverterModal({
      currentProduct: product,
      currentVariant: variant,
      addLineItem: addLineItem,
      openRingSizerModal: openRingSizerModal,
    })
  return (
    <Wrapper mobile={mobile} onClick={handleClick}>
      <InternationalIcon />
      <Heading m={0} level={5} textDecoration="underline">
        International Sizing
      </Heading>
    </Wrapper>
  )
}

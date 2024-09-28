import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { useModal } from '../../../providers/ModalProvider'
import RingSizerIcon from '../../../svg/RingSizer.svg'
import { Heading } from '../../../components/Text'

import { Product, ShopifyProductVariant } from '../../../types'

interface RingSizerButtonProps {
  mobile?: boolean
  product: Product
  variant: ShopifyProductVariant
}

interface WithMobile {
  $mobile?: boolean
}

const Wrapper = styled.button<WithMobile>`
  ${({ $mobile, theme }) => css`
    position: relative;
    display: ${$mobile ? 'none' : 'flex'};
    justify-content: center;
    align-items: center;
    height: 32px;

    svg {
      margin-right: 2;
    }

    ${theme.mediaQueries.tablet} {
      display: ${$mobile ? 'flex' : 'none'};
      margin: 4 0 0;
      padding: 0;
    }
  `}
`

export const RingSizerButton = ({
  mobile,
  product,
  variant,
}: RingSizerButtonProps) => {
  const { openRingSizerModal } = useModal()
  const handleClick = () =>
    openRingSizerModal({ currentProduct: product, currentVariant: variant })
  return (
    <Wrapper $mobile={mobile} onClick={handleClick}>
      <RingSizerIcon />
      <Heading m={0} level={5} textDecoration="underline">
        Request a sizer
      </Heading>
    </Wrapper>
  )
}

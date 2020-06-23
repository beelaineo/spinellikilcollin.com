import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { useModal } from '../../../providers/ModalProvider'
import RingSizerIcon from '../../../svg/RingSizer.svg'
import { Heading } from '../../../components/Text'

import { ShopifyProduct } from '../../../types'

interface RingSizerButtonProps {
  mobile?: boolean
  product: ShopifyProduct
}

interface WithMobile {
  mobile?: boolean
}

const Wrapper = styled.button<WithMobile>`
  ${({ mobile, theme }) => css`
    padding: 0 3;
    display: ${mobile ? 'none' : 'flex'};
    justify-content: center;
    align-items: center;
    height: 32px;

    svg {
      margin-right: 2;
    }

    ${theme.mediaQueries.tablet} {
      display: ${mobile ? 'flex' : 'none'};
      margin: 3 0 0;
      padding: 0;
    }
  `}
`

export const RingSizerButton = ({ mobile }: RingSizerButtonProps) => {
  const { openRingSizerModal } = useModal()
  const handleClick = () => openRingSizerModal()
  return (
    <Wrapper mobile={mobile} onClick={handleClick}>
      <RingSizerIcon />
      <Heading m={0} level={4} textDecoration="underline">
        Request a sizer
      </Heading>
    </Wrapper>
  )
}

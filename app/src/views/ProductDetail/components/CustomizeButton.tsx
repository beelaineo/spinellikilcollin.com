import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import WeddingCustomizeIcon from '../../../svg/WeddingCustomize.svg'
import { Heading } from '../../../components/Text'
import Link from 'next/link'
import { useModal } from '../../../providers'
import { ShopifyProduct, ShopifyProductVariant } from '../../../types'

interface CustomizeButtonProps {
  mobile?: boolean
  product: ShopifyProduct
  variant: ShopifyProductVariant
  wedding?: boolean
}

interface WithMobile {
  mobile?: boolean
}

const Wrapper = styled.button<WithMobile>`
  ${({ mobile, theme }) => css`
    position: relative;
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

export const CustomizeButton = ({
  mobile,
  product,
  variant,
  wedding,
}: CustomizeButtonProps) => {
  const { openWeddingModal, openCustomizationModal } = useModal()

  return (
    <Wrapper mobile={mobile}>
      <WeddingCustomizeIcon />
      <Heading m={0} level={5} textDecoration="underline">
        <span
          onClick={() =>
            wedding
              ? openWeddingModal({
                  currentProduct: product,
                  currentVariant: variant,
                })
              : openCustomizationModal({
                  currentProduct: product,
                  currentVariant: variant,
                })
          }
        >
          Customize
        </span>
      </Heading>
    </Wrapper>
  )
}

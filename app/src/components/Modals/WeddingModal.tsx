import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { ShopifyProduct, ShopifyProductVariant } from '../../types'
import { Modal } from '../Modal'
import { Heading } from '../Text'

interface WeddingModalProps {
  closeModal: () => void
  product?: ShopifyProduct
  variant?: ShopifyProductVariant
}

const Main = styled('div')`
  ${({ theme }) => css`
    position: relative;
    min-height: 180px;
    border-top: 1px solid ${theme.colors.grays[5]};
    border-bottom: 1px solid ${theme.colors.grays[5]};
    margin: 3 0;
    padding: 5 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'cut color'
      'precision clarity';
  `}
`
const Footer = styled('div')`
  display: flex;
  justify-content: space-between;
`

export const WeddingModal = ({
  closeModal,
  product,
  variant,
}: WeddingModalProps) => {
  return (
    <Modal closeModal={closeModal}>
      <header>
        <Heading level={4} weight={2} mb={0} mt={0}>
          Wedding
        </Heading>
      </header>
      <Main></Main>
      <Footer></Footer>
    </Modal>
  )
}

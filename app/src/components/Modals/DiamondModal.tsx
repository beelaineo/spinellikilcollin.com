import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import {
  ShopifyProduct,
  ShopifyProductVariant,
  ShopifySourceSelectedOption,
} from '../../types'
import { Modal } from '../Modal'
import { Heading } from '../../components/Text'
import Link from 'next/link'
import DiamondOutline from '../../svg/Diamond.svg'

interface DiamondModalProps {
  closeModal: () => void
  product?: ShopifyProduct
  variant?: ShopifyProductVariant
  diamond?: ShopifySourceSelectedOption
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
const CutWrapper = styled('div')`
  grid-area: cut;
`
const ColorWrapper = styled('div')`
  grid-area: color;
  text-align: right;
`
const PrecisionWrapper = styled('div')`
  grid-area: precision;
  align-self: flex-end;
`
const ClarityWrapper = styled('div')`
  grid-area: clarity;
  text-align: right;
  align-self: flex-end;
`
const CaratLabelWrapper = styled('div')`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  pointer-events: none;
  justify-content: center;
  align-items: center;
`

const DiamondOutlineWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  svg {
    width: 50%;
    max-height: 140px;
    path {
      stroke-width: 1;
    }
  }
  }
`

export const DiamondModal = ({
  closeModal,
  product,
  variant,
  diamond,
}: DiamondModalProps) => {
  const d = diamond?.value
  const stones = product?.options?.find((o) => o?.name === 'Carat')?.values
  const stone = stones?.find((s) => s?.value === d)
  return (
    <Modal closeModal={closeModal} display={'diamond'}>
      <header>
        <Heading level={4} weight={2} mb={0} mt={0}>
          Diamond Certification
        </Heading>
      </header>
      <Main>
        {stone?.stone?.cut ? (
          <CutWrapper>
            <Heading level={5} my={0} textTransform="uppercase">
              Cut:
            </Heading>
            <Heading level={5} my={0} maxWidth={75} fontStyle="italic">
              {stone.stone.cut}
            </Heading>
          </CutWrapper>
        ) : null}
        {stone?.stone?.color ? (
          <ColorWrapper>
            <Heading level={5} my={0} textTransform="uppercase">
              Color: {stone.stone.color}
            </Heading>
          </ColorWrapper>
        ) : null}
        {stone?.stone?.precision ? (
          <PrecisionWrapper>
            <Heading level={5} my={0} textTransform="uppercase">
              Cut Precision:
            </Heading>
            <Heading level={5} my={0} fontStyle="italic">
              {stone.stone.precision}
            </Heading>
          </PrecisionWrapper>
        ) : null}
        {stone?.stone?.clarity ? (
          <ClarityWrapper>
            <Heading level={5} weight={2} my={0} textTransform="uppercase">
              Clarity: {stone.stone.clarity}
            </Heading>
          </ClarityWrapper>
        ) : null}
        <DiamondOutlineWrapper>
          <DiamondOutline />
          {stone?.stone?.carat ? (
            <CaratLabelWrapper>
              <Heading level={5} my={0} pb={5}>
                {stone.stone.carat} Carats
              </Heading>
            </CaratLabelWrapper>
          ) : null}
        </DiamondOutlineWrapper>
      </Main>
      <Footer>
        {stone?.stone?.gia_number ? (
          <Heading level={5} my={0}>
            GIA# {stone.stone.gia_number}
          </Heading>
        ) : null}
        {stone?.stone?.gia_link ? (
          <Link href={stone.stone.gia_link}>
            <a>
              <Heading level={5} my={0} fontStyle="italic">
                View on GIA →
              </Heading>
            </a>
          </Link>
        ) : null}
      </Footer>
    </Modal>
  )
}

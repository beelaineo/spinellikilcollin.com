import styled, { css, DefaultTheme } from '@xstyled/styled-components'

interface CartModalProps {
  open: boolean
}

export const CartModal = styled.div`
  ${({ open }: CartModalProps) => css`
    opacity: ${open ? '1' : '0'};
    pointer-events; ${open ? 'initial' : 'none'};
  `}
`

export const CheckoutProductWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-gap: 1;
  margin: 2;
`

export const CheckoutItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3;
`

export const CheckoutItemImage = styled.img`
  flex: 1 1 33%;
  max-width: 33%;
`

export const CheckoutItemInfo = styled.div`
  margin: 3;
  flex: 6;
`

export const CheckoutPrice = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    flex-basis: 50%;
  }
`

export const RemoveCart = styled.div`
  &:hover {
    cursor: pointer;
  }
`

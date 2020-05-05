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
  grid-template-columns: 2fr 1fr;
  grid-gap: 1;
  margin: 2;
`

export const CheckoutItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3;
`

export const CheckoutItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`

export const RemoveCart = styled.button`
  &:hover {
    cursor: pointer;
  }
`

interface QuantitySelectorProps {
  theme: DefaultTheme
  width?: string
}

export const QuantitySelector = styled.div`
  button {
    text-align-last: center;
    height: 50px;
    border: 1px solid body.1;
    border-radius: 0;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    font-size: 0.85rem;
    cursor: pointer;
    -moz-appearance: none;
    appearance: none;
    -webkit-appearance: none;
    border: none;
    background: none;
    border-radius: 0;
    border: 1px solid body.1;
    padding: 0.5rem 1.2rem;
    font-family: sans-serif;
  }
  input {
    text-align: center;
    width: 109px;
  }
`

export const QuantitySelectorCart = styled(QuantitySelector)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

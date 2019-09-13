import * as React from 'react'
import { fireEvent } from '@testing-library/react'
import { render } from '../../../../test-utils/render'
import { BuyButton } from '../BuyButton'

const variant = { id: '1', availableForSale: true, title: 'Variant 1' }

const addItemToCheckout = jest.fn()

afterEach(() => {
  addItemToCheckout.mockReset()
})

describe('Buy Button', () => {
  it('should disable the button when the no variant is provided', () => {
    const { container } = render(
      <BuyButton addItemToCheckout={addItemToCheckout} />,
    )
    const btn = container.querySelectorAll('button')[0]
    fireEvent.click(btn)
    expect(addItemToCheckout.mock.calls.length).toBe(0)
  })

  it('should display "out of stock" when the variant is not for sale', () => {
    const nfs = {
      ...variant,
      availableForSale: false,
    }
    const { container, debug } = render(
      <BuyButton currentVariant={nfs} addItemToCheckout={addItemToCheckout} />,
    )
    expect(container.textContent).toBe('Out of stock')
    const btn = container.querySelectorAll('button')[0]
    expect(btn).toBe(undefined)
    expect(addItemToCheckout.mock.calls.length).toBe(0)
  })

  it('should call `addItemToCheckout` when clicked (default qty of 1)', () => {
    const { container } = render(
      <BuyButton
        currentVariant={variant}
        addItemToCheckout={addItemToCheckout}
      />,
    )
    const btn = container.querySelectorAll('button')[0]
    fireEvent.click(btn)
    expect(addItemToCheckout.mock.calls[0][0]).toEqual({
      variantId: variant.id,
      quantity: 1,
    })
  })

  it('should call `addItemToCheckout` when clicked with the correct quantity', () => {
    const { container } = render(
      <BuyButton
        currentVariant={variant}
        addItemToCheckout={addItemToCheckout}
        quantity={3}
      />,
    )
    const btn = container.querySelectorAll('button')[0]
    fireEvent.click(btn)
    expect(addItemToCheckout.mock.calls[0][0]).toEqual({
      variantId: variant.id,
      quantity: 3,
    })
  })
})

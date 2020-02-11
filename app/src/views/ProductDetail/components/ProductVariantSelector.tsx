import * as React from 'react'
import { UseProductVariant } from 'use-shopify'
import {
  Select,
  Label,
  NormalizeDiv,
  QuantitySelector,
  Button,
} from '../styled'
import { ShopifyProduct, ShopifyProductVariant } from '../../../types'
import { QuantityInput } from '../../../components/QuantityInput'
import { Accordion } from '../../../components/Accordion'

interface Props extends UseProductVariant {
  variants: ShopifyProductVariant[]
  product: ShopifyProduct
  quantity: number
  increment: () => void
  decrement: () => void
  setQuantity: (q: number) => void
}

const mockSizes = [1, 2, 3, 4, 5, 6]
/**
 * ProductVariantSelector
 *
 * - renders a menu, series of buttons, or other UI to select a variant
 * - highlights the current variant
 * - does not render anything if there is only one variant
 */

export const ProductVariantSelector = (props: Props) => {
  const {
    variants,
    currentVariant,
    selectVariant,
    quantity,
    setQuantity,
    increment,
    decrement,
    product,
  } = props
  if (!variants.length) return null
  const handleSelect = (e) => {
    selectVariant(e.target.value)
  }
  const handleQuantityInput = (e) => setQuantity(e.target.value)

  // information for accordions
  const description = product?.sourceData?.description
  return (
    <div>
      <NormalizeDiv margin="20px 0">
        <Accordion
          // @ts-ignore
          content={{ title: 'size', bodyRaw: mockSizes }}
        />
        <Accordion
          // @ts-ignore
          content={{ title: 'description', bodyRaw: description }}
        />
        <Accordion
          label={'Shipping'}
          // @ts-ignore
          content={{ title: 'Shipping' }}
        />
        {/* <Label>Size</Label> */}
        {/* <Select
          onChange={handleSelect}
          value={currentVariant.id}
          id="size"
          name="product-size"
        >
          {variants.map((variant) => {
            return (
              <option key={variant.id} value={variant.id}>
                {variant.title}
              </option>
            )
          })}
        </Select> */}
      </NormalizeDiv>
      <NormalizeDiv>
        {/* <Label>Quantity</Label>
        <QuantitySelector width={'52px'}>
          <button type="button" onClick={decrement}>
            <span>&#8722;</span>
          </button>
          <QuantityInput quantity={quantity} setQuantity={setQuantity} />
          <button type="button" onClick={increment}>
            <span>&#43;</span>
          </button>
        </QuantitySelector> */}
        <Button width="100%" background="lightGraybackground" color="dark">
          CUSTOMIZATION
        </Button>
      </NormalizeDiv>
    </div>
  )
}

import * as React from 'react'
import { Modal } from '../Modal'
import { SizeConverterForm } from '../Forms'
import { ShopifyProduct, ShopifyProductVariant } from '../../types'
import { CheckoutLineItemInput } from '../../providers/ShopifyProvider/types'

interface SizeConverterModalProps {
  closeModal: () => void
  product: ShopifyProduct
  addLineItem?: (lineItem: CheckoutLineItemInput) => Promise<void>
  openRingSizerModal?: ({
    currentProduct: ShopifyProduct,
    currentVariant: ShopifyProductVariant,
  }) => void
}

export const SizeConverterModal = ({
  product,
  closeModal,
  addLineItem,
  openRingSizerModal,
}: SizeConverterModalProps) => {
  return (
    <Modal closeModal={closeModal} display={'sizeConverter'}>
      <SizeConverterForm
        currentProduct={product}
        addLineItem={addLineItem}
        openRingSizerModal={openRingSizerModal}
        closeModal={closeModal}
      />
    </Modal>
  )
}

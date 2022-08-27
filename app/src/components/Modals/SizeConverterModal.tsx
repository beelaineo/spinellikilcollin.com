import * as React from 'react'
import { Modal } from '../Modal'
import { SizeConverterForm } from '../Forms'
import { ShopifyProduct, ShopifyProductVariant } from '../../types'
import { CheckoutLineItemInput } from '../../providers/ShopifyProvider/types'

interface SizeConverterModalProps {
  closeModal: () => void
  product?: ShopifyProduct
  variant?: ShopifyProductVariant
  addLineItem?: (lineItem: CheckoutLineItemInput) => Promise<void>
  openRingSizerModal?: ({
    currentProduct: ShopifyProduct,
    currentVariant: ShopifyProductVariant,
  }) => void
}

export const SizeConverterModal = ({
  product,
  variant,
  closeModal,
  addLineItem,
  openRingSizerModal,
}: SizeConverterModalProps) => {
  const initialSize = variant?.sourceData?.selectedOptions?.filter(
    (o) => o?.name == 'Size',
  )[0]?.value

  return (
    <Modal closeModal={closeModal} display={'sizeConverter'}>
      <SizeConverterForm
        initialSize={initialSize}
        currentVariant={variant}
        currentProduct={product}
        addLineItem={addLineItem}
        openRingSizerModal={openRingSizerModal}
        closeModal={closeModal}
      />
    </Modal>
  )
}

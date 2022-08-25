import * as React from 'react'
import { Modal } from '../Modal'
import { SizeConverterForm } from '../Forms'
import { ShopifyProduct, ShopifyProductVariant } from '../../types'

interface SizeConverterModalProps {
  closeModal: () => void
  product?: ShopifyProduct
  variant?: ShopifyProductVariant
}

export const SizeConverterModal = ({
  product,
  variant,
  closeModal,
}: SizeConverterModalProps) => {
  const initialSize = variant?.sourceData?.selectedOptions?.filter(
    (o) => o?.name == 'Size',
  )[0]?.value

  return (
    <Modal closeModal={closeModal} display={'sizeConverter'}>
      <SizeConverterForm initialSize={initialSize} currentVariant={variant} />
    </Modal>
  )
}

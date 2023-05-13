import * as React from 'react'
import { ShopifyProduct, ShopifyProductVariant } from '../../types'
import { Modal } from '../Modal'
import { WeddingCustomizationForm } from '../Forms'

interface WeddingModalProps {
  closeModal: () => void
  product?: ShopifyProduct
  variant?: ShopifyProductVariant
}

export const WeddingModal = ({
  closeModal,
  product,
  variant,
}: WeddingModalProps) => {
  return (
    <Modal closeModal={closeModal}>
      <WeddingCustomizationForm product={product} variant={variant} />
    </Modal>
  )
}

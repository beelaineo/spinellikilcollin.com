import * as React from 'react'
import { Product, ShopifyProductVariant } from '../../types'
import { Modal } from '../Modal'
import { HighValueForm } from '../Forms'

interface CustomizationModalProps {
  closeModal: () => void
  product?: Product
  variant?: ShopifyProductVariant
}

export const HighValueCustomizationModal = ({
  closeModal,
  product,
  variant,
}: CustomizationModalProps) => {
  return (
    <Modal closeModal={closeModal}>
      <HighValueForm product={product} variant={variant} />
    </Modal>
  )
}

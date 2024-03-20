import * as React from 'react'
import { Product, ShopifyProductVariant } from '../../types'
import { Modal } from '../Modal'
import { CustomizationForm } from '../Forms'

interface CustomizationModalProps {
  closeModal: () => void
  product?: Product
  variant?: ShopifyProductVariant
}

export const CustomizationModal = ({
  closeModal,
  product,
  variant,
}: CustomizationModalProps) => {
  return (
    <Modal closeModal={closeModal}>
      <CustomizationForm product={product} variant={variant} />
    </Modal>
  )
}

import * as React from 'react'
import { ShopifyProduct, ShopifyProductVariant } from '../../types'
import { Modal } from '../Modal'
import { CustomizationForm } from '../Forms'

interface DiamondModalProps {
  closeModal: () => void
  product?: ShopifyProduct
  variant?: ShopifyProductVariant
}

export const DiamondModal = ({
  closeModal,
  product,
  variant,
}: DiamondModalProps) => {
  return (
    <Modal closeModal={closeModal}>
      <h2>Diamond Certification</h2>
    </Modal>
  )
}

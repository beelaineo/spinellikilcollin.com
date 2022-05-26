import * as React from 'react'
import { Modal } from '../Modal'
import { RingSizerForm } from '../Forms'
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
  return (
    <Modal closeModal={closeModal}>
      <h2>Size Converter</h2>
    </Modal>
  )
}

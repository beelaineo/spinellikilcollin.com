import * as React from 'react'
import { Modal } from '../Modal'
import { RingSizerForm } from '../Forms'
import { ShopifyProduct, ShopifyProductVariant } from '../../types'

interface RingSizerModalProps {
  closeModal: () => void
  product?: ShopifyProduct
  variant?: ShopifyProductVariant
}

export const RingSizerModal = ({
  product,
  variant,
  closeModal,
}: RingSizerModalProps) => {
  return (
    <Modal closeModal={closeModal}>
      <RingSizerForm product={product} variant={variant} />
    </Modal>
  )
}

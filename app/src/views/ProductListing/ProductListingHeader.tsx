import * as React from 'react'
import { Heading } from '../../components/Text'
import { ShopifyCollection } from '../../types'

interface ProductListingHeaderProps {
  collection: ShopifyCollection
}

export const ProductListingHeader = ({
  collection,
}: ProductListingHeaderProps) => {
  const { title, sourceData } = collection
  const { description } = sourceData || {}
  return (
    <div>
      <Heading level={3}>{title}</Heading>
      <p>{description}</p>
    </div>
  )
}

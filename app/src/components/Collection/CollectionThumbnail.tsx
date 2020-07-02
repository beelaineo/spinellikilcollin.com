import * as React from 'react'
import Link from 'next/link'
import { ShopifyCollection } from '../../types'
import { ImageWrapper, TextWrapper } from './styled'
import { Image } from '../Image'
import { Heading } from '../Text'

interface CollectionThumbnailProps {
  collection: ShopifyCollection
}

export const CollectionThumbnail = ({
  collection,
}: CollectionThumbnailProps) => {
  const to = `/collections/${collection.handle}`
  return (
    <Link href="/collections/[collectionSlug]" as={to}>
      <a>
        <ImageWrapper>
          <Image image={collection?.sourceData?.image} ratio={1} />
        </ImageWrapper>
        <TextWrapper>
          <Heading level={4}>{collection.title}</Heading>
          {collection.products && collection.products.length ? (
            <Heading level={6}>{collection.products.length} items</Heading>
          ) : null}
        </TextWrapper>
      </a>
    </Link>
  )
}

import * as React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { ShopifyCollection } from '../../src/types'
import { NotFound, ProductListing } from '../../src/views'
import { shopifyImageFragment } from '../../src/graphql'

interface CollectionQueryResult {
  allShopifyCollections: [ShopifyCollection]
}

export const collectionQuery = gql`
  query allShopifyCollections {
    _id
  }
`
// ${shopifyImageFragment}

export interface CollectionResult {
  Collection: ShopifyCollection
}

function head<T>(arr: T[]): T {
  return arr ? arr[0] : undefined
}

// interface CollectionPageProps {
//
// }

const Collection = (props: any) => {
  console.log(props)
  // const { loading, error, data } = useQuery<CollectionQueryResult>(collectionQuery)
  return null
  // if (!collectionData) return <NotFound />
  // return <ProductListing collection={collectionData} />
}

export default Collection

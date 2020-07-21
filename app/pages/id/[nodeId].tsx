import * as React from 'react'
import Router from 'next/router'
import { GetServerSideProps } from 'next'
import { ShopifyProduct, ShopifyCollection } from '../../src/types'
import { sanityQuery } from '../../src/services/sanity'
import { NotFound } from '../../src/views'

const nodeQuery = `
*[_id == $id] {
  _type,
  handle
}
`

function Node() {
  return <NotFound />
}

export async function getServerSideProps(ctx): Promise<GetServerSideProps> {
  const { res, params } = ctx
  // @ts-ignore
  if (!params?.nodeId) return {}
  const variables = {
    id: params?.nodeId,
  }
  const docs = await sanityQuery<ShopifyCollection[] | ShopifyProduct[]>(
    nodeQuery,
    variables,
  )
  const doc = docs[0]
  if (!doc) {
    res.setHeader('location', '/login')
  } else {
    const pathOne =
      doc._type === 'shopifyCollection'
        ? 'collections'
        : doc._type === 'shopifyProduct'
        ? 'products'
        : null
    const path = '/'.concat([pathOne, doc.handle].filter(Boolean).join('/'))
    res.setHeader('location', path)
  }
  res.statusCode = 302
  res.end()
  // @ts-ignore
  return { props: {} }
}

export default Node

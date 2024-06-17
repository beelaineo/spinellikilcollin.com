import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps } from 'next'
import { Maybe, NewCustomer as NewCustomerType } from '../../src/types'
import { NotFound } from '../../src/views/NotFound'
import { NewCustomer as NewCustomerView } from '../../src/views/NewCustomer'
import { request, seoFragment, richImageFragment } from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'

const newCustomerQuery = gql`
  query NewCustomerQuery {
    NewCustomer(id: "newCustomer") {
      _id
      _type
      title
      backgroundImage {
        ...RichImageFragment
      }
      seo {
        ...SeoFragment
      }
    }
  }
  ${seoFragment}
  ${richImageFragment}
`

interface NewCustomerProps {
  newCustomer?: NewCustomerType
}

const NewCustomer = ({ newCustomer }: NewCustomerProps) => {
  if (!newCustomer) return <NotFound />
  return <NewCustomerView newCustomer={newCustomer} />
}

interface NewCustomerResponse {
  NewCustomer?: Maybe<NewCustomerType>
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async () => {
  const [response, shopData] = await Promise.all([
    request<NewCustomerResponse>(newCustomerQuery),
    requestShopData(),
  ])

  const newCustomer = response?.NewCustomer || null
  return { props: { newCustomer, shopData } }
}

export default NewCustomer

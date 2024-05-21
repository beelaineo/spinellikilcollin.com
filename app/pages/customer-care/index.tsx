import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps } from 'next'
import { Maybe, CustomerCare as CustomerCareType } from '../../src/types'
import { NotFound } from '../../src/views/NotFound'
import { CustomerCare as CustomerCareView } from '../../src/views/CustomerCare'
import { request, richImageFragment, seoFragment } from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'

const customerCareQuery = gql`
  query CustomerCareQuery {
    CustomerCare(id: "customerCare") {
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

interface CustomerCareProps {
  customerCare?: CustomerCareType
}

const CustomerCare = ({ customerCare }: CustomerCareProps) => {
  if (!customerCare) return <NotFound />
  return <CustomerCareView customerCare={customerCare} />
}

interface CustomerCareResponse {
  CustomerCare?: Maybe<CustomerCareType>
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async () => {
  const [response, shopData] = await Promise.all([
    request<CustomerCareResponse>(customerCareQuery),
    requestShopData(),
  ])

  const customerCare = response?.CustomerCare || null
  return { props: { customerCare, shopData }, revalidate: 10 }
}

export default CustomerCare

import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps } from 'next'
import { Maybe, Loyalty as LoyaltyType } from '../../src/types'
import { NotFound } from '../../src/views/NotFound'
import { Loyalty as LoyaltyView } from '../../src/views/Loyalty'
import { request, richImageFragment, seoFragment } from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'

const loyaltyQuery = gql`
  query LoyaltyQuery {
    Loyalty(id: "loyalty") {
      _id
      _type
      title
      backgroundImage {
        ...RichImageFragment
      }
      seo {
        ...SEOFragment
      }
    }
  }
  ${seoFragment}
  ${richImageFragment}
`

interface LoyaltyProps {
  loyalty?: LoyaltyType
}

const Loyalty = ({ loyalty }: LoyaltyProps) => {
  if (!loyalty) return <NotFound />
  return <LoyaltyView loyalty={loyalty} />
}

interface LoyaltyResponse {
  Loyalty?: Maybe<LoyaltyType>
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async () => {
  const [response, shopData] = await Promise.all([
    request<LoyaltyResponse>(loyaltyQuery),
    requestShopData(),
  ])

  const loyalty = response?.Loyalty || null
  return { props: { loyalty, shopData }, revalidate: 10 }
}

export default Loyalty

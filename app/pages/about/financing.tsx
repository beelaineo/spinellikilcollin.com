import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps } from 'next'
import { Maybe, PaymentPlans } from '../../src/types'
import { NotFound } from '../../src/views'
import { FinancingPageView } from '../../src/views/FinancingPageView'
import { seoFragment, request, richImageFragment } from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'

const query = gql`
  query FinancingPageQuery {
    PaymentPlans(id: "paymentPlans") {
      _id
      _type
      title
      bodyRaw
      providers {
        _key
        _type
        name
        bodyRaw
        logo {
          ...RichImageFragment
        }
      }
      seo {
        ...SeoFragment
      }
    }
  }
  ${seoFragment}
  ${richImageFragment}
`

interface FinancingPageProps {
  financingPage?: PaymentPlans
}

const FinancingPage = ({ financingPage }: FinancingPageProps) => {
  if (!financingPage) return <NotFound />
  return <FinancingPageView page={financingPage} />
}

interface Response {
  PaymentPlans: Maybe<PaymentPlans>
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async () => {
  const [response, shopData] = await Promise.all([
    request<Response>(query),
    requestShopData(),
  ])

  const financingPage = response?.PaymentPlans || null

  return { props: { financingPage, shopData } }
}

export default FinancingPage

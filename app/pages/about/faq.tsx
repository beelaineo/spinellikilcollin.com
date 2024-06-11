import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps } from 'next'
import { Faq, Maybe } from '../../src/types'
import { NotFound, FaqView } from '../../src/views'
import { seoFragment, request } from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'

const query = gql`
  query FaqPageQuery {
    Faq(id: "faq") {
      _id
      _type
      title
      seo {
        ...SeoFragment
      }
      faqCategories {
        _key
        _type
        label
        faqQuestions {
          _key
          _type
          question
          answerRaw
        }
      }
    }
  }
  ${seoFragment}
`

interface FaqPageProps {
  faq?: Faq
}

const FaqPage = ({ faq }: FaqPageProps) => {
  if (!faq) return <NotFound />
  return <FaqView faq={faq} />
}

interface Response {
  Faq: Maybe<Faq>
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async () => {
  const [response, shopData] = await Promise.all([
    request<Response>(query),
    requestShopData(),
  ])

  const faq = response?.Faq || null

  return { props: { faq, shopData }, revalidate: 10 }
}

export default FaqPage

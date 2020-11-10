import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps } from 'next'
import { Maybe, Customize as CustomizeType } from '../../src/types'
import { NotFound } from '../../src/views/NotFound'
import { Quiz as QuizView } from '../../src/views/Customize/Quiz'
import {
  request,
  richImageFragment,
  seoFragment,
  heroFragment,
} from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'

const customizeQuery = gql`
  query CustomizeQuery {
    Customize(id: "customize") {
      _id
      _type
      title
      subtitle
      bodyRaw
      seo {
        ...SEOFragment
      }
      hero {
        ...HeroFragment
      }
      quizProductTypes {
        _key
        _type
        title
        image {
          ...RichImageFragment
        }
      }
      quizStyles
    }
  }
  ${seoFragment}
  ${heroFragment}
  ${richImageFragment}
`

interface QuizProps {
  customize?: CustomizeType
}

const Quiz = ({ customize }: QuizProps) => {
  if (!customize) return <NotFound />
  return <QuizView customize={customize} />
}

interface CustomizeResponse {
  Customize?: Maybe<CustomizeType>
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async () => {
  const [response, shopData] = await Promise.all([
    request<CustomizeResponse>(customizeQuery),
    requestShopData(),
  ])

  const customize = response?.Customize || null
  return { props: { customize, shopData }, revalidate: 60 }
}

export default Quiz

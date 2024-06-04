import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps } from 'next'
import { Maybe, Customize as CustomizeType } from '../../src/types'
import { NotFound } from '../../src/views/NotFound'
import { Customize as CustomizeView } from '../../src/views/Customize'
import {
  request,
  richImageFragment,
  seoFragment,
  heroFragment,
  imageTextBlockFragment,
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
        ...SeoFragment
      }
      hero {
        ...HeroFragment
      }
      quizBlock {
        title
        subtitle
        image {
          ...RichImageFragment
        }
      }
      experience {
        title
        subtitle
        blocks {
          _type
          _key
          heading
          body
          illustration {
            ...RichImageFragment
          }
        }
      }
      examples {
        _key
        title
        subtitle
        links {
          ...ImageTextBlockFragment
        }
      }
    }
  }
  ${seoFragment}
  ${heroFragment}
  ${richImageFragment}
  ${imageTextBlockFragment}
`

interface CustomizeProps {
  customize?: CustomizeType
}

const Customize = ({ customize }: CustomizeProps) => {
  if (!customize) return <NotFound />
  return <CustomizeView customize={customize} />
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
  return { props: { customize, shopData } }
}

export default Customize

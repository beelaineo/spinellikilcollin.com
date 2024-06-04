import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps } from 'next'
import { Magazine, Maybe } from '../src/types'
import { NotFound } from '../src/views/NotFound'
import { MagazineView } from '../src/views/Magazine'
import { seoFragment, richImageFragment, request } from '../src/graphql'
import { requestShopData } from '../src/providers/ShopDataProvider/shopDataQuery'

const magazineQuery = gql`
  query MagazineQuery {
    Magazine(id: "magazine") {
      _id
      _type
      title
      descriptionRaw
      seo {
        ...SeoFragment
      }
      coverImage {
        ...RichImageFragment
      }
    }
  }
  ${richImageFragment}
  ${seoFragment}
`

interface MagazinePageProps {
  magazine?: Magazine
}

const MagazinePage = ({ magazine }: MagazinePageProps) => {
  if (!magazine) return <NotFound />
  return <MagazineView magazine={magazine} />
}

interface MagazineResponse {
  Magazine?: Maybe<Magazine>
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async () => {
  const [response, shopData] = await Promise.all([
    request<MagazineResponse>(magazineQuery),
    requestShopData(),
  ])

  const magazine = response?.Magazine || null

  return { props: { shopData, magazine } }
}

export default MagazinePage

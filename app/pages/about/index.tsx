import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps } from 'next'
import { DirectoryView, NotFound } from '../../src/views'
import { About } from '../../src/types'
import { richImageFragment, heroFragment } from '../../src/graphql'
import { seoFragment, request } from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'

const query = gql`
  query AboutPageQuery {
    About(id: "about") {
      introText
      hero {
        ...HeroFragment
      }
      seo {
        ...SeoFragment
      }
      pageLinks {
        _key
        title
        summary
        ctaText
        image {
          ...RichImageFragment
        }
        linkedPage {
          __typename
          ... on Customize {
            _type
          }
          ... on Page {
            _type
            slug {
              current
            }
          }
          ... on Magazine {
            _type
            title
          }
          ... on TeamPage {
            _type
            title
          }
        }
      }
    }
  }
  ${seoFragment}
  ${heroFragment}
  ${richImageFragment}
`

interface Response {
  About?: About
}

interface AboutIndexProps {
  about?: About
}

const AboutIndex = ({ about }: AboutIndexProps) => {
  if (!about) return <NotFound />
  return <DirectoryView data={about} />
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async (ctx) => {
  const [response, shopData] = await Promise.all([
    request<Response>(query),
    requestShopData(),
  ])
  const about = response?.About || null

  return { props: { about, shopData } }
}

export default AboutIndex

import * as React from 'react'
import gql from 'graphql-tag'
import { AboutView, NotFound } from '../../src/views'
import { PageContext } from '../_app'
import { About } from '../../src/types'
import { richImageFragment, heroFragment } from '../../src/graphql'

const query = gql`
  query AboutPageQuery {
    About(id: "about") {
      introText
      hero {
        ...HeroFragment
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
  return <AboutView about={about} />
}

AboutIndex.getInitialProps = async (ctx: PageContext) => {
  const { apolloClient } = ctx
  const response = await apolloClient.query<Response>({ query })
  const about = response?.data?.About

  return { about }
}

export default AboutIndex

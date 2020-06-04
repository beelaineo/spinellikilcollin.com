import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Magazine, Maybe } from '../src/types'
import { richImageFragment } from '../src/graphql'
import { NotFound } from '../src/views/NotFound'
import { MagazineView } from '../src/views/Magazine'
import { request } from '../src/graphql'

const magazineQuery = gql`
  query MagazineQuery {
    Magazine(id: "magazine") {
      _id
      _type
      title
      descriptionRaw
      coverImage {
        ...RichImageFragment
      }
    }
  }
  ${richImageFragment}
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
  const response = await request<MagazineResponse>(magazineQuery)
  const magazine = response?.Magazine
  return { props: { magazine } }
}

/**
 * Static Paths
 */

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export default MagazinePage

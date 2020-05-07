import * as React from 'react'
import gql from 'graphql-tag'
import { PageContext } from './_app'
import { Magazine, Maybe } from '../src/types'
import { richImageFragment } from '../src/graphql'
import { NotFound } from '../src/views/NotFound'
import { MagazineView } from '../src/views/Magazine'

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

MagazinePage.getInitialProps = async (ctx: PageContext) => {
  const { apolloClient } = ctx
  const magazineResponse = await apolloClient.query<MagazineResponse>({
    query: magazineQuery,
  })

  const magazine = magazineResponse?.data?.Magazine
  return { magazine }
}

export default MagazinePage

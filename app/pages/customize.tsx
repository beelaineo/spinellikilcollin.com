import * as React from 'react'
import gql from 'graphql-tag'
import { PageContext } from './_app'
import { Maybe, Customize as CustomizeType } from '../src/types'
import { richImageFragment } from '../src/graphql'
import { NotFound } from '../src/views/NotFound'
import { Customize as CustomizeView } from '../src/views/Customize'

const customizeQuery = gql`
  query CustomizeQuery {
    Customize(id: "customize") {
      _id
      _type
      title
    }
  }
  ${richImageFragment}
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

Customize.getInitialProps = async (ctx: PageContext) => {
  const { apolloClient } = ctx
  const customizeResponse = await apolloClient.query<CustomizeResponse>({
    query: customizeQuery,
  })

  const customize = customizeResponse?.data?.Customize
  return { customize }
}

export default Customize

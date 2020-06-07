import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps } from 'next'
import { Maybe, Customize as CustomizeType } from '../src/types'
import { NotFound } from '../src/views/NotFound'
import { Customize as CustomizeView } from '../src/views/Customize'
import { request } from '../src/graphql'

const customizeQuery = gql`
  query CustomizeQuery {
    Customize(id: "customize") {
      _id
      _type
      title
    }
  }
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
  const response = await request<CustomizeResponse>(customizeQuery)
  const customize = response?.Customize || null
  return { props: { customize }, unstable_revalidate: 60 }
}

export default Customize

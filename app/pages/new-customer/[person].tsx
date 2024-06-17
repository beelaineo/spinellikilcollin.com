import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Maybe, NewCustomer as NewCustomerType } from '../../src/types'
import { NotFound } from '../../src/views/NotFound'
import { NewCustomer as NewCustomerView } from '../../src/views/NewCustomer'
import { request, seoFragment, richImageFragment } from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'
import { getParam } from '../../src/utils'

const newCustomerQuery = gql`
  query NewCustomerQuery {
    NewCustomer(id: "newCustomer") {
      _id
      _type
      title
      backgroundImage {
        ...RichImageFragment
      }
      seo {
        ...SeoFragment
      }
    }
  }
  ${seoFragment}
  ${richImageFragment}
`

interface NewCustomerProps {
  newCustomer?: NewCustomerType
  person?: string
}

const NewCustomer = ({ newCustomer, person }: NewCustomerProps) => {
  if (!newCustomer) return <NotFound />
  return <NewCustomerView newCustomer={newCustomer} person={person} />
}

interface NewCustomerResponse {
  NewCustomer?: Maybe<NewCustomerType>
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx
  if (!params?.person) return { props: { newCustomer: undefined } }

  const person = getParam(params.person)
  const variables = { person }

  const [response, shopData] = await Promise.all([
    request<NewCustomerResponse>(newCustomerQuery, variables),
    requestShopData(),
  ])

  const newCustomer = response?.NewCustomer || null
  return { props: { newCustomer, person, shopData } }
}

/**
 * Static Paths
 */

export const getStaticPaths: GetStaticPaths = async () => {
  const people = ['andrew', 'michelle', 'lizzie', 'jeneva', 'austin']
  const paths = people.map((entry) => ({
    params: {
      person: entry ?? undefined,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export default NewCustomer

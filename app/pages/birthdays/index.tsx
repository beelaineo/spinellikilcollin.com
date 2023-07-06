import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps } from 'next'
import { Maybe, Birthdays as BirthdaysType } from '../../src/types'
import { NotFound } from '../../src/views/NotFound'
import { Birthdays as BirthdaysView } from '../../src/views/Birthdays'
import { request, seoFragment } from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'

const birthdaysQuery = gql`
  query BirthdaysQuery {
    Birthdays(id: "birthdays") {
      _id
      _type
      title
      subtitle
      bodyRaw
      seo {
        ...SEOFragment
      }
    }
  }
  ${seoFragment}
`

interface BirthdaysProps {
  birthdays?: BirthdaysType
}

const Birthdays = ({ birthdays }: BirthdaysProps) => {
  if (!birthdays) return <NotFound />
  return <BirthdaysView birthdays={birthdays} />
}

interface BirthdaysResponse {
  Birthdays?: Maybe<BirthdaysType>
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async () => {
  const [response, shopData] = await Promise.all([
    request<BirthdaysResponse>(birthdaysQuery),
    requestShopData(),
  ])

  const birthdays = response?.Birthdays || null
  return { props: { birthdays, shopData }, revalidate: 10 }
}

export default Birthdays

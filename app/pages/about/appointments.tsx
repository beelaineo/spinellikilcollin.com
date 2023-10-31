import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps } from 'next'
import { Appointments, Maybe } from '../../src/types'
import { NotFound, AppointmentsView } from '../../src/views'
import {
  seoFragment,
  request,
  textBlockFragment,
  imageTextBlockFragment,
} from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'

const query = gql`
  query AppointmentsPageQuery {
    Appointments(id: "appointments") {
      _id
      _type
      title
      description {
        ...TextBlockFragment
      }
      upcomingPopups {
        title
        description {
          ...TextBlockFragment
        }
      }
      appointmentLocations {
        label
        ctaLabel
        slug {
          current
        }
        phone
        image {
          ...ImageTextBlockFragment
        }
        body {
          ...TextBlockFragment
        }
        content {
          ...TextBlockFragment
          ... on EmbedBlock {
            __typename
            title
            url
            layout
          }
        }
      }
      seo {
        ...SEOFragment
      }
    }
  }
  ${seoFragment}
  ${textBlockFragment}
  ${imageTextBlockFragment}
`

interface AppointmentsPageProps {
  appointments?: Appointments
}

const AppointmentsPage = ({ appointments }: AppointmentsPageProps) => {
  if (!appointments) return <NotFound />
  return <AppointmentsView appointments={appointments} />
}

interface Response {
  Appointments: Maybe<Appointments>
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async () => {
  const [response, shopData] = await Promise.all([
    request<Response>(query),
    requestShopData(),
  ])

  const appointments = response?.Appointments || null

  console.log('appointments', appointments)

  return { props: { appointments, shopData }, revalidate: 10 }
}

export default AppointmentsPage

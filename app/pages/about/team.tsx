import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps } from 'next'
import { Maybe, TeamPage as TeamPageType } from '../../src/types'
import { richImageFragment } from '../../src/graphql'
import { NotFound } from '../../src/views/NotFound'
import { TeamView } from '../../src/views/TeamView'
import { request } from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'

const teamQuery = gql`
  query TeamPageQuery {
    TeamPage(id: "teamPage") {
      _id
      _type
      title
      teamMembers {
        _key
        _type
        name
        title
        email
        headshot {
          ...RichImageFragment
        }
      }
    }
  }
  ${richImageFragment}
`

interface TeamPageProps {
  teamPage?: TeamPageType
}

const TeamPage = ({ teamPage }: TeamPageProps) => {
  if (!teamPage) return <NotFound />
  return <TeamView teamPage={teamPage} />
}

interface TeamPageResponse {
  TeamPage?: Maybe<TeamPageType>
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async () => {
  const [response, shopData] = await Promise.all([
    request<TeamPageResponse>(teamQuery),
    requestShopData(),
  ])

  const teamPage = response?.TeamPage || null

  return { props: { teamPage, shopData }, unstable_revalidate: 60 }
}

export default TeamPage

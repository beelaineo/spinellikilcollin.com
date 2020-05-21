import * as React from 'react'
import gql from 'graphql-tag'
import { PageContext } from '../_app'
import { Maybe, TeamPage as TeamPageType } from '../../src/types'
import { richImageFragment } from '../../src/graphql'
import { NotFound } from '../../src/views/NotFound'
import { TeamView } from '../../src/views/TeamView'

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

TeamPage.getInitialProps = async (ctx: PageContext) => {
  const { apolloClient } = ctx
  const teamPageResponse = await apolloClient.query<TeamPageResponse>({
    query: teamQuery,
  })

  const teamPage = teamPageResponse?.data?.TeamPage
  return { teamPage }
}

export default TeamPage

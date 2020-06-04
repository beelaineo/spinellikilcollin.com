import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Maybe, TeamPage as TeamPageType } from '../../src/types'
import { richImageFragment } from '../../src/graphql'
import { NotFound } from '../../src/views/NotFound'
import { TeamView } from '../../src/views/TeamView'
import { request } from '../../src/graphql'

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

export const getStaticProps: GetStaticProps = async (ctx) => {
  const response = await request<TeamPageResponse>(teamQuery)
  const teamPage = response?.TeamPage

  return { props: { teamPage } }
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

export default TeamPage

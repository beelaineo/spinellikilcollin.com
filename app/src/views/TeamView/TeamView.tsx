import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { TeamPage } from '../../types'
import { Column, PageWrapper } from '../../components/Layout'
import { Heading } from '../../components/Text'
import { SEO } from '../../components/SEO'
import { definitely } from '../../utils'
import { TeamMember } from './TeamMember'

const TeamGrid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-gap: 3;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;

    ${theme.mediaQueries.tablet} {
      grid-template-columns: repeat(2, 1fr);
    }
  `}
`

interface TeamViewProps {
  teamPage: TeamPage
}

export const TeamView = ({ teamPage }: TeamViewProps) => {
  const { seo, title, teamMembers } = teamPage
  const defaultSeo = {
    title: title || 'Our Team',
  }
  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} path="about/team" />
      <PageWrapper tabIndex={-1}>
        <Column columnwidth="mediumWide">
          <Heading mt={4} mb={10} textAlign="center" level={1}>
            {title}
          </Heading>
          <TeamGrid>
            {definitely(teamMembers).map((teamMember) => (
              <TeamMember
                key={teamMember._key || 'some-key'}
                teamMember={teamMember}
              />
            ))}
          </TeamGrid>
        </Column>
      </PageWrapper>
    </>
  )
}

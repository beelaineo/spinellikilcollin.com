import * as React from 'react'
import styled, { breakpoints, css } from '@xstyled/styled-components'
import { TeamPage } from '../../types'
import { Column, PageWrapper } from '../../components/Layout'
import { Heading } from '../../components/Text'
import { definitely } from '../../utils'
import { TeamMember } from './TeamMember'

const TeamGrid = styled.div`
  ${breakpoints({
    xs: css`
      display: grid;
      grid-gap: 3;
      grid-template-columns: 1fr 1fr;
      text-align: center;
    `,
    sm: css`
      grid-gap: 4;
      grid-template-columns: repeat(2, 1fr);
    `,
    md: css`
      grid-gap: 5;
      grid-template-columns: repeat(3, 1fr);
    `,
  })}
`

interface TeamViewProps {
  teamPage: TeamPage
}

export const TeamView = ({ teamPage }: TeamViewProps) => {
  const { title, teamMembers } = teamPage
  return (
    <PageWrapper>
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
  )
}

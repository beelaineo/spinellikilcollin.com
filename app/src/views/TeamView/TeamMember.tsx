import * as React from 'react'
import styled from '@xstyled/styled-components'
import { TeamMember as TeamMemberType } from '../../types'
import { Image } from '../../components/Image'
import { Heading } from '../../components/Text'

const ImageWrapper = styled.div`
  margin-bottom: 2;
`

interface TeamMemberProps {
  teamMember: TeamMemberType
}

export const TeamMember = ({ teamMember }: TeamMemberProps) => {
  const { headshot, name, title } = teamMember
  return (
    <div>
      <ImageWrapper>
        <Image image={headshot} ratio={1} altText={name} />
      </ImageWrapper>
      <Heading level={4} mb={1} weight={2}>
        {name}
      </Heading>
      <Heading level={4} mt={0} weight={2}>
        {title}
      </Heading>
    </div>
  )
}

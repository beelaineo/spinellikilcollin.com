import * as React from 'react'
import { Customize as CustomizeType } from '../../types'
import { Heading } from '../../components/Text'
import { PageWrapper } from '../../components/Layout'

interface CustomizeProps {
  customize: CustomizeType
}

export const Customize = (props: CustomizeProps) => {
  return (
    <PageWrapper>
      <Heading level={1}>Customize</Heading>
    </PageWrapper>
  )
}

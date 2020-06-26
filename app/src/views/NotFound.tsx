import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import Link from 'next/link'
import { Heading } from '../components/Text'
import { PageWrapper } from '../components/Layout'

const Main = styled.div`
  ${({ theme }) => css`
    min-height: calc(100vh - ${theme.navHeight});
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `}
`

export const NotFound = () => (
  <PageWrapper py={0}>
    <Main>
      <Heading fontStyle="italic" level={1}>
        Sorry, this page was not found
      </Heading>
      <Heading level={2}>
        <Link href="/">Return to the homepage</Link>
      </Heading>
    </Main>
  </PageWrapper>
)

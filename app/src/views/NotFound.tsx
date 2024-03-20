import * as React from 'react'
import Head from 'next/head'
import DefaultErrorPage from 'next/error'
import styled, { css } from '@xstyled/styled-components'
import Link from 'next/link'
import { Heading } from '../components/Text'
import { PageWrapper } from '../components/Layout'

const Main = styled.main`
  min-height: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const NotFound = () => (
  <PageWrapper py={0} tabIndex={-1}>
    <Head>
      <meta name="robots" content="noindex" />
    </Head>
    <Main>
      <Heading fontStyle="italic" level={2}>
        Sorry, this page was not found
      </Heading>
      <Heading level={3}>
        <Link href="/">Return to the homepage</Link>
      </Heading>
    </Main>
  </PageWrapper>
)

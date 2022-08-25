import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Birthdays as BirthdaysType } from '../../types'
import { FeatureFlag } from '../../components/FeatureFlag'
import { Heading } from '../../components/Text'
import { Column } from '../../components/Layout'
import { RichText } from '../../components/RichText'
import { SEO } from '../../components/SEO'

interface BlockWrapperProps {
  borderTop?: boolean
}
const BlockWrapper = styled.div<BlockWrapperProps>`
  ${({ borderTop }) => css`
    padding: 6 0;
    border-bottom: 1px solid;
    border-color: body.5;
    border-top: ${borderTop ? '1px solid' : 0};
  `}
`

export const PageWrapper = styled.divBox`
  ${({ theme }) => css`
    padding: calc(${theme.navHeight} + ${theme.space[9]}px) 10 8;
    overflow-x: hidden;
    & > h3 {
      text-align: center;
      font-style: italic;
      margin-bottom: 4;
    }

    ${theme.mediaQueries.tablet} {
      padding: calc(${theme.navHeight} + ${theme.space[9]}px) 8 6;
    }

    ${theme.mediaQueries.mobile} {
      padding: calc(${theme.mobileNavHeight} + ${theme.space[4]}px) 30px 5;
    }
  `}
`

const PageText = styled.div`
  h1,
  h2,
  h3 {
    text-align: center;
  }

  p,
  li {
    line-height: 1.8em;
    font-size: 17px;
  }
`

interface BirthdaysProps {
  birthdays: BirthdaysType
}

export const Birthdays = ({ birthdays }: BirthdaysProps) => {
  const { seo, title, subtitle, bodyRaw } = birthdays
  const defaultSeo = {
    title: 'Birthdays',
  }

  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} path="birthdays" />
      <PageWrapper tabIndex={-1}>
        <Heading textAlign="center" level={1}>
          {title}
        </Heading>
        {subtitle ? <Heading level={3}>{subtitle}</Heading> : null}
        {bodyRaw ? (
          <Column columnwidth="medium">
            <PageText>
              <RichText
                body={bodyRaw}
                imageSizes="(max-width: 600px) 100vw, 600px"
              />
            </PageText>
          </Column>
        ) : null}
      </PageWrapper>
    </>
  )
}

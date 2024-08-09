import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Page } from '../../types'
import { PageWrapper, Column } from '../../components/Layout'
import { ContentBlock } from '../../components/ContentBlock'
import { Heading } from '../../components/Text'
import { RichText } from '../../components/RichText'
import { HeroBlock } from '../../components/ContentBlock/HeroBlock'
import { SEO } from '../../components/SEO'

import {
  definitely,
  getHeroImage,
  isValidHero,
  getFirstImage,
} from '../../utils'

const PageText = styled.div`
  h1,
  h2,
  h3 {
    text-align: center;
  }
`

interface PageViewProps {
  page: Page
}

const Grid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;

    ${theme.mediaQueries.mobile} {
      display: block;
    }
  `}
`

export const PageView = ({ page }: PageViewProps) => {
  const {
    seo,
    content,
    title,
    hero,
    subtitle,
    hideTitle,
    fullWidth,
    slug,
    bodyRaw,
  } = page
  const defaultSeo = {
    title: title || '',
    image: getHeroImage(hero) || getFirstImage(bodyRaw),
  }
  if (!slug) throw new Error('No slug was fetched')
  const path = ['about', slug.current].join('/')

  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} path={path} />
      {hero && isValidHero(hero) ? <HeroBlock $hero={hero} /> : null}
      <PageWrapper p={fullWidth ? '0' : undefined} tabIndex={-1}>
        {hideTitle !== true ? (
          <>
            <Heading
              mt={{ xs: 6, md: '6px' }}
              mb={{ xs: 6, md: '0.5em' }}
              textAlign="center"
              level={1}
            >
              {title}
            </Heading>
            {subtitle ? <Heading level={3}>{subtitle}</Heading> : null}
          </>
        ) : null}
        <Grid>
          {definitely(content).map((c) => (
            <ContentBlock key={c._key || 'some-key'} content={c} />
          ))}
        </Grid>
        <Column $columnwidth="medium">
          <PageText>
            <RichText
              article
              body={bodyRaw}
              imageSizes="(max-width: 600px) 100vw, 600px"
            />
          </PageText>
        </Column>
      </PageWrapper>
    </>
  )
}

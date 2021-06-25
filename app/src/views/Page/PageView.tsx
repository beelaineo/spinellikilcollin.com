import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Page } from '../../types'
import { PageWrapper } from '../../components/Layout'
import { ContentBlock } from '../../components/ContentBlock'
import { Heading } from '../../components/Text'
import { Column } from '../../components/Layout'
import { RichText } from '../../components/RichText'
import { HeroBlock } from '../../components/ContentBlock/HeroBlock'
import { SEO } from '../../components/SEO'
import BambuserView from '../Bambuser/BambuserView'
import { config } from '../../../src/config'
const { BAMBUSER_SLUG, BAMBUSER_AUTOPLAY } = config
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

  let showBambuser = false
  let bambuserAutoPlay =
    BAMBUSER_AUTOPLAY && BAMBUSER_AUTOPLAY === 'true' ? true : false
  if (slug?.current && BAMBUSER_SLUG) {
    if (slug?.current.toLowerCase() === BAMBUSER_SLUG.toLowerCase()) {
      showBambuser = true
    }
  }
  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} path={path} />
      {hero && isValidHero(hero) ? (
        <>
          {' '}
          {showBambuser ? (
            <HeroBlock hero={hero}>
              {
                <BambuserView autoPlay={bambuserAutoPlay}>
                  <RichText body={hero.bodyRaw} />
                </BambuserView>
              }
            </HeroBlock>
          ) : (
            <HeroBlock hero={hero} />
          )}{' '}
        </>
      ) : null}
      <PageWrapper p={fullWidth ? '0' : undefined}>
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
        <Column columnwidth="medium">
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

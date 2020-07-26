import * as React from 'react'
import styled from '@xstyled/styled-components'
import { Page } from '../../types'
import { PageWrapper } from '../../components/Layout'
import { Heading } from '../../components/Text'
import { Column } from '../../components/Layout'
import { RichText } from '../../components/RichText'
import { HeroBlock } from '../../components/ContentBlock/HeroBlock'
import { SEO } from '../../components/SEO'
import { getHeroImage, isValidHero, getFirstImage } from '../../utils'

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

export const PageView = ({ page }: PageViewProps) => {
  const { seo, title, hero, subtitle, slug, bodyRaw } = page
  const defaultSeo = {
    title: title || '',
    image: getHeroImage(hero) || getFirstImage(bodyRaw),
  }
  if (!slug) throw new Error('No slug was fetched')
  const path = ['about', slug.current].join('/')
  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} path={path} />
      {hero && isValidHero(hero) ? <HeroBlock hero={hero} /> : null}
      <PageWrapper>
        <Heading textAlign="center" level={1}>
          {title}
        </Heading>
        {subtitle ? <Heading level={3}>{subtitle}</Heading> : null}
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

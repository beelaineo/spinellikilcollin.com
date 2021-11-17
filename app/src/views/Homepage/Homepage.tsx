import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { ContentBlock } from '../../components/ContentBlock'
import { getHeroImage, definitely } from '../../utils'
import { Homepage as HomepageType } from '../../types'
import { SEO } from '../../components/SEO'

interface HomepageProps {
  homepage: HomepageType
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

export const Homepage = (props: HomepageProps) => {
  const { seo, content, _id: id } = props.homepage
  const firstHero = definitely(content).find((b) => b.__typename === 'Hero')
  const defaultSeo = {
    title: seo?.title,
    description: seo?.description,
    image:
      firstHero && firstHero.__typename === 'Hero'
        ? getHeroImage(firstHero)
        : undefined,
  }
  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} contentType={id!} path="" />
      <Grid>
        {definitely(content).map((c) => (
          <ContentBlock key={c._key || 'some-key'} content={c} />
        ))}
      </Grid>
    </>
  )
}

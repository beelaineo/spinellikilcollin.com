import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { ContentBlock } from '../../components/ContentBlock'
import { getHeroImage, definitely } from '../../utils'
import { Homepage as HomepageType } from '../../types'
import { SEO } from '../../components/SEO'
import { useNavigation, useSearch } from '../../providers'
import { useInViewport } from '../../hooks'

const { useEffect, useRef } = React

interface HomepageProps {
  homepage: HomepageType
}

const Grid = styled.main`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;

    ${theme.mediaQueries.mobile} {
      display: block;
    }
  `}
`

export const Homepage = (props: HomepageProps) => {
  const { seo, content, _id: id, header_color } = props.homepage
  const firstHero = definitely(content).find((b) => b.__typename === 'Hero')
  const defaultSeo = {
    title: seo?.title,
    description: seo?.description,
    image:
      firstHero && firstHero.__typename === 'Hero'
        ? getHeroImage(firstHero)
        : undefined,
  }

  const firstBlockRef = useRef<HTMLDivElement>(null)
  const { setColorTheme } = useNavigation()
  const { isInView } = useInViewport(firstBlockRef, '-55px 0px')
  const searchOpen = useSearch().open

  useEffect(() => {
    header_color == 'light' && isInView && !searchOpen
      ? setColorTheme('light')
      : setColorTheme('dark')
  }, [isInView, searchOpen])

  useEffect(() => {
    return () => {
      setColorTheme('dark')
    }
  }, [])

  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} contentType={id!} path="" />
      <Grid tabIndex={-1}>
        {definitely(content).map((c, i) => {
          return (
            <ContentBlock
              key={c._key || 'some-key'}
              content={c}
              ref={i === 0 ? firstBlockRef : null}
            />
          )
        })}
      </Grid>
    </>
  )
}

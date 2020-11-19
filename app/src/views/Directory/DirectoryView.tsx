import * as React from 'react'
import { About, Directory } from '../../types'
import { PageWrapper, Column } from '../../components/Layout'
import { HeroBlock } from '../../components/ContentBlock/HeroBlock'
import { Heading } from '../../components/Text'
import { definitely, isValidHero, getHeroImage } from '../../utils'
import { PageLinksWrapper } from './styled'
import { PageLink } from './PageLink'
import { SEO } from '../../components/SEO'

interface DirectoryViewProps {
  data: About | Directory
}

export const DirectoryView = ({ data }: DirectoryViewProps) => {
  const { seo, hero, introText, pageLinks } = data

  const defaultSeo = {
    title: 'About Spinelli Kilcollin',
    image: getHeroImage(hero),
  }

  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} path="about" />
      {isValidHero(hero) && hero ? <HeroBlock hero={hero} /> : null}
      <PageWrapper pt="83px">
        <Column maxWidth="800px" textAlign="center">
          <Heading my={0} fontWeight={1} level={3}>
            {introText}
          </Heading>
        </Column>
        <PageLinksWrapper>
          {definitely(pageLinks).map((pageLink, index) => (
            <PageLink
              key={pageLink._key || 'some-key'}
              index={index}
              pageLink={pageLink}
            />
          ))}
        </PageLinksWrapper>
      </PageWrapper>
    </>
  )
}

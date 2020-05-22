import * as React from 'react'
import { About } from '../../types'
import { PageWrapper, Column } from '../../components/Layout'
import { HeroBlock } from '../../components/ContentBlock/HeroBlock'
import { RichText } from '../../components/RichText'
import { definitely } from '../../utils'
import { PageLinksWrapper } from './styled'
import { PageLink } from './PageLink'

interface AboutViewProps {
  about: About
}

export const AboutView = ({ about }: AboutViewProps) => {
  const { hero, introTextRaw, pageLinks } = about
  return (
    <>
      {hero ? <HeroBlock hero={hero} /> : null}
      <PageWrapper>
        <Column columnWidth="small" textAlign="center">
          <RichText body={introTextRaw} />
        </Column>
        <PageLinksWrapper>
          {definitely(pageLinks).map((pageLink) => (
            <PageLink key={pageLink._key || 'some-key'} pageLink={pageLink} />
          ))}
        </PageLinksWrapper>
      </PageWrapper>
    </>
  )
}

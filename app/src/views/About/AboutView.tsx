import * as React from 'react'
import { About } from '../../types'
import { PageWrapper, Column } from '../../components/Layout'
import { HeroBlock } from '../../components/ContentBlock/HeroBlock'
import { Heading } from '../../components/Text'
import { definitely } from '../../utils'
import { PageLinksWrapper } from './styled'
import { PageLink } from './PageLink'

interface AboutViewProps {
  about: About
}

export const AboutView = ({ about }: AboutViewProps) => {
  const { hero, introText, pageLinks } = about
  return (
    <>
      {hero ? <HeroBlock hero={hero} /> : null}
      <PageWrapper pt="83px">
        <Column maxWidth="800px" textAlign="center">
          <Heading my={0} fontWeight={1} level={2}>
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

import * as React from 'react'
import Link from 'next/link'
import { PageLink as PageLinkType } from '../../types'
import { Image } from '../../components/Image'
import { Heading } from '../../components/Text'
import { ImageWrapper, PageLinkWrapper, PageLinkBody } from './styled'
import { getPageLinkUrl } from '../../utils'

interface PageLinkProps {
  pageLink: PageLinkType
  index: number
}

export const PageLink = ({ pageLink, index }: PageLinkProps) => {
  const { title, summary, image, ctaText, linkedPage } = pageLink
  if (!linkedPage) return null
  const { href, as } = getPageLinkUrl(linkedPage)
  return (
    <PageLinkWrapper>
      {image ? (
        <ImageWrapper isOdd={Boolean(index % 2)}>
          <Link href={href} as={as}>
            <a>
              <Image
                image={image}
                ratio={0.75}
                sizes="(min-width: 600px) 100vw, 600px"
              />
            </a>
          </Link>
        </ImageWrapper>
      ) : null}

      <PageLinkBody isOdd={Boolean(index % 2)}>
        <Link href={href} as={as}>
          <a>
            <Heading level={2}>{title}</Heading>
            <Heading my={3} textAlign="center" maxWidth="300px" level={3}>
              {summary}
            </Heading>
            <Heading level={4} fontStyle="italic" textDecoration="underline">
              {ctaText}
            </Heading>
          </a>
        </Link>
      </PageLinkBody>
    </PageLinkWrapper>
  )
}

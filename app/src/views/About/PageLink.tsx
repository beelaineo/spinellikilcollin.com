import * as React from 'react'
import { Box } from '@xstyled/styled-components'
import Link from 'next/link'
import { PageLink as PageLinkType } from '../../types'
import { Image } from '../../components/Image'
import { RichText } from '../../components/RichText'
import { Heading } from '../../components/Text'
import { PageLinkWrapper, PageLinkBody } from './styled'
import { getPageLinkUrl } from '../../utils'

interface PageLinkProps {
  pageLink: PageLinkType
}

export const PageLink = ({ pageLink }: PageLinkProps) => {
  const { title, summaryRaw, image, ctaText, linkedPage } = pageLink
  if (!linkedPage) return null
  const { href, as } = getPageLinkUrl(linkedPage)
  return (
    <PageLinkWrapper>
      {image ? (
        <Image
          image={image}
          ratio={0.75}
          sizes="(min-width: 600px) 100vw, 600px"
        />
      ) : null}

      <PageLinkBody>
        <Heading level={2}>{title}</Heading>
        <Box my={4}>
          <RichText body={summaryRaw} />
        </Box>
        <Link href={href} as={as}>
          <a>
            <Heading level={4} fontStyle="italic" textDecoration="underline">
              {ctaText}
            </Heading>
          </a>
        </Link>
      </PageLinkBody>
    </PageLinkWrapper>
  )
}

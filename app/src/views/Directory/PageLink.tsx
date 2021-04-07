import * as React from 'react'
import Link from 'next/link'
import { Box } from '@xstyled/styled-components'
import { PageLink as PageLinkType } from '../../types'
import { Image } from '../../components/Image'
import { Heading } from '../../components/Text'
import { ImageWrapper, PageLinkWrapper, PageLinkBody } from './styled'
import { Button } from '../../components/Button'
import { getPageLinkUrl } from '../../utils'

interface PageLinkProps {
  pageLink: PageLinkType
  index: number
  href?: string
  ctaType?: 'button' | 'text'
}

export const PageLink = ({ ctaType, pageLink, index, href }: PageLinkProps) => {
  const { title, summary, image, ctaText, linkedPage } = pageLink
  const linkHref = href
    ? href
    : linkedPage
    ? getPageLinkUrl(linkedPage).href
    : null
  if (!linkHref) return null
  return (
    <PageLinkWrapper>
      {image ? (
        <ImageWrapper isOdd={Boolean(index % 2)}>
          <Link href={linkHref}>
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
        <Link href={linkHref}>
          <a>
            <Heading mb={0} level={2}>
              {title}
            </Heading>
            <Heading
              maxWidth="450px"
              my={3}
              mx="auto"
              textAlign="center"
              level={3}
            >
              {summary}
            </Heading>
            {ctaText ? (
              ctaType === 'button' ? (
                <Button level={2} as="div">
                  {ctaText}
                </Button>
              ) : (
                <Heading
                  mb="-5px"
                  level={4}
                  fontStyle="italic"
                  textDecoration="underline"
                >
                  {ctaText}
                </Heading>
              )
            ) : null}
          </a>
        </Link>
      </PageLinkBody>
    </PageLinkWrapper>
  )
}

import * as React from 'react'
import Link from 'next/link'
import styled, { css, DefaultTheme } from '@xstyled/styled-components'
import { Cta, PageLinkOrUrlLink, RichPageLink } from '../types'
import { getPageLinkUrl } from '../utils/links'

interface CTAProps {
  cta: Cta
}

interface WrapperProps {
  theme: DefaultTheme
}

const Outer = styled.div`
  ${({ theme }) => css`
    margin: 2 0;
  `}
`

const Wrapper = styled.a`
  ${({ theme }: WrapperProps) => css`
    padding: 3;
    border: 1px solid;
    color: inherit;
    display: inline;
    text-decoration: none;
  `}
`

const getPageLinkTo = (link: RichPageLink): string => {
  const { document } = link
  if (!document) return '/'

  switch (document.__typename) {
    case 'ShopifyCollection':
      return `/collections/${document.handle}`
    case 'ShopifyProduct':
      return `/products/${document.handle}`
    default:
      return `/${document.slug.current}`
  }
}

export const CTA = ({ cta }: CTAProps) => {
  const { label, link } = cta
  if (!link) return null
  return (
    <Outer>
      <Link href={getPageLinkUrl(link)}>
        <Wrapper>{label}</Wrapper>
      </Link>
    </Outer>
  )
}

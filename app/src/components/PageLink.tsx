import * as React from 'react'
import NextLink from 'next/link'
import { RichPageLink, ExternalLinkOrInternalLink } from '../types'
import { getPageLinkUrl, getPageLinkLabel } from '../utils/links'

interface LinkProps {
  link?: RichPageLink | ExternalLinkOrInternalLink | null
  children?: React.ReactNode
  label?: string
  render?: (label: string | void | null) => React.ReactNode
  onClick?: () => void
}

const linkStyles = {
  textDecoration: 'none',
  color: 'inherit',
  cursor: 'pointer',
}

// Returns a link to an external or internal page.
// If there are no children, it will wrap a Label inferred
// by the linked page, or by a label passed in as a prop

export const PageLink = ({
  onClick,
  link,
  children,
  render,
  label,
}: LinkProps) => {
  if (!link) return <>{children}</>
  if (link.__typename === 'ExternalLink') {
    if (!link.url) return <>{children}</>
    return (
      <a
        onClick={onClick}
        href={link.url}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    )
  }
  const document = link?.document
  // if no link, just return the children un-wrapped
  if (!document) return <>{children}</>

  const { href, as } = getPageLinkUrl(document) || {}
  if (!href) {
    console.warn('Could not make a link', { link })
    return null
  }

  const inner = () => {
    const inferredLabel = getPageLinkLabel(document)
    if (children) return children
    if (render) return render(label || inferredLabel)
    if (label) return label
    if (inferredLabel) return inferredLabel
    return null
  }

  return (
    <NextLink as={as} href={href}>
      <a onClick={onClick} style={linkStyles}>
        {inner()}
      </a>
    </NextLink>
  )
}

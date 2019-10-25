import * as React from 'react'
import { Link as RrLink } from 'react-router-dom'
import { RichPageLink, ExternalLink, InternalLink } from '../types/generated'
import { getPageLinkUrl, getPageLinkLabel } from '../utils/links'

interface LinkProps {
  link: RichPageLink | ExternalLink | InternalLink
  children?: React.ReactNode
  label?: string
}

const linkStyles = {
  textDecoration: 'none',
  color: 'inherit',
}

// Returns a link to an external or internal page.
// If there are no children, it will wrap a Label inferred
// by the linked page, or by a label passed in as a prop

export const PageLink = ({ link, children, label }: LinkProps) => {
  // if no link, just return the children un-wrapped
  if (!link) return children

  const linkTo = getPageLinkUrl(link)
  const isExternal = linkTo.startsWith('http')

  const inner = () => {
    if (children) return children
    if (label) return label
    const inferredLabel = getPageLinkLabel(link)
    if (inferredLabel) return inferredLabel
    return null
  }
  if (isExternal) {
    return (
      <a href={linkTo} rel="noopener noreferrer" target="_blank">
        {inner()}
      </a>
    )
  }

  return (
    <RrLink style={linkStyles} to={linkTo}>
      {inner()}
    </RrLink>
  )
  //
  // switch (link.__typename) {
  //   case 'PageLink':
  //     if (!link.document) {
  //       throw new Error('This PageLink does not have a document')
  //     }
  //     return (
  //       <RrLink style={linkStyles} to={getPageLinkUrl(link)}>
  //         {children || label || getPageLinkLabel(link) || null}
  //       </RrLink>
  //     )
  //   default:
  //     // @ts-ignore
  //     throw new Error(`Cannot create link for type "${link.__typename}"`)
  // }
}

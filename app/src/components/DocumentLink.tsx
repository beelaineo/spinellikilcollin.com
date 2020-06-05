import * as React from 'react'
import NextLink from 'next/link'
import { Document, getPageLinkUrl, getPageLinkLabel } from '../utils/links'

interface LinkProps {
  document?: Document
  children?: React.ReactNode
  label?: string
}

export const DocumentLink = ({ document, children, label }: LinkProps) => {
  if (!document) return null
  const { as, href } = getPageLinkUrl(document)
  return (
    <NextLink as={as} href={href}>
      <a>{children || label || getPageLinkLabel(document) || null}</a>
    </NextLink>
  )
}

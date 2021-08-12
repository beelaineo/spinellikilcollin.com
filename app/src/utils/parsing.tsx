import * as React from 'react'
import Link from 'next/link'
import HTMLParser from 'html-parser-lite'
import { getLinkFromHref } from '../utils'
import { Heading, P, Ol, Ul, Li, Span } from '../components/Text'
import { Maybe, Scalars, RichImage, Hero } from '../types'

export const isValidHero = (hero?: Hero | null): boolean => {
  if (!hero) return false
  return Boolean(hero?.bodyRaw?.length || hero?.image || hero?.cloudinaryVideo)
}

export const getHeroImage = (hero?: Hero | null): RichImage | undefined => {
  if (!hero) return
  return hero.image ?? undefined
}

export const getFirstImage = (
  blocks?: Maybe<Scalars['JSON']> | null,
): RichImage | undefined =>
  blocks ? blocks.find((b) => b._type === 'richImage') : undefined

const css2obj = (css: string): Record<string, string> => {
  return css.split(';').reduce((ruleMap, ruleString) => {
    if (ruleString.length === 0) return ruleMap
    const rulePair = ruleString.split(':')
    ruleMap[rulePair[0].trim()] = rulePair[1].trim()
    return ruleMap
  }, {})
}

const wrapBareText = (text: string) =>
  text
    .replace(/^(?!<)(.*)(<\/\w+>)?/gm, '<span>$1</span>')
    .replace('<span></span>', '')

const internalUrlRegex =
  /^https?:\/\/(www.)?(localhost:3000|spinellikilcollin.com|spinellikilcollin.(good-idea.)?now.sh)(\/[\w|\/]+)?/

const parser = new HTMLParser()

const transform = (node, index) => {
  const styles = css2obj(node?.attribs?.style ?? '')
  switch (node.tagName) {
    case 'document':
      return (
        <React.Fragment key={index}>
          {node.childNodes.map(transform)}
        </React.Fragment>
      )

    case 'text':
      return <React.Fragment key={index}>{node.textContent}</React.Fragment>
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return (
        <Heading style={styles} level={4} key={index}>
          {node.childNodes.map(transform)}
        </Heading>
      )
    case 'p':
    case 'span':
      if (node.parentNode && node.parentNode.tagName !== 'document') {
        return (
          <Span key={index} style={styles}>
            {node.childNodes.map(transform)}
          </Span>
        )
      }
      return (
        <P key={index} style={styles} weight={2}>
          {node.childNodes.map(transform)}
        </P>
      )
    case 'ul':
      return <Ul key={index}>{node.childNodes.map(transform)}</Ul>
    case 'ol':
      return <Ol key={index}>{node.childNodes.map(transform)}</Ol>
    case 'li':
      return (
        <Li weight={3} key={index}>
          {node.childNodes.map(transform)}
        </Li>
      )
    case 'em':
      return <em key={index}>{node.childNodes.map(transform)}</em>
    case 'strong':
      return <strong key={index}>{node.childNodes.map(transform)}</strong>
    case 'a':
      const href = node?.attrs?.href
      if (!href) return null

      const isInternal = internalUrlRegex.test(href)
      if (isInternal) {
        const { href: aHref, as } = getLinkFromHref(href)
        return (
          <Link key={index} href={aHref} as={as}>
            <a>{node.childNodes.map(transform)}</a>
          </Link>
        )
      }
      return (
        <a key={index} href={href} target="_blank" rel="noopener noreferrer">
          {node.childNodes.map(transform)}
        </a>
      )
    case 'meta':
      return null
    default:
      return (
        <React.Fragment key={index}>
          {node.childNodes.map(transform)}
        </React.Fragment>
      )
  }
}

export const parseHTML = (htmlString?: string | null): React.ReactNode => {
  if (!htmlString) return null
  const parsed = parser.parse(wrapBareText(htmlString))
  return transform(parsed, 'root')
}

export function arrayify<T>(i: T | T[]): T[] {
  return Array.isArray(i) ? i : [i]
}

export const getIdFromBase64 = (data: string): string => {
  let id,
    indentifier = 'gid://'
  const buffer = Buffer.from(decodeURIComponent(data), 'base64')
  const frag = buffer.toString('utf-8').split(indentifier)
  if (frag.length >= 2) {
    let last = frag[1].split('/').pop()

    if (last) {
      id = last
    }
  }

  return id
}

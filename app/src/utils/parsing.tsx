import * as React from 'react'
import Link from 'next/link'
import * as htmlparser2 from 'htmlparser2'
import { getLinkFromHref } from './links'
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

const wrapBareText = (text: string) =>
  text
    .replace(/^(?!<)(.*)(<\/\w+>)?/gm, '<span>$1</span>')
    .replace('<span></span>', '')
    .replace(/<meta [^>]+>/g, '')
    .replace(/ data(.*?)(?=")(?:[^"]*"){2}/g, '')

const internalUrlRegex =
  /^https?:\/\/(www.)?(localhost:3000|spinellikilcollin.com|spinellikilcollin.(good-idea.)?now.sh)(\/[\w|\/]+)?/

const transform = (node, index) => {
  switch (node.type) {
    case 'root':
      return (
        <React.Fragment key={index}>
          {node.children.map(transform)}
        </React.Fragment>
      )
    case 'text':
      return <React.Fragment key={index}>{node.data}</React.Fragment>
    case 'tag':
      switch (node.name) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6':
          return (
            <Heading level={4} key={index}>
              {node.children.map(transform)}
            </Heading>
          )
        case 'p':
        case 'span':
          if (node.parent && node.parent.type !== 'root') {
            return <Span key={index}>{node.children.map(transform)}</Span>
          }
          return (
            <P key={index} weight={2}>
              {node.children.map(transform)}
            </P>
          )
        case 'ul':
          return <Ul key={index}>{node.children.map(transform)}</Ul>
        case 'ol':
          return <Ol key={index}>{node.children.map(transform)}</Ol>
        case 'li':
          return (
            <Li weight={3} key={index}>
              {node.children.map(transform)}
            </Li>
          )
        case 'i':
        case 'em':
          return <em key={index}>{node.children.map(transform)}</em>
        case 'b':
        case 'strong':
          return <strong key={index}>{node.children.map(transform)}</strong>
        case 'a':
          const href = node?.attribs?.href
          if (!href) return null
          const isInternal = internalUrlRegex.test(href)
          if (isInternal) {
            const { href: aHref, as } = getLinkFromHref(href)
            return (
              <Link key={index} href={aHref} as={as}>
                <a>{node.children.map(transform)}</a>
              </Link>
            )
          }
          return (
            <a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {node.children.map(transform)}
            </a>
          )
        case 'meta':
          return null
        default:
          if (node.children == undefined) return null
          return (
            <React.Fragment key={index}>
              {node.children.map(transform)}
            </React.Fragment>
          )
      }
    default:
      return null
  }
}

export const parseHTML = (htmlString?: string | null): React.ReactNode => {
  if (!htmlString) return null
  const parsed = htmlparser2.parseDocument(wrapBareText(htmlString))
  return transform(parsed, 'root')
}

export function arrayify<T>(i: T | T[]): T[] {
  return Array.isArray(i) ? i : [i]
}

export const kebabCase = (str: string) =>
  str
    ?.match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g)
    ?.filter(Boolean)
    .map((x) => x.toLowerCase())
    .join('-')

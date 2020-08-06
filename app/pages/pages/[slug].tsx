import * as React from 'react'
import { NotFound } from '../../src/views'

type RedirectTuple = [string, string] | [string, string, string]

const redirects: RedirectTuple[] = [
  ['about-us', '/about'],
  ['contact', '/about/[pageSlug]', '/about/contact'],
  ['shipping-returns', '/about/[pageSlug]', '/about/shipping-and-returns'],
  ['sustainability-and-ethics-policy', '/about/[pageSlug]', '/about/sk-ethics'],
  ['diamond-education', '/about/[pageSlug]', '/about/diamond-education'],
  ['find-us', '/about'],
  ['custom', '/customize'],
  ['925-magazine', '/925'],
]

interface RedirectProps {
  href: string
  as?: string
}

export const PageRedirect = () => {
  return <NotFound />
}

export async function getServerSideProps({ params, req, res }) {
  const { slug } = params
  const match = redirects.find((r) => r[0] === slug)
  if (match) {
    res.setHeader('location', match[1])
    res.statusCode = 302
    res.end()
  }
  return { props: { shopData: {} } }
}

export default PageRedirect

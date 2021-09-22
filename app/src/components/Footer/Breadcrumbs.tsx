import * as React from 'react'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  ShopifyProduct,
  ShopifyCollection,
  Page,
  JournalEntry,
} from '../../types'
import { request } from '../../../src/graphql'

import { BreadcrumbWrapper } from './styled'

const { useState, useEffect } = React

const productQuery = gql`
  query ProductsPageQuery($handle: String) {
    allShopifyProduct(
      where: { handle: { eq: $handle }, archived: { neq: true } }
    ) {
      __typename
      _id
      _key
      shopifyId
      title
      handle
      collections {
        __typename
        _id
        _key
        title
        handle
        shopifyId
      }
      variants {
        __typename
        _key
        _type
        shopifyVariantID
        title
      }
    }
  }
`
const collectionQuery = gql`
  query CollectionQuery($handle: String) {
    allShopifyCollection(
      where: { handle: { eq: $handle }, archived: { neq: true } }
    ) {
      __typename
      _id
      _type
      _key
      title
      handle
      archived
      shopifyId
    }
  }
`
const pageQuery = gql`
  query PageQuery($slug: String!) {
    allPage(where: { slug: { current: { eq: $slug } } }) {
      __typename
      title
      subtitle
      slug {
        current
      }
    }
  }
`
const journalEntryQuery = gql`
  query JournalEntryQuery($slug: String) {
    allJournalEntry(where: { slug: { current: { eq: $slug } } }) {
      _id
      _type
      title
      subtitle
      slug {
        current
      }
    }
  }
`

interface Response {
  allShopifyProduct: ShopifyProduct[]
  allShopifyCollection: ShopifyCollection[]
  allPage: Page[]
  allJournalEntry: JournalEntry[]
}

interface BreadcrumbProps {
  route: string
  label: string
  link: string
}

const Route2LabelMap = {
  '/': 'Home',
  '/404': 'Page Not Found',
  '/about': 'About',
  '/about/contact': 'Contact',
  '/about/team': 'Team',
  '/blogs': 'Blog',
  '/collections': 'Collections',
  '/customize': 'Customize',
  '/journal': 'Journal',
  '/pages': 'Pages',
  '/pages/[slug]': 'Page Not Found',
  '/products': 'Collection',
  '/customize/quiz': 'Quiz',
}

export const Breadcrumbs = () => {
  const router = useRouter()
  const [crumbs, setCrumbs] = useState([])
  const storage = globalThis?.sessionStorage
  const getProduct = async () => {
    const handle = router?.query.productSlug
    const variables = { handle }
    const [response] = await Promise.all([
      request<Response>(productQuery, variables),
    ])
    const products = response?.allShopifyProduct
    const product = products && products.length ? products[0] : null
    return product
  }
  const getCollection = async (handle) => {
    const variables = { handle }
    const [response] = await Promise.all([
      request<Response>(collectionQuery, variables),
    ])
    const collections = response?.allShopifyCollection
    const collection = collections && collections.length ? collections[0] : null
    return collection
  }
  const getPage = async (slug) => {
    const variables = { slug }
    const [response] = await Promise.all([
      request<Response>(pageQuery, variables),
    ])
    const pages = response?.allPage
    const page = pages && pages.length ? pages[0] : null
    return page
  }
  const getJournalEntry = async (slug) => {
    const variables = { slug }
    const [response] = await Promise.all([
      request<Response>(journalEntryQuery, variables),
    ])
    const entries = response?.allJournalEntry
    const entry = entries && entries.length ? entries[0] : null
    return entry
  }

  useEffect(() => {
    const segmentsPath = router.asPath.split('/')
    const segmentsRoute = router.route.split('/')
    const crumbLinks = CombineAccumulatively(segmentsPath)
    const crumbLabels = CombineAccumulatively(segmentsRoute)

    const fetchCrumbs = async () => {
      switch (segmentsRoute[1]) {
        case 'products':
          const product = await getProduct()
          if (
            typeof storage.prevPath !== 'undefined' &&
            storage.prevPath.split('/')[1] == 'collections'
          ) {
            const segmentsPrevPath = storage.prevPath.split('/')
            const productCollection = await getCollection(segmentsPrevPath[2])
            const collectionLink =
              `/collections/${segmentsPrevPath[2]}` ||
              '/collections/new-arrivals'
            const collectionLabel = productCollection?.title || 'Collection'
            crumbLinks.splice(1, 1, collectionLink)
            crumbLabels.splice(1, 1, collectionLabel)
          } else {
            const collection =
              product?.collections && product?.collections.length
                ? product.collections[0]
                : null
            const collectionLink =
              collection !== null
                ? `/collections/${collection.handle}`
                : '/collections/new-arrivals'
            const collectionLabel =
              collection !== null ? collection.title : 'Collection'
            crumbLinks.splice(1, 1, collectionLink)
            crumbLabels.splice(1, 1, collectionLabel)
          }
          crumbLabels[2] = product?.title || 'Product'
          break
        case 'collections':
          const handle = router.query?.collectionSlug
          const collection = handle ? await getCollection(handle) : null
          crumbLinks.splice(1, 1)
          crumbLabels.splice(1, 1)
          crumbLabels[1] = collection?.title
          break
        case 'about':
          if (
            segmentsRoute.length > 2 &&
            segmentsRoute[2] !== 'contact' &&
            segmentsRoute[2] !== 'team'
          ) {
            const page = await getPage(router.query?.pageSlug)
            crumbLabels[2] = page?.title
          }
          break
        case 'journal':
          if (segmentsRoute.length > 2) {
            const journal = await getJournalEntry(router.query?.entrySlug)
            crumbLabels[2] = journal?.title
          }
          break
        case '':
          crumbLinks.splice(1, 1)
          crumbLabels.splice(1, 1)
          break
        default:
      }

      const crumbs = crumbLinks.map((link, index) => {
        const route = crumbLabels[index]
        const crumb = {
          link: link,
          route: route,
          label: Route2LabelMap[route] || route,
        }
        return crumb
      })
      setCrumbs(crumbs)
    }
    fetchCrumbs()
    console.log({
      router: router,
      storage: storage,
      crumbs: crumbs,
      crumbLinks: crumbLinks,
      crumbLabels: crumbLabels,
      segmentsRoute: segmentsRoute,
      segmentsPath: segmentsPath,
    })
  }, [router.asPath])

  return (
    <BreadcrumbWrapper>
      {crumbs.map((c: BreadcrumbProps, i: number) => {
        return (
          <div key={i}>
            {i > 0 ? <div className={'separator'}>{'→'}</div> : null}
            <div className={i == crumbs.length - 1 ? 'active ' : ''}>
              <Link href={c.link}>
                <a>{c.label}</a>
              </Link>
            </div>
          </div>
        )
      })}
      <div className={'border'} />
    </BreadcrumbWrapper>
  )
}

function CombineAccumulatively(segments) {
  const links = segments.reduce((acc, cur, curIndex) => {
    const last = curIndex > 1 ? acc[curIndex - 1] : ''
    const newPath = last + '/' + cur
    acc.push(newPath)
    return acc
  }, [])
  return links
}

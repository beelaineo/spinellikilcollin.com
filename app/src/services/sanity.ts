import createSanityClient from '@sanity/client'
import { Document } from '../types'
import { withTypenames } from '../utils'
import { config } from '../config'

const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_READ_TOKEN } = config

export const sanityClient = createSanityClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: true, // `false` if you want to ensure fresh data
  useProjectHostname: true,
  apiVersion: '2021-10-21',
})

export const sanityClientForPreview = createSanityClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: SANITY_READ_TOKEN,
  useCdn: false,
  useProjectHostname: true,
  apiVersion: '2021-10-21',
  withCredentials: true,
})

export const sanityQuery = async <R = Document[]>(
  query: string,
  params?: Record<string, any>,
): Promise<R> => {
  const results = await sanityClient.fetch<R>(query, params || {})
  // @ts-ignore
  return withTypenames<R>(results)
}

export const sanityPreviewQuery = async <R = Document[]>(
  query: string,
  params?: Record<string, any>,
): Promise<R> => {
  const results = await sanityClientForPreview.fetch<R>(query, params || {})

  // @ts-ignore
  return withTypenames<R>(results)
}

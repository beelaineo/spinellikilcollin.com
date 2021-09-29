import { DocumentNode } from 'graphql'
import { useState, useEffect } from 'react'
import { request } from '../graphql'
import { sanityClient } from '../services/sanity'

interface UseRefetchConfig<DataType, Response> {
  /** The initial query that should be refetched */
  query: DocumentNode
  /** Any params for the initial query */
  queryParams?: Record<string, any>
  /** The listener query */
  listenQuery: string
  /** Any params for the listener query */
  listenQueryParams?: Record<string, any>
  /** An optional function used to extract data from the response */
  parseResponse?: (r: Response) => DataType | null
  /** An option to enable refetching */
  enabled: boolean
}

export const useRefetch = <DataType, Response>(
  initialData: DataType,
  config: UseRefetchConfig<DataType, Response>,
) => {
  const {
    query,
    queryParams,
    listenQuery,
    listenQueryParams,
    parseResponse,
    enabled,
  } = config
  const [data, setData] = useState(initialData)
  const [lastRev, setLastRev] = useState<string | null>(null)

  const refetch = async () => {
    const result = await request<Response>(query, queryParams)
    const newData = parseResponse ? parseResponse(result) : result
    setData(newData)
  }

  /**
   * Refetch whenever the queried document's _rev has changed
   */
  useEffect(() => {
    if (!lastRev) return
    refetch()
  }, [lastRev])

  useEffect(() => {
    if (!enabled) return
    console.log('listening for revisions on sanity document')
    const subscription = sanityClient
      .listen(listenQuery, listenQueryParams)
      .subscribe((update) => {
        console.log('document updated:', update)
        setLastRev(update.result._rev)
      })
    return () => subscription.unsubscribe()
  }, [enabled])

  return data
}

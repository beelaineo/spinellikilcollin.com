import { DocumentNode } from 'graphql'
import { useState, useEffect } from 'react'
import { requestTokenized } from '../graphql'
import { sanityClientForPreview } from '../services/sanity'

interface UseRefetchConfig<DataType, Response> {
  /** The listener query */
  listenQuery: string
  /** Any params for the listener query */
  listenQueryParams?: Record<string, any>
  /** The initial query that should be refetched */
  refetchQuery: DocumentNode
  /** Any params for the refetch query */
  refetchQueryParams?: Record<string, any>
  /** An optional function used to extract data from the response */
  parseResponse?: (r: Response) => DataType
  /** An option to enable refetching */
  enabled: boolean | null | undefined
  token: string | null | undefined
}

export const useRefetch = <DataType, Response>(
  initialData: DataType,
  config: UseRefetchConfig<DataType, Response>,
) => {
  const {
    listenQuery,
    listenQueryParams,
    refetchQuery,
    refetchQueryParams,
    parseResponse,
    enabled,
    token,
  } = config
  const [data, setData] = useState(initialData)
  const [lastRev, setLastRev] = useState<string | undefined>(undefined)

  const refetch = async () => {
    if (!token) return
    const headers = { Authorization: `Bearer ${token}` }
    const result = await requestTokenized<Response>(
      refetchQuery,
      refetchQueryParams,
      headers,
    )
    const newData = parseResponse ? parseResponse(result) : result
    //@ts-ignore
    setData(newData)
  }

  /**
   * Refetch whenever the queried document's _rev has changed
   */
  useEffect(() => {
    if (!lastRev) return
    console.log('refetching preview data...')
    refetch()
  }, [lastRev])

  useEffect(() => {
    if (!enabled) return
    refetch()
    // need to add a conditional to return if there's no draft document
    console.log('listening for revisions on sanity document')
    const subscription = sanityClientForPreview
      .listen(listenQuery, listenQueryParams)
      .subscribe((update) => {
        console.log('document updated:', update)
        setLastRev(update.result?._rev)
      })
    return () => subscription.unsubscribe()
  }, [enabled])

  return data
}

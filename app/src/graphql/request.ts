import useSWR, { SWRResponse as ResponseInterface } from 'swr'
import { DocumentNode } from 'graphql'
import { print } from 'graphql/language/printer'
import { request as gqlRequest } from 'graphql-request'
import { useError } from '../providers/ErrorProvider'
import { config } from '../config'

const { SANITY_GRAPHQL_URL } = config

type Variables = { [key: string]: any }

interface RequestOptions {
  skip?: boolean
}

interface RequestArgs<V> {
  query: DocumentNode | string
  variables?: V
  options?: RequestOptions
  headers?: HeadersInit | undefined
}

export const request = async <R, V extends Variables = Variables>(
  query: DocumentNode | string,
  variables?: V,
): Promise<R> => {
  try {
    const result = await gqlRequest<R>(
      SANITY_GRAPHQL_URL,
      typeof query === 'string' ? query : print(query),
      variables,
    )
    return result
  } catch (err: any | unknown) {
    console.error(err?.response)
    const error =
      err instanceof Error
        ? err
        : new Error(`Network error: Failed to connect to ${SANITY_GRAPHQL_URL}`)

    throw error
  }
}

export const requestTokenized = async <R, V extends Variables = Variables>(
  query: DocumentNode | string,
  variables?: V,
  headers?: HeadersInit | undefined,
): Promise<R> => {
  try {
    const result = await gqlRequest<R>(
      SANITY_GRAPHQL_URL,
      typeof query === 'string' ? query : print(query),
      variables,
      headers,
    )
    return result
  } catch (err: any | unknown) {
    console.error(err?.response)
    const error =
      err instanceof Error
        ? err
        : new Error(`Network error: Failed to connect to ${SANITY_GRAPHQL_URL}`)

    throw error
  }
}

export const useRequest = <R, V extends Variables = Variables>(
  query: DocumentNode,
  variables?: V,
) => {
  const { handleError } = useError()
  try {
    return useSWR<R | null>(
      [print(query), JSON.stringify(variables)],
      (q: string | DocumentNode) => request<R>(q, variables),
    )
  } catch (e: any | unknown) {
    handleError(e, 'graphql_request_error', { query, variables })
  }
}

type LazyRequestTuple<R, V extends Variables = Variables> = [
  (v: V) => Promise<void>,
  ResponseInterface<R | null, Error>,
]

export const useLazyRequest = <R, V extends Variables = Variables>(
  query: DocumentNode,
  variables?: V,
): LazyRequestTuple<R, V> => {
  const { handleError } = useError()
  const response = useSWR<R | null>(
    [print(query), JSON.stringify(variables)],
    async () => {
      return null
    },
    { revalidateOnFocus: false },
  )

  const executeQuery = async (variables?: V) => {
    try {
      const result = await request<R>(query, variables)
      response.mutate(result, false)
    } catch (e: any | unknown) {
      handleError(e, 'graphql_request_error', { query, variables })
    }
  }

  return [executeQuery, response]
}

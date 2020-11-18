import useSWR, { responseInterface as ResponseInterface } from 'swr'
import { DocumentNode } from 'graphql'
import { print } from 'graphql/language/printer'
import { request as gqlRequest } from 'graphql-request'
import { useError } from '../providers'
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
  } catch (err) {
    console.error(err)
    throw new Error(`Network error: Failed to connect to ${SANITY_GRAPHQL_URL}`)
  }
}

export const useRequest = <R, V extends Variables = Variables>(
  query: DocumentNode,
  variables?: V,
) => {
  const { handleError } = useError()
  try {
    return useSWR<R | null>([print(query), JSON.stringify(variables)], (q) =>
      request<R>(q, variables),
    )
  } catch (e) {
    handleError(e)
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
    } catch (e) {
      handleError(e)
    }
  }

  return [executeQuery, response]
}

import { useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'
import { Product, Collection } from '../../types'
import { algoliaIndex } from '../../services/algolia'

export type SearchResult = Product | Collection

interface SearchHit {
  document: SearchResult
}

enum ActionTypes {
  OPEN = 'open',
  CLOSE = 'close',
  START_SEARCH = 'startSearch',
  SUCCESS = 'success',
  RESET = 'reset',
  ERROR = 'error',
  SET_TERM = 'setSearchTerm',
}

interface OpenAction {
  type: ActionTypes.OPEN
  searchTerm?: string
}

interface CloseAction {
  type: ActionTypes.CLOSE
}

interface SetTermAction {
  type: ActionTypes.SET_TERM
  searchTerm?: string
}

interface ResetAction {
  type: ActionTypes.RESET
}

interface SearchAction {
  searchTerm?: string
  type: ActionTypes.START_SEARCH
}

interface SuccessAction {
  type: ActionTypes.SUCCESS
  searchResults: SearchResult[]
}

interface ErrorAction {
  type: ActionTypes.ERROR
  errorMessage: string
}

type Action =
  | OpenAction
  | CloseAction
  | ResetAction
  | SearchAction
  | SetTermAction
  | SuccessAction
  | ErrorAction

const initialSearchState: SearchState = {
  open: false,
  loading: false,
  searchResults: undefined,
  searchTerm: '',
  errorMessage: undefined,
}

const reducer = (state: SearchState, action: Action): SearchState => {
  switch (action.type) {
    case ActionTypes.OPEN:
      return {
        ...state,
        open: true,
        searchTerm: action.searchTerm ? action.searchTerm : state.searchTerm,
      }
    case ActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      }
    case ActionTypes.RESET:
      return initialSearchState
    case ActionTypes.START_SEARCH:
      return {
        ...state,
        searchTerm: action.searchTerm ? action.searchTerm : state.searchTerm,
        open: true,
        loading: true,
      }
    case ActionTypes.SUCCESS:
      return {
        ...state,
        loading: false,
        searchResults: action.searchResults,
      }
    case ActionTypes.SET_TERM:
      return {
        ...state,
        searchTerm: action.searchTerm || '',
      }

    case ActionTypes.ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.errorMessage,
      }
    default:
      // @ts-ignore
      throw new Error(`Action "${action.type}" is not a valid action`)
  }
}

export interface SearchState {
  loading: boolean
  open: boolean
  searchTerm: string
  searchResults?: SearchResult[]
  errorMessage?: string
}

export interface SearchActions {
  search: (searchTerm?: string) => Promise<void>
  openSearch: (searchTerm?: string) => void
  closeSearch: () => void
  reset: () => void
  setSearchTerm: (
    searchTerm?: string | React.ChangeEvent<HTMLInputElement>,
  ) => void
  startSearch: (searchTerm?: string) => void
  onError: (errorMessage: string) => void
  onSuccess: (searchResults: SearchResult[]) => void
}

export const useSearchReducer = () => {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, initialSearchState)

  const { asPath } = router

  const openSearch = (searchTerm?: string) => {
    dispatch({ type: ActionTypes.OPEN, searchTerm })
  }

  const closeSearch = () => dispatch({ type: ActionTypes.CLOSE })

  const setSearchTerm = (
    input?: string | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const searchTerm =
      input === undefined
        ? ''
        : typeof input === 'string'
        ? input
        : input.target.value
    dispatch({ type: ActionTypes.SET_TERM, searchTerm })
  }

  const reset = () => dispatch({ type: ActionTypes.RESET })

  const startSearch = (searchTerm?: string) => {
    if (searchTerm || state.searchTerm) {
      const pathWithoutParams = asPath.replace(/\?(.*)$/, '')
      const matches = asPath.match(/\?(.*)$/)
      const existingParams = matches && matches[1] ? matches[1] : undefined
      const params = new URLSearchParams(existingParams)

      params.set('search', searchTerm || state.searchTerm)
      const pathWithSearchParam = pathWithoutParams
        .concat('?')
        .concat(params.toString())
      router.push(router.pathname, pathWithSearchParam, { shallow: true })
    }
    if (document?.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    dispatch({ type: ActionTypes.START_SEARCH, searchTerm })
  }

  const onError = (errorMessage: string) =>
    dispatch({ type: ActionTypes.ERROR, errorMessage })
  const onSuccess = (searchResults: SearchResult[]) =>
    dispatch({ type: ActionTypes.SUCCESS, searchResults })

  const search = async (newSearchTerm?: string): Promise<void> => {
    if (newSearchTerm) setSearchTerm(newSearchTerm)
    const searchTerm = newSearchTerm || state.searchTerm
    if (!searchTerm.length) return

    startSearch(newSearchTerm)
    const term = searchTerm.trim()

    // const searchWithAdditionalMatches = (search) => {
    //   const matches = {
    //     rose: 'rg',
    //     black: 'bg',
    //     yellow: 'yg',
    //   }

    //   const additionalMatches = Object.entries(matches)
    //     .map(([key, value]) => {
    //       return search && search.includes(key) && value
    //     })
    //     .filter(Boolean)

    //   return additionalMatches.length
    //     ? search.concat(' ', additionalMatches.join(' '))
    //     : search
    // }

    // const termSingular = term.replace(/s$/, '')
    // const params = { searchTerm: term, searchTermSingular: termSingular }

    const { hits } = await algoliaIndex.search<SearchHit>(term, {
      hitsPerPage: 100,
      typoTolerance: 'min',
      exactOnSingleWordQuery: 'word',
      filters: `hideFromSearch:false`,
    })

    const results = hits
      .map((hit) => {
        const result = hit.document
        // @ts-ignore
        const optionDescriptions = hit?._highlightResult?.optionDescriptions
        // @ts-ignore
        const optionNames = hit?._highlightResult?.optionNames

        return { ...result, matches: { optionDescriptions, optionNames } }
      })
      .filter(Boolean)
      .filter((hit) => hit.hidden !== true)

    onSuccess(results || [])
  }

  /*
   * Effects
   **/

  /* close the search pane if navigating to a new path,
   * unless that new path contains a search string */
  useEffect(() => {
    const params = new URLSearchParams(asPath.replace(/^(.*)\?/, ''))
    const searchParam = params.get('search')
    if (!searchParam || searchParam.length === 0) {
      closeSearch()
    } else {
      search(searchParam)
    }
  }, [asPath])

  const actions: SearchActions = {
    search,
    openSearch,
    closeSearch,
    setSearchTerm,
    reset,
    startSearch,
    onError,
    onSuccess,
  }

  return { state, actions }
}

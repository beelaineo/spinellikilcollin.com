import * as React from 'react'
import { SearchState, SearchActions, useSearchReducer } from './reducer'
import { useNavigation } from '../NavigationProvider'

const { useEffect } = React

type SearchContextValue = SearchState &
  Pick<
    SearchActions,
    'reset' | 'openSearch' | 'closeSearch' | 'setSearchTerm'
  > & {
    search: (searchTerm?: string) => Promise<void>
  }

const SearchContext = React.createContext<SearchContextValue | undefined>(
  undefined,
)

export const SearchConsumer = SearchContext.Consumer

export const useSearch = () => {
  const ctx = React.useContext(SearchContext)
  if (!ctx)
    throw new Error('useSearchContext must be used within a SearchProvider')
  return ctx
}

interface SearchProps {
  children: React.ReactNode
}

export const SearchProvider = ({ children }: SearchProps) => {
  const { state, actions } = useSearchReducer()
  const { closeMenu } = useNavigation()

  useEffect(() => {
    if (state.open) {
      closeMenu()
    }
  }, [state.open])

  const value: SearchContextValue = {
    ...state,
    ...actions,
  }

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}

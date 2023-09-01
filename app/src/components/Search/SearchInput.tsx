import * as React from 'react'
import {
  AutocompleteItem,
  SearchForm,
  SearchInputWrapper,
  StyledSearchInput,
} from './styled'
import { Button } from '../Button'
import { useSearch } from '../../providers/SearchProvider'
import { algoliaClient } from '../../services/algolia'
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches'
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions'
import { useRouter } from 'next/router'

import { createAutocomplete } from '@algolia/autocomplete-core'
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia'
import { debounced, uniqBy } from './utlis'

const { useRef, useEffect, useState, useMemo } = React

export const SearchInput = () => {
  function Autocomplete() {
    const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
      key: 'RECENT_SEARCH',
      limit: 5,
    })

    const router = useRouter()

    const { open, loading, search, searchTerm, setSearchTerm } = useSearch()

    const querySuggestionsPlugin = createQuerySuggestionsPlugin({
      searchClient: algoliaClient,
      indexName: 'Storefront Search Query Suggestions',
    })
    const inputRef = useRef<HTMLInputElement>(null)

    const [autocompleteState, setAutocompleteState] = useState<any>({})

    useEffect(() => {
      if (open && inputRef.current && !loading) inputRef.current.focus()
    }, [autocompleteState, loading, open])

    const removeDuplicates = uniqBy(({ source, item }) =>
      source.sourceId === 'querySuggestionsPlugin'
        ? item.query
        : source.sourceId === 'products'
        ? item.title
        : item.label,
    )

    const autocomplete = useMemo(
      () =>
        createAutocomplete({
          onStateChange({ state }) {
            // (2) Synchronize the Autocomplete state with the React state.
            setAutocompleteState(state)
          },
          plugins: [recentSearchesPlugin, querySuggestionsPlugin],
          //@ts-ignore
          reshape({ sourcesBySourceId }) {
            const { recentSearchesPlugin, querySuggestionsPlugin, products } =
              sourcesBySourceId

            return [
              removeDuplicates(
                recentSearchesPlugin,
                querySuggestionsPlugin,
                products,
              ),
            ]
          },
          openOnFocus: true,
          initialState: {
            // This uses the `search` query parameter as the initial query
            query: searchTerm,
          },
          onSubmit({ state }) {
            setSearchTerm(state.query)
            router.push(
              {
                query: { search: state.query },
              },
              '',
              { shallow: true },
            )
          },
          //@ts-ignore
          getSources({ query }) {
            return debounced([
              // (3) Use an Algolia index source.
              {
                sourceId: 'products',

                getItems() {
                  return getAlgoliaResults({
                    searchClient: algoliaClient,
                    queries: [
                      {
                        indexName: 'Storefront Search',
                        query,
                        params: {
                          hitsPerPage: 4,
                        },
                      },
                    ],
                  })
                },
                getItemInputValue({ item }) {
                  return item.title
                },
              },
            ])
          },
        }),
      [],
    )

    return (
      <SearchInputWrapper
        className="aa-Autocomplete"
        {...autocomplete.getRootProps({})}
      >
        <SearchForm
          disabled={loading}
          className="aa-Form"
          {...autocomplete.getFormProps({ inputElement: inputRef.current })}
        >
          <StyledSearchInput
            ref={inputRef}
            name="searchTerm"
            aria-label="search term"
            className="aa-Input"
            //@ts-ignore
            {...autocomplete.getInputProps({})}
          />

          <div className="aa-Panel">
            {!loading &&
              autocompleteState?.collections?.map(
                (collection: any, index: number) => {
                  const { source, items } = collection

                  return (
                    <div key={`source-${index}`} className="aa-Source">
                      {items.length > 0 && (
                        <ul
                          className="aa-List"
                          {...autocomplete.getListProps()}
                        >
                          {items.map((item: any) => {
                            return (
                              <AutocompleteItem
                                key={item.objectID}
                                className="aa-Item"
                                {...autocomplete.getItemProps({
                                  item,
                                  source,
                                })}
                              >
                                {source.sourceId === 'querySuggestionsPlugin'
                                  ? item.query
                                  : source.sourceId === 'products'
                                  ? item.title
                                  : item.label}
                              </AutocompleteItem>
                            )
                          })}
                        </ul>
                      )}
                    </div>
                  )
                },
              )}
          </div>
          <Button level={1} type="submit">
            Search
          </Button>
        </SearchForm>
      </SearchInputWrapper>
    )
  }
  return <Autocomplete />
}

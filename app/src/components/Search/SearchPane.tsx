import * as React from 'react'
import { Column } from '../Layout'
import { Heading } from '../Text'
import { ProductGrid } from '../Product'
import { Button } from '../Button'
import { useLockScroll } from '../LockScroll'
import { useSearch } from '../../providers/SearchProvider'
import { SearchInput } from './SearchInput'
import { Hamburger } from '../Hamburger'
import { Loading } from '../Loading'
import {
  Outer,
  CloseButton,
  SearchHeader,
  Results,
  ResultsInner,
  Wrapper,
} from './styled'
import { Footer } from '../Footer'

const { useEffect } = React

export const SearchPane = () => {
  const {
    open,
    loading,
    errorMessage,
    searchResults,
    openSearch,
    reset,
    closeSearch,
    searchTerm,
  } = useSearch()
  const { lockScroll, unlockScroll } = useLockScroll()

  /* Handlers */

  const close = () => {
    closeSearch()
    reset()
  }

  useEffect(() => {
    if (open) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [open])

  /** Effects */
  useEffect(() => {
    // Open the view on a new search
    // This could happen if the search is triggered from outside of
    // this component
    if (!open && loading) openSearch()
  }, [loading])

  const countMessage = searchResults
    ? `Found ${searchResults.length} result${
        searchResults.length === 1 ? '' : 's'
      }`
    : undefined

  const preferredVariantMatches = [searchTerm]
  return (
    <Outer>
      <Wrapper visible={open}>
        <SearchHeader hidden={!open}>
          <Column maxWidth="medium">
            <SearchInput />
          </Column>
        </SearchHeader>
        <CloseButton hidden={!open}>
          <Hamburger
            open={true}
            onClick={close}
            aria-label="Close search pane"
          />
        </CloseButton>
        {searchResults === undefined ? null : (
          <Results>
            <ResultsInner hidden={!open}>
              {loading ? (
                <Loading />
              ) : errorMessage ? (
                <Heading level={3}>Sorry, an error occurred.</Heading>
              ) : searchResults.length === 0 ? (
                <Heading weight={1} level={2}>
                  Sorry, there were no search results.
                </Heading>
              ) : (
                <>
                  {countMessage ? (
                    <Heading
                      mt={3}
                      mb={4}
                      fontStyle="italic"
                      weight={1}
                      level={5}
                    >
                      {countMessage}
                    </Heading>
                  ) : null}

                  <ProductGrid
                    preferredVariantMatches={preferredVariantMatches}
                    items={searchResults}
                  />
                  <Button mt={6} onClick={close} level={2} hidden={!open}>
                    Close Search
                  </Button>
                </>
              )}
            </ResultsInner>
          </Results>
        )}
        <div hidden={!open}>
          <Footer />
        </div>
      </Wrapper>
    </Outer>
  )
}

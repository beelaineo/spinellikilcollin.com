import * as React from 'react'
import { Column } from '../Layout'
import { Heading } from '../Text'
import { ProductGrid } from '../Product'
import { Button } from '../Button'
import { useLockScroll } from '../LockScroll'
import { useSearch } from '../../providers/SearchProvider'
import { useShopifyPrice } from '../../providers/ShopifyPriceProvider'
import { SearchInput } from './SearchInput'
import { Hamburger } from '../Hamburger'
import { Loading } from '../Loading'
import { unique } from '../../utils'

import {
  Outer,
  CloseButton,
  SearchHeader,
  Results,
  ResultsInner,
  Wrapper,
} from './styled'
import { Maybe } from '../../types'
import { Footer } from '../Footer'

const { useEffect } = React

export const SearchPane = ({ breadCrumbs }) => {
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
  const { clearSearchResultPrices } = useShopifyPrice()

  /* Handlers */

  const close = () => {
    closeSearch()
    clearSearchResultPrices()
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

  interface StripTag {
    replace(expr: RegExp, arg1: string): string
    str?: Maybe<Array<string>>
  }

  interface SearchMatch {
    optionDescriptions: Maybe<Array<any>>
    optionNames: Maybe<Array<any>>
    fullyHighlighted?: Maybe<boolean>
    matchLevel?: Maybe<string>
    matchedWords: Maybe<Array<string>>
  }

  const stripTag = (str: StripTag) => {
    const expr = /(<([^>]+)>)/gi
    return str?.replace(expr, '')
  }

  const getBestVariantBySearch = (search) => {
    //1. fullyHighlighted in optionNames
    //2. most combined matched words in optionName and optionDescription

    const variantMatches = search?.map((result) => result.matches)

    const variantMatch = variantMatches?.map((match: SearchMatch) => {
      const descriptions = match?.optionDescriptions
      const names = match?.optionNames

      const isFullyHighlighted =
        names &&
        Object.values(names)?.find(
          (name) =>
            name?.fullyHighlighted === true || name?.matchLevel === 'full',
        )

      const getArrayLengths = (arr) => {
        if (!arr) return
        return Object.values(arr).map((item: any) => {
          return item.matchedWords
        })
      }

      const getArraySums = (arr1, arr2) => {
        if (!arr1) return

        return arr1
          ?.map((e, i) =>
            arr2 && arr2[i]
              ? unique([...e, ...arr2[i]])?.length
              : [...e]?.length,
          )
          .filter((val) => !Number.isNaN(val))
      }

      const mostMatchedVariant = (matches, names) => {
        if (!matches || !names) return

        const index = matches.indexOf(Math.max(...matches))

        return names[index]?.value
      }

      const nameMatches = getArrayLengths(names)
      const descriptionMatches = getArrayLengths(descriptions)
      const summedMatches = getArraySums(nameMatches, descriptionMatches)

      // console.log('search-test: descriptionMatches', descriptionMatches)
      // console.log('search-test: nameMatches', nameMatches)
      // console.log('search-test: summedMatches', summedMatches)
      // console.log(
      //   'search-test: mostMatchedVariant',
      //   mostMatchedVariant(summedMatches, names),
      // )
      return isFullyHighlighted
        ? stripTag(isFullyHighlighted?.value)
        : stripTag(mostMatchedVariant(summedMatches, names))
    })

    return variantMatch
  }

  const matchedVariants = getBestVariantBySearch(searchResults)

  const preferredVariantMatches = matchedVariants || [searchTerm]

  return (
    <Outer>
      <Wrapper $visible={open}>
        <SearchHeader hidden={!open}>
          <Column $columnwidth="medium">
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
          <Footer {...breadCrumbs} />
        </div>
      </Wrapper>
    </Outer>
  )
}

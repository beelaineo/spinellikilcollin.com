import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Filter, Filter as FilterSingleType, FilterMatch } from '../../types'
import { Heading } from '../Text'
import { Label } from '../Forms/Fields/styled'
import { definitely } from '../../utils'
import {
  FilterCheckboxElement,
  FilterCheckboxWrapper,
} from '../Forms/Fields/FilterCheckbox'
import { FilterSetState } from './types'
import {
  PriceRangeFilterWrapper,
  HeadingWrapper,
  FilterSetWrapper,
  FilterIndicatorsWrapper,
  FiltersWrapper,
} from './styled'
import { theme } from '../../theme'
import { useMedia } from '../../hooks'
const { useEffect, useState } = React

interface FilterCheckboxProps {
  filter: Filter
  onChange: () => void
  checked: boolean
  matchKey: string
  hidden: boolean
}

interface WithIsApplied {
  isApplied: boolean
}

const FilterSingleWrapper = styled(PriceRangeFilterWrapper)<WithIsApplied>`
  ${({ theme, isApplied }) => css`
    margin: 0;
    cursor: pointer;
    position: relative;

    &:focus-visible {
      ${theme.focus.bottom()}
    }

    & > div:first-child {
      min-width: 130px !important;
      text-align: center !important;
      justify-content: center !important;
      background-color: ${isApplied
        ? theme.colors.grays[4]
        : theme.colors.grays[2]};
      label {
        background-color: transparent;
      }
    }
    @media screen and (min-width: 961px) {
      &:hover > div:first-child {
        background-color: grays.4;
      }
    }
    @media screen and (max-width: 960px) {
      label {
        margin: 0;
        display: flex;
        width: 100%;
        justify-content: center !important;
        span {
          margin: 0;
          display: inline-block;
          position: absolute;
          right: -6px;
          top: 2px;
        }
      }
    }
    ${theme.mediaQueries.mobile} {
      & > div:first-child {
        min-width: 110px !important;
        padding: 2;
      }
    }
  `}
`

interface FilterSingleProps {
  filterSingle: FilterSingleType
  filterSetState?: FilterSetState
  toggleMatch: (matchKey: string) => () => void
  resetSet: () => void
  setKey: string
  active: boolean
}

interface State {
  matches: FilterMatch[] | null
}

export const FilterSingle = ({
  filterSingle,
  filterSetState,
  toggleMatch,
  resetSet,
  setKey,
  active,
}: FilterSingleProps) => {
  if (!filterSetState) {
    throw new Error('No filterSetState was supplied')
  }

  const { _type, label, matches } = filterSingle
  const { activeMatchKeys } = filterSetState
  if (!matches) return null

  const [mouseEnter, setMouseEnter] = useState(false)
  const handleMouseEnter = () => setMouseEnter(true)
  const handleMouseLeave = () => setMouseEnter(false)

  const handleBlur = (e) => {
    const currentTarget = e.currentTarget

    // Give browser time to focus the next element
    requestAnimationFrame(() => {
      // Check if the new focused element is a child of the original container
      if (!currentTarget.contains(document.activeElement)) {
        setMouseEnter(false)
      }
    })
  }

  return (
    <FilterSingleWrapper
      onMouseEnter={handleMouseEnter}
      onFocus={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
      onClick={toggleMatch(filterSingle._key || 'some-key')}
      isApplied={activeMatchKeys.includes(filterSingle._key || 'foo')}
      tabIndex={0}
    >
      <HeadingWrapper>
        <Heading level={5}>{label}</Heading>
      </HeadingWrapper>
    </FilterSingleWrapper>
  )
}

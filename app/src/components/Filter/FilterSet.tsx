import * as React from 'react'
import { Filter, FilterMatch, FilterSet as FilterSetType } from '../../types'
import { Heading } from '../Text'
import { definitely } from '../../utils'
import {
  FilterCheckboxElement,
  FilterCheckboxWrapper,
} from '../Forms/Fields/FilterCheckbox'
import { Label } from '../Forms/Fields/styled'
import { FilterSetState } from './types'
import {
  HeadingWrapper,
  FilterSetWrapper,
  FilterIndicatorsWrapper,
  FiltersWrapper,
} from './styled'
import { FilterIndicator } from './FilterIndicator'
import { theme } from '../../theme'
import { useMedia } from '../../hooks'
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs'
const { useEffect, useState } = React

interface FilterCheckboxProps {
  filter: Filter
  onChange: () => void
  scrollGridIntoView: () => void
  checked: boolean
  matchKey: string
  hidden: boolean
}

const FilterCheckbox = ({
  matchKey,
  filter,
  onChange,
  scrollGridIntoView,
  checked,
  hidden,
}: FilterCheckboxProps) => {
  const { label } = filter
  const handleChange = () => {
    onChange()
    scrollGridIntoView()
  }
  if (hidden === false) {
    return (
      <FilterCheckboxWrapper>
        <FilterCheckboxElement
          id={matchKey}
          name={matchKey}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          tabIndex={0}
        />
        <Label color="body.9" htmlFor={matchKey}>
          {label}
        </Label>
      </FilterCheckboxWrapper>
    )
  } else {
    return null
  }
}

interface FilterSetProps {
  filterSet: FilterSetType
  filterSetState?: FilterSetState
  toggleMatch: (matchKey: string) => () => void
  resetSet: () => void
  scrollGridIntoView: () => void
  setKey: string
  active: boolean
}

interface State {
  matches: FilterMatch[] | null
}

export const FilterSet = ({
  filterSet,
  filterSetState,
  toggleMatch,
  scrollGridIntoView,
  resetSet,
  setKey,
  active,
}: FilterSetProps) => {
  if (!filterSetState) {
    throw new Error('No filterSetState was supplied')
  }
  const { heading, filters } = filterSet
  const { activeMatchKeys } = filterSetState

  const [mouseEnter, setMouseEnter] = useState(false)
  const isMobile = useMedia({
    maxWidth: `960px`,
  })

  const [, setStone] = useQueryState(
    'stone',
    parseAsArrayOf(parseAsString, ';'),
  )
  const [, setMetal] = useQueryState(
    'metal',
    parseAsArrayOf(parseAsString, ';'),
  )
  const [, setBand] = useQueryState(
    'subcategory',
    parseAsArrayOf(parseAsString, ';'),
  )

  useEffect(() => {
    const getMatches = () => {
      const matches = filterSet?.filters?.filter((f: any) => {
        const match = filterSetState?.activeMatchKeys.includes(f?._key)
        return match
      })

      const formatted = matches?.map((m: any) => {
        const item = m?.matches && m.matches[0]
        const type = item?.type
        const match = item?.match

        return { [type]: match }
      })

      const result = formatted?.reduce((acc: any, curr) => {
        const key = Object.keys(curr)[0]
        const found = acc.find((i) => i[key])
        if (!found) {
          acc.push(curr)
        } else {
          found[key] = [found[key], curr[key]]
        }
        return acc
      }, [])[0]

      filterSet.heading === 'Stone' &&
        setStone(
          result && Object?.keys(result)[0] === 'stone'
            ? Object?.values(result)
            : null,
        )
      filterSet.heading === 'Metal' &&
        setMetal(
          result && Object?.keys(result)[0] === 'metal'
            ? Object?.values(result)
            : null,
        )
      filterSet.heading === 'Bands' &&
        setBand(
          result && Object?.keys(result)[0] === 'subcategory'
            ? Object?.values(result)
            : null,
        )
    }

    getMatches()
  }, [filterSet, filterSetState])

  if (!filters || !filters.length) return null

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
    <FilterSetWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleBlur}
      active={active}
      tabIndex={0}
    >
      <HeadingWrapper
        isActive={Boolean(activeMatchKeys.length > 0)}
        type={heading}
      >
        <Heading textTransform="uppercase" level={5}>
          {Boolean(activeMatchKeys.length > 0) ? heading + ':' : heading}
        </Heading>
        <FilterIndicatorsWrapper
          isActive={Boolean(activeMatchKeys.length > 0)}
          setType={filterSet.heading}
        >
          {Boolean(activeMatchKeys.length > 0)
            ? definitely(filters).map((filter, i) => {
                if (filter._key && activeMatchKeys.includes(filter._key)) {
                  return (
                    <FilterIndicator
                      type={filterSet.heading}
                      label={filter.label}
                      index={i}
                      key={filter._key || 'some-key'}
                      remove={toggleMatch(filter._key || 'some-key')}
                    />
                  )
                }
              })
            : ''}
        </FilterIndicatorsWrapper>
      </HeadingWrapper>
      <FiltersWrapper
        isHovered={
          Boolean(!isMobile && mouseEnter) || Boolean(isMobile && active)
        }
        type={filterSet.heading}
      >
        {definitely(filters).map((filter) => {
          return (
            <FilterCheckbox
              key={filter._key || 'some-key'}
              matchKey={filter._key || 'some-key'}
              onChange={toggleMatch(filter._key || 'some-key')}
              scrollGridIntoView={scrollGridIntoView}
              filter={filter}
              checked={activeMatchKeys.includes(filter._key || 'foo')}
              hidden={Boolean(
                (filterSet.heading === 'Type' ||
                  filterSet.heading === 'Bands' ||
                  filterSet.heading === 'Size' ||
                  filterSet.heading === 'Ring Size') &&
                  filter._key &&
                  activeMatchKeys.includes(filter._key),
              )}
            />
          )
        })}
      </FiltersWrapper>
    </FilterSetWrapper>
  )
}

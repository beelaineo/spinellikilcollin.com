import * as React from 'react'
import { InStockFilter as InStockFilterTypeSource, Maybe } from '../../types'
import { FilterSetState } from './types'
import { PriceRangeFilterWrapper, HeadingWrapper } from './styled'
import { Label } from '../Forms/Fields/styled'
import styled, { css } from '@xstyled/styled-components'
import { parseAsBoolean, useQueryState } from 'nuqs'
import { setIn } from 'formik'
import { useDebounce } from 'react-use'
import { set } from 'husky'

const { useEffect, useState } = React

interface InStockFilterValues {
  label: string
  applyFilter: boolean
}

interface InStockFilterType extends InStockFilterTypeSource {
  applyFilter?: boolean
}

interface InventoryFilterProps {
  inventoryFilter: InStockFilterType
  filterSetState?: FilterSetState
  setValues: (matchKey: string, values: InStockFilterValues) => void
  resetSet: () => void
  scrollGridIntoView: () => void
  setKey: string
  active: boolean
}

interface WithIsApplied {
  isApplied: boolean
}

const InventoryFilterWrapper = styled(PriceRangeFilterWrapper)<WithIsApplied>`
  ${({ theme, isApplied }) => css`
    margin: 0;
    cursor: pointer;
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
  `}
`

const InStockDot = styled('span')`
  display: inline-block;
  background-color: #00d009;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  position: absolute;
  margin-top: 1px;
  margin-left: 10px;
`

export function InventoryFilter({
  inventoryFilter,
  filterSetState,
  setValues,
  scrollGridIntoView,
  resetSet,
  active,
}: InventoryFilterProps) {
  const { _key } = inventoryFilter
  const { label } = filterSetState?.values || {}
  const [applyFilter, setApplyFilter] = useState(false)
  const [mouseEnter, setMouseEnter] = useState(false)
  const handleMouseEnter = () => setMouseEnter(true)
  const handleMouseLeave = () => setMouseEnter(false)
  const [instock, setInstock] = useQueryState('instock', parseAsBoolean)

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded === true) return

    setIsLoaded(
      applyFilter === instock || (applyFilter === false && instock === null),
    )
  }, [applyFilter, instock])

  useDebounce(
    () => {
      setValues('', {
        applyFilter: applyFilter,
        label: label,
      })
    },
    300,
    [applyFilter],
  )

  useEffect(() => {
    setApplyFilter(filterSetState?.values.applyFilter)
  }, [filterSetState])

  const toggleFilter = () => {
    setApplyFilter(!applyFilter)

    scrollGridIntoView()
  }

  useEffect(() => {
    if (!isLoaded) return
    setInstock(!applyFilter ? null : true)
  }, [applyFilter])

  if (!filterSetState) return null

  if (!label) {
    throw new Error('The inventory filter was not configured with a label')
  }

  if (!filterSetState?.values) {
    throw new Error('The inventory filter was not set up with initial values')
  }

  return (
    <InventoryFilterWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={toggleFilter}
      isApplied={applyFilter}
    >
      <HeadingWrapper>
        <Label htmlFor={_key || 'some-key'}>
          {label}
          <InStockDot />
        </Label>
      </HeadingWrapper>
    </InventoryFilterWrapper>
  )
}

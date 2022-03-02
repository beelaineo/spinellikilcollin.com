import * as React from 'react'
import { InventoryFilter as InventoryFilterType } from '../../types'
import { FilterSetState } from './reducer'
import { Span } from '../Text'
import { PriceRangeFilterWrapper, HeadingWrapper } from './styled'
import { Label } from '../Forms/Fields/styled'
import { theme } from '../../theme'
import { useMedia } from '../../hooks'
import styled, { css } from '@xstyled/styled-components'

const { useEffect, useState } = React

interface InventoryFilterValues {
  label: string
  applyFilter: boolean
}

interface InventoryFilterProps {
  inventoryFilter: InventoryFilterType
  filterSetState?: FilterSetState
  setValues: (matchKey: string, values: InventoryFilterValues) => void
  resetSet: () => void
  setKey: string
  active: boolean
}

interface WithIsApplied {
  isApplied: boolean
}

const InventoryFilterWrapper = styled(PriceRangeFilterWrapper)<WithIsApplied>`
  ${({ theme, isApplied }) => css`
    cursor: pointer;
    & > div:first-child {
      min-width: 100px;
      text-align: center;
      justify-content: center;
      background-color: ${isApplied ? theme.colors.grays[3] : 'transparent'};
      label {
        background-color: transparent;
      }
    }
    &:hover > div:first-child {
      background-color: grays.3;
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
  margin-left: 6px;
  border: 1px solid #f5f3f3;
`

export function InventoryFilter({
  inventoryFilter,
  filterSetState,
  setValues,
  active,
}: InventoryFilterProps) {
  const { _key } = inventoryFilter
  if (!filterSetState) return null
  const { label } = filterSetState.values
  const [applyFilter, setApplyFilter] = useState(false)
  const [mouseEnter, setMouseEnter] = useState(false)
  const handleMouseEnter = () => setMouseEnter(true)
  const handleMouseLeave = () => setMouseEnter(false)

  const toggleFilter = () => {
    setApplyFilter(!applyFilter)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValues('', { applyFilter: applyFilter, label: label })
    }, 300)
    return () => clearTimeout(timeout)
  }, [applyFilter])

  if (!label) {
    throw new Error('The inventory filter was not configured with a label')
  }

  if (!filterSetState?.values) {
    throw new Error('The inventory filter was not set up with initial values')
  }

  const isMobile = useMedia({
    maxWidth: `${theme.breakpoints?.md || '650'}px`,
  })

  return (
    <InventoryFilterWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => toggleFilter()}
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

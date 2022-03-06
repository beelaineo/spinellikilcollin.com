import * as React from 'react'
import { InventoryFilter as InventoryFilterTypeSource } from '../../types'
import { FilterSetState } from './reducer'
import { Span } from '../Text'
import { PriceRangeFilterWrapper, HeadingWrapper } from './styled'
import { Label } from '../Forms/Fields/styled'
import { theme } from '../../theme'
import { useMedia } from '../../hooks'
import styled, { css } from '@xstyled/styled-components'
import { useRouter } from 'next/router'

const { useEffect, useState } = React

interface InventoryFilterValues {
  label: string
  applyFilter: boolean
}

interface InventoryFilterType extends InventoryFilterTypeSource {
  applyFilter?: boolean
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
    margin: 0;
    cursor: pointer;
    & > div:first-child {
      padding-right: 5;
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
    &:hover > div:first-child {
      background-color: grays.4;
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
          left: 0px;
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
  margin-left: 6px;
  border: 1px solid #f5f3f3;
`

const URLParams =
  typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search)
    : null

export function InventoryFilter({
  inventoryFilter,
  filterSetState,
  setValues,
  resetSet,
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
    router.query.instock = (!applyFilter).toString()
    URLParams?.set('instock', (!applyFilter).toString())
    console.log('URLParams', URLParams)
  }

  const router = useRouter()
  console.log('router', router)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValues('', { applyFilter: applyFilter, label: label })
    }, 300)
    return () => clearTimeout(timeout)
  }, [applyFilter])

  useEffect(() => {
    setApplyFilter(filterSetState.values.applyFilter)
  }, [filterSetState])

  useEffect(() => {
    router.query.instock === 'true'
      ? setApplyFilter(true)
      : setApplyFilter(false)
  }, [router.isReady])

  if (!label) {
    throw new Error('The inventory filter was not configured with a label')
  }

  if (!filterSetState?.values) {
    throw new Error('The inventory filter was not set up with initial values')
  }

  const isMobile = useMedia({
    maxWidth: `960px`,
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

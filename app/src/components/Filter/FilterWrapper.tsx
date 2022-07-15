import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { FilterSetWrapper } from './styled'
import {
  Filter,
  PriceRangeFilter,
  FilterSet,
  InventoryFilter,
  Maybe,
} from '../../types'

const { useState } = React

interface WithOpen {
  open: boolean
}

interface WithType {
  type?: string
  rowSpan?: number
  active: boolean
  minimalDisplay?: Maybe<boolean>
}

const Wrapper = styled.div<WithType>`
  ${({ theme, rowSpan, type, active, minimalDisplay }) => css`
    grid-column: ${type === 'PriceRangeFilter' ? 'span 2' : 'auto'};
    grid-row: ${rowSpan ? `span ${rowSpan}` : 'auto'};

    ${minimalDisplay
      ? css`
          &:nth-child(1) > div > div > div {
            margin-left: 0px;
          }
        `
      : ''};

    ${theme.mediaQueries.tablet} {
    }
    @media screen and (max-width: 960px) {
      flex: ${minimalDisplay ? '0' : '49%'};
      flex-grow: 0;
      &:nth-last-child(2) {
        min-width: unset;
      }

      ${minimalDisplay
        ? css`
            &:nth-child(1) > div > div > div {
              margin-left: 0px;
            }
          `
        : ''};

      ${active && type !== 'InventoryFilter'
        ? css`
            flex: ${minimalDisplay ? '0' : '100%'};
            order: ${minimalDisplay ? 'unset' : '-1'};
            margin-bottom: ${minimalDisplay ? 'auto' : '49%'};
          `
        : ''};
    }

    &:last-of-type {
      ${type === 'PriceRangeFilter'
        ? css`
            grid-column-start: -1;
            grid-column-end: -3;

            ${theme.mediaQueries.tablet} {
              grid-column-start: 2;
              grid-column-end: 4;
            }
          `
        : ''};
    }
  `}
`

const Inner = styled.div<WithOpen>`
  ${({ theme }) => css`
    @media screen and (max-width: 960px) {
      padding: 0;
    }
  `}
`

interface FilterWrapperProps {
  heading?: string | null | void
  children: React.ReactNode
  type: string
  filter: Filter | FilterSet | PriceRangeFilter | InventoryFilter
  onClick: () => void
  active: boolean
  minimalDisplay?: Maybe<boolean>
}

export const FilterWrapper = ({
  type,
  heading,
  children,
  filter,
  onClick,
  active,
  minimalDisplay,
}: FilterWrapperProps) => {
  const rowSpan =
    filter.__typename === 'FilterSet'
      ? filter && filter?.filters?.length
        ? Math.floor(filter.filters.length / 3)
        : 1
      : undefined

  return (
    <Wrapper
      rowSpan={rowSpan}
      type={type}
      onClick={onClick}
      active={active}
      minimalDisplay={minimalDisplay}
    >
      <Inner open={true}>{children}</Inner>
    </Wrapper>
  )
}

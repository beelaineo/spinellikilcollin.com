import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { FilterSetWrapper } from './styled'
import { PriceRangeFilter, FilterSet } from '../../types'

const { useState } = React

interface WithOpen {
  open: boolean
}

interface WithType {
  type?: string
  rowSpan?: number
  active: boolean
}

const Wrapper = styled.div<WithType>`
  ${({ theme, rowSpan, type, active }) => css`
    grid-column: ${type === 'PriceRangeFilter' ? 'span 2' : 'auto'};
    grid-row: ${rowSpan ? `span ${rowSpan}` : 'auto'};

    ${theme.mediaQueries.tablet} {
    }
    ${theme.mediaQueries.mobile} {
      flex: 48%;
      flex-grow: 0;
      &:nth-last-child(2) {
        min-width: unset;
      }

      ${active
        ? css`
            margin-right: 50%;
            order: -1;
            margin-bottom: 4;
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
    ${theme.mediaQueries.mobile} {
      padding: 0;
    }
  `}
`

interface FilterWrapperProps {
  heading?: string | null | void
  children: React.ReactNode
  type: string
  filter: FilterSet | PriceRangeFilter
  onClick: () => void
  active: boolean
}

export const FilterWrapper = ({
  type,
  heading,
  children,
  filter,
  onClick,
  active,
}: FilterWrapperProps) => {
  const rowSpan =
    filter.__typename === 'FilterSet'
      ? filter && filter?.filters?.length
        ? Math.floor(filter.filters.length / 3)
        : 1
      : undefined

  return (
    <Wrapper rowSpan={rowSpan} type={type} onClick={onClick} active={active}>
      <Inner open={true}>{children}</Inner>
    </Wrapper>
  )
}

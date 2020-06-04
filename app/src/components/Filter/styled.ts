import styled, { css } from '@xstyled/styled-components'
import { Button } from '../Button'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: 4 0;
    background-color: white;
    width: calc(100% + (${theme.space[10]}px * 2));
    margin-left: -${theme.space[10]}px;
    margin-bottom: 4;
  `}
`

export const Header = styled.div`
  padding: 0 4;
`

interface WithOpen {
  open: boolean
}

export const Inner = styled.div<WithOpen>`
  ${({ open }) => css`
    display: ${open ? 'block' : 'none'};
  `}
`

export const OpenButton = styled(Button)`
  text-transform: initial;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 4;
  align-items: center;
`

export const FilterSets = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 3;
  padding: 6 0;
  border-top: 1px solid;
  border-bottom: 1px solid;
  margin-bottom: 4;
  margin: 4 4 0;
`

interface WithSpan {
  span: number
}

export const FilterSetWrapper = styled.div<WithSpan>`
  ${({ span }) => css`
    grid-row: span ${span};
    margin-bottom: 4;
  `}
`

export const ButtonsWrapper = styled.div`
  display: grid;
  margin: 4 4 0;
  grid-template-columns: 160px 160px;
  grid-gap: 4;
`

export const PriceRangeFilterWrapper = styled.div`
  min-height: 30px;
  grid-column: span 2;
`

export const Slider = styled.div`
  position: relative;
  padding: 3 0;
  &:after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: body.9;
    position: absolute;
    left: 0;
    top: 50%;
  }
`

interface WithPosition {
  position: number
}

export const KnobHandle = styled.div<WithPosition>`
  ${({ position }) => css`
    position: absolute;
    cursor: pointer;
    text-align: center;
    z-index: 10;
    top: calc(50% - 8px);
    left: calc(${position * 100}% - (${position} * 16px));
  `}
`

export const KnobDot = styled.div`
  width: 16px;
  height: 16px;
  background-color: body.9;
  border-radius: 16px;
`

export const KnobLabel = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 50%;
  transform: translateX(-50%);
`

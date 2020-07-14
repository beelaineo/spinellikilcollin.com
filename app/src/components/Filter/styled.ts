import styled, { css } from '@xstyled/styled-components'
import { Button } from '../Button'

export const Wrapper = styled.div`
  padding: 0;
  background-color: white;
  width: 100%;
  position: relative;
`

export const Header = styled.div`
  ${({ theme }) => css`
    padding: 0 7;
    ${theme.mediaQueries.mobile} {
      padding: 0 4;
    }
  `}
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
  ${({ theme }) => css`
    text-transform: initial;
    display: flex;
    min-width: 250px;
    height: 50px;
    align-items: center;

    & > div {
      margin-left: 4;
    }

    ${theme.mediaQueries.mobile} {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }
  `}
`

export const FilterSets = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 5;
    grid-row-gap: 5;
    padding: 6 0;
    border-top: 1px solid;
    border-bottom: 1px solid;
    margin: 0 7;

    ${theme.mediaQueries.tablet} {
      grid-template-columns: repeat(4, 1fr);
    }

    ${theme.mediaQueries.mobile} {
      padding: 2 0;
      display: block;
      border-bottom: none;
      margin: 0 4;
    }
  `}
`

interface WithSpan {
  span: number
}

export const HeadingWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mediaQueries.mobile} {
      display: none;
    }
  `}
`

export const FilterSetWrapper = styled.div``

export const ButtonsWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    margin: 0 7;
    padding: 4 0;
    grid-template-columns: 160px 160px;
    grid-gap: 4;
    ${theme.mediaQueries.mobile} {
      margin: 0 4;
      grid-template-columns: 1fr;
    }
  `}
`

export const PriceRangeFilterWrapper = styled.div`
  min-height: 30px;
  grid-column: span 2;
`

export const Slider = styled.div`
  position: relative;
  padding: 3 0;
  max-width: 300px;
  margin-top: 2;
  margin-bottom: 6;
  &:after {
    content: '';
    width: 100%;
    height: 1px;
    background-color: body.6;
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
    top: calc(50% - 7px);
    left: calc(${position * 100}% - (${position} * 16px));
  `}
`

export const KnobDot = styled.div`
  width: 15px;
  height: 15px;
  background-color: body.0;
  border: 1px solid;
  border-color: body.6;
  border-radius: 16px;
`

export const KnobLabel = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
`

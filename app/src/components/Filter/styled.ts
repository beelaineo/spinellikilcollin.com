import styled, { css } from '@xstyled/styled-components'
import { Button } from '../Button'

export const Wrapper = styled.div`
  padding: 0;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const CountWrapper = styled.div`
  ${({ theme }) => css`
    display: block;
    margin: 0 7;
    padding: 4 0 0 0;
    ${theme.mediaQueries.mobile} {
      margin: 0 4;
    }
  `}
`

export const LegacyWrapper = styled.div`
  padding: 0;
  background-color: white;
  width: 100%;
  position: relative;
`

export const SortWrapper = styled.div`
  ${({ theme }) => css`
    padding: 4;
    width: 100%;
    flex: 0;
    min-width: 124px;

    padding: 2 4;
    min-width: 124px;
    height: fit-content;
    margin: 0 2;
    text-align: center;
    border: 0.5px solid ${theme.colors.grays[5]};
    border-radius: 2em;
    margin-bottom: 4;
    cursor: pointer;
    select {
      text-transform: uppercase;
    }
    ${theme.mediaQueries.mobile} {
    }
  `}
`

export const Header = styled.div`
  ${({ theme }) => css`
    padding: 0 7;
    display: flex;
    justify-content: space-between;
    select {
      text-align-last: right;
    }

    ${theme.mediaQueries.mobile} {
      padding: 0 4;
      margin-bottom: 50px;
      select {
        position: absolute;
        top: calc(100% + 8px);
        max-width: initial;
        width: calc(100% - (${theme.space[4]}px * 2) + 9px);
      }
    }
  `}
`

interface WithOpen {
  open: boolean
}

export const LegacyInner = styled.div<WithOpen>`
  ${({ open }) => css`
    display: ${open ? 'block' : 'none'};
  `}
`

export const Inner = styled.div<WithOpen>`
  ${({ theme, open }) => css`
    display: ${open ? 'flex' : 'none'};
    margin: 0 7;
    padding: 4 0;
    svg {
      width: 32px;
      margin: 0;
    }
    svg path {
      stroke: ${theme.colors.grays[7]};
    }
    ${theme.mediaQueries.mobile} {
      margin: 0 4;
    }
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
    display: flex;
    padding: 0;
    margin: 0 4;
    flex: 1;

    ${theme.mediaQueries.tablet} {
    }

    ${theme.mediaQueries.mobile} {
      padding: 2 0;
      display: block;
      border-bottom: none;
      margin: 0 4;
    }
  `}
`

export const LegacyFilterSets = styled.div`
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

interface WithIsActive {
  isActive?: boolean
}

export const HeadingWrapper = styled.div<WithIsActive>`
  ${({ theme, isActive }) => css`
    padding: 2 4;
    min-width: 124px;
    margin: 0 2;
    text-align: center;
    border: 0.5px solid ${theme.colors.grays[5]};
    border-radius: 2em;
    margin-bottom: 4;
    cursor: pointer;
    ${isActive ? 'background-color: ' + theme.colors.grays[4] + ';' : ''}
    ${theme.mediaQueries.mobile} {
    }
  `}
`

export const FilterSetWrapper = styled.div``

export const FilterIndicatorWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
  `}
`

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
  margin: 0 2;
  label {
    margin-bottom: 0;
  }
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

export const Reset = styled.buttonBox`
  ${({ theme }) => css`
    font-family: serif;
    transition: 0.25s;
    font-size: 5;
    cursor: pointer;
    font-weight: 300;
    height: fit-content;
    display: block;
    margin: 0;
    padding: 2 4;
    width: auto;
    border: none;
    text-decoration: underline;
  `}
`

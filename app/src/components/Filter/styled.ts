import styled, { css } from '@xstyled/styled-components'
import { Button } from '../Button'
import { Maybe } from '../../types'

export const Wrapper = styled.div`
  padding: 4 0;
  width: 100%;
  position: sticky;
  top: 98px;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const CountWrapper = styled.div`
  ${({ theme }) => css`
    display: block;
    margin: 0 7;
    padding: 0 0 0 0;
    position: absolute;
    top: 60px;
    z-index: 0;
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
    padding: 9px 4;
    width: 100%;
    flex: 0;
    min-width: 124px;

    padding: 2 4;
    min-width: 124px;
    height: fit-content;
    margin: 0 2;
    margin-bottom: 3;
    text-align: center;
    border: 1px solid ${theme.colors.grays[5]};
    border-radius: 2em;
    background-color: body.2;
    line-height: 1;
    margin-bottom: 4;
    margin-right: 0;
    cursor: pointer;
    select {
      text-transform: uppercase;
      line-height: 1;
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
    padding: 0;
    z-index: 1;
    & > svg {
      width: 24px;
      margin: 2 0 0 0;
    }
    & > svg path {
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
  type?: Maybe<string>
}

export const HeadingWrapper = styled.div<WithIsActive>`
  ${({ theme, isActive, type }) => css`
    padding: 9px 4;
    min-width: 124px;
    margin: 0 2;
    border: 1px solid ${theme.colors.grays[5]};
    border-radius: 2em;
    background-color: body.2;
    align-items: center;
    justify-content: center;
    margin-bottom: 3;
    cursor: pointer;
    display: flex;
    line-height: 1;
    h5 {
      line-height: 1;
      margin: 0;
    }
    ${isActive
      ? 'background-color: ' +
        theme.colors.grays[3] +
        '; justify-content: space-between; & > h5 {' +
        'background-color: ' +
        theme.colors.grays[3] +
        '; z-index:11; } h5 { margin-right: 32px;}'
      : ''}
    ${isActive && type == 'Type'
      ? 'padding: 0; & > h5 { min-width: 124px; padding: 9px 0; } h5 { border: 1px solid ' +
        theme.colors.grays[5] +
        '; margin-top: -1px; box-sizing: content-box; border-radius: 2em; margin-right: 0; margin-left: -1px; margin-bottom: -1px; padding: 9px 0; justify-content: center; display: flex; align-items: center; border: 1px solid' +
        theme.colors.grays[5] +
        'gray; border-radius: 2em;' +
        '}'
      : ''}
    ${theme.mediaQueries.mobile} {
    }
  `}
`

interface WithIsHovered {
  isHovered?: boolean
}

export const FiltersWrapper = styled.div<WithIsHovered>`
  ${({ theme, isHovered }) => css`
    display: ${isHovered ? 'block' : 'none'};
    ${theme.mediaQueries.mobile} {
    }
  `}
`

export const FilterSetWrapper = styled.div``

interface WithType {
  setType?: Maybe<string>
  isActive?: boolean
}

export const FilterIndicatorsWrapper = styled.div<WithType>`
  ${({ theme, setType, isActive }) => css`
    display: flex;
    height: 100%;
    margin-right: ${isActive && setType === 'Type'
      ? '0'
      : isActive && setType !== 'Type'
      ? '-13px'
      : '0px'};
    & > div:first-child {
      margin-left: 0;
    }
  `}
`

export const FilterIndicatorWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
  `}
`

export const DiamondWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    & > svg {
      margin-left: -17px;
      margin-top: -6px;
      margin-bottom: -6px;
    }
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
  & > div:first-child {
    min-width: 178px;
    text-align: left;
    justify-content: flex-start;
  }
  label {
    background-color: body.2;
    margin: 0 2;
    line-height: 1;
    font-style: italic;
    span {
      line-height: 1;
      font-style: normal;
    }
  }
`

export const Slider = styled.div<WithIsHovered>`
  ${({ theme, isHovered }) => css`
    display: ${isHovered ? 'block' : 'none'};
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
  `}
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

export const CloseButton = styled.button`
  ${({ theme }) => css`
    position: absolute;
    z-index: 20;
    background-color: transparent;
    width: 12px;
    height: 12px;

    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 0px;
      left: 50%;
      width: 100%;
      height: 1px;
      background-color: grays.5;
    }

    &:before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    &:after {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  `}
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

import styled, { css } from '@xstyled/styled-components'
import { Button } from '../Button'
import { Maybe } from '../../types'

interface WithMinimalDisplay {
  minimalDisplay?: Maybe<boolean>
}

export const Wrapper = styled.div<WithMinimalDisplay>`
  ${({ theme, minimalDisplay }) => css`
    padding: 5 0;
    width: 100%;
    position: sticky;
    top: 74px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 99;

    ${theme.mediaQueries.tablet} {
      top: 62px;
      padding: ${minimalDisplay ? '5 0' : '3 5'};
    }
    ${theme.mediaQueries.mobile} {
      top: 48px;
      padding: ${minimalDisplay ? '4 0' : '3 0'};
    }
  `}
`

export const MobileToggleWrapper = styled.div`
  ${({ theme }) => css`
    padding: 4;
    width: 100%;
    position: sticky;
    top: 0px;
    z-index: 3;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    & > svg {
      width: 21px;
      cursor: pointer;
    }
    h4,
    h5 {
      margin: 0;
      line-height: 1;
      cursor: pointer;
      text-underline-position: under;
    }
  `}
`

export const MobileHeader = styled.div`
  ${({ theme }) => css`
    padding: 3 0;
    width: 100%;
    position: sticky;
    top: 0px;
    z-index: 3;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid ${theme.colors.grays[5]};
    border-bottom: 1px solid ${theme.colors.grays[5]};
  `}
`

export const MobileControls = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    h4 {
      line-height: 1;
      margin: 0;
      cursor: pointer;
    }
  `}
`

export const ControlTab = styled.div`
  ${({ theme }) => css`
    display: block;
    h4,
    h5 {
      text-underline-position: under;
    }
  `}
`

export const MobileCloseButtonWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    padding: 3;
    z-index: 2;
    cursor: pointer;
    button {
      width: 16px;
    }
  `}
`
export const MobileFooter = styled.div`
  ${({ theme }) => css`
    margin: 0 5px;
    position: static;
    flex: 100%;
    display: flex;
    h5 {
      margin-right: 3;
    }
  `}
`

export const DesktopFooter = styled.div`
  ${({ theme }) => css`
    margin: 0;
    position: static;
    flex: 100%;
    display: flex;

    button {
      position: relative;

      &:focus-visible {
        ${theme.focus.bottom(-20)}
      }
    }

    @media screen and (max-width: 1200px) {
      position: absolute;
      top: 64px;
      left: 48px;
      margin-left: -3;
    }
  `}
`

export const CountWrapper = styled.div`
  ${({ theme }) => css`
    display: block;
    margin: 0 7;
    padding: 0 0 0 0;
    position: absolute;
    top: 60px;
    z-index: 0;
    @media screen and (max-width: 960px) {
      margin: 0;
      position: static;
    }
  `}
`

export const MobileControlsDivider = styled.span`
  ${({ theme }) => css`
    display: inline-block;
    width: 24px;
    text-align: center;
  `}
`

export const SortWrapper = styled.div<WithHide>`
  ${({ theme, hide }) => css`
    position: relative;
    padding: 2 4;
    width: 100%;
    flex: 0;
    display: flex;
    max-height: 27px;
    justify-content: center;
    align-items: center;
    min-width: 124px;
    max-width: unset;
    display: ${hide ? 'none' : 'block'};
    margin: 0 5px;
    text-align: center;
    border: 1px solid ${theme.colors.grays[5]};
    border-radius: 2em;
    background-color: body.2;
    line-height: 1;
    margin-right: 0;
    cursor: pointer;

    &:has(select:focus-visible) {
      ${theme.focus.bottom()}
    }

    select {
      position: relative;
      text-transform: uppercase;
      line-height: 1;
      display: block;

      &:focus-visible {
        outline: none;
      }
    }
    @media screen and (max-width: 960px) {
      margin: 5 0 4 0;
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

    @media screen and (max-width: 960px) {
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

interface WithOpenMinimalDisplay {
  open: boolean
  minimalDisplay?: Maybe<boolean>
}

export const Inner = styled.div<WithOpenMinimalDisplay>`
  ${({ theme, open, minimalDisplay }) => css`
    display: ${open ? 'flex' : 'none'};
    margin: 0 7;
    padding: 0;
    z-index: ${minimalDisplay ? '11' : '1'};
    max-height: 48px;
    & > svg {
      width: 24px;
      margin: 2 0 0 0;
    }
    & > svg path {
      stroke: ${theme.colors.grays[6]};
    }
    ${theme.mediaQueries.tablet} {
    }
    @media screen and (max-width: 960px) {
      margin: 0 ${minimalDisplay ? '6' : '4'};
      flex-direction: column;
      border-bottom: ${minimalDisplay
        ? `none`
        : '1px solid ' + theme.colors.grays[5]};
      max-height: unset;
      ${minimalDisplay
        ? css`
            & > div:first-child {
              padding: 0;
              gap: 2;
              & > div {
                padding-top: 0;
                padding-bottom: 0;
              }
            }
          `
        : ''};
    }
    ${theme.mediaQueries.mobile} {
      margin: 0 ${minimalDisplay ? '2' : 'inherit'};
      align-items: ${minimalDisplay ? 'center' : 'inherit'};
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

    @media screen and (max-width: 960px) {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }
  `}
`
interface WithHide {
  hide: boolean
}
export const FilterSets = styled.div<WithHide>`
  ${({ theme, hide }) => css`
    display: ${hide ? 'none' : 'flex'};
    padding: 0;
    margin: 0;
    flex: 1;
    height: 28px;

    ${theme.mediaQueries.tablet} {
    }

    @media screen and (max-width: 960px) {
      gap: 0 2;
      padding: 5 0 2 0;
      display: ${hide ? 'none' : 'flex'};
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      border-bottom: none;
      margin: 0;
      & > div {
        padding: 1 0;
      }
    }
  `}
`

interface WithIsActive {
  isActive?: boolean
  type?: Maybe<string>
}

export const HeadingWrapper = styled.div<WithIsActive>`
  ${({ theme, isActive, type }) => css`
    padding: 2 4;
    min-width: 105px;
    margin: 0 5px;
    border: 1px solid ${theme.colors.grays[6]};
    border-radius: 2em;
    background-color: body.2;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    display: flex;
    line-height: 1;
    h5 {
      line-height: 1;
      margin: 0;
    }
    ${isActive
      ? 'background-color: ' +
        theme.colors.grays[4] +
        '; justify-content: space-between; & > h5 {' +
        'background-color: ' +
        theme.colors.grays[4] +
        '; z-index:11; } h5 { margin-right: 32px;}'
      : ''}
    ${isActive &&
    (type == 'Type' || type == 'Bands' || type == 'Size' || type == 'Ring Size')
      ? 'padding: 0; & > h5 { min-width: 72px; padding: 2 0; } h5 { border: 1px solid ' +
        theme.colors.grays[6] +
        `; flex: 75%; margin-top: -1px; box-sizing: content-box; border-radius: 2em; margin-right: 0; margin-left: -1px; margin-bottom: -1px; padding: ${
          type == 'Ring Size' ? '2 26px 2 22px' : '2 18px'
        }; justify-content: flex-start; display: flex; align-items: center; border: 1px solid` +
        theme.colors.grays[6] +
        '; border-radius: 2em;' +
        '}'
      : ''}
      @media screen and (max-width: 960px) {
      width: 100%;
      margin: 0;
    }
    @media screen and (min-width: 961px) {
      min-width: ${type === 'Size' ? '220px' : '105px'};
    }
  `}
`

interface WithIsHoveredType {
  isHovered?: boolean
  type?: Maybe<string>
}

export const FiltersWrapper = styled.div<WithIsHoveredType>`
  ${({ theme, isHovered, type }) => css`
    display: ${isHovered ? 'block' : 'none'};
    position: relative;
    z-index: 2;
    padding-top: 1;
    ${type == 'Size' || type == 'Ring Size'
      ? css`
          display: ${isHovered ? 'flex' : 'none'};
          max-width: ${type == 'Size' ? '330px' : '115px'};
          flex-wrap: wrap;
          & > div {
            flex: 0;
            label {
              min-height: 28px;
              min-width: 28px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 100%;
              width: auto;
              padding: 0;
            }
          }
        `
      : ''}
    @media screen and (max-width: 960px) {
      position: relative;
      display: ${isHovered ? 'flex' : 'none'};
      flex-wrap: wrap;
      flex-direction: row;
      gap: 0 2;
      & > div {
        display: block;
      }
      ${type == 'Size' || type == 'Ring Size'
        ? css`
            display: ${isHovered ? 'grid' : 'none'};
            grid-template-columns: repeat(auto-fit, 36px);
            position: static;
            flex-wrap: unset;
            gap: 2 3;
            max-width: 100%;
            width: 100%;
            justify-content: center;
            & > div label {
              min-width: 36px;
              min-height: 36px;
            }
          `
        : ''}
    }
  `}
`

interface WithActive {
  active?: boolean
}

export const FilterSetWrapper = styled.div<WithActive>`
  ${({ theme, active }) => css`
    position: relative;

    @media screen and (max-width: 960px) {
      display: ${active ? 'flex' : 'block'};
      flex-direction: column;
      ${active
        ? css`
            & > div:first-child {
              margin-right: 50%;
              flex: 100%;
              min-width: unset;
            }
          `
        : ''}
    }

    &:focus-visible {
      ${theme.focus.bottom()}
    }
  `}
`

interface WithType {
  setType?: Maybe<string>
  isActive?: boolean
}

export const FilterIndicatorsWrapper = styled.div<WithType>`
  ${({ theme, setType, isActive }) => css`
    display: flex;
    height: 100%;
    margin-right: ${isActive &&
    (setType == 'Type' ||
      setType == 'Bands' ||
      setType == 'Size' ||
      setType == 'Ring Size')
      ? '0'
      : isActive &&
        setType != 'Type' &&
        setType != 'Bands' &&
        setType != 'Size' &&
        setType != 'Ring Size'
      ? '-13px'
      : '0px'};
    & > div:first-child {
      margin-left: 0;
      h5 {
        padding-left: ${isActive &&
        (setType == 'Bands' || setType == 'Size' || setType == 'Ring Size')
          ? '16px'
          : '39px'};
      }
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
    @media screen and (max-width: 960px) {
      margin: 0 4;
      grid-template-columns: 1fr;
    }
  `}
`

interface WithIsApplied {
  isApplied: boolean
}

export const PriceRangeFilterWrapper = styled.div<WithIsApplied>`
  ${({ theme, isApplied }) => css`
    margin: 0;
    & > div:first-child {
      min-width: 145px;
      text-align: left;
      justify-content: flex-start;
      background-color: ${isApplied
        ? theme.colors.grays[4]
        : theme.colors.grays[2]};
    }
    label {
      margin: 0;
      line-height: 1;
      font-style: italic;
      span {
        line-height: 1;
        font-style: normal;
      }
    }
    @media screen and (max-width: 960px) {
      margin: 0;
      & > div:first-child {
        min-width: unset;
      }
      label {
        margin: 0;
        display: flex;
        width: 100%;
        justify-content: space-between;
        span {
          margin: 0;
        }
      }
    }
  `}
`

export const Slider = styled.div<WithIsHoveredType>`
  ${({ theme, isHovered }) => css`
    display: ${isHovered ? 'block' : 'none'};
    position: relative;
    padding: 3 0;
    max-width: 300px;
    margin-top: 2;
    margin-bottom: 2;
    &:after {
      content: '';
      width: 100%;
      height: 1px;
      background-color: body.6;
      position: absolute;
      left: 0;
      top: 50%;
    }
    @media screen and (max-width: 960px) {
      max-width: 100%;
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
  ${({ theme }) => css`
    width: 15px;
    height: 15px;
    background-color: body.0;
    border: 1px solid;
    border-color: body.6;
    border-radius: 16px;
  `}
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
    font-weight: 200;
    height: fit-content;
    display: block;
    margin: 0;
    padding: 2;
    margin-top: 1px;
    width: auto;
    border: none;
    text-decoration: underline;
    text-underline-position: under;
    @media screen and (max-width: 960px) {
      padding-left: 0;
    }
  `}
`

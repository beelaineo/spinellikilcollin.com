import styled, { css } from '@xstyled/styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    gap: 6;
    position: relative;
    justify-content: center;

    ${theme.mediaQueries.tablet} {
      gap: 4;
    }
    ${theme.mediaQueries.mobile} {
      gap: 4;
    }
  `}
`

export const Column = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 50px;

    &::after {
      content: ':';
      display: block;
      position: absolute;
      bottom: 3px;
      right: -19px;
      color: white;
      z-index: 1;
      font-size: ${theme.fontSizes[4]};
      margin: 0;
      color: inherit;
    }
    &:last-child {
      &::after {
        display: none;
      }
    }

    &:first-child {
      &::after {
        right: -15px;
      }
    }

    &:nth-child(2) {
      &::after {
        right: -23px;
      }
    }

    &:nth-child(3) {
      &::after {
        right: -20px;
      }
    }

    ${theme.mediaQueries.tablet} {
      width: 34px;

      &:first-child {
        &::after {
          right: -8px;
        }
      }

      &:nth-child(2) {
        &::after {
          right: -13px;
        }
      }

      &:nth-child(3) {
        &::after {
          right: -10px;
        }
      }

      &::after {
        font-size: ${theme.fontSizes[5]};
      }
    }
    ${theme.mediaQueries.mobile} {
      &::after {
        font-size: ${theme.fontSizes[5]};
      }
    }
  `}
`

export const Value = styled.div`
  ${({ theme }) => css`
    span {
      font-size: ${theme.fontSizes[2]};
    }

    ${theme.mediaQueries.tablet} {
      span {
        font-size: ${theme.fontSizes[3]};
      }
    }

    ${theme.mediaQueries.mobile} {
      span {
        font-size: ${theme.fontSizes[3]};
      }
    }
  `}
`

export const Label = styled.div`
  ${({ theme }) => css`
    text-transform: uppercase;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    gap: 4;

    span {
      font-size: ${theme.fontSizes[4]};
      margin: 0;
    }
    ${theme.mediaQueries.tablet} {
      span {
        font-size: ${theme.fontSizes[5]};
      }
    }
    ${theme.mediaQueries.mobile} {
      span {
        font-size: ${theme.fontSizes[5]};
      }
    }
    last-of-type {
      gap: 0;
  `}
`

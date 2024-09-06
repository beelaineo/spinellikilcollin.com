import styled, { css, DefaultTheme } from '@xstyled/styled-components'

interface WithOpen {
  theme: DefaultTheme
  open: boolean
  height: number
}

interface WithProduct {
  isProduct?: boolean
}

export const Inner = styled.div<WithOpen>`
  ${({ open, height }) => css`
    overflow: hidden;

    ${open
      ? css`
          height: ${height};
          opacity: 1;
          visibility: visible;

          transition: height 0.5s cubic-bezier(0.65, 0, 0.35, 1),
            opacity 0.5s linear, visibility 0s linear;
        `
      : css`
          height: 0;
          opacity: 0;
          visibility: hidden;
          transition: height 0.5s cubic-bezier(0.65, 0, 0.35, 1),
            opacity 0.5s linear, visibility 0s linear 0.5s;
        `};
  `}
`

export const Item = styled.div`
  padding: 2 0 4;
  opacity: 1;
`

export const Wrapper = styled.div<WithProduct>`
  ${({ isProduct }) => css`
    ${isProduct
      ? css`
          border-top: 1px solid;
          margin: 0 40px 40px;
        `
      : css`
          border-top: 1px solid;
        `}

    &:last-of-type {
      border-bottom: 1px solid;
    }
  `}
`

export const Label = styled.button`
  ${({ theme }) => css`
    font-size: 5;
    font-family: serif;
    position: relative;
    padding: 3 0;
    width: 100%;
    text-align: left;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:focus-visible {
      ${theme.focus.left()}
    }
  `}
`
export const ProductButton = styled.button`
  ${({ theme }) => css`
    position: relative;
    padding: 3 10;
    width: 100%;
    text-align: center;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${theme.mediaQueries.mobile} {
      padding: 0;
      gap: 3;
    }

    &:focus-visible {
      ${theme.focus.left()}
    }
  `}
`

export const ProductImageWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 60%;

    ${theme.mediaQueries.mobile} {
      width: 100%;
    }
  `}
`

export const TextWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    padding-bottom: 6;

    > h4 {
      width: 100%;
      margin: 0;
      line-height: 1;
      text-align: center;

      ${theme.mediaQueries.mobile} {
        text-align: left;
      }
    }
  `}
`

export const StatusWrapper = styled.div`
  ${({ theme }) => css`
    position: absolute;
    display: flex;
    flex-direction: row;
    text-transform: uppercase;
    align-items: center;
    gap: 20px;
    right: 0;

    > h5 {
      margin: 0;
      line-height: 1;
    }
  `}
`

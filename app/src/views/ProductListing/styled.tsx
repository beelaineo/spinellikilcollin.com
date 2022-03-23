import styled, { css } from '@xstyled/styled-components'

interface WrapperProps {
  withHero: boolean
  handle: string
  isLightTheme: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ handle, theme, withHero, isLightTheme }) => css`
    position: relative;
    padding-top: ${withHero ? 0 : theme.navHeight};

    ${isLightTheme === true
      ? css`
          h3,
          h5 {
            color: body.0;
          }
          .tag-badge {
            border-color: body.0;
          }
        `
      : ''}
  `}
`
interface GridWrapperProps {
  isLoading: boolean
}

export const ProductGridWrapper = styled.div<GridWrapperProps>`
  ${({ isLoading }) => css`
    opacity: ${isLoading ? 0.4 : 1};
    position: relative;
    pointer-events: ${isLoading ? 'none' : 'inherit'};
    transition: 0.3s;
  `}
`

export const LoadingWrapper = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 10;
  top: 150px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 960px) {
    top: unset;
    padding-top: 5;
  }
`

export const NoResultsWrapper = styled.div`
  padding: 8 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

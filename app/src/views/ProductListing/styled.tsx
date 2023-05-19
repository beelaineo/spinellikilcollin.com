import styled, { css } from '@xstyled/styled-components'

interface WrapperProps {
  withHero: boolean
  handle: string
  isLightTheme: boolean
  isReady: boolean
}

export const Wrapper = styled.main<WrapperProps>`
  ${({ handle, theme, withHero, isLightTheme, isReady }) => css`
    position: relative;
    padding-top: ${withHero ? 0 : theme.navHeight};

    opacity: ${isReady === true ? 1 : 0};
    transition: opacity 0.3s linear 0s;

    & > div:last-child {
      opacity: ${isReady ? 1 : 0};
      transition: opacity 0.3s linear 0.3s;
    }
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

export const FooterGrid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    & > div:first-child:after {
      content: '';
      display: block;
      width: 1px;
      bottom: 0;
      top: 0;
      position: absolute;
      background-color: ${theme.colors.grays[5]};
      margin: 2rem 0;
      right: -0.5px;
      z-index: 1;
    }

    & > div h1,
    & > div h2,
    & > div h3,
    & > div h4 {
      pointer-events: none;
    }

    ${theme.mediaQueries.mobile} {
      grid-template-columns: 1fr;
      & > div:first-child:after {
        content: '';
        height: 1px;
        width: unset;
        bottom: unset;
        top: unset;
        left: 0;
        right: 0;
        margin: 0 4;
        bottom: -0.5px;
      }
    }
  `}
`

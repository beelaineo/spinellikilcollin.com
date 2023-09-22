import styled, { css } from '@xstyled/styled-components'
import { Input } from '../Forms/Fields/styled'

interface WithVisible {
  visible: boolean
}

export const Outer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    z-index: ${theme.zIndices.nav - 10};
    height: 0px;
  `}
`

export const Wrapper = styled.div<WithVisible>`
  ${({ theme, visible }) => css`
    position: fixed;
    background-color: body.1;
    z-index: calc(${theme.zIndices.nav} - 1);
    top: 0px;
    left: 0;
    padding-top: calc(${theme.navHeight} + ${theme.space[6]}px);
    width: 100%;
    height: 100%;
    overflow: scroll;
    text-align: center;
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? 'inherit' : 'none'};
    transition: 0.3s ease-out;
    transform: ${visible ? 'none' : 'translateY(-10px)'};

    ${theme.mediaQueries.mobile} {
      padding-top: calc(${theme.mobileNavHeight} + ${theme.space[4]}px);
    }
  `}
`

export const SearchInputWrapper = styled.div`
  font-size: 3;
  position: relative;
  border-bottom: body.3;
`

export const SearchForm = styled.form<any>`
  ${({ theme, disabled }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    opacity: ${disabled ? 0.7 : 1};
    pointer-events: ${disabled ? 'none' : 'inherit'};
    button {
      min-width: 150px;
    }

    ${theme.mediaQueries.mobile} {
      button {
        width: 100%;
      }
    }
  `}
`

export const SearchHeader = styled.div`
  ${({ theme }) => css`
    padding: 7;
    overflow: hidden;

    ${theme.mediaQueries.mobile} {
      padding: 4;
    }
  `}
`

export const CloseButton = styled.div`
  ${({ theme }) => css`
    position: absolute;
    right: ${theme.space[6]}px;
    top: calc(${theme.navHeight} + ${theme.space[5]}px);

    ${theme.mediaQueries.mobile} {
      top: calc(${theme.mobileNavHeight} + ${theme.space[5]}px);
      right: ${theme.space[4]}px;
    }
  `}
`

export const Results = styled.div`
  background-color: body.2;
  padding: 3 0 8;
`

export const AutocompleteItem = styled.li<any>`
  list-style: none;
  cursor: pointer;
  position: relative;
  text-transform: capitalize;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`

export const ResultsInner = styled.div`
  margin: 0 auto;
  padding: 0;
`

export const StyledSearchInput = styled(Input)<any>`
  ${({ theme }) => css`
    font-size: 2;
    height: auto;
    border: none;
    text-align: center;
    border-bottom: 1px solid;
    background-color: transparent;
    border-color: body.4;
    margin-bottom: 4;
    height: 55px;
    width: fit-content;

    ${theme.mediaQueries.mobile} {
      height: 45px;
      font-size: 3;
    }
  `}
`

export const StyledSearchAutoComplete = styled.div<any>`
  ${({ theme }) => css`
    font-size: 2;
    height: auto;
    border: none;
    text-align: center;
    border-bottom: 1px solid;
    background-color: transparent;
    border-color: body.4;
    margin-bottom: 6;
    height: 55px;
    width: fit-content;

    ${theme.mediaQueries.mobile} {
      height: 45px;
      font-size: 3;
    }
  `}
`

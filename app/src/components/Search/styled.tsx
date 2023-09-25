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

export const AutocompleteItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;

  gap: 4px;
  align-items: center;
`

export const Separator = styled.span`
  position: relative;
  pointer-events: none;
  width: 18px;
  height: 18px;
`

export const AutocompleteItem = styled.li<any>`
  list-style: none;
  cursor: pointer;
  position: relative;
  text-transform: capitalize;
  opacity: 0.5;

  &::before {
    content: '';
    width: 16px;
    height: 16px;
    position: relative;

    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg id='Layer_1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 151.92 151.92'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:none;%7D.cls-1,.cls-2%7Bstroke-width:0px;%7D%3C/style%3E%3C/defs%3E%3Cpath class='cls-1' d='m151.92,76.12C152.2,35.6,119.78.04,76.01,0,33.36-.04.12,34.04,0,75.8c-.12,42.95,34.6,75.11,73.94,76.09,43.41,1.08,78.17-34.11,77.97-75.77Z'/%3E%3Cpath class='cls-2' d='m151.92,76.12c.2,41.66-34.57,76.86-77.97,75.77C34.6,150.91-.12,118.75,0,75.8.12,34.04,33.36-.04,76.01,0c43.77.04,76.2,35.6,75.91,76.12Zm-9.06.04c.8-35.98-28.65-67.31-66.75-67.29-37.44.01-67.26,29.45-67.24,67.28.01,38.41,31.62,66.67,66.85,66.87,36.59.22,67.91-30.34,67.15-66.86Z'/%3E%3Cpath class='cls-1' d='m142.86,76.16c.77,36.52-30.56,67.08-67.15,66.86-35.23-.21-66.84-28.47-66.85-66.87-.01-37.83,29.8-67.26,67.24-67.28,38.1-.02,67.55,31.31,66.75,67.29Zm-86.09-4.82c-6.33,0-12.67-.04-19,.04-1.01.01-2.8.41-2.87.85-.35,2.25-.53,4.61-.15,6.82.1.6,2.37,1.17,3.64,1.18,10.33.1,20.67.12,31.01.01,2.73-.03,4.22,1.01,5.36,3.45,5.98,12.83,12.08,25.62,18.19,38.39,2.71,5.66,2.74,5.59,8.23,2.54,1.68-.93,1.96-1.97,1.16-3.66-7.41-15.57-14.79-31.15-22.12-46.76-.99-2.1-2.42-2.92-4.7-2.89-6.25.08-12.5.03-18.75.03Z'/%3E%3Cpath class='cls-2' d='m56.77,71.34c6.25,0,12.5.06,18.75-.03,2.28-.03,3.71.79,4.7,2.89,7.33,15.61,14.72,31.19,22.12,46.76.8,1.69.52,2.72-1.16,3.66-5.49,3.05-5.53,3.12-8.23-2.54-6.11-12.77-12.21-25.56-18.19-38.39-1.14-2.45-2.64-3.48-5.36-3.45-10.33.11-20.67.08-31.01-.01-1.28-.01-3.54-.58-3.64-1.18-.38-2.21-.21-4.57.15-6.82.07-.44,1.87-.84,2.87-.85,6.33-.08,12.67-.04,19-.04Z'/%3E%3C/svg%3E");
  }

  &::before {
    content: '·';
    position: absolute;
    top: 0;
    left: -12px;

    height: 100%;

    pointer-events: none;
    opacity: 1;
  }

  &:first-of-type {
    &::before {
      display: none;
    }
  }

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

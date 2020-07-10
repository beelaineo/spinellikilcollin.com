import styled, { css } from '@xstyled/styled-components'
import { Input } from '../Forms/Fields/styled'
import { Button } from '../Button'

interface WithVisible {
  visible: boolean
}

export const Outer = styled.div`
  ${({ theme }) => css`
    width: 100%;
    position: relative;
    z-index: ${theme.zIndices.nav - 10};
    height: 0px;
  `}
`

export const Wrapper = styled.div<WithVisible>`
  ${({ theme, visible }) => css`
    position: absolute;
    background-color: body.1;
    z-index: calc(${theme.zIndices.nav} - 1);
    top: 0px;
    left: 0;
    padding-top: calc(${theme.navHeight} + ${theme.space[6]}px);
    width: 100%;
    height: calc(100vh);
    overflow: scroll;
    text-align: center;
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? 'inherit' : 'none'};
    transition: 0.3s ease-out;
    transform: ${visible ? 'none' : 'translateY(-10px)'};
  `}
`

export const SearchInputWrapper = styled.div`
  font-size: 3;
  position: relative;
  border-bottom: body.3;
`

interface WithDisabled {
  disabled: boolean
}

export const SearchForm = styled.form<WithDisabled>`
  ${({ disabled }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
    opacity: ${disabled ? 0.7 : 1};
    pointer-events: ${disabled ? 'none' : 'inherit'};
  `}
`

export const SearchHeader = styled.div`
  padding: 7;
`

export const CloseButton = styled(Button)`
  ${({ theme }) => css`
    position: absolute;
    right: ${theme.space[8]}px;
    top: calc(${theme.navHeight}) + ${theme.space[2]}px);
  `}
`

export const Results = styled.div`
  background-color: body.2;
  padding: 3 0 8;
`

export const ResultsInner = styled.div`
  margin: 0 auto;
  padding: 0 2;
  max-width: 1100px;
`

export const StyledSearchInput = styled(Input)`
  font-size: 2;
  height: auto;
  border: none;
  text-align: center;
  border-bottom: 1px solid;
  background-color: transparent;
  border-color: body.4;
  margin-bottom: 6;
`

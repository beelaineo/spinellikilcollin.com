import styled, { css } from '@xstyled/styled-components'

interface WithVisible {
  visible: boolean
}

export const MainWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;

    ${theme.mediaQueries.mobile} {
      min-width: initial;
    }
  `}
`

export const ProductBadgeWrapper = styled.div`
  display: flex;
`

export const FieldsWrapper = styled.div<WithVisible>`
  ${({ visible, theme }) => css`
    margin-top: 5;
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? 'inherit' : 'none'};
    transition: 0.2s;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 4;
    grid-column-gap: 3;

    > div:nth-child(odd) {
      position: relative;
      > div:has(input:focus-visible) {
        ${theme.focus.left()}
      }
    }

    > div:nth-child(even) {
      position: relative;
      > div:has(input:focus-visible) {
        ${theme.focus.right()}
      }
    }

    > div {
      position: relative;
      > div:has(textarea:focus-visible) {
        ${theme.focus.left()}
      }
    }

    #phone {
      outline: none;
    }

    select {
      height: 42px;
      max-width: initial;
      width: 100%;
    }

    button[type='submit'],
    .field--message {
      grid-column: 1 / 3;
    }

    ${theme.mediaQueries.mobile} {
      grid-template-columns: 1fr;

      button[type='submit'],
      .field--message {
        grid-column: auto;
      }
    }
  `}
`

export const SuccessWrapper = styled.div<WithVisible>`
  ${({ visible }) => css`
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? 'inherit' : 'none'};
    transition: 0.2s;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    display: flex;
  `}
`

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const TextWrapper = styled.div`
  ${({ theme }) => css`
    font-size: 5;
    font-weight: 200;
    font-style: italic;
    line-height: 1.3;
    display: inline;
    max-width: 100%;
  `}
`

export const ConsentWrapper = styled.div`
  ${({ theme }) => css`
    font-size: 6;
    font-weight: 200;
    line-height: 1.3;
    display: inline;
    max-width: 360px;
  `}
`

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
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    display: flex;
  `}
`

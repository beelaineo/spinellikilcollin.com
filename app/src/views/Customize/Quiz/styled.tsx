import styled, { css } from '@xstyled/styled-components'

/**
 * Common
 */

export const QuizTabWrapper = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 0 3;
  max-width: 100%;

  input {
    width: 300px;
  }

  textArea {
    width: 500px;
  }

  input,
  textArea {
    max-width: 100%;
  }
  button svg {
    stroke: currentColor;
    vertical-align: text-bottom;
    margin-left: 2;
  }
`

export const FieldWithButton = styled.div`
  position: relative;

  margin-top: 3;

  & input {
    padding-right: 40px;
  }

  & button {
    position: absolute;
    right: 0;
    top: 0;
    padding-right: 2;
    height: 100%;
    display: flex;
    align-items: center;
  }
`

/**
 * Kind
 */

export const KindButtons = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 3;

    ${theme.mediaQueries.mobile} {
      grid-template-columns: repeat(2, 1fr);
    }
  `}
`

export const KindButtonWrapper = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: 0.2s;
`

/**
 * Details
 */

export const DetailButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

interface WithIsSelected {
  isSelected: boolean
}

export const DetailButtonWrapper = styled.button<WithIsSelected>`
  ${({ isSelected }) => css`
    cursor: pointer;
    padding: 3;
    font-size: 4;
    border: 1px solid;
    border-radius: 4px;
    color: ${isSelected ? 'body.9' : 'body.5'};
    background-color: ${isSelected ? 'body.0' : 'transparent'};
    margin: 3;
  `}
`

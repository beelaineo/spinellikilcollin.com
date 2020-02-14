import styled, { css } from 'styled-components'

export const Select = styled.select`
  ${({ theme }) => css`
    text-align-last: center;
    height: 32px;
    width: 100%;
    border: 2px solid #d8d8d8;
    border-radius: 0;
    transition: 0.2s;
    font-size: 1rem;
    cursor: pointer;
    background: none;
    padding: 1rem 2rem;
    font-family: ${theme.font.family.serif};

    option {
      font-family: sans-serif;
    }
  `}
`

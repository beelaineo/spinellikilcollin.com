import styled, { css, DefaultTheme } from '@xstyled/styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8;
  position: relative;
  justify-content: center;

  > div:last-child{
    div::after {
        content: '';
  }
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const Value = styled.div`
  ${({ theme }) => css`
    span {
      font-size: ${theme.fontSizes[2]};
    }
  `}
`

export const Label = styled.div`
  ${({ theme }) => css`
    text-transform: uppercase;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    gap: 4;

    span {
      font-size: ${theme.fontSizes[3]};
    }

    &::after {
      content: ':';
      display: block;
      position: absolute;

      right: -24px;
      color: white;
      z-index: 1;
    }
  `}
`

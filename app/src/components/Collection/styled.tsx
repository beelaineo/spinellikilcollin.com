import styled, { css, DefaultTheme } from '@xstyled/styled-components'

export const ImageWrapper = styled.div`
  ${({ theme }) => css`
    color: ${theme.color.grays[1]};
    border: 1px solid;
    padding: 3;
  `}
`

export const TextWrapper = styled.div`
  margin-top: 3;
  color: black;
`

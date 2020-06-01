import styled, { css } from '@xstyled/styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: 3;
    background-color: white;
    width: calc(100% + (${theme.space[10]}px * 2));
    margin-left: -${theme.space[10]}px;
    margin-bottom: 4;
  `}
`


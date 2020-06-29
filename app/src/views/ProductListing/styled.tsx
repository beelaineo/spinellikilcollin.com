import styled, { css } from '@xstyled/styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding-top: ${theme.navHeight};
  `}
`

export const NoResultsWrapper = styled.div`
  padding: 8 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

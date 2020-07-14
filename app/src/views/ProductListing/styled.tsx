import styled, { css } from '@xstyled/styled-components'

interface WrapperProps {
  withHero: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, withHero }) => css`
    padding-top: ${withHero ? 0 : theme.navHeight};
  `}
`

export const NoResultsWrapper = styled.div`
  padding: 8 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

import styled, { css } from '@xstyled/styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding-top: 5;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 5;
    align-content: center;

    ${theme.mediaQueries.mobile} {
      grid-template-columns: 100%;
    }
  `}
`

export const ContactLines = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const ContactLineWrapper = styled.div`
  padding-bottom: 2;
  border-bottom: 1px solid;
  border-color: body.5;
  margin-bottom: 6;

  &:last-of-type {
    margin-bottom: 0;
  }
`

export const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  svg {
    margin: 0 auto;
    max-width: 180px;
  }
`

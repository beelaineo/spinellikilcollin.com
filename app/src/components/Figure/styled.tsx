import styled, { css, DefaultTheme } from '@xstyled/styled-components'
import { Header5 } from '../Text'

interface WithAsAndTo {
  theme: DefaultTheme
  justify?: string
  to?: string
}

export const FigureWrapper = styled.div`
  ${({ theme, justify }: WithAsAndTo) => css`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: ${justify || 'center'};
    color: inherit;
    text-decoration: none;
  `}
`

export const ImageWrapper = styled.div`
  display: flex;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const Caption = styled(Header5)`
  ${({ theme }) => css`
    margin-top: 2;
    min-height: 2.35em;
    color: inherit;
    text-decoration: none;
  `}
`

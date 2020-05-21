import styled, { css } from '@xstyled/styled-components'

interface WithDisabled {
  disabled?: boolean
}

export const FormWrapper = styled.div<WithDisabled>`
  ${({ disabled }) => css`
    transition: 0.2s;
    opacity: ${disabled ? 0.6 : 1};
    pointer-events: ${disabled ? 'none' : 'inherit'};
  `}
`

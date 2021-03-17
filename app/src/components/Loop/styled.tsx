import styled, { css } from '@xstyled/styled-components'

export const LoopContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 0 4;
`

export const LoopInner = styled.div`
  display: flex;
  overflow: visible;
`

interface LoopChildContainerProps {
  active: boolean
  clone?: boolean
}

export const LoopChildContainer = styled.div<LoopChildContainerProps>`
  ${({ active }) => css`
    display: inline-block;
    transition: 0.3s ease-out;
    opacity: ${active ? 1 : 0.4};
  `}
`

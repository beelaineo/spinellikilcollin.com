import * as React from 'react'
import styled, { keyframes, css } from '@xstyled/styled-components'

const drawLine = keyframes`
	0%,
	100% {
		right: initial;
		left: 0;
		width: 0;
	}

	25% {
		left: 0;
		width: 100%;
	}
	25.1%,
	50% {
		left: initial;
		width: 100%;
		right: 0;
	}

	75% {
		left: initial;
		right: 0;

		width: 0;
		opacity: 1;
	}

	99.1% {
		left: initial;
		right: 0;
		opacity: 0;
	}

	99.2% {
		left: initial;
		right: 0;
		left: -100%;
	}

	99.3% {
		left: initial;
		right: 0;
		opacity: 1;
	}
`

const LoadingWrapper = styled.div`
  margin: 3 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100px;
  pointer-events: none;
  padding: 3;
`

const LoadingLine = styled.div`
  width: 40px;
  height: 1px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    height: 1px;
    width: 0;
    background-color: currentColor;
    animation: ${drawLine} 4s infinite ease-in-out;
    animation-play-state: playing;
  }

  &:nth-of-type(1) {
    transform-origin: 100% 100%;
    transform: rotate(4deg);

    .thinking__dot:nth-of-type(1) {
      transform: scale(1.2);
    }
  }

  &:nth-of-type(2) {
    transform-origin: 0% 100%;
    transform: rotate(-7deg);
    &:after {
      animation-delay: 1s;
    }
  }
`

const LoadingDot = styled.div`
  position: absolute;
  width: 0.6rem;
  height: 0.6rem;
  background-color: background;
  top: -0.3rem;
  border-radius: 1rem;
  border: 1px solid currentColor;
  z-index: 10;

  &:nth-of-type(1) {
    right: 0;
  }
  &:nth-of-type(2) {
    left: 0;
  }
`

export const Loading = () => (
  <LoadingWrapper>
    <LoadingLine>
      <LoadingDot />
      <LoadingDot />
    </LoadingLine>

    <LoadingLine>
      <LoadingDot />
    </LoadingLine>
  </LoadingWrapper>
)

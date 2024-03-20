import PropTypes from 'prop-types'
import React, { useContext, useRef, useEffect, useCallback } from 'react'
import { useIntersection } from 'react-use'
import styled from '@xstyled/styled-components'
// eslint-disable-next-line import/no-cycle
import { SliderContext } from './Scroller'

const Wrapper = styled('div')`
  display: block;
  scroll-snap-align: start;
  width: max-content;
  position: relative;
  font-weight: 300;
  font-size: 4;

  &::before {
    content: '·';
    position: absolute;
    top: 0;
    left: -12px;
    color: body.6;
    height: 100%;

    pointer-events: none;
    opacity: 1;
  }

  &:first-of-type {
    &::before {
      display: none;
    }
  }
`

export const Slide = ({ children, index, root }) => {
  const ref = useRef(null)
  const { scrollToIndex, setActiveIndices } = useContext(SliderContext)

  const intersection = useIntersection(ref, {
    root: root?.current,
    rootMargin: '0px',
    threshold: 1,
  })

  useEffect(() => {
    setActiveIndices((prevActiveIndices) =>
      intersection?.isIntersecting
        ? [...prevActiveIndices, index]
        : prevActiveIndices.filter((idx) => idx !== index),
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection])

  const handleClick = useCallback(() => {
    scrollToIndex([0])
  }, [scrollToIndex])

  return (
    <Wrapper ref={ref} onClick={handleClick} role="button">
      {children}
    </Wrapper>
  )
}

Slide.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
  root: PropTypes.shape({ current: PropTypes.object }),
}

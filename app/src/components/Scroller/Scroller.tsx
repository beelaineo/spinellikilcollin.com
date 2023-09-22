import React, { createContext, useState, useRef, useEffect } from 'react'
import { useMeasure } from 'react-use'
// eslint-disable-next-line import/no-cycle
import { Slide } from './Slide'

import styled, { css } from '@xstyled/styled-components'

export const SliderContext = createContext({
  activeIndices: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setActiveIndices: (value: any) => {},
  hasOverflow: true,
  isBeginning: true,
  isEnd: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  scrollToIndex: (value: any) => {},
})

interface WrapperProps {
  isBeginning?: boolean
  isEnd?: boolean
}
interface ContainerProps {
  hasOverflow?: boolean
}

const Wrapper = styled.section<WrapperProps>`
  ${({ isBeginning, isEnd }) => css`
    width: 100%;
    position: relative;
    opacity: 1;
    transform: translateX(0);
    margin-bottom: 6;

    &:before {
      opacity: ${isBeginning ? 0 : 1};
      transition: opacity 1s ease-out;
      z-index: 1;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0rem;
      width: 15%;
      height: 20px;

      background-image: linear-gradient(
        to left,
        rgba(249, 250, 250, 0) -5%,
        rgba(249, 250, 250, 1) 75%
      );
    }
    &:after {
      opacity: ${isEnd ? 0 : 1};
      transition: opacity 1s ease-out;
      z-index: 1;
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0rem;
      width: 15%;
      height: 20px;

      background-image: linear-gradient(
        to right,
        rgba(249, 250, 250, 0) -5%,
        rgba(249, 250, 250, 1) 75%
      );
    }
  `}
`

const Container = styled.div<ContainerProps>`
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: x none;
  position: relative;

  padding-bottom: 2;

  &::-webkit-scrollbar {
    width: 3px;
    height: 5px;
    display: block;
  }

  &::-webkit-scrollbar-thumb {
    background-clip: content-box;
    background-color: transparent;
    border-radius: 2rem;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: #b8b8b8;
  }
`

const Track = styled.ul`
  display: flex;
  width: 100%;
  min-width: min-content;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
  gap: 20px;
  position: relative;

  list-style: none;

  > div:first-child {
    padding-left: 0;
    margin-left: 0;
  }

  > div:nth-child(2) {
    padding-left: 0;
    margin-left: 0;
  }

  > div:last-child {
    padding-right: 0;
    margin-right: 0;
  }
`

interface ScrollerProps {
  children: React.ReactNode[]
  autoScroll?: boolean
  query?: any
}

export const Scroller = ({
  children,
  autoScroll = true,
  query,
}: ScrollerProps) => {
  const [scrollLeft, setScrollLeft] = useState(0)
  const [activeIndices, setActiveIndices] = useState([])
  const [hasOverflow, setHasOverflow] = useState(true)

  const ref = useRef<any>(null)
  const containerRef = useRef<any>(null)
  const trackRef = useRef<any>(null)

  const [widthRef, { width: containerWidth }] = useMeasure()
  const trackWidth = trackRef?.current?.scrollWidth || 0
  const slideWith = trackWidth / children.length || 0

  const isBeginning = Math.floor(scrollLeft) === 0
  const isEnd = Math.ceil(containerWidth + scrollLeft) >= trackWidth

  const handleContainerScroll = () => {
    setScrollLeft(containerRef.current.scrollLeft)
  }

  const scrollToIndex = (index) => {
    if (autoScroll) {
      const scrollLeft = index * slideWith

      containerRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      })
    }
  }
  useEffect(() => {
    scrollToIndex([0])
  }, [query])

  useEffect(() => {
    containerRef?.current && containerRef.current.scrollTo({ left: 0 })
  }, [containerRef])

  useEffect(() => {
    setHasOverflow(true)
  }, [containerWidth, trackWidth])

  useEffect(() => {
    const container = containerRef.current

    container.addEventListener('scroll', handleContainerScroll)

    return () => container.removeEventListener('scroll', handleContainerScroll)
  }, [containerRef])

  return (
    <SliderContext.Provider
      value={{
        activeIndices,
        hasOverflow,
        isBeginning,
        isEnd,
        setActiveIndices,
        scrollToIndex,
      }}
    >
      <Wrapper ref={ref} isBeginning={isBeginning} isEnd={isEnd}>
        <Container ref={containerRef} hasOverflow={hasOverflow}>
          <div // @ts-ignore
            ref={widthRef}
          >
            <Track ref={trackRef}>
              {React.Children.map(children, (child: any, index) => {
                return (
                  <Slide root={containerRef} key={index} index={index}>
                    {React.cloneElement(child)}
                  </Slide>
                )
              })}
            </Track>
          </div>
        </Container>
      </Wrapper>
    </SliderContext.Provider>
  )
}

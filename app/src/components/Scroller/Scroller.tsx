import React, { createContext, useState, useRef, useEffect } from 'react'
import { useIntersection, useMeasure } from 'react-use'
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
  isInView?: boolean
}

interface ContainerProps {
  hasOverflow?: boolean
}

const Wrapper = styled.section<WrapperProps>`
  ${({ isInView }) => css`
    --scrollbar-border: 0.35rem;
    --scrollbar-color: #b8b8b8;
    width: 100%;

    ${isInView &&
    `opacity: 1;
      transform: translateX(0);`}

    @media (hover: hover) {
      &:hover {
        .navigation {
          opacity: 1;
          pointer-events: all;
        }
      }
    }
  `}
`

const Container = styled.div<ContainerProps>`
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: x none;

  @media (hover: hover) {
    &::-webkit-scrollbar {
      width: 1.5rem;
    }

    &::-webkit-scrollbar-thumb {
      border: var(--scrollbar-border) solid transparent;
      background-clip: content-box;
      background-color: transparent;
      border-radius: 2rem;
    }

    &:hover::-webkit-scrollbar-thumb {
      background-color: var(--scrollbar-color);
    }
  }
`

const Track = styled.ul`
  display: flex;
  width: 100%;
  min-width: min-content;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
  gap: 2rem;
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
  hideScrollBars: boolean
  autoScroll?: boolean
}

export const Scroller = ({
  children,
  hideScrollBars = false,
  autoScroll = true,
}: ScrollerProps) => {
  const [scrollLeft, setScrollLeft] = useState(0)
  const [activeIndices, setActiveIndices] = useState([])
  const [isInView, setIsInView] = useState(false)
  const [hasOverflow, setHasOverflow] = useState(true)

  const ref = useRef<any>(null)
  const containerRef = useRef<any>(null)
  const trackRef = useRef<any>(null)

  const [widthRef, { width: containerWidth }] = useMeasure()
  const trackWidth = trackRef?.current?.scrollWidth || 0
  const slideWith = trackWidth / children.length || 0

  const isBeginning = Math.floor(scrollLeft) === 0
  const isEnd = Math.ceil(containerWidth + scrollLeft) >= trackWidth

  const intersection = useIntersection(ref, {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  })

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
    containerRef?.current && containerRef.current.scrollTo({ left: 0 })
  }, [containerRef])

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setIsInView(true)
    }
  }, [intersection])

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
      <Wrapper ref={ref} isInView={isInView}>
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

import * as React from 'react'
import {
  LoopContainer,
  LoopInner,
  LoopChildContainer,
  LoopButtonContainer,
} from './styled'
import {
  CLONE_OFFSET,
  DEFAULT_TRANSITION,
  DEFAULT_INTERVAL,
  useLoopReducer,
} from './reducer'
import LeftArrowLong from '../../svg/LeftArrowLong.svg'
import RightArrowLong from '../../svg/RightArrowLong.svg'

const { useEffect, useRef } = React

interface LoopChildProps {
  children: React.ReactNode
  active: boolean
  clone?: boolean
  addRef: (ref: React.RefObject<HTMLDivElement>) => void
  removeRef: (ref: React.RefObject<HTMLDivElement>) => void
}

export const LoopChild = ({
  active,
  children,
  addRef,
  clone,
  removeRef,
}: LoopChildProps) => {
  const childRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    addRef(childRef)
    return () => removeRef(childRef)
  }, [])

  return (
    <LoopChildContainer clone={clone} active={active} ref={childRef}>
      {children}
    </LoopChildContainer>
  )
}

/**
 * Buttons
 */

interface LoopButtonProps {
  direction: 'previous' | 'next'
  onClick: () => void
}

export const LoopButton: React.FC<LoopButtonProps> = ({
  direction,
  onClick,
}) => {
  return (
    <LoopButtonContainer type="button" direction={direction} onClick={onClick}>
      {direction === 'previous' ? <LeftArrowLong /> : <RightArrowLong />}
    </LoopButtonContainer>
  )
}

/**
 * Main component
 */

interface LoopProps {
  children: React.ReactNode[]
  withButtons?: boolean
  interval?: number
  autoplay?: boolean
}

export const Loop = ({
  children,
  withButtons,
  interval: customInterval,
  autoplay,
}: LoopProps) => {
  const interval = customInterval || DEFAULT_INTERVAL
  const innerRef = useRef<HTMLDivElement>(null)
  const { state, addRef, removeRef, next, previous } = useLoopReducer(
    innerRef,
    interval,
    children.length,
    autoplay || false,
  )
  const { left, transitionDuration, currentIndex } = state
  const firstTwo = children.slice(0, CLONE_OFFSET)
  const lastTwo = children.slice(-CLONE_OFFSET)

  const goToPrevious = () => previous()
  const goToNext = () => next()

  const styles = {
    transform: `translateX(${left}px)`,
    transition: `${transitionDuration}ms cubic-bezier(0.28, 0.05, 0.29, 0.99)`,
  }

  const slideIsActive = (index: number): boolean => {
    if (index === currentIndex) return true
    if (index === 0 && currentIndex === children.length) return true
    if (index === children.length - 1 && currentIndex === -1) return true
    return false
  }

  return (
    <LoopContainer>
      {withButtons ? (
        <LoopButton direction="previous" onClick={goToPrevious} />
      ) : null}

      <LoopInner ref={innerRef} style={styles}>
        {React.Children.map(lastTwo, (child, index) => (
          <LoopChild
            clone
            active={index === 1 && currentIndex === -1}
            addRef={addRef}
            removeRef={removeRef}
          >
            {child}
          </LoopChild>
        ))}
        {React.Children.map(children, (child, index) => (
          <LoopChild
            active={slideIsActive(index)}
            addRef={addRef}
            removeRef={removeRef}
          >
            {child}
          </LoopChild>
        ))}
        {React.Children.map(firstTwo, (child, index) => (
          <LoopChild
            clone
            active={index + children.length === currentIndex}
            addRef={addRef}
            removeRef={removeRef}
          >
            {child}
          </LoopChild>
        ))}
      </LoopInner>
      {withButtons ? <LoopButton direction="next" onClick={goToNext} /> : null}
    </LoopContainer>
  )
}

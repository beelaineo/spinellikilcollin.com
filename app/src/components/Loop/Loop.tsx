import * as React from 'react'
import { LoopContainer, LoopInner, LoopChildContainer } from './styled'
import {
  CLONE_OFFSET,
  DEFAULT_TRANSITION,
  DEFAULT_INTERVAL,
  useLoopReducer,
} from './reducer'

const { useEffect, useRef } = React

interface LoopChildProps {
  children: React.ReactNode
  active: boolean
  clone?: boolean
  addRef: (ref: React.RefObject<HTMLDivElement>) => void
  removeRef: (ref: React.RefObject<HTMLDivElement>) => void
  /* */
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
    // if (!currentRef) return
    addRef(childRef)
    return () => removeRef(childRef)
  }, [])

  return (
    <LoopChildContainer clone={clone} active={active} ref={childRef}>
      {children}
    </LoopChildContainer>
  )
}

interface LoopProps {
  children: React.ReactNode[]
  interval?: number
}

export const Loop = ({ children, interval: customInterval }: LoopProps) => {
  const interval = customInterval || DEFAULT_INTERVAL
  const innerRef = useRef<HTMLDivElement>(null)
  const { state, addRef, removeRef } = useLoopReducer(
    innerRef,
    interval,
    children.length,
  )
  const { left, transitionDuration, currentIndex } = state
  const firstTwo = children.slice(0, CLONE_OFFSET)
  const lastTwo = children.slice(-CLONE_OFFSET)

  const styles = {
    transform: `translateX(${left}px)`,
    transition: `${transitionDuration}ms cubic-bezier(0.28, 0.05, 0.29, 0.99)`,
  }

  return (
    <LoopContainer>
      <LoopInner ref={innerRef} style={styles}>
        {React.Children.map(lastTwo, (child) => (
          <LoopChild clone active={false} addRef={addRef} removeRef={removeRef}>
            {child}
          </LoopChild>
        ))}
        {React.Children.map(children, (child, index) => (
          <LoopChild
            active={index === currentIndex}
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
    </LoopContainer>
  )
}

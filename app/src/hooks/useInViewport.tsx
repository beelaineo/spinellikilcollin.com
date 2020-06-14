import * as React from 'react'

const { useEffect, useState, useRef } = React

// Adapted from:
// https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5

export const useInViewport = (node: React.RefObject<HTMLElement>) => {
  const [isInView, setIsInView] = useState(false)

  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (observer?.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    })

    const { current: currentObserver } = observer

    if (node.current) currentObserver.observe(node.current)

    return () => currentObserver.disconnect()
  }, [node.current])

  return [isInView]
}


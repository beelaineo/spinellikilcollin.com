import { useReducer, useEffect } from 'react'
import { useLockScroll } from '../LockScroll'

interface State {
  active: boolean
  touchStart: number
  initialPosition: number
  diff: number
  xDirection: 'left' | 'right' | null
  target: null | EventTarget
}

const START = 'START'
const SET_DIFF = 'SET_DIFF'
const END = 'END'

interface StartAction {
  type: typeof START
  touchStart: number
  initialPosition: number
  target: EventTarget
}

interface SetDiffAction {
  type: typeof SET_DIFF
  diff: number
  direction: State['xDirection']
}

interface EndAction {
  type: typeof END
}

type Action = StartAction | SetDiffAction | EndAction

const getXDirection = (initial: number, diff: number): State['xDirection'] => {
  if (initial === diff) return null
  return initial < diff ? 'right' : 'left'
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case START:
      return {
        ...state,
        active: true,
        touchStart: action.touchStart,
        initialPosition: action.initialPosition,
        target: action.target,
        diff: action.initialPosition,
        xDirection: null,
      }
    case SET_DIFF:
      return {
        ...state,
        diff: action.diff,
        xDirection: action.direction,
        target: null,
      }
    case END: {
      return {
        ...state,
        active: false,
      }
    }
    default:
      // @ts-ignore
      throw new Error(`"${action.type}" is not a valid action type`)
  }
}

const initialState: State = {
  active: false,
  touchStart: 0,
  initialPosition: 0,
  diff: 0,
  target: null,
  xDirection: null,
}

export const useSwipeReducer = (element: HTMLElement | null) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { lockScroll, unlockScroll } = useLockScroll()

  const startSwipe =
    (initialPosition: number) => (e: React.MouseEvent | React.TouchEvent) => {
      if (!element) return
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const target = e.target
      lockScroll()
      dispatch({ type: START, initialPosition, touchStart: clientX, target })
    }
  const setSwipeDiff = (diff: number, direction: State['xDirection']) =>
    dispatch({ type: SET_DIFF, diff, direction })

  const endSwipe = () => {
    dispatch({ type: END })
    unlockScroll()
  }

  const watchMouseMove = (e: MouseEvent | TouchEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const diff = clientX - state.touchStart + state.initialPosition
    const direction = getXDirection(state.touchStart, clientX)
    setSwipeDiff(diff, direction)
  }

  const stopAnchorClick = (e: MouseEvent) => {
    e.preventDefault()
  }

  useEffect(() => {
    if (!element) return
    element.addEventListener('click', stopAnchorClick)
    if (!state.active && state.target) {
      element.removeEventListener('click', stopAnchorClick)
      // @ts-ignore
      state.target.click()
    }

    return () => {
      element.removeEventListener('click', stopAnchorClick)
    }
  }, [element, state.active, state.target])

  useEffect(() => {
    if (!element) return
    if (state.active) {
      document.addEventListener('mousemove', watchMouseMove)
      document.addEventListener('mouseup', endSwipe)
      document.addEventListener('touchmove', watchMouseMove)
      document.addEventListener('touchend', endSwipe)

      return () => {
        document.removeEventListener('mousemove', watchMouseMove)
        document.removeEventListener('mouseup', endSwipe)
        document.removeEventListener('touchmove', watchMouseMove)
        document.removeEventListener('touchend', endSwipe)
      }
    }
  }, [state.active])

  return { state, startSwipe, endSwipe, setSwipeDiff }
}

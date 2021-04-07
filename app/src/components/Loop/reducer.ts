import { useReducer, useEffect } from 'react'

export const CLONE_OFFSET = 2
export const DEFAULT_INTERVAL = 9000
export const DEFAULT_TRANSITION = 500

type Ref = React.RefObject<HTMLDivElement>

interface State {
  currentIndex: number
  left: number
  transitionDuration: number
  containerRef: Ref
  childRefs: Ref[]
}

enum Actions {
  AddChild = 'AddChild',
  RemoveChild = 'RemoveChild',
  GoToChild = 'GoToChild',
}

interface AddChildAction {
  type: Actions.AddChild
  ref: Ref
}

interface RemoveChildAction {
  type: Actions.RemoveChild
  ref: Ref
}

interface GoToChildAction {
  type: Actions.GoToChild
  left: number
  newIndex: number
  useTransition?: boolean
}

type Action = AddChildAction | RemoveChildAction | GoToChildAction

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Actions.AddChild:
      return {
        ...state,
        childRefs: [...state.childRefs, action.ref],
      }
    case Actions.RemoveChild:
      return {
        ...state,
        childRefs: state.childRefs.filter((ref) => ref !== action.ref),
      }
    case Actions.GoToChild:
      return {
        ...state,
        left: action.left,
        currentIndex: action.newIndex,
        transitionDuration: action.useTransition ? DEFAULT_TRANSITION : 0,
      }
  }
}

const defaultState: Omit<State, 'containerRef'> = {
  currentIndex: 0,
  left: 0,
  transitionDuration: 0,
  childRefs: [],
}

export const useLoopReducer = (
  containerRef: Ref,
  interval: number,
  totalChildren: number,
  autoplay: boolean,
) => {
  const initialState = {
    ...defaultState,
    containerRef,
  }
  /* State */
  const [state, dispatch] = useReducer(reducer, initialState)

  const { childRefs, currentIndex, transitionDuration } = state

  /* Helpers */
  const getLeft = (childIndex: number): number => {
    const child = childRefs[childIndex + CLONE_OFFSET]

    if (!containerRef.current) {
      throw new Error('No container')
    }
    if (!child?.current) {
      throw new Error(`There is no child at index ${currentIndex}`)
    }

    const { offsetWidth, offsetLeft } = child.current
    const { offsetWidth: outerWidth } = containerRef.current
    const left = -offsetLeft + outerWidth / 2 - offsetWidth / 2
    return left
  }

  /* Internal Actions */
  const goToChild = async (newIndex: number, useTransition: boolean = true) => {
    const { containerRef, currentIndex, childRefs } = state
    if (!containerRef.current) return
    const left = getLeft(newIndex)
    dispatch({ type: Actions.GoToChild, left, newIndex, useTransition })
    const duration = useTransition ? DEFAULT_TRANSITION : 0
    await sleep(duration)
  }

  /* Exported Actions */
  const addRef = (ref: Ref) => dispatch({ type: Actions.AddChild, ref })

  const removeRef = (ref: Ref) => dispatch({ type: Actions.RemoveChild, ref })

  const next = async () => {
    if (currentIndex + 1 === totalChildren) {
      /* Snap to clone if this step loops */
      await goToChild(-1, false)
      goToChild(0)
      return
    }
    goToChild(currentIndex + 1)
  }

  const previous = async () => {
    if (currentIndex === 0) {
      /* Snap to clone if this step loops */
      await goToChild(totalChildren, false)
      goToChild(totalChildren - 1)
      return
    }
    goToChild(currentIndex - 1)
  }

  /* Effects */

  useEffect(() => {
    if (!childRefs.length) return
    goToChild(0, false)
  }, [childRefs.length])

  useEffect(() => {
    if (!autoplay) return
    const timeout = setTimeout(() => {
      next()
    }, interval)
  }, [autoplay, currentIndex])

  return { state, addRef, next, previous, removeRef }
}

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

const reducer = (state: State, action: Action): State => {
  console.log(action)
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

  /* Internal Actions */
  const goToChild = (newIndex: number, useTransition: boolean = true) => {
    const { containerRef, currentIndex, childRefs } = state
    const child = childRefs[newIndex + CLONE_OFFSET]
    if (!child) {
      throw new Error(`There is no child at index ${currentIndex}`)
    }
    if (!child.current) return
    if (!containerRef.current) return
    const { offsetWidth, offsetLeft } = child.current
    const { offsetWidth: outerWidth } = containerRef.current
    const left = -offsetLeft + outerWidth / 2 - offsetWidth / 2

    dispatch({ type: Actions.GoToChild, left, newIndex, useTransition })
  }

  /* Exported Actions */
  const addRef = (ref: Ref) => dispatch({ type: Actions.AddChild, ref })

  const removeRef = (ref: Ref) => dispatch({ type: Actions.RemoveChild, ref })

  const next = () => goToChild(currentIndex + 1)
  const previous = () => goToChild(currentIndex - 1)

  /* Effects */

  useEffect(() => {
    if (!childRefs.length) return
    goToChild(0, false)
  }, [childRefs.length])

  useEffect(() => {
    if (!childRefs.length) return
    const timeout = setTimeout(() => {
      if (currentIndex === totalChildren) {
        goToChild(0, false)
      }
      if (currentIndex === -1) {
        goToChild(totalChildren - 1, false)
      }
    }, transitionDuration)

    return () => clearTimeout(timeout)
  }, [autoplay, childRefs.length, currentIndex])

  return { state, addRef, next, previous, removeRef }
}

import { useReducer, useEffect } from 'react'

export const CLONE_OFFSET = 2
export const DEFAULT_INTERVAL = 4000
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
  SetIndex = 'SetIndex',
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

interface SetIndexAction {
  type: Actions.SetIndex
  newIndex: number
}

type Action =
  | AddChildAction
  | RemoveChildAction
  | GoToChildAction
  | SetIndexAction

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
    case Actions.SetIndex:
      return {
        ...state,
        currentIndex: action.newIndex,
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
) => {
  const initialState = {
    ...defaultState,
    containerRef,
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const addRef = (ref: Ref) => dispatch({ type: Actions.AddChild, ref })
  const removeRef = (ref: Ref) => dispatch({ type: Actions.RemoveChild, ref })
  const setCurrentIndex = (newIndex: number) =>
    dispatch({ type: Actions.SetIndex, newIndex })
  const goToChild = (newIndex: number, useTransition = true) => {
    const { containerRef, currentIndex, childRefs } = state
    const child = childRefs[currentIndex + CLONE_OFFSET]
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

  const { childRefs, currentIndex } = state
  useEffect(() => {
    if (!childRefs.length) return
    const useTransition = currentIndex !== 0
    const timeoutInterval = useTransition ? interval : 0
    goToChild(currentIndex, useTransition)
    const timeout = setTimeout(() => {
      const newIndex = currentIndex === totalChildren ? 0 : currentIndex + 1
      setCurrentIndex(newIndex)
    }, timeoutInterval)

    return () => clearTimeout(timeout)
  }, [childRefs.length, currentIndex])

  return { state, addRef, removeRef }
}

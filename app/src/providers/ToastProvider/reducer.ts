import { useReducer } from 'react'
import { Toast, ToastType, NewToast } from './types'

interface State {
  toasts: Map<string, Toast>
}

enum ActionType {
  CREATE_TOAST = 'CREATE_TOAST',
  DISMISS_TOAST = 'DISMISS_TOAST',
}

interface NewToastAction {
  type: ActionType.CREATE_TOAST
  key: string
  toast: Toast
}

interface DismissToastAction {
  type: ActionType.DISMISS_TOAST
  key: string
}

const initialState: State = {
  toasts: new Map(),
}

type Action = NewToastAction | DismissToastAction

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.CREATE_TOAST:
      return {
        ...state,
        toasts: new Map(state.toasts).set(action.key, action.toast),
      }
    case ActionType.DISMISS_TOAST:
      const updatedToasts = new Map(state.toasts)
      updatedToasts.delete(action.key)
      return {
        ...state,
        toasts: updatedToasts,
      }
  }
}

export const useToastReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const createToast = (toast: NewToast) => {
    const type = toast.type || ToastType.Message

    const dismissable =
      type === ToastType.Message
        ? // if type === Message, use the provided value or fall back to false
          toast.dismissable || false
        : // Otherwise, it's an error or warning and should be true

          true

    dispatch({
      type: ActionType.CREATE_TOAST,
      key: new Date().getTime().toString(),
      toast: {
        ...toast,
        dismissable,
        type,
      },
    })
  }
  const dismissToast = (key: string) =>
    dispatch({ type: ActionType.DISMISS_TOAST, key })

  return {
    state,
    createToast,
    dismissToast,
  }
}

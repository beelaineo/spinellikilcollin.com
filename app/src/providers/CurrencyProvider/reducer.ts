import { useReducer } from 'react'
import { Sentry } from '../../services/sentry'
import { config } from '../../config'

const { EXCHANGE_RATE_API_KEY } = config

interface State {
  loading: boolean
  currentCurrency: string
  error?: Error | null
  message?: string | null
}

enum ActionTypes {
  UPDATE = 'updateCurrency',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface UpdateCurrencyAction {
  type: ActionTypes.UPDATE
}

interface SuccessAction {
  type: ActionTypes.SUCCESS
  currency: string
}

interface ErrorAction {
  type: ActionTypes.ERROR
  error: Error
  message: string
}

type Action = UpdateCurrencyAction | SuccessAction | ErrorAction

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.UPDATE:
      return {
        ...state,
        loading: true,
      }

    case ActionTypes.SUCCESS:
      return {
        ...state,
        loading: false,
        currentCurrency: action.currency,
        error: null,
        message: null,
      }
    case ActionTypes.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        message: action.message,
        currentCurrency: 'USD',
      }
    default:
      // @ts-ignore
      throw new Error(`"${action.type}" is not a valid action`)
  }
}

const initialState: State = {
  loading: false,
  currentCurrency: 'USD',
}

export const useCurrencyState = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const updateCurrency = async (currency: string) => {
    dispatch({ type: ActionTypes.UPDATE })
    try {
      dispatch({ type: ActionTypes.SUCCESS, currency })
    } catch (error: Error | any | unknown) {
      Sentry.captureException(error, 'currency_conversion')
      const message =
        'Sorry, there was a problem changing your currency. You can continue shopping in USD and update your currency at checkout.'
      dispatch({ type: ActionTypes.ERROR, error, message })
    }
  }

  return {
    ...state,
    updateCurrency,
  }
}

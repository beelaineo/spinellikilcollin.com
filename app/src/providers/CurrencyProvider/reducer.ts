import { useReducer } from 'react'
import { Sentry } from '../../services/sentry'
import { config } from '../../config'

const { EXCHANGE_RATE_API_KEY } = config

interface State {
  loading: boolean
  currentCurrency: string
  exchangeRate: number
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
  exchangeRate: number
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
        exchangeRate: action.exchangeRate,
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
  exchangeRate: 1,
}

export const useCurrencyState = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const updateCurrency = async (currency: string) => {
    dispatch({ type: ActionTypes.UPDATE })
    try {
      const url = `https://api.exchangeratesapi.io/latest?access_key=${EXCHANGE_RATE_API_KEY}&base=USD&symbols=USD,${currency.toUpperCase()}`
      const result = await fetch(url).then((r) => r.json())
      const { rates } = result
      const exchangeRate = rates[currency]
      if (!exchangeRate) {
        throw new Error(`Could not get exchange rate for ${currency}`)
      }
      dispatch({ type: ActionTypes.SUCCESS, currency, exchangeRate })
    } catch (error) {
      Sentry.configureScope((scope) => {
        scope.setTag('currency', currency)
      })
      Sentry.captureException(error)
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

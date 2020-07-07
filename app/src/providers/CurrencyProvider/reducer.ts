import { useReducer } from 'react'

interface State {
  loading: boolean
  currentCurrency: string
  exchangeRate: number
}

enum ActionTypes {
  UPDATE = 'updateCurrency',
  SUCCESS = 'success',
}

interface UpdateCurrencyAction {
  type: ActionTypes.UPDATE
}

interface SuccessAction {
  type: ActionTypes.SUCCESS
  currency: string
  exchangeRate: number
}

type Action = UpdateCurrencyAction | SuccessAction

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
    const url = `https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,${currency.toUpperCase()}`
    const result = await fetch(url).then((r) => r.json())
    const { rates } = result
    const exchangeRate = rates[currency]
    if (!exchangeRate) {
      throw new Error(`Could not get exchange rate for ${currency}`)
    }
    dispatch({ type: ActionTypes.SUCCESS, currency, exchangeRate })
  }

  return {
    ...state,
    updateCurrency,
  }
}

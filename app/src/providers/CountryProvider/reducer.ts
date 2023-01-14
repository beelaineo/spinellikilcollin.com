import { useReducer } from 'react'
import { Sentry } from '../../services/sentry'
import { config } from '../../config'
import { string } from 'yup'

interface State {
  loading: boolean
  currentCountry: string
  currency: string
  error?: Error | null
  message?: string | null
}

enum ActionTypes {
  UPDATE = 'updateCountry',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface UpdateCountryAction {
  type: ActionTypes.UPDATE
}

interface SuccessAction {
  type: ActionTypes.SUCCESS
  country: string
  currency: string
}

interface ErrorAction {
  type: ActionTypes.ERROR
  error: Error
  message: string
}

type Action = UpdateCountryAction | SuccessAction | ErrorAction

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
        currentCountry: action.country,
        currency: action.currency,
        error: null,
        message: null,
      }
    case ActionTypes.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
        message: action.message,
        currentCountry: 'US',
        currency: 'USD',
      }
    default:
      // @ts-ignore
      throw new Error(`"${action.type}" is not a valid action`)
  }
}

const initialState: State = {
  loading: false,
  currentCountry: 'US',
  currency: 'USD',
}

const getCurrencyFromCountry = async (
  countryCode: string,
): Promise<string | undefined> => {
  const countryData = await import('../../data/countries.json')
  return countryData.default
    .filter(
      (country) =>
        Boolean(country.countryCode) && Boolean(country.currencyCode),
    )
    .find((country) => country.countryCode === countryCode)?.currencyCode
}

export const useCountryState = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const updateCountry = async (country: string) => {
    dispatch({ type: ActionTypes.UPDATE })
    getCurrencyFromCountry(country)
      .then((data) => {
        const currency = data
        if (!currency) {
          throw new Error(
            `Could not get and set currency code for ${country} / ${currency}`,
          )
        }
        dispatch({ type: ActionTypes.SUCCESS, country, currency })
      })
      .catch((error: Error | any | unknown) => {
        Sentry.configureScope((scope) => {
          scope.setTag('country', country)
        })
        Sentry.captureException(error)
        const message =
          'Sorry, there was a problem changing your Country. You can continue shopping in USD and update your currency at checkout.'
        dispatch({ type: ActionTypes.ERROR, error, message })
      })
  }

  return {
    ...state,
    updateCountry,
  }
}

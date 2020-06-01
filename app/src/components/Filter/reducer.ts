import { useReducer } from 'react'
import {
  FilterSet as FilterSetType,
  PriceRangeFilter as PriceRangeFilterType,
} from '../../types'

export interface FilterSetState {
  key: string
  activeMatchKeys: string[]
}

interface State {
  filterSetStates: FilterSetState[]
}

const RESET_ALL = 'RESET_ALL'
const RESET_SET = 'RESET_SET'
const ENABLE = 'ENABLE'
const DISABLE = 'DISABLE'
const TOGGLE = 'TOGGLE'

interface ResetAllAction {
  type: typeof RESET_ALL
}

interface ResetSetAction {
  type: typeof RESET_SET
  setKey: string
}

interface EnableAction {
  type: typeof ENABLE
  setKey: string
  matchKey: string
}

interface DisableAction {
  type: typeof DISABLE
  setKey: string
  matchKey: string
}

interface ToggleAction {
  type: typeof TOGGLE
  setKey: string
  matchKey: string
}

type Action =
  | ResetAllAction
  | ResetSetAction
  | EnableAction
  | DisableAction
  | ToggleAction

const unique = <T>(array: T[]): T[] => {
  const set = new Set(array)
  return [...set]
}

const arrayToggle = <T>(array: T[], item: T): T[] => {
  if (array.some((i) => i === item)) {
    return array.filter((i) => i !== item)
  }
  return [...array, item]
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case RESET_ALL:
      return {
        filterSetStates: state.filterSetStates.map((s) => ({
          ...s,
          activeMatchKeys: [],
        })),
      }
    case RESET_SET:
      return {
        filterSetStates: state.filterSetStates.map((set) =>
          set.key === action.setKey
            ? {
                ...set,
                activeMatchKeys: [],
              }
            : set,
        ),
      }
    case ENABLE:
      return {
        filterSetStates: state.filterSetStates.map((set) =>
          set.key === action.setKey
            ? {
                ...set,
                activeMatchKeys: unique([
                  ...set.activeMatchKeys,
                  action.matchKey,
                ]),
              }
            : set,
        ),
      }
    case DISABLE:
      return {
        filterSetStates: state.filterSetStates.map((set) =>
          set.key === action.setKey
            ? {
                ...set,
                activeMatchKeys: set.activeMatchKeys.filter(
                  (mk) => mk !== action.matchKey,
                ),
              }
            : set,
        ),
      }

    case TOGGLE:
      return {
        filterSetStates: state.filterSetStates.map((set) =>
          set.key === action.setKey
            ? {
                ...set,
                activeMatchKeys: arrayToggle(
                  set.activeMatchKeys,
                  action.matchKey,
                ),
              }
            : set,
        ),
      }
    default:
      // @ts-ignore
      throw new Error(`"${action.type} is not a valid action type"`)
  }
  return state
}

type Filters = Array<FilterSetType | PriceRangeFilterType>

interface UseFilterReducer {
  filterSetStates: FilterSetState[]
  resetAll: () => void
  resetSet: (setKey: string) => () => void
  enable: (setKey: string) => (matchKey: string) => () => void
  disable: (setKey: string) => (matchKey: string) => () => void
  toggle: (setKey: string) => (matchKey: string) => () => void
}

export const useFilterState = (filters: Filters): UseFilterReducer => {
  const initialState = {
    filterSetStates: filters.map((filter) => ({
      key: filter._key || 'some-key',
      activeMatchKeys: [],
    })),
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const { filterSetStates } = state
  const resetAll = () => dispatch({ type: RESET_ALL })
  const resetSet = (setKey: string) => () =>
    dispatch({ type: RESET_SET, setKey })
  const enable = (setKey: string) => (matchKey: string) => () =>
    dispatch({ type: ENABLE, setKey, matchKey })
  const disable = (setKey: string) => (matchKey: string) => () =>
    dispatch({ type: DISABLE, setKey, matchKey })
  const toggle = (setKey: string) => (matchKey: string) => () =>
    dispatch({ type: TOGGLE, setKey, matchKey })
  return {
    filterSetStates,
    resetAll,
    resetSet,
    enable,
    disable,
    toggle,
  }
}

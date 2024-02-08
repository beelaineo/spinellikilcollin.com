import { useReducer } from 'react'
import {
  Filter as FilterSingleType,
  FilterSet as FilterSetType,
  PriceRangeFilter as PriceRangeFilterType,
  InventoryFilter as InventoryFilterTypeSource,
} from '../../types'
import { unique } from '../../utils'
import { FilterSetState, FilterValues } from './types'

interface InventoryFilterType extends InventoryFilterTypeSource {
  applyFilter?: boolean
}

interface State {
  filterSetStates: FilterSetState[]
}

const RESET_ALL = 'RESET_ALL'
const RESET_BUTTONS = 'RESET_BUTTONS'
const RESET_SET = 'RESET_SET'
const ENABLE = 'ENABLE'
const DISABLE = 'DISABLE'
const TOGGLE = 'TOGGLE'
const TOGGLE_SINGLE = 'TOGGLE_SINGLE'
const SET_VALUES = 'SET_VALUES'

interface ResetAllAction {
  type: typeof RESET_ALL
}

interface ResetButtonsAction {
  type: typeof RESET_BUTTONS
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

interface ToggleSingleAction {
  type: typeof TOGGLE_SINGLE
  setKey: string
  matchKey: string
}

interface SetValuesAction {
  type: typeof SET_VALUES
  setKey: string
  matchKey: string
  values: Record<string, any>
}

type Action =
  | ResetAllAction
  | ResetButtonsAction
  | ResetSetAction
  | EnableAction
  | DisableAction
  | ToggleAction
  | ToggleSingleAction
  | SetValuesAction

const arrayToggle = <T>(array: T[], item: T): T[] => {
  if (array.some((i) => i === item)) {
    return array.filter((i) => i !== item)
  }
  return [...array, item]
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case RESET_ALL:
      return {
        filterSetStates: state.filterSetStates.map((set) => {
          return {
            ...set,
            activeMatchKeys: [],
            values: set.initialValues,
          }
        }),
      }
    case RESET_BUTTONS:
      return {
        filterSetStates: state.filterSetStates.map((set) => {
          return {
            ...set,
            activeMatchKeys: [],
          }
        }),
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
    case TOGGLE_SINGLE:
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
            : {
                ...set,
                activeMatchKeys: [],
              },
        ),
      }
    case SET_VALUES:
      return {
        filterSetStates: state.filterSetStates.map((set) =>
          set.key === action.setKey
            ? {
                ...set,
                values: action.values,
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

type Filters = Array<
  FilterSingleType | FilterSetType | PriceRangeFilterType | InventoryFilterType
>

interface UseFilterReducer {
  filterSetStates: FilterSetState[]
  resetAll: () => void
  resetButtons: () => void
  resetSet: (setKey: string) => () => void
  enable: (setKey: string, matchKey: string) => void
  disable: (setKey: string, matchKey: string) => void
  toggle: (setKey: string) => (matchKey: string) => () => void
  toggleSingle: (setKey: string) => (matchKey: string) => () => void
  setValues: (
    setKey: string,
  ) => (matchKey: string, values: FilterValues) => void
}

export const useFilterState = (filters: Filters): UseFilterReducer => {
  const initialState = {
    filterSetStates: filters.map((filter) => ({
      key: filter._key || 'some-key',
      activeMatchKeys: [],
      initialValues:
        filter.__typename === 'PriceRangeFilter'
          ? {
              minPrice: filter?.minPrice || 0,
              maxPrice: filter?.maxPrice || 0,
            }
          : filter.__typename === 'InventoryFilter'
          ? {
              label: filter?.label || 'Ready to Ship',
              applyFilter: false,
            }
          : {},
      values:
        filter.__typename === 'PriceRangeFilter'
          ? {
              minPrice: filter?.minPrice || 0,
              maxPrice: filter?.maxPrice || 0,
            }
          : filter.__typename === 'InventoryFilter'
          ? {
              label: filter?.label || 'Ready to Ship',
              applyFilter: filter?.applyFilter || false,
            }
          : {},
    })),
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const { filterSetStates } = state
  const resetAll = () => dispatch({ type: RESET_ALL })
  const resetButtons = () => dispatch({ type: RESET_BUTTONS })
  const resetSet = (setKey: string) => () =>
    dispatch({ type: RESET_SET, setKey })
  const enable = (setKey: string, matchKey: string) =>
    dispatch({ type: ENABLE, setKey, matchKey })
  const disable = (setKey: string, matchKey: string) =>
    dispatch({ type: DISABLE, setKey, matchKey })
  const toggle = (setKey: string) => (matchKey: string) => () =>
    dispatch({ type: TOGGLE, setKey, matchKey })
  const toggleSingle = (setKey: string) => (matchKey: string) => () =>
    dispatch({ type: TOGGLE_SINGLE, setKey, matchKey })
  const setValues =
    (setKey: string) => (matchKey: string, values: FilterValues) => {
      dispatch({ type: SET_VALUES, setKey, matchKey, values })
    }
  return {
    filterSetStates,
    resetAll,
    resetButtons,
    resetSet,
    enable,
    disable,
    toggle,
    toggleSingle,
    setValues,
  }
}

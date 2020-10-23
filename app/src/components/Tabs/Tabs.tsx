import * as React from 'react'
import { unique } from '../../utils'

const { useEffect, useReducer } = React

interface TabsContextValue {
  add: (name: string) => void
  remove: (name: string) => void
  currentTab: string | undefined
  goToTab: (name: string) => void
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined)

export const TabsConsumer = TabsContext.Consumer

export const useTabs = () => {
  const ctx = React.useContext(TabsContext)
  if (!ctx) throw new Error('useTabsContext must be used within a TabsProvider')
  return ctx
}

enum Actions {
  Add = 'Add',
  Remove = 'Remove',
  GoToTab = 'GoToTab',
}

interface AddAction {
  type: Actions.Add
  name: string
}

interface RemoveAction {
  type: Actions.Remove
  name: string
}

interface GoToAction {
  type: Actions.GoToTab
  name: string
}

interface State {
  currentTab: string | undefined
  availableTabs: string[]
}

type Action = AddAction | RemoveAction | GoToAction

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Actions.Add:
      return {
        ...state,
        availableTabs: unique([...state.availableTabs, action.name]),
      }
    case Actions.Remove:
      return {
        ...state,
        availableTabs: state.availableTabs.filter((t) => t !== action.name),
      }
    case Actions.GoToTab:
      if (state.availableTabs.includes(action.name)) {
        throw new Error(
          `Tab "${action.name}" is not in the list of available tabs`,
        )
      }
      return {
        ...state,
        currentTab: action.name,
      }
  }
}

interface TabsProps {
  children: React.ReactNode
  initialTab?: string
}

const TabsProvider = ({ children, initialTab }: TabsProps) => {
  const initialState: State = {
    currentTab: initialTab,
    availableTabs: [],
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const { currentTab } = state

  const goToTab = (name: string) => dispatch({ type: Actions.GoToTab, name })
  const add = (name: string) => dispatch({ type: Actions.Add, name })
  const remove = (name: string) => dispatch({ type: Actions.Remove, name })

  const value = {
    currentTab,
    add,
    remove,
    goToTab,
  }

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>
}

export const Tabs = ({ children, initialTab }: TabsProps) => (
  <TabsProvider initialTab={initialTab}>{children}</TabsProvider>
)

export const Tab = ({ children, name }: TabProps) => {
  const { currentTab, add, remove } = useTabs()

  useEffect(() => {
    add(name)
    return () => remove(name)
  }, [])

  if (name !== currentTab) return null

  return <>{children}</>
}

import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { unique } from '../../utils'

const { useEffect, useReducer } = React

interface TabsContextValue {
  add: (name: string) => void
  remove: (name: string) => void
  currentTab: string | undefined
  goToTab: (name: string) => void
  mode: 'hidden' | 'normal'
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
      if (!state.availableTabs.includes(action.name)) {
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
  mode?: 'hidden' | 'normal'
  initialTab?: string
}

const TabsProvider = ({ children, initialTab, mode }: TabsProps) => {
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
    mode: mode || 'normal',
  }

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>
}

export const Tabs = ({ children, initialTab }: TabsProps) => (
  <TabsProvider initialTab={initialTab}>{children}</TabsProvider>
)

interface TabProps {
  children: React.ReactNode
  name: string
}

interface WithVisible {
  visible: boolean
}

const TabWrapper = styled.div<WithVisible>`
  ${({ visible }) =>
    visible === false
      ? css`
          opacity: 0;
          pointer-events: none;
          position: fixed;
          z-index: -100;
          left: -1000px;
          top: -1000px;
          width: 1px;
          height: 1px;
          overflow: hidden;
        `
      : ''}
`

export const Tab = ({ children, name }: TabProps) => {
  const { currentTab, add, remove, mode } = useTabs()

  useEffect(() => {
    add(name)
    return () => remove(name)
  }, [])
  const isActive = name === currentTab

  if (!isActive && mode !== 'hidden') return null

  return <TabWrapper visible={isActive}>{children}</TabWrapper>
}

import { useReducer } from 'react'
import { ShopifyProduct, ShopifyProductVariant } from '../../types'

const CLOSE = 'CLOSE'
const OPEN_CUSTOMIZATION = 'OPEN_CUSTOMIZATION'
const OPEN_RING_SIZER = 'OPEN_RING_SIZER'

export const RING_SIZER = 'RING_SIZER'
export const CUSTOMIZATION = 'CUSTOMIZATION'

interface State {
  currentModal: typeof RING_SIZER | typeof CUSTOMIZATION | null
  currentProduct?: ShopifyProduct
  currentVariant?: ShopifyProductVariant
}

interface CloseAction {
  type: typeof CLOSE
}

interface OpenRingSizerAction {
  type: typeof OPEN_RING_SIZER
}

interface OpenCustomizationAction {
  type: typeof OPEN_CUSTOMIZATION
  currentProduct?: ShopifyProduct
  currentVariant?: ShopifyProductVariant
}

type Action = CloseAction | OpenCustomizationAction | OpenRingSizerAction

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case OPEN_RING_SIZER: {
      return {
        currentModal: RING_SIZER,
      }
    }
    case OPEN_CUSTOMIZATION:
      return {
        currentModal: CUSTOMIZATION,
        currentProduct: action.currentProduct,
        currentVariant: action.currentVariant,
      }
    case CLOSE:
      return {
        currentModal: null,
        currentProduct: undefined,
        currentVariant: undefined,
      }
    default:
      // @ts-ignore
      throw new Error(`"${action.type} is not a valid action"`)
  }
}
const initialState = {
  currentModal: null,
}

export interface CustomizationModalArgs {
  currentProduct?: ShopifyProduct
  currentVariant?: ShopifyProductVariant
}

export const useModalReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const closeModal = () => dispatch({ type: CLOSE })
  const openRingSizerModal = () => dispatch({ type: OPEN_RING_SIZER })
  const openCustomizationModal = ({
    currentProduct,
    currentVariant,
  }: CustomizationModalArgs) =>
    dispatch({ type: OPEN_CUSTOMIZATION, currentProduct, currentVariant })

  return {
    state,
    closeModal,
    openRingSizerModal,
    openCustomizationModal,
  }
}

import { useReducer } from 'react'
import { ShopifyProduct, ShopifyProductVariant } from '../../types'

const CLOSE = 'CLOSE'
const OPEN_CUSTOMIZATION = 'OPEN_CUSTOMIZATION'
const OPEN_RING_SIZER = 'OPEN_RING_SIZER'
const OPEN_CONTACT = 'OPEN_CONTACT'

export const RING_SIZER = 'RING_SIZER'
export const CUSTOMIZATION = 'CUSTOMIZATION'
export const CONTACT = 'CONTACT'

interface State {
  currentModal: typeof RING_SIZER | typeof CUSTOMIZATION | typeof CONTACT | null
  currentProduct?: ShopifyProduct
  currentVariant?: ShopifyProductVariant
  formtype?: string
}

interface CloseAction {
  type: typeof CLOSE
}

interface OpenRingSizerAction {
  type: typeof OPEN_RING_SIZER
}

interface OpenContactAction {
  type: typeof OPEN_CONTACT
  formtype: string
}

interface OpenCustomizationAction {
  type: typeof OPEN_CUSTOMIZATION
  currentProduct?: ShopifyProduct
  currentVariant?: ShopifyProductVariant
}

type Action =
  | CloseAction
  | OpenCustomizationAction
  | OpenRingSizerAction
  | OpenContactAction

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
    case OPEN_CONTACT:
      return {
        currentModal: CONTACT,
        formtype: action.formtype,
      }
    case CLOSE:
      return {
        currentModal: null,
        currentProduct: undefined,
        currentVariant: undefined,
        formtype: undefined,
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

export interface ContactModalArgs {
  formtype: string
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
  const openContactModal = ({ formtype }: ContactModalArgs) =>
    dispatch({ type: OPEN_CONTACT, formtype })

  return {
    state,
    closeModal,
    openRingSizerModal,
    openCustomizationModal,
    openContactModal,
  }
}

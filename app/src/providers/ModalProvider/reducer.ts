import { useRouter } from 'next/router'
import { useEffect, useReducer } from 'react'
import { ShopifyProduct, ShopifyProductVariant } from '../../types'

const CLOSE = 'CLOSE'
const OPEN = 'OPEN'

export enum ModalName {
  RING_SIZER = 'RING_SIZER',
  CUSTOMIZATION = 'CUSTOMIZATION',
  CONTACT = 'CONTACT',
}

interface State {
  currentModal: ModalName | null
  currentProduct?: ShopifyProduct
  currentVariant?: ShopifyProductVariant
  formtype?: string
}

interface CloseAction {
  type: typeof CLOSE
}

interface OpenFormAction {
  type: typeof OPEN
  currentModal: ModalName
  formtype?: string
  currentProduct?: ShopifyProduct
  currentVariant?: ShopifyProductVariant
}

type Action = CloseAction | OpenFormAction

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case OPEN: {
      return {
        currentModal: action.currentModal,
        currentProduct: action.currentProduct,
        currentVariant: action.currentVariant,
        formtype: action.formtype,
      }
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

export interface OpenModalArgs {
  currentProduct?: ShopifyProduct
  currentVariant?: ShopifyProductVariant
  formtype?: string
}

export interface ContactModalArgs extends OpenModalArgs {
  formtype: string
}

export const useModalReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { asPath } = useRouter()

  const closeModal = () => dispatch({ type: CLOSE })

  const openRingSizerModal = ({
    currentProduct,
    currentVariant,
  }: OpenModalArgs) =>
    dispatch({
      type: OPEN,
      currentModal: ModalName.RING_SIZER,
      currentProduct,
      currentVariant,
    })

  const openCustomizationModal = ({
    currentProduct,
    currentVariant,
  }: OpenModalArgs) =>
    dispatch({
      type: OPEN,
      currentModal: ModalName.CUSTOMIZATION,
      currentProduct,
      currentVariant,
    })

  const openContactModal = ({
    formtype,
    currentProduct,
    currentVariant,
  }: ContactModalArgs) =>
    dispatch({
      type: OPEN,
      currentModal: ModalName.CONTACT,
      formtype,
      currentProduct,
      currentVariant,
    })

  // Close all modals on route change
  useEffect(() => {
    closeModal()
  }, [asPath])

  return {
    state,
    closeModal,
    openRingSizerModal,
    openCustomizationModal,
    openContactModal,
  }
}

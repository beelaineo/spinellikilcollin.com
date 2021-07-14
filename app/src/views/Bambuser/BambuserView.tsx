import React, { useEffect, ReactNode } from 'react'
import styled from '@xstyled/styled-components'
import { config } from '../../../src/config'
const { BAMBUSER_SHOWID } = config
import { useShopify } from '../../providers'
import { useBambuser } from './useBambuser'

export const INIT = 'initBambuserLiveShopping'
export const READY = 'onBambuserLiveShoppingReady'
export const MESSAGE_ID = 'bambuserUrl'

export type ShowType = {
  showId: string
  node?: HTMLElement
  type: string
}

const ID = 'bambuser-liveshopping'
const showId = BAMBUSER_SHOWID
const CTA_COPY = 'Join show now'
interface BambuserProps {
  autoPlay?: boolean
  copy?: string
  children?: ReactNode
}

const ButtonWrapper = styled.button`
  color: inherit;
  pointer-events: auto;

  &.hidden {
    display: none;
  }
`

const BambuserView = ({ autoPlay, copy, children }: BambuserProps) => {
  const {
    bambuserLineItemsAdd,
    bambuserLineItemsUpdate,
    bambuserFetchCheckout,
    checkoutLineItemsUpdate,
    checkout,
  } = useShopify()
  const [isReady, addShow] = useBambuser({
    bambuserLineItemsAdd,
    bambuserLineItemsUpdate,
    bambuserFetchCheckout,
    checkoutLineItemsUpdate,
    checkout,
  })
  let ctaCopy = copy ? copy : CTA_COPY

  useEffect(() => {
    if (isReady) {
      let show: ShowType
      const node = document.getElementById(ID)
      if (node && BAMBUSER_SHOWID) {
        show = {
          showId,
          type: 'overlay',
        }
        if (!autoPlay) {
          show.node = node
        }
        addShow(show)
      }
    }
  }, [isReady])

  return (
    <>
      <ButtonWrapper id={ID} className={autoPlay ? 'hidden' : ''}>
        {children ? <>{children}</> : ctaCopy}
      </ButtonWrapper>
    </>
  )
}
export default BambuserView

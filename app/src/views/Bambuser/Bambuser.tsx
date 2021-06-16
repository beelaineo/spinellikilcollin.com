import React, { useEffect } from 'react'
import { PageWrapper } from '../../components/Layout'
import useBambuser from './useBambuser'
import { config } from '../../../src/config'
const { BAMBUSER_SHOWID } = config
import { useShopify } from '../../providers'

interface BambuserViewProps {}

export const INIT = 'initBambuserLiveShopping'
export const READY = 'onBambuserLiveShoppingReady'
export const MESSAGE_ID = 'bambuserUrl'

export type ShowType = {
  showId: string
  node?: HTMLElement
  type: string
}

const ID = 'liveshopping'
const showId = BAMBUSER_SHOWID
const Bambuser = () => {
  const [isReady, addShow] = useBambuser()

  useEffect(() => {
    if (isReady) {
      const node = document.getElementById(ID)
      // if (node && BAMBUSER_SHOWID) {
      //   addShow({
      //     showId,
      //     node,
      //     type: 'overlay',
      //   })
      // }
      // auto play
      console.log('>>>>> init show', BAMBUSER_SHOWID)
      if (BAMBUSER_SHOWID) {
        addShow({
          showId,
          type: 'overlay',
        })
      }
    }
  }, [isReady])

  return (
    <div className="ui-container">
      <button id={ID}>Join show now</button>
    </div>
  )
}

export const BambuserView = ({}: BambuserViewProps) => {
  return (
    <>
      <PageWrapper>
        <Bambuser />
      </PageWrapper>
    </>
  )
}

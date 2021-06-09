import React, { useEffect } from 'react'
import { PageWrapper } from '../../components/Layout'
import useBambuser from './useBambuser'
import { config } from '../../../src/config'
const { BAMBUSER_SHOWID } = config

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
  if (isReady) {
    const node = document.getElementById(ID)
    if (node && BAMBUSER_SHOWID) {
      addShow({
        showId,
        node,
        type: 'overlay',
      })
    }
    // auto play
    // if ( BAMBUSER_SHOWID ) {
    //   addShow({
    //     showId,
    //     type: "overlay"
    //   })
    // }
  }
  // Original script
  // useEffect(() => {
  //   if (!window[TYPE]) {
  //     window[TYPE] = (item: T):void => {
  //       window[TYPE].queue.push(item)
  //     }
  //     window[TYPE].queue = []
  //   }

  //   const script = document.createElement('script')
  //   script.src = 'https://lcx-embed.bambuser.com/default/embed.js'
  //   document.body.appendChild(script)
  //   script.onload = () => {
  //     const node = document.getElementById(ID);
  //     window[TYPE]({
  //       showId,
  //       node,
  //       type: "overlay"
  //     })
  //   };
  // }, [])

  return (
    <div>
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

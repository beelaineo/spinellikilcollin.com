import React, { useState, useEffect } from 'react'
import { config } from '../../../src/config'
const { BAMBUSER_SCRIPT } = config
import { ShowType, INIT, READY, MESSAGE_ID } from './Bambuser'
export type BambuserTuple = [boolean, (show: ShowType) => void]

type mesgProps = (url: string) => void

const useBambuser = (initialValue?: boolean): BambuserTuple => {
  const [isReady, setReady] = useState<boolean>((initialValue = false))

  const insideIframe = (): boolean => {
    return window !== window.parent
  }

  let addShow = (show: ShowType): void => {
    if (window[INIT]) {
      window[INIT](show)
    }
  }
  let linkProduct = (url: string): void => {
    if (url && url.indexOf('/products') > -1) {
      history.pushState({}, '', url)
    }
  }
  let onMessage = (callback: mesgProps) => {
    window.addEventListener(
      'message',
      (event) => {
        if (event.origin.indexOf(window.location.hostname) === -1) {
          return
        }
        if (
          event.data &&
          event.data[MESSAGE_ID] &&
          event.data[MESSAGE_ID].indexOf('https://') > -1
        ) {
          callback(event.data[MESSAGE_ID])
        }
      },
      false,
    )
  }
  useEffect(() => {
    // Only execute when not in iframe
    if (!window[INIT] && !insideIframe()) {
      window[READY] = (player) => {
        onMessage((url) => {
          window.location.href = url
        })

        player.configure({
          buttons: {
            dismiss: player.BUTTON.MINIMIZE,
          },
          floatingPlayer: {
            navigationMode: player.FLOATING_PLAYER_NAVIGATION_MODE.IFRAME,
          },
        })
        // player.on(player.EVENT.NAVIGATE_BEHIND_TO, function (event) {
        //   if ( event.url ) {
        //     linkProduct(event.url)
        //   }
        //   /*
        //    * Triggered when a product is clicked.
        //    *
        //    * **event.url** holds the targetted url specific in Bambuser Dashboard
        //    *
        //    * 1. Change url inside browser address bar
        //    * eg. history.pushState({}, null, event.url)
        //    *
        //    * 2. Load page content without reloading the page
        //    * eg. Use React Router, AJAX , ...
        //    *
        //    */
        //   // Your codes here
        // })
      }

      window[INIT] = (show: ShowType): void => {
        window[INIT].queue.push(show)
      }
      window[INIT].queue = []

      if (!isReady) {
        const script = document.createElement('script')
        script.onload = () => {
          setReady(true)
        }
        script.src = BAMBUSER_SCRIPT
        document.body.appendChild(script)
      }
    }
  }, [isReady])

  return [isReady, addShow]
}

export default useBambuser

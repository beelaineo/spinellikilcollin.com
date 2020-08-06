import { css } from '@xstyled/styled-components'

export const hubspotStyles = css`
  body {
    div#hs-eu-cookie-confirmation {
      position: fixed;
      top: 90px;
      bottom: initial;
      right: 15px;
      left: initial;
      font-family: serif;
      width: 200px;
      border: 0;
      box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.2);
      div#hs-eu-cookie-confirmation-inner a#hs-eu-confirmation-button,
      div#hs-eu-cookie-confirmation-inner a#hs-eu-decline-button {
        border-radius: 0;
        text-transform: uppercase;
        font-family: serif;
      }
    }
    div#hs-eu-cookie-confirmation div#hs-eu-cookie-confirmation-inner {
      padding: 4;
    }
    div#hs-eu-cookie-confirmation
      div#hs-eu-cookie-confirmation-inner
      div#hs-en-cookie-confirmation-buttons-area {
      text-align: center !important;
    }
    div#hs-eu-cookie-confirmation
      div#hs-eu-cookie-confirmation-inner
      a#hs-eu-confirmation-button {
      margin-right: 0 !important;
    }
    @media only screen and (min-width: 960px) {
      div#hs-eu-cookie-confirmation.hs-cookie-notification-position-bottom {
        border-bottom: 0;
        bottom: initial;
        box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.2);
        top: 90px;
      }
    }
  }
`

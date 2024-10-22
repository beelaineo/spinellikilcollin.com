import * as braze from '@braze/web-sdk'

export function initialize(apiKey, options) {
  braze.initialize(apiKey, options)
}

export function openSession() {
  braze.openSession()
}

export function automaticallyShowInAppMessages() {
  braze.automaticallyShowInAppMessages()
}

export function getUser() {
  return braze.getUser()
}

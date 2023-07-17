import { NextApiHandler } from 'next'

import { webhooks } from '../../src/services/webhooks'
import { Sentry } from '../../src/services/sentry'

const handler: NextApiHandler = async (req, res) => {
  try {
    console.log(`onCollectionUpdate: ${req.body.id}`)
    const timeout = setTimeout(() => {
      throw new Error('Timeout: onCollectionUpdate')
    }, 55000)
    await webhooks.onProductUpdate(req, res)
    clearTimeout(timeout)
  } catch (e) {
    const error =
      e instanceof Error ? e : new Error('An unknown syncing error occurred')
    Sentry.captureException(error, 'sync_webhook_error', {
      body: req.body,
    })
    res.status(500).json({ message: error.message })
  }
}

export default handler

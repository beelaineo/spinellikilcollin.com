import { NextApiHandler } from 'next'
import { mailchimp } from '../../src/services/mailchimp'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(404).send('Not Found')
    return
  }
  const body = JSON.parse(req.body)
  await mailchimp.subscribe(body)

  res.status(200).send({ success: true })
}

export default handler

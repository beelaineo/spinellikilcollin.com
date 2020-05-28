import { NextApiHandler } from 'next'
import { postmark } from '../../src/services/postmark'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(404).send('Not Found')
    return
  }
  const body = JSON.parse(req.body)
  await postmark.sendRequestRingSizer(body)
  res.status(200).send({ success: true })
}

export default handler

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}

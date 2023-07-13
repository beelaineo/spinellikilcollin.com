import Koa from 'koa'
import Router from '@koa/router'
import bodyParser from '@koa/bodyparser'
import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { KoaAdapter } from '@bull-board/koa'
import { syncQueue, createSyncJob } from './Queue'

const app = new Koa()
const router = new Router()

router.get('/health', (ctx) => {
  ctx.body = {
    status: 'ok',
    data: 'Server is running',
  }
})

router.post('/webhook-sync', async (ctx) => {
  const topic = ctx.headers['x-shopify-topic'] as string
  const webhookId = ctx.headers['x-shopify-webhook-id'] as string
  await createSyncJob({
    topic,
    item: {
      title: ctx.request.body.title,
      id: ctx.request.body.id.toString(),
      updated_at: ctx.request.body.updated_at,
    },
    webhookId,
  })
  ctx.body = {
    status: 'ok',
  }
})

/**
 * UI Server
 */

const serverAdapter = new KoaAdapter()
serverAdapter.setBasePath('/admin')

createBullBoard({
  queues: [new BullAdapter(syncQueue)],
  serverAdapter,
})

/**
 * App initialization
 */
app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serverAdapter.registerPlugin())

app.listen(3000, () => console.log('Server running on port 3000'))

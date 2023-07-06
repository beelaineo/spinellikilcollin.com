/**
 * Registers our sane-shopify webhooks in our custom app:
 * https://spinellikilcollin.myshopify.com/admin/settings/apps/development/45039550465/overview
 *
 * To use, run one of the following commands:
 *
 * yarn webhooks:list
 *   lists all webhooks associated with the app
 *
 * yarn webhooks:clear
 *   clears all webhooks associated with the app
 *
 * yarn webhooks:register
 *   registers any missing webhooks
 */
const dotenv = require('dotenv')
const fetch = require('node-fetch')

dotenv.config()

const accessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN
const shopName = process.env.SHOPIFY_SHOP_NAME

if (!accessToken) {
  throw new Error(
    'You must provide a SHOPIFY_ADMIN_API_ACCESS_TOKEN value in your .env file',
  )
}

const ENDPOINT_ROOT = 'https://spinellikilcollin.vercel.app/api'
const ADMIN_API_ROOT = `https://${shopName}.myshopify.com/admin/api/2023-07`

type Topic =
  | 'products/update'
  | 'products/create'
  | 'products/delete'
  | 'collections/update'
  | 'collections/create'
  | 'collections/delete'
  | 'orders/create'

type ApiEndpoint =
  | '/onCollectionDelete'
  | '/onCollectionUpdate'
  | '/onProductDelete'
  | '/onProductUpdate'
  | '/onOrderCreate'

const request = (
  path: string,
  method: 'GET' | 'POST' | 'DELETE' = 'GET',
  body?: Record<string, any>,
) => {
  const url = ADMIN_API_ROOT.concat(path).concat('.json')
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
    method,
    body: body ? JSON.stringify(body) : undefined,
  }).then((r) => r.json())
}

const Webhooks = {
  get: () => request('/webhooks').then((response) => response.webhooks),
  register: (topic: Topic, address: string) =>
    request('/webhooks', 'POST', {
      webhook: {
        topic,
        address,
        format: 'json',
      },
    }),
  delete: (id: string) => request(`/webhooks/${id}`, 'DELETE'),
}

const topicsMap: Array<[Topic, ApiEndpoint]> = [
  ['products/update', '/onProductUpdate'],
  ['products/create', '/onProductUpdate'],
  ['products/delete', '/onProductDelete'],
  ['collections/update', '/onCollectionUpdate'],
  ['collections/create', '/onCollectionUpdate'],
  ['collections/delete', '/onCollectionDelete'],
  ['orders/create', '/onOrderCreate'],
]

const registerWebhooks = async () => {
  const currentWebhooks = await Webhooks.get()
  Promise.all(
    topicsMap.map(async ([topic, endpoint]) => {
      const address = ENDPOINT_ROOT.concat(endpoint)

      /* Check to see if we already have this webhook configured. */
      const existingWebhook = currentWebhooks.find(
        (wh) => wh.address === address && wh.topic === topic,
      )
      /* If so, skip. */
      if (existingWebhook) {
        console.log(`already exists: ${topic} -> ${address}`)
        return
      }
      const result = await Webhooks.register(topic, address)
      if (result.errors) {
        console.log(`error: ${topic} -> ${address}`)
        console.error(JSON.stringify(result.errors))
        return
      }
      console.log(`registered: ${topic} -> ${address}`)
    }),
  )
}

const clearWebhooks = async () => {
  const webhooks = await Webhooks.get()
  Promise.all(
    webhooks.map(async (webhook) => {
      const { id, topic, address } = webhook
      const result = await Webhooks.delete(id)
      if (result.errors) {
        console.error(`Could not remove webhook ${id}`)
        console.error(result.errors)
        return
      }
      console.log(`removed: [${id}] ${topic} -> ${address}`)
    }),
  )
}

const listWebhooks = async () => {
  const webhooks = await Webhooks.get()
  console.log(`${webhooks.length} webhooks:`)
  console.log(
    webhooks.map(({ id, topic, address }) => `[${id}] ${topic} -> ${address}`),
  )
}

const main = async () => {
  const command = process.argv[2]
  if (!command) {
    throw new Error(
      'You must provide a command. One of: list | clear | register',
    )
  }
  switch (command) {
    case 'list':
      return listWebhooks()
    case 'clear':
      return clearWebhooks()
    case 'register':
      return registerWebhooks()
    default:
      throw new Error(`"${command}" is not a valid command`)
  }
}

main()

export {}

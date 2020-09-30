/* @ts-nocheck */
import { NextApiHandler } from 'next'
import algoliaSearch from 'algoliasearch'
import dotenv from 'dotenv'
import Debug from 'debug'
import ndjson from 'ndjson'
import request from 'request'
import { of, bindCallback } from 'rxjs'
import { streamToRx } from 'rxjs-stream'
import {
  bufferCount,
  map,
  filter,
  catchError,
  mergeMap,
  toArray,
  tap,
} from 'rxjs/operators'
import { GroqShopifyProduct, GroqShopifyCollection } from '../../src/types'
import { Sentry } from '../../src/services/sentry'
import { definitely } from '../../src/utils'

const debug = Debug('api:algolia')

debug('ding a link')
dotenv.config()

const API_KEY = process.env.ALGOLIA_API_KEY
const APP_ID = process.env.ALGOLIA_APP_ID
const INDEX_NAME = 'Storefront Search'
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID
const SANITY_DATASET = process.env.SANITY_DATASET

if (!API_KEY) throw new Error('You must provide an algolia API Key')
if (!APP_ID) throw new Error('You must provide an algolia app ID')

const sanityExportURL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/export/${SANITY_DATASET}`

const defaults = { nonTextBehavior: 'remove' }

function blocksToText(blocks, opts = {}) {
  const options = Object.assign({}, defaults, opts)
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove'
          ? ''
          : `[${block._type} block]`
      }

      return block.children.map((child) => child.text).join('')
    })
    .join('\n\n')
}

const unique = <T>(array: T[]): T[] => {
  const set = new Set(array)
  return [...set]
}

type SanityShopifyDocument = GroqShopifyProduct | GroqShopifyCollection

const parseDocument = (client) => (doc: SanityShopifyDocument) => {
  switch (doc._type) {
    // case 'page':
    //   return {
    //     objectID: doc._id,
    //     type: doc._type,
    //     body: blocksToText(doc.body || []),
    //     title: doc.title,
    //     slug: doc.slug.current,
    //   }

    case 'shopifyProduct':
      return {
        objectID: doc._id,
        type: doc._type,
        body: doc?.sourceData?.description,
        _tags: doc?.sourceData?.tags,
        options: unique(
          definitely(doc?.sourceData?.options)
            ?.filter((option) => option?.name?.toLowerCase() !== 'size')
            .map((option) => option.values)
            .flat(),
        ),
        title: doc.title,
        handle: doc.handle,
      }

    case 'shopifyCollection':
      return {
        objectID: doc._id,
        type: doc._type,
        body: doc?.sourceData?.description,
        title: doc.title,
        handle: doc.handle,
      }

    default:
      return null
  }
}

const handler: NextApiHandler = (req, res) =>
  new Promise((resolve, reject) => {
    try {
      const client = algoliaSearch(APP_ID, API_KEY)

      const index = client.initIndex(INDEX_NAME)
      const partialUpdateObjects = bindCallback((objects, done) => {
        try {
          index.saveObjects(objects).then(() => {
            done(objects)
          })
        } catch (err) {
          console.log('??ERR', err)
        }
      })

      const cb = (error: Error) => {
        Sentry.captureException(error)
      }
      const parseSanityDocument = parseDocument(client)

      streamToRx(request(sanityExportURL).pipe(ndjson.parse()))
        .pipe(
          /*
           * Pick and prepare fields you want to index,
           * here we reduce structured text to plain text
           */
          // @ts-ignore
          filter((doc: SanityShopifyDocument) => {
            if (
              doc._type === 'shopifyProduct' ||
              doc._type === 'shopifyCollection'
            ) {
              if (!doc?.shopifyId || doc?.archived || doc?.hidden) return false
              return true
            }
            return false
          }),
          map(parseSanityDocument),

          catchError((error) => of(`Error: ${error}`)),
          filter((doc) => doc !== null),
          // buffer batches in chunks of 100
          bufferCount(10),
          catchError((error) => of(`Error: ${error}`)),
          // 👇uncomment to console.log objects for debugging
          // tap(console.log),
          // submit actions, one batch at a time
          // mergeMap((docs) => docs, 1),
          mergeMap((docs) => partialUpdateObjects(docs), 1),
          // collect all batches and emit when the stream is complete
          catchError((error) => of(`Error: ${error}`)),
          toArray(),
        )
        .subscribe(
          (batchResults) => {
            console.log()
            const totalLength = batchResults.flat().length

            // .reduce(
            //   // @ts-ignore
            //   (count, batchResult) => {
            //     console.log(batchResult)
            //
            //     count + batchResult.objectIDs.length
            //   },
            //   0,
            // )

            debug(
              `Updated ${totalLength} documents in ${batchResults.length} batches`,
            )
            res.status(200).send({ success: true })
            resolve()
          },

          cb,
        )
    } catch (err) {
      console.log(err)
    }
  })

export default handler

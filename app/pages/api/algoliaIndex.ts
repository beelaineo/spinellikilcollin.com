/* @ts-nocheck */
import { NextApiHandler } from 'next'
import { paginate, unwindEdges } from '@good-idea/unwind-edges'
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
import { algoliaIndex } from '../../src/services/algolia'
import {
  GroqProduct,
  GroqCollection,
  ShopifyProductVariant,
  ShopifyImage,
} from '../../src/types'
import { Sentry } from '../../src/services/sentry'
import { definitely, getVariantBySelectedOption } from '../../src/utils'
import { config } from '../../src/config'

const debug = Debug('api:algolia')

const { SANITY_PROJECT_ID, SANITY_DATASET } = config

const sanityExportURL = `https://${SANITY_PROJECT_ID}.api.sanity.io/v1/data/export/${SANITY_DATASET}`

const defaults = { nonTextBehavior: 'remove' }

function blocksToText(blocks, opts = {}) {
  const options = Object.assign({}, defaults, opts)
  if (!blocks) return undefined
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
  if (!array) return []
  const set = new Set(array)
  return [...set]
}

const pick = <T>(obj: T | undefined, keys: string[]): Partial<T> =>
  obj
    ? keys.reduce<Partial<T>>((acc, key) => ({ ...acc, [key]: obj[key] }), {})
    : {}

type SanityShopifyDocument = GroqProduct | GroqCollection

const parseDocument = (doc: SanityShopifyDocument) => {
  try {
    switch (doc._type) {
      case 'product':
        const allVariants = (doc?.store?.variants || []).filter(
          (variant): variant is ShopifyProductVariant =>
            variant !== null && variant !== undefined,
        )
        const images = (doc?.store?.images || [])
          .filter(
            (image): image is ShopifyImage =>
              image !== null && image !== undefined,
          )
          .map((image) => ({ ...image, __typename: 'ShopifyImage' }))
        const thumbnailVariants = definitely(doc?.store?.options)
          .filter((option) => option.name && /Color/.test(option.name))
          .reduce<ShopifyProductVariant[]>((variants, option) => {
            // if (!option || !option.name) return variants
            const variantsByOption = definitely(option?.values).reduce<
              ShopifyProductVariant[]
            >((acc, optionValue) => {
              if (option.name && optionValue) {
                const v = getVariantBySelectedOption(allVariants, {
                  name: option.name,
                  currentValue: optionValue,
                })
                if (!v) return acc
                const picked = {
                  ...pick(v, [
                    'id',
                    'title',
                    'selectedOptions',
                    'priceV2',
                    'compareAtPriceV2',
                  ]),
                  image: pick(v.sourceData?.image, ['id', '__typename', 'url']),
                } as ShopifyProductVariant
                return [...acc, picked]
              }
              return acc
            }, [])
            return definitely([...variants, ...variantsByOption])
          }, [])

        return {
          objectID: doc._id,
          type: doc._type,
          hidden: Boolean(doc.hidden),
          hideFromSearch: Boolean(doc.hideFromSearch),
          description: doc?.store?.description,
          optionDescriptions: doc?.options?.reduce<string[]>(
            (descriptions, option) => {
              const valueDescriptions = definitely(option?.values)
                .map((v) =>
                  // @ts-ignore
                  blocksToText(v.description),
                )
                .filter((d) => d && d.length > 0)
              return [...descriptions, ...valueDescriptions]
            },

            [],
          ),
          _tags: doc?.store?.tags,
          options: definitely(doc?.store?.options),
          optionNames: unique(
            definitely(doc?.store?.options)
              ?.filter((option) => option?.name?.toLowerCase() !== 'size')
              .map((option) => option.values)
              .flat()
              .filter((option) => option && option !== 'Default Title'),
          ),
          title: doc.title,
          handle: doc.handle,
          document: {
            ...pick(doc, [
              '__typename',
              '_id',
              'inquiryOnly',
              '_type',
              'title',
              'handle',
              'hidden',
              'hideFromSearch',
              'shopifyId',
            ]),
            __typename: 'Product',
            options: definitely(doc?.options).map((option) => ({
              ...pick(option, ['_key', '_type', 'name']),
              __typename: 'ProductOption',
              values: definitely(option?.values).map((value) => ({
                __typename: 'ProductOptionValue',
                ...pick(value, ['_key', 'value', 'swatch']),
              })),
            })),
            store: {
              ...pick(doc?.store, [
                '__typename',
                '_key',
                '_type',
                'title',
                'options',
                'availableForSale',
                'priceRange',
                'productType',
                'tags',
                'handle',
                'id',
              ]),
              __typename: 'ShopifyProductDef',
              images: [pick(images[0], ['id', '__typename', 'src'])],
              variants: thumbnailVariants,
            },
          },
        }

      default:
        return null
    }
  } catch (e) {
    Sentry.captureException(e, 'algolia_parse_error', { document: doc })
  }
}

const handler: NextApiHandler = (req, res) =>
  new Promise<void>((resolve, reject) => {
    try {
      const partialUpdateObjects = bindCallback((objects, done) => {
        algoliaIndex
          // @ts-ignore
          .saveObjects(objects)
          .then(async () => {
            // @ts-ignore
            done(objects)
          })
          .catch((err) => {
            // console.log(
            //   JSON.parse(err?.transporterStackTrace[0].request.data).requests[9]
            //     .body.document.sourceData.variants,
            // )
            Sentry.captureException(err, 'algolia_index_error')
          })
      })

      algoliaIndex.setSettings({
        searchableAttributes: [
          'title',
          'optionNames',
          'hidden',
          '_tags',
          'description,optionDescriptions',
        ],
      })

      const errorCb = (error: Error) => {
        Sentry.captureException(error, 'algolia_index_error')
      }

      streamToRx(request(sanityExportURL).pipe(ndjson.parse()))
        .pipe(
          /*
           * Pick and prepare fields you want to index,
           * here we reduce structured text to plain text
           */
          // @ts-ignore
          filter((doc: SanityShopifyDocument) => {
            // @ts-ignore
            if (doc.error) throw new Error(doc.error)
            if (doc._type === 'product') {
              if (!doc?.shopifyId) return false
              return true
            }
            return false
          }),
          map(parseDocument),

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
          async (batchResults) => {
            const results = batchResults.flat()
            const totalLength = results.length

            debug(
              `Updated ${totalLength} documents in ${batchResults.length} batches`,
            )

            const searchAll = async (
              page: number = 0,
              prevResults: any[] = [],
            ) => {
              const requestOptions = {
                hitsPerPage: 50,
                page,
              }
              const results = await algoliaIndex.search('', requestOptions)
              const mergedResults = [...prevResults, ...results.hits]
              if (results.nbHits > mergedResults.length) {
                return searchAll(page + 1, mergedResults)
              }
              return mergedResults
            }

            // @ts-ignore
            const documentIds = results.map((r) => r?.document?._id)
            const allResults = await searchAll()
            const toRemove = allResults
              .filter(
                (hit) =>
                  !Boolean(hit?.document?._id) ||
                  !Boolean(documentIds.includes(hit?.document?._id)),
              )
              .map((i) => i.objectID)

            if (toRemove.length) {
              const removed = await algoliaIndex.deleteObjects(toRemove)
              debug(`Removed ${removed.objectIDs.length} documents`)
            }
            res.status(200).send({ success: true })
            resolve()
          },

          errorCb,
        )
    } catch (err) {
      Sentry.captureException(err, 'algolia_index_error')
    }
  })

export default handler

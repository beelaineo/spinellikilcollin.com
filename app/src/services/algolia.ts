import algoliaSearch from 'algoliasearch'
import { config } from '../config'

const INDEX_NAME = 'Storefront Search'

const { ALGOLIA_API_KEY, ALGOLIA_APP_ID } = config

export const algoliaClient = algoliaSearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY)

export const algoliaIndex = algoliaClient.initIndex(INDEX_NAME)

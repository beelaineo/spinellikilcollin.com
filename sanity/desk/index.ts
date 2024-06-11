/**
 * Desk structure overrides
 */
import {ListItemBuilder, StructureResolver} from 'sanity/structure'
import collections from './collectionStructure'
// import colorThemes from './colorThemeStructure'
import home from './homeStructure'
import pages from './pageStructure'
import products from './productStructure'
import settings from './settingStructure'
import nav from './navStructure'
import productsOld from './productOldStructure'
import collectionsOld from './collectionOldStructure'
import journal from './journalStructure'
import specialPagesStructure from './specialPagesStructure'

import {MdInfoOutline} from 'react-icons/md'

/**
 * Desk structure overrides
 *
 * Sanity Studio automatically lists document types out of the box.
 * With this custom desk structure we achieve things like showing the `home`
 * and `settings` document types as singletons, and grouping product details
 * and variants for easy editorial access.
 *
 * You can customize this even further as your schemas progress.
 * To learn more about structure builder, visit our docs:
 * https://www.sanity.io/docs/overview-structure-builder
 */

// If you add document types to desk structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return ![
    'collection',
    // 'colorTheme',
    'homepage',
    'menu',
    'media.tag',
    'page',
    'product',
    'productVariant',
    'settings',
    'siteSettings',
    'productInfoSettings',
    'productListingSettings',
    'emailSignatureSettings',
    'shopifyProduct',
    'shopifyCollection',
    'journal',
    'journalPage',
    'journalEntry',
    'about',
    'birthdays',
    'magazine',
    'contact',
    'faq',
    'appointments',
    'customize',
    'loyalty',
    'newCustomer',
    'paymentPlans',
    'stone',
    'teamPage',
    'directory',
  ].includes(id)
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      settings(S, context),
      S.divider(),
      home(S, context),
      nav(S, context),
      S.divider(),
      collections(S, context),
      products(S, context),
      S.divider(),
      journal(S, context),
      S.listItem()
        .title('About (Main Page)')
        .icon(MdInfoOutline)
        .child(S.editor().id('about').schemaType('about').documentId('about')),
      pages(S, context),
      specialPagesStructure(S, context),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
      S.divider(),
      collectionsOld(S, context),
      productsOld(S, context),
    ])

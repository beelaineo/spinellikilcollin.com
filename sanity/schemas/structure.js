import S from '@sanity/desk-tool/structure-builder'
import { MdSettings, MdHome, MdInfoOutline } from 'react-icons/md'
import { FaPencilAlt } from 'react-icons/fa'
import { TiDevicePhone, TiThSmallOutline, TiDocument } from 'react-icons/ti'
import { FiCompass } from 'react-icons/fi'

export default () =>
  S.list()
    .title('Site')
    .items([
      S.listItem()
        .title('Site Settings')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('config')
            .schemaType('siteSettings')
            .documentId('site-settings'),
        ),
      S.listItem()
        .title('Homepage')
        .icon(MdHome)
        .child(
          S.editor()
            .id('homepage')
            .schemaType('homepage')
            .documentId('homepage'),
        ),
      S.listItem()
        .title('Nav Menu')
        .icon(FiCompass)
        .child(
          S.editor()
            .id('menu')
            .schemaType('menu')
            .documentId('menu-settings'),
        ),

      // Products
      S.listItem()
        .id('products')
        .title('Products')
        .icon(TiDevicePhone)
        .child(
          S.documentList()
            .title('Products')
            .filter('_type == "shopifyProduct" && archived != true'),
        ),

      S.listItem()
        .title('Product Info')
        .icon(MdInfoOutline)
        .child(
          S.editor()
            .id('productInfoSettings')
            .schemaType('productInfoSettings')
            .documentId('productInfoSettings'),
        ),

      // Collections
      S.listItem()
        .id('collections')
        .title('Collections')
        .icon(TiThSmallOutline)
        .child(
          S.documentList()
            .title('Collections')
            .filter('_type == "shopifyCollection" && archived != true'),
        ),

      // Journal

      S.listItem()
        .title('Journal (Main Page)')
        .icon(FaPencilAlt)
        .child(
          S.editor()
            .id('journalPage')
            .schemaType('journalPage')
            .documentId('journalPage'),
        ),

      S.listItem()
        .id('journal')
        .title('Journal')
        .icon(FaPencilAlt)
        .child(S.documentTypeList('journalEntry')),

      S.listItem()
        .id('pages')
        .title('Pages')
        .icon(TiDocument)
        .child(S.documentTypeList('page')),

      S.listItem()
        .title('.925')
        .child(
          S.editor()
            .id('magazine')
            .schemaType('magazine')
            .documentId('magazine'),
        ),

      S.listItem()
        .title('Contact')
        .child(
          S.editor()
            .id('contact')
            .schemaType('contact')
            .documentId('contact'),
        ),

      S.listItem()
        .title('Customize')
        .child(
          S.editor()
            .id('customize')
            .schemaType('customize')
            .documentId('customize'),
        ),

      S.listItem()
        .title('Team')
        .child(
          S.editor()
            .id('teamPage')
            .schemaType('teamPage')
            .documentId('teamPage'),
        ),
    ])

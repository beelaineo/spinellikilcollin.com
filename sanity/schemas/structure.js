import S from '@sanity/desk-tool/structure-builder'
import { MdSettings, MdHome, MdInfoOutline } from 'react-icons/md'
import { TiDevicePhone, TiThSmallOutline, TiDocument } from 'react-icons/ti'
import { FiCompass } from 'react-icons/fi'

export default () =>
  S.list()
    .title('Site')
    .items([
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
        .child(S.documentTypeList('shopifyProduct')),

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
        .child(S.documentTypeList('shopifyCollection')),

      // Static pages: About, Contact
      S.listItem()
        .id('pages')
        .title('Pages')
        .icon(TiDocument)
        .child(S.documentTypeList('page')),

      S.listItem()
        .title('Site Settings')
        .icon(MdSettings)
        .child(
          S.editor()
            .id('config')
            .schemaType('siteSettings')
            .documentId('site-settings'),
        ),
    ])

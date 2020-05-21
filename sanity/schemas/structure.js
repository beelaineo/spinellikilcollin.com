import S from '@sanity/desk-tool/structure-builder'
import { GiDiamondRing } from 'react-icons/gi'
import { MdSettings, MdHome, MdInfoOutline, MdLocalPhone } from 'react-icons/md'
import { AiOutlineTeam } from 'react-icons/ai'
import { BsTools, BsBookHalf } from 'react-icons/bs'
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
        .icon(GiDiamondRing)
        .child(
          S.documentList()
            .title('Products')
            .filter('_type == "shopifyProduct" && archived != true')
            .defaultOrdering([{ field: 'title', direction: 'asc' }]),
        ),

      S.listItem()
        .title('Product Info')
        .icon(GiDiamondRing)
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
            .filter('_type == "shopifyCollection" && archived != true')
            .defaultOrdering([{ field: 'title', direction: 'asc' }]),
        ),

      S.listItem()
        .title('Collection Settings')
        .icon(TiThSmallOutline)
        .child(
          S.editor()
            .id('productListingSettings')
            .schemaType('productListingSettings')
            .documentId('productListingSettings'),
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
        .title('About (Main Page)')
        .icon(MdInfoOutline)
        .child(
          S.editor()
            .id('about')
            .schemaType('about')
            .documentId('about'),
        ),

      S.listItem()
        .id('pages')
        .title('About Pages')
        .icon(MdInfoOutline)
        .child(S.documentTypeList('page')),

      S.listItem()
        .title('.925')
        .icon(BsBookHalf)
        .child(
          S.editor()
            .id('magazine')
            .schemaType('magazine')
            .documentId('magazine'),
        ),

      S.listItem()
        .title('Contact')
        .icon(MdLocalPhone)
        .child(
          S.editor()
            .id('contact')
            .schemaType('contact')
            .documentId('contact'),
        ),

      S.listItem()
        .title('Customize')
        .icon(BsTools)
        .child(
          S.editor()
            .id('customize')
            .schemaType('customize')
            .documentId('customize'),
        ),

      S.listItem()
        .title('Team')
        .icon(AiOutlineTeam)
        .child(
          S.editor()
            .id('teamPage')
            .schemaType('teamPage')
            .documentId('teamPage'),
        ),
    ])

import S from '@sanity/desk-tool/structure-builder'
import { GiDiamondRing } from 'react-icons/gi'
import documentStore from 'part:@sanity/base/datastore/document'
import { map } from 'rxjs/operators'
import { MdSettings, MdHome, MdInfoOutline, MdLocalPhone } from 'react-icons/md'
import { AiOutlineTeam, AiOutlineSetting, AiOutlineBook } from 'react-icons/ai'
import { IoDocumentsOutline } from 'react-icons/io'
import { ImFilesEmpty } from 'react-icons/im'
import { BsTools, BsBookHalf } from 'react-icons/bs'
import { FaPencilAlt } from 'react-icons/fa'
import { TiDevicePhone, TiThSmallOutline, TiDocument } from 'react-icons/ti'
import { FiCompass } from 'react-icons/fi'

const productPages = async () => {
  return documentStore
    .listenQuery(
      `*[_type == "shopifyProduct" && archived != true && !(_id in path("drafts.**"))]
        | order(title)
        {
          _id,
          _type,
          title
        }
    `,
    )
    .pipe(
      map((products) =>
        S.list()
          .title('Products')
          .items([
            S.listItem()
              .title('Product Settings')
              .icon(AiOutlineSetting)
              .child(
                S.editor()
                  .id('productInfoSettings')
                  .schemaType('productInfoSettings')
                  .documentId('productInfoSettings'),
              ),
            S.divider(),
            ...products.map((product) =>
              S.documentListItem()
                .schemaType('shopifyProduct')
                .id(product._id)
                .title(product.title)
                .child(() => loadProduct(product)),
            ),
          ]),
      ),
    )
}

const loadProduct = async (product) =>
  S.editor().id(product._id).schemaType(product._type).documentId(product._id)

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
          S.editor().id('menu').schemaType('menu').documentId('menu-settings'),
        ),

      // Products
      S.listItem()
        .id('products')
        .title('Products')
        .icon(GiDiamondRing)
        .child(() => productPages()),
      S.listItem()
        .id('collections')
        .title('Collections')
        .icon(TiThSmallOutline)
        .child(
          documentStore
            .listenQuery(
              `*[_type == "shopifyCollection" && archived != true && !(_id in path("drafts.**"))]
            | order(title)
            {
              _id,
              _type,
              title
            }`,
            )
            .pipe(
              map((collections) =>
                S.list()
                  .title('Collections')
                  .items([
                    S.listItem()
                      .title('Collection Settings')
                      .icon(AiOutlineSetting)
                      .child(
                        S.editor()
                          .id('productListingSettings')
                          .schemaType('productListingSettings')
                          .documentId('productListingSettings'),
                      ),
                    S.divider(),
                    ...collections.map((collection) =>
                      S.documentListItem()
                        .schemaType('shopifyCollection')
                        .id(collection._id)
                        .child(
                          S.editor()
                            .id(collection._id)
                            .schemaType(collection._type)
                            .documentId(collection._id),
                        ),
                    ),
                  ]),
              ),
            ),
        ),
      // Journal
      S.listItem()
        .title('Journal')
        .id('journal')
        .icon(FaPencilAlt)
        .child(
          documentStore
            .listenQuery(
              `
              *[_type == "journalEntry" && !(_id in path("drafts.**"))]
              | order(coalesce(publishDate, _createdAt) desc)
              {
                _id,
                _type,
                title
              }`,
            )
            .pipe(
              map((journalEntries) =>
                S.list()
                  .title('Journal')
                  .items([
                    S.listItem()
                      .title('Journal (Main Page)')
                      .icon(AiOutlineBook),
                    S.divider(),
                    ...journalEntries.map((entry) =>
                      S.documentListItem()
                        .schemaType('journalEntry')
                        .id(entry._id)
                        .icon(FaPencilAlt)
                        .child(
                          S.editor()
                            .id(entry._id)
                            .schemaType(entry._type)
                            .documentId(entry._id),
                        ),
                    ),
                  ]),
              ),
            ),
        ),
      // S.listItem()
      //   .title('Journal (Main Page)')
      //   .icon(FaPencilAlt)
      //   .child(
      //     S.editor()
      //       .id('journalPage')
      //       .schemaType('journalPage')
      //       .documentId('journalPage'),
      //   ),
      //
      // S.listItem()
      //   .id('journal')
      //   .title('Journal')
      //   .icon(FaPencilAlt)
      //   .child(S.documentTypeList('journalEntry')),

      // Page Directories
      S.listItem()
        .title('Directory Pages')
        .icon(ImFilesEmpty)
        .child(S.documentTypeList('directory')),

      S.listItem()
        .title('About (Main Page)')
        .icon(MdInfoOutline)
        .child(S.editor().id('about').schemaType('about').documentId('about')),

      S.listItem().id('pages').title('About Pages').icon(MdInfoOutline).child(
        S.documentList().title('Pages').filter('_type == "page"'),

        // S.documentTypeList('page')
      ),

      S.listItem()
        .id('specialPages')
        .title('Special Pages')
        .icon(ImFilesEmpty)
        .child(
          S.list()
            .title('Special Pages')
            .items([
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
            ]),
          S.listItem()
            .title('Team')
            .icon(AiOutlineTeam)
            .child(
              S.editor()
                .id('teamPage')
                .schemaType('teamPage')
                .documentId('teamPage'),
            ),
        ),
    ])

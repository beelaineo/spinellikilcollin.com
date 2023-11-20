import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'
import {InfoOutlineIcon} from '@sanity/icons'
import {GiDiamondRing} from 'react-icons/gi'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Products')
    .schemaType('shopifyProduct')
    .icon(GiDiamondRing)
    .child(
      S.documentTypeList('shopifyProduct')
        // .defaultLayout('detail')
        .child(async (id) =>
          S.list()
            .title('Product')
            .canHandleIntent(
              (intentName, params) => intentName === 'edit' && params.type === 'shopifyProduct'
            )
            .items([
              // Details
              S.listItem()
                .title('Details')
                .icon(InfoOutlineIcon)
                .schemaType('shopifyProduct')
                .id(id)
                .child(S.document().schemaType('shopifyProduct').documentId(id)),
              // Product variants
              S.listItem()
                .title('Variants')
                .schemaType('productVariant')
                .child(
                  S.documentList()
                    .title('Variants')
                    .schemaType('productVariant')
                    .filter(
                      `
                      _type == "productVariant"
                      && store.productId == $productId
                    `
                    )
                    .params({
                      productId: Number(id.replace('shopifyProduct-', '')),
                    })
                    .canHandleIntent(
                      (intentName, params) =>
                        intentName === 'edit' && params.type === 'productVariant'
                    )
                ),
            ])
        )
    )
)

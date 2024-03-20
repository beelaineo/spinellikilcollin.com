import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'
import {MdSettings} from 'react-icons/md'
import {AiOutlineSetting} from 'react-icons/ai'
import {FaSignature} from 'react-icons/fa'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Settings')
    .icon(MdSettings)
    .child(
      S.list()
        .title('Settings')
        .items([
          S.listItem()
            .title('Site Settings')
            .icon(AiOutlineSetting)
            .child(S.editor().id('config').schemaType('siteSettings').documentId('site-settings')),
          S.listItem()
            .title('Product Settings')
            .icon(AiOutlineSetting)
            .child(
              S.editor()
                .id('productInfoSettings')
                .schemaType('productInfoSettings')
                .documentId('productInfoSettings')
            ),
          S.listItem()
            .title('Collection Settings')
            .icon(AiOutlineSetting)
            .child(
              S.editor()
                .id('productListingSettings')
                .schemaType('productListingSettings')
                .documentId('productListingSettings')
            ),
          S.listItem()
            .title('Email Signature Settings')
            .icon(FaSignature)
            .child(
              S.editor()
                .id('emailSignatureSettings')
                .schemaType('emailSignatureSettings')
                .documentId('emailSignatureSettings')
            ),
        ])
    )
)

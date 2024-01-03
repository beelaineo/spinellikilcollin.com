import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'
import {InfoOutlineIcon} from '@sanity/icons'
import {GiDiamondRing} from 'react-icons/gi'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Products')
    .schemaType('shopifyProduct')
    .icon(GiDiamondRing)
    .child(S.documentTypeList('product').defaultLayout('detail'))
)

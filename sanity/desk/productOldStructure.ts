import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'
import {InfoOutlineIcon} from '@sanity/icons'
import {GiDiamondRing} from 'react-icons/gi'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Products (old)')
    .icon(GiDiamondRing)
    .child(
      S.documentTypeList('shopifyProduct')
        .title('Products (old)')
        .id('shopifyProducts')
        .filter('_type == "shopifyProduct" && archived!=true && !(_id in path("drafts.**"))')
        .defaultOrdering([{field: 'title', direction: 'desc'}])
    )
)

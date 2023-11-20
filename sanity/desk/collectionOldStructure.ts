import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'
import {TiThSmallOutline} from 'react-icons/ti'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Collections (old)')
    .icon(TiThSmallOutline)
    .child(
      S.documentTypeList('shopifyCollection')
        .title('Collections (old)')
        .id('shopifyCollections')
        .filter('_type=="shopifyCollection" && archived!=true && !(_id in path("drafts.**"))')
        .defaultOrdering([{field: 'title', direction: 'desc'}])
    )
)

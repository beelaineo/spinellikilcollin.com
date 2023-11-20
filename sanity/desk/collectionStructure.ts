import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'
import {TiThSmallOutline} from 'react-icons/ti'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Collections')
    .icon(TiThSmallOutline)
    .schemaType('collection')
    .child(S.documentTypeList('collection'))
)

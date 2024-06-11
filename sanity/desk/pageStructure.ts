import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'
import {MdInfoOutline} from 'react-icons/md'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('About Pages')
    .icon(MdInfoOutline)
    .schemaType('page')
    .child(S.documentTypeList('page'))
)

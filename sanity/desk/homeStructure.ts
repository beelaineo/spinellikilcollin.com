import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'
import {MdHome} from 'react-icons/md'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Homepage')
    .icon(MdHome)
    .child(S.editor().title('Homepage').schemaType('homepage').documentId('homepage'))
)

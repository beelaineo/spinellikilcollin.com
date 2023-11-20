import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'
import {FiCompass} from 'react-icons/fi'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Nav Menu')
    .icon(FiCompass)
    .child(S.editor().id('menu').schemaType('menu').documentId('menu-settings'))
)

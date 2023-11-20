import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Settings')
    .schemaType('siteSettings')
    .child(S.editor().title('Settings').schemaType('siteSettings').documentId('settings'))
)

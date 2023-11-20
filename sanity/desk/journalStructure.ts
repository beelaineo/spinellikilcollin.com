import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'
import {AiOutlineBook} from 'react-icons/ai'
import {FaPencilAlt} from 'react-icons/fa'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Journal')
    .id('journal')
    .icon(FaPencilAlt)
    .child(
      S.list()
        .title('Journal')
        .items([
          S.listItem()
            .title('Journal (Main Page)')
            .icon(AiOutlineBook)
            .child(
              S.editor().id('journalPage').schemaType('journalPage').documentId('journalPage')
            ),
          S.divider(),
          S.documentTypeListItem('journalEntry').title('Journal Entries').icon(FaPencilAlt),
        ])
    )
)

import {ListItemBuilder} from 'sanity/structure'
import defineStructure from '../utils/defineStructure'
import {ImFilesEmpty} from 'react-icons/im'
import {BsTools, BsBookHalf} from 'react-icons/bs'
import {MdLocalPhone, MdLoyalty, MdCake, MdPayment} from 'react-icons/md'
import {GrDiamond, GrUserNew} from 'react-icons/gr'
import {AiOutlineTeam} from 'react-icons/ai'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .id('specialPages')
    .title('Special Pages')
    .icon(ImFilesEmpty)
    .child(
      S.list()
        .title('Special Pages')
        .items([
          S.listItem()
            .title('.925')
            .icon(BsBookHalf)
            .child(S.editor().id('magazine').schemaType('magazine').documentId('magazine')),

          S.listItem()
            .title('Contact')
            .icon(MdLocalPhone)
            .child(S.editor().id('contact').schemaType('contact').documentId('contact')),
          S.listItem()
            .title('FAQ')
            .icon(MdLocalPhone)
            .child(S.editor().id('faq').schemaType('faq').documentId('faq')),
          S.listItem()
            .title('Appointments')
            .icon(MdLocalPhone)
            .child(
              S.editor().id('appointments').schemaType('appointments').documentId('appointments')
            ),
          S.listItem()
            .title('Customize')
            .icon(BsTools)
            .child(S.editor().id('customize').schemaType('customize').documentId('customize')),

          S.listItem()
            .title('Birthdays')
            .icon(MdCake)
            .child(S.editor().id('birthdays').schemaType('birthdays').documentId('birthdays')),
          S.listItem()
            .title('VIP Loyalty Form')
            .icon(MdLoyalty)
            .child(S.editor().id('loyalty').schemaType('loyalty').documentId('loyalty')),
          S.listItem()
            .title('New Customer Form')
            .icon(GrUserNew)
            .child(
              S.editor().id('newCustomer').schemaType('newCustomer').documentId('newCustomer')
            ),
          S.listItem()
            .title('Payment Plans')
            .icon(MdPayment)
            .child(
              S.editor().id('paymentPlans').schemaType('paymentPlans').documentId('paymentPlans')
            ),
          S.listItem()
            .title('Stones')
            .icon(GrDiamond)
            .child(
              S.documentTypeList('stone')
                .title('Stones')
                .id('stonesList')
                .filter('_type == "stone" && !(_id in path("drafts.**"))')
                .defaultOrdering([{field: 'title', direction: 'desc'}])
            ),
          S.listItem()
            .title('Team')
            .icon(AiOutlineTeam)
            .child(S.editor().id('teamPage').schemaType('teamPage').documentId('teamPage')),
        ])
    )
)

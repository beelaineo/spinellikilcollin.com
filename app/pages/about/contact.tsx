import * as React from 'react'
import gql from 'graphql-tag'
import { PageContext } from '../_app'
import { Maybe, Contact } from '../../src/types'
import { NotFound, ContactView } from '../../src/views'

const query = gql`
  query ContactPageQuery {
    Contact(id: "contact") {
      _id
      _type
      title
      contactLines {
        _key
        label
        contact
      }
    }
  }
`

interface ContactPageProps {
  contact?: Contact
}

const ContactPage = ({ contact }: ContactPageProps) => {
  if (!contact) return <NotFound />
  return <ContactView contact={contact} />
}

interface Response {
  Contact: Maybe<Contact>
}

ContactPage.getInitialProps = async (ctx: PageContext) => {
  const { apolloClient } = ctx
  const response = await apolloClient.query({ query })

  const contact = response?.data?.Contact
  return {
    contact,
  }
}

export default ContactPage

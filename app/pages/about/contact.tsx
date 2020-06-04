import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps } from 'next'
import { Maybe, Contact } from '../../src/types'
import { NotFound, ContactView } from '../../src/views'
import { request } from '../../src/graphql'

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

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async () => {
  const response = await request<Response>(query)
  const contact = response?.Contact || null

  return { props: { contact } }
}

export default ContactPage

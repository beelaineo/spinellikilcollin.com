import * as React from 'react'
import { Box } from '@xstyled/styled-components'
import { Contact } from '../../types'
import { useModal } from '../../providers'
import { PageWrapper } from '../../components/Layout'
import { Heading } from '../../components/Text'
import { Button } from '../../components/Button'
import {
  Wrapper,
  ContactLines,
  ContactLineWrapper,
  ChatWrapper,
} from './styled'
import ChatBox from '../../svg/ChatBox.svg'
import { SEO } from '../../components/SEO'

const Chat = () => {
  const launchChat = () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window?.HubSpotConversations?.widget) {
      // @ts-ignore
      window.HubSpotConversations.widget.open()
    }
  }
  return (
    <Box width={{ xs: '100%', md: 'auto' }}>
      <ChatBox />
      <Heading my={4} level={3}>
        Contact us directly, via Chat
      </Heading>
      <Button onClick={launchChat} width="100%" minWidth="220px">
        Launch Chat
      </Button>
    </Box>
  )
}

interface ContactProps {
  contact: Contact
}

export const ContactView = ({ contact }: ContactProps) => {
  const { seo, title, _id } = contact
  const { openContactModal } = useModal()
  const defaultSeo = {
    title: 'Contact',
    description: seo?.description,
    image: seo?.image,
  }
  console.log('Contact body', contact)
  const handleModalClick = (formtype: string) => () =>
    openContactModal({ formtype })

  return (
    <>
      <SEO
        seo={seo}
        defaultSeo={defaultSeo}
        path="about/contact"
        contentType={_id!}
      />
      <PageWrapper>
        <Heading level={1} textAlign="center">
          {title || 'Contact'}
        </Heading>
        <Wrapper>
          <ContactLines>
            {contact.contactLines?.map((line) => {
              if (!line) return null
              const { _key, label, contact } = line
              switch (line.type) {
                case 'Order':
                  return (
                    <ContactLineWrapper key={_key}>
                      <Heading level={4}>{label}</Heading>
                      <Button
                        level={2}
                        onClick={handleModalClick('Order')}
                        aria-label={label}
                      >
                        Contact Us
                      </Button>
                    </ContactLineWrapper>
                  )
                case 'Wholesale':
                  return (
                    <ContactLineWrapper key={_key}>
                      <Heading level={4}>{label}</Heading>
                      <Button
                        level={2}
                        onClick={handleModalClick('Wholesale')}
                        aria-label={label}
                      >
                        Contact Us
                      </Button>
                    </ContactLineWrapper>
                  )
                case 'Press':
                  return (
                    <ContactLineWrapper key={_key}>
                      <Heading level={4}>{label}</Heading>
                      <Button
                        level={2}
                        onClick={handleModalClick('Press')}
                        aria-label={label}
                      >
                        Contact Us
                      </Button>
                    </ContactLineWrapper>
                  )
                case 'Engagement':
                  return (
                    <ContactLineWrapper key={_key}>
                      <Heading level={4}>{label}</Heading>
                      <Button
                        level={2}
                        onClick={handleModalClick('Engagement')}
                        aria-label={label}
                      >
                        Contact Us
                      </Button>
                    </ContactLineWrapper>
                  )
                case 'Telephone':
                  return (
                    <ContactLineWrapper key={_key}>
                      <Heading level={4}>{label}</Heading>
                      <Heading level={3}>
                        <a href={'tel:' + contact}>{contact}</a>
                      </Heading>
                    </ContactLineWrapper>
                  )
                default:
                  return null
              }
            })}
          </ContactLines>

          <ChatWrapper>
            <Chat />
          </ChatWrapper>
        </Wrapper>
      </PageWrapper>
    </>
  )
}

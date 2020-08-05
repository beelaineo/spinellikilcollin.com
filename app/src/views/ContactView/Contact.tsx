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
    if (typeof window !== 'undefined' && window.Intercom) {
      // @ts-ignore
      window.Intercom('show')
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
  const { seo, title } = contact
  const { openContactModal } = useModal()
  const defaultSeo = {
    title: 'Contact',
  }
  const handleModalClick = (formType: string) => () =>
    openContactModal({ formType })

  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} path="about/contact" />
      <PageWrapper>
        <Heading level={1} textAlign="center">
          {title || 'Contact'}
        </Heading>
        <Wrapper>
          <ContactLines>
            <ContactLineWrapper>
              <Heading level={4}>For order inquiries:</Heading>
              <Button level={2} onClick={handleModalClick('Order')}>
                Contact Us
              </Button>
            </ContactLineWrapper>
            <ContactLineWrapper>
              <Heading level={4}>For wholesale inquiries:</Heading>
              <Button level={2} onClick={handleModalClick('Wholesale')}>
                Contact Us
              </Button>
            </ContactLineWrapper>
            <ContactLineWrapper>
              <Heading level={4}>For press inquiries:</Heading>
              <Button level={2} onClick={handleModalClick('Press')}>
                Contact Us
              </Button>
            </ContactLineWrapper>
            <ContactLineWrapper>
              <Heading level={4}>Engagement Inquiries:</Heading>
              <Button level={2} onClick={handleModalClick('Engagement')}>
                Contact Us
              </Button>
            </ContactLineWrapper>
            <ContactLineWrapper>
              <Heading level={4}>Call Us</Heading>
              <Heading level={3}>
                <a href="tel:213.341.8244">213.341.8244</a>
              </Heading>
            </ContactLineWrapper>
          </ContactLines>

          <ChatWrapper>
            <Chat />
          </ChatWrapper>
        </Wrapper>
      </PageWrapper>
    </>
  )
}

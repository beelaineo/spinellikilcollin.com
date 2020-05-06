import * as React from 'react'
import { FaFacebookF, FaTwitter, FaPinterest } from 'react-icons/fa'
import { TiSocialInstagram, TiSocialGooglePlus } from 'react-icons/ti'
import { PageLink } from '../../components/PageLink'
import { Heading } from '../../components/Text'
import { useShopData } from '../../providers/ShopDataProvider'
import { NewsletterSignup } from './NewsletterSignup'
import { Socials, FooterWrapper, FooterInner, FooterLinks } from './styled'

const currentYear = new Date().getFullYear()

export const Footer = () => {
  const shopData = useShopData()
  const footerLinks = shopData?.siteSettings?.links ?? []
  const mailerTitle = shopData?.siteSettings?.mailerTitle ?? ''
  const mailerSubtitle = shopData?.siteSettings?.mailerSubtitle ?? ''
  console.log(footerLinks)
  return (
    <FooterWrapper>
      <FooterInner>
        <FooterLinks>
          {footerLinks.map((link) =>
            link ? (
              <Heading mb={5} key={link._key || 'some-key'} level={3}>
                <PageLink link={link} />
              </Heading>
            ) : null,
          )}
        </FooterLinks>
        <div />
        <NewsletterSignup
          mailerTitle={mailerTitle}
          mailerSubtitle={mailerSubtitle}
        />
      </FooterInner>
      <FooterInner>
        <Socials>
          <a href="#">
            <FaFacebookF />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaPinterest />
          </a>
          <a href="#">
            <TiSocialGooglePlus />
          </a>
          <a href="#">
            <TiSocialInstagram />
          </a>
        </Socials>
        <div />
        <Heading level={5} textTransform="uppercase">
          Copyright © {currentYear} Spinelli Kilcollin
        </Heading>
      </FooterInner>
    </FooterWrapper>
  )
}

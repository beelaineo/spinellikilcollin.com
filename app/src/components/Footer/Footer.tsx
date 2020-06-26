import * as React from 'react'
import { NextRouter } from 'next/router'
import { FaFacebookF, FaTwitter, FaPinterest } from 'react-icons/fa'
import { TiSocialInstagram, TiSocialGooglePlus } from 'react-icons/ti'
import { PageLink } from '../../components/PageLink'
import { Heading } from '../../components/Text'
import { useShopData } from '../../providers/ShopDataProvider'
import { NewsletterSignup } from './NewsletterSignup'
import {
  Socials,
  FooterWrapper,
  FooterInner,
  FooterInnerLower,
  FooterLinks,
} from './styled'

const currentYear = new Date().getFullYear()

interface FooterProps {
  router: NextRouter
}
export const Footer = ({ router }: FooterProps) => {
  const shopData = useShopData()
  const footerLinks = shopData?.siteSettings?.links ?? []
  const mailerTitle = shopData?.siteSettings?.mailerTitle ?? ''
  const mailerSubtitle = shopData?.siteSettings?.mailerSubtitle ?? ''

  const topBorder = /(^\/about)|(^\/products)/.test(router.asPath)

  return (
    <FooterWrapper>
      <FooterInner topBorder={topBorder}>
        <FooterLinks>
          {footerLinks.map((link) =>
            link ? (
              <Heading m={0} key={link._key || 'some-key'} level={3}>
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
      <FooterInnerLower>
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
        <Heading m={0} level={4} fontWeight={1} textTransform="uppercase">
          Copyright © {currentYear} Spinelli Kilcollin
        </Heading>
      </FooterInnerLower>
    </FooterWrapper>
  )
}

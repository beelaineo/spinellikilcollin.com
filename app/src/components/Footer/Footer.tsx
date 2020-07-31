import * as React from 'react'
import { useRouter } from 'next/router'
import { FaFacebookF, FaYoutube, FaTwitter, FaPinterest } from 'react-icons/fa'
import { TiSocialInstagram } from 'react-icons/ti'
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

export const Footer = () => {
  const router = useRouter()
  const shopData = useShopData()
  const footerLinks = shopData?.siteSettings?.links ?? []
  const mailerTitle = shopData?.siteSettings?.mailerTitle ?? ''
  const mailerSubtitle = shopData?.siteSettings?.mailerSubtitle ?? ''

  const topBorder = /(^\/925)|(^\/about)|(^\/products)/.test(router.asPath)

  return (
    <FooterWrapper>
      <FooterInner topBorder={topBorder}>
        <FooterLinks>
          {footerLinks.map((link) =>
            link ? (
              <Heading m={0} key={link._key || 'some-key'} level={4}>
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
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/Spinelli-Kilcollin-170280053017197/?fref=ts"
          >
            <FaFacebookF />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/SKilcollin"
          >
            <FaTwitter />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.pinterest.com/spinellikil"
          >
            <FaPinterest />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/channel/UCraW2KqZkr3mNBD2btnIfSw"
          >
            <FaYoutube />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://instagram.com/spinellikilcollin"
          >
            <TiSocialInstagram />
          </a>
        </Socials>
        <div />
        <Heading m={0} level={5} fontWeight={1} textTransform="uppercase">
          Copyright © {currentYear} Spinelli Kilcollin
        </Heading>
      </FooterInnerLower>
    </FooterWrapper>
  )
}

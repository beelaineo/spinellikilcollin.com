import * as React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FaFacebookF, FaYoutube, FaTwitter, FaPinterest } from 'react-icons/fa'
import { TiSocialInstagram } from 'react-icons/ti'
import { Breadcrumbs } from './Breadcrumbs'
import { PageLink } from '../../components/PageLink'
import { Heading } from '../../components/Text'
import { useShopData } from '../../providers/ShopDataProvider'
import { NewsletterSignup } from './NewsletterSignup'
import {
  Socials,
  FooterWrapper,
  HomepageLink,
  FooterInner,
  FooterRight,
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

  return (
    <FooterWrapper>
      <Breadcrumbs />
      <FooterInner>
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
        <FooterRight>
          <NewsletterSignup
            mailerTitle={mailerTitle}
            mailerSubtitle={mailerSubtitle}
          />
          <HomepageLink isMobile={false}>
            <Heading m={0} level={4}>
              <Link href="/">
                <a>
                  → <em>Return</em> to the Homepage
                </a>
              </Link>
            </Heading>
          </HomepageLink>
        </FooterRight>
        <HomepageLink isMobile={true}>
          <Heading m={0} level={4}>
            <Link href="/">
              <a>
                → <em>Return</em> to the Homepage
              </a>
            </Link>
          </Heading>
        </HomepageLink>
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
          Copyright © {currentYear}{' '}
          <Link href="/">
            <a>Spinelli Kilcollin</a>
          </Link>
        </Heading>
      </FooterInnerLower>
    </FooterWrapper>
  )
}

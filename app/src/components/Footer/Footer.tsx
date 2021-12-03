import * as React from 'react'
import Link from 'next/link'
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
import styled, { css } from '@xstyled/styled-components'

const currentYear = new Date().getFullYear()

const NavItemWrapper = styled.div`
  ${({ theme }) => css`
    display: inline-block;
    margin-right: 3;
    ${theme.mediaQueries.mobile} {
      margin-bottom: 3;
    }
  `}
`
const FooterMenuWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    ${theme.mediaQueries.mobile} {
      flex-direction: column;
      align-self: flex-start;
      padding: 0 5;
    }
  `}
`
const FooterNav = styled.nav`
  display: block;
`

export const Footer = () => {
  const shopData = useShopData()
  const footerLinks = shopData?.siteSettings?.links ?? []
  const mailerTitle = shopData?.siteSettings?.mailerTitle ?? ''
  const mailerSubtitle = shopData?.siteSettings?.mailerSubtitle ?? ''
  const footerMenu = shopData?.menu?.footerMenuItems ?? []
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
        <FooterMenuWrapper>
          <FooterNav>
            {footerMenu.map((menuItem) => {
              if (!menuItem) return null
              switch (menuItem.__typename) {
                case 'MenuLink':
                  return (
                    <NavItemWrapper key={menuItem._key || 'some-key'}>
                      <PageLink
                        link={menuItem.link}
                        render={(inferredLabel) => (
                          <Heading m={0} level={5} fontWeight={1}>
                            {menuItem.label
                              ? menuItem.label
                              : inferredLabel
                              ? inferredLabel
                              : ''}
                          </Heading>
                        )}
                      />
                    </NavItemWrapper>
                  )
                default:
                  return null
              }
            })}
          </FooterNav>
          <Heading m={0} level={5} fontWeight={1} textTransform="uppercase">
            © {currentYear}{' '}
            <Link href="/">
              <a>Spinelli Kilcollin</a>
            </Link>
          </Heading>
        </FooterMenuWrapper>
      </FooterInnerLower>
    </FooterWrapper>
  )
}

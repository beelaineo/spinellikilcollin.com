import * as React from 'react'
import Link from 'next/link'
import { FaFacebookF, FaYoutube, FaTwitter, FaPinterest } from 'react-icons/fa'
import { TiSocialInstagram } from 'react-icons/ti'
import { Breadcrumbs } from './Breadcrumbs'
import { PageLink } from '../../components/PageLink'
import { Heading } from '../../components/Text'
import { useShopData } from '../../providers/ShopDataProvider'
import { useRouter } from 'next/router'
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
    a:focus-visible {
      position: relative;
      ${theme.focus.bottom()}
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

    h5 {
      a:focus-visible {
        position: relative;
        ${theme.focus.bottom()}
      }
    }
  `}
`
const FooterNav = styled.nav`
  display: block;
`

export const Footer = ({ breadCrumbs }) => {
  const shopData = useShopData()
  const footerLinks = shopData?.siteSettings?.links ?? []
  const mailerTitle = shopData?.siteSettings?.mailerTitle ?? ''
  const mailerSubtitle = shopData?.siteSettings?.mailerSubtitle ?? ''
  const footerMenu = shopData?.menu?.footerMenuItems ?? []
  const router = useRouter()
  return (
    <FooterWrapper>
      <Breadcrumbs paths={breadCrumbs} />
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
          {router.asPath !== '/' ? (
            <HomepageLink $isMobile={false}>
              <Heading m={0} level={4}>
                <Link href="/">
                  → <em>Return</em> to the Homepage
                </Link>
              </Heading>
            </HomepageLink>
          ) : null}
        </FooterRight>
        {router.asPath !== '/' ? (
          <HomepageLink $isMobile={true}>
            <Heading m={0} level={4}>
              <Link href="/">
                → <em>Return</em> to the Homepage
              </Link>
            </Heading>
          </HomepageLink>
        ) : null}
      </FooterInner>
      <FooterInnerLower>
        <Socials>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/Spinelli-Kilcollin-170280053017197/?fref=ts"
            aria-label="Spinelli Kilcollin on Facebook"
          >
            <FaFacebookF />
          </a>
          {/* <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/SKilcollin"
            aria-label="Spinelli Kilcollin on Twitter"
          >
            <FaTwitter />
          </a> */}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.pinterest.com/spinellikil"
            aria-label="Spinelli Kilcollin on Pinterest"
          >
            <FaPinterest />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/channel/UCraW2KqZkr3mNBD2btnIfSw"
            aria-label="Spinelli Kilcollin on Youtube"
          >
            <FaYoutube />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://instagram.com/spinellikilcollin"
            aria-label="Spinelli Kilcollin on Instagram"
          >
            <TiSocialInstagram />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.threads.net/@spinellikilcollin"
            aria-label="Spinelli Kilcollin on Threads"
          >
            <svg
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 360 360"
              height="1em"
              width="1em"
            >
              <path d="m249.45,196.34c-.35,2.02-.64,3.79-.96,5.56-1.75,9.41-4.58,18.47-9.39,26.87-6.04,10.55-14.39,18.84-25.61,24.24-7.18,3.45-14.81,5.38-22.75,6.21-9.47.99-18.84.49-28.06-1.94-8.84-2.33-16.91-6.13-23.82-12.03-9.55-8.15-15.1-18.37-16.38-30.68-1.46-14.03,2.32-26.51,12.12-37.07,6.1-6.57,13.63-11.13,22.04-14.39,7.41-2.87,15.11-4.54,23.04-5.28,9.82-.92,19.65-.89,29.48-.18,3.92.29,7.81.89,11.71,1.34.49.06.99.1,1.59.16,0-.39.05-.73,0-1.04-.91-4.94-2.35-9.72-4.68-14.22-4.09-7.89-10.43-13.29-19.13-15.84-10.51-3.08-21.09-3.14-31.58.16-7.42,2.34-13.42,6.67-18.01,12.81-.32.43-.65.86-1.09,1.43-7.44-4.96-14.82-9.88-22.29-14.86.34-.53.61-.99.92-1.42,9.73-13.44,22.91-21.87,39.4-25.34,13.73-2.88,27.39-2.39,40.82,1.67,16.03,4.85,27.62,14.82,35.09,29.36,3.88,7.56,6.23,15.6,7.5,23.94.51,3.34.78,6.72,1.15,10.07.04.39.09.77.14,1.24,1.09.49,2.19.97,3.28,1.47,10.61,4.85,20.09,11.24,28.02,19.69,9.2,9.81,15,21.29,17.6,34.28,3.7,18.47,1.27,36.18-7.44,53.02-4.95,9.57-11.75,17.77-19.74,25.11-15.91,14.6-34.72,23.65-56.13,27.75-9.08,1.74-18.25,2.62-27.49,2.96-14.29.54-28.43-.63-42.4-3.58-18.31-3.87-35.08-11.01-49.81-22.39-11.51-8.89-20.79-19.65-28.2-31.96-7.81-12.96-13.06-26.9-16.62-41.47-2.21-9.07-3.68-18.26-4.64-27.53-.84-8.05-1.35-16.13-1.28-24.21.06-7.05.51-14.1.98-21.14.59-8.66,1.91-17.24,3.71-25.74,3.48-16.42,8.98-32.13,17.72-46.66,15.45-25.69,37.79-42.97,67.07-51.75,12.26-3.68,24.84-5.53,37.64-6.25,9.15-.52,18.26-.24,27.36.65,20.06,1.97,39.12,7.11,56.59,17.16,17.06,9.83,30.5,23.2,40.82,39.58,7.32,11.62,12.58,24.09,16.29,37.2.06.23.11.46.21.87-8.71,2.26-17.35,4.5-26.16,6.78-.19-.62-.35-1.12-.5-1.62-3.14-10.49-7.36-20.53-13.28-29.85-10.98-17.3-26.32-29.47-45.86-36.68-10.64-3.92-21.69-6.05-33-7.03-9.89-.86-19.76-.74-29.61.34-13.9,1.53-27.25,4.93-39.67,11.35-14.93,7.72-26.37,18.9-34.81,33.06-5.99,10.04-10.08,20.81-12.95,32.03-2.33,9.15-3.79,18.43-4.65,27.82-.82,8.99-1.13,18-.79,27.02.6,15.77,2.62,31.34,7.26,46.51,3.65,11.92,8.81,23.15,16.29,33.3,10.31,14,23.87,23.89,40.38,30.02,9.91,3.68,20.2,5.76,30.74,6.8,11.29,1.11,22.57.94,33.83-.35,11.14-1.28,21.94-3.83,32.04-8.72,12.55-6.08,23.26-14.39,31.04-25.8,9.98-14.63,12.43-30.5,6.96-47.32-3.06-9.4-9.25-16.64-17.34-22.42-1.45-1.04-2.98-1.98-4.67-3.09Zm-26.12-9.55c-.44-.14-.76-.28-1.09-.35-5.24-1.03-10.53-1.75-15.87-2.14-5.79-.43-11.59-.48-17.39-.29-6.37.2-12.68.85-18.81,2.65-5.33,1.56-10.24,3.86-14.29,7.67-9.66,9.09-8.86,23.54,1.74,31.56,3.52,2.66,7.51,4.38,11.78,5.5,7.96,2.07,15.96,2,23.98.38,5.85-1.18,11.08-3.59,15.48-7.57,4.45-4.03,7.43-8.98,9.59-14.45,2.25-5.7,3.52-11.64,4.3-17.69.22-1.74.39-3.49.58-5.27Z" />
            </svg>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.tiktok.com/@spinellikilcollin"
            aria-label="Spinelli Kilcollin on TikTok"
          >
            <svg
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 360 360"
              height="1em"
              width="1em"
            >
              <path d="m158.95,195.35c-5.63,0-10.88-.19-16.11.04-10.47.46-19.05,4.94-27.26,11.49-13.95,11.12-18.02,41.97-4.47,56.2,8.01,8.42,17.43,13.95,29.68,14.44,11.98.48,22.69-2,32.06-9.58,11.15-9.03,14.26-21.37,14.35-34.94.25-36.1.58-72.2.73-108.3.12-30.48.03-60.97.04-91.46,0-1.35,0-2.7,0-4.51,5.46,0,10.58-.11,15.7.02,10.88.27,21.76.73,32.65.96,2.77.06,3.41,1.03,3.72,3.8,2.34,20.69,9.16,39.35,25.87,53.02,8.38,6.85,17.53,12.38,28.34,14.7,5.23,1.12,10.42,2.5,15.56,3.96,1.02.29,2.54,1.5,2.54,2.3.15,15.91.11,31.83.11,48.19-26.43-2.12-51.01-8.75-72.96-25.64,0,3.46.02,5.48,0,7.5-.48,35.18-.97,70.36-1.46,105.54-.29,20.74-7.65,39.1-20.27,55.1-14.26,18.07-33.19,28.66-56.29,31.41-25.57,3.04-49.38-1.3-71.23-15.61-9.26-6.06-17.17-13.28-23.76-22.03-21.12-28.03-22.56-58.77-11.76-90.84,5.96-17.69,16.95-32.22,31.77-43.36,20.9-15.71,44.6-21.11,70.43-16.44.79.14,1.93,1.57,1.94,2.4.11,17.07.09,34.14.09,51.66Z" />
            </svg>
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
            <Link href="/" aria-label="Spinelli Kilcollin homepage">
              Spinelli Kilcollin
            </Link>
          </Heading>
        </FooterMenuWrapper>
      </FooterInnerLower>
    </FooterWrapper>
  )
}

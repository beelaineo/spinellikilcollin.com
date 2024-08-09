import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { PaymentPlans } from '../../types'
import { PageWrapper, Column } from '../../components/Layout'
import { Heading } from '../../components/Text'
import { RichText } from '../../components/RichText'
import { Wrapper } from './styled'
import { Image } from '../../components/Image'
import { SEO } from '../../components/SEO'

const { useState, useEffect } = React

interface FinancingPageProps {
  page: PaymentPlans
}

const PageText = styled.div`
  h1,
  h2,
  h3 {
    text-align: center;
  }
`

const ProvidersNav = styled.nav`
  ${({ theme }) => css`
    padding-top: 6;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;

    a {
      width: 160px;
      height: auto;
      cursor: pointer;
      display: inline-block;
      padding-bottom: 4;
      transition: all 0.3s ease; // Added for smooth visual feedback

      &:hover {
        transform: translateY(-2px); // Slight lift effect
      }

      // Active state
      &.active {
        transform: translateY(1px); // Slight press effect
        border-bottom: 1px solid black; // Thicker border for emphasis
        margin-bottom: -1px; // Adjust margin for thicker border
      }
    }

    ${theme.mediaQueries.tablet} {
      a {
        width: 100px;
      }
    }
  `}
`

export const FinancingPageView = ({ page }: FinancingPageProps) => {
  const { seo, title, bodyRaw, providers, _id } = page
  const defaultSeo = {
    title: seo?.title || 'Financing',
    description: seo?.description,
    image: seo?.image,
  }

  const [activeProvider, setActiveProvider] = React.useState<string | null>(
    'aa2522c18a00',
  )

  return (
    <>
      <SEO
        seo={seo}
        defaultSeo={defaultSeo}
        path="about/financing"
        contentType={_id!}
      />
      <PageWrapper tabIndex={-1}>
        <Heading level={1} textAlign="center">
          {title || 'Financing'}
        </Heading>
        <Wrapper>
          <Column $columnwidth="medium">
            <PageText>
              <RichText
                body={bodyRaw}
                imageSizes="(max-width: 600px) 100vw, 600px"
              />
            </PageText>
            {providers && providers.length > 0 && (
              <ProvidersNav>
                {providers.map((provider) => (
                  <a
                    key={provider?._key}
                    onClick={() => setActiveProvider(provider?._key || null)}
                    className={
                      provider?._key === activeProvider ? 'active' : ''
                    }
                  >
                    {provider?.logo && (
                      <Image image={provider.logo} altText={provider.name} />
                    )}
                  </a>
                ))}
              </ProvidersNav>
            )}
            {providers && providers.length > 0 && (
              <PageText>
                {providers.map(
                  (provider) =>
                    provider?._key === activeProvider && (
                      <RichText
                        key={provider?._key}
                        article
                        body={provider?.bodyRaw}
                        imageSizes="(max-width: 600px) 100vw, 600px"
                      />
                    ),
                )}
              </PageText>
            )}
          </Column>
        </Wrapper>
      </PageWrapper>
    </>
  )
}

import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { CustomerCare as CustomerCareType } from '../../types'
import { FeatureFlag } from '../../components/FeatureFlag'
import { Heading } from '../../components/Text'
import { Column } from '../../components/Layout'
import { RichText } from '../../components/RichText'
import { SEO } from '../../components/SEO'
import { useNavigation } from '../../providers'
import { CustomerCareForm } from '../../components/Forms/Forms/CustomerCareForm'

interface BlockWrapperProps {
  borderTop?: boolean
}
const BlockWrapper = styled.div<BlockWrapperProps>`
  ${({ borderTop }) => css`
    padding: 6 0;
    border-bottom: 1px solid;
    border-color: body.5;
    border-top: ${borderTop ? '1px solid' : 0};
  `}
`

interface WithBgImageUrl {
  bgImageUrl?: string | null
}

export const PageWrapper = styled.divBox<WithBgImageUrl>`
  ${({ theme, bgImageUrl }) => css`
    background-image: url(${bgImageUrl});
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    padding: calc(${theme.navHeight} + ${theme.space[9]}px) 10 8;
    overflow-x: hidden;
    color: white;
    & > h3 {
      text-align: center;
      font-style: italic;
      margin-bottom: 4;
    }

    ${theme.mediaQueries.tablet} {
      padding: calc(${theme.navHeight} + ${theme.space[9]}px) 8 6;
    }

    ${theme.mediaQueries.mobile} {
      padding: calc(${theme.mobileNavHeight} + ${theme.space[4]}px) 30px 5;
    }
  `}
`

const FormWrapper = styled.div`
  margin: 9 auto;
  max-width: 500px;
  padding: 5;
  background-color: body.0;
  box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.2);
  color: body.9;
`

interface CustomerCareProps {
  customerCare: CustomerCareType
}

export const CustomerCare = ({ customerCare }: CustomerCareProps) => {
  const { seo, title, backgroundImage } = customerCare
  const { setColorTheme } = useNavigation()
  const defaultSeo = {
    title: 'Customer Care',
  }

  React.useEffect(() => {
    setColorTheme('light')
  }, [])

  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} path="customer-care" />
      <PageWrapper tabIndex={-1} bgImageUrl={backgroundImage?.asset?.url}>
        <Heading textAlign="center" level={1}>
          {title}
        </Heading>
        <FormWrapper>
          <CustomerCareForm />
        </FormWrapper>
      </PageWrapper>
    </>
  )
}

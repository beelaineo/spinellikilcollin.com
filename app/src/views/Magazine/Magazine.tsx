import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Magazine } from '../../types'
import { Column, PageWrapper } from '../../components/Layout'
import { Heading } from '../../components/Text'
import { RichText } from '../../components/RichText'
import { Image } from '../../components/Image'
import { SEO } from '../../components/SEO'
import { MagazineForm } from './MagazineForm'

const Inner = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;

    ${theme.mediaQueries.mobile} {
      grid-template-columns: 1fr;
    }
  `}
`

const ImageWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mediaQueries.aboveMobile} {
      padding-right: 6;
    }
    ${theme.mediaQueries.mobile} {
      padding-bottom: 5;
      margin-bottom: 5;
      border-bottom: 1px solid;
      border-bottom-color: body.6;
    }
  `}
`
const FormWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mediaQueries.aboveMobile} {
      border-left: 1px solid;
      padding-left: 6;
    }
  `}
`

interface MagazineProps {
  magazine: Magazine
}

export const MagazineView = ({ magazine }: MagazineProps) => {
  const { seo, title, successMessage, coverImage, descriptionRaw } = magazine
  const path = '925'
  const defaultSeo = {
    title: title || '.925 Magazine',
  }

  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} path={path} />
      <PageWrapper tabIndex={-1}>
        <Column columnwidth="wide">
          <Heading mt={4} mb={6} textAlign="center" level={2}>
            {title}
          </Heading>
          <Inner>
            <ImageWrapper>
              <Image
                image={coverImage}
                sizes="(min-width: 600px) 100vw, 500px"
              />
            </ImageWrapper>
            <FormWrapper>
              <RichText body={descriptionRaw} />
              <MagazineForm successMessage={successMessage || 'Thank you!'} />
            </FormWrapper>
          </Inner>
        </Column>
      </PageWrapper>
    </>
  )
}

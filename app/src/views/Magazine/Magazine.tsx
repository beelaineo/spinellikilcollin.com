import * as React from 'react'
import styled from '@xstyled/styled-components'
import { Magazine } from '../../types'
import { Column, PageWrapper } from '../../components/Layout'
import { Heading } from '../../components/Text'
import { RichText } from '../../components/RichText'
import { Image } from '../../components/Image'
import { MagazineForm } from './MagazineForm'

const Inner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const ImageWrapper = styled.div`
  padding-right: 4;
`
const FormWrapper = styled.div`
  border-left: 1px solid;
  padding-left: 4;
`

interface MagazineProps {
  magazine: Magazine
}

export const MagazineView = ({ magazine }: MagazineProps) => {
  const { title, coverImage, descriptionRaw } = magazine
  return (
    <PageWrapper>
      <Column width="wide">
        <Heading mt={4} mb={6} textAlign="center" level={1}>
          {title}
        </Heading>
        <Inner>
          <ImageWrapper>
            <Image image={coverImage} sizes="(min-width: 600px) 100vw, 500px" />
          </ImageWrapper>
          <FormWrapper>
            <RichText body={descriptionRaw} />
            <MagazineForm />
          </FormWrapper>
        </Inner>
      </Column>
    </PageWrapper>
  )
}

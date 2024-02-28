import React from 'react'
import { Appointments } from '../../types'
import styled, { css, DefaultTheme } from '@xstyled/styled-components'

import { Wrapper } from './styled'
import { SEO } from '../../components/SEO'

import { Heading } from '../../components/Text'
import { TextBlock } from '../../components/ContentBlock/TextBlock'
import { useMedia } from '../../hooks'
import { Locations } from './Locations'
interface AppointmentsProps {
  appointments: Appointments
}

const Grid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    max-width: 1600px;
    margin: 6 auto;
    ${theme.mediaQueries.tablet} {
      display: block;
    }
  `}
`

const TitleWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  h1 {
    max-width: 26rem;
    margin: 0 auto;
    line-height: 1em;
  }
`

const PopupsHeadingWrapper = styled.div`
  ${({ theme }) => css`
    margin: 8 8;
    h1 {
      max-width: 26rem;
      line-height: 1em;
    }
    ${theme.mediaQueries.tablet} {
      margin: 0 auto;
      max-width: 16rem;
    }
  `}
`
const PopupsWrapper = styled.div`
  ${({ theme }) => css`
    margin: 4 0;
    > div > div {
      h4 {
        padding-bottom: 5;
      }
      h3 {
        padding-bottom: 1;
      }
      h5 {
        padding-bottom: 5;
      }
    }
    ${theme.mediaQueries.tablet} {
      > div > div {
        margin: 6 0;
      }
    }
  `}
`

const DescriptionWrapper = styled.div`
  ${({ theme }) => css`
    h4 {
      padding-bottom: 3;
    }
    ${theme.mediaQueries.tablet} {
      > div > div {
        margin: 6 0;
      }
    }
  `}
`
export const AppointmentsView = ({ appointments }: AppointmentsProps) => {
  const { seo, title, _id, description, appointmentLocations, upcomingPopups } =
    appointments

  const defaultSeo = {
    title: title || 'Appointments',
    description: seo?.description,
    image: seo?.image,
  }

  const isMedium = useMedia({
    maxWidth: '1000px',
  })

  console.log(appointments, 'appointments')
  return (
    <>
      <SEO
        seo={seo}
        defaultSeo={defaultSeo}
        path="about/appointments"
        contentType={_id!}
      />
      <Wrapper tabIndex={-1}>
        <Grid>
          <TitleWrapper>
            <Heading level={1} textAlign="center">
              {title || 'Appointments'}
            </Heading>
          </TitleWrapper>

          {description && (
            <DescriptionWrapper>
              <TextBlock content={description} />
            </DescriptionWrapper>
          )}
          <Locations isMedium={isMedium} locations={appointmentLocations} />
          <PopupsHeadingWrapper>
            <Heading level={1} textAlign="center">
              {upcomingPopups?.title || 'Appointments'}
            </Heading>
          </PopupsHeadingWrapper>
          <PopupsWrapper>
            {upcomingPopups?.description && (
              <TextBlock content={upcomingPopups?.description} />
            )}
          </PopupsWrapper>
        </Grid>
      </Wrapper>
    </>
  )
}

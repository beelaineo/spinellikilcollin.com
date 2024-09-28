import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import WeddingAppointmentIcon from '../../../svg/WeddingAppointment.svg'
import { Heading } from '../../../components/Text'
import Link from 'next/link'

interface AppointmentsButtonProps {
  mobile?: boolean
}

interface WithMobile {
  $mobile?: boolean
}

const Wrapper = styled.button<WithMobile>`
  ${({ $mobile, theme }) => css`
    position: relative;
    display: ${$mobile ? 'none' : 'flex'};
    justify-content: center;
    align-items: center;
    height: 32px;

    svg {
      margin-right: 2;
      height: 29px;
      width: 29px;
    }

    ${theme.mediaQueries.tablet} {
      display: ${$mobile ? 'flex' : 'none'};
      margin: 4 0 0;
      padding: 0;
    }
  `}
`

export const AppointmentsButton = ({ mobile }: AppointmentsButtonProps) => {
  return (
    <Wrapper $mobile={mobile}>
      <WeddingAppointmentIcon />
      <Heading m={0} level={5} textDecoration="underline">
        <Link href={'/about/appointments'} target={'_blank'}>
          Appointments
        </Link>
      </Heading>
    </Wrapper>
  )
}

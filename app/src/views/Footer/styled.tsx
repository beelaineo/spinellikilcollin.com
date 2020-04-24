import styled from '@xstyled/styled-components'

export const FooterWrapper = styled.footer`
  padding: 2 11 6;
`

export const FooterInner = styled.div`
  display: grid;
  padding: 6 0;
  grid-template-columns: 40% 20% 1fr;
  grid-column-gap: 3;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: body.4;

  &:nth-of-type(2) {
    align-items: center;
  }

  & + & {
    border-top: initial;
  }
`

export const FooterLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const MailerWrapper = styled.div``

export const MailerInput = styled.form`
  position: relative;
  button {
    color: body.5;
    font-size: 2;
    background-color: transparent;
    position: absolute;
    top: 0;
    right: 11px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  svg {
    stroke: currentColor;
  }

  input:focus ~ button {
    color: body.7;
  }
`

export const Socials = styled.div`
  color: body.8;
  font-size: 2;
  display: flex;
  a {
    display: flex;
  }
  a + a {
    margin-left: 7;
  }
`

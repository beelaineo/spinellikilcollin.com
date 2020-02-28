import React, { SyntheticEvent } from 'react'
import RightArrow from '../../svg/RightArrow.svg'
import { Heading } from '../../components/Text'
import { Input } from '../../components/Text'
import { MailerInput, MailerWrapper } from './styled'

const { useState } = React

interface NewsletterSignupProps {
  mailerTitle: string
  mailerSubtitle: string
}

export const NewsletterSignup = ({
  mailerTitle,
  mailerSubtitle,
}: NewsletterSignupProps) => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e?.currentTarget?.value ?? ''
    setInputValue(value)
  }

  const handleSubmit = () => alert('todo')

  return (
    <MailerWrapper>
      <Heading level={3}>{mailerTitle}</Heading>
      <Heading mb={3} level={4}>
        {mailerSubtitle}
      </Heading>
      <MailerInput onSubmit={handleSubmit}>
        <Input
          type="email"
          value={inputValue}
          onChange={handleChange}
          placeholder="email address"
        />
        <button type="submit">
          <RightArrow />
        </button>
      </MailerInput>
    </MailerWrapper>
  )
}

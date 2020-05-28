import React, { SyntheticEvent } from 'react'
import RightArrow from '../../svg/RightArrow.svg'
import { Heading } from '../../components/Text'
import { Input } from '../../components/Text'
import {
  MailerInput,
  MailerWrapper,
  InputWrapper,
  SuccessWrapper,
} from './styled'

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
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    e.preventDefault()
    const value = e?.currentTarget?.value ?? ''
    setInputValue(value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/mailchimpSubscribe', {
      method: 'POST',
      body: JSON.stringify({ emailAddress: inputValue }),
    }).then((r) => r.json())
    setSuccess(true)
  }

  return (
    <MailerWrapper>
      <Heading level={3}>{mailerTitle}</Heading>
      <Heading mb={3} level={4}>
        {mailerSubtitle}
      </Heading>
      <MailerInput onSubmit={handleSubmit}>
        <SuccessWrapper visible={success}>
          <Heading color="body.6" textAlign="center" level={4}>
            Thank you! You have been subscribed.
          </Heading>
        </SuccessWrapper>
        <InputWrapper visible={!success}>
          <Input
            type="email"
            disabled={loading}
            value={inputValue}
            onChange={handleChange}
            placeholder="email address"
          />
          <button type="submit">
            <RightArrow />
          </button>
        </InputWrapper>
      </MailerInput>
    </MailerWrapper>
  )
}

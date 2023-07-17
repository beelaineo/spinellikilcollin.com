import * as React from 'react'
import Link from 'next/link'
import styled from '@xstyled/styled-components'
import { Cta } from '../types'
import { Heading } from './Text'

import { useStatefulRef, getPageLinkUrl } from '../utils'
import { useModal } from '../providers'

const { useEffect } = React

interface CTAProps {
  cta: Cta
}

const Outer = styled.div`
  margin: 2 0 0 0;
  color: inherit;
`

const Wrapper = styled.span`
  color: inherit;
  text-decoration: none;
  padding-top: 3;
  padding-bottom: 0px;
  border-bottom: 1px solid;
  display: inline-block;
  cursor: pointer;
`

const ActionButton = styled.button`
  color: inherit;
`

const noop = () => undefined

const openHubspotChat = () => {
  // @ts-ignore
  if (typeof window !== 'undefined' && window?.HubSpotConversations?.widget) {
    // @ts-ignore
    window.HubSpotConversations.widget.open()
  }
}

const ActionCTA = ({ cta }: CTAProps) => {
  const { action, label: defaultLabel } = cta
  const buttonRef = useStatefulRef<HTMLButtonElement>(null)

  const { openCustomizationModal, openRingSizerModal, openWeddingModal } =
    useModal()
  if (!action) return null
  const getActionHandler = (action: string) => {
    switch (action) {
      case 'launchHubspot':
        return () => openHubspotChat()
      case 'launchRingSizerModal':
        return () => openRingSizerModal()
      case 'launchCustomizationModal':
        return () => openCustomizationModal()
      case 'launchWeddingModal':
        return () => openWeddingModal()
      default:
        throw new Error(`"${action}" is not a valid CTA action`)
    }
  }
  const handler = getActionHandler(action)

  const handleClick = () => handler()

  const label = defaultLabel

  return (
    <Outer>
      <ActionButton ref={buttonRef} onClick={handleClick}>
        <Wrapper as="div">
          <Heading level={4} my={0} fontStyle="italic">
            {label}
          </Heading>
        </Wrapper>
      </ActionButton>
    </Outer>
  )

  return null
}

export const CTA = ({ cta }: CTAProps) => {
  const { label, link, action } = cta
  if (action) return <ActionCTA cta={cta} />
  if (!link?.document) return null
  const { as, href } = getPageLinkUrl(link.document) || {}
  if (!href) {
    console.warn('No link href created for link:', link)
    return null
  }
  return (
    <Outer>
      <Link as={as} href={href}>
        <Wrapper>
          <Heading level={4} my={0} fontStyle="italic">
            {label}
          </Heading>
        </Wrapper>
      </Link>
    </Outer>
  )
}

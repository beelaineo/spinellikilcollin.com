import * as React from 'react'
import Link from 'next/link'
import styled from '@xstyled/styled-components'
import { Cta } from '../types'
import { useStatefulRef, getPageLinkUrl } from '../utils'
import { useBambuser, useModal } from '../providers'

const { useEffect } = React

interface CTAProps {
  cta: Cta
}

const Outer = styled.div`
  margin: 2 0 0 0;
  color: inherit;
`

const Wrapper = styled.a`
  padding: 3;
  border: 1px solid;
  color: inherit;
  display: inline-block;
  text-decoration: none;
  font-size: 5;
`

const ActionButton = styled.button`
  color: inherit;
`

const noop = () => undefined

const isBambuserTime = (cta: Cta): boolean => {
  if (cta?.action !== 'launchBambuser') return false
  const startDate = cta?.bambuser?.liveSettings?.startDate
  const endDate = cta?.bambuser?.liveSettings?.endDate
  if (!startDate || !endDate) return false
  const now = new Date()
  return now >= new Date(startDate) && now <= new Date(endDate)
}

const ActionCTA = ({ cta }: CTAProps) => {
  const { action, label: defaultLabel } = cta
  const buttonRef = useStatefulRef<HTMLButtonElement>(null)
  const { prepareShow } = useBambuser()

  const isLive = isBambuserTime(cta)

  useEffect(() => {
    /**
     * If it is a bambuser action, attach the event listener
     * to the button ref
     */
    if (!buttonRef.current) return
    const slug = cta?.bambuser?.slug
    if (!slug) {
      throw new Error('No bambuser slug provided')
    }
    if (action === 'launchBambuser') {
      prepareShow(slug, buttonRef.current)
    }
  }, [action, buttonRef.current, cta?.bambuser?.slug])

  useEffect(() => {
    if (!buttonRef.current) return
    const timeout = setTimeout(() => {
      buttonRef.current.dispatchEvent(new MouseEvent('click'))
    }, 1000)
    return () => clearTimeout(timeout)
  }, [isLive])

  const { openCustomizationModal, openRingSizerModal } = useModal()
  if (!action) return null
  const getActionHandler = (action: string) => {
    switch (action) {
      case 'launchBambuser':
        return noop
      case 'launchRingSizerModal':
        return () => openRingSizerModal()
      case 'launchCustomizationModal':
        return () => openCustomizationModal()
      default:
        throw new Error(`"${action}" is not a valid CTA action`)
    }
  }
  const handler = getActionHandler(action)

  const handleClick = () => handler()

  const label = isLive
    ? cta?.bambuser?.liveSettings?.liveCTALabel || defaultLabel
    : defaultLabel

  return (
    <Outer>
      <ActionButton ref={buttonRef} onClick={handleClick}>
        <Wrapper as="div">{label}</Wrapper>
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
        <Wrapper>{label}</Wrapper>
      </Link>
    </Outer>
  )
}

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useBambuser } from '../../utils/bambuser'
import { BambuserShowType } from '../../types'
import { useStatefulRef } from '../../utils'

const ID = 'bambuser-liveshopping'

const { useEffect } = React

interface BambuserProps {
  autoPlay?: boolean
  bambuserSlug: string
  closeModal: () => void
}

export const BambuserModal = ({ bambuserSlug, autoPlay }: BambuserProps) => {
  if (!bambuserSlug) {
    throw new Error('You must supply a bambuser video slug')
  }

  if (typeof document === 'undefined') return null
  const modalRoot = document.getElementById('bambuserModal')
  if (!modalRoot) throw new Error('No modal root')

  const { addShow } = useBambuser()

  useEffect(() => {
    const show: BambuserShowType = {
      showId: bambuserSlug,
      type: 'overlay',
      node: modalRoot,
    }
    addShow(show)
  }, [])

  return null
}

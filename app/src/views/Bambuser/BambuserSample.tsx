import React from 'react'
import { PageWrapper } from '../../components/Layout'
import BambuserView from './BambuserView'

interface BambuserViewProps {}

const BambuserSample = ({}: BambuserViewProps) => {
  return (
    <>
      <PageWrapper>
        <BambuserView autoPlay={false} copy="Launch Player" />
      </PageWrapper>
    </>
  )
}

export default BambuserSample

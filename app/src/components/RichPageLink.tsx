import * as React from 'react'
import { Box } from '@xstyled/styled-components'
import { RichPageLink as RichPageLinkType } from '../types'
import { DocumentLink } from './DocumentLink'
import { RichText } from './RichText'
import { Image } from './Image'
import { Heading } from './Text'
import { ProductThumbnail } from './Product'
import { CollectionThumbnail } from './Collection'

import { getDocumentLinkImage, getPageLinkLabel } from '../utils/links'

interface RichPageLinkProps {
  link: RichPageLinkType
}

interface SubtitleProps {
  children: React.ReactNode
}

const Subtitle = (props: any) => <Heading level={5} fontWeight={2} {...props} />

export const RichPageLink = ({ link }: RichPageLinkProps) => {
  if (!link.document) return null
  const label = getPageLinkLabel(link?.document)
  const { image: customImage, hoverImage, captionRaw } = link
  const image = customImage ?? getDocumentLinkImage(link.document)
  const linkTitle = label || link.title || link?.document?.title

  switch (link.document.__typename) {
    case 'ShopifyProduct':
      return (
        <ProductThumbnail
          displayTags={false}
          displaySwatches={false}
          product={link.document}
        />
      )
    case 'ShopifyCollection':
      return <CollectionThumbnail collection={link.document} />
    case 'Page':
      return (
        <DocumentLink document={link.document}>
          <Image hoverImage={hoverImage} image={image} ratio={1} />
          <Box mt={3}>
            <Heading weight={3} level={4}>
              {linkTitle}
            </Heading>
            {captionRaw && captionRaw.length ? (
              <RichText body={captionRaw} blockWrapper={Subtitle} />
            ) : null}
          </Box>
        </DocumentLink>
      )
  }
}

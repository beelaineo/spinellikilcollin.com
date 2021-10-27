import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { EmbedBlock as EmbedBlockType } from '../../types'

interface WithLayout {
  layout?: string | null
}

interface EmbedBlockProps {
  url?: string | null
  layout?: string | null
  title?: string | null
}

const Wrapper = styled.div<WithLayout>`
  ${({ theme, layout }) => css`
    position: relative;
    height: 100%;
    width: 100%;
    background-color: body.0;
    grid-column: ${layout === 'fullWidth' ? '1 / 3' : 'auto'};

    ${theme.mediaQueries.mobile} {
      grid-column: auto;
    }
  `}
`

interface EmbedBlockProps {
  content: EmbedBlockType
}

export const EmbedBlock = ({ content }: EmbedBlockProps) => {
  const { url, layout } = content
  return (
    <Wrapper layout={layout}>
      <iframe
        style={{ height: '100%', width: '100%', minHeight: '638px' }}
        scrolling="no"
        src={url + '?embed=true'}
        frameBorder="no"
        allowFullScreen
      />
    </Wrapper>
  )
}

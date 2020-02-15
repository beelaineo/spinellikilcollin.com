import * as React from 'react'
import { LinkGroup as LinkGroupType } from '../../types'
import { PageLink } from '../../components/PageLink'
import { Heading } from '../../components/Text'

interface LinkGroupProps {
  linkGroup: LinkGroupType
}

export const LinkGroup = ({ linkGroup }: LinkGroupProps) => {
  const { title, links } = linkGroup
  return (
    <div>
      <Heading level={5}>{title}</Heading>
      {links && links.length
        ? links.map((menuLink) =>
            menuLink.document ? (
              <Heading level={5} key={menuLink._key}>
                <PageLink link={menuLink} />
              </Heading>
            ) : null,
          )
        : null}
    </div>
  )
}

import * as React from 'react'
import { useQuery } from 'urql'
import { homepageQuery, HomepageResponse } from './homepageQuery'
import { ContentBlock } from '../../components/ContentBlock'

export const Homepage = () => {
  const [response] = useQuery<HomepageResponse>({ query: homepageQuery })
  const { fetching, data, error } = response
  if (error)
    return (
      <React.Fragment>
        <p>error!</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </React.Fragment>
    )

  if (fetching || !data || !data.Homepage || !data.Homepage.content) return null
  const { content } = data.Homepage
  return (
    <React.Fragment>
      {content.map((c) => (
        <ContentBlock key={c._key} content={c} />
      ))}
    </React.Fragment>
  )
}

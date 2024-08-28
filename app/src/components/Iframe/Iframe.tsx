import * as React from 'react'

interface IframeProps {
  code: string
}

export const Iframe = ({ code }: IframeProps) => {
  return <div dangerouslySetInnerHTML={{ __html: code }} />
}

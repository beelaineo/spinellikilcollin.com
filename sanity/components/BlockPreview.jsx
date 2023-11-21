import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {Loading} from './Loading'

const Wrapper = styled.div
const Image = styled.img
const TextWrapper = styled.div
const Title = styled.p
const Subtitle = styled.h4

// TypeScript (optional): Define types for your props
// interface BlockPreviewProps {
//   getPreviewValues?: (value: any) => Promise<any>;
//   value: any;
// }

export const BlockPreview = (props) => {
  const [state, setState] = useState({
    title: '',
    src: undefined,
    subtitles: [],
    loading: true,
  })

  const fetchValues = async () => {
    if (!props.getPreviewValues) return
    const values = await props.getPreviewValues(props.value)
    setState({
      ...values,
      loading: false,
    })
  }

  useEffect(() => {
    fetchValues()
  }, [props])

  const {src, title, subtitles, loading} = state

  return (
    <Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
          {src && <Image src={src} alt={title} />}
          <TextWrapper>
            <Title>{title}</Title>
            {subtitles && subtitles.length
              ? subtitles
                  .slice(0, 2)
                  .map((subtitle) => <Subtitle key={subtitle}>{subtitle}</Subtitle>)
              : null}
          </TextWrapper>
        </>
      )}
    </Wrapper>
  )
}

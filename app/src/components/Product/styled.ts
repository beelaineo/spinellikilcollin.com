import styled, { css } from '@xstyled/styled-components'

interface BackgroundImageProps {
  imageSrc: string
}

export const ProductThumb = styled.div`
  text-align: left;
  width: 100%;
  a {
    text-decoration: none;
    &:hover {
      /* text-decoration: underline; */
      color: body.8;
    }
  }
`

export const ProductInfo = styled.div`
  padding: 3 0;
  text-align: center;
  text-transform: capitalize;
`

export const ImageWrapper = styled.div`
  position: relative;
`

export const TagBadgeWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export const TagBadge = styled.div`
  border: 1px solid;
  border-radius: 20px;
  margin: 0 1;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3;
  margin-bottom: 2;
`

export const SwatchesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export const SwatchLabel = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 50%;
  text-align: center;
  white-space: nowrap;
  transform: translate(-50%);
  transition: 0.2s;
  opacity: 0;
`

interface WithClickable {
  clickable: boolean
  active: boolean
}

export const SwatchWrapper = styled.div<WithClickable>`
  ${({ clickable, active }) => css`
    position: relative;
    width: 25px;
    margin: 0 4px;
    padding-bottom: 2;
    cursor: ${clickable ? 'pointer' : 'inherit'};
    border-bottom: ${active ? '2px solid' : 'none'};
    border-color: body.5;

    &:hover {
      ${SwatchLabel} {
        opacity: 1;
      }
    }
  `}
`

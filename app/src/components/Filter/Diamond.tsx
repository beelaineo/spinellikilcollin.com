import * as React from 'react'
import { useTheme } from 'styled-components'
import { Maybe } from '../../types'

interface DiamondIconProps {
  value?: Maybe<string>
}

export const Diamond = ({ value }: DiamondIconProps) => {
  const theme = useTheme()

  return (
    <svg
      width="26.25px"
      height="21px"
      viewBox="0 0 30 24"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g
        id="Filter"
        stroke="none"
        strokeWidth="1"
        fill={
          value === 'Diamonds'
            ? '#ffffff'
            : value === 'Gemstones'
            ? '#C7E4C6'
            : 'none'
        }
        fillRule="evenodd"
        strokeDasharray={value === 'All-Metal' ? '2' : '0'}
      >
        <g
          id="6-copy-8"
          transform="translate(-719.000000, -468.000000)"
          stroke={theme.colors.grays[5]}
          strokeWidth="1"
        >
          <polygon
            id="Path-2"
            points="719 476.4526 733.846 491.2704 748.6612 476.4526 741.999922 469.0436 726.423 469.0436"
          ></polygon>
        </g>
      </g>
    </svg>
  )
}

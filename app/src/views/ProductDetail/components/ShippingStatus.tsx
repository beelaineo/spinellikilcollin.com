import styled, { css } from '@xstyled/styled-components'
import { useShopData } from '../../../providers/ShopDataProvider'

interface ShippingStatusProps {
  readyToShip: boolean
}

const InStockDot = styled('span')`
  display: inline-block;
  background-color: #00d009;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  position: absolute;
  top: 1px;
  left: 26px;
  border: 1px solid #f5f3f3;
`

const Wrapper = styled.div`
  ${({ theme }) => css`
     {
      display: flex;
      align-items: center;
      margin: 3 0;
      position: relative;

      #shippingIcon {
        width: 32px;
        margin-right: 3;
        height: auto;
      }

      span {
        font-style: italic;
      }

      ${theme.mediaQueries.tablet} {
      }
      ${theme.mediaQueries.mobile} {
      }
    }
  `}
`

const ShippingStatus = ({ readyToShip }: ShippingStatusProps) => {
  const { productInfoSettings } = useShopData()
  const leadTimeLabel = productInfoSettings?.leadTimeLabel

  return (
    <Wrapper>
      <svg
        id="shippingIcon"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 33.2 26.8"
        fill="none"
      >
        <polygon
          fill="none"
          stroke="#000"
          strokeWidth="0.5px"
          strokeLinejoin="round"
          points="32.95 6.65 32.95 21.85 10.55 26.55 10.55 10.85 32.95 6.65"
        />
        <polygon
          fill="#f5f3f3"
          stroke="#000"
          strokeWidth="0.5px"
          strokeLinecap="round"
          strokeLinejoin="round"
          points=".25 4.25 .35 18.65 10.55 26.55 10.55 10.85 .25 4.25"
        />
        <polygon
          fill="#f5f3f3"
          stroke="#000"
          strokeWidth="0.5px"
          strokeLinejoin="round"
          points=".25 4.25 21.95 .25 32.95 6.65 10.55 10.85 .25 4.25"
        />
        <g>
          <polygon
            stroke="#000"
            fill="#fff"
            strokeWidth="0.5px"
            points="25.55 13.05 25.45 18.75 18.95 20.15 18.95 14.15 25.55 13.05"
          />
          <line
            fill="none"
            stroke="#000"
            strokeWidth="0.5px"
            x1="24.05"
            y1="15.25"
            x2="20.35"
            y2="15.95"
          />
          <line
            fill="none"
            stroke="#000"
            strokeWidth="0.5px"
            x1="24.05"
            y1="16.95"
            x2="20.35"
            y2="17.75"
          />
        </g>
        <polygon
          fill="#f5f3f3"
          stroke="#000"
          strokeWidth="0.5px"
          strokeLinejoin="round"
          points="6.45 19.35 4.75 16.45 3.25 17.25 3.35 6.15 25.55 2.35 28.65 4.25 6.55 8.05 6.45 19.35"
        />
      </svg>
      <span>{readyToShip ? 'Ships in 1-2 days' : leadTimeLabel}</span>
      {readyToShip && <InStockDot />}
    </Wrapper>
  )
}

export default ShippingStatus

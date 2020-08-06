import { createGlobalStyle, css } from '@xstyled/styled-components'
import normalized from './normalized'
import { hubspotStyles } from './hubspotstyles'

export const GlobalStyles = createGlobalStyle`

	${normalized}

	* {
		box-sizing: border-box;
	}

	body {
		font-family: serif;
		overflow-x: hidden;
	}

  h1, h2, h3, h4, h5, h6, p, ul, ol {
    &:empty {
      display: none;
    }
  }
  
  h1 {font-size: 1; }
  h2 { font-size: 2; }
  h3 { font-size: 3; }
  p, h4 { font-size: 4; }
  h5 { font-size: 5; }
  h6 { font-size: 6; }

  ${({ theme }) => css`
    ${theme.mediaQueries.tablet} {
      h1 {
        font-size: ${theme.tabletFontSizes[1]};
      }
      h2 {
        font-size: ${theme.tabletFontSizes[2]};
      }
      h3 {
        font-size: ${theme.tabletFontSizes[3]};
      }
      p,
      h4 {
        font-size: ${theme.tabletFontSizes[4]};
      }
      h5 {
        font-size: ${theme.tabletFontSizes[5]};
      }
      h6 {
        font-size: ${theme.tabletFontSizes[6]};
      }
    }

    ${theme.mediaQueries.mobile} {
      h1 {
        font-size: ${theme.mobileFontSizes[1]};
      }
      h2 {
        font-size: ${theme.mobileFontSizes[2]};
      }
      h3 {
        font-size: ${theme.mobileFontSizes[3]};
      }
      p,
      h4 {
        font-size: ${theme.mobileFontSizes[4]};
      }
      h5 {
        font-size: ${theme.mobileFontSizes[5]};
      }
      h6 {
        font-size: ${theme.mobileFontSizes[6]};
      }
    }
  `}



	button, input, select, option, textarea {
    font: serif;
		background: white;
		font-weight: 300;
		border: none;
		outline: none;
		line-height: normal;
		padding: 0;
		border-radius: 0;
	}

	img {
		max-width: 100%;
	}

	button {
		cursor: pointer;
    border: none;
    font-family: inherit;
    background-color: transparent;
	}

  a {
    color: inherit;
    text-decoration: none;
  }

  ${hubspotStyles}
`

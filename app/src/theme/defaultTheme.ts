import { DefaultTheme } from 'styled-components'

/* generated at: https://www.colorbox.io/#steps=7#hue_start=281#hue_end=271#hue_curve=easeInQuad#sat_start=22#sat_end=0#sat_curve=easeOutQuart#sat_rate=130#lum_start=12#lum_end=100#lum_curve=easeInCubic#minor_steps_map=0 */
const grays = [
  '#ffffff', // 0
  '#f9fafa', // 1
  '#f5f3f4', // 2
  '#e7e6e8', // 3
  '#d1d1d2', // 4
  '#979797', // 5
  '#818181', // 6
  '#444443', // 7
  '#222222', // 8
  '#000000', // 9
]

const pink = '#f3dad8'

/* generated at: https://www.colorbox.io/#steps=7#hue_start=281#hue_end=271#hue_curve=easeInQuad#sat_start=4#sat_end=100#sat_curve=linear#sat_rate=130#lum_start=100#lum_end=100#lum_curve=linear#lock_hex=b879f5#minor_steps_map=0 */

const sans = '"Helvetica Neue", helvetica, sans-serif'
const serif = '"Inferi", Georgia, serif'

export const defaultTheme: DefaultTheme = {
  radii: {
    round: '9px',
  },
  navHeight: '97px',
  mobileNavHeight: '69px',
  /*   Spacing - applies to:
   *   margin, margin-top, margin-right, margin-bottom, margin-left, padding,
   *   padding-top, padding-right, padding-bottom, padding-left, grid-gap,
   *   grid-column-gap, grid-row-gap
   */
  space: [0, 3, 6, 12, 18, 24, 38, 44, 48, 64, 72, 120],

  /* Sizing - applies to:
   * 	width, height, min-width,	max-width, min-height, max-height
   */

  sizes: {
    small: 380,
    medium: 600,
    mediumWide: 720,
    wide: 1100,
    xWide: 1440,
  },

  /* Font Sizes, applies to:
   *   font-size
   */
  fontSizes: [
    0,
    73, // h1
    41, // h2
    25, // h3
    17, // h4
    13, // readable text: p, h5
    11, // small text: h6, captions
    11, // small text: h5, captions
  ],
  tabletFontSizes: [0, 73, 41, 25, 17, 13, 11, 11],
  mobileFontSizes: [0, 42, 22, 17, 17, 13, 11, 11],
  fontWeights: [0, 100, 200, 300, 400, 700],
  fonts: {
    serif,
    sans,
    display: serif,
    body: serif,
  },

  /* Applies to:
   *   z-index
   */
  zIndices: {
    main: 0,
    nav: 100,
    cart: 200,
    dialog: 300,
    alert: 400,
  },

  /* Colors, applies to:
   *  color, background-color, border-color
   */
  colors: {
    /**
     * Body colors
     *
     * First colors should offset well on the primary background, i.e.
     * body.0 should be dark for a light theme
     * body.0 should be light for a dark theme
     */
    grays,
    body: grays,
    /* Shortcut for main body color */
    bodyMain: grays[8],
    background: grays[2],
    /* Used for errors and warnings. */
    error: ['#e6d49e', '#f09e32', '#f04b32'],
    /* Used for highlights */
    highlightLow: pink,
  },

  transition: {
    fast: '150ms',
    slow: '250ms',
  },

  breakpoints: {
    xs: 0,
    sm: 420,
    md: 650,
    lg: 900,
    xl: 1200,
  },

  mediaQueries: {
    mobile: '@media screen and (max-width: 650px)',
    aboveMobile: '@media screen and (min-width: 651px)',
    tablet: '@media screen and (max-width: 1000px)',
    aboveTablet: '@media screen and (min-width: 1001px)',
    desktop: '@media screen and (max-width: 1200px)',
    aboveDesktop: '@media screen and (min-width: 1200px)',
  },
  focus: {
    left: (offsetSize = 0, offsetPos = 15) =>
      `
      outline: none;
      
      &:after {
        content: '';
        background-color: ${defaultTheme.colors.grays[6]};
        position: absolute;
        border-radius: 4px;
        z-index: 1;
        width: 4px;
        height: calc(100% + ${offsetSize}%);
        top: calc(0% - ${offsetSize / 2}%);
        left: calc(0px - ${offsetPos}px);
        bottom: unset;
        opacity: 1;
    };`,
    right: (offsetSize = 0, offsetPos = 15) =>
      `
    outline: none;
    
    &:after {
      content: '';
      background-color: ${defaultTheme.colors.grays[6]};
      position: absolute;
      border-radius: 4px;
      z-index: 1;
      width: 4px;
      height: calc(100% + ${offsetSize}%);
      top: calc(0% - ${offsetSize / 2}%);
      right: calc(0px - ${offsetPos}px);
      bottom: unset;
      opacity: 1;
  };`,
    bottom: (offsetSize = 0, offsetPos = 10) =>
      `
      outline: none;
      
      &:after {
        content: '';
        background-color: ${defaultTheme.colors.grays[6]};
        position: absolute;
        border-radius: 4px;
        z-index: 1;
        width: calc(100% + ${offsetSize}%);
        height: 4px;
        top: unset;
        left: calc(0% - ${offsetSize / 2}%);
        bottom: calc(0px - ${offsetPos}px);
        opacity: 1;
    };`,
  },
}

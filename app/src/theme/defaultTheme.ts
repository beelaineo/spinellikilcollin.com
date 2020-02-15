import { DefaultTheme } from 'styled-components'

/* generated at: https://www.colorbox.io/#steps=7#hue_start=281#hue_end=271#hue_curve=easeInQuad#sat_start=22#sat_end=0#sat_curve=easeOutQuart#sat_rate=130#lum_start=12#lum_end=100#lum_curve=easeInCubic#minor_steps_map=0 */
const grays = [
  '#1c161f',
  '#453b4a',
  '#716776',
  '#BDC2C6',
  '#b5aeb8',
  '#dcd9de',
  '#f0eff1',
  '#F2F6F9',
  '#ffffff',
]

/* generated at: https://www.colorbox.io/#steps=7#hue_start=281#hue_end=271#hue_curve=easeInQuad#sat_start=4#sat_end=100#sat_curve=linear#sat_rate=130#lum_start=100#lum_end=100#lum_curve=linear#lock_hex=b879f5#minor_steps_map=0 */

const sans = '"Apercu", "Helvetica Neue", helvetica, sans-serif'
const serif = '"Caecilia LT Std", "Lucida Bright", Georgia, serif'

export const defaultTheme: DefaultTheme = {
  radii: {
    round: '9px',
  },
  /* Spacing - applies to:
   *   margin, margin-top, margin-right, margin-bottom, margin-left, padding,
   *   padding-top, padding-right, padding-bottom, padding-left, grid-gap,
   *   grid-column-gap, grid-row-gap
   */
  space: [0, 3, 6, 12, 18, 24, 38, 48],

  /* Sizing - applies to:
   * 	width, height, min-width,	max-width, min-height, max-height
   */
  sizes: [0, 16, 32, 48, 64, 80, 96],

  /* Font Sizes, applies to:
   *   font-size
   */
  fontSizes: [
    99, // stupid high, just don't use fontSizes.0
    50, // h1
    38, // h2
    24, // h3
    17, // readable text: p, h4
    14, // small text: h5, captions
    11, // small text: h6, small captions
  ],
  fontWeights: [0, 200, 400, 500, 700, 800],
  fonts: {
    serif,
    sans,
    display: sans,
    body: sans,
  },

  /* Applies to:
   *   z-index
   */
  zIndices: {
    base: 0,
    nav: 100,
    alert: 200,
  },

  /* Colors, applies to:
   *  color, background-color, border-color
   */
  colors: {
    /**
     * Primary UI color
     *
     * Higher nubmers are more saturated
     * Using only 0 - 50, since 50 & 60 were nearly identical
     *
     * Usage:
     *   color: primary.0 | primary.1 | primary.2 | primary.3 | primary.4 | primary.5;
     **/
    primary: reds,
    primaryMain: cfaRed,

    red: cfaRed,
    beige,
    bronze,

    /**
     * Body colors
     *
     * First colors should offset well on the primary background, i.e.
     * body.0 should be dark for a light theme
     * body.0 should be light for a dark theme
     */
    body: grays,
    /* Shortcut for main body color */
    bodyMain: grays[0],
    background: grays[6],

    highlight: blues,
    /* 'color: offset.2' should look good on 'background-color: primary.2' */
    /* Used for errors and warnings. */
    error: ['#e6d49e', '#f09e32', '#f04b32'],
  },

  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
  },

  mediaQueries: {
    mobile: 'media screen and (max-width: 650px)',
    aboveMobile: 'media screen and (min-width: 651px)',
    tablet: 'media screen and (max-width: 900px)',
    aboveTablet: 'media screen and (max-width: 901px)',
  },
}

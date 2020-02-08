import { setup as reactContentfulImageSetup } from 'react-contentful-image'

const screenXs = 360
const screenSm = 600
const screenMd = 960
const screenLg = 1280
const screenXl = 1920

const media = {
  xs: `(min-width: ${screenXs}px)`,
  sm: `(min-width: ${screenSm}px)`,
  md: `(min-width: ${screenMd}px)`,
  lg: `(min-width: ${screenLg}px)`,
  xl: `(min-width: ${screenXl}px)`,
  dpr2: '(min-resolution: 144dpi)', // 1.5x devices and up get 2x images
  dpr3: '(min-resolution: 240dpi)', // 2.5x devices and up get 3x images
  portrait: '(orientation: portrait)',
  landscape: '(orientation: landscape)'
}

// Object keys are media query names from above. 'default' means no media query (default match).
// E.g. for mobile first 'default' would be the mobile media query
const variants = {
  default: {
    quality: 85,
    density: 1
  },
  dpr2: {
    quality: 75,
    density: 2
  },
  dpr3: {
    quality: 70,
    density: 3
  }
}

export const imageSizes = [
  {
    mediaQuery: 'default',
    params: { w: screenXs }
  },
  {
    mediaQuery: 'sm',
    params: { w: screenSm }
  },
  {
    mediaQuery: 'md',
    params: { w: screenMd }
  },
  {
    mediaQuery: 'lg',
    params: { w: screenLg }
  },
  {
    mediaQuery: 'xl',
    params: { w: screenXl }
  }
]

const setup = () => reactContentfulImageSetup(media, variants)
export default setup

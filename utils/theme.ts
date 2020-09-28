import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].reduce((coll, h) => {
  coll[h] = {
    fontFamily: ['Cormorant Garamond', 'serif'].join(', '),
    fontWeight: 700,
  }
  return coll
}, {} as Record<string, any>)

const bodyFontFamily = ['Cormorant Garamond', 'serif'].join(', ')

const theme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      fontSize: 14,
      fontFamily: bodyFontFamily,
      body1: {
        fontSize: 22,
      },
      body2: {
        fontFamily: bodyFontFamily,
      },
      ...headings,
    },
    palette: {
      primary: {
        main: '#31929b',
        light: '#68c3cc',
        dark: '#00646d',
        contrastText: '#FFF',
      },
      secondary: {
        main: '#303f9f',
        light: '#666ad1',
        dark: '#001970',
        contrastText: '#fff',
      },
    },
    // TODO: figure out where this should go now
    // status: {
    //   danger: 'orange',
    // },
    // classes: {
    //   responsiveImage: {
    //     width: 'auto',
    //     maxWidth: '100%',
    //   },
    // },
    overrides: {
      MuiButton: {
        label: {
          fontWeight: 700,
        },
      },
      MuiLink: {
        root: {
          fontWeight: 700,
        },
      },
    },
  })
)

export default theme

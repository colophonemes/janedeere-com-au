import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { wrapHistory } from 'oaf-react-router'
import { ContentfulClient, ContentfulProvider } from 'react-contentful'
import { IntlProvider } from 'react-intl'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import setupMediaQueries from 'utilities/contentfulImageMediaQueries'

import Content from 'components/layout/Content'

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].reduce((coll, h) => {
  coll[h] = {
    fontFamily: ['Cormorant Garamond', 'serif'].join(', '),
    fontWeight: 700
  }
  return coll
}, {})

const bodyFontFamily = ['Cormorant Garamond', 'serif'].join(', ')

const theme = responsiveFontSizes(createMuiTheme({
  typography: {
    fontSize: 14,
    fontFamily: bodyFontFamily,
    body1: {
      fontSize: 1.4
    },
    body2: {
      fontSize: 1.4,
      fontFamily: bodyFontFamily
    },
    ...headings
  },
  palette: {
    primary: {
      main: '#80deea',
      light: '#b4ffff',
      dark: '#4bacb8',
      contrastText: '#000'
    },
    secondary: {
      main: '#303f9f',
      light: '#666ad1',
      dark: '#001970',
      contrastText: '#fff'
    }
  },
  status: {
    danger: 'orange'
  },
  classes: {
    responsiveImage: {
      width: 'auto',
      maxWidth: '100%'
    }
  }
}))

setupMediaQueries()

const history = createBrowserHistory()
wrapHistory(history)

const {
  REACT_APP_CONTENTFUL_SPACE,
  REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN
} = process.env

const contentfulClient = new ContentfulClient({
  space: REACT_APP_CONTENTFUL_SPACE,
  accessToken: REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN
})

const LOCALE = 'en-US'

const App = () => <div className='App'>
  <CssBaseline>
    <ThemeProvider theme={theme}>
      <IntlProvider locale={LOCALE}>
        <ContentfulProvider client={contentfulClient} locale={LOCALE}>
          <Router history={history}>
            <Content />
          </Router>
        </ContentfulProvider>
      </IntlProvider>
    </ThemeProvider>
  </CssBaseline>
</div>

export default App
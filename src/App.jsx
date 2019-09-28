import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ContentfulClient, ContentfulProvider } from 'react-contentful'

import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import teal from '@material-ui/core/colors/teal'

import Content from 'components/layout/Content'

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].reduce((coll, h) => {
  coll[h] = {
    fontFamily: ['Josefin Slab', 'sans-serif'].join(', '),
    fontWeight: 700
  }
  return coll
}, {})

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Libre Caslon Text', 'serif'].join(', '),
    ...headings
  },
  palette: {
    primary: teal
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
})

const {
  REACT_APP_CONTENTFUL_SPACE,
  REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN
} = process.env

const contentfulClient = new ContentfulClient({
  space: REACT_APP_CONTENTFUL_SPACE,
  accessToken: REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN
})

const LOCALE = 'en-GB'

const App = () => <div className='App'>
  <CssBaseline>
    <ThemeProvider theme={theme}>
      <ContentfulProvider client={contentfulClient} locale={LOCALE}>
        <Router>
          <Content />
        </Router>
      </ContentfulProvider>
    </ThemeProvider>
  </CssBaseline>
</div>

export default App

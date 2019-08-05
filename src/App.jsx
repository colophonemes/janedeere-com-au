import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ContentfulClient, ContentfulProvider } from 'react-contentful';


import Header from 'components/layout/Header'
import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

import Home from 'containers/Home'
import Posts from 'containers/Posts'
import Post from 'containers/Post'


const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].reduce((coll, h) => {
  coll[h] = {
    fontFamily: ['Oxygen', 'sans-serif'].join(', '),
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
    primary: green
  },
  status: {
    danger: 'orange',
  },
  classes: {
    responsiveImage: {
      width: 'auto',
      maxWidth: '100%'
    }
  }
})

console.log(theme)

const {
  REACT_APP_CONTENTFUL_SPACE,
  REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN
} = process.env

const contentfulClient = new ContentfulClient({
  space: REACT_APP_CONTENTFUL_SPACE,
  accessToken: REACT_APP_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN
});

const App = () => <div className="App">
  <Router><ContentfulProvider client={contentfulClient} locale='en-GB'><ThemeProvider theme={theme}>
    <Container fixed>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/blog" component={Posts} />
      <Route path="/blog/:postSlug" component={Post} />
    </Container>
  </ThemeProvider></ContentfulProvider></Router>
</div>

export default App;
